//creating employee record function that has a single employee's details in an array
function createEmployeeRecord(employeeArray) {
    //creating employee array
    const employee = {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  
    return employee;
}

//creating employees record that has an array of individual employee
function createEmployeeRecords(employeesArray) {
    const employees = [];
  
    // Converts each nested array into an employee record using createEmployeeRecord
    for (let i = 0; i < employeesArray.length; i++) {
      const employeeArray = employeesArray[i];
      const employeeRecord = createEmployeeRecord(employeeArray);
      employees.push(employeeRecord);
    }
  
    return employees;
}
  
//creating a time In function for an employee
function createTimeInEvent(employee, dateStamp) {
    // Creates object to be added to timeInEvents array
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(dateStamp.substring(11)),
      date: dateStamp.substring(0, 10),
    };
  
    // Adds object to timeInEvents array
    employee.timeInEvents.push(timeInEvent);
  
    return employee;
  }
//Creating Time out function for an employee
function createTimeOutEvent(employee, dateStamp) {
    // Creates object to be added to timeOutEvents array
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(dateStamp.substring(11)),
      date: dateStamp.substring(0, 10),
    };
  
    // Add object to timeOutEvents array
    employee.timeOutEvents.push(timeOutEvent);
  
    return employee;
}
 
//function that gets time out and subtracts time in to know the hours worked on a single day 
//Keeping in mind that we have assumptions that the employee works during the working days, not across days,
//They always check in and out without forgetting, time is in 24hr-clock-system and that
//they always check in and out on the hour

function hoursWorkedOnDate(employee, date) {
    // Finds timeInEvent and timeOutEvent on specified date
    const timeInEvent = employee.timeInEvents.find(event => event.date === date && event.type === "TimeIn"); 
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date && event.type === "TimeOut");
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    }
  
    // Calculates hours worked by subtracting timeIn from timeOut
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
}

//Function to calculate the wages earned based on the hrs worked and rate of pay per hour
function wagesEarnedOnDate(employee, date) {
    // Gets hours worked on specified date
    const hoursWorked = hoursWorkedOnDate(employee, date);
  
    // Calculates pay owed by multiplying hours worked by pay rate
    const wagesEarned = hoursWorked * employee.payPerHour;
  
    return wagesEarned;
}

//function to calculate all wages for and employee
function allWagesFor(employee) {
    // Gets all unique dates from timeInEvents and timeOutEvents arrays
    const timeInDates = employee.timeInEvents.map(event => event.date);
    const timeOutDates = employee.timeOutEvents.map(event => event.date);
    const allDates = [...new Set([...timeInDates, ...timeOutDates])];
  
    // Accumulates total pay owed by calling wagesEarnedOnDate for each date
    let totalWages = 0;
    for (let i = 0; i < allDates.length; i++) {
      const date = allDates[i];
      const wagesEarned = wagesEarnedOnDate(employee, date);
      totalWages += wagesEarned;
    }
  
    return totalWages;
}

//function that calculates the payroll of the employees
function calculatePayroll(employees) {
    // Accumulates total pay owed for all employees by calling allWagesFor for each employee
    let totalPayroll = 0;
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      const wagesOwed = allWagesFor(employee);
      totalPayroll += wagesOwed;
    }
  
    return totalPayroll;
}
  