const Jlidate = require("../index");

describe("Jlidate object validator", () => {
  test("should pass if property is object", () => {
    const someObject = {
      name: "joaquin",
      dni: 36409123,
      family: {
        father: "juan",
        mother: "josefa",
      },
    };

    const someObjectSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        dni: { type: "number" },
        family: {
          type: "object",
          properties: {
            father: { type: "string" },
            mother: { type: "string" },
          },
        },
      },
    };

    const validator = new Jlidate(someObjectSchema);
    const validationResult = validator.validate(someObject);
    expect(validationResult).toEqual(true);
  });

  test("should fail if property is not an object", () => {
    const someObject = "this is not an object";

    const someObjectSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        dni: { type: "number" },
        family: {
          type: "object",
          properties: {
            father: { type: "string" },
            mother: { type: "string" },
          },
        },
      },
    };

    const validator = new Jlidate(someObjectSchema);
    const validationResult = validator.validate(someObject);
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual(["", ["property  is not object"]]);
  });

  test("should pass if schema checks properties that data doesn't have", () => {
    const someObject = {
      name: "joaquin",
      dni: 36409123,
    };

    const someObjectSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        dni: { type: "number" },
        family: {
          type: "object",
          properties: {
            father: { type: "string" },
            mother: { type: "string" },
          },
        },
      },
    };

    const validator = new Jlidate(someObjectSchema);
    const validationResult = validator.validate(someObject);
    expect(validationResult).toEqual(true);
  });

  test("should pass if data has all required properties", () => {
    const someObject = {
      name: "joaquin",
      dni: 36409123,
    };

    const someObjectSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        dni: { type: "number" },
        family: {
          type: "object",
          properties: {
            father: { type: "string" },
            mother: { type: "string" },
          },
        },
      },
      required: ["name", "dni"],
    };

    const validator = new Jlidate(someObjectSchema);
    const validationResult = validator.validate(someObject);
    expect(validationResult).toEqual(true);
  });

  test("should fail if data has not some property required in schema", () => {
    const someObject = {
      name: "joaquin",
      dni: 36409123,
    };

    const someObjectSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        dni: { type: "number" },
      },
      required: ["family", "cousins"],
    };

    const validator = new Jlidate(someObjectSchema);
    const validationResult = validator.validate(someObject);
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      ["property family is required", "property cousins is required"],
    ]);
  });

  test("should fail if object does not conform to schema", () => {
    const someObject = {
      name: "joaquin",
      dni: "36409123",
      hasRelatives: true,
      relatives: {
        hasParents: true,
        hasGirlfriend: false,
        parents: {
          parentsNumber: true,
          father: 1,
          mother: "josefa",
        },
      },
      tags: ["argentine", "married"],
    };

    const someObjectSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
        dni: { type: "number" },
        hasRelatives: { type: "boolean" },
        relatives: {
          type: "object",
          properties: {
            hasParents: { type: "boolean" },
            hasGirlfriend: { type: "boolean" },
            parents: {
              type: "object",
              properties: {
                parentsNumber: { type: "number" },
                father: { type: "string" },
                mother: { type: "string" },
              },
            },
          },
        },
        tags: {
          type: "array",
          items: { type: "string" },
        },
      },
    };

    const validator = new Jlidate(someObjectSchema);
    const validationResult = validator.validate(someObject);
    expect(validationResult).toEqual(false);
    expect(validator.getErrors()).toEqual([
      "",
      [
        "property dni(36409123) is not number",
        "relatives",
        [
          "parents",
          [
            "property parentsNumber(true) is not number",
            "property father(1) is not string",
          ],
        ],
      ],
    ]);
  });
});
