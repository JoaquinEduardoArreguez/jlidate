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

  test("should pass if string complains to date format", () => {
    const someDate = new Date().toISOString();
    const validator = new Jlidate({
      type: "object",
      properties: {
        someDate: { type: "string", format: "date" },
      },
    });
    const validationResult = validator.validate({ someDate });
    expect(validationResult).toEqual(true);
  });

  test("should fail if string does not complain to date format", () => {
    const someInvalidDate = "3 february wed";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someInvalidDate: { type: "string", format: "date" },
      },
    });
    const validationResult = validator.validate({ someInvalidDate });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `someInvalidDate(${someInvalidDate}) string does not complain to date format`,
      ],
    ]);
  });

  test("should pass if string complains to email format", () => {
    const someEmail = "john.doe@gmail.com";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someEmail: { type: "string", format: "email" },
      },
    });
    const validationResult = validator.validate({ someEmail });
    expect(validationResult).toEqual(true);
  });

  test("should fail if string does not complain to email format", () => {
    const someInvalidEmail = "pepeFrog.net@gma@il.io";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someInvalidEmail: { type: "string", format: "email" },
      },
    });
    const validationResult = validator.validate({ someInvalidEmail });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `someInvalidEmail(${someInvalidEmail}) string does not complain to email format`,
      ],
    ]);
  });

  test("should pass if string complains to uuid format", () => {
    const someUUID = "9607a1b4-9c90-11ec-b909-0242ac120002";

    const validator = new Jlidate({
      type: "object",
      properties: {
        someUUID: { type: "string", format: "uuid" },
      },
    });
    const validationResultUUID = validator.validate({ someUUID });
    expect(validationResultUUID).toEqual(true);
  });

  test("should fail if string does not complain to email format", () => {
    const someInvalidUUID = "this-is-not-an-UUID";
    const validator = new Jlidate({
      type: "object",
      properties: {
        someInvalidUUID: { type: "string", format: "uuid" },
      },
    });
    const validationResult = validator.validate({ someInvalidUUID });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        `someInvalidUUID(${someInvalidUUID}) string does not complain to uuid format`,
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
