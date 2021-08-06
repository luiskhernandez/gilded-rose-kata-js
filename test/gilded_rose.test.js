const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("both values lower by 1", function() {
    const gildedRose = new Shop([new Item("foo", 10, 8)]);
    const items = gildedRose.updateQuality();    
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(7);
  });

  it("quality degrades 2x after sell by date has passed", function() {
    const gildedRose = new Shop([new Item("foo", 0, 4)]);
    const items = gildedRose.updateQuality();    
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(-1);
  });

  it("quality of item is never negative", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();    
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  describe("Aged brie tests", function(){
    it("aged brie increases in quality over time", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 0)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(1);
    });
  
    it("aged brie increases in quality 2x after expire date", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(2);
    });

    it("article quality is never over 50", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(50);
    });
  })

  describe("Sulfuras tests", function(){   
    it("sulfuras never has to be sold or decreases in quality", function() {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 20, 20)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(20);
      expect(items[0].quality).toBe(20);
    });
  })

  describe("Backstage passes tests", function(){   
    it("backstage passes increases quality by 1 if more than 10 days remaining", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(11);
    });

    it("backstage passes increases quality by 2 if less than 10 days remaining", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
      let items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(12);
      items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(14);
    });

    it("backstage passes increases quality by 3 if less than 5 days remaining", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
      let items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(13);
      items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(16);
    });

    it("backstage passes values becomes 0 after sell date", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    it("article quality is never over 50", function() {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)]);
      const items = gildedRose.updateQuality();    
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(50);
    });
  })


  
});

