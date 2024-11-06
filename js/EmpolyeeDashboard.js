
const deleteRef=document.getElementById('delete-btn')
const tableBody = document.querySelector('.table-body');

fetch("http://localhost:3000/employee")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    data.forEach(employee => {

      console.log(employee);
      
      const row = document.createElement('tr');
      
      // Employee name with profile image
      const nameCell = document.createElement('td');
      nameCell.innerHTML = `
        <div class="name-cnt">
          <img src="${employee.profile}" alt="" width="50" height="50"/>
          <span>${employee.name}</span>
        </div>
      `;

      // Gender
      const genderCell = document.createElement('td');
      genderCell.textContent = employee.gender;

      // Department
      const departmentCell = document.createElement('td');
      departmentCell.textContent = employee.department.join(", "); 

      // Salary
      const salaryCell = document.createElement('td');
      salaryCell.textContent = employee.salary;

      // Start Date
      const startDateCell = document.createElement('td');
      const { day, month, year } = employee.startDate;
      startDateCell.textContent = `${day} ${month} ${year}`;

      // Action buttons
      const actionCell = document.createElement('td');
      actionCell._id=employee.id
      actionCell.innerHTML = `
        <button id='delete-btn' onClick="del('${employee.id}')" class="button">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="button" onClick="updateEmployee('${employee}')">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      `;

      // Append all cells to the row
      row.appendChild(nameCell);
      row.appendChild(genderCell);
      row.appendChild(departmentCell);
      row.appendChild(salaryCell);
      row.appendChild(startDateCell);
      row.appendChild(actionCell);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("There has been a problem with your fetch operation:", error));


  function del(empID) {
    fetch(`http://localhost:3000/employee/${empID}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Employee deleted successfully");
  
        const employeeRow = document.getElementById(`${empID.nameRef}`);
        if (employeeRow) {
          employeeRow.remove();
        }
      })
      .catch(error => console.error(error));
  }

//   function updateEmployee(employee) {
//     localStorage.setItem('emplist',JSON.stringify(employee))
   
//   }


