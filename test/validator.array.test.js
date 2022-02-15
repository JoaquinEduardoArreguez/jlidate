const Jlidate = require("../index");

describe("Jlidate array validator", () => {
  test("should pass if property is array", () => {
    const someArray = [];

    const someArraySchema = {
      type: "object",
      properties: {
        someArray: {
          type: "array",
        },
      },
    };

    const validator = new Jlidate(someArraySchema);
    const validationResult = validator.validate({ someArray });
    expect(validationResult).toEqual(true);
  });

  test("should fail if property is not an array", () => {
    const notAnArray = "not an Array!!";

    const someArraySchema = {
      type: "object",
      properties: {
        notAnArray: {
          type: "array",
        },
      },
    };

    const validator = new Jlidate(someArraySchema);
    const validationResult = validator.validate({ notAnArray });
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      ["property notAnArray(not an Array!!) is not array"],
    ]);
  });

  test("should pass if property is array of strings", () => {
    const someArrayOfStrings = ["alpha", "bravo", "charlie", "delta"];

    const someArrayOfStringsSchema = {
      type: "object",
      properties: {
        someArrayOfStrings: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    };

    const validator = new Jlidate(someArrayOfStringsSchema);
    const validationResult = validator.validate({ someArrayOfStrings });
    expect(validationResult).toEqual(true);
  });

  test("should fail if some item in array does not complain to schema", () => {
    const someArrayOfStrings = ["alpha", "bravo", 1];

    const someArrayOfStringsSchema = {
      type: "object",
      properties: {
        someArrayOfStrings: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    };

    const validator = new Jlidate(someArrayOfStringsSchema);
    const validationResult = validator.validate({ someArrayOfStrings });
    expect(validationResult).toEqual(false);
  });

  test("should pass if property is array of objects", () => {
    const someArrayOfObjects = [
      {
        dni: 123123,
        name: "juan",
      },
      {
        dni: 989898,
        name: "santi",
      },
      {
        dni: 876876,
        name: "julian",
      },
    ];

    const someArrayOfObjectsSchema = {
      type: "object",
      properties: {
        someArrayOfObjects: {
          type: "array",
          items: {
            type: "object",
            properties: {
              dni: { type: "number" },
              name: { type: "string" },
            },
          },
        },
      },
    };

    const validator = new Jlidate(someArrayOfObjectsSchema);
    const validationResult = validator.validate({ someArrayOfObjects });
    expect(validationResult).toEqual(true);
  });
});
