export const get = (key) => {
  const string = window.localStorage.getItem(key);
  return JSON.parse(string);
}

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}