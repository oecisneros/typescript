import { Position, Maze, VisitedCells, LinkedList } from "./types";

export function isUndefined(value?: unknown): boolean {
    return value === undefined;
}

export function displayMemoryUsage(): void {
    for (const [key, value] of Object.entries(process.memoryUsage())) {
        console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
    }
}

const areEqual = (a: Position, b: Position): boolean => a[0] === b[0] && a[1] === b[1];

const getKey = (position: Position): string => `${position[0]},${position[1]}`;

function isExit(maze: Maze, [x, y]: Position): boolean {
    return (x === 0 || y === 0 || x === maze.length - 1 || y === maze[0].length - 1);
}
    
function isEmptyCell(maze: Maze, [x, y]: Position): boolean {
    return (x >= 0 && x < maze.length) && (y >= 0 && y < maze[0].length) && (maze[x][y] === ".");
}

function* move([x, y]: Position): Generator<number[], void, unknown> {
    yield [x, y + 1];
    yield [x, y - 1];
    yield [x - 1, y];
    yield [x + 1, y];
}

// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/
export function nearestExit(maze: Maze, entrance: Position): number {
    if (maze.length < 1 || maze[0].length > 100) return -1;

    if (!isEmptyCell(maze, entrance)) return -1;

    let steps = 0;
    let marker: Position | undefined = entrance;
    const visitedGen1: VisitedCells = {};
    const positions = LinkedList.create(entrance);

    while (!positions.isEmpty()) {
        let current: any = positions.getHead();
        visitedGen1[getKey(current!)] = true;
        for (const newPos of move(current!)) {
            if (!visitedGen1[getKey(newPos)]) {
                if (isEmptyCell(maze, newPos)) {
                    visitedGen1[getKey(newPos)] = true;
                    if (isExit(maze, newPos)) {
                        console.log(`The nearest exit is (${newPos}), which is ${steps} steps away`);
                        return ++steps;
                    }
                    positions.addLast(newPos);
                }
            }
        }
        if (marker && areEqual(current, marker)) {
            steps++;
            marker = positions.peekLast();
        }
    }
    console.log("There are no exits in this maze, steps", steps);
    return -1;
}

export function nearestExit2(maze: Maze, entrance: Position): number {
    if (maze.length < 1 || maze[0].length > 100) return -1;

    if (!isEmptyCell(maze, entrance)) return -1;

    let steps = 0;
    let entrances = LinkedList.create(entrance);
    const visitedGen1: VisitedCells = {};

    function getChildren(positions: LinkedList<Position>): [boolean, LinkedList<Position>] {
        const children = new LinkedList<Position>();

        while (!positions.isEmpty()) {
            let current = positions.getHead();
            visitedGen1[getKey(current!)] = true;
            for (const newPos of move(current!)) {
                if (!visitedGen1[getKey(newPos)]) {
                    if (isEmptyCell(maze, newPos)) {
                        visitedGen1[getKey(newPos)] = true;
                        if (isExit(maze, newPos)) {
                            return [true, LinkedList.create<Position>(newPos)];
                        }
                        children.addLast(newPos);
                    }
                }
            }
        }
        return [false, children];
    }

    while (!entrances.isEmpty()) {
        steps++;
        const [result, children] = getChildren(entrances);
        if (result) {
            console.log(`The nearest exit is (${children.getHead()}), which is ${steps} steps away`);
            return steps;
        }
        entrances = children;
    }

    console.log("There are no exits in this maze, steps", steps);
    return -1;
}
