"use strict";

const formatValidators = {
  date: (data) => !isNaN(Date.parse(data)),
  email: (data) => /.*@.*.com/gi.test(data),
  uuid: (data) =>
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
      data
    ),
};

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

    // formats
    // if the format is/is not a valid option should be checked in the constructor
    if (conditions.format && !formatValidators[conditions.format](value)) {
      errors.push(
        `${key}(${value}) string does not complain to ${conditions.format} format`
      );
    }
  } else {
    errors.push(`property ${key}(${value}) is not ${conditions.type}`);
  }
  return errors;
}

module.exports = { apply };
