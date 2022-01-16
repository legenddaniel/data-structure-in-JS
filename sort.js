/**
 * @desc Bubble sort
 * @param {array} array
 * @return {array}
 */
const bubbleSort = (array) => {
  // time: n^2
  // space: 1
  // stable: yes, always swap with adjacent so the ralative position remains

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
  // stable: no, most cases stable, but maybe like [5,5,5,4], the first 5 will be moved to the last

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  // Determine the first (smallest) number first, then move forward one by one
  for (let i = 0; i < array.length - 1; i++) {
    // Find the smallest from the right side
    let min = i;
    for (let j = i; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    // Swap current with the smallest
    [array[i], array[min]] = [array[min], array[j]];
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
  // stable: yes, same as bubble sort, always swap with adjacent

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
  // stable: no, top of column does not mean top of array

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
 * @desc Merge sort
 * @param {array} array
 * @return {array}
 */
const mergeSort = (array) => {
  // time: nlogn
  // space: nlogn, can be improved by using pointer instead of create array slices
  // stable: yes, the position of slices will not change

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  const l = array.length;
  if (l <= 1) return array;

  const pivot = Math.floor(l / 2);

  // Trigger the function to sort each part of current slice. In fact only array separation was done here.
  const sortedLeft = mergeSort(array.slice(0, pivot)),
    sortedRight = mergeSort(array.slice(pivot));

  const ll = sortedLeft.length,
    lr = sortedRight.length;

  // Actual code for sorting a slice. After separate into slices sort them back recursively in increasing scale
  let i = 0, j = 0;
  for (let k = 0; k < l; k++) {
    if (sortedLeft[i] < sortedRight[j] || j === lr) {
      array[k] = sortedLeft[i++];
    } else if (sortedLeft[i] >= sortedRight[j] || i === ll) {
      array[k] = sortedRight[j++];
    }
  }

  return array;
}

/**
 * @desc Quick sort
 * @param {array} array
 * @return {array}
 */
const quickSort = (array) => {
  // time: nlogn
  // space: logn
  // stable: no, during Median-of-three those 3 elements can be randomly positioned.

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  const handler = (start, end) => {
    if (start === end) return;

    // Median-of-three to get pivot.
    // Sort first, last and pivot.
    const pivot = Math.floor((start + end) / 2);
    if (array[start] > array[pivot]) {
      [array[start], array[pivot]] = [array[pivot], array[start]];
    }
    if (array[start] > array[end]) {
      [array[start], array[end]] = [array[end], array[start]];
    }
    if (array[pivot] > array[end]) {
      [array[pivot], array[end]] = [array[end], array[pivot]];
    }

    if (end - start < 3) return;

    // Swap new pivot element and second last element if new pivot is greater than second last one.
    if (array[pivot] > array[end - 1]) {
      [array[pivot], array[end - 1]] = [array[end - 1], array[pivot]];
    }

    // Move the pivot to the correct position
    let i = start + 1, j = end - 2;
    while (i !== j) {
      if (array[i] <= array[end - 1]) {
        i++;
        continue;
      }
      if (array[j] >= array[end - 1]) {
        j--;
        continue;
      }
      [array[i], array[j]] = [array[j], array[i]];
    }
    if (array[i] > array[end - 1]) {
      // If pivot is being moved to the correct position (the pivot is the ith element of current slice)
      [array[i], array[end - 1]] = [array[end - 1], array[i]];
      handler(start, i - 1);
      handler(i + 1, end);
    } else {
      // If pivot is already at the correct position (the pivot is the second last element of current slice)
      handler(start, i);
    }
  }

  handler(0, array.length - 1);

  return array;
};

/**
 * @desc Heap sort
 * @param {array} array
 * @return {array}
 */
const heapSort = (array) => {
  // time: nlogn
  // space: 1
  // stable: no, can be randomly swapped by parents / children / root / leaves

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  // Repeat the following steps so the xth largest is moved to xth last position.
  for (let i = array.length; i > 1; i--) {
    // For ascending sort, build a max heap (parents >= children).
    // Start from the last non-leaf node (Math.floor(n / 2 - 1)). Swap parent with child (2i + 1, 2i + 2) to make the parent >= direct children.
    // The largest is moved to the root.
    for (let j = Math.floor(i / 2 - 1); j >= 0; j--) {
      const child1 = 2 * j + 1, child2 = 2 * j + 2;
      if (child1 < i && array[j] < array[child1]) {
        [array[j], array[child1]] = [array[child1], array[j]];
      }
      if (child2 < i && array[j] < array[child2]) {
        [array[j], array[child2]] = [array[child2], array[j]];
      }
    }

    // Swap the root (largest) to the end
    [array[0], array[i - 1]] = [array[i - 1], array[0]];
  }

  return array;
}
