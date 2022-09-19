function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

function display(node) {
  let str = "";
  if (!node) {
    return null;
  }

  str += node.left ? node.left.value + " " : ".";
  str += "<- " + node.value + " ->";
  str += node.right ? node.right.value + " " : ".";

  console.log(str);
  display(node.left);
  display(node.right);
}

let max = 0;
function getMax(node) {
  if (!node.right) {
    max = node.value;
  } else {
    getMax(node.right);
  }
}

function getMax2(node) {
  if (!node.right) {
    return node.value;
  } else {
    return getMax2(node.right);
  }
}

function findValue(node, target) {
  if (!node) {
    return false;
  }

  if (target < node.value) {
    return findValue(node.left, target);
  } else if (target > node.value) {
    return findValue(node.right, target);
  } else {
    return true;
  }
}

function addValueToBST(node, valueToBeAdded) {
  if (!node) {
    const newNode = new Node(valueToBeAdded, null, null);
    return newNode;
  }

  if (valueToBeAdded > node.value) {
    node.right = addValueToBST(node.right, valueToBeAdded);
  } else {
    node.left = addValueToBST(node.left, valueToBeAdded);
  }
  return node;
}

function removeFromBST(node, valueToBeRemoved) {
  if (!node) {
    return null;
  }

  if (valueToBeRemoved > node.value) {
    node.right = removeFromBST(node.right, valueToBeRemoved);
  } else if (valueToBeRemoved < node.value) {
    node.left = removeFromBST(node.left, valueToBeRemoved);
  } else {
    if (node.left && node.right) {
      const leftMax = getMax2(node.left);
      node.value = leftMax;
      removeFromBST(node.left, leftMax);
      return node;
    } else if (node.left) {
      return node.left;
    } else if (node.right) {
      return node.right;
    } else {
      return null;
    }
  }
  return node;
}

function binarySearchTree(arr, low, high) {
  if (low > high) {
    return null;
  }
  const mid = Math.floor((low + high) / 2);
  const data = arr[mid];
  const leftSubTree = binarySearchTree(arr, low, mid - 1);
  const rightSubTree = binarySearchTree(arr, mid + 1, high);
  const node = new Node(data, leftSubTree, rightSubTree);
  return node;
}

const arr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const root = binarySearchTree(arr, 0, arr.length - 1);
display(root);
// getMax(root);
// console.log("Max: ", max);
// const res = findValue(root, 35);
// console.log("Find: ", res);
// const res = addValueToBST(root, 36);
// display(res);
// console.log("Max: ", getMax2(root));
// const res = removeFromBST(root, 10);
// console.log("======");
// display(res);
