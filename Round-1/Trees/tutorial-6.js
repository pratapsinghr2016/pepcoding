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

function removeLeafNodes(node) {
  for (let index = node.children.length - 1; index >= 0; index--) {
    const childNode = node.children[index];
    if (childNode.children.length === 0) {
      // remove that element from children
      let tempNode = node.children.filter(
        (nodeItem) => nodeItem.id !== childNode.id
      );
      node.children = [...tempNode];
    }
  }

  for (const childNode of node.children) {
    removeLeafNodes(childNode);
  }
}

function getLastNodeInRail(node) {
  while (node.children.length === 1) {
    node = node.children[0];
  }
  return node;
}

function linearized(node) {
  while (node.children.length > 1) {
    const lastChildRail = node.children.pop();
    const secondLastChildRail = node.children[node.children.length - 1];
    const lastNodeInSecondLastRail = getLastNodeInRail(secondLastChildRail);
    lastNodeInSecondLastRail.children.push(lastChildRail);
  }

  for (const childNode of node.children) {
    linearized(childNode);
  }
}

function linearized2(node) {
  if (node.children.length === 0) {
    return node;
  }

  const lastNodeTail = linearized2(node.children[node.children.length - 1]);

  while (node.children.length > 1) {
    const lastChildRail = node.children.pop();
    const secondLastChildRail = node.children[node.children.length - 1];
    const tailOfSecondLastChildRail = linearized2(secondLastChildRail);
    tailOfSecondLastChildRail.children.push(lastChildRail);
  }

  return lastNodeTail;
}

function findNode(node, value) {
  if (node.value === value) {
    return true;
  }

  for (const childNode of node.children) {
    const result = findNode(childNode, value);
    if (result) {
      return true;
    }
  }

  return false;
}

function nodeToRootPath(node, item, path = []) {
  if (node.value === item) {
    path.push(node.value);
    return path;
  }

  for (const childNode of node.children) {
    const previousPath = nodeToRootPath(childNode, item, path);
    if (previousPath.length > 0) {
      path.push(node.value);
      return path;
    }
  }

  return path;
}

function lowestCommonAncestor(node, item1, item2) {
  const p1 = nodeToRootPath(node, item1);
  const p2 = nodeToRootPath(node, item2);

  let i = p1.length - 1;
  let j = p2.length - 1;

  while (i >= 0 && j >= 0 && p1[i] == p2[j]) {
    i--;
    j--;
  }
  i++;
  return p1[i];
}

function edgeDistanceBetweenTwoNode(node, item1, item2) {
  const p1 = nodeToRootPath(node, item1);
  const p2 = nodeToRootPath(node, item2);

  let i = p1.length - 1;
  let j = p2.length - 1;

  while (i >= 0 && j >= 0 && p1[i] == p2[j]) {
    i--;
    j--;
  }

  i++;
  j++;

  return i + j;
}

function treesAreSimilar(node1, node2) {
  if (node1.children.length !== node2.children.length) {
    return false;
  }

  for (let index = 0; index < node1.children.length; index++) {
    const child1 = node1.children[index];
    const child2 = node2.children[index];
    const response = treesAreSimilar(child1, child2);
    if (response == false) {
      return false;
    }
  }

  return true;
}

function treesAreMirror(node1, node2) {
  if (node1.children.length !== node2.children.length) {
    return false;
  }

  for (let index = 0; index < node1.children.length; index++) {
    let j = node2.children.length - index - 1;
    const c1 = node1.children[index];
    const c2 = node2.children[j];
    if (treesAreMirror(c1, c2) === false) {
      return false;
    }
  }
  return true;
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
  // removeLeafNodes(root);
  // linearized(root);
  // linearized2(root);
  // display(root);
  // console.log(findNode(root, 110));
  // console.log(nodeToRootPath(root, 110));
  // console.log(lowestCommonAncestor(root, 110, 100));
  // console.log(edgeDistanceBetweenTwoNode(root, 110, 70));
  // console.log(treesAreSimilar(root, root));
  console.log(treesAreMirror(root, root));
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
