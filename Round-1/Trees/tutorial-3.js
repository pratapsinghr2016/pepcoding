function Node(value) {
  this.value = value;
  this.children = [];
}

function levelOrderLineWise(node) {
  let mainQueue = [];
  let childQueue = [];
  let str = "";
  mainQueue.push(node);

  while (mainQueue.length || childQueue.length) {
    const firstNode = mainQueue.shift();
    str += firstNode.value + " ";

    for (const childNode of firstNode.children) {
      childQueue.push(childNode);
    }

    if (mainQueue.length === 0) {
      mainQueue = [...childQueue];
      childQueue = [];
      console.log(str);
      str = "";
      continue;
    }
  }
}

function breadthOrLevelTraversal(node) {
  // RPA- Remove, Print, Add
  let queue = [];
  queue.push(node);

  while (queue.length) {
    const nodeInQueue = queue.shift();
    console.log(nodeInQueue.value);
    for (const childNode of nodeInQueue.children) {
      queue.push(childNode);
    }
  }
}

function traversal(node) {
  const nodeValue = node.value;
  const nodeChildren = node.children;

  // pre-node
  console.log("Pre node", nodeValue); // PRE- ORDER- TRAVERSAL
  for (const childNode of nodeChildren) {
    // pre-edge
    console.log("Pre edge", nodeValue, ",", childNode.value);
    traversal(childNode);
    // post-edge
    console.log("Post edge", nodeValue, ",", childNode.value);
  }

  console.log("Post node", nodeValue); // POST- ORDER- TRAVERSAL
  // post-node
}

function maxHeight(node) {
  let treeHeight = -1;

  for (const childNode of node.children) {
    let childNodeHeight = maxHeight(childNode);
    treeHeight = Math.max(treeHeight, childNodeHeight);
  }

  return treeHeight + 1;
}

function maxValue(node) {
  let max = -Infinity;
  const nodeValue = node.value;
  const nodeChildren = node.children;

  for (const childNode of nodeChildren) {
    let temp = maxValue(childNode);
    max = Math.max(temp, max);
  }

  return Math.max(max, nodeValue);
}

function display(node) {
  const nodeValue = node.value;
  const nodeChildren = node.children;
  let str = nodeValue + "-->";

  for (const childNode of nodeChildren) {
    str += childNode.value + ", ";
  }

  console.log(str);
  for (const childNode of nodeChildren) {
    display(childNode);
  }
}

function tree(array) {
  const stack = new Array();
  let root = null;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element == -1) {
      stack.pop();
    } else {
      const tempNode = new Node();
      tempNode.value = element;

      if (stack.length) {
        const peekElement = stack[stack.length - 1];
        peekElement.children.push(tempNode);
      } else {
        root = tempNode;
      }
      stack.push(tempNode);
    }
  }
  // levelOrderLineWise(root);
  breadthOrLevelTraversal(root);
  // traversal(root);
  // console.log(maxHeight(root));
  // display(root);
  // console.log(maxValue(root));
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
