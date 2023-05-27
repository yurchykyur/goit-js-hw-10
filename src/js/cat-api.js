export function fetchBreeds() {
    console.log(
      fetch('https://api.thecatapi.com/v1/breeds').then(response =>
        response.json()
      )
    );
    return fetch('https://api.thecatapi.com/v1/breeds').then(response =>
      response.json()
    );
  }
  
  const API_KEY =
    'live_wkn7NG9gg6cEVzYeEh1vrLo4JBR3UguOoVTAaAJh8My7YvuoXdZc8OMPTlaH22iL';
  
  export function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    }).then(response => response.json());
  }
  
  export function fetchImageCatByBreed(imageId) {
    return fetch(`https://api.thecatapi.com/v1/images/${imageId}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    }).then(response => response.json());
  }
  