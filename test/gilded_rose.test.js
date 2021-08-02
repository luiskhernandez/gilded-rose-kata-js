const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  describe("Normal items", () => {
    it("should take the correct name", function () {
      const initialSellIn = 10;
      const initialQuality = 20;

      const gildedRose = new Shop([
        new Item("+5 Dexterity Vest", initialSellIn, initialQuality),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("+5 Dexterity Vest");
    });

    it("should decrease sellIn and quality on a normal item", function () {
      const initialSellIn = 10;
      const initialQuality = 20;

      const gildedRose = new Shop([
        new Item("+5 Dexterity Vest", initialSellIn, initialQuality),
      ]);

      for (let i = 0; i < initialSellIn; i++) {
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(initialSellIn - i - 1);
        expect(items[0].quality).toBe(initialQuality - i - 1);
      }
    });

    it("should decrease quality twice on a item with a sellIn < 0", function () {
      // Creating the expected data
      // Initial passed days = 0
      // Qualities = 8-6-4
      const expectedData = [
        { sellIn: 0, quality: 8 },
        { sellIn: -1, quality: 6 },
        { sellIn: -2, quality: 4 },
      ];

      const initialItem = new Item("+5 Dexterity Vest", 0, 8);
      const gildedRose = new Shop([initialItem]);

      expectedData.map((result) => {
        expect(initialItem.quality).toBe(result.quality);
        expect(initialItem.sellIn).toBe(result.sellIn);
        gildedRose.updateQuality();
      });
    });

    it("should stop decreasing minimun quality on 0 and continue decreasing sell in days", function () {
      // Creating the expected data
      // Initial passed days = 0
      // Qualities = 8-6-4
      const expectedData = [
        { sellIn: 0, quality: 0 },
        { sellIn: -1, quality: 0 },
        { sellIn: -2, quality: 0 },
      ];

      const initialItem = new Item("+5 Dexterity Vest", 0, 0);
      const gildedRose = new Shop([initialItem]);

      expectedData.map((result) => {
        expect(initialItem.quality).toBe(0);
        expect(initialItem.sellIn).toBe(result.sellIn);
        gildedRose.updateQuality();
      });
    });
  });

  describe("Aged items", () => {
    it("should decrease sellIn and increase the quality on a aged item", function () {
      const expectedData = [
        { sellIn: 10, quality: 20 },
        { sellIn: 9, quality: 21 },
        { sellIn: 8, quality: 22 },
      ];
      const initialItem = new Item("Aged Brie", 10, 20);
      const gildedRose = new Shop([initialItem]);

      expectedData.forEach((expectedValues) => {
        expect(initialItem.sellIn).toBe(expectedValues.sellIn);
        expect(initialItem.quality).toBe(expectedValues.quality);
        gildedRose.updateQuality();
      });
    });

    it("should decrease sellIn and increase the quality twice once the sellIn is less than 0 on a aged item", function () {
      const expectedData = [
        { sellIn: 0, quality: 20 },
        { sellIn: -1, quality: 22 },
        { sellIn: -2, quality: 24 },
      ];
      const initialItem = new Item("Aged Brie", 0, 20);
      const gildedRose = new Shop([initialItem]);

      expectedData.forEach((expectedValues) => {
        expect(initialItem.sellIn).toBe(expectedValues.sellIn);
        expect(initialItem.quality).toBe(expectedValues.quality);
        gildedRose.updateQuality();
      });
    });

    it("should decrease sellIn and stop increasing the quality on a aged item on 50", function () {
      const expectedData = [
        { sellIn: 0, quality: 49 },
        { sellIn: -1, quality: 50 },
        { sellIn: -2, quality: 50 },
      ];
      const initialItem = new Item("Aged Brie", 0, 49);
      const gildedRose = new Shop([initialItem]);

      expectedData.forEach((expectedValues) => {
        expect(initialItem.sellIn).toBe(expectedValues.sellIn);
        expect(initialItem.quality).toBe(expectedValues.quality);
        gildedRose.updateQuality();
      });
    });
  });


  describe("Sulfuras items", () => {
    it("should NOT decrease sellIn nor quality on a sulfuras item", function () {
      const expectedData = [
        { sellIn: 0, quality: 49 },
        { sellIn: 0, quality: 49 },
        { sellIn: 0, quality: 49 },
      ];
      const initialItem = new Item("Sulfuras, Hand of Ragnaros", 0, 49);
      const gildedRose = new Shop([initialItem]);

      expectedData.forEach((expectedValues) => {
        expect(initialItem.sellIn).toBe(expectedValues.sellIn);
        expect(initialItem.quality).toBe(expectedValues.quality);
        gildedRose.updateQuality();
      });
    });
  })

  describe("Backstage passes items", () => {
    describe("Quality should increases according to the selling time", () => {
      it("When the sellIn is over 10", function () {
        const expectedData = [
          { sellIn: 13, quality: 20 },
          { sellIn: 12, quality: 21 },
          { sellIn: 11, quality: 22 },
          { sellIn: 10, quality: 23 },
        ];
        const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 13, 20);
        const gildedRose = new Shop([initialItem]);
  
        expectedData.forEach((expectedValues) => {
          expect(initialItem.sellIn).toBe(expectedValues.sellIn);
          expect(initialItem.quality).toBe(expectedValues.quality);
          gildedRose.updateQuality();
        });
      });

      it("When the sellIn is 10 days or less it should icrease by 2 per day", function () {
        const expectedData = [
          { sellIn: 10, quality: 20 },
          { sellIn: 9, quality: 22 },
          { sellIn: 8, quality: 24 },
          { sellIn: 7, quality: 26 },
          { sellIn: 6, quality: 28 },
          { sellIn: 5, quality: 30 },
        ];
        const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
        const gildedRose = new Shop([initialItem]);
  
        expectedData.forEach((expectedValues) => {
          expect(initialItem.sellIn).toBe(expectedValues.sellIn);
          expect(initialItem.quality).toBe(expectedValues.quality);
          gildedRose.updateQuality();
        });
      });

      it("When the sellIn is 5 days or less it should icrease by 3 per day", function () {
        const expectedData = [
          { sellIn: 5, quality: 20 },
          { sellIn: 4, quality: 23 },
          { sellIn: 3, quality: 26 },
          { sellIn: 2, quality: 29 },
          { sellIn: 1, quality: 32 },
        ];
        const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
        const gildedRose = new Shop([initialItem]);
  
        expectedData.forEach((expectedValues) => {
          expect(initialItem.sellIn).toBe(expectedValues.sellIn);
          expect(initialItem.quality).toBe(expectedValues.quality);
          gildedRose.updateQuality();
        });
      });


      it("When the sellIn is 0 days or less it should be 0", function () {
        const expectedData = [
          { sellIn: 1, quality: 20 },
          { sellIn: 0, quality: 23 },
          { sellIn: -1, quality: 0 },
        ];
        const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20);
        const gildedRose = new Shop([initialItem]);
  
        expectedData.forEach((expectedValues) => {
          expect(initialItem.sellIn).toBe(expectedValues.sellIn);
          expect(initialItem.quality).toBe(expectedValues.quality);
          gildedRose.updateQuality();
        });
      });
    })
  })
});
