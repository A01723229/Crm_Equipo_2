
const postGemini = require("../controllers/postGemini");

describe("postGemini Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            candidates: [
              {
                content: {
                  parts: [{ text: "This is a Gemini answer." }],
                },
              },
            ],
          }),
      })
    );

    mockReq = {
      body: {
        data: { key: "value" },
        question: "What is the meaning of life?",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up fetch mock after each test
  });

  it("should be a function", () => {
    expect(typeof postGemini).toBe("function");
  });

  it("should call fetch and respond with Gemini answer", async () => {
    await postGemini(mockReq, mockRes);

    expect(global.fetch).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalled();

    const jsonResponse = mockRes.json.mock.calls[0][0];

    expect(jsonResponse).toHaveProperty("answer");
    expect(typeof jsonResponse.answer).toBe("string");
  });
});
