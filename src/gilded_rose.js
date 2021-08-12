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

    this.items.forEach(item => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return this.items
      }
      item.sellIn--
      if (item.name === 'Aged Brie') {
        if (item.sellIn < 0) {
          item.quality = item.quality + 2
        } else {
          item.quality++
        }
      } else if (item.name.includes('Conjured')) {
        if (item.sellIn < 0) {
          item.quality = item.quality - 4
        } else {
          item.quality = item.quality - 2
        }
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn < 0) {
          item.quality = 0
        } else if (item.sellIn <= 5) {
          item.quality = item.quality + 3
        } else if (item.sellIn <= 10) {
          item.quality = item.quality + 2
        } else {
          item.quality++
        }
      } else {
        if (item.sellIn < 0) {
          item.quality = item.quality - 2
        } else {
          item.quality--
        }
      }
      if (item.quality < 1) {
        item.quality = 0
      }
      if (item.quality >= 49) {
        item.quality = 50
      }
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
