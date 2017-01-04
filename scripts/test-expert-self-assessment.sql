--
-- Copyright 2017 Dorsal Corp.
--


-- Stored procedure to insert expert assessment data into test database
--
-- Notes:
--    This script is run after the migration script
--

set client_min_messages='warning';

CREATE OR REPLACE FUNCTION fn_expert_assessement_dorsaltest() RETURNS VOID AS $$
DECLARE
	expertid bigint;
BEGIN

    -- Go over all experts that have completed the self assessement

    -- Tom John
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'tom';

    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Oracle DB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MS SQL'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDB Cluster'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Tungsten Cluster'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Galera Cluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL-XL'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Xtra Backup'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Ansible'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Puppet'), 5, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Chef'), 4, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'CFEngine'), 3, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Neo4J'), 2, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Shell scripting'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PERL programming'), 5, expertid );

    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Administrator'), 5, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Architect'), 4, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Developer'), 3, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'DevOps'), 2, expertid );
    INSERT INTO jobrole_expert_score (jobrole_id, score, expertaccount_id) VALUES((SELECT id FROM job_role WHERE name like 'Data Model Designer'), 1, expertid );

    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Configuration Review'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Benchmarking'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Query tuning'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Installations'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS RDBS'), 1, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Cluster Design'), 5, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'Database HA'), 4, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'OpenStack infrastructure'), 3, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'VMware infrastructure'), 2, expertid );
    INSERT INTO skill_expert_score (skill_id, score, expertaccount_id) VALUES((SELECT id FROM skill WHERE name like 'AWS infrastructure'), 1, expertid );


    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MySQL transitions'), 5, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to MongoDB transitions'), 4, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Oracle to PostgreSQL transitions'), 3, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'Database Infrastructure'), 2, expertid );
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MS SQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 5, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 4, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 3, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 2, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );



    -- Jack Wolf
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'jack';



    -- Olivia Smith
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'olivia';



    -- Kurt Vancouver
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = 'kurt';




END;
$$ LANGUAGE plpgsql;

SELECT fn_expert_assessement_dorsaltest();

DROP FUNCTION IF EXISTS fn_expert_assessement_dorsaltest();
