/**
 * @desc Check if the key is a valid number or string
 * @param {*} key 
 * @return {boolean}
 */
const isValidKey = key => typeof key === 'number' && key > 0 || typeof key === 'string' && !!key;

class TreeNode {
    constructor(key, value, left = null, right = null) {
        if (!isValidKey()) {
            throw new Error('Key must be a number or string!');
        }
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.count = 0;
    }

    /**
     * @desc Get the the tree node by key
     * @param {number|string} key 
     * @return {object|null}
     */
    get(key) {
        if (!isValidKey()) {
            throw new Error('Key must be a number or string!');
        }
        let current = this.root;
        while (current) {
            if (current.key === key) {
                return current;
            }
            if (key < current.key) {
                current = current.left;
                continue;
            }
            if (key > current.key) {
                current = current.right;
                continue;
            }
        }
        return null;
    }

    /**
     * @desc Insert an entry into the BST
     * @param {number|string} key 
     * @param {*} value 
     * @return {object}
     */
    insert(key, value) {
        if (!isValidKey()) {
            throw new Error('Key must be a number or string!');
        }

        const node = new TreeNode(key, value);

        if (!this.root) {
            this.root = node;
        }

        let current = this.root;
        while (current) {
            if (current.key === key) {
                throw new Error('Duplicate key not allowed!');
            }
            if (key < current.key) {
                if (current.left) {
                    current = current.left;
                    continue;
                } else {
                    current.left = node;
                    this.count++;
                    return node;
                }
            }
            if (key > current.key) {
                if (current.right) {
                    current = current.right;
                    continue;
                } else {
                    current.right = node;
                    this.count++;
                    return node;
                }
            }
        }
    }

    /**
     * @desc Get the node with greatest key
     * @return {object|null}
     */
    max() {
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        return current;
    }

    /**
     * @desc Get the node with smallest key
     * @return {object|null}
     */
    min() {
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    preOrder() {

    }

}