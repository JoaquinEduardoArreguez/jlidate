"use strict";

function apply({ key, value }, conditions = {}) {
  const strategies = require("./index");
  let errors = [];
  if (typeof value === conditions.type) {
    if (conditions.required) {
      const dataProperties = Object.keys(value);
      conditions.required.forEach((property) => {
        if (!dataProperties.includes(property)) {
          errors.push(`property ${property} is required`);
        }
      });
    }

    for (const [dataKey, dataValue] of Object.entries(value)) {
      if (
        conditions.properties[dataKey] &&
        conditions.properties[dataKey].type === "object"
      ) {
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
        if (conditions.properties[dataKey]) {
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
