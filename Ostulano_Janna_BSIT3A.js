
const SCHOOL_NAME = "Northwest Samar State University";
const CLASS_ROOM = "Room 401";
const TOTAL_STUDENTS = 50;
const PASSING_ATTENDANCE_RATE = 90;
const SCHOOL_YEAR = "2026-2027";
const MAX_LATE_MINUTES = 15;
const DEDUCTION_PER_ABSENCE = 5;
const BASE_GRADE = 100;
const TEACHER_NAME = "Mr. Ortiz";
const APP_TITLE = "Attendance Tracker";


let presentCount = 0;
let absentCount = 0;
let lateCount = 0;
let attendanceRate = 0;
let finalScore = BASE_GRADE;
let systemStatus = "Initializing";
let activeDate = "2026-03-20";
let selectedStudent = "Janna Ostulano";
let isSyncComplete = false;
let warningMessage = "None";

const morningClass = ["Sarah", "Mae", "Cheska"];
const afternoonClass = ["Marian", "Emma"];

const defaultConfig = { theme: "light", autoSave: true };
const userConfig = { theme: "dark", language: "en" };

const studentRecord = {
  id: "S001",
  details: { name: "Sarah", age: 16 },
  contact: { email: "sarah@email.com" }
};

const guestRecord = {
  id: "S002",
  details: { name: "Junior" } 
};

const allStudents = [...morningClass, ...afternoonClass]; 
const fullRoster = ["Teacher", ...allStudents]; 

const appSettings = { ...defaultConfig, ...userConfig }; 
const completeStudent = { ...studentRecord, status: "Active" }; 


const [student1, student2] = allStudents; 
const [, secondInRoster] = fullRoster; 
const [firstMorning, ...otherMorning] = morningClass; 

const { name: sName } = studentRecord.details;
const { theme: activeTheme } = appSettings; 
const { email: studentEmail } = studentRecord.contact; 


const calcPresentRate = (present, total) => (present / total) * 100;
const calcAbsentDeduction = (absences) => absences * DEDUCTION_PER_ABSENCE;
const calculateFinalScore = (base, penalty) => base - penalty;
const isPassing = (rate) => rate >= PASSING_ATTENDANCE_RATE;
const formatStatus = (name, status) => `Student: ${name} | Status: ${status}`;

const shortNames = allStudents.filter((name) => name.length <= 4); 
const longNames = allStudents.filter((name) => name.length > 4); 

const uppercaseStudents = allStudents.map((name) => name.toUpperCase()); 
const studentBadges = allStudents.map((name) => `ID-${name}`); 


const aliceEmail = studentRecord?.contact?.email ?? "No Email"; 
const markEmail = guestRecord?.contact?.email ?? "No Email Provided"; 


presentCount = 4;
absentCount = 1;
lateCount = 0;

attendanceRate = calcPresentRate(presentCount, presentCount + absentCount);
const penalty = calcAbsentDeduction(absentCount);
finalScore = calculateFinalScore(BASE_GRADE, penalty);
const hasPassed = isPassing(attendanceRate);

systemStatus = "Complete";
isSyncComplete = true;

console.log(`--- ${APP_TITLE} for ${SCHOOL_NAME} ---`);                
console.log(`Classroom: ${CLASS_ROOM} | Teacher: ${TEACHER_NAME}`);      
console.log(`Date: ${activeDate} (Academic Year: ${SCHOOL_YEAR})`);        
console.log(`Active Theme: ${activeTheme}`);                              
console.log(`Selected Student: ${sName} (Email: ${aliceEmail})`);        
console.log(`Guest Student Email Check: ${markEmail}`);                   
console.log(`First Student in Roster: ${secondInRoster}`);                 
console.log(`Attendance Score: ${presentCount} Present / ${absentCount} Absent`); 
console.log(`Calculated Attendance Rate: ${attendanceRate.toFixed(1)}%`);  
console.log(`Grade: ${finalScore}% | Passed: ${hasPassed} (${systemStatus})`); 
