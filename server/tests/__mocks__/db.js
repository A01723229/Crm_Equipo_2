// Mock bcrypt always succeeds
jest.mock("bcrypt", () => ({
    compare: jest.fn(() => Promise.resolve(true)),
  }));
  
  // Create a shared inputs object outside
  let inputs = {};
  
  const poolPromise = Promise.resolve({
    request: () => {
      inputs = {}; // Reset for each new request
  
      return {
        input: function (name, type, value) {
          inputs[name] = value;
          return this;
        },
        execute: jest.fn((procName) => {
          if (procName === "AddSeller") {
            return Promise.resolve({
              recordset: [{ SellerID: 999 }], // For signup
            });
          }
          return Promise.resolve({ recordset: [{}] });
        }),
        query: jest.fn((queryText) => {
          if (queryText.includes("SELECT * FROM Seller")) {
            if (inputs.email === "testsignup@example.com") {
              return Promise.resolve({ recordset: [] }); // No existing seller
            }
            if (inputs.email === "test@example.com") {
              return Promise.resolve({
                recordset: [
                  {
                    SellerID: 1,
                    SellerName: "Test Seller",
                    Email: "test@example.com",
                    Password: "fakeHashedPassword", // bcrypt is mocked so irrelevant
                    Role: "seller",
                    Company: "TestCompany",
                  },
                ],
              }); // Existing seller for login
            }
          }
          return Promise.resolve({ recordset: [{}] });
        }),
      };
    },
  });
  
  // Mock sql datatypes if needed
  const sql = {
    VarChar: jest.fn(),
    Int: jest.fn(),
    Decimal: jest.fn(),
    Text: jest.fn(),
    Date: jest.fn(),
  };
  
  module.exports = { sql, poolPromise };
  