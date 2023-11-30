const form=document.getElementById("form");
const recordsContainer=document.getElementById("records-container");
const createButton=document.querySelector("#form button");

//formState="CREATE | "UPDATE

let formState="CREATE";
const employeeList=[];
let empId=1000;

const onSubmitForm=(event)=>{
    event.preventDefault();
    const employee={
        employeeId:++empId,
        name:event.target.name.value,
        salary:event.target.salary.value,
        role:event.target.role.value,
        team:event.target.team.value,
        companyName:event.target.companyName.value

    }
    if(formState==="CREATE"){
        addNewEmployeeRecord(employee);
    }else if(formState==="UPDATE"){
        formState="CREATE"
        createButton.innerText="Create Employee";
    }
  form.reset();
    
}
function deleteRecord(event){
    if(formState==="UPDATE"){
        alert("Please update the record before deleteing anything");
        return;
    }
    const deleteButton=event.target;
    const record=deleteButton.parentNode.parentNode;
    record.remove();
    const currentEmployeeId=parseInt(deleteButton.getAttribute("data-empId"));
    for(let i=0;i<employeeList.length;i++){
        if(employeeList[i].employeeId===currentEmployeeId){
            employeeList.splice(i,1);
            break;
        }
    }
}
function fillFromWithData(employee){
    for(let ket in employee){
        if(key!=="employeeId"){
            form[key].value=employee[key];
        }
    }
    createButton.innerText="Update Employee";
    formState="UPDATE";
}
function editRecord(event) {
    // get the data of that record 
    // fill the form with that data.
    // change the innerText of the submit button to `Update Employee`
    const editButton = event.target;
    const currentEmployeeId = parseInt(editButton.getAttribute("data-empId"));

    for (let i = 0; i < employeeList.length; i++) {
        // "1001" === 1001
        if (currentEmployeeId === employeeList[i].employeeId) {
            fillFormWithData(employeeList[i]);
            break;
        }
    }
}
function addNewEmployeeRecord(employee){
    const record=document.createElement("tr");
    for(let key in employee){
        const cell=document.createElement("td");
        cell.innerText=employee[key];
        record.appendChild(cell);
    }
    recordsContainer.appendChild(record);

    const optionCell=document.createElement("td");

const editIcon=document.createElement("span")
editIcon.className="material-icons icon";
editIcon.innerText="edit";

const deleteIcon=document.createElement("span");
deleteIcon.className="material-icons icon";
deleteIcon.innerText="delete";
deleteIcon.setAttribute("data-empId", employee.employeeId);
deleteIcon.addEventListener("click", deleteRecord);

optionCell.append(editIcon, deleteIcon);

record.appendChild(optionCell);
recordsContainer.appendChild(record);
employeeList.push(employee);
}
form.addEventListener("submit",onSubmitForm);