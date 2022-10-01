/**
 * Tutorial-5: CONSTRUCTS
 * ================================================
 * USE- post & in order TO binary tree
 * USE- pre & in order TO binary tree
 * USE- in order TO binary search tree
 * USE- pre order TO binary search tree
 * USE- post order TO binary search tree
 * USE- serialized string TO binary tree
 * USE- serialized string TO binary search tree
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

function createBinaryTreeFromPostAndInOrder(postOrder, inOrder) {
  let root = null;
  function helper(postOrder, psi, pei, inOrder, isi, iei) {
    if (psi > pei || isi > iei) {
      return null;
    }

    let idx = isi;
    while (postOrder[pei] !== inOrder[idx]) {
      idx += 1;
    }

    const node = new Node(inOrder[idx], null, null);

    const tne = idx - isi;
    node.left = helper(postOrder, psi, psi + tne - 1, inOrder, isi, idx - 1);
    node.right = helper(postOrder, psi + tne, pei - 1, inOrder, idx + 1, iei);

    return node;
  }

  root = helper(
    postOrder,
    0,
    postOrder.length - 1,
    inOrder,
    0,
    inOrder.length - 1
  );
  display(root);
}
const postOrder = [9, 15, 7, 20, 3];
let inOrder = [9, 3, 15, 20, 7];
// createBinaryTreeFromPostAndInOrder(postOrder, inOrder);

function createBinaryTreeFromPreAndInOrder(preOrder, inOrder) {
  let root = null;

  function helper(preOrder, psi, pei, inOrder, isi, iei) {
    if (psi > pei || isi > iei) {
      return null;
    }

    let idx = isi;

    while (preOrder[psi] !== inOrder[idx]) {
      idx += 1;
    }

    const node = new Node(preOrder[psi], null, null);
    const tne = idx - isi;

    node.left = helper(preOrder, psi + 1, psi + tne, inOrder, isi, idx - 1);
    node.right = helper(preOrder, psi + tne + 1, pei, inOrder, idx + 1, iei);

    return node;
  }

  root = helper(
    preOrder,
    0,
    preOrder.length - 1,
    inOrder,
    0,
    inOrder.length - 1
  );
  display(root);
}

let preOrder = [3, 9, 20, 15, 7];
let inOrder_ = [9, 3, 15, 20, 7];
// createBinaryTreeFromPreAndInOrder(preOrder, inOrder_);

function createBSTFromInOrder_1(inOrder) {
  let root = null;
  function helper(inOrder) {
    if (inOrder.length == 0) {
      return null;
    }

    const node = new Node();
    const pointer = parseInt(inOrder.length / 2, 10);

    node.value = inOrder[pointer];

    node.left = helper(inOrder.slice(0, pointer));
    node.right = helper(inOrder.slice(pointer + 1));
    return node;
  }
  root = helper(inOrder);
  display(root);
}

let inOrder__1 = [3, 7, 9, 15, 20];
// createBSTFromInOrder_1(inOrder__1);

function createBSTFromInOrder_2(inOrder) {
  let root = null;
  function helper(inOrder, isi, iei) {
    if (isi > iei) {
      return null;
    }

    const node = new Node();
    const pointer = parseInt((iei + isi) / 2);
    node.value = inOrder[pointer];
    node.left = helper(inOrder, isi, pointer - 1);
    node.right = helper(inOrder, pointer + 1, iei);

    return node;
  }
  root = helper(inOrder, 0, inOrder.length - 1);
  display(root);
}

let inOrder__2 = [3, 7, 9, 15, 20];
// createBSTFromInOrder_2(inOrder__2);

function createBSTFromPreOrder(preOrder) {
  let root = null;
  let idx = 0;
  function helper(preOrder, lr, rr) {
    if (idx >= preOrder.length || lr < preOrder[idx] || rr > preOrder[idx]) {
      return null;
    }

    const node = new Node();
    node.value = preOrder[idx++];
    node.left = helper(preOrder, lr, node.value);
    node.right = helper(preOrder, node.value, rr);
  }
  root = helper(preOrder, -Infinity, Infinity);
  display(root);
}

let preOrder_ = [30, 20, 10, 15, 25, 23, 39, 35, 42];
createBSTFromPreOrder(preOrder_);
