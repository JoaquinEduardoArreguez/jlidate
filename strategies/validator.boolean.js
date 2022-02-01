"use strict";

function apply({ key, value }, conditions = {}) {
  const errors = [];
  if (typeof value === conditions.type) {
  } else {
    errors.push(`property ${key}(${value}) is not a ${conditions.type}`);
  }
  return errors;
}

module.exports = { apply };
