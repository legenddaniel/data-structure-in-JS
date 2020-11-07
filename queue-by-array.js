/*
The queue interface is provided in java.util package and it implements the Collection interface. The queue implements FIFO i.e. First In First Out. This means that the elements entered first are the ones that are deleted first.
*/

class QueueByArray {

    /**
     * @desc Initialize the queue with an array. If no argument passed will be initialized as an empty queue.
     * @param {array|undefined} array 
     */
    constructor(array) {
        if (!Array.isArray(array) && arguments.length) throw 'Parameter must be empty or an array!'
        this.queue = array || [];
    }

    /**
     * @desc Retrieves, but does not remove, the end of this queue.
     * @return {*}
     */
    back() {
        const queue = this.queue;
        return queue[queue.length - 1];
    }

    /**
     * @desc Empty the queue and return the length of the queue before clearing.
     * @return {number}
     */
    clear() {
        const l = this.queue.length;
        this.queue.length = 0;
        return l;
    }

    /**
     * @desc Retrieves and removes the head of this queue.
     * @return {*}
     */
    dequeue() {
        return this.queue.shift();
    }

    /**
     * @desc Tests if this queue is empty. Returns true if the queue is empty, and returns false if the queue contains elements.
     * @return {boolean}
     */
    empty() {
        return !this.queue.length;
    }

    /**
     * @desc Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success.
     * @param {*} element 
     * @return {boolean}
     */
    enqueue(element) {
        this.queue.push(element);
        return true;
    }

    /**
     * @desc Retrieves, but does not remove, the head of this queue.
     * @return {*}
     */
    front() {
        return this.queue[0];
    }

    /**
     * @desc Print the queue.
     * @return {string}
     */
    toString() {
        return this.queue + '';
    }
}