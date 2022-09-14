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

function shadowWidthOfTree(node) {
  const horizontalLevelArr = new Array(2);
  horizontalLevelArr.fill(0);

  function helper(node, hl = 0) {
    if (!node) {
      return;
    }

    horizontalLevelArr[0] = Math.min(horizontalLevelArr[0], hl);
    horizontalLevelArr[1] = Math.max(horizontalLevelArr[1], hl);

    helper(node.left, hl - 1);
    helper(node.right, hl + 1);
  }
  helper(node);
  const res = horizontalLevelArr[1] - horizontalLevelArr[0] + 1;
  return res;
}

/**
 * Vertical-order traversal
 * Top view -- > vertical-order[0]
 * Bottom view-> vertical-order[vertical-order.length]
 */

function verticalOrderTraversal(root) {
  let mapObj = new Map();
  let queue = [{ node: root, idx: 0 }];
  let max = -Infinity;
  let min = Infinity;

  while (queue.length) {
    const topElement = queue.shift();
    if (!mapObj.has(topElement.idx)) {
      mapObj.set(topElement.idx, [topElement.node.value]);
    } else {
      const prevVal = mapObj.get(topElement) || [];
      let newVal = [...prevVal, topElement.node.value];
      mapObj.set(topElement.idx, newVal);
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

  let res = [];
  for (let index = min; index <= max; index++) {
    res.push(mapObj.get(index));
  }
  return res;
}

function diagonalTraversal(node) {
  const queue = [node];
  let res = [];

  while (queue.length) {
    let size = queue.length;

    let subRes = [];
    while (size--) {
      let topElement = queue.shift();

      while (topElement) {
        if (topElement.left) {
          queue.push(topElement.left);
        }
        subRes.push(topElement.value);
        topElement = topElement.right;
      }
    }
    res.push(subRes);
  }
  return res;
}

function diagonalOrderSumBFS(node) {
  let queue = [node];
  let res = [];
  while (queue.length) {
    let size = queue.length;
    let subRes = 0;
    while (size--) {
      let topElement = queue.shift();
      while (topElement) {
        if (topElement.left) {
          queue.push(topElement.left);
        }
        subRes = subRes + topElement.value;
        topElement = topElement.right;
      }
    }
    res.push(subRes);
  }
  return res;
}

function diagonalOrderSumDFS(root) {
  let res = [];

  function helper(node, dn = 0) {
    if (!node) {
      return;
    }

    if (res.length == dn) {
      res.push(node.value);
    } else {
      res[dn] = res[dn] + node.value;
    }

    helper(node.left, dn + 1);
    helper(node.right, dn);
  }
  helper(root);
  return res;
}

function diagonalTraversalAntiClockWise(node) {
  const queue = [node];
  let res = [];

  while (queue.length) {
    let size = queue.length;

    let subRes = [];
    while (size--) {
      let topElement = queue.shift();

      while (topElement) {
        if (topElement.right) {
          queue.push(topElement.right);
        }
        subRes.push(topElement.value);
        topElement = topElement.left;
      }
    }
    res.push(subRes);
  }
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
  // console.log("Shadow width: ", shadowWidthOfTree(root));
  // console.log("Vertical-order: ", verticalOrderTraversal(root));
  // console.log("Diagonal-order-CW: ", diagonalTraversal(root));
  // console.log("Diagonal-order-ACW: ", diagonalTraversalAntiClockWise(root));
  console.log("Diagonal sum: ", diagonalOrderSumDFS(root));
  console.log("Diagonal sum: ", diagonalOrderSumBFS(root));
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
const arr2 = [
  1,
  2,
  3,
  4,
  null,
  null,
  null,
  null,
  5,
  null,
  6,
  null,
  7,
  null,
  8,
  null,
  null,
];
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
