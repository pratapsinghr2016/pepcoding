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

function lowestCommonAncestor(node, p, q) {
  if (node.val > p.val && node.val > q.val) {
    return lowestCommonAncestor(node.left, p, q);
  } else if (node.val < p.val && node.val < q.val) {
    return lowestCommonAncestor(node.right, p, q);
  } else {
    return node;
  }
}

function replaceNodeWithLargestSum(root) {
  let sum = 0;
  function helper(node) {
    if (!node) {
      return 0;
    }
    helper(node.right);
    let temp = node.value;
    node.value = sum;
    sum += temp;
    helper(node.left);
  }
  helper(root);
}

function targetSum(root, target) {
  let res = [];
  function findComplement(node, complementTarget) {
    if (!node) {
      return false;
    }

    if (complementTarget < node.value) {
      return findComplement(node.left, complementTarget);
    } else if (complementTarget > node.value) {
      return findComplement(node.right, complementTarget);
    } else {
      return true;
    }
  }

  function traverse(node, target) {
    if (!node) {
      return;
    }

    traverse(node.left, target);
    const complement = Math.abs(node.value - target);
    if (complement > node.value) {
      if (findComplement(root, complement)) {
        res.push([node.value, complement]);
      }
    }
    traverse(node.right, target);
  }

  traverse(root, target);
  return res;
}

function targetSumBestApproach(node, target) {
  // YET TO BE DONE
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
// display(root);
const res = targetSum(root, 70);
console.log("Target sum: ", res);
