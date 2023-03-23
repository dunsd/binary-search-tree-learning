import Tree from "./tree.js";

let array = [3, 5, 6, 1, 9, 10, 12];

let tree = Tree();
//tree.buildTree(array);
tree.prettyPrint(tree.buildTree(array));
