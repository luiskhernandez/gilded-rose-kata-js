
const { Shop, Item } = require("./gilded_rose");

const items = [
  // new Item("Sulfuras, Hand of Ragnaros", 0, 49),
  // new Item("+5 Dexterity Vest", 10, 20),
  // new Item("Aged Brie", 2, 0),
  // new Item("Elixir of the Mongoose", 5, 7),
  // new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  // new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
  // new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),

  // // This Conjured item does not work properly yet j
  // new Item("Conjured Mana Cake", 3, 6),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("Lest go!");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.table(items)
  gildedRose.updateQuality();
}
