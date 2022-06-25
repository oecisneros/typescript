import { isUndefined } from "./core";

export type Position = number[];
export type Maze = string[][];
export type VisitedCells = { [key: string]: true };

type ListItem<T> = {
    value: T;
    next?: ListItem<T>;
};

export class LinkedList<T> {
    private head?: ListItem<T>;
    private last?: ListItem<T>;

    static create<T>(value: T) {
        const list = new LinkedList<T>();
        list.add(value);
        return list;
    }

    add(value: T) {
        if (this.isEmpty()) {
            this.head = { value };
            this.last = this.head;
        } else {
            this.head = { value, next: this.head };
        }
    }

    addLast(value: T) {
        if (this.isEmpty()) {
            this.head = { value };
            this.last = this.head;
        } else {
            const last = { value };
            this.last!.next = last;
            this.last = last;
        }
    }

    getHead() {
        if (this.isEmpty()) return undefined;

        const previousValue = this.head!.value;
        this.head = this.head!.next;
        if (isUndefined(this.head)) {
            this.last = undefined;
        }
        return previousValue;
    }

    peekLast() {
        return this.last?.value;
    }

    isEmpty() {
        return isUndefined(this.head);
    }
}
