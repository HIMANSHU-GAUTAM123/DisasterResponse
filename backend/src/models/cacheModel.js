// Supabase 'cache' table schema (for reference)
// Columns:
// - key: text primary key
// - value: jsonb
// - created_at: timestamptz default now()
//
// Recommended Indexes:
// CREATE INDEX idx_cache_created_at ON cache (created_at); 