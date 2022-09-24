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

function getRightMostNode(leftNode, curr) {
  while (leftNode && leftNode !== curr) {
    leftNode = leftNode.right;
  }
  return leftNode;
}

function recoverTree(node) {
  let curr = node;
  let prev = null;
  let a = null;
  let b = null;

  while (curr) {
    let leftNode = curr.left;
    if (!leftNode) {
      if (prev && prev.value > curr.value) {
        if (!a) {
          a = prev;
        }
        b = curr;
      }
      prev = curr;
      curr = curr.right;
    } else {
      const rightMostNode = getRightMostNode(leftNode, curr);
      if (rightMostNode.right == null) {
        rightMostNode.right = curr;
        curr = curr.left;
      } else {
        rightMostNode.right = null;
        if (prev && prev.value > curr.value) {
          if (!a) {
            a = prev;
          }
          b = curr;
        }
        prev = curr;
        curr = curr.right;
      }
    }
  }

  if (a) {
    let temp = a.value;
    a.value = b.value;
    b.value = temp;
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

binaryTree(arr);
