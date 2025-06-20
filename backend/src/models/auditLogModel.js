// Supabase 'audit_logs' table schema (for reference)
// Columns:
// - id: serial primary key
// - action: text (e.g., 'create', 'update', 'delete')
// - user: text
// - disaster_id: integer (references disasters.id)
// - details: jsonb
// - timestamp: timestamptz default now()
//
// Recommended Indexes:
// CREATE INDEX idx_audit_logs_disaster_id ON audit_logs (disaster_id); 