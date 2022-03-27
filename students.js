"use strict"

let studentResults = document.querySelector(".students");

function filterStudentsByLastName() {
    let students = DATABASE.students;
    let result = students.filter(student => student.lastName.toLowerCase().includes(getInputValue()));
    createStudents(result);
}


function createStudents(student) {
    for (let i = 0; i < student.length; i++) {
        createStudent(student, i)
    }
}


// Creates a single student and appends to studentResults
function createStudent(student, i) {
    let studentItem = document.createElement("div");
    studentItem.classList.add("student");
    studentItem.id = `${student[i].studentID}`
    studentItem.innerHTML = `
    <h2>${student[i].firstName} ${student[i].lastName} (total of ${credits(student, i)} credits)</h2>
    <h3>Courses:</h3>
    `
    studentResults.appendChild(studentItem);
    createCourses(student, i);
}

function credits(student, i) {
    let credits = []
    for (let j = 0; j < student[i].courses.length; j++) {
        credits.push(student[i].courses[j].passedCredits);
    }
    let initialValue = 0;
    let creditsSum = credits.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
    return creditsSum;
}

function getInputValue() {
    let input = document.getElementById('studentinput').value.toLowerCase();
    return input;
}

function createCourses(student, i) {
    for (let studentCourse of student[i].courses) {
        let course = document.createElement("div");
        let courseName = document.createElement("p");
        for (let databaseCourse of DATABASE.courses) {
            if (studentCourse.courseId == databaseCourse.courseId) {
                courseName.innerHTML = `
                ${databaseCourse.title}  <br>
                ${studentCourse.started.semester} ${studentCourse.started.year} (${studentCourse.passedCredits} credits of ${databaseCourse.totalCredits})`;
                if (studentCourse.passedCredits == databaseCourse.totalCredits) {
                    course.style.backgroundColor = "darkgray";
                }
            }
        }
        course.appendChild(courseName);
        document.getElementById(`${student[i].studentID}`).appendChild(course);
    }
}

filterStudentsByLastName()
