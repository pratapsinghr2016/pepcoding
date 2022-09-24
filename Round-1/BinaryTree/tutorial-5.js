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

let balanced = true;
function isBalanced(node) {
  if (!node) {
    return 0;
  }

  const leftTreeHeight = isBalanced(node.left);
  const rightTreeHeight = isBalanced(node.right);

  const diff = Math.abs(leftTreeHeight - rightTreeHeight);
  if (diff > 1) {
    balanced = false;
  }
  const treeHeight = Math.max(leftTreeHeight, rightTreeHeight) + 1;
  return treeHeight;
}

function isBalanced2(node) {
  if (!node) {
    return {
      height: 0,
      balanced: true,
    };
  }
  const leftTreeHeight = isBalanced2(node.left);
  const rightTreeHeight = isBalanced2(node.right);
  const treeHeight =
    Math.max(leftTreeHeight.height, rightTreeHeight.height) + 1;
  const diff = Math.abs(leftTreeHeight.height - rightTreeHeight.height);
  const balancedRes =
    diff <= 1 && leftTreeHeight.balanced && rightTreeHeight.balanced;
  return {
    balanced: balancedRes,
    height: treeHeight,
  };
}

function largestBSTSubtree(node) {
  if (!node) {
    const bstInfo = {
      treeIsBST: true,
      min: Infinity,
      max: -Infinity,
      root: node,
      size: 0,
    };
    return bstInfo;
  }

  const leftTreeInfo = largestBSTSubtree(node.left);
  const rightTreeInfo = largestBSTSubtree(node.right);
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

  if (bstInfo.treeIsBST) {
    bstInfo.root = node;
    bstInfo.size = leftTreeInfo.size + rightTreeInfo.size + 1;
  } else if (leftTreeInfo.size > rightTreeInfo.size) {
    bstInfo.root = leftTreeInfo.root;
    bstInfo.size = leftTreeInfo.size;
  } else {
    bstInfo.root = rightTreeInfo.root;
    bstInfo.size = rightTreeInfo.size;
  }
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
  // isBalanced(root);
  // console.log("Is-balanced:", balanced);
  // console.log("Is-balanced:", isBalanced2(root).balanced);
  console.log(largestBSTSubtree(root));
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
