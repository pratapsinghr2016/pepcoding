const uniqueId = (function () {
  function* idGenerator() {
    let id = Date.now();

    while (true) {
      yield id++;
    }
  }
  const gen = idGenerator();
  return () => gen.next().value;
})();

function Node(value) {
  this.value = value;
  this.children = [];
  this.id = uniqueId();
}

function display(node) {
  const nodeValue = node.value;
  const nodeChildren = node.children;
  let str = nodeValue + "-->";

  for (const childNode of nodeChildren) {
    // nodeChildren = [20, 30, 40]
    str += childNode.value + ", ";
  }
  console.log(str);

  for (const childNode of nodeChildren) {
    // nodeChildren = [20, 30, 40]
    display(childNode);
  }
}

let floor = -Infinity;

function ceilFloor(node, target) {
  if (node.value < target) {
    floor = Math.max(floor, node.value);
  }
  for (const childNode of node.children) {
    ceilFloor(childNode, target);
  }
}

let target = Infinity;
function kthLargest(node, k) {
  for (let index = 0; index < k; index++) {
    ceilFloor(node, target);
    target = floor;
    floor = -Infinity;
  }
}

let maxSum = -Infinity;
let maxSumNodeVal = -Infinity;
function sumOfSubTreeToFindMaxSubTreeSum(node) {
  let sum = 0;

  for (const childNode of node.children) {
    let temp = sumOfSubTreeToFindMaxSubTreeSum(childNode);
    sum += temp;
  }
  sum += node.value;
  if (sum > maxSum) {
    maxSum = sum;
    maxSumNodeVal = node.value;
  }
  return sum;
}

let diameter = 0;
function getTreeDiameterViaHeight(node) {
  let deepestNodeHeight = -1;
  let secondDeepestNodeHeight = -1;

  for (const childNode of node.children) {
    const currentNodeHeight = getTreeDiameterViaHeight(childNode);
    if (
      currentNodeHeight > deepestNodeHeight &&
      currentNodeHeight > secondDeepestNodeHeight
    ) {
      secondDeepestNodeHeight = deepestNodeHeight;
      deepestNodeHeight = currentNodeHeight;
    } else if (currentNodeHeight > secondDeepestNodeHeight) {
      secondDeepestNodeHeight = currentNodeHeight;
    }
  }

  let currentDiameter = deepestNodeHeight + secondDeepestNodeHeight + 2;

  if (currentDiameter > diameter) {
    diameter = currentDiameter;
  }

  return deepestNodeHeight + 1;
}

let preOrder = "";
let postOrder = "";
function Pair(node, state) {
  this.node = node;
  this.state = state;
}
function iterativePreAndPostOrder(node) {
  let stack = new Array();
  const pair = new Pair(node, -1);
  stack.push(pair);

  while (stack.length > 0) {
    const topElement = stack[stack.length - 1]; // peek
    if (topElement.state == -1) {
      preOrder += topElement.node.value + " ";
      topElement.state += 1;
    } else if (topElement.state === topElement.node.children.length) {
      postOrder += topElement.node.value + " ";
      stack.pop();
    } else {
      const currentChildNode = topElement.node.children[topElement.state];
      const tempPair = new Pair(currentChildNode, -1);
      stack.push(tempPair);
      topElement.state++;
    }
  }

  console.log("Pre-order: ", preOrder);
  console.log("Post-order: ", postOrder);
}

function tree(array) {
  let stack = new Array();
  let root = null;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element === -1) {
      stack.pop();
    } else {
      const tempNode = new Node();
      tempNode.value = element;
      let peekElement = stack[stack.length - 1];

      if (stack.length) {
        peekElement.children.push(tempNode);
      } else {
        root = tempNode;
      }
      stack.push(tempNode);
    }
  }
  // display(root);
  // kthLargest(root, 3);
  // console.log(target);
  // sumOfSubTreeToFindMaxSubTreeSum(root);
  // console.log("Max-sum: ", maxSum);
  // console.log("Max-sum-node-value: ", maxSumNodeVal);
  // getTreeDiameterViaHeight(root);
  // console.log("Diameter: ", diameter);
  iterativePreAndPostOrder(root);
}

const arr = new Array(
  10,
  20,
  50,
  -1,
  60,
  -1,
  -1,
  30,
  70,
  -1,
  80,
  110,
  -1,
  120,
  -1,
  -1,
  90,
  -1,
  -1,
  40,
  100,
  -1,
  -1,
  -1
);

tree(arr);
