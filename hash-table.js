/**
 * @desc Hash the input
 * @param {string|number} input 
 * @param {number} constant 
 * @return {number}
 */
const hash = (input, constant) => {
    if (typeof input !== 'string' && typeof input !== 'number') {
        throw new Error('Input must be a string or a number!');
    }

    if (isNaN(constant) || constant % 1) {
        throw new Error('Constant must be an integer. A prime number is preferred.');
    }

    input += '';

    const l = input.length;
    let num = 0;
    for (let i = l - 1; i > -1; i--) {
        num += input.charCodeAt(i) * 37 ** (l - i - 1); // usually we use 37
    }

    return num % constant;
}

/**
 * @desc Check if the input is a prime number.
 * @param {number} int 
 * @return {boolean}
 */
const isPrime = int => {
    if (!isPositiveInteger(int) || int < 2) {
        throw new Error('Parameter must be a integer greater than 2!');
    }

    const sqrt = Math.sqrt(int);
    for (let i = 2; i <= sqrt; i++) {
        if (!(int % i)) {
            return false;
        }
    }
    return true;
}

/**
 * @desc Find the nearest prime number that is greater than the input.
 * @param {number} int
 * @return {number} 
 */
const getNearestPrime = int => {
    if (!isPositiveInteger(int)) {
        throw new Error('Parameter must be a positive integer!');
    }

    if (isPrime(int)) {
        return int;
    }

    let prime = int % 2 ? int : int + 1;
    while (prime) {
        if (isPrime(prime)) {
            return prime;
        }
        prime += 2;
    }
}

/**
 * @desc Check if an input is a positive integer.
 * @param {*} input 
 * @return {boolean}
 */
const isPositiveInteger = input => {
    return typeof input === 'number' && input > 0 && !(input % 1);
};

class HashTable {

    /**
     * @desc Initializes the hash table. Can pass an integer as the initial limit
     * @param {number} limit
     */
    constructor(limit = 7) {
        if (!isPositiveInteger(limit) && limit !== undefined || limit < 7) {
            throw new Error('Limit must be an integer greater than 7');
        }
        this.data = [];
        this.count = 0;
        this.limit = limit;
    }

    /**
     * @desc Delete an entry
     * @param {string|number} key 
     * @return {array} deleted entry
     */
    delete(key) {
        const hashedKey = hash(key, this.limit);

        const entries = this.data[hashedKey];
        if (!entries.length) {
            return;
        }

        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] === key) {
                const removed = entries.splice(i, 1)[0];
                this.count--;
                if (this.limit > 7 && this.count / this.limit < 0.25) {
                    const prime = getNearestPrime(Math.floor(this.limit / 2 + 1));
                    this.resize(prime);
                }
                return removed;
            }
        }
    }

    /**
     * @desc Get all key-value pairs
     * @return {array}
     */
    entries() {
        return this.data.reduce((a, b) => [...a, ...b], []).sort();
    }

    /**
     * @desc Get the corresponding value of key
     * @param {string|number} key 
     * @return {*}
     */
    get(key) {
        const hashedKey = hash(key, this.limit);

        const entries = this.data[hashedKey];
        if (!entries || !entries.length) {
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
        return this.data.reduce((a, b) => [...a, ...b.map(entry => entry[0])], []).sort();
    }

    /**
     * @desc Expand/shrink the size of the hash table based on load factor
     * @param {number} limit 
     * @return {number}
     */
    resize(limit) {
        if (
            !isPositiveInteger(limit) ||
            limit < this.count ||
            limit < 7 ||
            limit === this.limit ||
            !isPrime(limit)
        ) {
            throw new Error('Limit must be a prime number, larger than 7 as well as the current size of the hash table, and not equal to the current limit!');
        }

        const action = limit > this.limit ? 'expanded' : 'shrunk';

        const entries = this.entries();

        this.data = [];
        this.count = 0;
        this.limit = limit;

        for (let entry of entries) {
            this.set(...entry);
        }

        console.log(`The size of the hash table has been ${action} to ${limit}`);

        return this.limit;
    }

    /**
     * @desc Add/update entry to the hash table.
     * @param {string|number} key 
     * @param {*} value 
     * @return {array}
     */
    set(key, value) {
        const hashedKey = hash(key, this.limit);

        this.data[hashedKey] = this.data[hashedKey] || [];

        const entries = this.data[hashedKey];

        if (entries.length) {
            for (let entry of entries) {
                if (entry[0] === key) {
                    entry[1] = value;
                    return [key, value];
                }
            }
        }

        if (this.count === this.limit) {
            throw new Error('Space expansion required!');
        }

        entries.push([key, value]);
        this.count++;

        if (this.count / this.limit > 0.75) {
            const prime = getNearestPrime(Math.floor(this.limit * 2 + 1));
            this.resize(prime);
        }

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
        return this.data.reduce((a, b) => [...a, ...b.map(entry => entry[1])], []).sort();
    }
}