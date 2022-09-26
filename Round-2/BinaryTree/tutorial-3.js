/**
 * Tutorial-3: TRAVERSALS
 * ================================================
 * Level-order traversal
 * Zig-zag traversal OR Spiral traversal
 * Boundary traversal
 * Vertical-order traversal
 * Morris traversal - IN, PRE, POST
 * Diagonal traversal - Clockwise
 * Diagonal traversal - Anti-clockwise
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

function levelOrderTraversal(root) {
  let queue = [root];
  let res = [];

  while (queue.length) {
    let len = queue.length;
    let subRes = [];
    while (len) {
      const topElement = queue.shift();
      if (topElement) {
        subRes.push(topElement.value);
      }

      if (topElement?.left) {
        queue.push(topElement.left);
      }

      if (topElement?.right) {
        queue.push(topElement.right);
      }
      len--;
    }
    res.push(subRes);
  }
  return res;
}

// zigZag = Spiral traversal
function zigZagTraversals(root) {
  const queue = [root];
  const res = [];

  while (queue.length) {
    let len = queue.length;
    let subRes = [];

    while (len) {
      const topElement = queue.shift();

      if (topElement) {
        subRes.push(topElement.value);
      }

      if (topElement?.left) {
        queue.push(topElement.left);
      }

      if (topElement?.right) {
        queue.push(topElement.right);
      }

      len--;
    }
    const resLen = res.length;
    if (resLen % 2 != 0) {
      subRes.reverse();
    }

    res.push(subRes);
  }
  return res;
}

function boundaryTraversal(root) {
  let res = [];
  let leftMostNodeValues = [];
  let lastLevelValues = [];
  let rightMostValues = [];

  function getLeftMostValues(node) {
    if (!node) {
      return null;
    }

    leftMostNodeValues.push(node.value);
    getLeftMostValues(node.left);
  }

  function getLastLevelValues(node) {
    const queue = [node];
    const response = [];

    while (queue.length) {
      let len = queue.length;
      let subRes = [];
      while (len) {
        const topElement = queue.shift();
        if (topElement) {
          subRes.push(topElement.value);
        }

        if (topElement?.left) {
          queue.push(topElement.left);
        }

        if (topElement?.right) {
          queue.push(topElement.right);
        }
        len--;
      }
      response.push(subRes);
    }
    return response;
  }

  function getRightMostValues(node) {
    if (!node) {
      return null;
    }

    rightMostValues.push(node.value);

    getRightMostValues(node.right);
  }

  getLeftMostValues(root);
  lastLevelValues = getLastLevelValues(root);
  lastLevelValues = lastLevelValues[lastLevelValues.length - 1];
  getRightMostValues(root);
  rightMostValues = rightMostValues.slice(1).reverse();
  res = [...leftMostNodeValues, ...lastLevelValues, ...rightMostValues];
  return res;
}

function verticalOrderTraversal(root) {
  const queue = [{ node: root, idx: 0 }];
  const mapObj = new Map();
  let maxIdx = -Infinity;
  let minIdx = Infinity;
  const res = [];

  while (queue.length) {
    const topElement = queue.shift();

    if (!mapObj.has(topElement.idx)) {
      mapObj.set(topElement.idx, [topElement.node.value]);
    } else {
      const prevVal = mapObj.get(topElement.idx);
      mapObj.set(topElement.idx, [...prevVal, topElement.node.value]);
    }

    maxIdx = Math.max(maxIdx, topElement.idx);
    minIdx = Math.min(minIdx, topElement.idx);

    if (topElement.node.left) {
      queue.push({ node: topElement.node.left, idx: topElement.idx - 1 });
    }

    if (topElement.node.right) {
      queue.push({ node: topElement.node.right, idx: topElement.idx + 1 });
    }
  }

  for (let index = minIdx; index <= maxIdx; index++) {
    const element = mapObj.get(index);
    res.push(element);
  }
  return res;
}

function morrisTraversal(root) {
  let curr = root;
  let res = [];

  function getRightMostNode(leftNode, curr) {
    // && mistake
    while (leftNode.right && leftNode.right != curr) {
      leftNode = leftNode.right;
    }
    return leftNode;
  }

  while (curr) {
    let leftNode = curr.left;
    if (!leftNode) {
      res.push(curr.value);
      curr = curr.right;
    } else {
      const rightMostNode = getRightMostNode(leftNode, curr);
      if (!rightMostNode.right) {
        // res.push(curr.value); // PRE-ORDER
        rightMostNode.right = curr;
        curr = curr.left;
      } else {
        // res.push(curr.value); // IN-ORDER
        rightMostNode.right = null;
        curr = curr.right;
      }
    }
  }

  /*  function getLeftMostNode(rightNode, curr) {
    while (rightNode.left && rightNode.left != curr) {
      rightNode = rightNode.left;
    }
    return rightNode;
  }

  while (curr) {
    let rightNode = curr.right;
    if (!rightNode) {
      res.push(curr.value);
      curr = curr.left;
    } else {
      const leftMostNode = getLeftMostNode(rightNode, curr);
      if (!leftMostNode.left) {
        res.push(curr.value);
        leftMostNode.left = curr;
        curr = curr.right;
      } else {
        leftMostNode.left = null;
        curr = curr.left;
      }
    }
  }
  res.reverse(); 
  */

  return res;
}

function diagonalOrderTraversalClockWise(root) {
  let queue = [root];
  let res = [];

  while (queue.length) {
    let len = queue.length;
    let subRes = [];
    while (len--) {
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

function diagonalOrderTraversalAntiClockWise(root) {
  let queue = [root];
  let res = [];

  while (queue.length) {
    let len = queue.length;
    let subRes = [];
    while (len--) {
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
  // console.log("Level-order:", levelOrderTraversal(root));
  // console.log("Zigzag-order:", zigZagTraversals(root));
  // console.log("Boundary traversal: ", boundaryTraversal(root));

  // console.log("Vertical-order traversal: ", verticalOrderTraversal(root));
  // console.log("Morris-traversal: ", morrisTraversal(root));
  // console.log("Diagonal-traversal-CW: ", diagonalOrderTraversalClockWise(root));
  console.log(
    "Diagonal-traversal-ACW: ",
    diagonalOrderTraversalAntiClockWise(root)
  );
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
