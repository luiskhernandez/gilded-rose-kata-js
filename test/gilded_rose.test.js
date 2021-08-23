const {Shop, Item} = require('../src/gilded_rose')

const NAME_OF_ITEMS = {
  AGED_BRIE: 'Aged Brie',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED: 'Conjured Mana Cake',
}

describe('Gilded Rose', function() {
  it('At the end of each day our system lowers both values for every item', () => {
    const gildedRose = new Shop([new Item('Item 1', 5, 6)])
    const items = gildedRose.updateQuality()
    const { sellIn, quality } = items[0]

    expect(sellIn).toBe(4)
    expect(quality).toBe(5)
  })

  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new Shop([new Item('Item 1', 1, 6)])
    gildedRose.updateQuality()
    const items = gildedRose.updateQuality()
    const { sellIn, quality } = items[0]

    expect(sellIn).toBe(-1)
    expect(quality).toBe(3)
  })

  it('The Quality of an item is never negative', () => {
    const gildedRose = new Shop([new Item('Item 1', 1, 1)])
    gildedRose.updateQuality()
    const items = gildedRose.updateQuality()
    const { sellIn, quality } = items[0]

    expect(sellIn).toBe(-1)
    expect(quality).toBe(0)
  })

  describe(NAME_OF_ITEMS.AGED_BRIE, () => {
    it('The Quality must not be older than 50', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.AGED_BRIE, 1, 50)])
      const items = gildedRose.updateQuality()
      const { quality } = items[0]

      expect(quality).toBe(50)
    })

    it('increases in Quality by 1 the older it gets', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.AGED_BRIE, 1, 1)])
      const items = gildedRose.updateQuality()
      const { sellIn, quality } = items[0]

      expect(sellIn).toBe(0)
      expect(quality).toBe(2)
    })
  
    it('increases in Quality by 2 the older it gets, when sellIn is negative', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.AGED_BRIE, 0, 1)])
      const items = gildedRose.updateQuality()
      const { sellIn, quality } = items[0]

      expect(sellIn).toBe(-1)
      expect(quality).toBe(3)
    })
  })

  describe(NAME_OF_ITEMS.SULFURAS, () => {
    it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.SULFURAS, 1, 50)])
      const items = gildedRose.updateQuality()
      const { sellIn, quality } = items[0]

      expect(sellIn).toBe(1)
      expect(quality).toBe(50)
    })
  })

  describe(NAME_OF_ITEMS.BACKSTAGE, () => {
    it('The Quality must not be older than 50', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.BACKSTAGE, 2, 49)])
      const items = gildedRose.updateQuality()
      const { quality } = items[0]

      expect(quality).toBe(50)
    })

    it('Quality increases by 1 when there are 11 days or more', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.BACKSTAGE, 12, 11)])
      const items = gildedRose.updateQuality()
      const { sellIn, quality } = items[0]

      expect(sellIn).toBe(11)
      expect(quality).toBe(12)
    })

    it('Quality increases by 2 when there are 10 days or less', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.BACKSTAGE, 11, 11)])
      gildedRose.updateQuality()
      let items = gildedRose.updateQuality()
      let { sellIn, quality } = items[0]

      expect(sellIn).toBe(9)
      expect(quality).toBe(14)

      items = gildedRose.updateQuality()
      expect(items[0].sellIn).toBe(8)
      expect(items[0].quality).toBe(16)
    })

    it('Quality increases by 3 when there are 5 days', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.BACKSTAGE, 5, 11)])
      let items = gildedRose.updateQuality()
      let { sellIn, quality } = items[0]

      expect(sellIn).toBe(4)
      expect(quality).toBe(14)
    })

    it('Quality increases by 3 when there are lesser than 5 days', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.BACKSTAGE, 3, 11)])
      let items = gildedRose.updateQuality()
      let { sellIn, quality } = items[0]

      expect(sellIn).toBe(2)
      expect(quality).toBe(14)
    })

    it('Quality must be 0 when sellIn is negative', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.BACKSTAGE, 0, 11)])
      let items = gildedRose.updateQuality()
      let { sellIn, quality } = items[0]
 
      expect(sellIn).toBe(-1)
      expect(quality).toBe(0)
    })
  })

  describe(NAME_OF_ITEMS.CONJURED, () => {
    it('Items degrade in Quality twice as fast as normal items', () => {
      const gildedRose = new Shop([new Item(NAME_OF_ITEMS.CONJURED, 2, 2)])
      const items = gildedRose.updateQuality()
      const { quality } = items[0]

      expect(quality).toBe(0)
    })
  })
})
