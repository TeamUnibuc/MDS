


// Don't use `object` as a type. The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).
// Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.eslint@typescript-eslint/ban-types
export function prettyJSON(obj : Record<string, unknown>) : string{
    return JSON.stringify(obj, undefined, 2);
}