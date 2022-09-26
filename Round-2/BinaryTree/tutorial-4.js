/**
 * Tutorial-4: VIEWS
 * ================================================
 * Left view of BT
 * Right view of BT
 * Bottom view of BT
 * Top view of BT
 * Mirror view of BT
 * Left cloned BT
 *
 */

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

function leftViewOfBinaryTree(root) {
  let res = [];
  let counter = 0;
  function helper(node, level = 0) {
    if (!node) {
      return null;
    }

    if (counter == level) {
      counter++;
      res.push(node.value);
    }

    helper(node.left, level + 1);
    helper(node.right, level + 1);
  }
  helper(root);
  return res;
}

function rightViewOfBinaryTree(root) {
  let res = [];
  let counter = 0;
  function helper(node, level = 0) {
    if (!node) {
      return null;
    }

    if (counter == level) {
      counter++;
      res.push(node.value);
    }

    helper(node.right, level + 1);
    helper(node.left, level + 1);
  }
  helper(root);
  return res;
}

function topViewOfBinaryTree(root) {
  let queue = [{ node: root, idx: 0 }];
  const mapObj = new Map();
  let max = -Infinity;
  let min = Infinity;
  let res = [];

  while (queue.length) {
    let len = queue.length;

    while (len--) {
      const topElement = queue.shift();
      if (!mapObj.has(topElement.idx)) {
        mapObj.set(topElement.idx, [topElement.node.value]);
      } else {
        const previousVal = mapObj.get(topElement.idx);
        mapObj.set(topElement.idx, [...previousVal, topElement.node.value]);
      }

      max = Math.max(max, topElement.idx);
      min = Math.min(min, topElement.idx);

      if (topElement.node.left) {
        queue.push({ node: topElement.node.left, idx: topElement.idx - 1 });
      }

      if (topElement.node.right) {
        queue.push({ node: topElement.node.right, idx: topElement.idx + 1 });
      }
    }
  }
  for (let index = min; index <= max; index++) {
    const element = mapObj.get(index)[0];

    res.push(element);
  }
  return res;
}

function bottomViewOfBinaryTree(root) {
  let queue = [{ node: root, idx: 0 }];
  let res = [];
  let max = -Infinity;
  let min = Infinity;
  const mapObj = new Map();

  while (queue.length) {
    let len = queue.length;
    while (len--) {
      const topElement = queue.shift();
      if (!mapObj.has(topElement.idx)) {
        mapObj.set(topElement.idx, [topElement.node.value]);
      } else {
        const previousVal = mapObj.get(topElement.idx);
        mapObj.set(topElement.idx, [...previousVal, topElement.node.value]);
      }

      max = Math.max(max, topElement.idx);
      min = Math.min(min, topElement.idx);

      if (topElement.node.left) {
        queue.push({ node: topElement.node.left, idx: topElement.idx - 1 });
      }

      if (topElement.node.right) {
        queue.push({ node: topElement.node.right, idx: topElement.idx + 1 });
      }
    }
  }

  for (let index = min; index <= max; index++) {
    const element = mapObj.get(index);
    res.push(element[element.length - 1]);
  }

  return res;
}

function mirrorViewOfBinaryTree(root) {
  let res = null;

  function helper(node) {
    if (!node) {
      return null;
    }

    helper(node.left);
    helper(node.right);
    let temp = node.left;
    node.left = node.right;
    node.right = temp;
    res = node;
  }
  helper(root);
  return res;
}

function leftClonedTree(node) {
  if (!node) {
    return null;
  }

  const leftRes = leftClonedTree(node.left);
  const rightRes = leftClonedTree(node.right);
  const newNode = new Node(node.value, leftRes, null);
  node.left = newNode;
  node.right = rightRes;

  return node;
}

function recoverFromLeftCloned(node) {
  if (!node) {
    return null;
  }

  const leftRes = recoverFromLeftCloned(node.left?.left);
  const rightRes = recoverFromLeftCloned(node.right);

  node.left = leftRes;
  node.right = rightRes;

  return node;
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
  // console.log("Right-view:", leftViewOfBinaryTree(root));
  // console.log("Top-view: ", topViewOfBinaryTree(root));
  // console.log("Bottom-view: ", bottomViewOfBinaryTree(root));
  // console.log("Mirror-view: ", display(mirrorViewOfBinaryTree(root)));
  console.log("Left-cloned: ", display(leftClonedTree(root)));
  // recoverFromLeftCloned
}

const arr = [
  50,
  25,
  12,
  10,
  null,
  null,
  18,
  null,
  null,
  37,
  30,
  28,
  26,
  null,
  null,
  29,
  null,
  null,
  31,
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
