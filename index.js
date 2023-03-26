import Tree from "./tree.js";

let array = [3, 5, 6, 1, 9, 10, 12];

let tree = Tree();
//tree.buildTree(array);

//tree.prettyPrint(tree.buildTree(array));

let root = tree.buildTree(array);
tree.prettyPrint(root);
console.log(tree.levelOrder(root));

tree.insert(root, 17);
tree.insert(root, 18);

tree.prettyPrint(root);

tree.deleteNode(root, 17);
tree.prettyPrint(root);

console.log(tree.find(root, 18));
console.log(tree.levelOrder(root));
console.log("inorder");
console.log(tree.inorder(root));