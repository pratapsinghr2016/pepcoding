function Node(value) {
  this.value = value;
  this.children = [];
}

let max = -Infinity;
function getMaxOfTree(node) {
  const nodeValue = node.value;
  const nodeChildren = node.children;

  for (const childNode of nodeChildren) {
    max = getMaxOfTree(childNode);
  }
  return Math.max(max, nodeValue);
}

function sizeOfTree(node) {
  const childrenOfNode = node.children;
  let size = 0;

  for (const childNode of childrenOfNode) {
    size += sizeOfTree(childNode);
  }
  return size + 1;
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
  const stack = new Array();
  let root = null;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element == -1) {
      stack.pop();
    } else {
      const tempNode = new Node();
      tempNode.value = element;
      if (stack.length > 0) {
        const firstStackElement = stack[stack.length - 1]; // replicate peek
        firstStackElement.children.push(tempNode);
      } else {
        root = tempNode;
      }
      stack.push(tempNode);
    }
  }

  console.log(getMaxOfTree(root));
  // display(root);
  // const sizeOfTreeVal = sizeOfTree(root);
  // console.log(sizeOfTreeVal);
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
