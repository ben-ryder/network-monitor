
-- Add SQL in this file to create the database tables for your API
CREATE TABLE IF NOT EXISTS tests (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    download_speed DECIMAL NOT NULL,
    upload_speed DECIMAL NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
