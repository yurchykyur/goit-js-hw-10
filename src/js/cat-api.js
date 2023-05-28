export function fetchBreeds() {
  // console.log(
  //   fetch('https://api.thecatapi.com/v1/breeds').then(response =>
  //     response.json()
  //   )
  // );
  return fetch('https://api.thecatapi.com/v1/breeds', options).then(response =>
    response.json()
  );
}

const options = {
  headers: {
    'x-api-key':
      'live_wkn7NG9gg6cEVzYeEh1vrLo4JBR3UguOoVTAaAJh8My7YvuoXdZc8OMPTlaH22iL',
  },
};

export function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, options).then(
    response => response.json()
  );
}

export function fetchImageCatByBreed(imageId) {
  return fetch(`https://api.thecatapi.com/v1/images/${imageId}`, options).then(
    response => response.json()
  );
}
