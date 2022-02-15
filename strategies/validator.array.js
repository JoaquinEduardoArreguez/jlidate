"use strict";

function apply({ key, value }, conditions = {}) {
  const strategies = require("./index");
  let errors = [];
  if (Array.isArray(value)) {
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
