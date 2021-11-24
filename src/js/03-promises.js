import { Notify } from 'notiflix/build/notiflix-notify-aio';
const el = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
      console.log(resolve);
    } else {
      // Reject
      reject({ position, delay });
      console.log(reject);
    }
  });
}

el.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(el.delay.value);
  const step = Number(el.step.value);
  const amount = Number(el.amount.value);
  for (let i = 1; i <= amount; i++) {
    delay += step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
  }
}
