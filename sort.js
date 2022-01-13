/**
 * @desc Bubble sort
 * @param {array} array
 * @return {array}
 */
const bubbleSort = (array) => {
  // time: n^2
  // space: 1

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  // Determine the last (largest) number first, then move back one by one
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // Swap this and next if this > next so that the largest is moved the the end after each outer loop
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
};

/**
 * @desc Selection sort
 * @param {array} array
 * @return {array}
 */
const selectionSort = (array) => {
  // time: n^2
  // space: 1

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  // Determine the first (smallest) number first, then move forward one by one
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i; j < array.length; j++) {
      // Swap this and another if this > another so that the smallest is moved to the beginning after each outer loop
      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  return array;
};

/**
 * @desc Insertion sort
 * @param {array} array
 * @return {array}
 */
const insertionSort = (array) => {
  // time: n^2
  // space: 1
  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  // Determine the first (smallest) number first, then move forward one by one
  for (let i = 1; i < array.length; i++) {
    for (let j = i; j > 0; j--) {
      // Swap this and previous if this < previous so that the smallest is moved to the beginning after each outer loop
      if (array[j] < array[j - 1]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
      } else {
        break;
      }
    }
  }

  return array;
};

/**
 * @desc Shell sort
 * @param {array} array
 * @return {array}
 */
const shellSort = (array) => {
  // time: n^2 (Math.floor(gap / 2) as gap)
  // space: 1

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  // Example array: [ 13, 14, 94, 33, 82, 25, 59, 94, 65, 23, 45, 27, 73, 25, 39, 10 ]

  let gap = Math.floor(array.length / 2);

  /*
        Separate the array into a matrix with `Math.ceil(array.length / gap)` rows and `gap` columns:
        13 14 94 33 82
        25 59 94 65 23
        45 27 73 25 39
        10
    
        ↓
    
        10 14 73
        25 23 13
        27 94 33
        39 25 59
        94 65 82
        45
    
        ↓
    
        ...
    */
  while (gap) {
    // Loop through each column
    for (let i = 0; i < gap; i++) {
      // Loop through each row
      for (let j = 0; j < Math.ceil(array.length / gap); j++) {
        // Do insertion sort on this row
        for (let k = j; k > 0; k--) {
          if (array[k * gap + i] < array[(k - 1) * gap + i]) {
            [
              array[k * gap + i],
              array[(k - 1) * gap + i]
            ] = [
                array[(k - 1) * gap + i],
                array[k * gap + i],
              ];
          }
        }
      }
    }
    gap = Math.floor(gap / 2);
  }

  return array;
};

/**
 * @desc Quick sort
 * @param {array} array
 * @return {array}
 */
const quickSort = (array) => {
  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  const handler = (left, right) => {
    const l = right - left + 1;

    if (l < 2) {
      return array;
    }

    if (l === 2) {
      if (array[left] > array[right]) {
        [array[left], array[right]] = [array[right], array[left]];
      }
      return array;
    }

    // Get and set the pivots to the indices of left, right, right + 1. Use the mid one array[right] for the next steps.
    const gap = Math.floor(l / 2);
    if (array[left] > array[left + gap]) {
      [array[left], array[left + gap]] = [array[left + gap], array[left]];
    }
    if (array[left + gap] > array[right]) {
      [array[left + gap], array[right]] = [array[right], array[left + gap]];
    }
    if (array[left] > array[left + gap]) {
      [array[left], array[left + gap]] = [array[left + gap], array[left]];
    }
    [array[left + gap], array[right - 1]] = [
      array[right - 1],
      array[left + gap],
    ];

    if (l === 3) {
      return array;
    }

    let i = left;
    let j = right - 1;

    const pivotIndex = right - 1;
    const pivot = array[pivotIndex];

    // Swap array[i] with array[j] when array[i] > pivot and array[j] < pivot.
    while (i !== j) {
      if (array[i] <= pivot) {
        i++;
        continue;
      }
      if (array[j] >= pivot) {
        j--;
        continue;
      }
      [array[i], array[j]] = [array[j], array[i]];
    }

    // Swap array[i]/array[j] with pivot when i === j.
    [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];

    // Divide and process the left & right part.
    handler(left, i - 1);
    handler(i + 1, right);
  };

  handler(0, array.length - 1);

  return array;
};
