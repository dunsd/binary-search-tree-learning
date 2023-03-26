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

      const levelOrder = (root, callback) => {
        if(root === null) return [];
        const queue = []; // FIFO queue
        queue.push(root);
        const resultsArr = [];

        while (queue.length != 0) {
          let subArr = [];
          let queueLength = queue.length;
          for(let i = 0; i < queueLength; i+=1) {
            let tempNode = queue.shift();
            subArr.push(tempNode.value);
            if(tempNode.left) queue.push(tempNode.left);
            if(tempNode.right) queue.push(tempNode.right);
            if(callback) callback(tempNode);
          }
          resultsArr.push(subArr);
        }
        if(!callback) return resultsArr;
      }

      const inorder = (root, callback, result = []) => {
        if(root === null) return;
        if(root) {
          if(callback) callback(root);
          inorder(root.left, callback, result);
          result.push(root.value);
          inorder(root.right, callback, result);
        }
        if(result) return result;
      }

      const preorder = (root, callback, result = []) => {
        if(root === null) return;
        if(root) {
          if(callback) callback(root);
          result.push(root.value);
          preorder(root.left, callback, result);
          preorder(root.right, callback, result);
        }
        if(result) return result;
      }

      const postorder = (root, callback, result = []) => {
        if(root === null) return;
        if(root) {
          if(callback) callback(root);          
          postorder(root.left, callback, result);
          postorder(root.right, callback, result);
          result.push(root.value);
        }
        if(result) return result;
      }

      const height = (node) => {
        if(node === null) return -1;
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight)+1;
      }

      //Problem: has problems returning root case.
      // const depth = (value, node, depthCount = -1) => {
      //   if(node === null) return depthCount;
      //   if(value === node.value) return depthCount;
      //   if(value < node.value){
      //     return depth(value, node.right, depthCount+1);
      //   } 
      //   else {
      //     return depth(value, node.left, depthCount+1);
      //   }
      // }

      const findDepth = (root, value) => {
        if(root === null) {
          return -1;
        }
        let count = -1;

        if((root.value === value) ||  //check for value
        (count = findDepth(root.left, value)) >= 0 || //check left tree
        (count = findDepth(root.right, value)) >= 0) { //check right tree
          return count+1;
        }
        return count;
      }

    return {
        buildTree,
        prettyPrint,
        insert,
        deleteNode,
        find,
        levelOrder,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        findDepth,
    }
}

export default Tree;