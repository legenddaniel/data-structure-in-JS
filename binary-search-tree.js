/**
 * @desc Check if the key is a valid number or string
 * @param {*} key 
 * @return {boolean}
 */
const isValidKey = key => typeof key === 'number' && key > 0 || typeof key === 'string' && !!key;

class TreeNode {
    constructor(key, value, left = null, right = null) {
        if (!isValidKey(key)) {
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
        if (!isValidKey(key)) {
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
     * @desc Get the the parent node by key
     * @param {number|string} key 
     * @return {object|null}
     */
    getParent(key) {
        if (!isValidKey(key)) {
            throw new Error('Key must be a number or string!');
        }
        let current = this.root;
        let parent = null;
        while (current) {
            if (current.key === key) {
                return parent;
            }
            if (key < current.key) {
                parent = current;
                current = current.left;
                continue;
            }
            if (key > current.key) {
                parent = current;
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
        if (!isValidKey(key)) {
            throw new Error('Key must be a number or string!');
        }

        const node = new TreeNode(key, value);

        if (!this.root) {
            this.root = node;
            return node;
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

    /**
     * @desc Remove a node from BST
     * @param {number|string} key 
     * @return {object|null}
     */
    remove(key) {
        if (!isValidKey(key)) {
            throw new Error('Key must be a number or string!');
        }

        let current = this.root;
        let parent = null;
        let side = '';
        while (current) {
            if (current.key === key) {
                const removed = current;
                const { left, right } = current;

                if (!left && !right) {
                    if (current === this.root) {
                        this.root = null;
                    } else {
                        parent[side] = null;
                    }
                } else if (!!left ^ !!right) {
                    const child = left ? left : right;
                    if (current === this.root) {
                        this.root = child;
                    } else {
                        parent[side] = child;
                    }
                } else {
                    /**
                     * 1. current[lrEnd|rlEnd][r|l] = current[r|l]
                     * 2. parent[side]|this.root = current[l|r]
                     * 
                     * Use where the lEnd|rEnd has less depth so the whole tree has less depth
                     */
                    let leftRightEnd = left;
                    let leftDepth = 0;
                    while (leftRightEnd.right) {
                        leftRightEnd = leftRightEnd.right;
                        leftDepth++;
                    }
                    let rightLeftEnd = right;
                    let rightDepth = 0;
                    while (rightLeftEnd.left) {
                        rightLeftEnd = rightLeftEnd.left;
                        rightDepth++;
                    }

                    const useRight = leftDepth > rightDepth;
                    if (useRight) {
                        rightLeftEnd.left = left;
                        if (current === this.root) {
                            this.root = right;
                        } else {
                            parent[side] = right;
                        }
                    } else {
                        leftRightEnd.right = right;
                        if (current === this.root) {
                            this.root = left;
                        } else {
                            parent[side] = left;
                        }
                    }

                }
                return removed;
            }

            if (key < current.key) {
                parent = current;
                side = 'left';
                current = current[side];
                continue;
            }
            if (key > current.key) {
                parent = current;
                side = 'right';
                current = current[side];
                continue;
            }
        }

        return null;
    }

    /**
     * @desc Traverse the BST
     * @param {number} order -1: pre-order; 0: mid-order; 1: post-order
     * @return {array}
     */
    traverse(order = 0) {
        if (order < -1 || order > 1) {
            throw new Error('Must be -1, 0 or 1!');
        }

        const nodes = [];

        const handler = node => {
            nodes.push({ key: node.key, value: node.value });
        }
        const traverseNode = node => {
            if (node === null) {
                return;
            }
            switch (order) {
                case 1:
                    handler(node);
                    traverseNode(node.left);
                    traverseNode(node.right);
                    break;
                case -1:
                    traverseNode(node.left);
                    traverseNode(node.right);
                    handler(node);
                    break;
                default:
                    traverseNode(node.left);
                    handler(node);
                    traverseNode(node.right);
                    break;
            }
        };

        traverseNode(this.root);

        return nodes;
    }

}