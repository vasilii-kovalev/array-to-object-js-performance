import { bench, run } from "mitata";
/*
  Tests performance of turning an array of objects into an object with ids as keys and the objects as values.
  [object1, object2] -> { [object1.id]: object1, [object2.id]: object2 }
*/

const randomInteger = (min, max) => {
  const randomNumber = Math.random();

  return randomNumber * (max - min) + min;
};

const getItems = (size) => {
  return new Array(size).fill(null).map(() => {
    return {
      id: Math.random().toString(),
      name: Math.random().toString(),
      age: randomInteger(0, 100),
    };
  });
};

const size = 10_000;

const getItemsById1 = (items) => {
  return items.reduce(
    (
      itemsByIdCurrent,
      item,
    ) => {
      return {
        ...itemsByIdCurrent,
        [item.id]: item,
      };
    },
    {},
  );
};

const getItemsById2 = (items) => {
  return items.reduce(
    (
      itemsByIdCurrent,
      item,
    ) => {
      itemsByIdCurrent[item.id] = item;

      return itemsByIdCurrent;
    },
    {},
  );
};

const getItemsById3 = (items) => {
  const itemsByIdCurrent = {};

  for (const item of items) {
    itemsByIdCurrent[item.id] = item;
  }

  return itemsByIdCurrent;
};

// To disable the runtime from using caching, data reuse or other techniques, that can nudge the results.
const items1 = getItems(size);
const items2 = getItems(size);
const items3 = getItems(size);

bench(`reduce + spread (${size})`, () => {
  getItemsById1(items1);
});

bench(`reduce + mutation (${size})`, () => {
  getItemsById2(items2);
});

bench(`for-of + mutation (${size})`, () => {
  getItemsById3(items3);
});

run();
