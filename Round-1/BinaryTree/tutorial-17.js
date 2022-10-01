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
function nodeToRootPathWithoutRecur(node, target) {
  if (!node) {
    return false;
  }

  if (node.value == target) {
    path.push(node);
    return true;
  }

  const leftSide = nodeToRootPathWithoutRecur(node.left, target);

  if (leftSide) {
    path.push(node);
    return true;
  }

  const rightSide = nodeToRootPathWithoutRecur(node.right, target);

  if (rightSide) {
    path.push(node);
    return true;
  }

  return false;
}

function atKLevelFar(node, k, blockerNode) {
  if (!node || k < 0 || node == blockerNode) {
    return;
  }
  if (k == 0) {
    // here we are printing directly instead using an array to store the result
    console.log(node.value);
  }
  atKLevelFar(node.left, k - 1, blockerNode);
  atKLevelFar(node.right, k - 1, blockerNode);
}

let maxTimeToBurn = 0;
let burningTreeMap = new Map();
function getTimeToBurnATree(node, blockerNode, time) {
  if (!node || node == blockerNode) {
    return;
  }
  if (burningTreeMap.has(time)) {
    burningTreeMap.get(time).push(node.value);
  } else {
    burningTreeMap.set(time, [node.value]);
  }
  maxTimeToBurn = Math.max(maxTimeToBurn, time);
  getTimeToBurnATree(node.left, blockerNode, time + 1);
  getTimeToBurnATree(node.right, blockerNode, time + 1);
}

function nodeToRootPathRecur(node, targetNode) {
  if (!node) {
    return -1;
  }

  if (node.value == targetNode) {
    getTimeToBurnATree(node, null, 0);
    return 1;
  }

  const leftRes = nodeToRootPathRecur(node.left, targetNode);
  if (leftRes != -1) {
    getTimeToBurnATree(node, node.left, leftRes);
    return leftRes + 1;
  }

  const rightRes = nodeToRootPathRecur(node.right, targetNode);
  if (rightRes != -1) {
    getTimeToBurnATree(node, node.right, rightRes);
    return rightRes + 1;
  }

  return -1;
}

function nodesKLevelFar(node, targetNode, k) {
  nodeToRootPathWithoutRecur(node, targetNode);
  let tempPath = path;

  for (let index = 0; index < tempPath.length; index++) {
    const currentNode = tempPath[index];
    atKLevelFar(
      currentNode,
      k - index,
      index === 0 ? null : tempPath[index - 1]
    );
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
  // nodeToRootPathRecur_2(root, 62, 2);
  nodeToRootPathRecur(root, 62);
  console.log("Burn time:", maxTimeToBurn);
  console.log("Burn map: ", burningTreeMap);
}

const arr = [
  50,
  25,
  12,
  10,
  null,
  null,
  15,
  null,
  null,
  37,
  30,
  null,
  null,
  null,
  75,
  62,
  60,
  56,
  null,
  null,
  61,
  null,
  null,
  70,
  null,
  null,
  87,
  null,
  null,
];
binaryTree(arr);
