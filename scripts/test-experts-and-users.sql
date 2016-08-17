--
-- Seeding test data
-- Loading experts into experts table
--

-- create the users
INSERT INTO jhi_user(id,login,password_hash,first_name,last_name,email,activated,lang_key,created_by,created_date) VALUES
 (10,'tom','$2a$10$poSz5Yk6X8peZkVlL6VjZOMn1SuVsTgaq.MD3gTo3xrkYYf5Izl4G','Tom','Johns','tom@localhost',true,'en','system', now()),
 (11,'jack','$2a$10$hOpWRSLo1M6NRPKH3.U0uePUd32wvK/QctH6..UVoEldFGXqITMma','Jack','Wolf','jackw@localhost',true,'en','system', now()),
 (12,'olivia','$2a$10$MSGNpr0..slfnDdPQouXCu787GyThCDwsPWbe8136JUjJMvhmYMqq','Olivia','Smith','olivia@localhost',true,'en','system', now()),
 (13,'kurt','$2a$10$poSz5Yk6X8peZkVlL6VjZOMn1SuVsTgaq.MD3gTo3xrkYYf5Izl4G','Kurt','Vancouver','kurtv@localhost',true,'en','system', now());

-- create the user permissions
INSERT INTO jhi_user_authority(user_id,authority_name) VALUES
 (10,'ROLE_USER'),
 (11,'ROLE_USER'),
 (12,'ROLE_USER'),
 (13,'ROLE_USER');

-- create the experts

INSERT INTO expert_account(id,phone,skype,othercommunication,location,expert_score,handle,languages,image_path,firsttechnology_id,secondtechnology_id,issueexpertise_id,user_id,is_available,expert_bio,number_of_cases,expert_since,welcome_message,profile_visibility,expert_availability) VALUES
(10,'415-555-5512','mysql_joe','none','Bay Area',80,'mysql_expert_joe','English','content/images/dynamic/John-Smith.jpg',1,2,1,10,true,'MySQL certified professional. 20 years of experience',1,now(),'Welcome my name is Tom Johns. Best way to get in contact with me is over Skype.','INTERN','FULL_TIME'),
(11,'212-555-5512','postgresql_jack','none','New York City',80,'postgreSQL_expert_jack','English','content/images/dynamic/John-Doe.jpg',3,1,1,11,true,'PostgreSQL commiter for 10 years',1,'2016-07-11 18:11:05.461','Welcome my name is Jack Wolf. Best way to get in contact with me is over email.','INTERN','MON_FRI'),
(12,'312-555-5512','nosql_olivia','none','Chicago Area',80,'nosql_expert_olivia','English,Spanish','content/images/dynamic/female.png',4,3,1,12,true,'MongoDB specialist. Breathes, thinks in NoSQL. Professional support of DB systems for over 15 years.',1,now(),'Welcome my name is Olivia Smith. Best way to get in contact with me is over phone.','INTERN','MON_FRI'),
(13,'415-444-5512','mysql_kurt','none','Bay Area',50,'mysql_expert_kurt','English','content/images/dynamic/formal_male.png',1,2,4,13,true,'MySQL certified professional. 10 years of experience in the field',1,now(),'Welcome my name is Kurt Vancouver. Best way to get in contact with me is over Skype.','INTERN','EVENING');

-- Add badges
INSERT INTO expertbadge(id,expert_badge_count,expertaccount_id,badge_id) VALUES
 (10,3,10,1),
 (11,3,10,2),
 (12,3,11,3),
 (13,3,11,4),
 (14,3,12,5),
 (15,3,12,7),
 (16,3,13,9),
 (17,3,13,1);
