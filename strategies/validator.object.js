"use strict";

const strategies = require("./index");

function apply({ key, value }, conditions = {}) {
  let errors = [];
  if (typeof value === conditions.type) {
    for (const [dataKey, dataValue] of Object.entries(value)) {
      if (conditions.properties[dataKey].type === "object") {
        errors = errors.concat(
          apply(
            {
              key: dataKey,
              value: dataValue,
            },
            conditions.properties[dataKey]
          )
        );
      } else {
        errors = errors.concat(
          strategies[conditions.properties[dataKey].type].apply(
            {
              key: dataKey,
              value: dataValue,
            },
            conditions.properties[dataKey]
          )
        );
      }
    }
  } else {
    errors.push(`property ${key} is not ${conditions.type}`);
  }

  if (errors.length > 0) {
    return [key, errors];
  }
  return errors;
}

module.exports = { apply };

/*
const objectExample = {
  type: "object",
  properties: {
    id: { type: "number" },
    type: { type: "string" },
  },
  required: [],
};
*/
