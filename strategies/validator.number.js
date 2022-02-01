"use strict";

function apply({ key, value }, conditions = {}) {
  const errors = [];
  if (typeof value === conditions.type) {
    if (conditions.hasOwnProperty("maximum") && value > conditions.maximum) {
      errors.push(
        `property ${key}(${value}) should be lesser than ${conditions.maximum}`
      );
    }
    if (conditions.hasOwnProperty("minimum") && value < conditions.minimum) {
      errors.push(
        `property ${key}(${value}) should be higher than ${conditions.minimum}`
      );
    }
  } else {
    errors.push(`property ${key}(${value}) is not a ${conditions.type}`);
  }
  return errors;
}

module.exports = { apply };
