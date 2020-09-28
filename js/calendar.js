let calendar = document.querySelector('.js-calendar');
let calHeader = document.querySelector('.js-cal-header');
let pMonth = document.querySelector('.js-month');
let pYear = document.querySelector('.js-year');
let daysContainer = document.querySelector('.js-days-container');
let monthLeft = document.querySelector('.js-month-left');
let monthRight = document.querySelector('.js-month-right');
let yearLeft = document.querySelector('.js-year-left');
let yearRight = document.querySelector('.js-year-right');
let arrows = [monthLeft, monthRight, yearLeft, yearRight];


let date = new Date();
let month_names = ['January','February','March','April','May','June','July','August','September','October','November','December']

let month = date.getMonth();
let year = date.getFullYear();

pMonth.innerHTML = month_names[month];
pYear.innerHTML = year;

let firstDate = month_names[month] + " " + 1 + " " + year;

let dayInWeek = new Date(firstDate).toDateString().substring(0, 3);

let dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let dayIndex = dayNames.indexOf(dayInWeek);

let daysNumber = new Date(year, month + 1, 0).getDate();

let table = document.createElement('table');
table.classList.add('table');
daysContainer.appendChild(table);


arrows.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if(elem.classList.contains('js-month-left')) {
            if(month == 0) {
                month = 11;
                year--;
            }
            else {
                month--;
            }
        }
        else if(elem.classList.contains('js-month-right')) {
            if(month == 11) {
                month = 0;
                year++;
            }
            else {
                month++;
            }
        }
        else if(elem.classList.contains('js-year-left')) {
            year--;
        }
        else {
            year++;
        }
        // Variable's call to generate new values from..
        // ..new updated values of 'month' & 'year'
        pMonth.innerHTML = month_names[month];
        pYear.innerHTML = year;
        firstDate = month_names[month] + " " + 1 + " " + year;
        dayInWeek = new Date(firstDate).toDateString().substring(0, 3);
        dayIndex = dayNames.indexOf(dayInWeek);

        while( table.hasChildNodes()) {
            table.removeChild(table.lastChild);
        };
    
        render_calendar();
    })
})

// Function to make table with dates
function render_calendar() {
    let dayToday = date.getDate();
    let monthToday = date.getMonth() + 1;
    let yearToday = date.getFullYear();

    // First row
    let tr1 = document.createElement('tr');
    for(let i=0; i<=6; i++) {
        let td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[i];
        tr1.appendChild(td);
    }
    table.appendChild(tr1);

    // Second row
    // Empty spaces
    let tr2 = document.createElement('tr');
    for(let i=0; i<=6; i++) {
        if(i == dayIndex) {
            break;
        }
        let td = document.createElement('td')
        td.innerHTML = "";
        tr2.appendChild(td);
    }
    // Rest of days for second row
    let count = 1;
    for(let i=dayIndex; i<=6; i++) {
        let td = document.createElement('td');
        // Mark today's day
        if(count == dayToday && monthToday == month + 1 && yearToday == year) {
            td.classList.add('dayToday');
        }
        td.innerHTML = count;
        count++;
        tr2.appendChild(td);
    }
    table.appendChild(tr2);

    // // Rest of the rows with remaining days
    for(let i=0; i<=4; i++) {
        let tr = document.createElement('tr');
        for(let i=0; i<=6; i++) {
            if(count > daysNumber) {
                table.appendChild(tr);
                return table;
            }
            let td = document.createElement('td');
            // Mark today's day
            if(count == dayToday && monthToday == month + 1 && yearToday == year) {
                td.classList.add('dayToday');
            }
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
render_calendar();
