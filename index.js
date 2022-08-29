// Your code here

//create a timestamp function
//army time, using YYYY-MM-DD time as a string
//employees dont work across days

function createEmployeeRecord(arr) {
    const employeeRecord = {
        'firstName': arr[0],
        'familyName': arr[1],
        'title': arr[2],
        'payPerHour': arr[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
    return employeeRecord
}

function createEmployeeRecords(arrOfArrs) {
    //iterates over the nested array then calls createEmployeeRecord each arr. 
    //Places records into new array returning a nested array of objects
    const arrOfRecords = [];
    arrOfArrs.forEach(arr => arrOfRecords.push(createEmployeeRecord(arr)));
    return arrOfRecords
}

function createTimeInEvent(record, dateStamp) {
    const dateStampArr = dateStamp.split(' ');
    record.timeInEvents.push({
        'type': 'TimeIn',
        'hour': parseInt(dateStampArr[1], 10),
        'date': dateStampArr[0]
    })

    return record
}

function createTimeOutEvent(record, dateStamp) {
    const dateStampArr = dateStamp.split(' ');
    record.timeOutEvents.push({
        'type': 'TimeOut',
        'hour': parseInt(dateStampArr[1], 10),
        'date': dateStampArr[0]
    })

    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(punchIn => punchIn.date === date)
    let timeOut = record.timeOutEvents.find(punchOut => punchOut.date === date)
    return (timeOut.hour - timeIn.hour) / 100

}

function wagesEarnedOnDate(record, date) {
    return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record) {
    let datesWorked = [];
    for (let i = 0; i < record.timeInEvents.length; i++) {
        datesWorked.push(record.timeInEvents[i].date);
    }
    return datesWorked.reduce((total, date) => total = total + wagesEarnedOnDate(record, date), 0)
}

function calculatePayroll(csv){
    let test = csv.map(record => allWagesFor(record));
    console.log(test)
    return test.reduce((total,wage)=> total = total+ wage,0)

}