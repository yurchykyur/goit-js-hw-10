// Завдання - Котопошук
// Створи фронтенд частину застосунку для пошуку інформації про кота за його породою.
// Подивися демо відео роботи програми, використовуй його як орієнтир для необхідного функціоналу.

// HTTP-запити
// Використовуй публічний The Cat API. Для початку роботи необхідно зареєструватися й отримати унікальний ключ доступу,
// щоб прикріплювати його до кожного запиту.
// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g.
// 'api_key=live_wkn7NG9gg6cEVzYeEh1vrLo4JBR3UguOoVTAaAJh8My7YvuoXdZc8OMPTlaH22iL'

// Заходимо на головну сторінку та натискаємо нижче кнопку Signup for free, дотримуємося інструкції, ключ буде надіслано на вказану пошту.
// Документація з використання ключа знаходиться тут.
// https://thecatapi.com/
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=FJkYOq9tW
// 'https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY

// Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід.
// Для цього необхідно виконати GET-запит на ресурс https://api.thecatapi.com/v1/breeds, що повертає масив об'єктів.
// У разі успішного запиту, необхідно наповнити select.breed-select опціями так, щоб value опції містило id породи,
// а в інтерфейсі користувачеві відображалася назва породи.

// Напиши функцію fetchBreeds(), яка виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту.
// Винеси її у файл cat-api.js та зроби іменований експорт.

// Інформація про кота
// Коли користувач обирає якусь опцію в селекті, необхідно виконувати запит за повною інформацією про кота на ресурс
// https://api.thecatapi.com/v1/images/search.
// Не забудь вказати в цьому запиті параметр рядка запиту breed_ids з ідентифікатором породи. Ознайомся з документацією ресурсу.

// Напиши функцію fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP-запит і повертає проміс із даними про кота
// - результатом запиту. Винеси її у файл cat-api.js і зроби іменований експорт.

// Якщо запит був успішний, під селектом у блоці div.cat-info з'являється зображення і розгорнута інформація про кота:
// назва породи, опис і темперамент.

// ---------------------------------------------------------------------------

//

// !!!!!------ Опрацювання стану завантаження
// Поки відбувається будь-який HTTP-запит, необхідно показувати завантажувач - елемент p.loader.
// Поки запитів немає або коли запит завершився, завантажувач необхідно приховувати. Використовуй для цього додаткові CSS класи.

// Поки виконується запит за списком порід, необхідно приховати select.breed-select та показати p.loader.
// Поки виконується запит за інформацією про кота, необхідно приховати div.cat-info та показати p.loader.
// Як тільки будь-який запит завершився, p.loader треба приховати.

// Опрацювання помилки
// Якщо у користувача сталася помилка під час будь-якого HTTP-запиту, наприклад, впала мережа,
// була втрата пакетів тощо, тобто проміс було відхилено, необхідно відобразити елемент p.error,
// а при кожному наступному запиті приховувати його. Використовуй для цього додаткові CSS класи.

// Протестувати працездатність відображення помилки дуже просто - зміни адресу запиту додавши в кінець будь-який символ,
// наприклад замість https://api.thecatapi.com/v1/breeds використай https://api.thecatapi.com/v1/breeds123.
// Запит отримання списку порід буде відхилено з помилкою. Аналогічно для запиту інформації про кота за породою.

// Інтерфейс
// Додай мінімальне оформлення елементів інтерфейсу.
// Замість select.breed-select можеш використовувати будь-яку бібліотеку з красивими селектом, наприклад https://slimselectjs.com/
// Замість p.loader можеш використовувати будь-яку бібліотеку з красивими CSS-завантажувачами, наприклад https://cssloaders.github.io/
// Завантажувач p.error можеш використовувати будь-яку бібліотеку з гарними сповіщеннями, наприклад Notiflix

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed, fetchImageCatByBreed } from './cat-api';

const refs = {
  selectCat: document.querySelector('.breed-select'),
  sectionUserChoiceCat: document.querySelector('.cat-info'),
  loader: document.querySelector('span.loader'),
};

// console.log();

const catDescription = {
  breed: '',
  description: '',
  temperament: '',
  url: '',
};

// функція з обробки промісу запиту даних з переліку порід. На основі цих даних викликає функції по створенню розмітки селектору,
// виклику тоглу для додавання / знімання класу, створення нового SlimSelect.
fetchBreeds()
  .then(data => {
    createSelectorCat(data);
    toggleClassListTheLoader();
    createNewSlimSelect();
  })
  .catch(onFetchError);

// функція, що додає / прибирає клас 'loader'
function toggleClassListTheLoader() {
  refs.loader.classList.toggle('loader');
}

// функція що створює новий SlimSelect
function createNewSlimSelect() {
  new SlimSelect({
    select: '#selectElement',
    events: {
      afterChange: newVal => {
        toggleClassListTheLoader();
        resetSectionUserChoiceCat();
        createSectionUserChoiceCat(newVal[0].value);
      },
    },
  });
}

// функція, яка  запитує у сервера картку з catId, обробляє проміс та виконує запит на сервер для отримання зображення вибраного кота
function createSectionUserChoiceCat(catId) {
  const catUrlID = fetchCatByBreed(catId)
    .then(data => {
      updatecatDescriptionObj(data);
      return fetchImageCatByBreed(data.reference_image_id);
    })
    .catch(onFetchError);

  catUrlID
    .then(data => {
      toggleClassListTheLoader();
      createMarkupUserChoiceCat(data.url);
    })
    .catch(onFetchError);
}

// функція з оновлення обєкту з даними які будуть використані при заповненні секції вибраного користувачем кота.
function updatecatDescriptionObj(obj) {
  catDescription.breed = obj.name;
  catDescription.description = obj.description;
  catDescription.temperament = obj.temperament;
}

// функція з очистки секції відображення опису та фотографії вибраного користувачем кота
function resetSectionUserChoiceCat() {
  refs.sectionUserChoiceCat.innerHTML = '';
}

// функція, яка вставляє шаблонну стоку розмітки секції відображення опису та фотографії вибраного користувачем кота
function createMarkupUserChoiceCat(url) {
  refs.sectionUserChoiceCat.innerHTML = `<img src="${url}" alt="cat breed ${catDescription.breed} " width="300">
   <div class="wrapper-description">
     <h2 class="cat-info-title">${catDescription.breed}</h2>
     <p class="cat-info-description">${catDescription.description}</p>
     <p class="cat-info-haracteristic"><span class="cat-info-haracteristic-title">Temperament: </span>${catDescription.temperament}</p>
   </div>`;
}

// функція, яка вставляє строку розмітки селестора в DOM
function createSelectorCat(arr) {
  const markup = createMarkupSelectCat(arr);
  refs.selectCat.innerHTML = markup;
}

// функція, що створює строку розмітки селектора вибору порід котів
function createMarkupSelectCat(arr) {
  let str = `<option value=""></option>`;
  for (const key of arr) {
    str += `<option value="${key.id}">${key.name}</option>`;
  }
  return str;
}

// функція, що відобажає помилки
function onFetchError(error) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    width: '350px',
    position: 'center-top',
    fontSize: '16px',
  });
  console.log(error);
}
