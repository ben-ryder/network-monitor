-- Cleaning up existing internal if present
DROP DATABASE IF EXISTS network_monitor;

-- Cleaning up existing user if present
DROP USER IF EXISTS network_monitor;

-- Create local_first_backend user and internal
CREATE USER network_monitor WITH PASSWORD 'password' LOGIN;
CREATE DATABASE network_monitor;
GRANT CONNECT ON DATABASE network_monitor TO network_monitor;

-- Switch to new internal
\c local_first_backend

-- Create UUID extension for uuid_generate_v4 support
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant privileges to local_first_backend user after everything is created
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO network_monitor;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO network_monitor;
