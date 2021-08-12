const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  describe("Regular Items", function () {
    it("should foo", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("foo");
    });
    it("should foo decrease sellIn and quality on 1", function () {
      const gildedRose = new Shop([new Item("foo", 10, 8)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9)
      expect(items[0].quality).toBe(7)
    })
    it("should foo decrease quality on 2, if the sellIn already happen", function () {
      const gildedRose = new Shop([new Item("foo", -1, 8)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6)
    })
    it("should foo quality never be negative", function () {
      const gildedRose = new Shop([new Item("foo", -1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0)
    })
    it("should foo quality never be negative", function () {
      const gildedRose = new Shop([new Item("foo", -1, -1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0)
    })
  })
  describe("Special Items", function () {
    it("The Quality of an item is never more than 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 50), new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9)
      expect(items[0].quality).toBe(50)
      expect(items[1].sellIn).toBe(14)
      expect(items[1].quality).toBe(50)
    })
    it("The Quality of an item is never more than 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 63)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9)
      expect(items[0].quality).toBe(50)
    })
    describe("Aged Brie", function () {
      it("Aged Brie actually increases in Quality the older it gets", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 10, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9)
        expect(items[0].quality).toBe(6)
      })
      it("luego de la `fecha de venta` su `calidad` aumenta `2` unidades por día", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1)
        expect(items[0].quality).toBe(7)
      })
    })
    describe("Sulfuras", function () {
      it("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", function () {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 12)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(10)
        expect(items[0].quality).toBe(12)
      })
    })
    describe("Backstage passes", function () {
      it("Backstage passes, like aged brie, increases in Quality as its SellIn value approaches;", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 12)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(19)
        expect(items[0].quality).toBe(13)
      })
      it("Backstage passes, Quality increases by 2 when there are 10 days or less", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 12)]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(9)
        expect(items[0].quality).toBe(14)
        gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(8)
        expect(items[0].quality).toBe(16)
      })
      it("Backstage passes, quality increases by 3 when there are 5 days or less", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 12)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(4)
        expect(items[0].quality).toBe(15)
        gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(3)
        expect(items[0].quality).toBe(18)
      })
      it("Backstage passes, quality drops to 0 after the concert", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 12)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(-1)
        expect(items[0].quality).toBe(0)
      })
    })
    describe("Backstage passes", function () {
      it("Conjured items degrade in Quality twice as fast as normal items", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6), new Item("Conjured Mana Cake", -1, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(2)
        expect(items[0].quality).toBe(4)
        expect(items[1].sellIn).toBe(-2)
        expect(items[1].quality).toBe(4)
      })
    })
  })
});