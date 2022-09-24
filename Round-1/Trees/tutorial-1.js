class Node {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

const item1 = new Node();
item1.value = "root";
const item2 = new Node("child1");
const item3 = new Node("child3");
const item4 = new Node("child4");

item1.descendants.push(item2);
item2.descendants.push(item3, item4);

console.log(item1);
