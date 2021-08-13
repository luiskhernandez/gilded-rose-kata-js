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
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") return item.quality = 80;

      switch (item.name) {
        case "Aged Brie":
          item.sellIn--;
          item.quality++;
          if (item.sellIn < 0) item.quality++;
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn > 10) {
            item.quality++;
          } else if (item.sellIn > 5 && item.sellIn <= 10) {
            item.quality = item.quality + 2;
          } else if (item.sellIn > 0 && item.sellIn <= 5) {
            item.quality = item.quality + 3;
          } else {
            item.quality = 0;
          }
          break;
        default:
          item.sellIn--;
          item.quality--;
          if (item.name === "Conjured Mana Cake") item.quality--;
        
          if (item.sellIn < 0) {
            item.quality--;
            if (item.name === "Conjured Mana Cake") item.quality--;
          }
          if (item.quality < 0) item.quality = 0;
          break;
      }
      
      if (item.quality > 50) item.quality = 50;
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
