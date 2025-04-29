// Mock the database
jest.mock("../database/db.js", () => require("./__mocks__/db.js"));

const { addTask, updateTask, deleteTask } = require("../controllers/taskController");

describe("taskController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        Title: "Test Task",
        Description: "Test task description",
        Stage: "Requested",
        DealID: 1,
      },
      user: {
        SellerID: 1,
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
  

  describe("addTask", () => {
    it("should be a function", () => {
      expect(typeof addTask).toBe("function");
    });

    it("should respond with success message", async () => {
      await addTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201); // Created
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Task added" });
    });
  });

  describe("updateTask", () => {
    it("should be a function", () => {
      expect(typeof updateTask).toBe("function");
    });

    it("should respond with update message", async () => {
      await updateTask(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Task updated" });
    });
  });

  describe("deleteTask", () => {
    it("should be a function", () => {
      expect(typeof deleteTask).toBe("function");
    });

    it("should respond with delete message", async () => {
      await deleteTask(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({ message: "Task deleted" });
    });
  });
});
