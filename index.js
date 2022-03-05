"use strict";

class Jlidate {
  constructor(schema = {}) {
    this.schema = schema;
    this.validationErrors = [];
    this.objectValidator = require("./strategies/validator.object");
  }

  getErrors() {
    return this.validationErrors;
  }

  setError(error) {
    this.validationErrors.push(error);
  }

  getSchema() {
    return this.schema;
  }

  isObject(value) {
    return !!value && value.constructor === Object;
  }

  validate(data) {
    this.validationErrors = this.objectValidator.apply(
      {
        key: "",
        value: data,
      },
      this.schema
    );

    return !this.getErrors().length;
  }
}

module.exports = Jlidate;
