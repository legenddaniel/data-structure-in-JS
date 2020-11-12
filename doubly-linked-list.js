class ListNode {
    constructor(data, prev = null, next = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * @desc It is used to return the element at the specified position in a list.
     * @param {number} index 
     * @return {object|null}
     */
    get(index) {
        let current;
        if (index < this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        } else {
            current = this.tail;
            for (let i = 0; i < this.length - index - 1; i++) {
                current = current.prev;
            }
        }
        return current;
    }

    /**
     * @desc It is used to return the last element in a list.
     * @return {object|null}
     */
    getLast() {
        return this.tail;
    }

    /**
     * @desc It is used to return the first element in a list.
     * @return {object|null}
     */
    peek() {
        return this.head;
    }
}