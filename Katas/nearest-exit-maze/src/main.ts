// https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html
import { displayMemoryUsage, nearestExit } from "./core";
import { maze, maze2, maze3, maze4, maze5, maze6 } from "./data";

displayMemoryUsage();

const entrance = [0, 0];
const result = nearestExit(maze, entrance);
console.log("Output[1]", result, "Expected:", -1);
// Output: -1
// Explanation: There are no exits in this maze.

const entrance2 = [1, 0];
const result2 = nearestExit(maze2, entrance2);
console.log("Output[2]", result2, "Expected:", 2);
// Output: 2
// Explanation: There is 1 exit in this maze at [1,2].
// [1,0] does not count as an exit since it is the entrance cell.
// Initially, you are at the entrance cell [1,0].
// - You can reach [1,2] by moving 2 steps right.
// Thus, the nearest exit is [1,2], which is 2 steps away.

const entrance3 = [1, 2];
const result3 = nearestExit(maze3, entrance3);
console.log("Output[3]", result3, "Expected:", 1);
// Output: 1
// Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
// Initially, you are at the entrance cell [1,2].
// - You can reach [1,0] by moving 2 steps left.
// - You can reach [0,2] by moving 1 step up.
// It is impossible to reach [2,3] from the entrance.
// Thus, the nearest exit is [0,2], which is 1 step away.

const entrance4 = [3, 2];
const result4 = nearestExit(maze4, entrance4);
console.log("Output[4]", result4, "Expected:", 4);
// Output: 4

const entrance5 = [42, 4];
const result5 = nearestExit(maze5, entrance5);
console.log("Output[5]", result5, "Expected:", -1);
// Output: -1

const entrance6 = [92, 94];
const result6 = nearestExit(maze6, entrance6);
console.log("Output[6.2]", result6, "Expected:", 183);
// Output: 183

displayMemoryUsage();
