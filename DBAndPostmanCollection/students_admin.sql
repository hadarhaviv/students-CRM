-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: נובמבר 01, 2018 בזמן 04:34 PM
-- גרסת שרת: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `students_admin`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `fk_role` int(11) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `user_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `admin`
--

INSERT INTO `admin` (`id`, `name`, `fk_role`, `phone`, `email`, `image`, `password`, `user_name`) VALUES
(2, 'oren bachman', 2, '0524557171', 'orenbac@gmail.com', 'dd4b86705d058966.jpg', '$2y$10$4124tjgarlmPp6ItUhgup.mdbjVg01zAxc3y842kfvPONpNTgBEjC', 'oren'),
(5, 'toto', 1, '555', 'toto@gmail', '8f26c74ed5a835ae.jpg', '$2y$10$UG/AzAPnFFXFTN/m4mEaOeYwjY26jCegUbHL1h9fnrpNJWyjAE56i', 'toto'),
(6, 'hadar haviv', 1, '542435592', 'hadar.hav@gmail.com', '64d5ea7ff68bfa25.jpg', '$2y$10$YJxPyM.yZdzahlP7nZMIkOhIAYX4GGnWQf9fKNCwGgFoob1AMb1Pm', 'hadar'),
(9, 'sal', 3, '542435592', 'salsal.com', '', '$2y$10$Zx9I4O1B5oLodWyyE.FDyO6aWxsUdbRKA/Ik9YflEM05V7p9i6bFe', 'sale');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `image`) VALUES
(31, 'PHP', 'too primitive for me', '9941e898a0105598.jpg'),
(32, 'Java Script', 'love it ! ', '3609ea2d1923b838.jpg'),
(33, 'angular', 'usfull', '69abc292b79d9702.jpg'),
(36, 'CSS', 'amazing', 'c6c3bc6d995c621f.jpg'),
(40, 'jj', 'ss', '');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `courses_students_lnk`
--

CREATE TABLE `courses_students_lnk` (
  `fk_students` int(11) DEFAULT NULL,
  `fk_courses` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `courses_students_lnk`
--

INSERT INTO `courses_students_lnk` (`fk_students`, `fk_courses`) VALUES
(NULL, 31),
(88, NULL),
(NULL, 36),
(88, 36),
(NULL, 33),
(NULL, 33),
(NULL, 33),
(88, NULL),
(88, NULL),
(88, 32),
(NULL, 32),
(NULL, 33),
(NULL, 32),
(NULL, 33),
(NULL, 32),
(NULL, 33),
(NULL, 36),
(89, 31),
(89, 32),
(89, 33),
(88, 40),
(96, 31);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'owner'),
(2, 'manager'),
(3, 'sales');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `student`
--

INSERT INTO `student` (`id`, `name`, `phone`, `email`, `image`) VALUES
(88, 'Dudit', '050-6775', 'dudit@gmail', 'b1ed8965737302aa.jpg'),
(89, 'hadar haviv', '0542435592', 'hadar.hav@gmail.com', '31ac013502229d73.jpg'),
(96, 'kj', '988', 'ggfg', '');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_role` (`fk_role`);

--
-- אינדקסים לטבלה `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- אינדקסים לטבלה `courses_students_lnk`
--
ALTER TABLE `courses_students_lnk`
  ADD KEY `fk_courses` (`fk_courses`),
  ADD KEY `fk_students` (`fk_students`);

--
-- אינדקסים לטבלה `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- אינדקסים לטבלה `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`fk_role`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- הגבלות לטבלה `courses_students_lnk`
--
ALTER TABLE `courses_students_lnk`
  ADD CONSTRAINT `fk_courses` FOREIGN KEY (`fk_courses`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_students` FOREIGN KEY (`fk_students`) REFERENCES `student` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
