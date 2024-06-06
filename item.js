const items = require("./datbs");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    items.push(this);
  }

  static seekAllItems() {
    return items;
  }

  static updateItem(name, data) {
    const retrievedItem = Item.findItem(name);
    retrievedItem.name = data.name;
    retrievedItem.price = data.price;
    return retrievedItem;
  }

  static findItem(name) {
    const retrievedItem = items.find(item => item.name === name);
    if (!retrievedItem) {
      throw { message: "Item not found", status: 404 };
    }
    return retrievedItem;
  }

  static deleteItem(name) {
    const foundIdx = items.findIndex(item => item.name === name);
    if (foundIdx === -1) {
      throw { message: "Item not found", status: 404 };
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;

