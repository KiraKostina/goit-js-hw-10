import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const submitForm = document.querySelector(".form");

submitForm.addEventListener("submit", event => { 
    event.preventDefault();
    const delay = parseInt(event.target.elements.delay.value);
    const state = event.target.elements.state.value;
    
    function createPromise(delay, state) {
    
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === "fulfilled") {
                    resolve(delay);
                } else if (state === "rejected") {
                    reject(delay);
                }
            }, delay);
        });
    
        promise.then((delay) => {
            iziToast.success({
            position: "topRight",
            message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
            .catch((delay) => {
           iziToast.error({
    position: "topRight",
    message: `❌ Rejected promise in ${delay}ms`,
});
        });
    }

    createPromise(delay, state);

    submitForm.reset();
})





