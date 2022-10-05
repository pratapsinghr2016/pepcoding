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

// Approach-1: O(n^2)
function getDiameterOfBT_1(root) {
  function getHeight(node) {
    if (!node) {
      return -1;
    }

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);
    const currHeight = Math.max(leftHeight, rightHeight) + 1;
    return currHeight;
  }

  if (!root) {
    return 0;
  }

  const leftDiameter = getDiameterOfBT(root.left);
  const rightDiameter = getDiameterOfBT(root.right);

  const leftHeight_ = getHeight(root.left);
  const rightHeight_ = getHeight(root.right);

  const currentDiameter = leftHeight_ + rightHeight_ + 2;

  const treeDiameter = Math.max(
    Math.max(leftDiameter, rightDiameter),
    currentDiameter
  );

  return treeDiameter;
}

// Approach-2: O(n), pair approach
function getDiameterOfBT_2(root) {
  if (!root) {
    return { height: -1, diameter: 0 };
  }
  const leftObj = getDiameterOfBT(root.left);
  const rightObj = getDiameterOfBT(root.right);
  const currentDiameter = Math.max(
    Math.max(leftObj.diameter, rightObj.diameter),
    leftObj.height + rightObj.height + 2
  );
  const currentHeight = Math.max(leftObj.height, rightObj.height) + 1;
  return { height: currentHeight, diameter: currentDiameter };
}

// Approach-3: O(n), global variable approach
function getDiameterOfBT(root) {
  let diameter = 0;
  function helper(node) {
    // using only height
    if (!node) {
      return -1;
    }
    const leftHeight = helper(node.left);
    const rightHeight = helper(node.right);
    diameter = Math.max(diameter, leftHeight + rightHeight + 2);
    const currentHeight = Math.max(leftHeight, rightHeight) + 1;
    return currentHeight;
  }
  helper(root);
  return diameter;
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
  console.log("Tree diameter: ", getDiameterOfBT(root));
}

const arr = [
  25,
  20,
  10,
  5,
  null,
  null,
  12,
  null,
  null,
  22,
  null,
  null,
  36,
  30,
  28,
  null,
  null,
  null,
  40,
  38,
  null,
  null,
  48,
  null,
  null,
];

const arr2 = [25, 20, null, null, 36, null, null];
binaryTree(arr);
