class MaxHeap {
    /**
     * In max heap, nodes are all comparable elements and stored in array.
     * Any parent is greater than or equal left and right child node.
     * Left child is not necessarily less than right child.
     * Shapes like a complete tree.
     * Left child is at [2i + 1] and right child is at [2i + 2].
     * @param {number|string} root 
     */
    constructor(root) {
        this.heap = root === undefined ? [] : [root];
    }

    /**
     * Get the top element
     * @param {number} k 
     * @return {[number]}
     */
    peak() {
        return this.heap[0];
    }

    /**
     * Push new element and sift it up if heap[size-1] is wrong position
     * @param {number|string} val Any comparable types
     */
    add(val) {
        this.heap.push(val);
        this.siftUp();
    }

    /**
     * Remove the root element and sift the new root down if is wrong position
     */
    removeRoot() {
        this.heap[0] = this.heap.pop();
        this.siftDown();
    }

    /**
     * Most important part. Bubble the new element up to the right position after inserting a new element.
     */
    siftUp() {
        // Index of new element and its current parent element
        let i = this.heap.length - 1, p = Math.floor((i - 1) / 2);

        // Repeatedly bubble the new element until right position
        while (this.heap[i] < this.heap[p]) {
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
            i = p;
            p = Math.floor((i - 1) / 2);
        }
    }

    /**
     * Most important part. Sink the old tail element down to the right position after removing the root element.
     */
    siftDown() {
        let i = 0, left = 2 * i + 1, right = 2 * i + 2;

        // Swap with the larger child node until becomes leaf (left and right are undefined)
        while (this.heap[i] <= this.heap[left] || this.heap[i] <= this.heap[right]) {
            if (this.heap[left] > this.heap[right]) {
                [this.heap[i], this.heap[left]] = [this.heap[left], this.heap[i]];
                i = left;
            } else {
                [this.heap[i], this.heap[right]] = [this.heap[right], this.heap[i]];
                i = right;
            }

            left = 2 * i + 1;
            right = 2 * i + 2;
        }
    }
}