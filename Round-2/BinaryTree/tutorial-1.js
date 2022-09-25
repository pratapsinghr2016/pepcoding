/**
 * Tutorial-1:
 * ================================================
 * BINARY TREE:
 * 1- Height of BT
 * 2- MAX
 * 3- SUM of all nodes
 * 4- SIZE of BT i.e number of nodes
 * 5- Traversal - [in, pre, post] <DFS>
 * 6- Level-order traversal <BFS>
 * 7- Iterative traversal
 *
 * ================================================
 * BINARY TREE
 * 1- INSERT in BST
 * 2- REMOVE node
 * 3- Find a node
 * 4- MAX
 *
 */

function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

function Pair(node, state) {
  this.node = node;
  this.state = state;
}

function display(node) {
  let str = "";
  if (node == null) {
    return;
  }

  str += node.left ? node.left.value + " " : ".";
  str += "<- " + node.value + " ->";
  str += node.right ? node.right.value + " " : ".";

  console.log(str);
  display(node.left);
  display(node.right);
}

function getHeight(node) {
  if (!node) {
    return 0;
  }

  const leftHeight = getHeight(node.left);
  const rightHeight = getHeight(node.right);
  const height = Math.max(leftHeight, rightHeight) + 1;
  return height;
}

function getMax(node) {
  if (!node) {
    return -Infinity;
  }

  const leftMax = getMax(node.left);
  const rightMax = getMax(node.right);
  const max = Math.max(node.value, leftMax, rightMax);
  return max;
}

function getSum(node) {
  if (!node) {
    return 0;
  }

  const leftSum = getSum(node.left);
  const rightSum = getSum(node.right);
  const sum = node.value + leftSum + rightSum;
  return sum;
}

function getSize(node) {
  if (!node) {
    return 0;
  }

  const leftSize = getSize(node.left);
  const rightSize = getSize(node.right);
  const size = leftSize + rightSize + 1;
  return size;
}

function getTraversals(root) {
  let preOrder = [],
    postOrder = [],
    inOrder = [];

  function helper(node) {
    if (!node) {
      return null;
    }
    preOrder.push(node.value);
    helper(node.left);
    inOrder.push(node.value);
    helper(node.right);
    postOrder.push(node.value);
  }
  helper(root);
  return { preOrder, inOrder, postOrder };
}

function getLevelOrder(node) {
  let res = [];
  let queue = [];
  queue.push(node);

  while (queue.length) {
    let len = queue.length;
    while (len) {
      const topElement = queue.shift();
      res.push(topElement?.value);

      if (topElement?.left) {
        queue.push(topElement.left);
      }
      if (topElement?.right) {
        queue.push(topElement.right);
      }
      len--;
    }
  }
  return res;
}

function getIterativeTraversal(node) {
  let preOrder = [],
    postOrder = [],
    inOrder = [];

  const pair = { node, state: 1 };
  let stack = [pair];

  while (stack.length) {
    const element = stack[stack.length - 1];

    if (element.state == 1) {
      preOrder.push(element.node.value);
      if (element.node.left) {
        stack.push({
          node: element.node.left,
          state: 1,
        });
      }
      element.state++;
    } else if (element.state == 2) {
      inOrder.push(element.node.value);
      if (element.node.right) {
        stack.push({
          node: element.node.right,
          state: 1,
        });
      }
      element.state++;
    } else {
      postOrder.push(element.node.value);
      stack.pop();
    }
  }
  return { preOrder, inOrder, postOrder };
}

function binaryTree(arr) {
  let stack = [];
  const root = new Node(arr[0], null, null);
  const pair = new Pair(root, 1);
  stack.push(pair);

  let idx = 0;
  while (stack.length) {
    const topElement = stack[stack.length - 1]; // peek
    if (topElement.state == 1) {
      idx++;
      const leftValue = arr[idx];

      if (leftValue) {
        const leftNode = new Node(leftValue, null, null);
        topElement.node.left = leftNode;
        const leftNodePair = new Pair(leftNode, 1);
        stack.push(leftNodePair);
      } else {
        topElement.node.left = null;
      }
      topElement.state++;
    } else if (topElement.state == 2) {
      idx++;
      const rightValue = arr[idx];

      if (rightValue) {
        const rightNode = new Node(rightValue, null, null);
        topElement.node.right = rightNode;
        const rightNodePair = new Pair(rightNode, 1);
        stack.push(rightNodePair);
      } else {
        topElement.node.right = null;
      }
      topElement.state++;
    } else {
      stack.pop();
    }
  }
  // display(root);
  // console.log("Height: ", getHeight(root));
  // console.log("Max: ", getMax(root));
  // console.log("Sum: ", getSum(root));
  // console.log("Size: ", getSize(root));
  // console.log("Traversals: ", getTraversals(root));
  // console.log("Level-order: ", getLevelOrder(root));
  console.log("Iterative traversal: ", getIterativeTraversal(root));
}

const arr = [
  50,
  25,
  12,
  null,
  null,
  37,
  30,
  null,
  null,
  null,
  75,
  62,
  null,
  70,
  null,
  null,
  87,
  null,
  null,
];
binaryTree(arr);
