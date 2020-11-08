/*
Priority Queue is an extension of Queue having some properties as follows:

Each element of the priority queue has an property associated with it.
Elements are added to the queue as per the priority.
Lowest priority elements are removed first.
*/

class PriorityQueueByArray {

    /**
     * @desc Initialize the queue with an array. If no argument passed will be initialized as an empty queue.
     */
    constructor() {
        this.items = [];
    }

    /**
     * @desc Retrieves, but does not remove, the end of this queue.
     * @return {object}
     */
    back() {
        const queue = this.items;
        return queue[queue.length - 1].element;
    }

    /**
     * @desc Retrieves and removes the head of this queue.
     * @return {object}
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
     * @desc Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning the new added element with priority.
     * @param {*} element 
     * @param {number} priority
     * @return {object}
     */
    enqueue(element, priority = 1) {
        const items = this.items;
        const obj = { element, priority };
        if (!items.length) {
            items.push(obj);
        } else {
            const index = items.findIndex(item => item.priority < priority);
            items.splice(index, 0, obj);
        }
        return obj;
    }

    /**
     * @desc Retrieves, but does not remove, the head of this queue.
     * @return {object}
     */
    front() {
        return this.items[0].element;
    }

    /**
     * @desc Print the queue.
     * @return {string}
     */
    toString() {
        const items = this.items;
        const l = items.length;
        return items.reduce((a, b, index) => index === l - 1 ? a + b.element : a + b.element + ', ', '');
    }
}