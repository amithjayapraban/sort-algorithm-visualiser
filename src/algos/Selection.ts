export const selectionSort = (array: any) => {
  const arr = [...array];
  const animations = [];
    const minAnimation = [];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
         minAnimation.push([minIdx, j]);
        minIdx = j;
       
      }
    }


    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
     animations.push([i, minIdx]);
  }

  return animations;
};
