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

function getMaxWidthOfBinaryTree(root) {
  let queue = [{ node: root, idx: 0 }];
  let maxWidth = -Infinity;

  while (queue.length) {
    let len = queue.length;
    let leftMax = queue[0].idx;
    let rightMax = queue[0].idx;

    while (len--) {
      const topElement = queue.shift();
      rightMax = topElement.idx;

      if (topElement.node.left) {
        queue.push({ node: topElement.node.left, idx: 2 * topElement.idx + 1 });
      }
      if (topElement.node.right) {
        queue.push({
          node: topElement.node.right,
          idx: 2 * topElement.idx + 2,
        });
      }
    }

    maxWidth = Math.max(maxWidth, rightMax - leftMax + 1);
  }
  return maxWidth;
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
  console.log("Max width: ", getMaxWidthOfBinaryTree(root));
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
