// Set JWT secret for testing
process.env.JWT_SECRET = 'testsecret';

// Mock bcrypt
jest.mock('bcrypt');

const bcrypt = require('bcrypt');
console.log("bcrypt inside test:", bcrypt);

// Mock the database
jest.mock("../database/db.js", () => require("./__mocks__/db.js"));

const db = require("../database/db.js");
const { postSignup } = require("../controllers/postSignup");

describe("postSignup Controller", () => {
  let mockReq;
  let mockRes;
  let signupStep;
  let inputs;

  beforeAll(async () => {
    const pool = await db.poolPromise;

    inputs = {}; // Capture input values
    signupStep = 0; // Track signup progress

    pool.request = () => ({
      input: function (name, type, value) {
        inputs[name] = value;
        return this;
      },
      query: jest.fn((queryText) => {
        if (queryText.includes("SELECT * FROM Seller")) {
          if (signupStep === 0) {
            signupStep++;
            return Promise.resolve({ recordset: [] }); // First: No seller found
          } else {
            return Promise.resolve({ recordset: [{
              SellerID: 999,
              SellerName: inputs.sellerName,
              Email: inputs.email,
              Role: inputs.role,
              Company: inputs.company
            }]}); // After insert: Return the created seller
          }
        }
        if (queryText.includes("INSERT INTO Seller")) {
          return Promise.resolve({ recordset: [{ SellerID: 999 }] }); // Fake insert
        }
        return Promise.resolve({ recordset: [] });
      }),
      execute: jest.fn(() =>
        Promise.resolve({ recordset: [{ SellerID: 999 }] })
      ),
    });
  });

  beforeEach(() => {
    mockReq = {
      body: {
        email: "testsignup@example.com",
        password: "password123",
        role: "seller",
        sellerName: "Test Seller",
        company: "TestCompany",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(), // Must mock .cookie too!
    };
    signupStep = 0; // Reset step counter before each test
    inputs = {};    // Reset inputs before each test
  });

  it("should be a function", () => {
    expect(typeof postSignup).toBe("function");
  });

  it("should respond with success message after signup", async () => {
    await postSignup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();

    const jsonResponse = mockRes.json.mock.calls[0][0];

    expect(jsonResponse).toHaveProperty("message");
    expect(typeof jsonResponse.message).toBe("string");
  });
});
