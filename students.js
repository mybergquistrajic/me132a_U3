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
    // let courses = createStudentCourse(student);
    studentItem.innerHTML = `
    <h2>${student[i].firstName} ${student[i].lastName} (total of ${credits(student, i)} credits)</h2>
    <h3>Courses:</h3>
        <div>
            <div>
                <p>Biology</p>
                <p>Autumn 2019 (15 of 15 credits)</p>
            </div>
        </div>
    </div>
    `
    studentResults.appendChild(studentItem);
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

filterStudentsByLastName()
