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
  // space: n
  // stable: yes, the position of slices will not change

  if (!(array instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  const handler = (start, end) => {
    if (start === end) return [array[start]];

    const result = [];

    const pivot = Math.floor((start + end) / 2);
    const sortedLeft = handler(start, pivot),
      sortedRight = handler(pivot + 1, end);

    const ll = sortedLeft.length,
      lr = sortedRight.length;

    let i = 0, j = 0;
    while (i < ll || j < lr) {
      if (sortedLeft[i] < sortedRight[j] || j === lr) {
        result.push(sortedLeft[i++]);
      } else if (sortedLeft[i] >= sortedRight[j] || i === ll) {
        result.push(sortedRight[j++]);
      }
    }

    return result;
  }

  return handler(0, array.length - 1);
}

/**
 * @desc Quick sort
 * @param {array} arr
 * @return {array}
 */
const quickSort = (arr) => {
  // time: nlogn
  // space: logn
  // stable: no, during partition those 3 elements can be randomly positioned.

  if (!(arr instanceof Array)) {
    throw new Error("Must pass an array!");
  }

  const partition = (arr, low, high) => {
    // Your code here
    let pivot = high

    // Move pivot to position
    // After that, left contains elements < pivot, right contains elements >= pivot
    let i = low, j = high;
    while (i < j) {
      if (arr[i] < arr[pivot]) {
        i++;
        continue;
      }
      if (arr[j] >= arr[pivot]) {
        j--;
        continue;
      }
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }

    [arr[i], arr[pivot]] = [arr[pivot], arr[i]]

    return i
  }

  if (low >= high) return arr;

  //code here
  let pivot = partition(arr, low, high);
  quickSort(arr, low, pivot - 1);
  quickSort(arr, pivot + 1, high);

  return arr;
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
