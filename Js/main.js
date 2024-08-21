let studentName = document.getElementById("name");
let studentGrade = document.getElementById("grade");
let btn = document.getElementById("add");
let sortSelect = document.getElementById("sortSelect");
let filterSelect = document.getElementById("filterSelect");
let studentsList ;

localStorage.getItem("studentsList") == null
  ? (studentsList = [])
  : ((studentsList = JSON.parse(localStorage.getItem("studentsList"))),
  displayStudent(studentsList));

function localStorageUpdate() {
    localStorage.setItem('studentsList', JSON.stringify(studentsList));
}

btn.addEventListener("click", function () {
    let nameValue = studentName.value.trim();
    let gradeValue = parseInt(studentGrade.value);
    if (nameValue.length < 5) {
        alert("Student name must be at least 5 characters long.");
        return;
    }
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
        alert("Student grade must be between 0 and 100.");
        return;
    }
    let student = {
        name: nameValue,
        grade: gradeValue
    };
    studentsList.push(student);
    localStorageUpdate();
    sortAndFilterStudents();
    clearInputs();
});

function displayStudent(studentList) {
    let table = '';
    for (let i = 0; i < studentList.length; i++) {
        table += `<tr>
            <td>${studentList[i].name}</td>
            <td>${studentList[i].grade}</td>
            <td><button onclick="deleteStudent(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}

function clearInputs() {
    studentName.value = "";
    studentGrade.value = "";
}

function deleteStudent(index) {
    studentsList.splice(index, 1);
    localStorageUpdate();
    sortAndFilterStudents();
}


function sortAndFilterStudents() {
    let sortOption = sortSelect.value;
    let filterOption = filterSelect.value;

  
    let sortedStudents = [...studentsList];
    if (sortOption == 'grades') {
        sortedStudents.sort((a, b) => b.grade - a.grade);
    } else {
        sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    }

    let filteredStudents;
    if (filterOption === 'passed') {
        filteredStudents = sortedStudents.filter(student => student.grade >= 50);
    } else if (filterOption === 'failed') {
        filteredStudents = sortedStudents.filter(student => student.grade < 50);
    } else {
        filteredStudents = sortedStudents;
    }

    displayStudent(filteredStudents);
}

sortSelect.addEventListener('change', sortAndFilterStudents);
filterSelect.addEventListener('change', sortAndFilterStudents);
sortAndFilterStudents();