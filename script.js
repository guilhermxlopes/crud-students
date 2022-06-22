const getLocalStorage = () => JSON.parse(localStorage.getItem("data_student")) ?? []; // get data from the localStorage
const setLocalStorage = (dataStudent) => localStorage.setItem("data_student", JSON.stringify(dataStudent)); // set data to the localStorage

const studentTemp = {
  name: "Guiaaalherme",
  grr: "20000102",
  birthdate: "20/01/1990",
  email: "guilhermxlopes@gmail.com",
};

///////////////////////////////// CREATE STUDENT
const createStudent = (student) => {
  const dataStudent = getLocalStorage();
  dataStudent.push(student);
  setLocalStorage(dataStudent);
};

// CHECK IF FORMS IS COMPLETED
const isCompletedFields = () => {
  return document.querySelector("form").reportValidity(); // retorna verdadeiro/true com todos os requisitos do HTML cumpridos
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
    if (index == "new") {
      createStudent(student);
    }
  }
};

// BUTTON TRIGGER
document.getElementById("submit").addEventListener("click", saveStudent);
document.getElementById("submit").addEventListener("click", console.log(saveStudent));
