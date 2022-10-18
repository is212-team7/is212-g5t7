use learning_journey_db;

CREATE TABLE IF NOT EXISTS course(
    Course_ID VARCHAR(20) NOT NULL,
    Course_Name VARCHAR(50) NOT NULL,
    Course_Desc VARCHAR(255),
    Course_Status VARCHAR(15),
    Course_Type VARCHAR(10),
    Course_Category VARCHAR(50),
    PRIMARY KEY (Course_ID)
);

LOAD DATA LOCAL INFILE 'C:/SPM/RawData/courses.csv'
INTO TABLE course
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Course_ID,Course_Name,Course_Desc,Course_Status,Course_Type,Course_Category);




CREATE TABLE IF NOT EXISTS system_role (
    Role_ID int NOT NULL,
    Role_Name VARCHAR(20) NOT NULL,
    PRIMARY KEY (Role_ID)
);

LOAD DATA LOCAL INFILE 'C:/SPM/RawData/role.csv'
INTO TABLE system_role
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Role_ID,Role_Name);




CREATE TABLE IF NOT EXISTS staff (
    Staff_ID int NOT NULL,
    Staff_FName VARCHAR(50) NOT NULL,
    Staff_LName VARCHAR(50) NOT NULL,
    Dept VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    System_Role_ID int,
    PRIMARY KEY (Staff_ID),
    FOREIGN KEY (System_Role_ID) REFERENCES system_role(Role_ID)
);

LOAD DATA LOCAL INFILE 'C:/SPM/RawData/staff.csv'
INTO TABLE staff
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Staff_ID,Staff_FName,Staff_LName,Dept,Email,System_Role_ID);





CREATE TABLE IF NOT EXISTS registration (
    Reg_ID int NOT NULL,
    Course_ID VARCHAR(20),
    Staff_ID int,
    Reg_Status VARCHAR(20) NOT NULL,
    Completion_Status VARCHAR(20) NOT NULL,
    PRIMARY KEY (Reg_ID),
    FOREIGN KEY (Course_ID) REFERENCES course(Course_ID),
    FOREIGN KEY (Staff_ID) REFERENCES staff(Staff_ID)
);

LOAD DATA LOCAL INFILE 'C:/SPM/RawData/registration.csv'
INTO TABLE registration
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Reg_ID,Course_ID,Staff_ID,Reg_Status,Completion_Status);

