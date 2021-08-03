const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  it("Jest running...", () => {
    expect(1).toBe(1);
  });
  it("The item name should be foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

// describe("Create Shop", () => {

//   it("The Quality of an item is never negative", () => {
//     const gildedRose = new Shop([new Item("foo", 4, -1)]);
//     gildedRose.updateQuality();
//     expect(gildedRose.items[0].quality).toBe(0);
//     gildedRose.updateQuality();
//     expect(gildedRose.items[0].quality).toBe(0);
//   });

// });

describe("Update Quality function", () => {
  it("Dayli decrements", () => {
    const gildedRose = new Shop([new Item("foo", 4, 7)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(3);
    expect(gildedRose.items[0].quality).toBe(6);
  });
  
  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new Shop([new Item("foo", 1, 9)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(6);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(2);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new Shop([new Item("foo", 4, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("Aged Brie actually increases in Quality the older it gets", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 4, 1)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].name).toBe("Aged Brie");
    expect(gildedRose.items[0].quality).toBe(2);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(3);
  });

  it("The Quality of an item is never more than 50 for Aged Brie item", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 4, 49)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 25)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(25);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(25);
  });

  describe("Backstage passes increases in Quality as its SellIn value approaches", () => {
    it("Quality increases by 2 when there are 10 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 24)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(11);
      expect(gildedRose.items[0].quality).toBe(25);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(10);
      expect(gildedRose.items[0].quality).toBe(26);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
      expect(gildedRose.items[0].quality).toBe(28);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(8);
      expect(gildedRose.items[0].quality).toBe(30);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(7);
      expect(gildedRose.items[0].quality).toBe(32);
    });

    it("Quality increases by 3 when there are 5 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 7, 24)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(6);
      expect(gildedRose.items[0].quality).toBe(26);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(5);
      expect(gildedRose.items[0].quality).toBe(28);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(4);
      expect(gildedRose.items[0].quality).toBe(31);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(3);
      expect(gildedRose.items[0].quality).toBe(34);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(2);
      expect(gildedRose.items[0].quality).toBe(37);
    });

    it("Quality increases by 3 when there are 5 days or less", () => {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(23);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

});
