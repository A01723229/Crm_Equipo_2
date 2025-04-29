// Mock the database
jest.mock("../database/db.js", () => require("./__mocks__/db.js"));

const { addProduct, updateProduct, deleteProduct } = require("../controllers/productController");

describe("productController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        Name: "Test Product",
        Description: "Product description",
        Category: "Electronics",
        Price: 99.99,
      },
      params: {
        id: "1",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("addProduct", () => {
    it("should be a function", () => {
      expect(typeof addProduct).toBe("function");
    });

    it("should respond with success message", async () => {
      await addProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201); // Created
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Product added" });
    });
  });

  describe("updateProduct", () => {
    it("should be a function", () => {
      expect(typeof updateProduct).toBe("function");
    });

    it("should respond with update message", async () => {
      await updateProduct(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Product updated" });
    });
  });

  describe("deleteProduct", () => {
    it("should be a function", () => {
      expect(typeof deleteProduct).toBe("function");
    });

    it("should respond with delete message", async () => {
      await deleteProduct(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Product deleted" });
    });
  });
});
