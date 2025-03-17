-- CREATE TABLE master_doctor (
--     doctor_id SERIAL PRIMARY KEY,
--     doctor_name_name VARCHAR(255),
--     address TEXT,
--     city VARCHAR(100),
--     country VARCHAR(100),
--     Kategori VARCHAR(50),
--     contact_phone VARCHAR(20)
-- );

-- INSERT INTO master_doctor (doctor_id, doctor_name_name, address, city, country, Kategori, contact_phone) VALUES
-- (1, 'Dr Mahendra', '123 Main St, Jakarta', 'Jakarta', 'Indonesia', 'Umum', '+62 812-3456-7890'),
-- (2, 'Dr Agung', '45 Orchard Rd, Singapore', 'Singapore', 'Singapore', 'Umum', '+65 9876-5432'),
-- (3, 'Dr Jaya', '789 Market St, Kuala Lumpur', 'Kuala Lumpur', 'Malaysia', 'Spesialis', '+60 123-456-7890'),
-- (4, 'Dr widia', '321 Broadway, Surabaya', 'Surabaya', 'Indonesia', 'Spesialis', '+62 813-9876-5432'),
-- (5, 'Dr Andika', '567 Ocean Blvd, Bangkok', 'Bangkok', 'Thailand', 'Gigi', '+66 987-654-3210');


-- CREATE TABLE master_service (
--     service_id SERIAL PRIMARY KEY,
--     service_name VARCHAR(255),
--     service_group VARCHAR(100)
-- );

-- INSERT INTO master_service (service_id, service_name, service_group) VALUES
-- (1, 'Konsul Dr Umum', 'IGD'),
-- (2, 'Konsul Dr Spesialis', 'Poli Spesialis'),
-- (3, 'Konsul Dr Gigi', 'Poli Gigi'),
-- (4, 'Pemeriksaan Darah', 'Laboratorium'),
-- (5, 'Pemeriksaan Urin', 'Laboratorium');


-- CREATE TABLE master_service_category (
--     service_category_id SERIAL PRIMARY KEY,
--     category_name VARCHAR(255)
-- );

-- INSERT INTO master_service_category (service_category_id, category_name) VALUES
-- (1, 'Perorangan'),
-- (2, 'BPJS'),
-- (3, 'Perusahaan (Mitra)'),
-- (4, 'Perusahaan (Guarantee Letter)'),
-- (5, 'Asuransi Admedika');


-- CREATE TABLE master_user (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(100),
--     email VARCHAR(255),
--     hash_password TEXT,
--     ts_insert TIMESTAMP,
--     status CHAR(1)
-- );

-- INSERT INTO master_user (id, username, email, hash_password, ts_insert, status) VALUES
-- (1, 'johndoe', 'johndoe@gmail.com', '4b0eb5f16387c4f25de52545951250e1', '2025-01-15 00:00:00', 'D'),
-- (2, 'johndoe', 'johndoe@gmail.com', 'daa20fa4d03bf8df25a8222d0646c6bd', '2025-01-15 00:00:00', 'A'),
-- (3, 'michael', 'michael@outlook.com', '6a91cebd576b6d6ac03a38fb88960c47', '2025-01-15 00:00:00', 'D'),
-- (4, 'emilyr', 'emilyr@yahoo.com', '4c73a7c155ef25b4ea56568484253d67', '2025-01-15 00:00:00', 'A'),
-- (5, 'roberts', 'roberts@gmail.com', '0d6d3bf1c4a6da80e88c010dc9110314', '2025-01-15 00:00:00', 'A'),
-- (6, 'alexk', 'alexk@hotmail.com', '15128a7799d575e954c971496e3d3999', '2025-01-15 00:00:00', 'A'),
-- (7, 'samanthaa', 'samantha@outlook.com', '98950009948e8f307dffc846d02d6c5e', '2025-01-15 00:00:00', 'D'),
-- (8, 'michael', 'michael@outlook.com', '5af8467885d3d00a1b08db0944917704', '2025-01-15 00:00:00', 'A'),
-- (9, 'davidp', 'davidp@gmail.com', 'a67f3fa69691228d1a8086f132eec086', '2025-01-15 00:00:00', 'A'),
-- (10, 'laurac', 'laurac@live.com', '0b02125338a61665448bc9e81ed655fe', '2025-01-15 00:00:00', 'A');


-- CREATE TABLE pricelists (
--     pricelist_id SERIAL PRIMARY KEY,
--     service_id INT,
--     service_category_id INT,
--     price NUMERIC(10,2)
-- );

-- INSERT INTO pricelists (pricelist_id, service_id, service_category_id, price) VALUES
-- (1, 1, 1, 75000),
-- (2, 1, 2, 50000),
-- (3, 1, 3, 65000),
-- (4, 1, 4, 70000),
-- (5, 1, 5, 55000),
-- (6, 2, 1, 175000),
-- (7, 2, 2, 125000),
-- (8, 2, 3, 150000),
-- (9, 2, 4, 160000),
-- (10, 2, 5, 135000),
-- (11, 3, 1, 150000),
-- (12, 3, 2, 100000),
-- (13, 3, 3, 125000),
-- (14, 3, 4, 135000),
-- (15, 3, 5, 110000),
-- (16, 4, 1, 350000),
-- (17, 4, 2, 275000),
-- (18, 4, 3, 320000),
-- (19, 4, 4, 330000),
-- (20, 4, 5, 300000),
-- (21, 5, 1, 400000),
-- (22, 5, 2, 320000),
-- (23, 5, 3, 350000),
-- (24, 5, 4, 360000),
-- (25, 5, 5, 330000);


-- CREATE TABLE transaction_details (
--     transaction_id INT,
--     service_id INT,
--     service_category INT,
--     quantity INT,
--     price NUMERIC(10,2),
--     amount NUMERIC(10,2)
-- );

-- INSERT INTO transaction_details (transaction_id, service_id, service_category, quantity, price, amount) VALUES
-- (1, 4, 2, 1, 275000, 275000),
-- (1, 5, 2, 1, 320000, 320000),
-- (2, 3, 1, 1, 150000, 150000),
-- (3, 3, 1, 1, 150000, 150000),
-- (4, 1, 3, 1, 65000, 65000),
-- (5, 5, 3, 1, 350000, 350000),
-- (6, 4, 3, 1, 320000, 320000),
-- (6, 5, 1, 1, 400000, 400000),
-- (7, 2, 5, 1, 135000, 135000),
-- (8, 1, 3, 1, 65000, 65000),
-- (9, 4, 4, 1, 330000, 330000),
-- (9, 5, 5, 1, 330000, 330000),
-- (10, 5, 3, 1, 350000, 350000),
-- (11, 2, 3, 1, 150000, 150000),
-- (12, 4, 4, 1, 330000, 330000),
-- (13, 1, 1, 1, 75000, 75000),
-- (14, 4, 2, 1, 275000, 275000),
-- (14, 5, 5, 1, 330000, 330000),
-- (15, 1, 3, 1, 65000, 65000),
-- (16, 2, 5, 1, 135000, 135000),
-- (17, 4, 5, 1, 300000, 300000),
-- (18, 5, 4, 1, 360000, 360000),
-- (19, 1, 4, 1, 70000, 70000),
-- (20, 2, 2, 1, 125000, 125000),
-- (21, 4, 4, 1, 330000, 330000),
-- (22, 4, 1, 1, 350000, 350000),
-- (22, 5, 3, 1, 350000, 350000),
-- (23, 2, 2, 1, 125000, 125000),
-- (24, 1, 3, 1, 65000, 65000),
-- (25, 4, 3, 1, 320000, 320000);


-- CREATE TABLE transactions (
--     transaction_id SERIAL PRIMARY KEY,
--     service_group VARCHAR(50),
--     doctor_id INT NULL,
--     patient_name VARCHAR(50) NULL,
--     transaction_date DATE,
--     tax_rate DECIMAL(3,2),
--     username VARCHAR(50)
-- );

-- INSERT INTO transactions (transaction_id, service_group, doctor_id, patient_name, transaction_date, tax_rate, username) VALUES
-- (1, 'Laboratorium', NULL, 'Alice', '2024-12-10', 0.15, 'johndoe'),
-- (2, 'Poli Gigi', 5, NULL, '2024-11-08', 0.15, 'johndoe'),
-- (3, 'Poli Gigi', 5, NULL, '2024-10-09', 0.15, 'michael'),
-- (4, 'IGD', 2, NULL, '2024-12-12', 0.00, 'michael'),
-- (5, 'Laboratorium', NULL, 'David', '2024-11-15', 0.10, 'johndoe'),
-- (6, 'Laboratorium', NULL, 'Nana', '2025-01-06', 0.10, 'michael'),
-- (7, 'Poli Spesialis', 3, NULL, '2024-12-01', 0.10, 'emilyr'),
-- (8, 'IGD', 1, NULL, '2024-11-04', 0.00, 'johndoe'),
-- (9, 'Laboratorium', NULL, 'Alice', '2025-01-01', 0.00, 'emilyr'),
-- (10, 'Laboratorium', NULL, 'Alice', '2024-11-10', 0.00, 'roberts'),
-- (11, 'Poli Spesialis', 3, NULL, '2025-01-05', 0.10, 'roberts'),
-- (12, 'Laboratorium', NULL, 'Eve', '2024-10-07', 0.00, 'johndoe'),
-- (13, 'IGD', 2, NULL, '2024-10-22', 0.00, 'roberts'),
-- (14, 'Laboratorium', NULL, 'Charlie', '2025-01-02', 0.10, 'michael'),
-- (15, 'IGD', 2, 'David', '2025-01-12', 0.10, 'roberts'),
-- (16, 'Poli Spesialis', 3, 'Charlie', '2024-11-07', 0.15, 'roberts'),
-- (17, 'Laboratorium', NULL, 'Alice', '2024-11-07', 0.15, 'alexk'),
-- (18, 'Laboratorium', NULL, 'Bob', '2024-12-03', 0.15, 'michael'),
-- (19, 'IGD', 2, NULL, '2024-12-14', 0.15, 'davidp'),
-- (20, 'Poli Spesialis', 3, NULL, '2024-12-21', 0.10, 'emilyr'),
-- (21, 'Laboratorium', NULL, 'Alice', '2024-11-13', 0.15, 'johndoe'),
-- (22, 'Laboratorium', NULL, 'Charlie', '2024-10-26', 0.10, 'johndoe'),
-- (23, 'Poli Spesialis', 4, NULL, '2024-10-24', 0.15, 'johndoe'),
-- (24, 'IGD', 1, NULL, '2024-11-12', 0.00, 'alexk'),
-- (25, 'Laboratorium', NULL, 'Eve', '2024-11-07', 0.15, 'alexk');


-- CREATE TABLE user_role (
--     role_id SERIAL PRIMARY KEY,
--     username VARCHAR(50),
--     role VARCHAR(50),
--     ts_insert TIMESTAMP,
--     status CHAR(1)
-- );

-- INSERT INTO user_role (role_id, username, role, ts_insert, status) VALUES
-- (1, 'johndoe', 'kasir', '2025-01-15 00:00:00', 'D'),
-- (2, 'johndoe', 'admin', '2025-01-15 00:00:00', 'A'),
-- (3, 'johndoe', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (4, 'michael', 'kasir', '2025-01-15 00:00:00', 'A'),
-- (5, 'emilyr', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (6, 'roberts', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (7, 'roberts', 'kasir', '2025-01-15 00:00:00', 'A'),
-- (8, 'roberts', 'admin', '2025-01-15 00:00:00', 'D'),
-- (9, 'alexk', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (10, 'alexk', 'admin', '2025-01-15 00:00:00', 'A'),
-- (11, 'samanthaa', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (12, 'michael', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (13, 'davidp', 'kasir', '2025-01-15 00:00:00', 'D'),
-- (14, 'davidp', 'customer service', '2025-01-15 00:00:00', 'A'),
-- (15, 'davidp', 'admin', '2025-01-15 00:00:00', 'D'),
-- (16, 'laurac', 'customer service', '2025-01-15 00:00:00', 'D'),
-- (17, 'laurac', 'admin', '2025-01-15 00:00:00', 'D'),
-- (18, 'laurac', 'kasir', '2025-01-15 00:00:00', 'A');

-- Kalau id bentrok
-- SELECT setval(pg_get_serial_sequence('master_user', 'id'), COALESCE(MAX(id), 1), TRUE)
-- FROM master_user;

-- SELECT setval(pg_get_serial_sequence('master_doctor', 'doctor_id'), COALESCE(MAX(doctor_id), 1), TRUE)
-- FROM master_doctor;

-- SELECT setval(pg_get_serial_sequence('master_service_category', 'service_category_id'), COALESCE(MAX(service_category_id), 1), TRUE)
-- FROM master_service_category;

-- SELECT setval(pg_get_serial_sequence('master_service', 'service_id'), COALESCE(MAX(service_id), 1), TRUE)
-- FROM master_service;

-- SELECT setval(pg_get_serial_sequence('pricelists', 'pricelist_id'), COALESCE(MAX(pricelist_id), 1), TRUE)
-- FROM pricelists;

-- SELECT setval(pg_get_serial_sequence('transactions', 'transaction_id'), COALESCE(MAX(transaction_id), 1), TRUE)
-- FROM transactions;

-- SELECT setval(pg_get_serial_sequence('user_role', 'role_id'), COALESCE(MAX(role_id), 1), TRUE)
-- FROM user_role;



-- VIEW
--  CREATE VIEW vw.service AS
--   SELECT ms.service_id,
--     ms.service_name,
--     ms.service_group,
--     COALESCE(json_agg(json_build_object('category_id', msc.service_category_id, 'category_name', msc.category_name, 'price', pl.price)) FILTER (WHERE msc.category_name IS NOT NULL), '[]'::json) AS categories
--    FROM master_service ms
--      LEFT JOIN pricelists pl ON pl.service_id = ms.service_id
--      LEFT JOIN master_service_category msc ON msc.service_category_id = pl.service_category_id
--   GROUP BY ms.service_id, ms.service_name, ms.service_group
--   ORDER BY ms.service_id;

 -- CREATE VIEW vw.transaction AS
 --  SELECT t.transaction_id,
 --    d.doctor_name_name AS doctor_name,
 --    t.username,
 --    t.patient_name,
 --    t.transaction_date,
 --    ms.service_group,
 --    t.tax_rate,
 --    COALESCE(sum(td.amount), 0::bigint)::numeric * (1::numeric + t.tax_rate) AS grand_total,
 --    jsonb_agg(jsonb_build_object('category_name', msc.category_name, 'service_name', ms.service_name, 'quantity', td.quantity, 'price', td.price, 'amount', td.amount)) AS transaction_detail
 --   FROM transactions t
 --     LEFT JOIN master_doctor d ON t.doctor_id = d.doctor_id
 --     LEFT JOIN transaction_details td ON t.transaction_id = td.transaction_id
 --     LEFT JOIN master_service ms ON td.service_id = ms.service_id
 --     LEFT JOIN master_service_category msc ON td.service_category = msc.service_category_id
 --  GROUP BY t.transaction_id, d.doctor_name_name, ms.service_group, t.patient_name, t.transaction_date, t.tax_rate;