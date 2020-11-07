/*
Stack is a subclass of Vector that implements a standard last-in, first-out stack.

Stack only defines the default constructor, which creates an empty stack. Stack includes all the methods defined by Vector, and adds several of its own.
*/
class StackByArray { // Should extends Vector

    /**
     * @desc Initializes the stack with an array. If no argument passed will be initialized as an empty stack.
     * @param {array|undefined} array 
     */
    constructor(array) {
        if (!Array.isArray(array) && arguments.length) throw 'Parameter must be empty or an array!'
        this.stack = array || [];
    }

    /**
     * @desc Tests if this stack is empty. Returns true if the stack is empty, and returns false if the stack contains elements.
     * @return {boolean}
     */
    empty() {
        return !this.stack.length;
    }

    /**
     * @desc Returns the element on the top of the stack, but does not remove it.
     * @return {*}
     */
    peek() {
        const stack = this.stack;
        return stack[stack.length - 1];
    }

    /**
     * @desc Returns the element on the top of the stack, removing it in the process.
     * @return {*}
     */
    pop() {
        return this.stack.pop();
    }

    /**
     * @desc Pushes the element onto the stack. Element is also returned.
     * @param {*} element Element being pushed
     * @return {*}
     */
    push(element) {
        this.stack.push(element);
        return element;
    }

    /**
     * @desc Searches for element in the stack. If found, its offset from the top of the stack is returned. Otherwise, -1 is returned.
     * @param {*} element 
     * @return {number}
     */
    search(element) {
        return this.stack.indexOf(element);
    }

    /**
     * @desc Print the stack.
     * @return {string}
     */
    toString() {
        return this.stack + '';
    }
}