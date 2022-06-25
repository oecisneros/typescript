import "jest";
import { LinkedList } from "../types";

describe("LinkedList", () => {
    test("constructor should return an empty list", () => {
        // Arrange
        const list = new LinkedList<any>();

        // Act
        const result = list.isEmpty();

        // Assert
        expect(result).toBe(true);
    });

    test("create should return a new object with one element", () => {
        // Arrange
        const list = LinkedList.create(1);

        // Act
        let result = 0;
        if (!list.isEmpty()) {
            result++;
            list.getHead();
        }

        // Assert
        expect(result).toBe(1);
    });

    test("getHead should return undefined when the list is empty", () => {
        // Arrange
        const list = new LinkedList<any>();

        // Act
        const result = list.getHead();

        // Assert
        expect(result).toBe(undefined);
    });

    test("getHead should return the first element of the list", () => {
        // Arrange
        const list = new LinkedList<any>();
        list.add(1);
        list.add(2);
        list.add(3);

        // Act
        const result = list.getHead();

        // Assert
        expect(result).toBe(3);
    });

    test("peekLast should return undefined when the list is empty", () => {
        // Arrange
        const list = new LinkedList<any>();

        // Act
        const result = list.peekLast();

        // Assert
        expect(result).toBe(undefined);
    });

    test("peekLast should return the last element of the list", () => {
        // Arrange
        const list = new LinkedList<any>();

        // Act
        list.add(2);
        list.add(1);
        const result = list.peekLast();

        // Assert
        expect(result).toBe(2);
    });

    test("addLast should add an element at the end of the list", () => {
        // Arrange
        const list = new LinkedList<any>();

        // Act
        list.add(1);
        list.add(2);
        list.addLast(3);
        const result = list.peekLast();

        // Assert
        expect(result).toBe(3);
    });
});
