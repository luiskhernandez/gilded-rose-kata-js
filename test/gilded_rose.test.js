const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  it("Both sellIn and quality should decrease", function () {
    const sellIn = 10;
    const quality = 20;
    const gildedRose = new Shop([new Item("Elixir", sellIn, quality)]);
    const items = gildedRose.updateQuality()
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  })
  it("Once the sell by date has passed, Quality degrades twice as fast", function () {
    const newItem = [new Item("-Elixir", -1, 2)];
    const gildedRose = new Shop(newItem);
    expect(newItem[0].sellIn).toBe(-1);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(0);
  })
  it("The Quality of an item is never negative", function () {
    const newItem = [new Item("Perfection", 10, 0)];
    const gildedRose = new Shop(newItem);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  describe("Aged Brie", function () {
    it("increases in Quality the older it gets by 1", function () {
      const newItem = [new Item("Aged Brie", 2, 0)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    })
    it("increases in Quality the older it gets by 2 when sellIn is negative", function () {
      const newItem = [new Item("Aged Brie", -2, 0)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    })
    it("The Quality of an item is never more than 50", function () {
      const newItem = [new Item("Aged Brie", 2, 50)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    })
  })
  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function () {
    const newItem = [new Item("Sulfuras, Hand of Ragnaros", 2, 80)];
    const gildedRose = new Shop(newItem);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(80);
  })
  describe("Entrada al Backstage", function () {
    it("Quality increases by 1 like Aged Brie when there are more than 10 days", function () {
      const newItem = [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    })
    it("Quality increases by 2 when there are 10 days or less", function () {
      const newItem = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(22);
    })
    it("Quality increases by 3 when there are 5 days or less", function () {
      const newItem = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    })
    it("Quality drops to 0 after the concert", function () {
      const newItem = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    })
  })
  describe("Conjured", function () {
    it("Items degrade in Quality twice as fast as normal items (by 2 with positive sellIn)", function () {
      const newItem = [new Item("Conjured Mana Cake", 3, 6)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(4);
    })
    it("Items degrade in Quality twice as fast as normal items (by 4 with negative sellIn)", function () {
      const newItem = [new Item("Conjured Mana Cake", -3, 6)];
      const gildedRose = new Shop(newItem);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    })
  })
});
