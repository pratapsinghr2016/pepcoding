function Node(value) {
  this.value = value;
  this.children = [];
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

function deserializeNaryTree(str) {
  const arr = str.split(",");
}

function serializeNaryTree(root) {
  let str = root ? `${root.value},` : "";
  function helper(node) {
    for (const childNode of node.children) {
      str += childNode.value + ",";
      helper(childNode);
    }
    str += "null,";
  }

  helper(root);
  return str;
}

function tree(array) {
  const stack = new Array();
  let root = null;

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element == null) {
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

  // display(root);
  const serializeRes = serializeNaryTree(root);
  // console.log(serializeRes);
  const deserializeRes = deserializeNaryTree(serializeRes);
}

const arr = [
  10,
  20,
  50,
  null,
  60,
  null,
  null,
  30,
  70,
  null,
  80,
  110,
  null,
  120,
  null,
  null,
  90,
  null,
  null,
  40,
  100,
  null,
  null,
  null,
];

tree(arr);
