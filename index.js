import Tree from "./tree.js";

let array = [3, 5, 6, 1, 9, 10, 12];

let tree = Tree();
//tree.buildTree(array);

//tree.prettyPrint(tree.buildTree(array));

let root = tree.buildTree(array);
tree.prettyPrint(root);

tree.insert(root, 17);
tree.prettyPrint(root);