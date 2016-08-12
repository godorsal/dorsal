
--
-- Cleanup
--
DROP DATABASE IF EXISTS dorsalprod;

--
-- Create default users
--
DROP USER IF EXISTS dorsal;
CREATE USER dorsal WITH PASSWORD 'dorsal';


--
-- Create default databases
--
CREATE DATABASE dorsalprod;

--
-- Initial privileges for the databases
--

GRANT ALL PRIVILEGES ON DATABASE dorsalprod to dorsal;
