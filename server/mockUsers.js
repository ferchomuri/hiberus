import { faker } from "@faker-js/faker";

const mockUser = {
  fullName: "John Doe",
  email: "john.doe@mail.com",
  password: "12345678",
  role: "user",
};

export const mockLoginUsers = [mockUser];

export function generateListMovies(moviesNum = 10) {
  const listMovies = [];

  for (let i = 0; i < moviesNum; i++) {
    listMovies.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      genre: faker.helpers.arrayElement(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']),
      description: faker.lorem.paragraph(),
      poster: faker.image.url(640, 480, true),
      rating: faker.number.int({ min: 1, max: 5 }),
      releaseDate: faker.date.past(),
      usersRated: faker.number.int({ min: 1, max: 2 }),
    });
  }

  return listMovies;
}
