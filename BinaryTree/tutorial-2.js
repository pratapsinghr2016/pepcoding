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

let path = [];
function nodeToRoot(node, target) {
  if (!node) {
    return false;
  }

  if (node.value == target) {
    path.push(node);
    return true;
  }

  const leftSide = nodeToRoot(node.left, target);

  if (leftSide) {
    path.push(node);
    return true;
  }

  const rightSide = nodeToRoot(node.right, target);

  if (rightSide) {
    path.push(node);
    return true;
  }

  return false;
}

function atKLevelDown(node, k, blockerNode) {
  if (!node || k < 0 || node == blockerNode) {
    return;
  }
  if (k == 0) {
    console.log(node.value);
  }
  atKLevelDown(node.left, k - 1, blockerNode);
  atKLevelDown(node.right, k - 1, blockerNode);
}

function nodesKLevelFar(node, targetNode, k) {
  nodeToRoot(node, targetNode);
  let tempPath = path;

  for (let index = 0; index < tempPath.length; index++) {
    const currentNode = tempPath[index];
    atKLevelDown(
      currentNode,
      k - index,
      index === 0 ? null : tempPath[index - 1]
    );
  }
}

function pathToLeafFromRoot(node, path, sum, low, high) {
  if (!node) {
    return;
  }

  if (!node.left && !node.right) {
    if (node.value >= low && node.value <= high) {
      path += node.value;
      sum += node.value;
      console.log({ path, sum });
    }
  }

  pathToLeafFromRoot(
    node.left,
    path + node.value + " ",
    sum + node.value,
    low,
    high
  );

  pathToLeafFromRoot(
    node.right,
    path + node.value + " ",
    sum + node.value,
    low,
    high
  );
}

function leftClonedTree(node) {
  if (!node) {
    return;
  }

  const leftSide = leftClonedTree(node.left);
  const rightSide = leftClonedTree(node.right);
  const newNode = new Node(node.value, leftSide, null);
  node.left = newNode;
  node.right = rightSide;

  return node;
}

function normalizedTree(node) {
  if (!node) return;

  const leftNormTree = normalizedTree(node.left?.left);
  const rightNormTree = normalizedTree(node.right);

  node.left = leftNormTree;
  node.right - rightNormTree;

  return node;
}

function singleChildPrint(node) {
  if (!node) {
    return;
  }

  if (node.left && !node.right) {
    console.log(node.value);
  } else if (!node.left && node.right) {
    console.log(node.value);
  }

  singleChildPrint(node.left);
  singleChildPrint(node.right);
}

function removeLeaves(node) {
  if (!node) return;

  if (!node.left && !node.right) {
    return null;
  }

  const leftNode = removeLeaves(node.left);
  const rightNode = removeLeaves(node.right);

  node.left = leftNode;
  node.right = rightNode;
  return node;
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
  // nodesKLevelFar(root, 62, 2);
  // pathToLeafFromRoot(root, "", 0, 25, 50);
  // let newRoot = leftClonedTree(root);
  // display(newRoot);
  // normalizedTree(root);
  // singleChildPrint(root);
  // display(root);
  const newNode = removeLeaves(root);
  display(newNode);
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
