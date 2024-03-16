import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDateTimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");
const timerValues = document.querySelector(".timer .value")

let userSelectedDate = null;
// let initTime = new Date();
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(inputDateTimePicker, options);

startBtn.addEventListener("click", () => { 
  intervalId = setInterval(() => {
        const currentTime = Date.now();
    const difference = userSelectedDate - currentTime;
    const time = convertMs(difference);
    console.log(time);
    // timerValues.textContent = time; ПОКА НЕ РАБОТАЕТ!!!! 
    // console.log(timerValues);
    if (difference < 1000) clearInterval(intervalId);
 
  }, 1000);


})








function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}