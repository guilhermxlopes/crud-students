"use strict";

const getLocalStorage = () => JSON.parse(localStorage.getItem("data_student")) ?? []; // get data from the localStorage
const setLocalStorage = (dataStudent) => localStorage.setItem("data_student", JSON.stringify(dataStudent)); // set data to the localStorage
const clearLocalStorage = () => localStorage.clear();

////////////////////////////////////////////////////////////////// CREATE STUDENT
const createStudent = (student) => {
  const dataStudent = getLocalStorage();
  dataStudent.push(student);
  setLocalStorage(dataStudent);
};

// CHECK IF FORMS IS COMPLETED
const isCompletedFields = () => {
  return document.querySelector("form").reportValidity(); // retorna verdadeiro/falso com todos os requisitos do HTML cumpridos
};

// SAVE STUDENT
const saveStudent = () => {
  if (isCompletedFields()) {
    const student = {
      name: document.getElementById("f-name").value,
      gr: document.getElementById("f-gr").value,
      birthdate: document.getElementById("f-birthdate").value,
      email: document.getElementById("f-email").value,
    };
    const index = document.getElementById("f-name").dataset.index;

    createStudent(student);
    updateTable();
  }
};

// BUTTON TRIGGER
document.getElementById("submit").addEventListener("click", saveStudent);

////////////////////////////////////////////////////////////////// READ STUDENT
const readStudent = () => getLocalStorage();

// CREATE NEW ROWS FOR NEW STUDENTS
const createRow = (student) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${student.name}</td>
  <td>${student.gr}</td>
  <td>${student.birthdate}</td>
  <td>${student.email}</td>`;
  document.querySelector("tbody").appendChild(newRow);
};

const updateTable = () => {
  const dataStudent = readStudent();
  dataStudent.forEach(createRow);
};

updateTable();

////////////////////////////////////////////////////////////////// UPDATE STUDENT
const updateStudent = (index, student) => {
  const dataStudent = readStudent();
  dataStudent[index] = student;
  setLocalStorage(dataStudent);
};

////////////////////////////////////////////////////////////////// DELETE ALL STUDENTS
const deleteAllStudents = () => {
  clearLocalStorage();
  location.reload();
};

document.getElementById("deleteDatabase").addEventListener("click", deleteAllStudents);
