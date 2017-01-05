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
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );

    -- Chris Yueng
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'cyeung';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );


    -- Kep
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'keppro';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );


    -- Sasha
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'sasha';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );


    -- Eric McCormick
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'emccormick';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );


    -- Michael Banker
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'mbanker';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );


    -- Brijesh Savaliya
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'bsavaliya';
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 1, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 1, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 1, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );

END;
$$ LANGUAGE plpgsql;

SELECT fn_expert_assessement_dorsalprod();

DROP FUNCTION IF EXISTS fn_expert_assessement_dorsalprod();
