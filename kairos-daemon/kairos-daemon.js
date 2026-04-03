#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(process.cwd(), 'kairos-journal.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  console.log(`[Kairos] ${message}`);
  fs.appendFileSync(LOG_FILE, entry);
}

function getInsight() {
  const insights = [
    "Consider implementing vector-based memory for long context retention.",
    "Test retry logic on tool calls - many agent systems fail here.",
    "Track file changes and auto-summarize modifications for better context.",
    "Experiment with periodic state serialization for reproducible runs."
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

function startDaemon() {
  log("Kairos daemon started");
  log("Persistent companion active - monitoring activity");

  const watcher = fs.watch(process.cwd(), { recursive: true }, (event, filename) => {
    if (filename && (filename.endsWith('.js') || filename.endsWith('.ts'))) {
      log(`Detected change in: ${filename}`);
    }
  });

  setInterval(() => {
    const insight = getInsight();
    log(`Insight: ${insight}`);
  }, 10 * 60 * 1000);

  log(`Journal file: ${LOG_FILE}`);
  log("Daemon running. Press Ctrl+C to stop.");
}

if (require.main === module) {
  startDaemon();
  process.on('SIGINT', () => {
    log("Daemon shutting down");
    process.exit(0);
  });
}

module.exports = { startDaemon };
