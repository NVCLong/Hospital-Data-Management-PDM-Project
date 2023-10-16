
CREATE TABLE [User] (
    UserID varchar(10) PRIMARY KEY,
    IsStaff varchar(10),
    Username varchar(10),
    Password varchar(10),
    Role varchar(20),
    Action varchar(20),
    TimeStamp DateTime,
)
CREATE TABLE [MedicalStaff] (
    StaffID varchar(10) PRIMARY KEY,
    FirstName varchar(10),
    LastName varchar(10),
    DateOfBirth Date,
    Gender Char(10),
    Address varchar(40),
    Phone int,
    Email varchar(20),
    Specialty varchar(20),
)

CREATE TABLE [Scheduling] (
    ScheduleID varchar(10) PRIMARY KEY,
    StaffID varchar(10),
    Date DateTime,
    ShiftStartTime DateTime,
    ShiftEndTime DateTime,
)
CREATE TABLE [Patients] (
    PatientID varchar(10) PRIMARY KEY,
    FirstName varchar(20),
    LastName varchar(20),
    DateOfBirth Date,
    Gender char(10),
    Address varchar(40),
    Phone int,
    Email varchar(20),
)
CREATE TABLE [Departments] (
    DepartmentID varchar(10) PRIMARY KEY,
    DepartmentName varchar(20),
    HeadOFDepartmentID varchar(10) FOREIGN KEY REFERENCES MedicalStaff(StaffID),
)
CREATE TABLE [Appointments] (
    AppointmentID varchar(10) PRIMARY KEY,
    PatientID varchar(10)FOREIGN KEY REFERENCES Patients(PatientID),
    DoctorID varchar(10) FOREIGN KEY REFERENCES MedicalStaff(StaffID),
    DateTime DateTime,
    Reason varchar(40),
    Status varchar(100),
)
CREATE TABLE [MedicalRecord] (
    RecordID varchar(10) PRIMARY KEY,
    PatientID varchar(10) FOREIGN KEY REFERENCES Patients(PatientID),
    DoctorID varchar(10) FOREIGN KEY REFERENCES MedicalStaff(StaffID),
    DateTime DateTime,
    Diagnosis varchar(20),
    Treatment varchar(100),
    Medications varchar(100),
    TestResults varchar(100),
)
CREATE TABLE [Prescriptions] (
    PrescriptionID varchar(10) PRIMARY KEY,
    RecordID varchar(10) FOREIGN KEY REFERENCES MedicalRecord(RecordID),
    MedicationName varchar(40),
    Dosage varchar(100),
    Frequency int,
    StartDate Date,
)
CREATE TABLE [Billing] (
    BillID varchar(10) PRIMARY KEY,
    PatientID varchar(10) FOREIGN KEY REFERENCES Patients(PatientID),
    DateTime Date,
    ServicesRendered varchar(255), 
    TotalAmount decimal(10, 2), -- Assuming it's a decimal with two decimal places
    PayMethod varchar(20),
)

