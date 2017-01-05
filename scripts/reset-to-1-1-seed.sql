--
-- Copyright 2017 Dorsal Corp.
--


-- Stored procedure to insert expert assessment data into production database
--
-- Notes:
--    This script is run after the migration script
--

set client_min_messages='warning';

CREATE OR REPLACE FUNCTION fn_reset_to_1_1_seed() RETURNS VOID AS $$
DECLARE

BEGIN
    -- association table
    DELETE FROM technology_expert_score;
    DELETE FROM product_expert_score;
    DELETE FROM skill_expert_score;
    DELETE FROM jobrole_expert_score;
    DELETE FROM speciality_expert_score;
    DELETE FROM expert_attribute_to_expert;

    -- parent tables
    DELETE FROM expert_attribute;
    DELETE FROM speciality;
    DELETE FROM job_role;
    DELETE FROM skill;
    DELETE FROM product;
    DELETE FROM technology where id > 10;

    -- set schema version
    UPDATE global_metadata set value='1.1.0' WHERE name like 'CurrentSchemaVersion' ;

END;
$$ LANGUAGE plpgsql;

SELECT fn_reset_to_1_1_seed();

DROP FUNCTION IF EXISTS fn_reset_to_1_1_seed();
