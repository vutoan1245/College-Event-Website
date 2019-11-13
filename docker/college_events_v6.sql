-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 12, 2019 at 12:22 AM
-- Server version: 8.0.18
-- PHP Version: 7.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college_events`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `spid` int(11) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `pid`, `spid`, `status`) VALUES
(4, 11, 3, 'inactive'),
(5, 11, 3, 'inactive'),
(6, 11, 3, 'inactive'),
(7, 11, 3, 'inactive'),
(8, 11, 3, 'inactive'),
(9, 11, 3, 'inactive'),
(10, 11, 3, 'inactive'),
(11, 11, 3, 'inactive'),
(12, 11, 3, 'inactive'),
(13, 11, 3, 'inactive'),
(14, 11, 3, 'inactive'),
(15, 11, 3, 'inactive'),
(16, 11, 3, 'inactive'),
(17, 11, 3, 'inactive'),
(18, 11, 3, 'inactive'),
(19, 11, 3, 'inactive'),
(20, 11, 3, 'inactive'),
(21, 11, 3, 'inactive'),
(22, 11, 3, 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cid` int(11) NOT NULL,
  `eid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `comments` text NOT NULL,
  `rating` double NOT NULL,
  `timestamp` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(190) NOT NULL,
  `time` datetime NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eid`, `name`, `location`, `time`, `category`, `description`) VALUES
(1, 'bruh', 'UCF', '2019-11-12 00:00:00', '', ''),
(2, 'ertet', 'UCF', '2019-11-12 00:00:00', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `lid` int(11) NOT NULL,
  `lname` varchar(190) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `address` varchar(255) NOT NULL,
  `lng` double NOT NULL,
  `lat` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`lid`, `lname`, `address`, `lng`, `lat`) VALUES
(1, 'UCF', '4000 Central Florida Blvd, Orlando, FL 32816', -81.2033083, 28.5968774);

-- --------------------------------------------------------

--
-- Table structure for table `non_rso`
--

CREATE TABLE `non_rso` (
  `eid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `spid` int(11) NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `pid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(190) NOT NULL,
  `access` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`pid`, `username`, `password`, `first_name`, `last_name`, `phone`, `email`, `access`) VALUES
(6, 'bao', '$2a$10$lcBCkO6nliVYpkyj/Iy3Ze7E4Uv9iPDLT9rVVAXzw.Jor31pUc/am', 'bao', 'hong', '3214408647', 'baohong@knights.ucf.edu', 'super admin'),
(11, 'bao_student', '$2a$10$UhgUPFoQamzOhE5TQ3oIs.BT2RXCYI9GXcV2/H283V3QrwhH7FdH2', 'bao', 'hong', '3214408647', 'baohong123@knights.ucf.edu', 'student'),
(13, 'bao_student1', '$2a$10$gXUiF/4vQl0qV.0zFONiNOuhsz8WrWa0Pavod/ruZq.7WAxaThoRa', 'bao', 'hong', '3214408647', 'baohong1223@knights.ucf.edu', 'student'),
(14, 'bao_student6', '$2a$10$XRGDFCeV08Gm3lpM6myhV.oINen7k44TRgrXKa.dddIbnjmy7TaTm', 'bao', 'hong', '3214408647', 'baohong23@knights.ucf.edu', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `private_events`
--

CREATE TABLE `private_events` (
  `eid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `public_events`
--

CREATE TABLE `public_events` (
  `eid` int(11) NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rso`
--

CREATE TABLE `rso` (
  `rid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rso`
--

INSERT INTO `rso` (`rid`, `aid`, `name`, `description`, `status`) VALUES
(17, 4, 'Startdust Crusader', 'reeee', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `rso_events`
--

CREATE TABLE `rso_events` (
  `eid` int(11) NOT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rso_members`
--

CREATE TABLE `rso_members` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rso_members`
--

INSERT INTO `rso_members` (`id`, `pid`, `rid`) VALUES
(4, 13, 17),
(5, 11, 17);

--
-- Triggers `rso_members`
--
DELIMITER $$
CREATE TRIGGER `RSOStatusUpdateA` AFTER INSERT ON `rso_members` FOR EACH ROW BEGIN 
    IF ((SELECT COUNT(*) FROM rso_members M WHERE M.rid = NEW.rid) >  4) 
    THEN 
    UPDATE rso 
    SET rso.status = 'active'    
    WHERE rso.rid = NEW.rid;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `RSOStatusUpdateP` AFTER INSERT ON `rso_members` FOR EACH ROW BEGIN 
    IF ((SELECT COUNT(*) FROM rso_members M WHERE M.rid = NEW.rid) < 5) 
    THEN 
    UPDATE rso 
    SET rso.status = 'inactive'    
    WHERE rso.rid = NEW.rid;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`pid`, `uid`) VALUES
(11, 1),
(13, 1),
(14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `spid` int(11) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `super_admin`
--

INSERT INTO `super_admin` (`spid`, `pid`) VALUES
(3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `universities`
--

CREATE TABLE `universities` (
  `uid` int(11) NOT NULL,
  `spid` int(11) NOT NULL,
  `name` varchar(190) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text,
  `student_count` int(11) NOT NULL,
  `picture` varchar(1000) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `location` varchar(190) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `universities`
--

INSERT INTO `universities` (`uid`, `spid`, `name`, `description`, `student_count`, `picture`, `location`) VALUES
(1, 3, 'UCF', 'reeee', 6000, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia1.fdncms.com%2Forlando%2Fimager%2Fu%2Foriginal%2F25172893%2Fucf.png&imgrefurl=https%3A%2F%2Fwww.orlandoweekly.com%2FBlogs%2Farchives%2F2019%2F04%2F18%2Fucf-students-will-strike-for-climate-environmental-rights-next-week&tbnid=01JK1TFbJpCPTM&vet=12ahUKEwjHsaHv8-DlAhVRXqwKHc8YDYkQMygCegQIARBG..i&docid=g3mfxGApAMV9UM&w=795&h=674&q=ucf%20pictures&ved=2ahUKEwjHsaHv8-DlAhVRXqwKHc8YDYkQMygCegQIARBG', 'UCF'),
(3, 3, 'USF', 'reeee', 6000, 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia1.fdncms.com%2Forlando%2Fimager%2Fu%2Foriginal%2F25172893%2Fucf.png&imgrefurl=https%3A%2F%2Fwww.orlandoweekly.com%2FBlogs%2Farchives%2F2019%2F04%2F18%2Fucf-students-will-strike-for-climate-environmental-rights-next-week&tbnid=01JK1TFbJpCPTM&vet=12ahUKEwjHsaHv8-DlAhVRXqwKHc8YDYkQMygCegQIARBG..i&docid=g3mfxGApAMV9UM&w=795&h=674&q=ucf%20pictures&ved=2ahUKEwjHsaHv8-DlAhVRXqwKHc8YDYkQMygCegQIARBG', 'UCF');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `spid` (`spid`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `location` (`location`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`lid`),
  ADD UNIQUE KEY `lname` (`lname`);

--
-- Indexes for table `non_rso`
--
ALTER TABLE `non_rso`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `spid` (`spid`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- Indexes for table `private_events`
--
ALTER TABLE `private_events`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `aid` (`aid`);

--
-- Indexes for table `public_events`
--
ALTER TABLE `public_events`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `aid` (`aid`);

--
-- Indexes for table `rso`
--
ALTER TABLE `rso`
  ADD PRIMARY KEY (`rid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `aid` (`aid`);

--
-- Indexes for table `rso_events`
--
ALTER TABLE `rso_events`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `sid` (`rid`);

--
-- Indexes for table `rso_members`
--
ALTER TABLE `rso_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rid` (`rid`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`spid`,`pid`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `universities`
--
ALTER TABLE `universities`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `universities_ibfk_1` (`spid`),
  ADD KEY `location` (`location`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rso`
--
ALTER TABLE `rso`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `rso_events`
--
ALTER TABLE `rso_events`
  MODIFY `eid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rso_members`
--
ALTER TABLE `rso_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `spid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `universities`
--
ALTER TABLE `universities`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `person` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`spid`) REFERENCES `super_admin` (`spid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`location`) REFERENCES `location` (`lname`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `non_rso`
--
ALTER TABLE `non_rso`
  ADD CONSTRAINT `non_rso_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `events` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `non_rso_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `person` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `non_rso_ibfk_3` FOREIGN KEY (`spid`) REFERENCES `super_admin` (`spid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `private_events`
--
ALTER TABLE `private_events`
  ADD CONSTRAINT `private_events_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `events` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `private_events_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `universities` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `private_events_ibfk_3` FOREIGN KEY (`aid`) REFERENCES `admin` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `public_events`
--
ALTER TABLE `public_events`
  ADD CONSTRAINT `public_events_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `events` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `public_events_ibfk_2` FOREIGN KEY (`aid`) REFERENCES `admin` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rso`
--
ALTER TABLE `rso`
  ADD CONSTRAINT `rso_ibfk_1` FOREIGN KEY (`aid`) REFERENCES `admin` (`aid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rso_events`
--
ALTER TABLE `rso_events`
  ADD CONSTRAINT `rso_events_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `events` (`eid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rso_members`
--
ALTER TABLE `rso_members`
  ADD CONSTRAINT `rso_members_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `rso` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rso_members_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `students` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `person` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `universities` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD CONSTRAINT `super_admin_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `person` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `universities`
--
ALTER TABLE `universities`
  ADD CONSTRAINT `universities_ibfk_1` FOREIGN KEY (`spid`) REFERENCES `super_admin` (`spid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `universities_ibfk_2` FOREIGN KEY (`location`) REFERENCES `location` (`lname`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
