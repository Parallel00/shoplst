process.env.NODE_ENV = "testlist";
const req = require("supertest");
const app = require("../app");

let items = require("../datbs")

let item = { name: "Johnny", price:200 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});

describe("GET /items", async function () {
  test("Retrieves the list", async function () {
    const response = await req(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

describe("GET /items/:name", async function () {
  test("Retrieves one item", async function () {
    const response = await req(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await req(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /items", async function () {
  test("Creates an item", async function () {
    const response = await req(app)
      .post(`/items`)
      .send({
        name: "Lettuce",
        price: 0
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("Lettuce");
    expect(response.body.item.price).toEqual(0);
  });
});

describe("PATCH /items/:name", async function () {
  test("Updates an item", async function () {
    const response = await req(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Bread"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "Bread"
    });
  });

  test("If the item does not exist, return 404", async function () {
    const response = await req(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", async function () {
  test("Deletes an item", async function () {
    const response = await req(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Item has been deleted." });
  });
});


