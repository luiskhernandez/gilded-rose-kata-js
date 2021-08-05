const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should decrement quality and sellIn", function () {
    const gildedRose = new Shop([new Item("foo", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
  });

  it("should decrement quality double after sellIn date", () => {
    const gildedRose = new Shop([new Item("foo", 2, 10)]);

    let items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(6);

    items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(4);
  });

  it("quality is never negative", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  describe("Aged brie", () => {
    it("should increase quality by 1 each day", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);

      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });

    it("should increase quality by 2 each day after sellIn", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);

      let items = gildedRose.updateQuality();
      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(13);
    });
  });

  it("should never increase quality more than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should never change sellIn or decrease quality of sulfuras", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 20),
    ]);

    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(20);
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    it("should increase in Quality as its SellIn value approaches", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      ]);

      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
    });

    it("should increase by 2 when there are 10 days or less", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ]);

      let items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(22);

      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(24);
    });

    it("should increase by 3 when there are 5 days or less", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ]);

      let items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(23);

      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(26);
    });

    it("should decrease 'Conjured Mana Cake' quality the double than regular items", () => {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 1, 20)]);

      let items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(18);

      items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(14);
    });
  });
});
