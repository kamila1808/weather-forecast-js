const API_KEY = "8ef00858d88341cd97c75723230103";

//   Получаем название города
const headerEl = document.querySelector(".header");
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".form__input");

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) {
    prevCard.remove();
  }
}

function showError(errorMessage) {
  const error = `<div class="card"><div class="card-description">${errorMessage}</div></div>`;
  headerEl.insertAdjacentHTML("afterend", error);
}

function showCard(name, country, temp, condition, icon) {
  const html = `
    <div class="card">
    <div class="card-description">
    <h2 class="card-city">${name}, <span>${country}</span></h2>
    <p class="card-temperature">${temp}°c</p>
    <p class="card-weather">${condition}</p>
  </div>
  <img src=${icon} 1.png" alt="weather" class="weather-image">
</div>
    `;
  // отображаем карточку на странице
  headerEl.insertAdjacentHTML("afterend", html);
}

// слушаем отправку формы
formEl.onsubmit = function (event) {
  event.preventDefault();
  let city = inputEl.value.trim();
  //делаем запрос на сервер
  const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // проверка на ошибку
      if (data.error) {
        removeCard();
        showError(data.error.message);
      } else {
        removeCard();
        showCard(
          data.location.name,
          data.location.country,
          data.current.temp_c,
          data.current.condition.text,
          data.current.condition.icon
        );
      }
    });
};
