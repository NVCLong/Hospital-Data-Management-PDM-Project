CREATE TABLE Departments (
  deptId INT NOT NULL PRIMARY KEY,
  deptName VARCHAR(255) NOT NULL,
  numberOfDoctor INT NOT NULL DEFAULT 0,
  deptCode INT NOT NULL UNIQUE
);

CREATE TABLE Doctors (
  dId INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  deptCode INT NOT NULL,
  FOREIGN KEY (deptCode) REFERENCES Departments (deptCode)
);

CREATE TABLE Patients (
  pId INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE Appointments (
  dId INT NOT NULL,
  pId INT NOT NULL,
  meetDate DATE NOT NULL,
  meetTime TIME NOT NULL,
  PRIMARY KEY (dId, pId, meetDate, meetTime),
  FOREIGN KEY (dId) REFERENCES Doctors (dId),
  FOREIGN KEY (pId) REFERENCES Patients (pId)
);

CREATE TABLE inChargeOf (
  startDay DATE NOT NULL,
  dId INT NOT NULL,
  pId INT NOT NULL ,
  pName VARCHAR(255) NOT NULL,
  details VARCHAR(255),
  FOREIGN KEY (dId) REFERENCES Doctors (dId),
  FOREIGN KEY (pId) REFERENCES Patients (pId)
 );


CREATE TABLE contain (
	deptId INT NOT NULL,
	pId INT NOT NULL,
	FOREIGN KEY (deptId) REFERENCES Departments (deptId),
	FOREIGN KEY (pId) REFERENCES Patients (pId)
);

CREATE TABLE Work (
	dId INT NOT NULL,
	deptId INT NOT NULL,
	FOREIGN KEY (dId) REFERENCES Doctors (dId),
	FOREIGN KEY (deptId) REFERENCES Departments (deptId)
);

INSERT INTO Departments VALUES
  (1, 'General Medicine', 1, 1),
  (2, 'Pediatrics', 2, 2),
  (3, 'Dermatology', 2, 3);

INSERT INTO Doctors VALUES
  (1, 'Nguyen Van An', 'nguyenvanan@gmail.com', '0912345678', 'General Practitioner', 1),
  (2, 'Tran Thi Binh', 'tranthibinh@gmail.com', '0923456789', 'Pediatrician', 2),
  (3, 'Le Van Cuong', 'levancuong@gmail.com', '0934567890', 'Dermatologist', 3),
  (4, 'Pham My Dung', 'phammydung@gmail.com', '0945678901', 'Pediatrician', 2),
  (5, 'Vo Van Long', 'vovanlong@gmail.com', '0956789012', 'Dermatologist', 3);

INSERT INTO Patients VALUES
  (1, 'Vo Van Xuan', 'vovanxuan@gmail.com', 'password123', '166/24 Dang Va Bi, Binh Tho, Thu Duc, HCMC', '0944567890', 'Patient'),
  (2, 'Nguyen Thi Quynh', 'nguyenthiquynh@gmail.com', 'password456', '185 Nguyen Du, Dong Hoa, Di An, Binh Duong', '0978253614', 'Patient'),
  (3, 'Tran Dinh Hau', 'trandinhhau@gmail.com', 'password789', '48/01 Xuan Thuy, Thao Dien, Thu Duc, HCMC', '0461952837', 'Patient'),
  (4, 'Tran Dinh Hau', 'trandinhhau@gmail.comm', 'password222', '561A Dien Bien Phu, Ward 25, Binh Thanh, HCMC', '0638912547', 'Patient'),
  (5, 'Tran Thi Kim Loan', 'tranthikimloan@gmail.com', 'password333', '2 Nguyen Binh Khiem, Ben Nghe Ward, Distric 1, HCMC', '0194538267', 'Patient'),
  (6, 'Hoang The Em', 'hoangem@gmail.com', 'password444', '485 An Duong Vuong, Ward 8, Distric 5, HCMC', '0951628374', 'Patient'),
  (7, 'Nguyen Thi Ha', 'nguyenha@gmail.com', 'password555', '12 Street 10, Tan Kien Ward, Distric 7, HCMC', '0936542871', 'Patient');

INSERT INTO Appointments VALUES
  (1, 2, '2023-12-08', '10:00'),
  (2, 3, '2023-12-09', '11:00'),
  (3, 7, '2023-12-10', '12:00'),
  (4, 6, '2023-12-13', '11:00'),
  (5, 4, '2023-12-11', '13:00'),
  (5, 1, '2024-01-10', '12:00');


  -- Thêm dữ liệu vào bảng inChargeOf
INSERT INTO inChargeOf (startDay, dId, pId,pName, details) VALUES
  ('2023-12-08', 1, 1,'Vo Van Xuan','Benh dai'),  -- Doctor 1 in charge of Patient 1 from 2023-12-08
  ('2023-12-09', 2, 2,'Nguyen Thi Quynh','Dau dau'),  -- Doctor 2 in charge of Patient 2 from 2023-12-09
  ('2023-12-10', 3, 3,'Tran Dinh Hau','Dang on'),  -- Doctor 3 in charge of Patient 3 from 2023-12-10
  ('2023-12-13', 4, 4,'Tran Dinh Hau', 'Nguy kich'),  -- Doctor 4 in charge of Patient 4 from 2023-12-13
  ('2023-12-11', 5, 5,'Tran Thi Kim Loan', 'Tien trien tot'),  -- Doctor 5 in charge of Patient 5 from 2023-12-11
  ('2024-01-10', 3, 6,'Hoang The Em','Xuat vien');  -- Doctor 3 in charge of Patient 6 from 2024-01-10

-- Thêm dữ liệu vào bảng contain
INSERT INTO contain (deptId, pId) VALUES
  (1, 1),  -- Department 1 contains Patient 1
  (2, 2),  -- Department 2 contains Patient 2
  (3, 3),  -- Department 3 contains Patient 3
  (2, 4),  -- Department 2 contains Patient 4
  (1, 5),  -- Department 1 contains Patient 5
  (3, 6);  -- Department 3 contains Patient 6