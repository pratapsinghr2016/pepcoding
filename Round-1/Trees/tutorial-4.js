function Node(value) {
  this.value = value;
  this.children = [];
}

function lineWiseTraversalCounter(node) {
  let queue = [];
  let str = "";
  queue.push(node);

  while (queue.length) {
    let count = queue.length;
    for (let index = 0; index < count; index++) {
      const tempNode = queue.shift();
      str += tempNode.value + " ";
      for (const childNode of tempNode.children) {
        queue.push(childNode);
      }
    }
    console.log(str);
    str = "";
  }
}

function singleQueueLineWiseTraversal(node) {
  // delimiter approach for line-wise traversal
  let queue = [];
  let str = "";
  queue.push(node);
  queue.push(null);

  while (queue.length) {
    const pickedNodeFromQueue = queue.shift();

    if (!pickedNodeFromQueue) {
      console.log(str);
      if (!queue.length) {
        break;
      }
      queue.push(null);
      str = "";
    } else {
      str += pickedNodeFromQueue.value + " ";
      for (const childNode of pickedNodeFromQueue.children) {
        queue.push(childNode);
      }
    }
  }
}

function zigZagTreeTraversal(node) {
  let mainQueue = [];
  let childQueue = [];
  let str = "";
  let count = 0;
  mainQueue.push(node);

  while (mainQueue.length || childQueue.length) {
    const pickedNodeFromQueue =
      count % 2 !== 0 ? mainQueue.shift() : mainQueue.pop();
    str += pickedNodeFromQueue.value + " ";

    for (const childNode of pickedNodeFromQueue.children) {
      childQueue.push(childNode);
    }

    if (mainQueue.length == 0) {
      mainQueue = [...childQueue];
      childQueue = [];
      // let finalStr = count % 2 !== 0 ? str : str.split(" ").reverse().join(" ");
      console.log(str);
      str = "";
      count++;
      continue;
    }
  }
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
  // zigZagTreeTraversal(root);
  // singleQueueLineWiseTraversal(root);
  lineWiseTraversalCounter(root);
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
