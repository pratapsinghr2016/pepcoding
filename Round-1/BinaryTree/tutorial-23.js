// https://leetcode.com/problems/even-odd-tree/submissions/

var isEvenOddTree = function (root) {
  function getHeight(node) {
    if (!node) return 0;
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  }
  const heightOfTree = getHeight(root);
  let marker = new Array(heightOfTree);
  marker.fill(0);

  for (let idx = 1; idx < heightOfTree; idx += 2) {
    marker[idx] = Infinity;
  }

  function helper(node, level) {
    if (!node) return true;

    if (level % 2 == 0) {
      if (node.val % 2 == 0) return false;
      if (node.val <= marker[level]) return false;
      marker[level] = node.val;
    } else {
      if (node.val % 2 != 0) return false;
      if (node.val >= marker[level]) return false;
      marker[level] = node.val;
    }

    return helper(node.left, level + 1) && helper(node.right, level + 1);
  }

  return helper(root, 0);
};

// https://leetcode.com/problems/longest-univalue-path/submissions/
var longestUnivaluePath = function (root) {
  if (!root) {
    return 0;
  }
  let ans = 0;

  function dfs(node) {
    if (!node) {
      return { val: Infinity, height: 1 };
    }

    const leftRes = dfs(node.left);
    const rightRes = dfs(node.right);
    const pair = { val: node.val, height: 1 };

    if (node.val == leftRes.val && node.val == rightRes.val) {
      pair.height = Math.max(1, Math.max(leftRes.height, rightRes.height) + 1);
      ans = Math.max(ans, leftRes.height + rightRes.height + 1);
      return pair;
    } else if (node.val != leftRes.val && node.val != rightRes.val) {
      ans = Math.max(ans, 1);
      return pair;
    } else if (node.val == leftRes.val) {
      pair.height = 1 + leftRes.height;
      ans = Math.max(ans, rightRes.height, pair.height);
      return pair;
    } else if (node.val == rightRes.val) {
      pair.height = 1 + rightRes.height;
      ans = Math.max(ans, leftRes.height, pair.height);
      return pair;
    }

    return null;
  }

  dfs(root);

  return ans - 1;
};

// https://leetcode.com/problems/populating-next-right-pointers-in-each-node/submissions/
var connect = function (root) {
  let black = root;

  while (black && black.left) {
    let curr = black;
    while (true) {
      curr.left.next = curr.right;

      if (!curr.next) {
        break;
      }

      curr.right.next = curr.next.left;
      curr = curr.next;
    }
    black = black.left;
  }

  return root;
};

// https://leetcode.com/problems/binary-tree-coloring-game/submissions/
var btreeGameWinningMove = function (root, totalNodesCount, x) {
  let leftChildrenOfX = 0;
  let rightChildrenOfX = 0;

  function getChildrenCount(node, opponentNode) {
    if (!node) return 0;

    const nodesInLeft = getChildrenCount(node.left, opponentNode);
    const nodesInRight = getChildrenCount(node.right, opponentNode);
    if (node.val == opponentNode) {
      leftChildrenOfX = nodesInLeft;
      rightChildrenOfX = nodesInRight;
    }
    return nodesInLeft + nodesInRight + 1;
  }

  getChildrenCount(root, x);

  const remainingNodesOnOtherSide =
    totalNodesCount - (leftChildrenOfX + rightChildrenOfX + 1);
  const maxAvailableNodesForMe = Math.max(
    remainingNodesOnOtherSide,
    leftChildrenOfX,
    rightChildrenOfX
  );

  const res = maxAvailableNodesForMe > parseInt(totalNodesCount / 2);
  return res;
};

// https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/submissions/
var getTargetCopy = function (original, cloned, target) {
  function helper(tree1, tree2, target) {
    if (!tree1 || !tree2) return null;

    if (tree1 == target) {
      return tree2;
    }
    const leftRes = helper(tree1.left, tree2.left, target);
    if (leftRes) {
      return leftRes;
    }
    const rightRes = helper(tree1.right, tree2.right, target);
    if (rightRes) {
      return rightRes;
    }
    return null;
  }
  return helper(original, cloned, target);
};
