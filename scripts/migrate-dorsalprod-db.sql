--
-- Copyright 2016 Dorsal Corp.
--


-- Stored procedure to migrate dorsalprod database
--
-- Notes:
--    Until version 1.2.0 no schema version was stored in GlobalMetaData entity.
--

set client_min_messages='warning';

CREATE OR REPLACE FUNCTION fn_migrate_dorsalprod() RETURNS VOID AS $$
DECLARE
	currentSchemaVersion varchar;
	schemaUpdated varchar;
BEGIN

    -- Get initial version of the current database. If not set then assume is v1.1
    SELECT value INTO currentSchemaVersion FROM global_metadata WHERE name = 'CurrentSchemaVersion';
    IF (currentSchemaVersion is NULL) THEN
        currentSchemaVersion = '1.1.0';
        INSERT INTO global_metadata (name, value, value_type) VALUES ('CurrentSchemaVersion',currentSchemaVersion,'ISSTRING');
        INSERT INTO global_metadata (name, value, value_type) VALUES ('SchemaUpdated',now(), 'ISSTRING');
    END IF;

    --
    -- Incremental updates -- go over each version
    --

    -- START Upgrade from v1.1.x to v1.2.x
    IF (currentSchemaVersion = '1.1.0') THEN

        -- Expert attributes

        INSERT INTO expert_attribute(name, description) VALUES('US-RESIDENT', 'Expert residing in the US');
        INSERT INTO expert_attribute(name, description) VALUES('EU-RESIDENT', 'Expert residing in the European Union');
        INSERT INTO expert_attribute(name, description) VALUES('ATT-ONLY', 'Experts working exclusively on ATT projects');
        INSERT INTO expert_attribute(name, description) VALUES('VERIZON-ONLY', 'Experts working exclusively on Verizon projects');

        -- Expert profiles


		currentSchemaVersion = '1.2.0';
		UPDATE global_metadata set value = currentSchemaVersion where name = 'CurrentSchemaVersion';
		SELECT value INTO schemaUpdated FROM global_metadata WHERE name = 'SchemaUpdated';
		IF (schemaUpdated is NULL) THEN
			INSERT INTO global_metadata (name, value, value_type) VALUES ('SchemaUpdated',now(), 'ISTRING');
		ELSE
			UPDATE global_metadata set value = now() where name = 'SchemaUpdated';
		END IF;
	END IF;

-- END Upgrade from v1.1.x to v1.2.x

END;
$$ LANGUAGE plpgsql;

SELECT fn_migrate_dorsalprod();

DROP FUNCTION IF EXISTS fn_migrate_dorsalprod();

