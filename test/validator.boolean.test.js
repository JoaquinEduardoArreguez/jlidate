const Jlidate = require("../index");

describe("Jlidate boolean validator", () => {
  test("should pass if property is boolean", () => {
    const someBoolean = true;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someBoolean: { type: "boolean" },
      },
    });
    const validationResult = validator.validate({ someBoolean });
    expect(validationResult).toEqual(true);
  });

  test("should fail if property is not boolean", () => {
    const someBoolean = "not boolean";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someBoolean: { type: "boolean" },
      },
    });
    const validationResult = validator.validate({ someBoolean });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [`property someBoolean(${someBoolean}) is not a boolean`],
    ]);
  });
});
