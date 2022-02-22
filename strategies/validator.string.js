"use strict";

function apply({ key, value }, conditions = {}) {
  const errors = [];
  if (typeof value === conditions.type) {
    // regex pattern
    if (conditions.pattern && !conditions.pattern.test(value)) {
      errors.push(
        `property ${key}(${value}) does not match with pattern (${conditions.pattern.toString()})`
      );
    }

    // minLength
    // TODO si minLength = 0 la validación del if dará false
    if (
      conditions.minLength &&
      !isNaN(conditions.minLength) &&
      value.length < conditions.minLength
    ) {
      errors.push(
        `${key}(${value}) string length should be less than ${conditions.minLength}`
      );
    }

    //maxLength
    if (
      conditions.maxLength &&
      !isNaN(conditions.maxLength) &&
      value.length > conditions.maxLength
    ) {
      errors.push(
        `${key}(${value}) string length should be more than ${conditions.maxLength}`
      );
    }
  } else {
    errors.push(`property ${key}(${value}) is not ${conditions.type}`);
  }
  return errors;
}

module.exports = { apply };
