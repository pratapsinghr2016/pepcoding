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

let tilt = 0;
let sum = 0;
function tiltOfTree(node) {
  if (!node) {
    return 0;
  }

  const leftSideSum = tiltOfTree(node.left);
  const rightSideSum = tiltOfTree(node.right);
  let sum = leftSideSum + rightSideSum + node.value;
  let currentTilt = Math.abs(leftSideSum - rightSideSum);
  tilt += currentTilt;

  return sum;
}

function isBST(node) {
  if (!node) {
    const bstInfo = {
      treeIsBST: true,
      min: Infinity,
      max: -Infinity,
    };
    return bstInfo;
  }

  const leftTreeInfo = isBST(node.left);
  const rightTreeInfo = isBST(node.right);
  let bstInfo = {};

  bstInfo.treeIsBST =
    leftTreeInfo.treeIsBST &&
    rightTreeInfo.treeIsBST &&
    node.value >= leftTreeInfo.max &&
    node.value <= rightTreeInfo.min;
  bstInfo.min = Math.min(
    node.value,
    Math.min(leftTreeInfo.min, rightTreeInfo.min)
  );
  bstInfo.max = Math.max(
    node.value,
    Math.max(leftTreeInfo.max, rightTreeInfo.max)
  );
  return bstInfo;
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
  // tiltOfTree(root);
  // console.log("Tilt: ", tilt);
  console.log("Is-BST: ", isBST(root).treeIsBST);
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
const arr2 = [2, 2, 2];
binaryTree(arr2);
