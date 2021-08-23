const NAME_OF_ITEMS = {
  AGED_BRIE: 'Aged Brie',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED: 'Conjured Mana Cake',
}
class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []){
    this.items = items;
    this.validation = {
      [NAME_OF_ITEMS.AGED_BRIE]: (item) => {
        const quality = item.quality
        const sellIn = item.sellIn
        if (quality >= 50) {
          item.quality = 50
          return
        }

        item.quality = sellIn < 0 ? (quality + 2) : (quality + 1)
      },
      [NAME_OF_ITEMS.BACKSTAGE]: item => {
        const quality = item.quality
        item.quality = calculateQuality({ quality, sellIn: item.sellIn })

        function calculateQuality({ quality, sellIn }) {
          quality = sellIn <= 5 ? (quality + 3) : quality
          quality = sellIn < 10 && sellIn > 5 ? (quality + 2) : quality
          quality = sellIn >= 10 ? (quality + 1) : quality
          quality = sellIn < 0 ? 0 : quality

          return quality > 50 ? 50 : quality
        }

      },
      [NAME_OF_ITEMS.CONJURED]: item => {
        item.quality = item.quality - 2
      },
      default: item => {
        if (item.sellIn < 0) {
          const quality = item.quality
          item.quality = quality > 0 ? quality - 2 : 0
          return
        }
  
        item.quality--
      }
    }
  }

  updateQuality() {
    this.items.forEach(item =>{
      if (item.name === NAME_OF_ITEMS.SULFURAS) return
      item.sellIn--
      const validator = this.validation[item.name] || this.validation['default']
      validator(item)
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
