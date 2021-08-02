const { Shop, Item } = require("../src/gilded_rose");

expect.extend({
  toHaveThisValuesInDays(initialItem, expectedArray) {
    const store = new Shop([initialItem]);
    const results = expectedArray.map((expectedValue) => {
      const result = (initialItem.quality === expectedValue.quality &&
        initialItem.sellIn === expectedValue.sellIn)
      store.updateQuality();
      return result;
    });
    return {
      pass: results.every((val) => val),
      message:() => "FAIL"
    }
  }
})

describe("Gilded Rose", function () {
  describe("Items", () => {
    it("Should create", () => {
      const item = new Item("+5 Dexterity Vest", 0, 0);
      expect(item).toBeTruthy();
    });

    describe("Initials properties", () => {
      it("Initials properties", () => {
        const item = new Item("+5 Dexterity Vest", 0, 0);
        expect(item.name).toBe("+5 Dexterity Vest");
        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(0);
      });
    })
  })

  describe("Shops", () => {
    it("Should create", () => {
      const item = new Item("+5 Dexterity Vest", 0, 0);
      const store = new Shop([item])
      expect(store).toBeTruthy();
    });

    it("Should the correct quantity of items", () => {
      const item1 = new Item("+5 Dexterity Vest", 0, 0);
      const item2 = new Item("+5 Dexterity Vest", 0, 0);
      const item3 = new Item("+5 Dexterity Vest", 0, 0);
      const store = new Shop([item1, item2, item3])
      expect(store.items.length).toBe(3);
    });
  })


  describe("Normal items", () => {
    it("should decrease sellIn and quality on a normal item", function () {
      const expectedData = [
        { sellIn: 10, quality: 10 },
        { sellIn: 9, quality: 9 },
        { sellIn: 8, quality: 8 },
      ];

      const initialItem = new Item('testItem', 10, 10)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
    });

    it("should decrease quality twice on a item with a sellIn < 0", function () {
      const expectedData = [
        { sellIn: 0, quality: 8 },
        { sellIn: -1, quality: 6 },
        { sellIn: -2, quality: 4 },
      ];
      const initialItem = new Item('+5 Dexterity Vest', 0, 8)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
    });

    it("should stop decreasing minimun quality on 0 and continue decreasing sell in days", function () {
      const expectedData = [
        { sellIn: 0, quality: 0 },
        { sellIn: -1, quality: 0 },
        { sellIn: -2, quality: 0 },
      ];
      const initialItem = new Item('+5 Dexterity Vest', 0, 0)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
    });
  });

  describe("Aged items", () => {
    it("should decrease sellIn and increase the quality on a aged item", function () {
      const expectedData = [
        { sellIn: 10, quality: 20 },
        { sellIn: 9, quality: 21 },
        { sellIn: 8, quality: 22 },
      ];
      const initialItem = new Item("Aged Brie", 10, 20)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
    });

    it("should decrease sellIn and increase the quality twice once the sellIn is less than 0 on a aged item", function () {
      const expectedData = [
        { sellIn: 0, quality: 20 },
        { sellIn: -1, quality: 22 },
        { sellIn: -2, quality: 24 },
      ];
      const initialItem = new Item("Aged Brie", 0, 20)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
    });

    it("should decrease sellIn and stop increasing the quality on a aged item on 50", function () {
      const expectedData = [
        { sellIn: 0, quality: 49 },
        { sellIn: -1, quality: 50 },
        { sellIn: -2, quality: 50 },
      ];
      const initialItem = new Item("Aged Brie", 0, 49)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
    });
  });


  describe("Sulfuras items", () => {
    it("should NOT decrease sellIn nor quality on a sulfuras item", function () {
      const expectedData = [
        { sellIn: 0, quality: 49 },
        { sellIn: 0, quality: 49 },
        { sellIn: 0, quality: 49 },
      ];
      const initialItem = new Item("Sulfuras, Hand of Ragnaros", 0, 49)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
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
      const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 13, 20)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
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
      const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
      });

      it("When the sellIn is 5 days or less it should icrease by 3 per day", function () {
        const expectedData = [
          { sellIn: 5, quality: 20 },
          { sellIn: 4, quality: 23 },
          { sellIn: 3, quality: 26 },
          { sellIn: 2, quality: 29 },
          { sellIn: 1, quality: 32 },
        ];
      const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
      });


      it("When the sellIn is 0 days or less it should be 0", function () {
        const expectedData = [
          { sellIn: 1, quality: 20 },
          { sellIn: 0, quality: 23 },
          { sellIn: -1, quality: 0 },
        ];
      const initialItem = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20)
      expect(initialItem).toHaveThisValuesInDays(expectedData)
      });
    })
  })
});
