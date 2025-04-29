// Mock the database
jest.mock("../database/db.js", () => require("./__mocks__/db.js"));

const { addDeal, updateDeal, deleteDeal } = require("../controllers/dealController");

describe("dealController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        DealValue: 10000,
        Comission: 500,
        DeadLine: "2025-12-31",
        PaymentStatus: "Pending",
        Description: "Important Deal",
        ClientId: 1,
      },
      params: {
        id: "1",
      },
      user: {
        SellerID: 1,
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("addDeal", () => {
    it("should be a function", () => {
      expect(typeof addDeal).toBe("function");
    });

    it("should respond with success message", async () => {
      await addDeal(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201); // Created
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Deal added" });
    });
  });

  describe("updateDeal", () => {
    it("should be a function", () => {
      expect(typeof updateDeal).toBe("function");
    });

    it("should respond with update message", async () => {
      await updateDeal(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Deal updated" });
    });
  });

  describe("deleteDeal", () => {
    it("should be a function", () => {
      expect(typeof deleteDeal).toBe("function");
    });

    it("should respond with delete message", async () => {
      await deleteDeal(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Deal deleted successfully" });
    });
  });
});
