/**
 * @desc Initialize all vertices to false (uniterated / unqueued)
 * @param {object} map
 * @return {object}
 */
const initializeStates = map => {
    if (!(map instanceof Map)) {
        throw new Error('A Map object is required');
    }

    const states = {};
    map.forEach((values, key) => {
        states[key] = false;
    })

    return states;
};

class Graph {
    constructor() {
        this.data = new Map();
    }

    /**
     * Add vertex
     * @param {*} vertex 
     * @return {undefined}
     */
    addVertex(vertex) {
        this.data.set(vertex, []);
    }

    /**
     * Add edges
     * @param {*} vertex1
     * @param {*} vertex2
     * @return {undefined}
     */
    addEdges(vertex1, vertex2) {
        this.data.get(vertex1).push(vertex2);
        this.data.get(vertex2).push(vertex1);
    }

    /**
     * @desc Breadth First Search
     * @param {*} first vertex to begin iteration
     * @return {array}
     */
    bfs(first) {
        const result = [];
        const queue = new QueueByArray();
        const states = initializeStates(this.data);

        // Initialize the first vertex for running handler
        queue.enqueue(first);
        states[first] = true;

        /**
         * @desc Recursively enqueue the vertices and push the queue peek to the result
         * @param {object} queue instance of QueueByArray
         */
        const handler = queue => {
            if (queue.isEmpty()) {
                return;
            }

            // Remove the first element. Enqueue all vertices linked to this element with a false state. Mark all states as true. Do while the queue has element.
            const peek = queue.dequeue();
            const edges = this.data.get(peek).reduce((a, b) => {
                if (!states[b]) {
                    states[b] = true;
                    a.push(b);
                }
                return a;
            }, []);
            queue.enqueue(...edges);
            result.push(peek);

            handler(queue);
        }

        handler(queue);

        return result;
    }

    /**
     * @desc Depth First Search
     * @param {*} first vertex to begin iteration
     * @return {array}
     */
    dfs(first) {
        if (this.getEdges(first) === undefined) {
            throw new Error('No such vertex!');
        }

        const result = [];
        const states = initializeStates(this.data);

        /**
         * @desc Recursively append vertex with false state into the result
         * @param {*} vertex 
         * @return {undefined}
         */
        const handler = vertex => {
            const edges = this.getEdges(vertex);
            for (let vertex of edges) {
                if (!states[vertex]) {
                    result.push(vertex);
                    states[vertex] = true;
                    handler(vertex);
                }
            }
        }

        handler(first);

        return result;
    }

    /**
     * @desc Get all edges of the given vertex
     * @param {*} vertex 
     */
    getEdges(vertex) {
        return this.data.get(vertex);
    }

    /**
     * Print the graph
     * @return {string}
     */
    toString() {
        let string = '';
        this.data.forEach((value, key) => {
            string += `${key} -> ${value};\n`;
        });
        return string.replace(/,\n$/, '');
    }


}