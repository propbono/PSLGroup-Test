// Implementing Fisher-Yates shuffle algorithm
// Based on Mike Bostock implementation
export const shuffle = (array) => {
  var copy = [],
    n = array.length,
    i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
};
