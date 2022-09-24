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

function serializeTreeUsingPostOrder(root) {
  function helper(node) {
    if (!node) {
      return "null";
    }
    const leftRes = helper(node.left);
    const rightRes = helper(node.right);
    return ` ${node.value},${leftRes},${rightRes}`;
  }
  const res = helper(root);
  return res;
}

function deSerializeFromPreOrder(dStr) {
  const arr = dStr.split(",");
  console.log(arr);
}

function deSerializeFromPostOrder(dStr) {
  const arr = dStr.split(",");

  let idx = arr.length - 1;
  function helper(postOrder) {
    console.log(idx, postOrder, postOrder[idx]);
    if (idx < 0 || postOrder[idx] == "null") {
      idx--;
      return null;
    }

    const node = new Node();
    node.value = postOrder[idx--];
    node.right = helper(postOrder);
    node.left = helper(postOrder);
    return node;
  }
  const res = helper(arr);
  return res;
}

function verifyPreOrderSerialization(str) {
  // code here
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
  const serializeRes = serializeTreeUsingPostOrder(root);
  const deserializeRes = deSerializeFromPostOrder(serializeRes);
  // const deserializeRes = deSerializeFromPreOrder(serializeRes);
  console.log(deserializeRes);
  // display(deserializeRes);
}

const arr1 = [
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
const arr2 = [1, 2, 3, null, null, 4, 5];
const arr3 = [
  8,
  3,
  1,
  null,
  null,
  6,
  4,
  null,
  null,
  7,
  null,
  null,
  10,
  null,
  14,
  13,
  null,
  null,
  null,
];
binaryTree(arr3);
