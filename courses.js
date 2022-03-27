"use strict"

let courseResults = document.querySelector(".courses");

// Function that gets the value from the input field
function getInputValue() {
    let input = document.getElementById('courseinput').value.toLowerCase();
    return input;
}

// Filters courses by name
function filterCoursesByName() {
    courseResults.innerHTML = "";
    let courses = DATABASE.courses;
    let result = courses.filter(course => course.title.toLowerCase().includes(getInputValue()));
    // Sorts result by title
    result.sort(function (a, b) {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        return 0;
    })
    createCourses(result);
}

// Renders courses based on result from filterCoursesByName
function createCourses(course) {
    for (let i = 0; i < course.length; i++) {
        createCourse(course, i)
    }
}

// Creates a single course and appends to courseResults
function createCourse(course, i) {
    let courseItem = document.createElement("div");
    courseItem.classList.add("course");
    // Gives the courseItem and ID based on the course objects ID
    courseItem.id = `${course[i].courseId}`
    // Fills the div and gives id's to the individual divs for furure appending
    courseItem.innerHTML = `
    <h2>${course[i].title} (${course[i].totalCredits} credits)</h2>
    <div id="${course[i].courseId}-responsible">Course responsible: <br></div>
    <div id="${course[i].courseId}-teachers">Teachers: <br></div>
    <div id="${course[i].courseId}-students">Students: <br></div>`
    courseResults.appendChild(courseItem);
    courseResponsible(course, i)
    courseTeachers(course, i)
    courseStudents(course, i)
}

// Creates the course responsible
function courseResponsible(course, i) {
    let responsible = document.createElement("div");
    responsible.classList.add("courseresponsible");
    for (let teacher of DATABASE.teachers) {
        if (course[i].courseResponsible == teacher.teacherId) {
            responsible.innerHTML = `
                <p>${teacher.firstName} ${teacher.lastName} (${teacher.post})</p>`;
            responsible.style.backgroundColor = "darkgray"
        }
    }
    document.getElementById(`${course[i].courseId}-responsible`).appendChild(responsible);
}

// Creates the course teachers
function courseTeachers(course, i) {
    for (let courseTeacher of course[i].teachers) {
        let teacher = document.createElement("div");
        teacher.classList.add("courseteacher");
        let teacherInfo = document.createElement("p");
        for (let databaseTeacher of DATABASE.teachers) {
            if (courseTeacher == databaseTeacher.teacherId) {
                teacherInfo.innerHTML = `
                ${databaseTeacher.firstName} ${databaseTeacher.lastName} (${databaseTeacher.post})`
            }
        }
        teacher.appendChild(teacherInfo);
        document.getElementById(`${course[i].courseId}-teachers`).appendChild(teacher);
    }
}

// Creates the students of the course
function courseStudents(course, i) {
    for (let student of DATABASE.students) {
        for (let studentCourse of student.courses) {
            if (course[i].courseId == studentCourse.courseId) {
                let studentItem = document.createElement("div");
                studentItem.classList.add("coursestudent");
                let studentInfo = document.createElement("p");
                studentInfo.innerHTML = `
                ${student.firstName} ${student.lastName} (${studentCourse.passedCredits} credits) <br>
                ${studentCourse.started.semester} ${studentCourse.started.year}`
                // Changes background color if the student has passed the course
                if (studentCourse.passedCredits == course[i].totalCredits) {
                    studentItem.style.backgroundColor = "darkgray";
                }
                studentItem.appendChild(studentInfo);
                document.getElementById(`${course[i].courseId}-students`).appendChild(studentItem);
            }
        }
    }
}

