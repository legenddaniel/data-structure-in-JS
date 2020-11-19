/**
 * @desc Hash the input
 * @param {string|number} input 
 * @param {number} constant 
 * @return {number}
 */
const hash = (input, constant) => {
    if (typeof input !== 'string' && typeof input !== 'number') {
        throw 'Input must be a string or a number!';
    }

    if (isNaN(constant) || constant % 1) {
        throw 'Constant must be an integer. A prime number is preferred.'
    }

    input += '';

    const l = input.length;
    let num = 0;
    for (let i = l - 1; i > -1; i--) {
        num += input.charCodeAt(i) * 37 ** (l - i - 1); // usually we use 37
    }

    return num % constant;
}

class HashTable {
    constructor() {
        this.data = [];
        this.count = 0;
        this.limit = 7;
    }

    /**
     * @desc Delete an entry
     * @param {string|number} key 
     * @return {*} deleted entry
     */
    delete(key) {
        const hashedKey = hash(key, this.limit);

        const entries = this.data[hashedKey];
        if (!entries.length) {
            return;
        }

        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] === key) {
                return this.count--, entries.splice(i, 1)[0];
            }
        }
    }

    /**
     * @desc Get the corresponding value of key
     * @param {string|number} key 
     * @return {*}
     */
    get(key) {
        const hashedKey = hash(key, this.limit);

        const entries = this.data[hashedKey];
        if (!entries.length) {
            return;
        }

        for (let entry of entries) {
            if (entry[0] === key) {
                return entry[1];
            }
        }
    }

    /**
     * @desc Check if hash table is empty
     * @return {boolean}
     */
    isEmpty() {
        return !this.count;
    }

    /**
     * @desc Get all keys
     * @return {array}
     */
    keys() {
        return this.data.reduce((a, b) => [...a, ...b.map(entry => entry[0])], []);
    }

    /**
     * @desc Add/update entry to the hash table.
     * @param {string|number} key 
     * @param {*} value 
     * @return {array}
     */
    set(key, value) {
        const hashedKey = hash(key, this.limit);

        const entries = this.data[hashedKey] ?? [];
        if (entries.length) {
            for (let entry of entries) {
                if (entry[0] === key) {
                    entry[1] = value;
                    return [key, value];
                }
            }
        }

        if (this.count === this.limit) {
            throw 'Space expansion required!';
        }

        entries.push([key, value]);
        this.count++;

        return [key, value];
    }

    /**
     * @desc Get the number of entries.
     * @return {number}
     */
    size() {
        return this.count;
    }

    /**
     * @desc Get all values
     * @return {array}
     */
    values() {
        return this.data.reduce((a, b) => [...a, ...b.map(entry => entry[1])], []);
    }
}