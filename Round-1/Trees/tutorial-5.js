function Node(value) {
  this.value = value;
  this.children = [];
}

function mirrorImage(node) {
  let queue = [];
  let str = "";

  queue.push(node);
  queue.push(null);

  while (queue.length) {
    const topQueueNode = queue.shift();

    if (!topQueueNode) {
      console.log(str);
      str = "";

      if (!queue.length) {
        break;
      }
      queue.push(null);
    } else {
      str += topQueueNode.value + " ";
      // for (const childNode of topQueueNode.children) {
      //   queue.push(childNode);
      // }
      let len = topQueueNode.children.length - 1;
      for (let index = len; index >= 0; index--) {
        const childNode = topQueueNode.children[index];
        queue.push(childNode);
      }
    }
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
  mirrorImage(root);
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
