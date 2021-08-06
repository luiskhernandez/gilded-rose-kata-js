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
    this.items.forEach(element => {
      switch(element.name){
        case 'Aged Brie':
          element.sellIn--
          if(element.sellIn<0){
            element.quality=element.quality+2
          }else{
            element.quality++
          }
          if(element.quality>50){
            element.quality=50
          }
        break;

        case 'Backstage passes to a TAFKAL80ETC concert':
          element.sellIn--
          if(element.sellIn>=10){
            element.quality++
          }
          if(element.sellIn<10 && element.sellIn>=6){
            element.quality=element.quality+2
          }
          if(element.sellIn<5 && element.sellIn>=0){
            element.quality=element.quality+3
          }
          if(element.sellIn<0){
            element.quality=0
          }
          if(element.quality>50){
            element.quality=50
          }
        break;

        case 'Sulfuras, Hand of Ragnaros':
        break;

        default:
          element.sellIn--
          if(element.sellIn<0){
            element.quality=element.quality-2
          }else{
            element.quality--
          }
      }

      if(element.quality<0){
        element.quality=0
      }
    });
    
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
