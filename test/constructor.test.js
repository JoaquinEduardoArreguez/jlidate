const Jlidate = require("../index");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    surname: { type: "string", required: false },
    dni: { type: "number", required: true },
  },
  settings: { strict: true },
};

describe("Jlidate constructor", () => {
  test("should pass if user schema is the same as internal schema", () => {
    const validator = new Jlidate(schema);
    expect(validator.getSchema()).toEqual(schema);
  });
});
