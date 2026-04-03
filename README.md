# Kairos Daemon

Persistent local daemon for AI research workflows.

### Features
- Runs continuously in the background
- Watches your project folder for .js .ts .py file changes
- Maintains a timestamped research journal (kairos-journal.log)
- Provides periodic insights every 8 minutes
- Zero external dependencies

### How to run
node kairos-daemon/kairos-daemon.js

Logs appear in both console and kairos-journal.log file.
