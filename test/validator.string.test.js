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
      [`property someString(${someString}) is not string`],
    ]);
  });

  test("should fail if string.length < minLength", () => {
    const someString = "has13letters";
    const minLength = 30;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string", minLength },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `someString(${someString}) string length should be less than ${minLength}`,
      ],
    ]);
  });

  test("should fail if string.length > maxLength", () => {
    const someString = "has13letters";
    const maxLength = 3;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string", maxLength },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `someString(${someString}) string length should be more than ${maxLength}`,
      ],
    ]);
  });

  test("should pass if string is between range", () => {
    const someString = "has13letters";
    const maxLength = 14;
    const minLength = 0;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string", maxLength, minLength },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(true);
  });

  test("should pass if string complains to pattern", () => {
    const someString = "hello joaquin";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string", pattern: /hello.*/ },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(true);
  });

  test("should fail if string does not complain to pattern", () => {
    const someString = "bye joaquin";
    const pattern = /hello.*/;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string", pattern },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `property someString(${someString}) does not match with pattern (/hello.*/)`,
      ],
    ]);
  });

  test("should pass if string complains to all conditions", () => {
    const someString = "hello joaquin";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: {
          type: "string",
          pattern: /hello.*/,
          minLength: 0,
          maxLength: 13,
        },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(true);
  });

  test("should fail if string does not complain to any condition", () => {
    const someString = "bye joaquin";
    const minLength = 20;
    const maxLength = 10;
    const pattern = /hello.*/;
    const validator = new Jlidate({
      type: "object",
      properties: {
        someString: { type: "string", pattern, minLength, maxLength },
      },
    });
    const validationResult = validator.validate({ someString });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `property someString(${someString}) does not match with pattern (${pattern})`,
        `someString(${someString}) string length should be less than ${minLength}`,
        `someString(${someString}) string length should be more than ${maxLength}`,
      ],
    ]);
  });
});
