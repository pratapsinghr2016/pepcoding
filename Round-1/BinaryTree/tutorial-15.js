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

function getRightMostNode(curr, leftNode) {
  while (leftNode.right && leftNode.right !== curr) {
    leftNode = leftNode.right;
  }
  return leftNode;
}

function bstIterator(root) {
  let res = [];

  function morrisTraversal(node) {
    if (!node) {
      return null;
    }

    let curr = node;

    while (curr) {
      let leftNode = curr.left;
      if (!leftNode) {
        res.push(curr);
        curr = curr.right;
      } else {
        const rightMostNode = getRightMostNode(curr, leftNode);
        if (rightMostNode.right) {
          res.push(curr.value);
          rightMostNode.right = null;
          curr = curr.right;
        } else {
          rightMostNode.right = curr;
          curr = curr.left;
        }
      }
    }
  }

  morrisTraversal(root);

  this.next = function () {
    const value = res.shift();
    return value;
  };

  this.hasNext = function () {
    return res.length > 0;
  };
}

function countNumberOfChildNodes(node) {
  if (!node || (!node.left && !node.right)) {
    return 0;
  }
  const leftSubTreeSum = countNumberOfChildNodes(node.left);
  const rightSubTreeSum = countNumberOfChildNodes(node.right);
  let res = leftSubTreeSum + rightSubTreeSum;

  if ((node.left && !node.right) || (!node.left && node.right)) {
    res++;
  }
  return res;
}

function burnABinaryTree(root, target) {
  let queue = [];
  let res = [];
  let idx = 0;

  function helper(node, target) {
    if (!node) {
      return false;
    }
    if (node.value == target) {
      console.log(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      return true;
    }

    const foundInLeft = helper(node.left, target);

    if (foundInLeft) {
      let queueSize = queue.length;

      while (queueSize--) {
        let topElement = queue.shift();
        console.log(topElement.value);
        if (topElement.left) {
          queue.push(topElement.left);
        }
        if (topElement.right) {
          queue.push(topElement.right);
        }
      }
      if (node.right) {
        queue.push(node.right);
      }
      console.log(node.value);
      return true;
    }
    return false;
  }
  helper(root, target);
  while (queue.length) {
    let size = queue.length;
    while (size--) {
      const topElement = queue.shift();
      console.log(topElement.value);
      if (topElement.left) {
        queue.pop(topElement.left);
      }
      if (topElement.right) {
        queue.pop(topElement.right);
      }
    }
  }
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
  // const obj = new bstIterator(root);
  // console.log(obj.next(), obj.hasNext());
  // console.log("Height: ", countNumberOfChildNodes(root)); // single-child node
  burnABinaryTree(root, 5); // SEE: tutorial-16.js
}

const arr1 = [
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
const arr2 = [
  1,
  2,
  3,
  4,
  null,
  null,
  null,
  null,
  5,
  null,
  6,
  null,
  7,
  null,
  8,
  null,
  null,
];
const arr3 = [
  8,
  3,
  1,
  null,
  null,
  6,
  4,
  null,
  null,
  7,
  null,
  null,
  10,
  null,
  14,
  13,
  null,
  null,
  null,
];

const burningTreeEx = [
  3,
  5,
  6,
  null,
  null,
  2,
  7,
  null,
  null,
  4,
  null,
  null,
  1,
  6,
  null,
  null,
  8,
  null,
  null,
];

binaryTree(burningTreeEx);
