const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this.#addNode(this.rootNode, data);
  }

  has(data) {
    return !!this.#findNode(data);
  }

  find(data) {
    return this.#findNode(data);
  }

  remove(data) {
    this.rootNode = this.#removeNode(this.rootNode, data);
  }

  min() {
    return this.#findValue("left");
  }

  max() {
    return this.#findValue("right");
  }


  #addNode(node, data) {
    if (!node) return new Node(data);
    const direction = data > node.data ? 'right' : 'left';
    node[direction] = this.#addNode(node[direction], data);
    return node;
  }

  #findNode(data) {
    let current = this.rootNode;
    while (current) {
      if (current.data === data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  #removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
    } else {
      // Удаляем узел
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const maxFromLeft = this.#node_Left_or_Right(node.left, "right");
      node.data = maxFromLeft.data;
      node.left = this.#removeNode(node.left, maxFromLeft.data);
    }
    return node;
  }

  #findValue(direction) {
    const extremeNode = this.#node_Left_or_Right(this.rootNode, direction);
    return extremeNode ? extremeNode.data : null;
  }

  #node_Left_or_Right(node, direction) {
    if (!node) return null;
    while (node[direction]) {
      node = node[direction];
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};