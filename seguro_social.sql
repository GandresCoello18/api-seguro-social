-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-10-2020 a las 00:57:26
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `seguro_social`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afiliados`
--

CREATE TABLE `afiliados` (
  `id_afiliados` int(11) NOT NULL,
  `cedula` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `afiliados`
--

INSERT INTO `afiliados` (`id_afiliados`, `cedula`, `nombre`, `apellido`) VALUES
(14, 1207422188, 'diego', 'villamar'),
(15, 1204567724, 'jose', 'lopez'),
(16, 943118532, 'mirian', 'merino'),
(17, 1022488584, 'victor', 'garcia'),
(18, 1104854884, 'jairo', 'tohapanta'),
(19, 989888540, 'miguel', 'alvario'),
(20, 994221140, 'karla', 'alaba'),
(22, 1207345768, 'Andres', 'Coello');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_cita` varchar(50) NOT NULL,
  `id_horario` varchar(50) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `status_cita` varchar(20) NOT NULL,
  `fecha_cita` varchar(25) NOT NULL,
  `hora_cita` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id_contacto` int(11) NOT NULL,
  `nombres` varchar(40) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `mensaje` text NOT NULL,
  `tema` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id_contacto`, `nombres`, `correo`, `mensaje`, `tema`) VALUES
(3, 'Andres roberto coello goyes', 'goyeselcoca@gmail.com', 'sms', 'dudas con pagos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id_horario` varchar(50) NOT NULL,
  `id_personal` int(11) NOT NULL,
  `jornada` varchar(25) NOT NULL,
  `dia` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id_horario`, `id_personal`, `jornada`, `dia`) VALUES
('3e3a9eeb-2746-4eb3-a754-407576eaced0', 2, 'Mañana', 'Domingo'),
('58a1fab0-db54-40a1-b206-8ba4cb1eba79', 5, 'Noche', 'Jueves'),
('7d2e533f-91a0-43a4-ae7f-5e0d42b24811', 4, 'Tarde', 'Lunes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pago` int(11) NOT NULL,
  `id_user` varchar(50) NOT NULL,
  `fecha_pago` varchar(50) NOT NULL,
  `status` varchar(30) NOT NULL,
  `metodo` varchar(30) NOT NULL,
  `monto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id_pago`, `id_user`, `fecha_pago`, `status`, `metodo`, `monto`) VALUES
(5, 'c0ae8e46-1944-43f5-80ab-5a7f62db0f0b', '2020-10-03', 'pagado', 'Tarjeta de credito', 43),
(7, 'c0ae8e46-1944-43f5-80ab-5a7f62db0f0b', '2020-11-03T00:00:00.000Z', 'pagado', 'Tarjeta de credito', 35),
(14, 'c0ae8e46-1944-43f5-80ab-5a7f62db0f0b', '2020-12-03T00:00:00.000Z', 'pagado', 'Efectivo', 40),
(16, 'c0ae8e46-1944-43f5-80ab-5a7f62db0f0b', '2021-01-03T00:00:00.000Z', 'pagado', 'Efectivo', 70),
(18, 'c0ae8e46-1944-43f5-80ab-5a7f62db0f0b', '2021-02-03T00:00:00.000Z', 'pagado', 'Tarjeta de credito', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id_personal` int(11) NOT NULL,
  `nombres` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `cargo` varchar(20) NOT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id_personal`, `nombres`, `apellido`, `cargo`, `imagen`) VALUES
(1, 'Juan', 'Carlos', 'Medico general', '1.png'),
(2, 'Carlos', 'Montoya', 'Medico general', '2.png'),
(3, 'Ruben', 'Otacoma', 'Odontologo', '3.png'),
(4, 'Roberto', 'Bite', 'Medico general', '4.png'),
(5, 'Melisa', 'Mariscal', 'Nutricionista', '5.png'),
(6, 'Carlos', 'Tomala', 'Odontologo', '6.png'),
(7, 'Karla', 'Villamar', 'Medica general', '7.png'),
(8, 'Victor', 'Ramirez', 'Odontologo', '8.png'),
(9, 'Cristobal', 'Garcia', 'Odontologo', '9.png'),
(10, 'Miguel', 'Monserrate', 'Medico general', '10.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` varchar(50) NOT NULL,
  `cedula` int(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(15) NOT NULL,
  `id_afiliado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `cedula`, `email`, `password`, `status`, `id_afiliado`) VALUES
('c0ae8e46-1944-43f5-80ab-5a7f62db0f0b', 1207345768, 'goyeselcoca@gmail.com', '$2a$10$nYeuSK2VZTA5O8wPiZyW4ONjDZX8EANUwCZo/Fry2uilavpiwRIea', 'registrado', 22),
('fbff2fd7-04f7-4ea8-9177-03423c556334', 1207422188, 'administrador@gmail.com', '$2a$10$tZHIgv0rJCFRShqtTZkZQOD2CWEaLHhUJVrjG6mntD4/WmCna9OPW', 'registrado', 14);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `afiliados`
--
ALTER TABLE `afiliados`
  ADD PRIMARY KEY (`id_afiliados`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_horario` (`id_horario`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `id_personal` (`id_personal`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pago`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id_personal`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_afiliado` (`id_afiliado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `afiliados`
--
ALTER TABLE `afiliados`
  MODIFY `id_afiliados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_horario`) REFERENCES `horario` (`id_horario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`id_personal`) REFERENCES `personal` (`id_personal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_afiliado`) REFERENCES `afiliados` (`id_afiliados`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
