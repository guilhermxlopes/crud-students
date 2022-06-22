const getLocalStorage = () => JSON.parse(localStorage.getItem("data_student")) ?? []; // get data from the localStorage
const setLocalStorage = (dataStudent) => localStorage.setItem("data_student", JSON.stringify(dataStudent)); // set data to the localStorage

const studentTemp = {
  name: "Guilherme",
  grr: "20000102",
  birthdate: "20/01/1990",
  email: "guilhermxlopes@gmail.com",
};

// CREATE STUDENT
const createStudent = (student) => {
  const dataStudent = getLocalStorage();
  dataStudent.push(student);
  setLocalStorage(dataStudent);
};
