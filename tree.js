import Node from "./node.js";

const Tree = () => {
    let root = null;

    function sortArray(array) {
        const sortedArray = [...new Set(array)].sort((a,b) => a-b);
        return sortedArray;
    }

    function buildTree(array) {
        let sortedArray = sortArray(array);
        if(array.length === 0) {return null} //Escape
        const mid = parseInt(sortedArray.length/2);

        // Recursion to sort left and right
        const root = Node(sortedArray[mid]);
        root.left = buildTree(sortedArray.slice(0,mid));
        root.right = buildTree(sortedArray.slice(mid + 1));
        //console.log(root);
        return root;
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => { //Print function taken from The Odin Project.
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }

    return {
        buildTree,
        prettyPrint,
    }
}

export default Tree;