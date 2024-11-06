
$(document).ready(function () {
    const apiUrl = 'http://localhost:3000/employee';

    // Fetch and display employees on page load
    function fetchEmployees(filter = "") {
        $.get(apiUrl, function (data) {

            $('.table-body').empty();

            const filteredData = data.filter(employee => {
                return (
                    employee.name.toLowerCase().includes(filter.toLowerCase()) ||
                    employee.department.some(dep => dep.toLowerCase().includes(filter.toLowerCase()))
                );
            });

            filteredData.forEach(employee => {
                $('.table-body').append(`
                    <tr data-id="${employee.id}">
                        <td>
                            <div class="name-cnt">
                                <img src="${employee.profile}" alt="" width="50" height="50" />
                                <span>${employee.name}</span>
                            </div>
                        </td>
                        <td>${employee.gender}</td>
                        <td>${employee.department.join("  ")}</td>
                        <td>${employee.salary}</td>
                        <td>${employee.startDate.day} ${employee.startDate.month} ${employee.startDate.year}</td>
                        <td>
                            <button class="edit-btn" data-id="${employee.id}">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button class="delete-btn" data-id="${employee.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `);
            });

            $(document).on('click', '.edit-btn', function () {
                const employeeId = $(this).data('id');
                const employee = data.find(emp => emp.id === employeeId); // Find the employee object
        
                if (employee) {
                    localStorage.setItem('employee', JSON.stringify(employee)); // Store the full employee object
                    window.location.href = './EmployeePayrollRegister.html';
                }
            });

        });
    }

    // Delete employee
    $(document).on('click', '.delete-btn', function () {
        const employeeId = $(this).data('id');
        $.ajax({
            url: `${apiUrl}/${employeeId}`,
            type: 'DELETE',
            success: function () {
                fetchEmployees();
                alert("Employee deleted successfully!");
            }
        });
    });

    // $(document).on('click', '.edit-btn', function () {
    //     const userId = $(this).data('id');
    //     localStorage.setItem('id', userId); 
    //     window.location.href = './EmployeePayrollRegister.html';
    // });
    
    



    // Listen for input in the search box
    $('#search-input').on('input', function () {
        const filter = $(this).val(); 
        fetchEmployees(filter);
    });

    // Initial fetch on page load
    fetchEmployees();
});
