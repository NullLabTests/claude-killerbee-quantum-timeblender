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
  } catch (e) {}
}

function getInsight() {
  const insights = [
    "Consider vector-based memory for long context retention.",
    "Test retry logic on tool calls.",
    "Track file changes for better context.",
    "Experiment with periodic state serialization.",
    "Monitor CPU and memory during long runs."
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

function startDaemon() {
  log("Kairos daemon started");
  log("Persistent companion active - monitoring activity");

  try {
    fs.watch(process.cwd(), { recursive: true }, (event, filename) => {
      if (filename && (filename.endsWith('.js') || filename.endsWith('.ts') || filename.endsWith('.py'))) {
        log(`Detected change in: ${filename}`);
      }
    });
  } catch (e) {}

  setInterval(() => {
    log(`Insight: ${getInsight()}`);
  }, 480000);

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
