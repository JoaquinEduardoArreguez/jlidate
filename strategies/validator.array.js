"use strict";

function apply({ key, value }, conditions = {}) {
  const strategies = require("./index");
  let errors = [];
  if (Array.isArray(value)) {
    // Validate each item in array against the schema present on the "items" property
    // if "items" property is not present, only validate if the property is array
    if (conditions.items) {
      value.forEach((item) => {
        errors = errors.concat(
          strategies[conditions.items.type].apply(
            {
              key,
              value: item,
            },
            conditions.items
          )
        );
      });
    }
  } else {
    errors.push(`property ${key}(${value}) is not ${conditions.type}`);
  }
  return errors;
}

module.exports = { apply };
