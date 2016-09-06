--
-- Seed data for global metadata entries
--

-- Enable Concierge Chat capabilities


-- Values for Dorsal v1.0.2 release
INSERT INTO global_metadata(name,value,value_type) VALUES('conciergeAvailableForChat', 'Dorsal Concierge', 'ISSTRING');
INSERT INTO global_metadata(name,value,value_type) VALUES('conciergeChatUrl', 'https://www.hipchat.com/gELm8NKwU', 'ISSTRING');
INSERT INTO global_metadata(name,value,value_type) VALUES('conciergeAvailable', 'false', 'ISBOOLEAN');
