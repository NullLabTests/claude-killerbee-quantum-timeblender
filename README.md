# Kairos Daemon

Persistent local daemon for AI research workflows.

### What it does
- Runs continuously in the background
- Watches your project folder for file changes
- Maintains a timestamped research journal
- Provides periodic insights and suggestions
- Zero external dependencies (just Node.js)

### How to run
node kairos-daemon/kairos-daemon.js

The daemon will log activity to both console and kairos-journal.log.
