# JLidate
The JSON validator you could have built.

## Schemas
Schemas declare the structure thats going to be used to validate payloads.

Available types are
* `string` (this includes dates and files)
* `number`
* `boolean`
* `array`
* `object`

There is no `null` type, instead the `nullable` attribute is used as modifier of base types.

Additional type-specific keywords can be used to refine the data type.

### Numbers
`number` represents numeric values.

```json
{
    "type": "number",
    "minimum": 1,
    "maximum": 3,
    "exclusiveMinimum": true,
    "exclusiveMaximum": false
}
```