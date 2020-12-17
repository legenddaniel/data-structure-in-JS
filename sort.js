/**
 * @desc Bubble sort
 * @param {array} array 
 * @return {array}
 */
const bubbleSort = array => {
    if (!(array instanceof Array)) {
        throw new Error('Must pass an array!');
    }

    const l = array.length;
    if (l < 2) {
        return array;
    }

    // Compare and swap one by one. After each loop the looping end will be moved back.
    let count = l - 1;
    while (count) {
        for (let i = 0; i < count; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
            }
        }
        count--;
    }

    return array;
}

/**
 * @desc Selection sort
 * @param {array} array 
 * @return {array}
 */
const selectionSort = array => {
    if (!(array instanceof Array)) {
        throw new Error('Must pass an array!');
    }

    const l = array.length;
    if (l < 2) {
        return array;
    }

    // Find the smallest during each loop and move to the left end. The left end will be moved forward after each loop.
    for (let i = 0; i < l - 1; i++) {
        let min = i;
        for (let j = i + 1; j < l; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        [array[i], array[min]] = [array[min], array[i]];
    }

    return array;
}

/**
 * @desc Insertion sort
 * @param {array} array
 * @return {array}
 */
const insertionSort = array => {
    if (!(array instanceof Array)) {
        throw new Error('Must pass an array!');
    }

    const l = array.length;
    if (l < 2) {
        return array;
    }

    // Sort elements at the left of the pointer during each loop, including the pointer.
    for (let i = 1; i < l; i++) {
        let j = i;
        while (j && array[j] < array[j - 1]) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            j--;
        }
    }

    return array;
}

/**
 * @desc Shell sort
 * @param {array} array
 * @return {array} 
 */
const shellSort = array => {
    if (!(array instanceof Array)) {
        throw new Error('Must pass an array!');
    }

    const l = array.length;
    if (l < 2) {
        return array;
    }

    // Sort with decreasing gap (increasing density).
    let gap = Math.floor(l / 2);
    while (gap) {
        for (let i = 0; i < l - gap; i++) {
            if (array[i] > array[i + gap]) {
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
            }
        }
        gap = Math.floor(gap / 2);
    }

    return array;
}

/**
 * @desc Quick sort
 * @param {array} array 
 * @return {array}
 */
const quickSort = array => {
    if (!(array instanceof Array)) {
        throw new Error('Must pass an array!');
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
        [array[left + gap], array[right - 1]] = [array[right - 1], array[left + gap]];

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
    }

    handler(0, array.length - 1);

    return array;
}