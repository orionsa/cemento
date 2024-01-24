import { atom, selectorFamily, selector } from "recoil";
import { columns, groupByKeys } from "../utils/mockData";
import { generateSummary } from '../utils/helpers';

const filterKeys = columns
  .filter((col) => col.type === "string" || col.type === "number")
  .map(({ id }) => id);

export const dataState = atom({
  key: "data",
  default: null,
});

export const searchTextState = atom({
  key: "search",
  default: "",
});

export const selectedColumnsState = atom({
  key: "selectedFilters",
  default: new Set(columns.map((col) => col.title))
})

export const cellState = selectorFamily({
  key: "cell",
  default: "",
  get:
    (params) =>
    ({ get }) => {
      const data = get(dataState);
      const row = data.filter((r) => r.id === params.rowId)[0];
      const value = row[params.cellId];
      return value;
    },
  set:
    (params) =>
    ({ set }, newValue) => {
      set(dataState, (prevData) => {
        const copyData = [...prevData];
        const index = copyData.findIndex((r) => r.id === params.rowId);
        const copyObject = { ...copyData[index] };
        copyObject[params.cellId] = newValue;
        copyData[index] = copyObject;
        return copyData;
      });
    },
});

export const filteredDataState = selector({
  key: "filtered",
  get: ({ get }) => {
    const allData = get(dataState);

    if (!allData) return [];

    const search = get(searchTextState);
    const lowerCaseSearchText = search.toLowerCase();
    return allData.filter((obj) =>
      filterKeys.some((key) => {
        const value = obj[key];

        if (value !== undefined && value !== null) {
          const lowerCaseValue = String(value).toLowerCase();

          if (typeof value === "string" || typeof value === "number") {
            return lowerCaseValue.includes(lowerCaseSearchText);
          }
        }
        return false;
      })
    );
  },
});

export const groupedDataState = selector({
  key: 'groupedData', 
  get: ({ get }) => {
    const data = get(filteredDataState);
    if (!data) return;
    const map = new Map();
    for(let item of data) {
      if (map.has(item.lastName)) {
        map.set(item.lastName, [...map.get(item.lastName), item])
      } else {
        map.set(item.lastName, [item])
      }
    }
    const newData = []
    for (let [, value] of map) {
      const ids = groupByKeys.map(k => k.id);
      const summery = generateSummary(value, ids)
      newData.push({
        ...summery,
        children: value
      })
    }
    return newData;
  }
})
