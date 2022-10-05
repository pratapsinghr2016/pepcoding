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

// Approach-1: pair method
function maxPathSum_1(root) {
  let pair = { leafToLeafPathSum: -Infinity, nodeToLeafPathSum: -Infinity };
  if (!root) {
    return pair;
  }

  if (!root.left && !root.right) {
    pair.leafToLeafPathSum = root.value;
    pair.nodeToLeafPathSum = root.value;
    return pair;
  }

  const leftObj = maxPathSum(root.left);
  const rightObj = maxPathSum(root.right);

  pair.leafToLeafPathSum = Math.max(
    leftObj.leafToLeafPathSum,
    rightObj.leafToLeafPathSum
  );

  if (root.left && root.right) {
    pair.leafToLeafPathSum = Math.max(
      pair.leafToLeafPathSum,
      leftObj.nodeToLeafPathSum + rightObj.nodeToLeafPathSum + root.value
    );
  }

  pair.nodeToLeafPathSum =
    Math.max(leftObj.nodeToLeafPathSum, rightObj.nodeToLeafPathSum) +
    root.value;

  return pair;
}

// Approach-2: global variable method
function maxPathSum(root) {
  let leafToLeafPathSum = -Infinity;

  function helper(node) {
    if (!node) {
      return -Infinity;
    }

    if (!node.left && !node.right) {
      return node.value;
    }

    const nodeToLeafPathSumLeft = helper(node.left);
    const nodeToLeafPathSumRight = helper(node.right);

    const nodeToLeafPathSumCurr =
      Math.max(nodeToLeafPathSumLeft, nodeToLeafPathSumRight) + node.value;

    if (node.left && node.right) {
      leafToLeafPathSum = Math.max(
        leafToLeafPathSum,
        nodeToLeafPathSumLeft + nodeToLeafPathSumRight + node.value
      );
    }

    return nodeToLeafPathSumCurr;
  }

  helper(root);

  return leafToLeafPathSum;
}

function getNodeToNodePathSum(root) {
  function helper(node) {
    const pair = { rootToNodeSum: 0, nodeToNodeSum: -Infinity };
    if (!node) {
      return pair;
    }

    const leftObj = helper(node.left);
    const rightObj = helper(node.right);

    const rootToNodeSumCurr =
      Math.max(leftObj.rootToNodeSum, rightObj.rootToNodeSum) + node.value;
    const nodeToNodeSumCurr = Math.max(
      leftObj.nodeToNodeSum,
      rightObj.nodeToNodeSum,
      leftObj.rootToNodeSum + rightObj.rootToNodeSum + node.value,
      node.value,
      rootToNodeSumCurr
    );
    pair.rootToNodeSum = Math.max(rootToNodeSumCurr, node.value);
    pair.nodeToNodeSum = nodeToNodeSumCurr;
    return pair;
  }
  const res = helper(root);
  return res;
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
  // console.log("L-T-L sum: ", maxPathSum(root));
  console.log("N-T-N sum: ", getNodeToNodePathSum(root));
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
