const Jlidate = require("../index");

describe("Jlidate number validator", () => {
  test("should pass if property is a number", () => {
    const someNumber = 5;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someNumber: { type: "number" },
      },
    });

    expect(validator.validate({ someNumber })).toEqual(true);
  });

  test("should fail if property is not number", () => {
    const someNumber = "5";

    const validator = new Jlidate({
      type: "object",
      properties: {
        someNumber: { type: "number" },
      },
    });

    expect(validator.validate({ someNumber })).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      ["property someNumber(5) is not number"],
    ]);
  });

  test("should pass if number is inside range", () => {
    const someNumber = 5;
    const maximum = 5;
    const minimum = 0;

    const validator = new Jlidate({
      type: "object",
      properties: {
        someNumber: { type: "number", minimum, maximum },
      },
    });

    expect(validator.validate({ someNumber })).toEqual(true);
  });

  test("should fail if number is outside range - max", () => {
    const someNumber = 5;
    const maximum = 4;
    const minimum = 0;

    const validator = new Jlidate({
      type: "object",
      properties: {
        someNumber: { type: "number", minimum, maximum },
      },
    });

    expect(validator.validate({ someNumber })).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [`property someNumber(${someNumber}) should be lesser than ${maximum}`],
    ]);
  });

  test("should fail if number is outside range - min", () => {
    const someNumber = -2;
    const maximum = 4;
    const minimum = 0;

    const validator = new Jlidate({
      type: "object",
      properties: {
        someNumber: { type: "number", minimum, maximum },
      },
    });

    expect(validator.validate({ someNumber })).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [`property someNumber(${someNumber}) should be higher than ${minimum}`],
    ]);
  });
});
