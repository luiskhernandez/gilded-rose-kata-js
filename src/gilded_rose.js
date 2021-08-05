class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateSellIn() {
    if (this.name === "Sulfuras, Hand of Ragnaros") return;

    this.sellIn = this.sellIn - 1;
  }

  updateItemQuality() {
    if (this.name === "Sulfuras, Hand of Ragnaros") return;

    const getValue = () => {
      if (this.name === "Aged Brie") {
        return this.sellIn < 0 ? 2 : 1;
      }

      if (this.name === "Backstage passes to a TAFKAL80ETC concert") {
        if (this.sellIn < 5) return 3;
        if (this.sellIn < 10) return 2;
        return 1;
      }

      if (this.name === "Conjured Mana Cake") {
        return this.sellIn < 0 ? -4 : -2;
      }

      return this.sellIn < 0 ? -2 : -1;
    };

    const value = getValue();

    if (this.quality > 0) {
      this.quality = this.quality + value;

      if (this.quality > 50) {
        this.quality = 50;
      }
    }
  }

  updateItem() {
    this.updateSellIn();
    this.updateItemQuality();
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      item.updateItem();
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
