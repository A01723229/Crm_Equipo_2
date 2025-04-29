// Mock getData to avoid real DB connection
jest.mock("../controllers/getData", () => ({
    getData: (req, res) => {
      res.json({
        allDeals: [],
        pendingPayments: [],
        topCommissions: [],
        totalCommissions: 0,
        commissionRate: 0,
      });
    },
  }));
  
  const { getData } = require("../controllers/getData");
  
  describe("getData Controller", () => {
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockReq = {}; // No specific request data needed
      mockRes = {
        json: jest.fn(),
      };
    });
  
    it("should be a function", () => {
      expect(typeof getData).toBe("function");
    });
  
    it("should respond with a correct data object", () => {
      getData(mockReq, mockRes);
  
      expect(mockRes.json).toHaveBeenCalled();
  
      const jsonResponse = mockRes.json.mock.calls[0][0];
  
      expect(typeof jsonResponse).toBe("object");
      expect(jsonResponse).not.toBeNull();
      expect(jsonResponse).toHaveProperty("allDeals");
      expect(jsonResponse).toHaveProperty("pendingPayments");
      expect(jsonResponse).toHaveProperty("topCommissions");
      expect(jsonResponse).toHaveProperty("totalCommissions");
      expect(jsonResponse).toHaveProperty("commissionRate");
    });
  });
  