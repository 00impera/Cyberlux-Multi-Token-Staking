-- Cyberlux D1 Database Schema
-- Run: npx wrangler d1 execute cyberlux-db --file=schema.sql

CREATE TABLE IF NOT EXISTS stake_events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  token_id     INTEGER NOT NULL,
  event_type   TEXT NOT NULL,
  wallet       TEXT NOT NULL,
  token_addr   TEXT NOT NULL,
  amount       TEXT NOT NULL,
  tx_hash      TEXT,
  created_at   INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS card_reads (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  token_id   INTEGER NOT NULL,
  led_color  TEXT NOT NULL,
  status     TEXT NOT NULL,
  ip_hash    TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS apr_history (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  token_addr TEXT NOT NULL,
  apr        INTEGER NOT NULL,
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_stake_wallet   ON stake_events(wallet);
CREATE INDEX IF NOT EXISTS idx_stake_token_id ON stake_events(token_id);
CREATE INDEX IF NOT EXISTS idx_card_reads_id  ON card_reads(token_id);
