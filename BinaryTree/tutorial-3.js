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

function getHeight(node) {
  if (!node) {
    return -1;
  }

  const leftNodeHeight = getHeight(node.left);
  const rightNodeHeight = getHeight(node.right);

  const treeHeight = Math.max(leftNodeHeight, rightNodeHeight) + 1;
  return treeHeight;
}

function diameter(node) {
  if (!node) {
    return 0;
  }

  const ld = diameter(node.left);
  const rd = diameter(node.right);

  const f = getHeight(node.left) + getHeight(node.right) + 2;
  const treeDiameter = Math.max(f, Math.max(ld, rd));
  return treeDiameter;
}

let result = {};
function diameter2(node) {
  if (!node) {
    return {
      height: -1,
      diameter: 0,
    };
  }

  const leftNode = diameter2(node.left);
  const rightNode = diameter2(node.right);
  result["height"] = Math.max(leftNode.height, rightNode.height) + 1;
  let factor = leftNode.height + rightNode.height + 2;
  result["diameter"] = Math.max(
    factor,
    Math.max(leftNode.diameter, leftNode.diameter)
  );

  return result;
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
  // console.log("Height: ", getHeight(root));
  // console.log("Diameter: ", diameter(root));
  console.log("Diameter-2: ", diameter2(root).diameter);
}

// const arr = [1, 2, 4, null, null, 5, null, null, 3, null, null]; diameter leet-code doesn't work
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
