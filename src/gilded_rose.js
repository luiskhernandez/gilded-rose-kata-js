const TYPES = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured'
}


class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(element => {
      switch (element.name) {
        case TYPES.AGED_BRIE:
          element.sellIn--
          if (element.sellIn < 0) {
            element.quality = element.quality + 2
          } else {
            element.quality++
          }
          if (element.quality > 50) {
            element.quality = 50
          }
          break;

        case TYPES.BACKSTAGE:
          element.sellIn--
          if (element.sellIn >= 10) {
            element.quality++
          }
          if (element.sellIn < 10 && element.sellIn >= 6) {
            element.quality = element.quality + 2
          }
          if (element.sellIn < 5 && element.sellIn >= 0) {
            element.quality = element.quality + 3
          }
          if (element.sellIn < 0) {
            element.quality = 0
          }
          if (element.quality > 50) {
            element.quality = 50
          }
          break;

        case TYPES.SULFURAS:
          break;

        case TYPES.CONJURED:
          element.sellIn--
          if (element.sellIn < 0) {
            element.quality = element.quality - 4
          } else {
            element.quality = element.quality - 2
          }
          break;

        default:
          element.sellIn--
          if (element.sellIn < 0) {
            element.quality = element.quality - 2
          } else {
            element.quality--
          }
      }

      if (element.quality < 0) {
        element.quality = 0
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
