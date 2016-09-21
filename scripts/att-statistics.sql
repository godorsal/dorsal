
-- Get some user registration statistics

select 'Invited accounts', count(*) from jhi_user where email like '%att.com';
select 'Not activated accounts', count(*) from jhi_user where email like '%att.com' AND activated = false;
select 'Active accounts',  count(*) from jhi_user where email like '%att.com' AND activated = true;
select 'Number of support cases', count(*) from supportcase where user_id not in (1,2,3,4,5);

