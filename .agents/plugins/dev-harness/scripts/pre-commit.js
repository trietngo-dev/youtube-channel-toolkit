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

    const workspaceRoot = (payload.workspacePaths && payload.workspacePaths[0]) || process.cwd();
    const config = loadConfig(workspaceRoot);

    const toolCall = payload.toolCall || {};
    const args = toolCall.args || {};
    const commandLine = args.CommandLine || args.commandLine || '';

    // Check if command is git commit
    const isGitCommit = /\bgit\s+commit\b/i.test(commandLine);

    if (isGitCommit) {
      // Check if preCommit hook is enabled
      if (config && config.hooks && config.hooks.preCommit === false) {
        process.stdout.write(JSON.stringify({ decision: 'allow' }) + '\n');
        return;
      }

      const errors = [];

      // 1. Type check if tsconfig exists
      const tsconfigPath = path.join(workspaceRoot, 'tsconfig.json');
      if (fs.existsSync(tsconfigPath)) {
        try {
          execSync('npx tsc --noEmit', {
            cwd: workspaceRoot,
            stdio: 'pipe',
            timeout: 20000,
          });
        } catch (err) {
          const output = err.stdout ? err.stdout.toString() : err.message;
          errors.push(`TypeScript typecheck errors:\n${output.slice(0, 300)}`);
        }
      }

      // 2. Linter check
      const linter = (config && config.tools && config.tools.linter) || 'eslint';
      if (linter === 'biome') {
        try {
          execSync('npx biome check .', {
            cwd: workspaceRoot,
            stdio: 'pipe',
            timeout: 15000,
          });
        } catch (err) {
          const output = err.stdout ? err.stdout.toString() : err.message;
          errors.push(`Biome lint errors:\n${output.slice(0, 300)}`);
        }
      } else {
        // Only run eslint if config files exist
        const hasEslint = fs.existsSync(path.join(workspaceRoot, '.eslintrc')) ||
          fs.existsSync(path.join(workspaceRoot, '.eslintrc.js')) ||
          fs.existsSync(path.join(workspaceRoot, '.eslintrc.json')) ||
          fs.existsSync(path.join(workspaceRoot, 'eslint.config.js')) ||
          fs.existsSync(path.join(workspaceRoot, 'eslint.config.mjs'));
        if (hasEslint) {
          try {
            execSync('npx eslint .', {
              cwd: workspaceRoot,
              stdio: 'pipe',
              timeout: 15000,
            });
          } catch (err) {
            const output = err.stdout ? err.stdout.toString() : err.message;
            errors.push(`ESLint errors:\n${output.slice(0, 300)}`);
          }
        }
      }

      if (errors.length > 0) {
        decision = 'deny';
        reason = `Pre-commit checks failed:\n${errors.join('\n\n')}`;
      }
    }
  } catch (err) {
    console.error(`[dev-harness pre-commit error]:`, err.message);
  } finally {
    const result = { decision };
    if (reason) result.reason = reason;
    process.stdout.write(JSON.stringify(result) + '\n');
  }
}

main();
