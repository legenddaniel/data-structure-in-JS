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
     * Print the graph
     * @return {string}
     */
    toString() {
        let string = '';
        this.data.forEach((value, key) => {
            string += `${key} -> ${value},\n`;
        });
        return string.replace(/,\n$/, '');
    }
}