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

function isSymmetric(node, tempMirror) {
  if (node.children.length !== tempMirror.children.length) {
    return false;
  }

  for (let index = 0; index < node.children.length; index++) {
    const lastIdx = node.children.length - index - 1;
    const c1 = node.children[index];
    const c2 = tempMirror.children[lastIdx];

    if (isSymmetric(c1, c2) === false) {
      return false;
    }
  }

  return true;
}

let size = 0;
let max = -Infinity;
let min = Infinity;
let height = 0;

function travelAndChangeMethod(node, depth = 0) {
  size++;
  max = Math.max(max, node.value);
  min = Math.min(min, node.value);
  height = Math.max(height, depth);

  for (const childNode of node.children) {
    travelAndChangeMethod(childNode, depth + 1);
  }
}

let successor = null;
let predecessor = null;
let state = 0;

function successorAndPredecessor(node, target) {
  if (state == 0) {
    if (node.value == target) {
      state = 1;
    } else {
      predecessor = node.value;
    }
  } else {
    if (state == 1) {
      successor = node.value;
    }
    state = 2;
  }

  for (const childNode of node.children) {
    successorAndPredecessor(childNode, target);
  }
}

let ceil = Infinity;
let floor = -Infinity;

function ceilFloor(node, target) {
  if (node.value > target) {
    const currentCeil = node.value;
    ceil = Math.min(ceil, currentCeil);
  }

  if (node.value < target) {
    const currentFloor = node.value;
    floor = Math.max(floor, currentFloor);
  }

  for (const childNode of node.children) {
    ceilFloor(childNode, target);
  }
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
  // console.log(isSymmetric(root, root));
  // travelAndChangeMethod(root);
  // console.log("Size: ", size);
  // console.log("Max: ", max);
  // console.log("Min: ", min);
  // console.log("Height: ", height);

  // successorAndPredecessor(root, 90);
  // console.log("Successor: ", successor);
  // console.log("Predecessor: ", predecessor);

  ceilFloor(root, 65);
  console.log("Ceil: ", ceil);
  console.log("Floor: ", floor);
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
