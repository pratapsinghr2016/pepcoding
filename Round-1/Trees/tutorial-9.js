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

function treeIterator(node) {
  let iterable = {
    [Symbol.iterator]: function () {
      let stack = [node];

      return {
        next: function () {
          let currentNode = stack.pop();

          if (currentNode) {
            // The concat acts like a push of all the child nodes onto the stack.
            stack = stack.concat(currentNode.children);
            return { value: currentNode.value, done: false };
          } else {
            return { value: undefined, done: true };
          }
        },
      };
    },
  };
  return iterable;
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

  for (const iteratorObj of treeIterator(root)) {
    console.log(iteratorObj);
  }
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
