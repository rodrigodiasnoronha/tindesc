const existsOrError = (value, message) => 
{
    if (!value) throw message
    if (Array.isArray(value) && value.length === 0) throw message
}

const notExistsOrError = (value, message) =>
{
    if (value) throw message
}

const equalValuesOrError = (a, b, message) =>
{
    if (a !== b) throw message
}
module.exports = { notExistsOrError, existsOrError, equalValuesOrError }