/**
 * @desc Check if an input is a non-negative integer.
 * @param {*} input 
 * @return {boolean}
 */
const isNonNegativeInteger = input => {
    return typeof input === 'number' && input >= 0 && !(input % 1);
}

class ListNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class SinglyLinkedList {

    /**
     * @desc Initialize the singly linked list with the first data (head).
     * @param {*} data
     */
    constructor(head = null) {
        this.head = head;
        this.length = 0;
    }

    /**
     * @desc It is used to return the element at the specified position in a list.
     * @param {number} index 
     * @return {object|null}
     */
    get(index) {
        if (!isNonNegativeInteger(index)) {
            throw `Invalid Index! (min: 0, max: ${this.length - 1})`;
        }

        if (index > this.length - 1) {
            return null;
        }

        if (index === 0) {
            return this.head;
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current;
    }

    /**
     * @desc It is used to return the last element in a list.
     * @return {object|null}
     */
    getLast() {
        if (this.length < 2) {
            return this.head;
        }
        return this.get(this.length - 1);
    }

    /**
     * @desc It is used to insert the specified element at the specified position index in a list.
     * @param {*} element 
     * @param {number} index 
     * @return {object}
     */
    insert(element, index) {
        if (!isNonNegativeInteger(index) || index > this.length) {
            throw `Invalid Index! (min: 0, max: ${this.length})`;
        }

        if (index === this.length) {
            return this.push(element);
        }

        const item = new NodeList(element);

        if (!this.length) {
            this.head = item;
        } else {
            const next = this.get(index);
            item.next = next;
            if (index === 0) {
                this.head = item;
            } else {
                const previous = this.get(index - 1);
                previous.next = item;
            }
        }

        this.length++;

        return item;
    }

    /**
     * @desc It is used to return the first element in a list.
     * @return {*}
     */
    peek() {
        return this.head;
    }

    /**
     * @desc It is used to append the specified elements to the end of a list.
     * @param {...*} elements 
     * @return {object|array}
     */
    push(...elements) {
        const l = elements.length;
        if (!l) {
            throw 'Argument required!';
        }

        const items = [];
        for (let i = 0; i < l; i++) {
            const item = new ListNode(element);
            const last = this.getLast();

            last.next = item;
            this.length++;

            items.push(item);
        }

        return l > 1 ? items : items[0];
    }

    /**
     * @desc Print the list.
     * @return {string}
     */
    toString() {
        let string = '';
        let current = this.head;
        while (current) {
            string += current.data + ' ';
            current = current.next;
        }
        return string.trim();
    }
}