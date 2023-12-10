const dayError = document.querySelector("#day i");
const monthError = document.querySelector("#month i");
const yearError = document.querySelector("#year i");

const day = document.querySelector("#number-day");
const month = document.querySelector("#number-month");
const year = document.querySelector("#number-year");

let ageInYears = null;
let ageInMonths = null;
let ageInDays = null;

const totalTime = 1000;
let yearUpdateTime = null;
let monthUpdateTime = null;
let dayUpdateTime = null;

const daysInMonth = [31, [28,29], 31, 30, 31, 30, 31, 30, 31, 30, 31]

function clearError(){
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
}

function resetAge(){
    day.textContent = "--";
    month.textContent = "--";
    year.textContent = "--";
}

function calculate(){
    const bornDay = Number(document.querySelector("#born-day").value);
    const bornMonth = Number(document.querySelector("#born-month").value);
    const bornYear = Number(document.querySelector("#born-year").value);
    const today = new Date();

    clearError();
    resetAge();

    if (!bornDay){
        dayError.textContent = "This field is required";
    }
    if (!bornMonth){
        monthError.textContent = "This field is required";
    }
    if (!bornYear){
        yearError.textContent = "This field is required";
    }
    if (!bornDay || !bornMonth || !bornYear) {
        return 0;
    }

    if (!dateValidation(bornYear, bornMonth, bornDay)){
        return 0;
    }

    const born = new Date(bornYear, bornMonth-1, bornDay);

    mostAccuratelyCountingAge(today, born);
    
    day.textContent = 0;
    month.textContent = 0;
    year.textContent = 0;

    yearUpdateTime = totalTime / ageInYears;
    monthUpdateTime = totalTime / ageInMonths;
    dayUpdateTime = totalTime / ageInDays;

    if (ageInYears > 0) updateYearCount();
    if (ageInMonths > 0) updateMonthCount();
    if (ageInDays > 0) updateDayCount();

    if (today.getDate() === born.getDate() && today.getMonth() === born.getMonth()) {
        happyBirthday();
        const element = document.querySelector('#happy-birthday');
        element.getAnimations().forEach((animation) => {
            animation.cancel();
            animation.play();
        });
    }

}

function dateValidation(bornYear, bornMonth, bornDay) {
    const born = new Date(bornYear, bornMonth-1, bornDay);
    const today = new Date();
    let valid = true;
    if (born.getDate() !== bornDay || born.getMonth() !== bornMonth-1 || born.getFullYear() !== bornYear){
        dayError.textContent = "Must be a valid day";
        monthError.textContent = "Must be a valid month";
        valid = false;
    }
    if (born > today){
        yearError.textContent = "Must be in the past";
        valid = false;
    }
    return valid;
}

async function updateYearCount(){
    year.textContent++;
    if (year.textContent < ageInYears){
        setTimeout(updateYearCount, yearUpdateTime);
    }
}

async function updateMonthCount(){
    month.textContent++;
    if (month.textContent < ageInMonths){
        setTimeout(updateMonthCount, monthUpdateTime);
    }
}

async function updateDayCount(){
    day.textContent++;
    if (day.textContent < ageInDays){
        setTimeout(updateDayCount, dayUpdateTime);
    }
}

function mostAccuratelyCountingAge(today, born){
    const y = [today.getFullYear(), born.getFullYear()];
    let ydiff = y[0] - y[1];
    const m = [today.getMonth(), born.getMonth()];
    let mdiff = m[0] - m[1];
    const d = [today.getDate(), born.getDate()];
    let ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff=== 0 && ddiff<0)) --ydiff;
    if (mdiff < 0) mdiff+= 12;
    if (ddiff < 0){
        born.setMonth(m[1] + 1, 0);
        ddiff = born.getDate() - d[1] + d[0];
        --mdiff;
    }

    ageInYears = ydiff
    ageInMonths = mdiff;
    ageInDays = ddiff;

}

function happyBirthday(){
    document.querySelector("#happy-birthday").classList.add("animate");
}