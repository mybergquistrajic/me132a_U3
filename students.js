"use strict"

let studentResults = document.querySelector(".students");

// Filters students by last name
function filterStudentsByLastName() {
    studentResults.innerHTML = "";
    let students = DATABASE.students;
    let result = students.filter(student => student.lastName.toLowerCase().includes(getInputValue()));
    console.log(result);
    createStudents(result);
}

// Renders students based on result from filterStudentsByLastName
function createStudents(student) {
    for (let i = 0; i < student.length; i++) {
        createStudent(student, i)
    }
}

// Creates a single student and appends to studentResults
function createStudent(student, i) {
    let studentItem = document.createElement("div");
    studentItem.classList.add("student");
    // Gives the student item an ID based on the student objects ID
    studentItem.id = `${student[i].studentID}`
    studentItem.innerHTML = `
    <h2>${student[i].firstName} ${student[i].lastName} (total of ${credits(student, i)} credits)</h2>
    <h3>Courses:</h3>
    `
    studentResults.appendChild(studentItem);
    createCourses(student, i);
}

// Gets the credit score of the student
function credits(student, i) {
    let credits = []
    // Loops through each course and pushes the passed credit to the array
    for (let j = 0; j < student[i].courses.length; j++) {
        credits.push(student[i].courses[j].passedCredits);
    }
    // Sum up the credits array to get the full credits of the student
    let initialValue = 0;
    let creditsSum = credits.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
    return creditsSum;
}

// Function that gets the value from the input field
function getInputValue() {
    let input = document.getElementById('studentinput').value.toLowerCase();
    return input;
}

// Creates all courses for a student
function createCourses(student, i) {
    // Iterates through each course
    for (let studentCourse of student[i].courses) {
        let course = document.createElement("div");
        let courseInfo = document.createElement("p");
        // Iterates through the database courses
        for (let databaseCourse of DATABASE.courses) {
            if (studentCourse.courseId == databaseCourse.courseId) {
                courseInfo.innerHTML = `
                ${databaseCourse.title}  <br>
                ${studentCourse.started.semester} ${studentCourse.started.year} (${studentCourse.passedCredits} credits of ${databaseCourse.totalCredits})`;
                // If the student has passed the course, the background color changes
                if (studentCourse.passedCredits == databaseCourse.totalCredits) {
                    course.style.backgroundColor = "darkgray";
                }
            }
        }
        // Append the course info to the course div
        course.appendChild(courseInfo);
        // Appends the whole course to the student based on ID
        document.getElementById(`${student[i].studentID}`).appendChild(course);
    }
}

