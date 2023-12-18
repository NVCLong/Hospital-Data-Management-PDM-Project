-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 17, 2023 lúc 05:20 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `appointments`
--

CREATE TABLE `appointments` (
  `dId` int(11) NOT NULL,
  `pId` int(11) NOT NULL,
  `meetDate` date NOT NULL,
  `meetTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `appointments`
--

INSERT INTO `appointments` (`dId`, `pId`, `meetDate`, `meetTime`) VALUES
(1, 2, '2023-12-08', '10:00:00'),
(2, 3, '2023-12-09', '11:00:00'),
(3, 7, '2023-12-10', '12:00:00'),
(4, 6, '2023-12-13', '11:00:00'),
(5, 1, '2024-01-10', '12:00:00'),
(5, 4, '2023-12-11', '13:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contain`
--

CREATE TABLE `contain` (
  `deptId` int(11) NOT NULL,
  `pId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `contain`
--

INSERT INTO `contain` (`deptId`, `pId`) VALUES
(1, 1),
(2, 2),
(3, 3),
(2, 4),
(1, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departments`
--

CREATE TABLE `departments` (
  `deptId` int(11) NOT NULL,
  `deptName` varchar(255) NOT NULL,
  `numberOfDoctor` int(11) NOT NULL DEFAULT 0,
  `deptCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `departments`
--

INSERT INTO `departments` (`deptId`, `deptName`, `numberOfDoctor`, `deptCode`) VALUES
(1, 'General Medicine', 1, 1),
(2, 'Pediatrics', 2, 2),
(3, 'Dermatology', 2, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctors`
--

CREATE TABLE `doctors` (
  `dId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deptCode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `doctors`
--

INSERT INTO `doctors` (`dId`, `name`, `email`, `phone`, `position`, `password`, `deptCode`) VALUES
(1, 'Nguyen Van An', 'nguyenvanan@gmail.com', '0912345678', 'General Practitioner', '$2a$10$mO6.PDuOVS/NT231wwFPzunpPI1TwKT8QvLshYI1xVoI.XgNAOl0e', 1),
(2, 'Tran Thi Binh', 'tranthibinh@gmail.com', '0923456789', 'Pediatrician', '$2a$10$mO6.PDuOVS/NT231wwFPzunpPI1TwKT8QvLshYI1xVoI.XgNAOl0e', 2),
(3, 'Le Van Cuong', 'levancuong@gmail.com', '0934567890', 'Dermatologist', '$2a$10$mO6.PDuOVS/NT231wwFPzunpPI1TwKT8QvLshYI1xVoI.XgNAOl0e', 3),
(4, 'Pham My Dung', 'phammydung@gmail.com', '0945678901', 'Pediatrician', '$2a$10$mO6.PDuOVS/NT231wwFPzunpPI1TwKT8QvLshYI1xVoI.XgNAOl0e', 2),
(5, 'Vo Van Long', 'vovanlong@gmail.com', '0956789012', 'Dermatologist', '$2a$10$mO6.PDuOVS/NT231wwFPzunpPI1TwKT8QvLshYI1xVoI.XgNAOl0e', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `inchargeof`
--

CREATE TABLE `inchargeof` (
  `startDay` date NOT NULL,
  `dId` int(11) NOT NULL,
  `pId` int(11) NOT NULL,
  `pName` varchar(255) NOT NULL,
  `details` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `inchargeof`
--

INSERT INTO `inchargeof` (`startDay`, `dId`, `pId`, `pName`, `details`) VALUES
('2023-12-08', 1, 1, 'Vo Van Xuan', 'An Toan '),
('2023-12-09', 2, 2, 'Nguyen Thi Quynh', 'Dau dau'),
('2023-12-10', 3, 3, 'Tran Dinh Hau', 'Dang on'),
('2023-12-13', 4, 4, 'Tran Dinh Hau', 'Nguy kich'),
('2023-12-11', 5, 5, 'Tran Thi Kim Loan', 'Tien trien tot'),
('2024-01-10', 3, 6, 'Hoang The Em', 'Xuat vien');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `patients`
--

CREATE TABLE `patients` (
  `pId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `patients`
--

INSERT INTO `patients` (`pId`, `name`, `email`, `password`, `address`, `phoneNumber`, `role`) VALUES
(1, 'Vo Van Xuan', 'vovanxuan@gmail.com', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '166/24 Dang Va Bi, Binh Tho, Thu Duc, HCMC', '0944567890', 'Patient'),
(2, 'Nguyen Thi Quynh', 'nguyenthiquynh@gmail.com', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '185 Nguyen Du, Dong Hoa, Di An, Binh Duong', '0978253614', 'Patient'),
(3, 'Tran Dinh Hau', 'trandinhhau@gmail.com', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '48/01 Xuan Thuy, Thao Dien, Thu Duc, HCMC', '0461952837', 'Patient'),
(4, 'Tran Dinh Hau', 'trandinhhau@gmail.comm', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '561A Dien Bien Phu, Ward 25, Binh Thanh, HCMC', '0638912547', 'Patient'),
(5, 'Tran Thi Kim Loan', 'tranthikimloan@gmail.com', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '2 Nguyen Binh Khiem, Ben Nghe Ward, Distric 1, HCMC', '0194538267', 'Patient'),
(6, 'Hoang The Em', 'hoangem@gmail.com', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '485 An Duong Vuong, Ward 8, Distric 5, HCMC', '0951628374', 'Patient'),
(7, 'Nguyen Thi Ha', 'nguyenha@gmail.com', '$2a$10$S7zpqbbO9CYxwJrTbYoxTO3kte5dD/FieMvjo0EcFhDnFmAY8SyCa', '12 Street 10, Tan Kien Ward, Distric 7, HCMC', '0936542871', 'Patient');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `work`
--

CREATE TABLE `work` (
  `dId` int(11) NOT NULL,
  `deptId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`dId`,`pId`,`meetDate`,`meetTime`),
  ADD KEY `pId` (`pId`);

--
-- Chỉ mục cho bảng `contain`
--
ALTER TABLE `contain`
  ADD KEY `deptId` (`deptId`),
  ADD KEY `pId` (`pId`);

--
-- Chỉ mục cho bảng `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`deptId`),
  ADD UNIQUE KEY `deptCode` (`deptCode`);

--
-- Chỉ mục cho bảng `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`dId`),
  ADD KEY `deptCode` (`deptCode`);

--
-- Chỉ mục cho bảng `inchargeof`
--
ALTER TABLE `inchargeof`
  ADD KEY `dId` (`dId`),
  ADD KEY `pId` (`pId`);

--
-- Chỉ mục cho bảng `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`pId`);

--
-- Chỉ mục cho bảng `work`
--
ALTER TABLE `work`
  ADD KEY `dId` (`dId`),
  ADD KEY `deptId` (`deptId`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`dId`) REFERENCES `doctors` (`dId`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `patients` (`pId`);

--
-- Các ràng buộc cho bảng `contain`
--
ALTER TABLE `contain`
  ADD CONSTRAINT `contain_ibfk_1` FOREIGN KEY (`deptId`) REFERENCES `departments` (`deptId`),
  ADD CONSTRAINT `contain_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `patients` (`pId`);

--
-- Các ràng buộc cho bảng `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`deptCode`) REFERENCES `departments` (`deptCode`);

--
-- Các ràng buộc cho bảng `inchargeof`
--
ALTER TABLE `inchargeof`
  ADD CONSTRAINT `inchargeof_ibfk_1` FOREIGN KEY (`dId`) REFERENCES `doctors` (`dId`),
  ADD CONSTRAINT `inchargeof_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `patients` (`pId`);

--
-- Các ràng buộc cho bảng `work`
--
ALTER TABLE `work`
  ADD CONSTRAINT `work_ibfk_1` FOREIGN KEY (`dId`) REFERENCES `doctors` (`dId`),
  ADD CONSTRAINT `work_ibfk_2` FOREIGN KEY (`deptId`) REFERENCES `departments` (`deptId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
