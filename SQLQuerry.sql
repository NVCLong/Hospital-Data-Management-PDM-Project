CREATE TABLE User (
    UserID varchar(10) PRIMARY KEY,
    IsStaff varchar(10),
    Username varchar(10),
    Password varchar(10),
    Role varchar(20),
    Action varchar(20),
    TimeStamp DateTime
);
CREATE TABLE MedicalStaff (
    StaffID varchar(10) PRIMARY KEY,
    FirstName varchar(10),
    LastName varchar(10),
    DateOfBirth Date,
    Gender Char(10),
    Address varchar(40),
    Phone int,
    Email varchar(20),
    Specialty varchar(20)
);
CREATE TABLE Scheduling (
    ScheduleID varchar(10) PRIMARY KEY,
    StaffID varchar(10),
    Date DateTime,
    ShiftStartTime DateTime,
    ShiftEndTime DateTime
);
CREATE TABLE Patients (
    PatientID varchar(10) PRIMARY KEY,
    FirstName varchar(20),
    LastName varchar(20),
    DateOfBirth Date,
    Gender char(10),
    Address varchar(40),
    Phone int,
    Email varchar(20)
);
CREATE TABLE Departments (
    DepartmentID varchar(10) PRIMARY KEY,
    DepartmentName varchar(20),
    HeadOFDepartmentID varchar(10),
    FOREIGN KEY (HeadOFDepartmentID) REFERENCES MedicalStaff(StaffID)
);
CREATE TABLE Appointments (
    AppointmentID varchar(10) PRIMARY KEY,
    PatientID varchar(10),
    DoctorID varchar(10),
    DateTime DATETIME,
    Reason varchar(40),
    Status varchar(100),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES MedicalStaff(StaffID)
);
CREATE TABLE MedicalRecord (
    RecordID varchar(10) PRIMARY KEY,
    PatientID varchar(10),
    DoctorID varchar(10),
    DateTime DATETIME,
    Diagnosis varchar(20),
    Treatment varchar(100),
    Medications varchar(100),
    TestResults varchar(100),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES MedicalStaff(StaffID)
);
CREATE TABLE Prescriptions (
    PrescriptionID varchar(10) PRIMARY KEY,
    RecordID varchar(10),
    MedicationName varchar(40),
    Dosage varchar(100),
    Frequency int,
    StartDate DATE,
    FOREIGN KEY (RecordID) REFERENCES MedicalRecord(RecordID)
);

CREATE TABLE Billing (
    BillID varchar(10) PRIMARY KEY,
    PatientID varchar(10),
    DateTime DATE,
    ServicesRendered varchar(255),
    TotalAmount DECIMAL(10, 2), -- Assuming it's a decimal with two decimal places
    PayMethod varchar(20),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);

/*****Table Patients: 20 on about 200 data *****/
INSERT INTO Patients(PatientID, FirstName, LastName, DateOfBirth, Gender, Address, Phone, Email)
VALUES 
('P001', 'John', 'Doe', '1985-03-15', 'Male', '123 Main St', 1234567890, 'john.doe@example.com'),

('P002', 'Jane', 'Smith', '1990-07-22', 'Female', '456 Elm St', 2345678901, 'jane.smith@example.com'),

('P003', 'Michael', 'Johnson', '1978-11-10', 'Male', '789 Oak Ave', 3456789012, 'michael.johnson@example.com'),

('P004', 'Emily', 'Brown', '1982-06-05', 'Female', '321 Pine St', 4567890123, 'emily.brown@example.com'),

('P005', 'Christopher', 'Lee', '1995-02-18', 'Male', '654 Cedar Rd', 5678901234, 'christopher.lee@example.com'),

('P006', 'Jessica', 'Wilson', '1989-09-12', 'Female', '987 Maple Ave', 6789012345, 'jessica.wilson@example.com'),

('P007', 'David', 'Anderson', '1976-04-30', 'Male', '159 Birch Ln', 7890123456, 'david.anderson@example.com'),

('P008', 'Sarah', 'Taylor', '1992-01-25', 'Female', '753 Oak Ave', 8901234567, 'sarah.taylor@example.com'),

('P009', 'Matthew', 'Martinez', '1987-08-09', 'Male', '369 Walnut St', 9012345678, 'matthew.martinez@example.com'),

('P010', 'Ashley', 'Johnson', '1998-05-14', 'Female', '951 Pine St', 1234567890, 'ashley.johnson@example.com'),

('P011', 'Daniel', 'Davis', '1984-12-01', 'Male', '753 Elm St', 2345678901, 'daniel.davis@example.com'),

('P012', 'Jennifer', 'Miller', '1986-07-21', 'Female', '369 Maple Ave', 3456789012, 'jennifer.miller@example.com'),

('P013', 'Christopher', 'Garcia', '1993-04-17', 'Male', '951 Oak Ave', 4567890123, 'christopher.garcia@example.com'),

('P014', 'Elizabeth', 'Rodriguez', '1983-11-03', 'Female', '753 Cedar Rd', 5678901234, 'elizabeth.rodriguez@example.com'),

('P015', 'Andrew', 'Lopez', '1991-06-28', 'Male', '369 Main St', 6789012345, 'andrew.lopez@example.com'),

('P016', 'Megan', 'Hernandez', '1988-03-14', 'Female', '951 Pine St', 7890123456, 'megan.hernandez@example.com'),

('P017', 'Ryan', 'Gonzalez', '1977-10-30', 'Male', '753 Maple Ave', 8901234567, 'ryan.gonzalez@example.com'),

('P018', 'Lauren', 'Perez', '1994-05-26', 'Female', '369 Cedar Rd', 9012345678, 'lauren.perez@example.com'),

('P019', 'Brandon', 'Robinson', '1981-12-11', 'Male', '951 Oak Ave', 1234567890, 'brandon.robinson@example.com'),

('P020', 'Stephanie', 'Clark', '1997-07-06', 'Female', '753 Main St', 2345678901, 'stephanie.clark@example.com')
('P021', 'Nicholas', 'Lewis', '1980-02-22', 'Male', '369 Elm St', 3456789012, 'nicholas.lewis@example.com'),

('P022', 'Amanda', 'Lee', '1984-09-16', 'Female', '951 Pine St', 4567890123, 'amanda.lee@example.com'),

('P023', 'Eric', 'Hall', '1992-04-12', 'Male', '753 Maple Ave', 5678901234, 'eric.hall@example.com'),

('P024', 'Rachel', 'Young', '1987-11-27', 'Female', '369 Cedar Rd', 6789012345, 'rachel.young@example.com'),

('P025', 'Jason', 'Harris', '1995-08-02', 'Male', '951 Oak Ave', 7890123456, 'jason.harris@example.com'),

('P026', 'Lauren', 'Clark', '1989-03-19', 'Female', '753 Main St', 8901234567, 'lauren.clark@example.com'),

('P027', 'Kevin', 'Lewis', '1978-10-05', 'Male', '369 Elm St', 9012345678, 'kevin.lewis@example.com'),

('P028', 'Olivia', 'Hall', '1993-05-31', 'Female', '951 Pine St', 1234567890, 'olivia.hall@example.com'),

('P029', 'Brian', 'Young', '1982-01-16', 'Male', '753 Maple Ave', 2345678901, 'brian.young@example.com'),

('P030', 'Samantha', 'Harris', '1990-08-11', 'Female', '369 Cedar Rd', 3456789012, 'samantha.harris@example.com'),

('P031', 'Daniel', 'Brown', '1985-03-28', 'Male', '951 Oak Ave', 4567890123, 'daniel.brown@example.com'),

('P032', 'Emily', 'Clark', '1991-10-23', 'Female', '753 Main St', 5678901234, 'emily.clark@example.com'),

('P033', 'Joshua', 'Hall', '1979-05-09', 'Male', '369 Elm St', 6789012345, 'joshua.hall@example.com'),

('P034', 'Amelia', 'Young', '1996-12-04', 'Female', '951 Pine St', 7890123456, 'amelia.young@example.com'),

('P035', 'Christopher', 'Harris', '1983-06-19', 'Male', '753 Maple Ave', 8901234567, 'christopher.harris@example.com'),

('P036', 'Abigail', 'Lewis', '1987-01-14', 'Female', '369 Cedar Rd', 9012345678, 'abigail.lewis@example.com'),

('P037', 'Jacob', 'Young', '1994-08-09', 'Male', '951 Oak Ave', 1234567890, 'jacob.young@example.com'),

('P038', 'Sophia', 'Hall', '1988-03-05', 'Female', '753 Main St', 2345678901, 'sophia.hall@example.com'),

('P039', 'Ethan', 'Brown', '1980-10-30', 'Male', '369 Elm St', 3456789012, 'ethan.brown@example.com'),

('P040', 'Mia', 'Clark', '1998-05-25', 'Female', '951 Pine St', 4567890123, 'mia.clark@example.com'),

('P041', 'Alexander', 'Harris', '1981-12-20', 'Male', '753 Maple Ave', 5678901234, 'alexander.harris@example.com'),

('P042', 'Charlotte', 'Young', '1997-07-15', 'Female', '369 Cedar Rd', 6789012345, 'charlotte.young@example.com'),

('P043', 'William', 'Lewis', '1984-02-10', 'Male', '951 Oak Ave', 7890123456, 'william.lewis@example.com'),

('P044', 'Ava', 'Hall', '1992-09-06', 'Female', '753 Main St', 8901234567, 'ava.hall@example.com'),

('P045', 'Michael', 'Brown', '1977-04-01', 'Male', '369 Elm St', 9012345678, 'michael.brown@example.com'),

('P046', 'Harper', 'Clark', '1985-10-18', 'Female', '951 Pine St', 1234567890, 'harper.clark@example.com');
