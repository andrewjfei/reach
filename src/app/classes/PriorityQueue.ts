import { QueueElement } from './QueueElement';

export class PriorityQueue {
    elements: QueueElement[];

    constructor() {
        this.elements = [];
    }

     // adds an element into the queue at the correct position depending on its priority (the lower value, the higher the priority)
     enqueue(element: string, priority: number) {
        let qElement = new QueueElement(element, priority);
        let lowestPriority = true;

        for (let index = 0; index < this.elements.length; index++) {
            if (qElement.priority < this.elements[index].priority) {
                this.elements.splice(index, 0, qElement);
                lowestPriority = false;
                break;
            }
        };

        if (lowestPriority) {
            this.elements.push(qElement);
        };

    }

    // removes the highest priority element and returns it
    dequeue() {
        return this.isEmpty() ? 'Underflow' : this.elements.shift();
    }

    // returns the element with the highest priority without removing it from the queue
    peek() {
        return this.isEmpty() ? 'Queue is empty' : this.elements[0];
    }

    // returns true if the queue is empty
    isEmpty() {
        return this.elements.length == 0;
    }

    // returns the queue in a string format
    toString() {
        if (this.isEmpty()) {
            return 'Empty queue'
        };

        let string = 'Priority Queue: {';

        this.elements.forEach((element, index) => {

            if (index === this.elements.length - 1) {
                string += element.element + '}';
            } else {
                string += element.element + ',';
            }

        });

        return string;
    }
}