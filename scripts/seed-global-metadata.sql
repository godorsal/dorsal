--
-- Seed data for global metadata entries
--

-- set the sequence so that it is above the values from the initial deployment

SELECT setval('global_metadata_id_seq', 10);

-- Values for Dorsal v1.0.1 release
INSERT INTO global_metadata(name,value,value_type) VALUES('self-registration-enabled', 1, 'ISINTEGER');
