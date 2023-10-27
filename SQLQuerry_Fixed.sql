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

('P020', 'Stephanie', 'Clark', '1997-07-06', 'Female', '753 Main St', 2345678901, 'stephanie.clark@example.com');
