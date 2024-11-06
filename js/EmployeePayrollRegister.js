let   empList=localStorage.getItem("emplist")
const nameRef = document.getElementById('nameField');
const profileRef = document.getElementsByName('profile')
const genderRef = document.getElementsByName('gender');
const salaryRef = document.getElementById("salary-cnt");
const departmentRef = document.getElementsByName('inputCheckbox');
const dayRef = document.getElementById('day-cnt');
const monthRef = document.getElementById('month-cnt');
const yearRef = document.getElementById('year-cnt');
const notesRef = document.getElementById('note-input');
const resetBtnRef = document.getElementById("reset-btn");
const cancelBtnRef = document.getElementById("cancle-btn");
const submitBtnRef = document.getElementById('submit-btn');
const nameErrorRef=document.getElementById('nameError')
const profileErrorRef=document.getElementById('profileError')
const genderErrorRef=document.getElementById('genderError')
const departmentErrorRef=document.getElementById('departmentError')
const salaryErrorRef=document.getElementById('salaryError')
const dateErrorRef=document.getElementById('dateError')

submitBtnRef.addEventListener('click', (e) =>{
    e.preventDefault();
    const nameValue = nameRef.value;
    if(nameValue==''){
        nameErrorRef.textContent = "Enter the name.";
        nameErrorRef.style.color='red'
        return;
    }
    else{
        nameErrorRef.textContent = "";
    }

    let selectedProfile=null;
    profileRef.forEach(element => {
        if(element.checked){
            selectedProfile = element.nextElementSibling.getAttribute('src');
        }
    })
    if(!selectedProfile){
        profileErrorRef.textContent='Select Profile Image.'
        profileErrorRef.style.color='red'
        profileErrorRef.style.display='block'
        
        return;
    }
    else{
        profileErrorRef.textContent='';
    }

    let selectedGender = null;
    genderRef.forEach(element => {
        if(element.checked){
            selectedGender = element.nextElementSibling.textContent;
        }
    });

    if(!selectedGender){
        genderErrorRef.textContent='Select Gender .'
        genderErrorRef.style.color='red'
        return;
    }
    else{
        genderErrorRef.textContent=''
    }


    let selectedDepartmentObj = [];
    departmentRef.forEach(element => {
        if(element.checked){
            selectedDepartmentObj.push(element.nextElementSibling.textContent);
        }
    });
    if(!selectedDepartmentObj.length){
        departmentErrorRef.textContent='Select Department .'
        departmentErrorRef.style.color='red'
        return;
    }
    else{
        departmentErrorRef.textContent=''
    }

    let selectedSalary = salaryRef.value;
    if(!selectedSalary){
        salaryErrorRef.textContent='Select Salary .'
        salaryErrorRef.style.color='red'
        return;
    }
    else{
         salaryErrorRef.textContent=''
    }

    let dateObj = {
        day: dayRef.value,
        month: monthRef.value,
        year: yearRef.value
    }
    // if(dayRef.day==0 || monthRef.month==0 || yearRef.year==0){
    //     dateErrorRef.textContent='Select Date .'
    //     dateErrorRef.style.color='red'
    //     return;
    // }
    // else{
    //     dateErrorRef.textContent=''
    // }

    let notesContent = notesRef.value;

    let empObj = {
        name: nameValue,
        profile: selectedProfile,
        gender: selectedGender,
        department: selectedDepartmentObj,
        salary: selectedSalary,
        startDate: dateObj,
        notes: notesContent
    }
    // if(empList){
    //     empList=JSON.parse(empList)
    //     empList=[...empList,empObj]
    // }
    // else{
    //     empList=[empObj]
    // }
    // localStorage.setItem('emplist',JSON.stringify(empList))
    // console.log(empObj);
   
    //const getUserId = localStorage.getItem('id');
    const employeeData = JSON.parse(localStorage.getItem('employee'));
    console.log(employeeData);
    
    if (employeeData) {
        console.log("--userID---");
        // ---------
         nameRef.value = employeeData.name;

         // Set profile image radio button
         profileRef.forEach(radio => {
             if (radio.nextElementSibling.getAttribute('src') === employeeData.profile) {
                 radio.checked = true;
             }
         });
 
         // Set gender radio button
         genderRef.forEach(radio => {
             if (radio.nextElementSibling.textContent === employeeData.gender) {
                 radio.checked = true;
             }
         });
 
         // Set department checkboxes
         departmentRef.forEach(checkbox => {
             if (employeeData.department.includes(checkbox.nextElementSibling.textContent)) {
                 checkbox.checked = true;
             }
         });
 

         // Set salary, date, and notes fields
         salaryRef.value = employeeData.salary;
         dayRef.value = employeeData.startDate.day;
         monthRef.value = employeeData.startDate.month;
         yearRef.value = employeeData.startDate.year;
         notesRef.value = employeeData.notes;

         nameRef.textContent=nameRef.value;
         console.log(nameRef.value);
         

        // ------------
        $.ajax({
            url: `http://localhost:3000/employee/${getUserId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(empObj),
            success: function() {
                localStorage.removeItem('id'); 
                alert("Employee Updated successfully!");
                resetform(); 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
            }
        });
    } else {
        console.log("---without userID--");
        $.ajax({    
            url: `http://localhost:3000/employee/`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(empObj),
            success: function() {
                localStorage.removeItem('id');
                alert("Employee Registered successfully!");
                resetform();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
            }
        });
    }

})

function EditDetail(){

}

function resetBtn(){
    nameRef.value = "";
    profileRef.forEach(radio => radio.checked = false);
    genderRef.forEach(radio => radio.checked = false);
    departmentRef.forEach(checkbox => checkbox.checked = false);
    salaryRef.selectedIndex = 0;
    dayRef.selectedIndex = 0;
    monthRef.selectedIndex = 0;
    yearRef.selectedIndex = 0;
    notesRef.value = "";    
}


resetBtnRef.addEventListener('click',(e)=>{
    e.preventDefault();
    resetBtn()
})

cancelBtnRef.addEventListener('click',(e)=>{
     //e.preventDefault()
    // resetBtn()
    window.location.href = './EmpolyeeDashboardjquery.js';
})



