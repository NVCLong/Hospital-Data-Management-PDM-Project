INSERT INTO Departments VALUES
  (1, 'General Medicine'),
  (2, 'Pediatrics'),
  (3, 'Dermatology');

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
  (1, 2, '2023-12-08', '10:00 AM'),
  (2, 3, '2023-12-09', '11:00 AM'),
  (3, 1, '2023-12-10', '12:00 PM');
