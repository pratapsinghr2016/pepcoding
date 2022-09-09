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
}

function constructBTFromLevelAndInOrder(inOrder, isi, iei, levelOrder) {
  /* if (!inOrder.length && !levelOrder.length) {
    return null;
  } */

  if (iei < isi) {
    return null;
  }

  const firstEl = levelOrder[0];
  const root = new Node(firstEl, null, null);
  if (levelOrder.length == 1) {
    return root;
  }
  let firstElIdxInInOrder = inOrder.indexOf(firstEl);

  const hashSet = new Set();
  for (let index = isi; index < firstElIdxInInOrder; index++) {
    const element = inOrder[index];
    hashSet.add(element);
  }

  let levelOrderLeftSubTree = [];
  let levelOrderRightSubTree = [];

  for (let idx = 1; idx < levelOrder.length; idx++) {
    const element = levelOrder[idx];
    if (hashSet.has(element)) {
      levelOrderLeftSubTree.push(element);
      hashSet.delete(element);
    } else {
      levelOrderRightSubTree.push(element);
    }
  }

  /*
 ===== WRONG ===
 
 let inOrderLeftSubTree = [];
  let inOrderRightSubTree = [];

  for (let index = isi; index < firstElIdxInInOrder; index++) {
    const element = inOrder[index];
    inOrderLeftSubTree.push(element);
  }

  for (let index = firstElIdxInInOrder + 1; index < iei; index++) {
    const element = inOrder[index];
    inOrderRightSubTree.push(element);
  }

  root.left = constructBTFromLevelAndInOrder(
    inOrderLeftSubTree,
    0,
    inOrderLeftSubTree.length - 1,
    levelOrderLeftSubTree
  );
  root.right = constructBTFromLevelAndInOrder(
    inOrderRightSubTree,
    0,
    inOrderRightSubTree.length - 1,
    levelOrderRightSubTree
  ); */
  root.left = constructBTFromLevelAndInOrder(
    inOrder,
    isi,
    firstElIdxInInOrder - 1,
    levelOrderLeftSubTree
  );
  root.right = constructBTFromLevelAndInOrder(
    inOrder,
    firstElIdxInInOrder + 1,
    iei,
    levelOrderRightSubTree
  );
  return root;
}

const levelOrder = [2, 7, 15, 3, 6, 9, 5, 11, 4];
const inOrder = [3, 7, 5, 6, 11, 2, 15, 4, 9];
// const res = constructBTFromLevelAndInOrder(
//   inOrder,
//   0,
//   inOrder.length - 1,
//   levelOrder
// );
// display(res);

function constructBTFromPreAndPostOrder(
  preOrder,
  preSI,
  preEI,
  postOrder,
  poSI,
  poEI
) {
  if (preSI > preEI || poSI > poEI) {
    return null;
  }

  let element = preOrder[preSI];
  const root = new Node(element, null, null);
  // let idx = postOrder.indexOf(element);
  let idx = poSI;
  while (postOrder[idx] !== preOrder[preSI + 1]) {
    idx++;
  }
  let tlNE = idx - poSI + 1;

  if (preSI == preEI) {
    return root;
  }

  root.left = constructBTFromPreAndPostOrder(
    preOrder,
    preSI + 1,
    preSI + tlNE,
    postOrder,
    poSI,
    idx
  );
  root.right = constructBTFromPreAndPostOrder(
    preOrder,
    preSI + tlNE + 1,
    preEI,
    postOrder,
    idx + 1,
    poEI - 1
  );

  return root;
}

const preOrder = ["a", "b", "d", "e", "i", "j", "c", "g", "h"];
const postOrder = ["d", "i", "j", "e", "b", "g", "h", "c", "a"];

// const res = constructBTFromPreAndPostOrder(
//   preOrder,
//   0,
//   preOrder.length - 1,
//   postOrder,
//   0,
//   postOrder.length - 1
// );
// display(res);

function constructBTFromPreOrder(preOrder) {
  let idx = 0;

  function helper(preOrder, leftRange, rightRange) {
    if (
      idx >= preOrder.length ||
      preOrder[idx] < leftRange ||
      preOrder[idx] > rightRange
    ) {
      return null;
    }
    const node = new Node();
    node.value = preOrder[idx++];
    node.left = helper(preOrder, leftRange, node.value);
    node.right = helper(preOrder, node.value, rightRange);
    return node;
  }
  const res = helper(preOrder, -Infinity, Infinity);
  return res;
}

// const preOrder2 = [30, 20, 10, 15, 25, 23, 39, 35, 42];
// const res2 = constructBTFromPreOrder(preOrder2);
// display(res2);

function createBSTFromLevelOrder(levelOrder) {
  function QueueInfo(parent, lr, rr) {
    this.parent = parent;
    this.lr = lr;
    this.rr = rr;
  }
  let idx = 0;
  const queue = [];
  let root = null;

  const infoObj = new QueueInfo(root, -Infinity, Infinity);
  queue.push(infoObj);

  while (queue.length && idx < levelOrder.length) {
    const topElement = queue.shift();

    let element = levelOrder[idx++];
    const node = new Node(element, null, null);

    if (element < topElement.lr || element > topElement.rr) {
      continue;
    }

    if (!topElement.parent) {
      root = node;
    } else {
      const { parent } = topElement;
      const topElementValue = parent.value;

      if (element <= topElementValue) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    }

    const queueObjForLeftSubTree = new QueueInfo(node, topElement.lr, element);
    queue.push(queueObjForLeftSubTree);

    const queueObjForRightSubTree = new QueueInfo(node, element, topElement.rr);
    queue.push(queueObjForRightSubTree);
  }
  return root;
}
const levelOrderArr = [50, 17, 72, 12, 23, 54, 76, 9, 14, 19, 67];
const res = createBSTFromLevelOrder(levelOrderArr);
display(res);
