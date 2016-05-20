
--
-- Cleanup
--
DROP DATABASE IF EXISTS dorsaldev;
DROP DATABASE IF EXISTS dorsalprod;

--
-- Create default users
--
DROP USER IF EXISTS dorsal;
CREATE USER dorsal WITH PASSWORD 'dorsal';

--
-- Create default databases
--
CREATE DATABASE dorsaldev  OWNER=dorsal;
CREATE DATABASE dorsalprod  OWNER=dorsal;

--
-- Initial privileges for the databases
--

GRANT ALL PRIVILEGES ON DATABASE dorsaldev to dorsal;
GRANT ALL PRIVILEGES ON DATABASE dorsalprod to dorsal;
