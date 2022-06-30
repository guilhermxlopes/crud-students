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
const saveStudentRegister = () => {
  const student = {
    name: document.getElementById("f-name").value,
    gr: document.getElementById("f-gr").value,
    birthdate: document.getElementById("f-birthdate").value,
    email: document.getElementById("f-email").value,
  };

  const index = document.getElementById("f-name").dataset.index;

  createStudent(student);
  updateTable();
};

const saveStudentEdit = () => {
  const student = {
    name: document.getElementById("fedit-name").value,
    gr: document.getElementById("fedit-gr").value,
    birthdate: document.getElementById("fedit-birthdate").value,
    email: document.getElementById("fedit-email").value,
  };

  const index = document.getElementById("fedit-name").dataset.index;

  updateStudent(index, student);
  updateTable();
};

// BUTTON TRIGGER

////////////////////////////////////////////////////////////////// READ STUDENT
const readStudent = () => getLocalStorage();

// CREATE NEW ROWS FOR NEW STUDENTS
const createRow = (student, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${student.name}</td>
  <td>${student.gr}</td>
  <td>${student.birthdate}</td>
  <td>${student.email}</td>
  <td><button id="delete-${index}" class=" btn btn-outline-secondary btn-sm"><i class="bi bi-trash"></i></button>
  <button id="edit-${index}" class="editBtn btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalEdit"><i class="bi bi-pencil-square"></i></button></td>`;

  document.querySelector("tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableStudents>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dataStudent = readStudent();
  clearTable();
  dataStudent.forEach(createRow);
};

updateTable();

////////////////////////////////////////////////////////////////// UPDATE STUDENT
const updateStudent = (index, student) => {
  // get the index from the array to change
  const dataStudent = readStudent();
  dataStudent[index] = student;
  setLocalStorage(dataStudent);
};

const fillFieldsFromStudent = (student) => {
  document.getElementById("fedit-name").value = student.name;
  document.getElementById("fedit-gr").value = student.gr;
  document.getElementById("fedit-birthdate").value = student.birthdate;
  document.getElementById("fedit-email").value = student.email;
  document.getElementById("fedit-name").dataset.index = student.index;
};

const editStudent = (index) => {
  const student = readStudent()[index];
  student.index = index;
  fillFieldsFromStudent(student);
};

const editGet = (event) => {
  const [action, index] = event.target.id.split("-");
  if (action == "edit") {
    editStudent(index);
  }
};

////////////////////////////////////////////////////////////////// DELETE ALL STUDENTS
const deleteAllStudents = () => {
  clearLocalStorage();
  location.reload();
};

document.querySelector("#tableStudents>tbody").addEventListener("click", editGet);

document.getElementById("deleteDatabase").addEventListener("click", deleteAllStudents);

document.getElementById("submitEdit").addEventListener("click", saveStudentEdit);

document.getElementById("submitCreate").addEventListener("click", saveStudentRegister);
