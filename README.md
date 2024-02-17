# Simple Node.js Environment Variable Parser

A simple Node.js package (written in [TypeScript](https://www.typescriptlang.org/)) containing a set of convenience functions that can be used for retrieving environment variables and casting them into specific types.

**Official repository:** [github.com/BB-301/node-env-var-parser](https://github.com/BB-301/node-env-var-parser)

**How to install:** `npm install --save @bb301/env-var-parser`

## A quick example

Let's say that we have the following environment variables file:

```shell
# The port on which the server should be listening.
SERVER_PORT=20080

# Whether logging should be enabled for requests received
# by the server.
SERVER_LOGGING_ENABLED=true
```

The following code snippet illustrates a simple [Express](https://expressjs.com/) server, written in [TypeScript](https://www.typescriptlang.org/), in which we make use of three library functions, namely `asInteger`, `asOptionalString`, and `asBoolean`, to respectively retrieve the `SERVER_PORT`, `SERVER_HOSTNAME`, and `SERVER_LOGGING_ENABLED` environment variables:

```ts
import { EnvVar } from "@bb301/env-var-parser";
import express from "express";
import morgan from "morgan";

const PORT: number = EnvVar.asInteger("SERVER_PORT");
const HOSTNAME: string = EnvVar.asOptionalString("SERVER_HOSTNAME") ?? "127.0.0.1";
const LOGGING_ENABLED: boolean = EnvVar.asBoolean("SERVER_LOGGING_ENABLED");

const app = express();

if (LOGGING_ENABLED) {
    app.use(morgan("common"));
}

app.get("/", (_, res) => {
    res.send("Hello, Simple Node.js Environment Variable Parser!");
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Express server listening at 'http://${HOSTNAME}:${PORT}'...`);
});
```

Please check out this project's [official documentation website](https://bb-301.github.io/node-env-var-parser/) for a full API description. Alternatively, you may simply read the documentation from the [source](https://github.com/BB-301/node-env-var-parser/blob/main/src/index.ts).

## A note about integers and floats

The functions for parsing string-based environment variables into integers and floats are based on JavaScript's [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) and [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat), respectively. That means, for instance, that calling `EnvVar.asInteger` on an environment variable whose value is `123_test` will yield `123` (in other words, it won't fail, as one could expect).

## Contact

If you have any questions, if you find bugs, or if you have suggestions for this project, please feel free to contact me by opening an issue on the [repository](https://github.com/BB-301/node-env-var-parser/issues).

## License

This project is released under the [MIT License](https://github.com/BB-301/node-env-var-parser/blob/main/LICENSE).

## Copyright

Copyright (c) 2024 BB-301 (fw3dg3@gmail.com)