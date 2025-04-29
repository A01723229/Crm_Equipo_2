// Mock the database
jest.mock("../database/db.js", () => require("./__mocks__/db.js"));

// Mock bcrypt
jest.mock("bcrypt", () => ({
  compare: jest.fn(() => Promise.resolve(true)), // Always return true for bcrypt.compare
}));

process.env.JWT_SECRET = "testsecret";

const { postLogin } = require("../controllers/postLogin");


describe("postLogin Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
  });

  it("should be a function", () => {
    expect(typeof postLogin).toBe("function");
  });

  it("should respond with seller info on successful login", async () => {
    await postLogin(mockReq, mockRes);

    expect(mockRes.cookie).toHaveBeenCalled(); // Token should be set
    expect(mockRes.json).toHaveBeenCalled();   // JSON response should be sent

    const jsonResponse = mockRes.json.mock.calls[0][0];

    expect(jsonResponse).toHaveProperty("message");
    expect(typeof jsonResponse.message).toBe("string");

    expect(jsonResponse).toHaveProperty("seller");
    expect(typeof jsonResponse.seller).toBe("object");
  });
});
