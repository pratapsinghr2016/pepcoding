/**
 * Tutorial-2:
 * ================================================
 * Find a node in BST
 * Node to root path
 * K-level down
 * K-level far
 * Root to leaf paths
 * Normalize/flatten a tree
 * Nodes with single child
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

function findNode(node, target) {
  if (!node) {
    return false;
  }

  if (node.value == target) {
    return true;
  }

  const foundInLeftSubTree = findNode(node.left, target);
  if (foundInLeftSubTree) {
    return true;
  }

  const foundInRightSubTree = findNode(node.right, target);
  if (foundInRightSubTree) {
    return true;
  }
  return false;
}

function nodeToRoot(root, target) {
  let path = [];

  function helper(node, target) {
    if (!node) {
      return false;
    }

    if (node.value == target) {
      path.push(node.value);
      return true;
    }

    const nodeFoundInLeft = helper(node.left, target);
    if (nodeFoundInLeft) {
      path.push(node.value);
      return true;
    }

    const nodeFoundInRight = helper(node.right, target);
    if (nodeFoundInRight) {
      path.push(node.value);
      return true;
    }

    return false;
  }
  helper(root, target);
  return path;
}

function atKLevelDown(root, k) {
  let res = [];
  function helper(node, k) {
    if (!node) {
      return null;
    }
    helper(node.left, k - 1);
    helper(node.right, k - 1);
    if (k == 0) {
      res.push(node.value);
    }
  }
  helper(root, k);
  return res;
}

function atKLevelFar(root, targetValue, k) {
  let paths = [];

  function helperNodeToRootPaths(node, targetValue) {
    if (!node) {
      return false;
    }

    if (node.value == targetValue) {
      paths.push(node);
      return true;
    }

    const leftRes = helperNodeToRootPaths(node.left, targetValue);
    if (leftRes) {
      paths.push(node);
      return true;
    }

    const rightRes = helperNodeToRootPaths(node.right, targetValue);
    if (rightRes) {
      paths.push(node);
      return true;
    }

    return false;
  }

  helperNodeToRootPaths(root, targetValue);

  function helperKLevelDownWithBlocker(node, blockerNode, k) {
    if (!node || node == blockerNode) {
      return null;
    }

    if (k == 0) {
      console.log(node.value);
    }

    helperKLevelDownWithBlocker(node.left, blockerNode, k - 1);
    helperKLevelDownWithBlocker(node.right, blockerNode, k - 1);
  }

  for (let idx = 0; idx < paths.length; idx++) {
    const tempNode = paths[idx];
    let blockerNode = null;
    if (idx > 0) {
      blockerNode = paths[idx - 1];
    }
    helperKLevelDownWithBlocker(tempNode, blockerNode, k - idx);
  }
}

function normalizeOrFlatten(root) {}

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
  // console.log("Find value:", findNode(root, 344));
  // console.log("Node-To-Root-Path: ", nodeToRoot(root, 70));
  // console.log("K-level down: ", atKLevelDown(root, 2));
  atKLevelFar(root, 37, 3);
}

const arr = [
  50,
  25,
  12,
  10,
  null,
  null,
  18,
  null,
  null,
  37,
  30,
  28,
  26,
  null,
  null,
  29,
  null,
  null,
  31,
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
