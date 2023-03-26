import Node from "./node.js";

const Tree = () => {

    const sortArray = (array) => {
        const sortedArray = [...new Set(array)].sort((a,b) => a-b);
        return sortedArray;
    }

    const buildTree = (array) => {
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
        //console.log(node);
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

      const insert = (root, value) => {
        if(root === null){
            root = Node(value);
            return root;
        }
        if(value > root.value) {
            root.right = insert(root.right, value);
        }
        else if(value < root.value) {
            root.left = insert(root.left, value);
        }
        return root;
      }

      const deleteNode = (root, value) => {
        if(root === null) {
          return root;
        }

        if(value < root.value) {
          root.left = deleteNode(root.left, value);
        }
        else if(value > root.value) {
          root.right = deleteNode(root.right, value);
        }
        else {
          if(root.left === null) {
            return root.right;
          }
          else if(root.right === null) {
            return root.left;
          }
          root.value = minValue(root.right);

          root.right = deleteNode(root.right, value);
        }
        return root;
      }
      

      const minValue = (root) => {
        let minv = root.value;
        while(root.left != null) {
          minv = root.left.value;
          root = root.left;
        }
        return minv;
      }

      const find = (root, value) => {
        if(root === null || root.value === value){
          return root;
        }
        if(value > root.value){
          return find(root.right, value);
        }
        if(value < root.value) {
          return find(root.left, value);
        }
      }

    return {
        buildTree,
        prettyPrint,
        insert,
        deleteNode,
        find,
    }
}

export default Tree;