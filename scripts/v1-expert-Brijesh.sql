--
-- Loading v1 expert Brijesh Savaliya into system
--
--

-- Create user Brijesh Savaliya


INSERT INTO jhi_user(id,login,password_hash,first_name,last_name,email,activated,lang_key,created_by,created_date) VALUES
 (31,'bsavaliya','$2a$10$uw9c.oTeUhHFTr5/gZkwU.oyRW.K/IC5mRuBBOlknEjMuto.oTXPO','Brijesh','Savaliya','brijesh.savaliya@gmail.com',true,'en','system',now());


-- create the user permissions
INSERT INTO jhi_user_authority(user_id,authority_name) VALUES
 (31,'ROLE_USER');

-- create the expert

INSERT INTO expert_account(id,phone,skype,othercommunication,location,expert_score,handle,languages,image_path,firsttechnology_id,secondtechnology_id,issueexpertise_id,user_id,is_available,expert_bio,number_of_cases,expert_since,welcome_message,profile_visibility,expert_availability) VALUES
(31,'','','none','Bay Area',1,'','English','content/images/dynamic/Brijesh-Savaliya.png',1,4,2,31,true,'',0,now(),'Welcome my name is Brijesh Savaliya. Best way to get in touch with me is over email.','INTERN','FULL_TIME');
