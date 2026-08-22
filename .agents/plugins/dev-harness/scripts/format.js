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

    // Check if autoFormat is enabled
    if (config && config.hooks && config.hooks.autoFormat === false) {
      process.stdout.write('{}\n');
      return;
    }

    const toolCall = payload.toolCall || {};
    const args = toolCall.args || {};
    const targetFile = args.TargetFile || args.targetFile;

    if (targetFile && fs.existsSync(targetFile)) {
      const ext = path.extname(targetFile);
      if (['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.html', '.css'].includes(ext)) {
        const formatter = (config && config.tools && config.tools.formatter) || 'prettier';
        if (formatter === 'biome') {
          try {
            execSync(`npx biome format --write "${targetFile}"`, {
              cwd: workspaceRoot,
              stdio: 'ignore',
              timeout: 10000,
            });
          } catch {
            // Ignore format error
          }
        } else {
          try {
            execSync(`npx prettier --write "${targetFile}"`, {
              cwd: workspaceRoot,
              stdio: 'ignore',
              timeout: 10000,
            });
          } catch {
            // Ignore format error
          }
        }
      }
    }
  } catch (err) {
    console.error(`[dev-harness auto-format error]:`, err.message);
  } finally {
    process.stdout.write('{}\n');
  }
}

main();
