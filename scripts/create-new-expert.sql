--
-- Copyright 2017 Dorsal Corp.
--


-- Stored procedure to create new expert account and initialize rich expert profiles
--
-- Notes:
--    This script only runs on DOrsal Application v1.2.x or newer
--

set client_min_messages='warning';

CREATE OR REPLACE FUNCTION fn_expert_create_dorsalprod() RETURNS VOID AS $$
DECLARE
	expertid bigint;
	expertlogin varchar;
	expertfirstname varchar;
	expertlastname varchar;
	expertemail varchar;
BEGIN
    --
    -- The default password used is mysql
    --
    -- Expert ID is in the lower range on the jhi_user table. Range is 1-999
    -- Before running set expert ID to next available ID
    --
    -- Next available ID = 33

    expertid = 33;

    --
    -- Replace placeholders for login, name and email with real values
    --
    expertlogin = 'LOGIN';
	expertfirstname ='FirstName';
	expertlastname = 'LastName';
	expertemail = 'EMAIL-ADDRESS';

    INSERT INTO jhi_user(id,login,password_hash,first_name,last_name,email,activated,lang_key,created_by,created_date)
    VALUES (expertid,expertlogin,'$2a$10$poSz5Yk6X8peZkVlL6VjZOMn1SuVsTgaq.MD3gTo3xrkYYf5Izl4G',expertfirstname,expertlastname,expertemail,true,'en','system',now());


-- create the user permissions
INSERT INTO jhi_user_authority(user_id,authority_name) VALUES
 (expertid,'ROLE_USER');

-- create the expert

INSERT INTO expert_account(id,phone,skype,othercommunication,location,expert_score,handle,languages,image_path,firsttechnology_id,secondtechnology_id,issueexpertise_id,user_id,is_available,expert_bio,number_of_cases,expert_since,welcome_message,profile_visibility,expert_availability) VALUES
(expertid,'','','none','Bay Area',1,'','English','content/images/dynamic/formal_male.png',1,4,2,expertid,true,'',0,now(),'Welcome! Best way to get in touch with me is over email.','INTERN','FULL_TIME');


    -- Go over all experts that have completed the self assessement

    -- Get newly created expert
    SELECT ea.id INTO expertid FROM expert_account ea, jhi_user u WHERE ea.user_id = u.id AND u.login = expertlogin;
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MySQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MariaDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PostgreSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MongoDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'OracleDB'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'MSSQL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Hadoop'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraDBCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'TungstenCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'GaleraCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGCluster'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'PGPool'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-XL'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'Postgres-BDR'), 1, expertid );
    INSERT INTO product_expert_score (product_id, score, expertaccount_id) VALUES((SELECT id FROM product WHERE name like 'XtraBackup'), 1, expertid );
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
    INSERT INTO speciality_expert_score (speciality_id, score, expertaccount_id) VALUES((SELECT id FROM speciality WHERE name like 'MSSQL to FOSS transitions'), 1, expertid );

    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'SQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'NoSQL'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Cluster'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Backup'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Replication'), 1, expertid );
    INSERT INTO technology_expert_score (technology_id, score, expertaccount_id) VALUES((SELECT id FROM technology WHERE name like 'Monitoring'), 1, expertid );


END;
$$ LANGUAGE plpgsql;

SELECT fn_expert_create_dorsalprod();

DROP FUNCTION IF EXISTS fn_expert_create_dorsalprod();
