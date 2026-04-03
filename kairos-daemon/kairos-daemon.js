#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(process.cwd(), 'kairos-journal.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  console.log(`[Kairos] ${message}`);
  try {
    fs.appendFileSync(LOG_FILE, entry);
  } catch (err) {
    console.error(`[Kairos] Failed to write to log: ${err.message}`);
  }
}

function getInsight() {
  const insights = [
    "Consider implementing vector-based memory for long context retention.",
    "Test retry logic on tool calls - many agent systems fail here.",
    "Track file changes and auto-summarize modifications for better context.",
    "Experiment with periodic state serialization for reproducible runs.",
    "Monitor CPU and memory usage during long agent runs."
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

function startDaemon() {
  log("Kairos daemon started");
  log("Persistent companion active - monitoring activity");

  try {
    const watcher = fs.watch(process.cwd(), { recursive: true }, (event, filename) => {
      if (filename && (filename.endsWith('.js') || filename.endsWith('.ts') || filename.endsWith('.py'))) {
        log(`Detected change in: ${filename}`);
      }
    });
  } catch (err) {
    log(`Watcher failed: ${err.message}`);
  }

  setInterval(() => {
    const insight = getInsight();
    log(`Insight: ${insight}`);
  }, 8 * 60 * 1000);

  log(`Journal file: ${LOG_FILE}`);
  log("Daemon is running. Press Ctrl+C to stop.");
}

if (require.main === module) {
  startDaemon();

  process.on('SIGINT', () => {
    log("Daemon shutting down");
    process.exit(0);
  });
}

module.exports = { startDaemon };
