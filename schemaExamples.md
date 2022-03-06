## Number

```json
// Description
{
  "type": "number",
  "minimum": "number >= minimum",
  "maximum": "number <= maximum",
}
```

```json
// Example
{
  "type": "object",
  "properties": {
    "someNumber": {
      "type": "number",
      "minimum": 0,
      "maximum": 10
    }
  }
}
```

## Boolean

```json
// Description
{
  "type": "boolean"
}
```

```json
// Example
{
  "type": "object",
  "properties": {
    "someBoolean": {
      "type": "boolean"
    }
  }
}
```

## String

```json
// Description
{
  "type": "string",
  "minLength": "minimum string length allowed",
  "maxLength": "maximum string length allowed",
  "pattern": "regexp pattern used to test this string",
  "format": "common-use formats: date, email, uuid"
}
```

```json
// Example
{
  "type": "object",
  "properties": {
    "someString": {
      "type": "string",
      "minLenth": 0,
      "maxLength": 20,
      "pattern":/hello.*/,
      "format": "email"
    }
  }
}
```

## Object

```json
// Description
{
  "type": "object",
  "properties": "Object where each property is the schema used to validate that property",
  "required":"array with names of required properties, strings"
}
```

```json
// Example
{
  "type": "object",
  "properties": {
    "someBoolean": {"type": "boolean"},
    "someString": {"type": "string"},
    "someNumber": {
      "type": "number",
      "minimum": -100,
      "maximum": 100
    },
    "someAnidatedObject":{
      "type": "object",
      "properties": {
        "someBoolean": {"type": "boolean"},
        "someString": {"type": "string"},        
      }
    }
  },
  "required":["someBoolean","someString"]
}
```

## Array

```json
// Description
{
  "type": "array",
  "items": "Object that is the schema used to validate that item"
}

```

```json
// Example: Array of Strings
{
  "type": "object",
  "properties": {
    "someArrayOfStrings": {
      "type": "array",
      "items": {"type": "string"}
    }
  }
}

// Example: Array of Numbers
{
  "type": "object",
  "properties": {
    "someArrayOfStrings": {
      "type": "array",
      "items": {
        "type": "number",
        "minimum": 0,
        "maximum": 10
        }
    }
  }
}

// Example: Array of Objects
{
  "type": "object",
  "properties": {
    "someArrayOfStrings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "someString": {"type": "string"},
          "someBoolean": {"type": "boolean"}
        }
      }
    }
  }
}
```