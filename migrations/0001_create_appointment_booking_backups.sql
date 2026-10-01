CREATE TABLE IF NOT EXISTS appointment_booking_backups (
  notion_page_id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  loan_type TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  slot_key TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'Website',
  cancel_token TEXT NOT NULL DEFAULT '',
  cancel_url TEXT NOT NULL DEFAULT '',
  notion_url TEXT NOT NULL DEFAULT '',
  submitted_at TEXT NOT NULL,
  last_synced_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointment_booking_backups_date
  ON appointment_booking_backups (preferred_date);

CREATE INDEX IF NOT EXISTS idx_appointment_booking_backups_slot
  ON appointment_booking_backups (slot_key);

CREATE INDEX IF NOT EXISTS idx_appointment_booking_backups_status
  ON appointment_booking_backups (status);
