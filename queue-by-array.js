/*
The queue interface is provided in java.util package and it implements the Collection interface. The queue implements FIFO i.e. First In First Out. This means that the elements entered first are the ones that are deleted first.
*/

class QueueByArray {

    /**
     * @desc Initialize the queue with an array. If no argument passed will be initialized as an empty queue.
     */
    constructor() {
        this.items = [];
    }

    /**
     * @desc Retrieves, but does not remove, the end of this queue.
     * @return {*}
     */
    back() {
        const queue = this.items;
        return queue[queue.length - 1];
    }

    /**
     * @desc Empty the queue and return the length of the queue before clearing.
     * @return {number}
     */
    clear() {
        const l = this.items.length;
        this.items.length = 0;
        return l;
    }

    /**
     * @desc Retrieves and removes the head of this queue.
     * @return {*}
     */
    dequeue() {
        return this.items.shift();
    }

    /**
     * @desc Tests if this queue is empty. Returns true if the queue is empty, and returns false if the queue contains elements.
     * @return {boolean}
     */
    empty() {
        return !this.items.length;
    }

    /**
     * @desc Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning the new added element.
     * @param {*} element 
     * @return {*}
     */
    enqueue(element) {
        this.items.push(element);
        return element;
    }

    /**
     * @desc Retrieves, but does not remove, the head of this queue.
     * @return {*}
     */
    front() {
        return this.items[0];
    }

    /**
     * @desc Retrive the number of elements in the stack.
     * @return {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * @desc Print the queue.
     * @return {string}
     */
    toString() {
        return this.items + '';
    }
}