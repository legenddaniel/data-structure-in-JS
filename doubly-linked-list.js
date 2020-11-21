/**
 * @desc Check if an input is a non-negative integer.
 * @param {*} input 
 * @return {boolean}
 */
const isNonNegativeInteger = input => {
    return typeof input === 'number' && input >= 0 && !(input % 1);
};

/**
 * @desc Check if two arguments are identical. Not working on function elements.
 * @param {*} a 
 * @param {*} b 
 * @return {boolean}
 */
const isIdentical = (a, b) => {
    return typeof a !== 'object' && a === b || typeof a === 'object' && JSON.stringify(a) === JSON.stringify(b);
};

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
        if (!isNonNegativeInteger(index)) {
            throw new Error(`Invalid Index! (min: 0, max: ${this.length - 1})`);
        }

        if (index > this.length - 1) {
            return null;
        }

        if (index === 0) {
            return this.head;
        }

        if (index === this.length - 1) {
            return this.tail;
        }

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

    /** (Function may not work properly)
     * @desc It is used to return the index in a list of the first occurrence of the specified element, or -1 if the list does not contain any element.
     * @param {*} element 
     * @return {number}
     */
    indexOf(element) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (isIdentical(element, current.data)) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    /**
     * @desc It is used to insert the specified element at the specified position index in a list.
     * @param {number} index 
     * @param {*} element 
     * @return {object}
     */
    insert(index, element) {
        if (!isNonNegativeInteger(index) || index > this.length) {
            throw new Error(`Invalid Index! (min: 0, max: ${this.length})`);
        }

        if (index === this.length) {
            return this.push(element);
        }

        const item = new ListNode(element);

        if (!this.length) {
            this.head = item;
            this.tail = item;
        } else {
            const next = this.get(index);
            item.next = next;
            if (index === 0) {
                next.prev = item;
                this.head = item;
            } else {
                const prev = this.get(index - 1);
                item.prev = prev;
                prev.next = item;
                next.prev = item;
            }
        }

        this.length++;

        return item;
    }

    /**
     * @desc Check if the list is empty.
     * @return {boolean}
     */
    isEmpty() {
        return !this.length;
    }

    /**
     * @desc It removes and returns the last element from a list.
     * @return {object}
     */   
    pop() {
        if (!this.length) {
            return;
        }
        
        const current = this.get(this.length - 1);
        const last = this.get(this.length - 2);
        this.tail = last;
        last.next = null;
        return current;
    }

    /**
     * @desc It is used to return the first element in a list.
     * @return {object|null}
     */
    peek() {
        return this.head;
    }

    /**
     * @desc It is used to append the specified elements to the end of a list.
     * @param {...*} elements 
     * @return {*}
     */
    push(...elements) {
        const l = elements.length;
        if (!l) {
            throw new Error('Argument required!');
        }

        const first = new ListNode(elements[0]);

        let current = first;
        for (let i = 1; i < l; i++) {
            const item = new ListNode(elements[i]);
            current.next = item;
            item.prev = current;
            current = current.next;
        }
        this.tail = current;

        if (this.length) {
            const last = this.getLast();
            last.next = first;
            first.prev = last;
        } else {
            this.head = first;
        }

        this.length += l;

        return l > 1 ? elements : elements[0];
    }

    /**
     * @desc It removes the firstly found specified element.
     * @param {*} element
     * @return {object|null}
     */
    remove(element) {
        if (!this.length) {
            return;
        }

        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    /**
     * @desc It is used to remove the element at the specified position in a list.
     * @param {number} index 
     * @return {object|null}
     */    
    removeAt(index) {
        if (!this.length || index > this.length - 1) {
            return;
        }

        if (index === this.length - 1) {
            return this.pop();
        }

        const current = this.get(index);
        const next = this.get(index + 1);
        if (index === 0) {
            this.head = next;
            next.prev = null;
        } else {
            const prev = this.get(index - 1);
            prev.next = next;
            next.prev = prev;
        }

        this.length--;

        return current;
    }

    /**
     * @desc It is used to return the number of elements in a list.
     * @return {number}
     */
    size() {
        return this.length;
    }

    /**
     * @desc Backward print the list.
     * @return {string}
     */
    toBackwardString() {
        let string = '';
        let current = this.tail;
        while (current) {
            string += current.data + ' ';
            current = current.prev;
        }
        return string.trim();
    }

    /**
     * @desc Forward print the list.
     * @return {string}
     */
    toForwardString() {
        let string = '';
        let current = this.head;
        while (current) {
            string += current.data + ' ';
            current = current.next;
        }
        return string.trim();
    }

    /**
     * @desc It replaces the element at the specified position in a list with the specified element.
     * @param {number} index 
     * @param {*} element 
     * @return {object|null}
     */
    update(index, element) {
        const current = this.get(index);
        if (current) {
            current.data = element;
        } else {
            this.insert(index, element);
        }
        return current;
    }
}