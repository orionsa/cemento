import { faker } from "@faker-js/faker";

const rand = () => Math.random() < 0.5;

const animals = ["dog", "cat", "fish"];
const lastNames = ["smith", 'reynolds', 'Anderson'];
const intParams = { min: 0, max: 5 };
const genders = ["male", "female", "other"];

export const columns = [
  {
    id: "lastName",
    ordinalNo: 1,
    title: "Last Name",
    type: "string",
    width: 200
  },
  {
    id: "firstName",
    ordinalNo: 2,
    title: "First Name",
    type: "string",
    width: 200
  },
  {
    id: "favoriteNumber",
    ordinalNo: 3,
    title: "Favorite Number",
    type: "number",
    width: 150,
  },
  {
    id: "favoriteAnimal",
    ordinalNo: 4,
    title: "Favorite Pet",
    type: "select",
    options: animals,
  },
  {
    id: "hasPet",
    ordinalNo: 5,
    title: "Has Pet",
    type: "boolean",
  },
  {
    id: "gender",
    ordinalNo: 6,
    title: "Gender",
    type: "select",
    options: genders,
  },
  {
    id: "avatar",
    ordinalNo: 0,
    title: "Avatar",
    type: "image",
    width: 50,
  },
];

export const generateUser = () => {
  const user = {
    id: faker.database.mongodbObjectId(),
    avatar: rand() ? faker.image.avatar() : null,
    firstName: faker.person.firstName(),
    lastName: faker.helpers.arrayElement(lastNames),
    favoriteNumber: faker.number.int(intParams),
    favoriteAnimal: faker.helpers.arrayElement(animals),
    hasPet: rand(),
    gender: genders[Math.floor(Math.random() * 3)],
  };

  if (rand()) {
    user.avatar = faker.image.avatar();
  }
  return user;
};

export const getUsers = (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    users.push(generateUser());
  }
  return users;
};

export const groupByKeys = [
  {id: columns[0].id, title: columns[0].title},
  ...columns
    .filter((c) => c.type === "select" || c.type === "boolean" || c.type === "number")
    .map(({ id, title }) => ({ id, title })),
];
