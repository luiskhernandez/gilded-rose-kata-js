class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  validators = {
    'Aged Brie': (item) => item.sellIn < 0 ? 2 : 1,
    'Backstage passes to a TAFKAL80ETC concert': (item) => (
      item.sellIn > 10
        ? 1 : item.sellIn > 5
        ? 2 : item.sellIn > 0
        ? 3 : -item.quality
    ),
    'Conjured Mana Cake': (item) => item.sellIn > 0 ? -2 : -4,
    default: (item) => item.sellIn > 0 ? -1 : -2,
  };
  updateQuality() {
    this.items.forEach((item) => {
      if(item.name === "Sulfuras, Hand of Ragnaros") return;
      const qualityDiff = (this.validators[item.name] || this.validators.default)(item);
      item.sellIn--;

      item.quality = item.quality + qualityDiff < 0
        ? 0 : item.quality + qualityDiff > 50
        ? 50: item.quality + qualityDiff;
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
