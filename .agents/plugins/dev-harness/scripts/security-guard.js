'use strict';

const fs = require('fs');
const path = require('path');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
    if (process.stdin.isTTY) {
      resolve('');
    }
  });
}

function loadConfig(workspaceRoot) {
  try {
    const configPath = path.join(workspaceRoot, 'harness.config.json');
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
  } catch {
    // Ignore error
  }
  return null;
}

const DANGEROUS_COMMAND_PATTERNS = [
  {
    pattern: /\brm\s+(?:-[a-zA-Z0-9_-]+\s+)*(?:["']?(?:\/|~|\$HOME|[A-Za-z]:[\\\/]|\.\.[\/\\])(?:[\/\\]|\s|$|\*))/i,
    reason: 'Destructive root, home, or system directory deletion detected (rm -rf / or ~).',
  },
  {
    pattern: /\b(?:del|rd|rmdir)\s+(?:\/[a-zA-Z0-9_-]+\s+)*(?:["']?(?:[A-Za-z]:[\\\/]|[\\\/]|\.\.[\/\\])(?:[\/\\]|\s|$|\*))/i,
    reason: 'Destructive Windows system root directory deletion detected.',
  },
  {
    pattern: /\b(?:mkfs|diskpart|format\s+[A-Za-z]:|dd\s+if=)/i,
    reason: 'Low-level disk format or raw block write detected.',
  },
  {
    pattern: /:(){ :|:& };:/,
    reason: 'Fork bomb exploit detected.',
  },
  {
    pattern: /\bgit\s+push\s+.*(?:--force|-f\b).*(?:main|master|production|release)/i,
    reason: 'Force-pushing to protected branches (main/master/production) is strictly blocked.',
  },
  {
    pattern: /\bgit\s+push\s+.*(?:main|master|production|release).*(?:--force|-f\b)/i,
    reason: 'Force-pushing to protected branches (main/master/production) is strictly blocked.',
  },
  {
    pattern: /\bcurl\s+.*\|\s*(?:bash|sh|zsh|powershell|cmd)/i,
    reason: 'Piping untrusted remote scripts directly into shell interpreter is blocked.',
  },
  {
    pattern: /\b(?:DROP\s+DATABASE|DROP\s+SCHEMA)\b/i,
    reason: 'Destructive database deletion query detected.',
  },
];


const SENSITIVE_FILE_PATTERNS = [
  /\.(env|env\..+|pem|key|pkcs12|pfx|p12)$/i,
  /(id_rsa|id_ed25519|id_dsa|id_ecdsa|credentials\.json|service-account.*\.json|\.npmrc|\.pypirc)$/i,
  /^(\/etc\/|\/boot\/|\/sys\/|\/proc\/|C:\\Windows|C:\\System32)/i,
];

function checkCommandSecurity(commandLine) {
  if (!commandLine) return null;
  for (const { pattern, reason } of DANGEROUS_COMMAND_PATTERNS) {
    if (pattern.test(commandLine)) {
      return reason;
    }
  }
  return null;
}

function checkFileSecurity(targetFile) {
  if (!targetFile) return null;
  const normalized = targetFile.replace(/\\/g, '/');
  const baseName = path.basename(normalized);

  for (const pattern of SENSITIVE_FILE_PATTERNS) {
    if (pattern.test(baseName) || pattern.test(normalized)) {
      return `Modification of sensitive credentials or system file (${baseName}) is blocked by Security Guard.`;
    }
  }
  return null;
}

async function main() {
  let decision = 'allow';
  let reason = '';

  try {
    const rawInput = await readStdin();
    let payload = {};
    if (rawInput.trim()) {
      try {
        payload = JSON.parse(rawInput);
      } catch {
        // Not valid JSON
      }
    }

    const workspaceRoot = (payload.workspacePaths && payload.workspacePaths[0]) || path.resolve(__dirname, '../../../../');
    const config = loadConfig(workspaceRoot);

    // Check if securityGuard hook is disabled
    if (config && config.hooks && config.hooks.securityGuard === false) {
      process.stdout.write(JSON.stringify({ decision: 'allow' }) + '\n');
      return;
    }

    const toolCall = payload.toolCall || {};
    const toolName = toolCall.name || '';
    const args = toolCall.args || {};

    if (toolName === 'run_command') {
      const commandLine = args.CommandLine || args.commandLine || '';
      const violation = checkCommandSecurity(commandLine);
      if (violation) {
        decision = 'deny';
        reason = `[Security Guard Denied]: ${violation}`;
      }
    } else if (['write_to_file', 'replace_file_content', 'multi_replace_file_content'].includes(toolName)) {
      const targetFile = args.TargetFile || args.targetFile || '';
      const violation = checkFileSecurity(targetFile);
      if (violation) {
        decision = 'deny';
        reason = `[Security Guard Denied]: ${violation}`;
      }
    }
  } catch (err) {
    console.error(`[dev-harness security-guard error]:`, err.message);
  } finally {
    const result = { decision };
    if (reason) result.reason = reason;
    process.stdout.write(JSON.stringify(result) + '\n');
  }
}

main();
