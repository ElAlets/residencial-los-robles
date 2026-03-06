USE residencial_los_robles;


INSERT INTO users (name, email, password, role) VALUES
('Don Pedro', 'pedro@robles.com', '$2a$10$examplehash', 'admin'),
('Doña Laura', 'laura@robles.com', '$2a$10$examplehash', 'admin'),
('Don Jaime', 'jaime@robles.com', '$2a$10$examplehash', 'admin'),
('Rosa Martinez', 'rosa@email.com', '$2a$10$examplehash', 'resident'),
('Jose Hernandez', 'jose@email.com', '$2a$10$examplehash', 'resident'),
('Carlos Lopez', 'carlos@email.com', '$2a$10$examplehash', 'resident'),
('Sofia Ramirez', 'sofia@email.com', '$2a$10$examplehash', 'resident'),
('Marta Gomez', 'marta@email.com', '$2a$10$examplehash', 'resident'),
('Luis Torres', 'luis@email.com', '$2a$10$examplehash', 'resident'),
('Ana Rivera', 'ana@email.com', '$2a$10$examplehash', 'resident'),
('Pedro Salas', 'psalas@email.com', '$2a$10$examplehash', 'resident'),
('Lucia Vega', 'lucia@email.com', '$2a$10$examplehash', 'resident');



INSERT INTO residents (user_id, address, phone, house_number) VALUES
(4, 'Calle Roble Norte', '5551111111', '101'),
(5, 'Calle Roble Norte', '5551111112', '102'),
(6, 'Calle Roble Norte', '5551111113', '103'),
(7, 'Calle Roble Norte', '5551111114', '104'),
(8, 'Calle Roble Sur', '5551111115', '201'),
(9, 'Calle Roble Sur', '5551111116', '202'),
(10, 'Calle Roble Sur', '5551111117', '203'),
(11, 'Calle Roble Sur', '5551111118', '204'),
(12, 'Calle Roble Central', '5551111119', '301');



INSERT INTO payments (resident_id, amount, payment_date, method, status) VALUES
(1, 500.00, '2026-01-05', 'simulated_online', 'paid'),
(2, 500.00, '2026-01-06', 'transfer', 'paid'),
(3, 500.00, '2026-01-07', 'cash', 'paid'),
(4, 500.00, '2026-02-01', 'simulated_online', 'paid'),
(5, 500.00, '2026-02-03', 'transfer', 'paid');



INSERT INTO emergency_services (name, service_type, phone, address) VALUES
('Hospital General de la Ciudad', 'hospital', '9111001000', 'Av. Salud 123'),
('Clínica San Rafael', 'hospital', '9111002000', 'Calle Médica 45'),
('Policía Municipal', 'police', '911', 'Comandancia Central'),
('Estación de Bomberos #3', 'fire_department', '9112003000', 'Av. Bomberos 77'),
('Protección Civil', 'civil_protection', '9113004000', 'Edificio Municipal');



INSERT INTO board_members (name, role, phone, email, start_date) VALUES
('Don Pedro', 'Presidente', '5552221111', 'pedro@robles.com', '2026-01-01'),
('Doña Laura', 'Tesorera', '5552221112', 'laura@robles.com', '2026-01-01'),
('Don Jaime', 'Secretario', '5552221113', 'jaime@robles.com', '2026-01-01');



INSERT INTO announcements (title, content, created_by) VALUES
('Corte de agua programado',
'El suministro de agua será suspendido el día sábado de 8:00 a 12:00 por mantenimiento.',
1),

('Fumigación en la colonia',
'El servicio de fumigación se realizará el próximo martes por la tarde.',
2),

('Asamblea vecinal',
'Se convoca a todos los residentes a la asamblea general el día 20 de marzo.',
3);



INSERT INTO meetings (title, description, meeting_date, location) VALUES
('Asamblea General de Residentes',
'Discusión de mejoras en el parque y sistema de seguridad.',
'2026-03-20 19:00:00',
'Salón Comunitario'),

('Reunión de la Mesa Directiva',
'Revisión de finanzas y reportes de mantenimiento.',
'2026-04-05 18:00:00',
'Oficina Administrativa');