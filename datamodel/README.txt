
Created: June 21, 2016
Last update:

################################
For generating the Datamodel the JHipster IDL generator is used.

To generate the model, api & code the following steps are necessary:

1) Use the IDL studio to generate the Datamodel (https://jhipster.github.io/jdl-studio/)
2) Generate the entities and relationships
3) Save the *.jh file into the dorsal/datamodel folder (example: jh-status-issue-technology.jh)
4) From the root of the project (/dorsal) run the following command:
yo jhipster:import-jdl datamodel/jh-status-issue-technology.jh

5) Follow the dialogs and observe the input process
6) Before starting the build reset the database (not necessary when adding new entities but when modifying existing entities) 
with the following command:

psql -U postgres -f scripts/setup-dorsal-psql-db.sql

7) Clean build of application. When starting it will create all new database tables.

Notes:
--> Seed data can be provided for liquidbase initialization. Will deal with that once we have the datamodel in place
