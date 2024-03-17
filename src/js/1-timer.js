import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDateTimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");
const clockFace = document.querySelectorAll(".value")

let userSelectedDate = null;
let intervalId = null;
startBtn.disabled = true;
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        position: "topRight",
        message: "Please choose a date in the future",
      });
      startBtn.disabled = true;
    }
    else { 
      startBtn.disabled = false;
      }
  },
};

flatpickr(inputDateTimePicker, options);

startBtn.addEventListener("click", (event) => { 
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const difference = userSelectedDate - currentTime;
    event.preventDefault();
    startBtn.disabled = true;
    inputDateTimePicker.disabled = true;
    if (difference < 1000) {
      startBtn.disabled = true;
     inputDateTimePicker.disabled = false;
      clearInterval(intervalId);
    }
 

    const timer = convertMs(difference); // конвертуємо час
    // console.log(timer);
    clockFace[0].innerText = timer.days.toString().padStart(2, "0"); // відмальовуємо в інтерфейс елементів ДОМ,як значення об'єкта таймер,зводячи до стрінгу та з нулем попереду
    clockFace[1].innerText = timer.hours.toString().padStart(2, "0");
    clockFace[2].innerText = timer.minutes.toString().padStart(2, "0");
    clockFace[3].innerText = timer.seconds .toString().padStart(2, "0");
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
