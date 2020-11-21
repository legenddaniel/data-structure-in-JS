/**
 * @desc Check if the element is a CustomSet instance.
 * @param {*} element
 * @return {boolean}
 */
const isSet = element => element instanceof CustomSet;

// Elements will be transformed to string
class CustomSet {

    /**
     * @desc Initializes the set with an object.
     */
    constructor() {
        this.items = {};
    }

    /**
     * @desc It is used to add new entries to the Set.
     * @param {...*} elements 
     * @return {*}
     */
    add(...elements) {
        elements.forEach(element => {
            this.items[element] = 1;
        })
        return arguments.length ? arguments : arguments[0];
    }

    /**
     * @desc It is used to remove all entries from the Set.
     * @return {boolean}
     */
    clear() {
        this.items = {};
        return true;
    }

    /**
     * @desc this \ set.
     * @param {object} set
     * @return {object}
     */
    complement(set) {
        if (!isSet(set)) {
            throw new Error('Parameter must be a Set');
        }

        const that = new CustomSet();
        for (let element of this.values()) {
            if (!set.has(element)) {
                that.add(element);
            }
        }

        return that;
    }

    /**
     * @desc It is used to check if element is in the Set.
     * @param {*} element 
     * @return {boolean}
     */
    has(element) {
        return this.items.hasOwnProperty(element);
    }

    /**
     * @desc this ∩ set.
     * @param {object} set
     * @return {object}
     */
    intersection(set) {
        if (!isSet(set)) {
            throw new Error('Parameter must be a Set');
        }

        const that = new CustomSet();
        for (let element of this.values()) {
            if (set.has(element)) {
                that.add(element);
            }
        }

        return that;
    }

    /**
     * @desc It is used to remove an element from the Set.
     * @param {*} element 
     * @return {*}
     */
    remove(element) {
        if (!this.has(element)) {
            return false;
        }
        delete this.items[element];
        return element;
    }

    /**
     * @desc It is used to retrieve the number of elements in the Set.
     * @return {number}
     */
    size() {
        return this.values().length;
    }

    /**
     * @desc this ⊆ set
     * @param {object} set
     * @return {boolean}
     */
    subset(set) {
        if (!isSet(set)) {
            throw new Error('Parameter must be a Set');
        }

        for (let element of this.values()) {
            if (!set.has(element)) {
                return false;
            }
        }

        return true;
    }

    /**
     * @desc this ∪ set.
     * @param {object} set
     * @return {object}
     */
    union(set) {
        if (!isSet(set)) {
            throw new Error('Parameter must be a Set');
        }

        const that = new CustomSet();
        that.items = { ...this.items, ...set.items };
        return that;
    }

    /**
     * @desc It is used to retrieve all the entries from the Set.
     * @return {array}
     */
    values() {
        return Object.keys(this.items);
    }
}