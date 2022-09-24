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

let count = 0;

function getCount(node) {
  if (!node) {
    return 1;
  }

  const responseFromLeft = getCount(node.left);
  const responseFromRight = getCount(node.right);

  if (responseFromLeft == -1 || responseFromRight == -1) {
    count++;
    return 0;
  }

  if (responseFromLeft == 0 || responseFromRight == 0) {
    return 1;
  }

  return -1;
}

function findMinimumNoOfCams(node) {
  const res = getCount(node);
  if (res == -1) {
    count++;
  }
  return count;
}

function houseRobbery3(node) {
  function helper(node) {
    let response = { including: 0, excluding: 0 };
    if (!node) {
      return response;
    }

    const leftRobberyInfo = helper(node.left);
    const rightRobberyInfo = helper(node.right);

    response.including =
      leftRobberyInfo.excluding + rightRobberyInfo.excluding + node.value;
    response.excluding =
      Math.max(leftRobberyInfo.excluding, leftRobberyInfo.including) +
      Math.max(rightRobberyInfo.excluding, rightRobberyInfo.including);

    return response;
  }

  const treeResponse = helper(node);
  const response = Math.max(treeResponse.excluding, treeResponse.including);

  return response;
}

function PairZ(forwardSlope, backwardSlope, maxLength) {
  this.forwardSlope = forwardSlope;
  this.backwardSlope = backwardSlope;
  this.maxLength = maxLength;
}

function longestZigZagPath(node) {
  function helper(node) {
    if (!node) {
      const resObj = new PairZ(-1, -1, 0);
      return resObj;
    }

    const left = helper(node.left);
    const right = helper(node.right);

    const responseObj = new PairZ();

    responseObj.forwardSlope = left.backwardSlope + 1;
    responseObj.backwardSlope = right.forwardSlope + 1;
    responseObj.maxLength = Math.max(
      Math.max(left.backwardSlope, right.forwardSlope) + 1,
      Math.max(left.maxLength, right.maxLength)
    );

    return responseObj;
  }

  const response = helper(node);
  return response.maxLength;
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
  // findMinimumNoOfCams(root);
  // console.log("Count: ", count);
  // console.log("Robbery info: ", houseRobbery3(root));
  console.log("Max zig-zag length: ", longestZigZagPath(root));
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
const arr2 = [
  1,
  2,
  4,
  null,
  null,
  5,
  null,
  null,
  3,
  6,
  null,
  null,
  7,
  null,
  null,
];

const arr3 = [3, 9, null, null, 20, 15, null, null, 7, null, null];
const temp = [1];
binaryTree(temp);
