export class QueueElement {
    element: string;
    priority: number;

    constructor(element: string, priority: number) {
        this.element = element;
        this.priority = priority;
    }
}