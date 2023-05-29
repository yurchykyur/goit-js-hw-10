const options = {
  headers: {
    'x-api-key':
      'live_wkn7NG9gg6cEVzYeEh1vrLo4JBR3UguOoVTAaAJh8My7YvuoXdZc8OMPTlaH22iL',
  },
};

/**
 * the function requests a list of cat breeds from an external server
 */
// export function fetchBreeds() {
//   return fetch('https://api.thecatapi.com/v1/breeds', options).then(resp =>
//     resp.json()
//   );
// }
export async function fetchBreeds() {
  const resp = await fetch('https://api.thecatapi.com/v1/breeds', options);
  return await resp.json();
}

/**
 * the function requests the cat breed object from the external server by its id
 * @param {String} breedId id of cats breed
 * @returns the object of the breed of the cat upon request to the external server by the Id of the breed
 */
// export function fetchCatByBreed(breedId) {
//   return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, options).then(
//     resp => resp.json()
//   );
// }

export async function fetchCatByBreed(breedId) {
  const resp = await fetch(
    `https://api.thecatapi.com/v1/breeds/${breedId}`,
    options
  );
  return await resp.json();
}

/**
 * a function for requesting an external server to receive a photo of a cat breed based on photo id
 * @param {String} imageId ID photo of a cat
 * @returns  the query promise
 */
// export function fetchImageCatByBreed(imageId) {
//   return fetch(`https://api.thecatapi.com/v1/images/${imageId}`, options).then(
//     resp => {
//       if (!resp.ok) {
//         throw new Error(response.statusText);
//       }
//       return resp.json();
//     }
//   );
// }

export async function fetchImageCatByBreed(imageId) {
  const resp = await fetch(
    `https://api.thecatapi.com/v1/images/${imageId}`,
    options
  );
  if (!resp.ok) {
    throw new Error(response.statusText);
  }
  return await resp.json();
}
