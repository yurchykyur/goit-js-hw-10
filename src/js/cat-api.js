export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', options).then(resp =>
    resp.json()
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
    resp => resp.json()
  );
}

export function fetchImageCatByBreed(imageId) {
  return fetch(`https://api.thecatapi.com/v1/images/${imageId}`, options).then(
    resp => {
      if (!resp.ok) {
        throw new Error(response.statusText);
      }
      return resp.json();
    }
  );
}
