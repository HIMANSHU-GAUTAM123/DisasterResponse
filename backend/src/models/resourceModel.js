// Supabase 'resources' table schema (for reference)
// Columns:
// - id: serial primary key
// - name: text
// - type: text
// - location: text
// - geography: geography(Point, 4326) (PostGIS)
// - available: boolean
// - tags: text[]
// - created_at: timestamptz default now()
//
// Recommended Indexes:
// CREATE INDEX idx_resources_geography ON resources USING GIST (geography);
// CREATE INDEX idx_resources_tags ON resources USING GIN (tags); 