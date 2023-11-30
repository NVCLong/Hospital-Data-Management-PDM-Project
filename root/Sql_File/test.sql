-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 30, 2023 lúc 08:35 AM
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
  `d_ID` int(11) NOT NULL,
  `p_ID` int(11) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contains`
--

CREATE TABLE `contains` (
  `dept_ID` int(100) NOT NULL,
  `p_ID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departments`
--

CREATE TABLE `departments` (
  `dept_ID` int(100) NOT NULL,
  `dept_Name` varchar(100) NOT NULL,
  `dept_code` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctors`
--

CREATE TABLE `doctors` (
  `doctor_ID` int(100) NOT NULL,
  `dept_ID` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `position` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `incharge`
--

CREATE TABLE `incharge` (
  `p_ID` int(100) NOT NULL,
  `d_ID` int(100) NOT NULL,
  `startDay` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jokes_table`
--

CREATE TABLE `jokes_table` (
  `JokeID` int(11) NOT NULL,
  `Joke_quest` varchar(500) DEFAULT NULL,
  `Joke_answer` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `jokes_table`
--

INSERT INTO `jokes_table` (`JokeID`, `Joke_quest`, `Joke_answer`) VALUES
(29, '..', '..'),
(42, '.Anh thay gi trong doi mat em.', '.hinh bong cua anh.'),
(43, '.Sao em dep the.', '.Boi vi em la ny anh.'),
(59, '.Tai sao anh lai yeu em.', '.Boi vi em yeu anh.'),
(63, '.Tai sao em lai yeu anh den the.', '.Boi vi anh khong yeu em ma.'),
(62, '.Tai sao em lai yeu anh.', '.Boi vi anh khong yeu em.'),
(21, '.Tamu dep trai khong?.', '.Dep trai chu.'),
(25, '.Tamu dep trai nhat the gioi k?.', '.Qua dep trai luon ay chu.'),
(28, '.Thay t hai huoc k.', '.Ko.'),
(40, '.troi hom nay co dep khong.', '.Sao dep bang em dc.'),
(6, 'How do you catch a squirrel?', 'Climb a tree and act like a nut!'),
(11, 'How do you make a tissue dance?', 'You put a little boogie in it!'),
(3, 'How do you organize a space party?', 'You planet!'),
(5, 'What did one wall say to the other wall?', 'I\'ll meet you at the corner!'),
(8, 'What did the big flower say to the little flower?', 'Hi, bud!'),
(2, 'What did the ocean say to the beach?', 'Nothing, it just waved!'),
(12, 'What do you call a fake noodle?', 'An impasta!'),
(20, 'What do you call a fish with no eyes?', 'Fsh!'),
(15, 'What do you call a snowman with a six-pack?', 'An abdominal snowman!'),
(18, 'What do you get if you cross a snowman and a vampire?', 'Frostbite!'),
(17, 'What kind of shoes do ninjas wear?', 'Sneakers!'),
(9, 'Why did the bicycle fall over?', 'Because it was two-tired!'),
(19, 'Why did the chicken go to the seance?', 'To talk to the other side!'),
(13, 'Why did the scarecrow win an award?', 'Because he was outstanding in his field!'),
(16, 'Why did the tomato turn red?', 'Because it saw the salad dressing!'),
(7, 'Why don\'t eggs tell jokes?', 'Because they might crack up!'),
(1, 'Why don\'t scientists trust atoms?', 'Because they make up everything!'),
(4, 'Why don\'t skeletons fight each other?', 'They don\'t have the guts!'),
(14, 'Why was the math book sad?', 'Because it had too many problems!');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phoneNumber` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `insuranceNumber` bigint(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `age`, `address`, `phoneNumber`, `email`, `insuranceNumber`, `password`, `role`) VALUES
(1, 'testuser1', 12, 'Ho Chi Minh', 987654321, 'testuser1@gmail.com', 1234, '$2b$10$9PueNVpS7RJMcQgYywv6VOH3scjC9zZBetepxO9g/W4isq54thsrm', 'patient');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`date`),
  ADD UNIQUE KEY `time` (`time`);

--
-- Chỉ mục cho bảng `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`dept_ID`);

--
-- Chỉ mục cho bảng `jokes_table`
--
ALTER TABLE `jokes_table`
  ADD PRIMARY KEY (`JokeID`),
  ADD UNIQUE KEY `JokeID` (`JokeID`),
  ADD UNIQUE KEY `JokeID_2` (`JokeID`),
  ADD UNIQUE KEY `Joke_answer_4` (`Joke_answer`),
  ADD UNIQUE KEY `Joke_quest_3` (`Joke_quest`),
  ADD UNIQUE KEY `Joke_quest_5` (`Joke_quest`,`Joke_answer`),
  ADD KEY `Joke_answer_3` (`Joke_answer`),
  ADD KEY `Joke_answer_5` (`Joke_answer`),
  ADD KEY `Joke_quest_4` (`Joke_quest`);
ALTER TABLE `jokes_table` ADD FULLTEXT KEY `Joke_quest` (`Joke_quest`);
ALTER TABLE `jokes_table` ADD FULLTEXT KEY `Joke_answer` (`Joke_answer`);
ALTER TABLE `jokes_table` ADD FULLTEXT KEY `Joke_quest_2` (`Joke_quest`);
ALTER TABLE `jokes_table` ADD FULLTEXT KEY `Joke_answer_2` (`Joke_answer`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `jokes_table`
--
ALTER TABLE `jokes_table`
  MODIFY `JokeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
