export const  bubbleSort = (array:any) => {
  const arrayCopy = [...array];
  const animations = [];
  const n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        // Swap the elements
        const temp = arrayCopy[j];
        arrayCopy[j] = arrayCopy[j + 1];
        arrayCopy[j + 1] = temp;

        // Store the indices of elements to be animated
        animations.push([j, j + 1]);
      }
    }
  }

  return animations;
};

