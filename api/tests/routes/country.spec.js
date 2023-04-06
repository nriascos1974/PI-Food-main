/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  title: "Chicken Fajita Stuffed Bell Pepper",
  summary:
    "Chicken Fajita Stuffed Bell Pepper takes approximately <b>45 minutes</b> from beginning to end. Watching your figure? This gluten free recipe has <b>526 calories</b>, <b>50g of protein</b>, and <b>24g of fat</b> per serving. For <b>$4.35 per serving</b>, you get a main course that serves 3. 159 people have made this recipe and would make it again. This recipe is typical of Mexican cuisine.",
  healthScore: 50,
  image: "https://spoonacular.com/recipeImages/795751-312x231.jpg",
  steps: [
    {
      number: 1,
      step: "Layer quinoa and then grilled chicken into the pepper, and then top each with cheese",
    },
    {
      number: 2,
      step: "Cut the bell pepper in half (if you havent already) and clean out the seeds",
    },
    {
      number: 3,
      step: "Mix salt, pepper, cilantro, cumin, chili powder, and quinoa together and place to the side",
    },
    {
      number: 4,
      step: "o get started heat oven to 35",
    },
  ],
  diets: [
    "lacto ovo vegetarian",
    "vegetarian",
    "gluten free",
    "fodmap friendly",
    "primal",
    "whole 30",
    "ketogenic",
  ],
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", () => {
    it("should get 200", () => agent.get("/recipes").expect(200));
  });
});

describe("Route: GET recipes/:id", () => {
  it("Responde con status: 200", async () => {
    const response = await session(app).get("/recipes/1");
    expect(response.statusCode).toBe(200);
  });
  it("Responde un objeto con las propiedades: id, name, species, gender e image", async () => {
    const response = await session(app).get("/recipes/1");
    expect(Object.keys(response.body)).toEqual([
      "title",
      "summary",
      "healthScore",
      "steps",
      "image",
    ]);
  });
  it("Si no existe con status: 404", () => {
    return agent
      .get("/recipes/IDqueNoExiste")
      .send()
      .then((response) => expect(response.statusCode).toBe(404));
  });
  it("Si hay un error responde con status: 500", () => {
    return agent
      .get("/recipes/10000")
      .send()
      .then((response) => expect(response.statusCode).toBe(500));
  });
});

describe("Route: GET recipes/:id", () => {
  it("Responde con status: 200", async () => {
    const response = await session(app).get("/recipe/1");
    expect(response.statusCode).toBe(200);
  });
  it("Responde un objeto con las propiedades: id, name, species, gender e image", async () => {
    const response = await session(app).get("/recipes/1");
    expect(Object.keys(response.body)).toEqual([
      "id",
      "name",
      "image",
      "gender",
      "species",
      "status",
      "origin",
      "location",
    ]);
  });
  it("Si no existe responde con status: 404", () => {
    return agent
      .get("/recipes/IDqueNoExiste")
      .send()
      .then((response) => expect(response.statusCode).toBe(404));
  });
  it("Si hay un error responde con status: 500", () => {
    return agent
      .get("/recipes/10000")
      .send()
      .then((response) => expect(response.statusCode).toBe(500));
  });
});
