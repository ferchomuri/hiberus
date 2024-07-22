import express, { json } from "express";
import JWT from "jsonwebtoken";
import cors from "cors";

const { sign, verify } = JWT;
import { mockLoginUsers, generateListMovies } from "./mockUsers.js";

const secret =
  process.env.JWT_SECRET || "thisIsJustAMockServerForEducationalPurpose";

const app = express();

app.use(cors());
app.use(json());

const moviesPaginated = generateListMovies();

const verifyIsAuthenticatedHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ errorMessage: "The token is required" });
    }

    verify(token, secret);
    next();
  } catch (ex) {
    res.send(401, { errorMessage: "The token is not valid" });
  }
};

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        errorMessage: "email and password are required",
      });
    }

    const user = mockLoginUsers.find((user) => user.email === email);

    if (!user || user?.password !== password || user?.email !== email) {
      return res.status(400).send({
        errorMessage: "email or password incorrect",
      });
    }

    const token = sign(
      {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      secret
    );

    return res.status(200).send({ token });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e.message });
  }
});

app.post("/logout", (req, res) => {
  try {

    return res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e.message });
  }
});

app.post(
  "/register",
  (req, res) => {
    try {
      const { fullName, email, role, password } = req.body;

      if (!fullName || !email || !role) {
        return res
          .status(400)
          .send({ errorMessage: "fullName, email and role are required" });
      }

      mockLoginUsers.push({
        fullName,
        email,
        role,
        password
      });

      const usersWithoutPassword = mockLoginUsers.map(({ password, ...user }) => user);

      return res.status(200).send(
        usersWithoutPassword.find((user) => user.email === email)
      );
    } catch (e) {
      console.log(e);
      return res.status(500).send({ error: e.message });
    }
  }
);

app.get("/movies", (req, res) => {
  try {
    return res.status(200).send({
      data: moviesPaginated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e.message });
  }
});

app.put(
  "/movie/:uid",
  verifyIsAuthenticatedHandler,
  (req, res) => {
    try {
      const { rating } = req.body;

      if (!rating) {
        return res
          .status(400)
          .send({ errorMessage: "rating is required" });
      }

      const findIndex = moviesPaginated.findIndex(
        (movie) => movie.id === req.params.uid
      );

      if (findIndex === -1) {
        return res.status(404).send({ errorMessage: "Movie not found" });
      }

      moviesPaginated[findIndex] = {
        ...moviesPaginated[findIndex],
        rating: (moviesPaginated[findIndex].rating + rating) / 2,
        usersRated: moviesPaginated[findIndex].usersRated + 1
      };
      return res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(500).send({ error: e.message });
    }
  }
);

app.listen(8080, () => console.log("running localhost:8080"));
