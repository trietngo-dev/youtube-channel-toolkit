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

    // Check if auditLog hook is disabled
    if (config && config.hooks && config.hooks.auditLog === false) {
      process.stdout.write('{}\n');
      return;
    }

    const logsDir = path.join(workspaceRoot, '.agents', 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const logFilePath = path.join(logsDir, 'audit-trail.jsonl');
    const timestamp = new Date().toISOString();

    let entry = {
      timestamp,
      conversationId: payload.conversationId || 'unknown',
    };

    if (payload.toolCall) {
      const toolCall = payload.toolCall;
      const args = toolCall.args || {};
      entry.type = 'tool_use';
      entry.tool = toolCall.name || 'unknown';
      entry.stepIdx = payload.stepIdx !== undefined ? payload.stepIdx : null;
      if (args.CommandLine || args.commandLine) {
        entry.command = args.CommandLine || args.commandLine;
      }
      if (args.TargetFile || args.targetFile) {
        entry.targetFile = args.TargetFile || args.targetFile;
      }
      if (payload.error) {
        entry.error = payload.error;
      }
    } else if (payload.invocationNum !== undefined) {
      entry.type = 'invocation';
      entry.invocationNum = payload.invocationNum;
      entry.initialNumSteps = payload.initialNumSteps || 0;
    } else {
      entry.type = 'event';
      entry.data = payload;
    }

    fs.appendFileSync(logFilePath, JSON.stringify(entry) + '\n', 'utf8');
  } catch (err) {
    console.error(`[dev-harness audit-logger error]:`, err.message);
  } finally {
    process.stdout.write('{}\n');
  }
}

main();
