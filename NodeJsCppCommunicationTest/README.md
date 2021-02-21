## Prerequisites


```
npm install -g node-gyp
npm install -g node-addon-api
```

## Steps
1. Fisier de configurare `binding.gyp` care spune ce se compileaza si cum se va numi pachetul in contextul NodeJs

```gyp
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

2. In terminal, isi face node-ul magia
```
node-gyp configure
node-gyp build
```

3. Intr-un fisier .js
```js
// hello.js
const addon = require("./build/Release/hello");

console.log(addon.hello());
// Prints: 'world'
```


## Alternativ, am facut un script in package:
```json
{
    "scripts": {
        "start": "node-gyp configure && node-gyp build && node index.js"
    }
}
```