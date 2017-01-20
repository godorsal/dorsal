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
	technologypropertyid bigint;
	technologyid bigint;
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
        -- Product --
        INSERT INTO product(name,code) VALUES('MySQL', 'mysql');
        INSERT INTO product(name,code) VALUES('MariaDB', 'mariadb');
        INSERT INTO product(name,code) VALUES('PostgreSQL', 'postgresql');
        INSERT INTO product(name,code) VALUES('MongoDB', 'mongodb');
        INSERT INTO product(name,code) VALUES('Oracle DB', 'oracledb');
        INSERT INTO product(name,code) VALUES('MS SQL', 'mssql');
        INSERT INTO product(name,code) VALUES('Hadoop', 'hadoop');
        INSERT INTO product(name,code) VALUES('XtraDB Cluster', 'xtradbcluster');
        INSERT INTO product(name,code) VALUES('Tungsten Cluster', 'tungstencluster');
        INSERT INTO product(name,code) VALUES('Galera Cluster', 'galeracluster');
        INSERT INTO product(name,code) VALUES('PGCluster', 'pgcluster');
        INSERT INTO product(name,code) VALUES('PGPool', 'pgpool');
        INSERT INTO product(name,code) VALUES('Postgres-XL', 'postgresqlxl');
        INSERT INTO product(name,code) VALUES('Postgres-BDR', 'postgresbdr');
        INSERT INTO product(name,code) VALUES('Xtra Backup', 'xtrabackup');
        INSERT INTO product(name,code) VALUES('Ansible', 'ansible');
        INSERT INTO product(name,code) VALUES('Puppet', 'puppet');
        INSERT INTO product(name,code) VALUES('Chef', 'chef');
        INSERT INTO product(name,code) VALUES('CFEngine', 'cfengine');
        INSERT INTO product(name,code) VALUES('Neo4J', 'neo4j');
        INSERT INTO product(name,code) VALUES('Shell scripting', 'shellscripting');
        INSERT INTO product(name,code) VALUES('PERL programming', 'perlprogramming');
        INSERT INTO product(name,code) VALUES('Druid', 'druid');
        INSERT INTO product(name,code) VALUES('MemSQL', 'memsql');
        INSERT INTO product(name,code) VALUES('Oracle Cluster', 'oraclecluster');

-- Job Role --
        INSERT INTO job_role(name, code) VALUES('Administrator' , 'administrator');
        INSERT INTO job_role(name, code) VALUES('Architect', 'architect');
        INSERT INTO job_role(name, code) VALUES('Developer', 'developer');
        INSERT INTO job_role(name, code) VALUES('DevOps', 'devops');
        INSERT INTO job_role(name, code) VALUES('Data Model Designer', 'datamodeldesigner');

        -- Skills
        INSERT INTO skill(name, code) VALUES('Configuration Review', 'configurationreview');
        INSERT INTO skill(name, code) VALUES('Benchmarking', 'benchmarking');
        INSERT INTO skill(name, code) VALUES('Query tuning', 'querytuning');
        INSERT INTO skill(name, code) VALUES('Installations', 'installations');
        INSERT INTO skill(name, code) VALUES('AWS RDBS', 'awsrdbs');
        INSERT INTO skill(name, code) VALUES('Cluster Design', 'clusterdesign');
        INSERT INTO skill(name, code) VALUES('Database HA', 'databaseha');
        INSERT INTO skill(name, code) VALUES('OpenStack infrastructure', 'openstackinfrastructure');
        INSERT INTO skill(name, code) VALUES('VMware infrastructure', 'vmwareinfrastructure');
        INSERT INTO skill(name, code) VALUES('AWS infrastructure', 'awsinfrastructure');

        -- Speciality
        INSERT INTO speciality(name, code) VALUES('Oracle to MySQL transitions', 'oracletomysqltransition');
        INSERT INTO speciality(name, code) VALUES('Oracle to MongoDB transitions', 'oracletomongodbtransitions');
        INSERT INTO speciality(name, code) VALUES('Oracle to PostgreSQL transitions', 'oracletopostgresqltransitions');
        INSERT INTO speciality(name, code) VALUES('Database Infrastructure', 'databaseinfrastructure');
        INSERT INTO speciality(name, code) VALUES('MS SQL to FOSS transitions', 'mssqltofosstransitions');

        -- Technology table is used for version 1.0 & 1.1 intake page which will be still used
        -- New technology definition starting in v1.2 will use higher range of ID's
        -- set the sequence so that it is above the values from the initial deployment

        PERFORM setval('technology_id_seq', 10);

        INSERT INTO technology(name, code) VALUES('SQL', 'sql');
        INSERT INTO technology(name, code) VALUES('NoSQL', 'nosql');
        INSERT INTO technology(name, code) VALUES('Cluster', 'cluster');
        INSERT INTO technology(name, code) VALUES('Backup', 'backup');
        INSERT INTO technology(name, code) VALUES('Replication', 'replication');
        INSERT INTO technology(name, code) VALUES('Monitoring', 'monitoring');


        -- Add more products to the intake page. Values will be used to match against expert profile data

        SELECT tp.id INTO technologypropertyid FROM technologyproperty tp WHERE name like 'Configuration';
        SELECT t.id INTO technologyid FROM technology t WHERE name like 'MySQL';

        PERFORM setval('technologypropertyvalue_id_seq', 60);
        INSERT INTO technologypropertyvalue(value, technology_id, technologyproperty_id) VALUES('Xtra Backup',technologyid,technologypropertyid);

        SELECT t.id INTO technologyid FROM technology t WHERE name like 'MariaDB';
        INSERT INTO technologypropertyvalue(value, technology_id, technologyproperty_id) VALUES('Xtra Backup',technologyid,technologypropertyid);

        SELECT t.id INTO technologyid FROM technology t WHERE name like 'PostgreSQL';
        INSERT INTO technologypropertyvalue(value, technology_id, technologyproperty_id) VALUES('Postgres-BDR',technologyid,technologypropertyid);

        -- Concurrent user limit
         INSERT INTO global_metadata (name, value, value_type) VALUES ('EXPERT_CASE_LIMIT','5','ISINTEGER');


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
