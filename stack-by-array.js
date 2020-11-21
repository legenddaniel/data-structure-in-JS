/*
Stack is a subclass of Vector that implements a standard last-in, first-out stack.

Stack only defines the default constructor, which creates an empty stack. Stack includes all the methods defined by Vector, and adds several of its own.
*/
class StackByArray { // Should extends Vector

    /**
     * @desc Initializes the stack with an array.
     */
    constructor() {
        this.items = [];
    }

    /**
     * @desc Empty the stack and return the length of the stack before clearing.
     * @return {number}
     */
    clear() {
        const l = this.items.length;
        this.items.length = 0;
        return l;
    }

    /**
     * @desc Tests if this stack is empty. Returns true if the stack is empty, and returns false if the stack contains elements.
     * @return {boolean}
     */
    isEmpty() {
        return !this.items.length;
    }

    /**
     * @desc Returns the element on the top of the stack, but does not remove it.
     * @return {*}
     */
    peek() {
        const stack = this.items;
        return stack[stack.length - 1];
    }

    /**
     * @desc Returns the element on the top of the stack, removing it in the process.
     * @return {*}
     */
    pop() {
        return this.items.pop();
    }

    /**
     * @desc Pushes the elements onto the stack. Elements is also returned.
     * @param {...*} elements
     * @return {*}
     */
    push(...elements) {
        this.items.push(...elements);
        return elements.length > 2 ? elements : elements[0];
    }

    /**
     * @desc Searches for element in the stack. If found, its offset from the top of the stack is returned. Otherwise, -1 is returned.
     * @param {*} element 
     * @return {number}
     */
    search(element) {
        return this.items.indexOf(element);
    }

    /**
     * @desc Retrive the number of elements in the stack.
     * @return {number}
     */
    size() {
        return this.items.length;
    }

    /**
     * @desc Print the stack.
     * @return {string}
     */
    toString() {
        return this.items + '';
    }
}