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

// Approach-1: use stack
function convertBSTIntoSortedDLL_1(root) {
  let stack = [];

  function addAllLeftNodes(node) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
  }

  function helper(node) {
    addAllLeftNodes(node);
    let dummyNode = new Node(-1, null, null);
    let prev = dummyNode;

    while (stack.length) {
      let topElement = stack.pop();
      let curr = topElement;

      curr.left = prev;
      prev.right = curr;
      prev = curr;

      addAllLeftNodes(curr.right);
    }

    const head = dummyNode.right;
    dummyNode.right = head.left = null;

    // head.left = prev;
    // prev.right = head;

    return head;
  }

  const finalHead = helper(root);
  return finalHead;
}

// Approach-2: use DFS
function convertBSTIntoSortedDLL(root) {
  const dummyNode = new Node(-1);
  let prev = dummyNode;

  function helper(node) {
    if (!node) {
      return;
    }

    helper(node.left);
    let curr = node;
    curr.left = prev;
    prev.right = curr;
    prev = curr;

    helper(node.right);
  }

  helper(root);

  let head = dummyNode.right;
  dummyNode.right = head.left = null;

  // head.left = prev;
  // prev.right = head;

  return head;
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
  const res = convertBSTIntoSortedDLL(root);
  console.log(res);
  // display(res);
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
binaryTree(arr2);
