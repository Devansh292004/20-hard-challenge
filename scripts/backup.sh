#!/bin/bash

# 20 Hard Challenge - Local Data Backup Script
# Backs up challenge data to prevent data loss

set -e  # Exit on any error

echo "💾 20 Hard Challenge - Backup Utility"
echo "======================================="

# Define paths
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backups"
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.tar.gz"
DATA_DIR="src/data"

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo "✅ Created backup directory: $BACKUP_DIR"
fi

# Check if data directory exists
if [ ! -d "$DATA_DIR" ]; then
    echo "❌ Error: Data directory not found: $DATA_DIR"
    exit 1
fi

# Create backup
echo "\n📦 Creating backup..."
tar -czf "$BACKUP_FILE" "$DATA_DIR" 2>/dev/null

if [ -f "$BACKUP_FILE" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo "✅ Backup created successfully!"
    echo "   File: $BACKUP_FILE"
    echo "   Size: $BACKUP_SIZE"
else
    echo "❌ Error: Backup creation failed"
    exit 1
fi

# List backed up files
echo "\n📄 Backed up files:"
tar -tzf "$BACKUP_FILE" | head -20

FILE_COUNT=$(tar -tzf "$BACKUP_FILE" | wc -l)
if [ "$FILE_COUNT" -gt 20 ]; then
    echo "   ... and $((FILE_COUNT - 20)) more files"
fi

# Clean up old backups (keep last 10)
echo "\n🧹 Cleaning old backups..."
BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | wc -l)

if [ "$BACKUP_COUNT" -gt 10 ]; then
    OLD_BACKUPS=$(ls -1t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +11)
    for OLD_BACKUP in $OLD_BACKUPS; do
        rm "$OLD_BACKUP"
        echo "   🗑️  Removed: $(basename "$OLD_BACKUP")"
    done
    echo "✅ Cleanup complete (kept 10 most recent backups)"
else
    echo "ℹ️  No cleanup needed (only $BACKUP_COUNT backups exist)"
fi

# List all current backups
echo "\n📚 Current backups:"
ls -lh "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}' || echo "   No backups found"

echo "\n======================================="
echo "✅ Backup completed successfully!"
echo ""
echo "💡 Tips:"
echo "   - Backups are stored in: $BACKUP_DIR/"
echo "   - To restore: tar -xzf $BACKUP_FILE"
echo "   - Regular backups prevent data loss"
echo "   - Keep backups in a separate location for safety"
