--
-- Copyright 2017 Dorsal Corp.
--


-- Stored procedure to insert expert assessment data into production database
--
-- Notes:
--    This script is run after the migration script
--

set client_min_messages='warning';

CREATE OR REPLACE FUNCTION fn_expert_assessement_dorsalprod() RETURNS VOID AS $$
DECLARE
	expertid bigint;
BEGIN

    -- Go over all experts that have completed the self assessement

    -- Wayne martin
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'wmartin';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 3, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 4, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 4, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 2, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 4, expertid );

    -- Chris Yueng
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'cyeung';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 4, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 5, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 4, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 4, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 4, expertid );


    -- Kep
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'keppro';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 3, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 5, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 4, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 3, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 2, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 5, expertid );


    -- Sasha
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'sasha';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 5, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 5, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 5, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 5, expertid );


    -- Eric McCormick
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'emccormick';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 4, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 3, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 3, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 2, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 4, expertid );


    -- Michael Banker
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'mbanker';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 3, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 2, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 5, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 2, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 5, expertid );


    -- Brijesh Savaliya
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'bsavaliya';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shellscripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERLprogramming'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Druid'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MemSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleCluster'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 2, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 3, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 4, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 3, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 4, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 4, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 4, expertid );

END;
$$ LANGUAGE plpgsql;

SELECT fn_expert_assessement_dorsalprod();

DROP FUNCTION IF EXISTS fn_expert_assessement_dorsalprod();
