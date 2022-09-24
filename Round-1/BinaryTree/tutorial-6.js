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

function createTreeFromPostAndInOrder(postOrder, inOrder) {
  function helper(postOrder, psi, pei, inOrder, isi, iei) {
    if (psi > pei || isi > iei) {
      return;
    }

    const node = new Node();
    let idx = isi;

    while (inOrder[idx] !== postOrder[pei]) {
      idx += 1;
    }

    const tne = idx - isi;
    node.value = postOrder[pei];
    node.left = helper(postOrder, psi, psi + tne - 1, inOrder, isi, idx - 1);
    node.right = helper(postOrder, psi + tne, pei - 1, inOrder, idx + 1, iei);
    return node;
  }

  return helper(
    postOrder,
    0,
    postOrder.length - 1,
    inOrder,
    0,
    inOrder.length - 1
  );
}

function createTreeFromPreAndInOrder(preOrder, inOrder) {
  function helper(preOrder, psi, pei, inOrder, isi, iei) {
    if (iei < isi) {
      return null;
    }

    let idx = isi;
    while (preOrder[psi] != inOrder[idx]) {
      idx += 1;
    }

    const node = new Node();
    node.value = preOrder[psi];
    const tne = idx - isi; // to be derived from In-order
    node.left = helper(preOrder, psi + 1, psi + tne, inOrder, isi, idx - 1);
    node.right = helper(preOrder, psi + tne + 1, pei, inOrder, idx + 1, iei);
    return node;
  }
  return helper(
    preOrder,
    0,
    preOrder.length - 1,
    inOrder,
    0,
    inOrder.length - 1
  );
}

function bstFromInOrderTraversal(inOrder) {
  function helper(inOrder, isi, iei) {
    if (isi > iei) {
      return null;
    }

    const node = new Node();
    const mid = Math.floor((isi + iei) / 2);
    node.value = inOrder[mid];
    node.left = helper(inOrder, isi, mid - 1);
    node.right = helper(inOrder, mid + 1, iei);
    return node;
  }
  const response = helper(inOrder, 0, inOrder.length - 1);
  return response;
}

function bstFromPreOrderTraversal(preOrder) {
  let idx = 0;
  function helper(preOrder, lr, rr) {
    if (idx >= preOrder.length || preOrder[idx] < lr || preOrder[idx] > rr) {
      return null;
    }

    const node = new Node();
    node.value = preOrder[idx++];
    node.left = helper(preOrder, lr, node.value);
    node.right = helper(preOrder, node.value, rr);

    return node;
  }
  return helper(preOrder, -Infinity, Infinity);
}

function bstFromPostOrderTraversal(postOrder) {
  let idx = postOrder.length - 1;

  function helper(postOrder, lr, rr) {
    if (idx < 0 || postOrder[idx] < lr || postOrder[idx] > rr) {
      return null;
    }

    const node = new Node();
    node.value = postOrder[idx--];
    node.right = helper(postOrder, node.value, rr);
    node.left = helper(postOrder, lr, node.value);
    return node;
  }
  return helper(postOrder, -Infinity, Infinity);
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
  // let inorder = [9, 3, 15, 20, 7];
  // let postorder = [9, 15, 7, 20, 3];
  // console.log(createTreeFromPostAndInOrder(postorder, inorder));
  //
  // let inorder = [9, 3, 15, 20, 7];
  // let preorder = [3, 9, 20, 15, 7];
  // console.log(createTreeFromPreAndInOrder(preorder, inorder));
  // let inorder = [9, 3, 15, 20, 7];
  // console.log(bstFromInOrderTraversal(inorder));
  // let preorder = [15, 9, 3, 20, 7];
  // console.log(bstFromPreOrderTraversal(preorder));
  let postorder = [3, 9, 7, 20, 15];
  console.log(bstFromPostOrderTraversal(postorder));
}

const arr = [
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
binaryTree(arr);
