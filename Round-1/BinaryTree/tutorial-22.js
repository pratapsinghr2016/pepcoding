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

function getAllUniqueBST(n) {
  function helper(start, end) {
    const res = [];
    if (start > end) {
      res.push(null);
      return res;
    }

    for (let index = start; index <= end; index++) {
      const left = helper(start, index - 1);
      const right = helper(index + 1, end);

      for (const leftNode of left) {
        for (const rightNode of right) {
          const root = new Node(index, leftNode || null, rightNode || null);
          res.push(root);
        }
      }
    }

    return res;
  }
  const ans = helper(1, n);
  return ans;
}

var getAllPossibleFullBT = function (n) {
  function helper(number) {
    if (number == 1) {
      const node = new TreeNode(0);
      return [node];
    }
    let res = [];
    for (let idx = 1; idx < number; idx += 2) {
      const leftNodes = helper(idx);
      const rightNodes = helper(number - idx - 1);
      for (leftItem of leftNodes) {
        for (rightItem of rightNodes) {
          const node = new TreeNode(0, leftItem, rightItem);
          res.push(node);
        }
      }
    }
    return res;
  }
  return helper(n);
};

var addOneRow = function (root, val, depth) {
  if (depth == 1) {
    const node = new TreeNode(val);
    node.left = root;
    return node;
  }

  let queue = [root];

  while (depth-- > 2) {
    // const len = queue.length;
    let tempQueue = [];
    while (queue.length) {
      const topElement = queue.shift();

      if (topElement?.left) {
        tempQueue.push(topElement.left);
      }

      if (topElement?.right) {
        tempQueue.push(topElement.right);
      }
    }
    queue = [...tempQueue];
  }

  while (queue.length) {
    const topElement = queue.shift();
    let temp = topElement.left;
    topElement.left = new TreeNode(val);
    topElement.left.left = temp;

    temp = topElement.right;
    topElement.right = new TreeNode(val);
    topElement.right.right = temp;
  }

  return root;
};

var pathInZigZagTree = function (n) {
  let lastLevelValue = 1;
  let currentValue = 0;

  while (currentValue < n) {
    currentValue += lastLevelValue;
    lastLevelValue *= 2;
  }

  lastLevelValue /= 2;

  let ans = [];
  while (n != 1) {
    ans.push(n);
    const complement = 3 * lastLevelValue - n - 1;

    let parent = parseInt(complement / 2);
    n = parent;
    lastLevelValue /= 2;
  }
  ans.push(1);
  return ans.reverse();
};

var CBTInserter = function (root) {
  let head = null;
  let queue = [root];
  let pointer = null;

  const topElement = queue[queue.length - 1]; // peek
  while (true) {
    if (topElement.left) {
      queue.push(topElement.left);
    } else {
      pointer = topElement;
      break;
    }

    if (topElement.right) {
      queue.push(topElement.right);
    } else {
      pointer = topElement;
      break;
    }

    queue.pop();
  }

  this.head = head;
  this.queue = queue;
  this.pointer = pointer;
};

// https://leetcode.com/problems/delete-nodes-and-return-forest/submissions/
var delNodes = function (root, targetArr) {
  const ans = [];
  const set = new Set();

  for (let item of targetArr) {
    set.add(item);
  }

  function helper(node, set, ans) {
    if (!node) return null;

    node.left = helper(node.left, set, ans);
    node.right = helper(node.right, set, ans);
    if (set.has(node.val)) {
      if (node.left) {
        ans.push(node.left);
      }
      if (node.right) {
        ans.push(node.right);
      }
      return null;
    }
    return node;
  }

  helper(root, set, ans);
  if (!set.has(root.val)) {
    ans.push(root);
  }

  return ans;
};

var goodNodes = function (root) {
  function dfs(node, max) {
    if (!node) {
      return 0;
    }
    let count = 0;

    if (max <= node.val) {
      count = 1;
    }

    max = Math.max(node.val, max);
    const countsFromLeft = dfs(node.left, max);
    const countsFromRight = dfs(node.right, max);
    count += countsFromLeft + countsFromRight;
    return count;
  }
  const response = dfs(root, -Infinity);
  return response;
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
  // display(root);
}

const arr = [
  25,
  20,
  10,
  5,
  null,
  null,
  12,
  null,
  null,
  22,
  null,
  null,
  36,
  30,
  28,
  null,
  null,
  null,
  40,
  38,
  null,
  null,
  48,
  null,
  null,
];

const arr2 = [25, 20, null, null, 36, null, null];
binaryTree(arr);
