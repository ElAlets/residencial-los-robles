-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2026 a las 05:05:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `residencial_los_robles`
--

--
-- Volcado de datos para la tabla `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Corte de agua', 'Habrá corte de agua el sábado de 8am a 2pm', NULL, '2026-03-29 22:36:09', '2026-03-29 22:36:09'),
(2, 'Fumigación', 'Se realizará fumigación el martes', NULL, '2026-03-29 22:36:09', '2026-03-29 22:36:09'),
(3, 'Reunión vecinal', 'Reunión este viernes a las 7pm', NULL, '2026-03-29 22:36:09', '2026-03-29 22:36:09');

--
-- Volcado de datos para la tabla `board_members`
--

INSERT INTO `board_members` (`id`, `name`, `role`, `phone`, `email`) VALUES
(1, 'Pedro Gómez', 'Presidente', '5552221111', 'pedro@test.com'),
(2, 'Laura Díaz', 'Tesorera', '5552221112', 'laura@test.com'),
(3, 'Miguel Ruiz', 'Secretario', '5552221113', 'miguel@test.com');

--
-- Volcado de datos para la tabla `emergency_services`
--

INSERT INTO `emergency_services` (`id`, `name`, `service_type`, `phone`, `address`) VALUES
(1, 'Hospital General', 'hospital', '911', 'Av. Salud 123'),
(2, 'Policía Municipal', 'police', '911', 'Centro'),
(3, 'Bomberos', 'fire_department', '911', 'Zona Norte'),
(4, 'Protección Civil', 'civil_protection', '911', 'Zona Sur');

--
-- Volcado de datos para la tabla `meetings`
--

INSERT INTO `meetings` (`id`, `title`, `description`, `meeting_date`, `location`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Reunión mensual', 'Temas generales de la colonia', '2026-04-10 19:00:00', 'Salón comunitario', 'scheduled', NULL, '2026-03-29 22:36:09', '2026-03-29 22:36:09'),
(2, 'Revisión de pagos', 'Estado de cuotas', '2026-03-20 18:00:00', 'Oficina', 'completed', NULL, '2026-03-29 22:36:09', '2026-03-29 22:36:09');

--
-- Volcado de datos para la tabla `residents`
--

INSERT INTO `residents`
(`id`, `user_id`, `address`, `phone`, `house_number`, `status`)
VALUES
(
1,
2,
'Calle Roble Norte',
'5551111111',
'101',
'active'
);

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users`
(`id`, `name`, `email`, `password`, `role`)
VALUES
(
1,
'Administrador',
'admin@test.com',
'$2b$10$yPYhoT2H2RwWtdsnsjmKFevSOZSN4eFG4rxFnZGDKtw5B1ve2Tcxu',
'admin'
),
(
2,
'Residente',
'residente@test.com',
'$2b$10$yPYhoT2H2RwWtdsnsjmKFevSOZSN4eFG4rxFnZGDKtw5B1ve2Tcxu',
'resident'
);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
