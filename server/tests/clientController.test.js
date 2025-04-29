// Mock the database
jest.mock("../database/db.js", () => require("./__mocks__/db.js"));

const { addClient, updateClient, deleteClient } = require("../controllers/clientController");

describe("clientController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        ClientName: "Test Client",
        Company: "Test Company",
        Description: "Test Description",
        Telephone: "1234567890",
        Email: "test@example.com",
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

  describe("addClient", () => {
    it("should be a function", () => {
      expect(typeof addClient).toBe("function");
    });

    it("should respond with success message", async () => {
      await addClient(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201); // Created
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Client added successfully" });
    });
  });

  describe("updateClient", () => {
    it("should be a function", () => {
      expect(typeof updateClient).toBe("function");
    });

    it("should respond with update message", async () => {
      await updateClient(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Client updated" });
    });
  });

  describe("deleteClient", () => {
    it("should be a function", () => {
      expect(typeof deleteClient).toBe("function");
    });

    it("should respond with delete message", async () => {
      await deleteClient(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Client deleted" });
    });
  });
});
