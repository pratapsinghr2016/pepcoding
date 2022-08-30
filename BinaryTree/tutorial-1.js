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

function height(node) {
  if (node == null) {
    return 0;
    // return -1 if height is in terms of edges
    // return 0 if height is in terms of nodes
  }

  const leftHeight = height(node.left);
  const rightHeight = height(node.right);
  const completeHeight = Math.max(leftHeight, rightHeight) + 1;

  return completeHeight;
}

function max(node) {
  if (node == null) {
    return -Infinity;
  }

  const leftMax = max(node.left);
  const rightMax = max(node.right);
  const completeMax = Math.max(leftMax, rightMax, node.value);

  return completeMax;
}

function sum(node) {
  if (node == null) {
    return 0;
  }

  const leftSum = sum(node.left);
  const rightSum = sum(node.right);
  const total = leftSum + rightSum + node.value;

  return total;
}

function size(node) {
  if (node == null) {
    return 0;
  }

  const leftSize = size(node.left);
  const rightSize = size(node.right);
  const totalSize = leftSize + rightSize + 1;

  return totalSize;
}

let preOrder = "",
  inOrder = "",
  postOrder = "";
function traversal(node) {
  if (node == null) {
    return "";
  }

  preOrder += node.value + " ";
  traversal(node.left, preOrder, inOrder, postOrder);
  inOrder += node.value + " ";
  traversal(node.right, preOrder, inOrder, postOrder);
  postOrder += node.value + " ";

  return { preOrder, inOrder, postOrder };
}

function levelOrder(node) {
  if (!node) return [];

  let queue = [];
  let str = "";
  queue.push(node);

  while (queue.length) {
    const n = queue.length;
    for (let index = 0; index < n; index++) {
      // loop till n not till queue.length, coz of later queue.shift will change the length of queue
      // WRONG:- for (let index = 0; index < queue.length; index++) {
      const removedElement = queue.shift();
      str += removedElement.value + " ";

      if (removedElement.left) {
        queue.push(removedElement.left);
      }
      if (removedElement.right) {
        queue.push(removedElement.right);
      }
    }
    console.log(str);
    str = "";
  }
}

function IterativePair(node, state) {
  this.node = node;
  this.state = state;
}

function iterativeTraversal(node) {
  const stack = [];
  let preOrder = "";
  let inOrder = "";
  let postOrder = "";
  const pair = new IterativePair(node, 1);
  stack.push(pair);

  while (stack.length) {
    const topNode = stack[stack.length - 1]; // peek

    if (topNode.state == 1) {
      // pre-order
      preOrder += topNode.node.value + " ";
      if (topNode.node.left) {
        const preOrderPair = new IterativePair(topNode.node.left, 1);
        stack.push(preOrderPair);
      }

      topNode.state++;
    } else if (topNode.state == 2) {
      // in-order
      inOrder += topNode.node.value + " ";

      if (topNode.node.right) {
        const inOrderPair = new IterativePair(topNode.node.right, 1);
        stack.push(inOrderPair);
      }

      topNode.state++;
    } else {
      // post
      postOrder += topNode.node.value + " ";

      stack.pop();
    }
  }
  return { preOrder, postOrder, inOrder };
}

function findNode(node, target) {
  if (!node) {
    return false;
  }

  if (node.value == target) {
    return true;
  }

  const leftSide = findNode(node.left, target);

  if (leftSide) {
    return true;
  }

  const rightSide = findNode(node.right, target);

  if (rightSide) {
    return true;
  }

  return false;
}

let path = [];
function nodeToRoot(node, target) {
  if (!node) {
    return false;
  }

  if (node.value == target) {
    path.push(node.value);
    return true;
  }

  const leftSide = nodeToRoot(node.left, target);

  if (leftSide) {
    path.push(node.value);
    return true;
  }

  const rightSide = nodeToRoot(node.right, target);

  if (rightSide) {
    path.push(node.value);
    return true;
  }

  return false;
}

function atKLevelDown(node, k) {
  if (!node || k < 0) {
    return;
  }
  if (k == 0) {
    console.log(node.value);
  }
  atKLevelDown(node.left, k - 1);
  atKLevelDown(node.right, k - 1);
}

var binaryTreePaths = function (node) {
  let path = [];
  dfs(node, "");
  function dfs(node, str) {
    if (!node) return;

    if (!node.left && !node.right) {
      str += node.value;
      path.push(str);
      return;
    }

    dfs(node.left, str + node.value + "->");
    dfs(node.right, str + node.value + "->");
  }

  return path;
};

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
  // console.log("Size: ", size(root));
  // console.log("Sum: ", sum(root));
  // console.log("Max: ", max(root));
  // console.log("Height: ", height(root));
  // levelOrder(root);
  // console.log(iterativeTraversal(root));
  // console.log("Find: ", findNode(root, 22));
  // nodeToRoot(root, 87);
  // console.log("Path: ", path);
  // console.log(binaryTreePaths(root));
  atKLevelDown(root, 2);
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
