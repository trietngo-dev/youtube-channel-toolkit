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

    const workspaceRoot = (payload.workspacePaths && payload.workspacePaths[0]) || process.cwd();
    const config = loadConfig(workspaceRoot);

    // Check if autoTest is enabled
    if (config && config.hooks && config.hooks.autoTest === false) {
      process.stdout.write('{}\n');
      return;
    }

    const runner = (config && config.tools && config.tools.testRunner) || 'jest';

    if (runner === 'vitest') {
      try {
        execSync('npx vitest run --silent', {
          cwd: workspaceRoot,
          stdio: 'ignore',
          timeout: 30000,
        });
      } catch {
        // Tests failed or not installed
      }
    } else if (runner === 'mocha') {
      try {
        execSync('npx mocha --recursive --exit', {
          cwd: workspaceRoot,
          stdio: 'ignore',
          timeout: 30000,
        });
      } catch {
        // Tests failed or not installed
      }
    } else {
      // Default to Jest
      try {
        execSync('npx jest --passWithNoTests --silent', {
          cwd: workspaceRoot,
          stdio: 'ignore',
          timeout: 30000,
        });
      } catch {
        // Tests failed or not installed
      }
    }
  } catch (err) {
    console.error(`[dev-harness test-runner error]:`, err.message);
  } finally {
    process.stdout.write('{}\n');
  }
}

main();
