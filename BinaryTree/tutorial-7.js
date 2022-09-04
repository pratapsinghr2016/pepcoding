function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

function Pair(node, state) {
  this.node = node;
  this.state = state;
}

function Pair2(node, state, level) {
  this.node = node;
  this.state = state;
  this.level = level;
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

function verticalOrderTraversal(node) {
  const queue = [];
  const pairInfo = new Pair2();
  const mapObj = new Map();

  const response = [];

  pairInfo.node = node;
  pairInfo.state = 0;
  pairInfo.level = 0;

  queue.push(pairInfo);

  while (queue.length) {
    const topElement = queue.shift();
    if (!mapObj.has(topElement.state)) {
      const key = topElement.state;
      const value = topElement.node.value;
      const level = topElement.level;
      mapObj.set(key, [{ level, value }]);
    } else {
      const key = topElement.state;
      const valueToBeAdded = topElement.node.value;
      const level = topElement.level;
      const oldValue = mapObj.get(key);
      const newValue = [...oldValue, { level, value: valueToBeAdded }];
      mapObj.set(key, newValue);
    }
    if (topElement.node.left) {
      const leftPairObj = new Pair2();
      leftPairObj.node = topElement.node.left;
      leftPairObj.state = topElement.state - 1;
      leftPairObj.level = topElement.level + 1;
      queue.push(leftPairObj);
    }

    if (topElement.node.right) {
      const rightPairObj = new Pair2();
      rightPairObj.node = topElement.node.right;
      rightPairObj.state = topElement.state + 1;
      rightPairObj.level = topElement.level + 1;
      queue.push(rightPairObj);
    }
  }

  const sortedAsc = new Map([...mapObj].sort((a, b) => a[0] - b[0]));

  for (const [key, value] of sortedAsc) {
    let temp = [];
    if (value.length == 1) {
      response.push([value[0].value]);
    } else {
      const tempVal = value;
      for (let index = 0; index < tempVal.length - 1; index++) {
        const { level: level1, value: value1 } = tempVal[index];
        const { level: level2, value: value2 } = tempVal[index + 1];
        if (level1 == level2) {
          const sorted = [value1, value2].sort((a, b) => a - b);
          temp = [...temp, ...sorted];
        } else {
          temp.push(value1);
          if (index + 1 == tempVal.length - 1) {
            const { value: value2 } = tempVal[index + 1];
            temp.push(value2);
          }
        }
      }
      response.push(temp);
    }
  }
  return response;
}

function bottomViewOfTree(node) {
  const queue = [];
  const response = [];
  const pairInfo = new Pair();
  const mapObj = new Map();
  pairInfo.node = node;
  pairInfo.state = 0;

  queue.push(pairInfo);

  while (queue.length) {
    const topElement = queue.shift();

    if (!mapObj.has(topElement.state)) {
      const key = topElement.state;
      const value = topElement.node.value;
      mapObj.set(key, [value]);
    } else {
      const key = topElement.state;
      const valueToBeAdded = topElement.node.value;
      const oldValue = mapObj.get(key);
      const newValue = [...oldValue, valueToBeAdded];
      mapObj.set(key, newValue);
    }

    if (topElement.node.left) {
      const newPair = new Pair();
      newPair.node = topElement.node.left;
      newPair.state = topElement.state - 1;
      queue.push(newPair);
    }

    if (topElement.node.right) {
      const newPair = new Pair();
      newPair.node = topElement.node.right;
      newPair.state = topElement.state + 1;
      queue.push(newPair);
    }
  }

  const sortedAsc = new Map([...mapObj].sort((a, b) => a[0] - b[0]));

  for (const [key, value] of sortedAsc) {
    response.push(value.pop());
  }
  return response;
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
  // console.log("Vertical order: ", verticalOrderTraversal(root));
  console.log("Bottom view: ", bottomViewOfTree(root));
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
const arr2 = [
  1,
  2,
  4,
  null,
  null,
  5,
  null,
  null,
  3,
  6,
  null,
  null,
  7,
  null,
  null,
];

const arr3 = [3, 9, null, null, 20, 15, null, null, 7, null, null];

binaryTree(arr3);
