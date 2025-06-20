// Supabase 'disasters' table schema (for reference)
// Columns:
// - id: serial primary key
// - title: text
// - description: text
// - location: text
// - tags: text[]
// - geography: geography(Point, 4326) (PostGIS)
// - created_by: text
// - updated_by: text
// - created_at: timestamptz default now()
// - updated_at: timestamptz
// - image_url: text
// - image_verified: jsonb
//
// Recommended Indexes:
// CREATE INDEX idx_disasters_geography ON disasters USING GIST (geography);
// CREATE INDEX idx_disasters_tags ON disasters USING GIN (tags); 