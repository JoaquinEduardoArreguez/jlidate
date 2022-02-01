const Jlidate = require("../index");

describe("Jlidate string validator", () => {
  test("should pass if property is string", () => {
    const someString = "some string";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string" },
      },
    });

    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(true);
  });

  test("should fail if property is not string", () => {
    const someString = true;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string" },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [`property someString(${someString}) is not a string`],
    ]);
  });
});
