
const { getMe } = require("../controllers/getMe");

describe("getMe Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      user: {
        SellerName: "John Doe",
        Email: "john@example.com",
        Role: "seller",
        Company: "TestCompany",
      },
    };
    mockRes = {
      json: jest.fn(),
    };
  });

  it("should be a function", () => {
    expect(typeof getMe).toBe("function");
  });

  it("should respond with seller information", () => {
    getMe(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalled();

    const jsonResponse = mockRes.json.mock.calls[0][0];

    expect(jsonResponse).toHaveProperty("sellerName", "John Doe");
    expect(jsonResponse).toHaveProperty("email", "john@example.com");
    expect(jsonResponse).toHaveProperty("role", "seller");
    expect(jsonResponse).toHaveProperty("company", "TestCompany");
  });
});
