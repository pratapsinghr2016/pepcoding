function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

function Pair(node, state) {
  this.node = node;
  this.state = state;
}

function leftViewOfBT(root) {
  let res = [];
  let set = new Set();
  function helper(node, level = 0) {
    if (!node) {
      return;
    }

    if (set.size == level) {
      set.add(node);
      res.push(node.value);
    }

    helper(node.right, level + 1);
    helper(node.left, level + 1);
  }
  helper(root);
  set.clear();
  return res;
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

/* function widthOfBinaryTree(node) {
  let res = 0;
  if (!node) {
    return res;
  }
  const Pair = function (node, num) {
    this.node = node;
    this.num = num;
  };
  let queue = [];
  const pair = new Pair(node, 0);
  queue.push(pair);

  while (queue.length) {
    const len = queue.length;
    let first = 0;
    let last = 0;
    const peekedEl = queue[queue.length - 1]; // peek
    const topElementNum = peekedEl.num;
    for (let index = 0; index < len; index++) {
      const topElement = queue.shift();
      const currentIdx = topElement.num - topElementNum;
      const currentNode = topElement.node;

      if (index == 0) {
        first = index;
      }
      if (index == len - 1) {
        last = index;
      }

      if (currentNode.left) {
        const pair = new Pair();
        pair.node = currentNode.left;
        pair.num = currentIdx * 2 + 1;
        queue.push(pair);
      }

      if (currentNode.right) {
        const pair = new Pair();
        pair.node = currentNode.right;
        pair.num = currentIdx * 2 + 2;
        queue.push(pair);
      }
    }
    console.log(res);
    res = Math.max(res, last - first + 1);
  }
  return res;
} */

var widthOfBinaryTree = function (node) {
  let res = 0;
  if (!node) {
    return res;
  }

  while (node.left && !node.right) {
    node = node.left;
  }

  while (node.right && !node.left) {
    node = node.right;
  }

  const Pair = function (node, num) {
    this.node = node;
    this.num = num;
  };
  let queue = [];
  const pair = new Pair(node, 0);
  queue.push(pair);

  while (queue.length) {
    // const topEl = queue[queue.length - 1]; // peek
    // const minNum = topEl.num;

    // let first = 0;
    // let last = 0;
    const len = queue.length;
    const positions = [];

    for (let idx = 0; idx < len; idx++) {
      const topElement = queue.shift();
      // const currentNum = topElement.num - minNum;
      const currentNum = topElement.num;
      const currentNode = topElement.node;
      positions.push(currentNum);

      //             if(idx == 0){
      //                 first = idx;
      //             }

      //             if(idx == len-1){
      //                 last = idx;
      //             }

      if (currentNode.left) {
        const pair = new Pair();
        pair.node = currentNode.left;
        pair.num = currentNum * 2;
        queue.push(pair);
      }

      if (currentNode.right) {
        const pair = new Pair();
        pair.node = currentNode.right;
        pair.num = currentNum * 2 + 1;
        queue.push(pair);
      }
    }
    // console.log(last, first)
    const levelWidth = positions[positions.length - 1] - positions[0] + 1;
    // const levelWidth = last-first;
    res = Math.max(res, levelWidth);
  }
  return res;
};

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
  display(root);
  // console.log("Left-view: ", leftViewOfBT(root));
  console.log("Tree width: ", widthOfBinaryTree(root));
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
const test1 = [1, 3, 2, 5, 3, null, 9];
const test2 = [1, 3, 5, null, null, 3, null, null, 2, null, 9, null, null];
binaryTree(test2);
