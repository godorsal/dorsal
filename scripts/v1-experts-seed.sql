--
-- Loading v1 experts into system
--
--
-- ATT Administrator
--
INSERT INTO jhi_user(id,login,password_hash,first_name,last_name,email,activated,lang_key,created_by,created_date) VALUES
 (19,'dgonzalez','$2a$10$eyEQ7YbNv.lFVMOQuP2V9ONrHRf7iuOp02huoMfQ2wZ9C.5mrLfO2','David','Gonzalez','dg1434@att.com',true,'en','system',now());

-- create the users
INSERT INTO jhi_user(id,login,password_hash,first_name,last_name,email,activated,lang_key,created_by,created_date) VALUES
 (20,'mthomas','$2a$10$eyEQ7YbNv.lFVMOQuP2V9ONrHRf7iuOp02huoMfQ2wZ9C.5mrLfO2','Michael','Thomas','jobs@mikethomas.us',true,'en','system',now()),
 (21,'rbradford','$2a$10$mdawJVdZ1aghbD4QW9Ohbu4CuzpieCH4OWl4vVuqHeikieucVC9Oa','Ronald','Bradford','me@ronaldbradford.com',true,'en','system',now()),
 (22,'wmartin','$2a$10$YTqXaaz5C39PEL7R4i8qrOB3YvS8exdDS.x7qmLXmqwGcrcpX6Kbu','Wayne','Martin','w5martin@yahoo.com',true,'en','system',now()),
 (23,'cyeung','$2a$10$BoWeTnNbQALI1LfUvI0fmevU3YYKP.oG1jW1bYO.3BkA4Nk4FUs8S','Christopher','Yeung','yeung.chris@gmail.com',true,'en','system',now()),
 (24,'keppro','$2a$10$kicv4DAu571XSunA3VCkcegbepXE4iMQRi7bfjvAYQJUgzwx20Xnm','Kep','Protopopov','keppro@keppro.net',true,'en','system',now()),
 (25,'sasha','$2a$10$uw9c.oTeUhHFTr5/gZkwU.oyRW.K/IC5mRuBBOlknEjMuto.oTXPO','Alexander','Nemirovsky','sasha@sats.net',true,'en','system',now()),
 (26,'emccormick','$2a$10$uw9c.oTeUhHFTr5/gZkwU.oyRW.K/IC5mRuBBOlknEjMuto.oTXPO','Eric','McCormick','eric@ericm.net',true,'en','system',now());


-- create the user permissions
INSERT INTO jhi_user_authority(user_id,authority_name) VALUES
 (19,'ROLE_USER'),
 (20,'ROLE_USER'),
 (21,'ROLE_USER'),
 (22,'ROLE_USER'),
 (23,'ROLE_USER'),
 (24,'ROLE_USER'),
 (25,'ROLE_USER'),
 (26,'ROLE_USER');

-- create the experts

INSERT INTO expert_account(id,phone,skype,othercommunication,location,expert_score,handle,languages,image_path,firsttechnology_id,secondtechnology_id,issueexpertise_id,user_id,is_available,expert_bio,number_of_cases,expert_since,welcome_message,profile_visibility,expert_availability) VALUES
(20,'','','none','Atlanta',2,'','English','content/images/dynamic/formal_male.png',1,2,2,20,true,'',0,now(),'Welcome my name is Michael Thomas. Best way to get in touch with me is over email.','INTERN','MON_FRI'),
(21,'','','none','New York',5,'','English','content/images/dynamic/Ronald-Bradford.png',1,2,2,21,true,'',0,now(),'Welcome my name is Ronald Bradford. Best way to get in touch with me is over email.','INTERN','FULL_TIME'),
(22,'','','none','Tenessee',4,'','English','content/images/dynamic/Wayne-Martin.png',1,2,2,22,true,'',0,now(),'Welcome my name is Wayne Martin. Best way to get in touch with me is over email.','INTERN','FULL_TIME'),
(23,'','','none','New York',5,'','English','content/images/dynamic/Chris-Yeung.png',1,2,2,23,true,'',0,now(),'Welcome my name is Christopher Yeung. Best way to get in touch with me is over email.','INTERN','FULL_TIME'),
(24,'','','none','Bay Area',4,'','English','content/images/dynamic/formal_male.png',1,2,2,24,true,'',0,now(),'Welcome my name is Kep Protopopov. Best way to get in touch with me is over email.','INTERN','FULL_TIME'),
(26,'','','none','Bay Area',5,'','English','content/images/dynamic/Eric-McCormick.png',1,2,2,26,true,'',0,now(),'Welcome my name is Eric McCormick. Best way to get in touch with me is over email.','INTERN','FULL_TIME');


-- On hold for now
--VALUES(25,'','','none','Bay Area',0,'','English','content/images/dynamic/formal_male.png',1,2,2,25,true,'',0,now(),'Welcome my name is Alexander Nemirovsky. Best way to get in touch with me is over email.','INTERN','EVENING');
