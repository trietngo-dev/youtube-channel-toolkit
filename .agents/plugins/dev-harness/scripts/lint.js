'use strict';

const { execSync } = require('child_process');
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
    // In case stdin is already ended
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

async function main() {
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

    const workspaceRoot = (payload.workspacePaths && payload.workspacePaths[0]) || process.cwd();
    const config = loadConfig(workspaceRoot);

    // Check if autoLint is enabled
    if (config && config.hooks && config.hooks.autoLint === false) {
      process.stdout.write('{}\n');
      return;
    }

    const toolCall = payload.toolCall || {};
    const args = toolCall.args || {};
    const targetFile = args.TargetFile || args.targetFile;

    if (targetFile && fs.existsSync(targetFile)) {
      const ext = path.extname(targetFile);
      if (['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'].includes(ext)) {
        const linter = (config && config.tools && config.tools.linter) || 'eslint';
        if (linter === 'biome') {
          try {
            execSync(`npx biome check --apply "${targetFile}"`, {
              cwd: workspaceRoot,
              stdio: 'ignore',
              timeout: 10000,
            });
          } catch {
            // Ignore linter error output
          }
        } else {
          try {
            execSync(`npx eslint --fix "${targetFile}"`, {
              cwd: workspaceRoot,
              stdio: 'ignore',
              timeout: 10000,
            });
          } catch {
            // Ignore linter error output
          }
        }
      }
    }
  } catch (err) {
    console.error(`[dev-harness auto-lint error]:`, err.message);
  } finally {
    process.stdout.write('{}\n');
  }
}

main();
