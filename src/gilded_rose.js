const ITEMS_TYPES = {
  AGED_BRICE: "Aged Brie",
  BACKSTAGE_CONCERT: "Backstage passes to a TAFKAL80ETC concert",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  CONJURED: "Conjured",
};

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
    for (let i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case ITEMS_TYPES.SULFURAS:
          continue;

        case ITEMS_TYPES.BACKSTAGE_CONCERT: {
          if (this.items[i].sellIn > 0) {
            if (this.items[i].sellIn < 6) {
              this.items[i].quality += 3;
            } else if (this.items[i].sellIn < 11) {
              this.items[i].quality += 2;
            }
            else {
              this.items[i].quality = this.items[i].quality + 1;
            }
          } else {
            this.items[i].quality = 0;
          }
          this.items[i].sellIn--;
          break;
        }

        case ITEMS_TYPES.AGED_BRICE:
          {
            this.items[i].sellIn--;
            this.items[i].quality += this.items[i].sellIn < 0 ? 2 : 1;
          }
          break;
        case ITEMS_TYPES.CONJURED:
          {
            this.items[i].sellIn--;
            this.items[i].quality -= 2;
            if (this.items[i].quality < 0) {
              this.items[i].quality = 0;
            }
          }
          break
        default: {
          this.items[i].sellIn--;
          this.items[i].quality -= this.items[i].sellIn < 0 ? 2 : 1;
          if (this.items[i].quality < 0) {
            this.items[i].quality = 0;
          }
        }
      }

      if (this.items[i].quality > 50) {
        this.items[i].quality = 50;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
