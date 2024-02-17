/**
 * A namespace containing a set of convenience functions that can be used for retrieving
 * environment variables and casting them into specific types.
 * @example
 * ```ts
 * import { EnvVar } from "@bb301/env-var-parser";
 * import express from "express";
 * import morgan from "morgan";
 * 
 * const PORT: number = EnvVar.asInteger("SERVER_PORT");
 * const HOSTNAME: string = EnvVar.asOptionalString("SERVER_HOSTNAME") ?? "127.0.0.1";
 * const LOGGING_ENABLED: boolean = EnvVar.asBoolean("SERVER_LOGGING_ENABLED");
 * 
 * const app = express();
 * 
 * if (LOGGING_ENABLED) {
 *     app.use(morgan("common"));
 * }
 * 
 * app.get("/", (_, res) => {
 *     res.send("Hello, Simple Node.js Environment Variable Parser!");
 * });
 * 
 * app.listen(PORT, HOSTNAME, () => {
 *     console.log(`Express server listening at 'http://${HOSTNAME}:${PORT}'...`);
 * });
 * ``` 
 */
export namespace EnvVar {
    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, returns it as a `string` value.
     * 
     * @throws An {@link Error} instance explaining that the variable with given name could
     * not be found, or that it was found but it was empty.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {string} A `string` corresponding to the environment variable's value.
     * 
     * @see {@link asOptionalString}
     */
    export const asString = (name: string): string => {
        if (process.env[name] === undefined) {
            throw new Error(`missing environment variable '${name}'`);
        }
        if (process.env[name] === "") {
            throw new Error(`empty environment variable '${name}'`);
        }
        return process.env[name]!;
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, returns it as a `string` value, else returns `undefined`.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {string|undefined} A `string` corresponding to the environment variable's value, if any, 
     * else `undefined`.
     * 
     * @see {@link asString}
     */
    export const asOptionalString = (name: string): string | undefined => {
        try {
            return asString(name);
        } catch (_) {
            return undefined;
        }
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, validates that it is either "true" or "false", and, if so,
     * returns it as a `boolean` value.
     * 
     * @throws An {@link Error} instance explaining that the variable was either not found or that
     * it could not be parsed into a valid boolean.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {boolean} A `boolean` corresponding to the environment variable's value.
     * 
     * @see {@link asOptionalBoolean}
     * 
     * @note This function's input is case insensitive, which means that variations of `true` such
     * as `True` and `TRUE`, to quote two examples, will also be treated as `true`. Moreover, `T` or
     * `t` will be treated as `true`, and, similarly, `F` and `f` will be treated as `false`. Finally,
     * `0` will be treated as `false` and `1` as `true`.
     */
    export const asBoolean = (name: string): boolean => {
        const envVar = asString(name);
        const envVarLowercased = envVar.toLowerCase();
        if (["true", "t", "1"].indexOf(envVarLowercased) !== -1) {
            return true;
        }
        if (["false", "f", "0"].indexOf(envVarLowercased) !== -1) {
            return false;
        }
        throw new Error(`expecting environment variable '${name}' to be either 'true' (or 't' or '1') or 'false' (or 'f' or '0'), but got '${envVar}' (note: input is not case sensitive)`);
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, validates that it is either "true" or "false", and, if so,
     * returns it as a `boolean` value. If no variable is found, this function returns `undefined`.
     * 
     * @throws An {@link Error} instance explaining that the variable was found but that it could
     * not be parsed into a valid boolean.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {boolean|undefined} A `boolean` corresponding to the environment variable's value, if any, else
     * `undefined`.
     * 
     * @see {@link asBoolean}
     * 
     * @note This function's input is case insensitive, which means that variations of `true` such
     * as `True` and `TRUE`, to quote two examples, will also be treated as `true`. Moreover, `T` or
     * `t` will be treated as `true`, and, similarly, `F` and `f` will be treated as `false`. Finally,
     * `0` will be treated as `false` and `1` as `true`.
     */
    export const asOptionalBoolean = (name: string): boolean | undefined => {
        try {
            asString(name);
        } catch (_) {
            return undefined;
        }
        return asBoolean(name);
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, validates that it can be parsed as an `integer`, and, if
     * so, returns it as a `number` value.
     * 
     * @throws An {@link Error} instance explaining that the variable was either not found or that
     * it could not be parsed into a valid integer.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {number} An `integer` corresponding to the parsed variable's value.
     * 
     * @see {@link asOptionalInteger}
     * 
     * @note Internally, this function uses {@link Number.parseInt} to try to convert the string
     * into an integer. That means, for example, that a value like "123_test" will yield "123"
     * instead of failing. In other words, if {@link Number.parseInt} returns something other than
     * `NaN`, this function won't throw.
     */
    export const asInteger = (name: string): number => {
        const envVar = asString(name);
        const value = Number.parseInt(envVar);
        if (Number.isNaN(value)) {
            throw new Error(`expecting environment variable '${name} = ${envVar}' to be parsable as an integer`);
        }
        return value;
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, validates that it can be parsed as an `integer`, and, if
     * so, returns it as a `number` value. If no variable is found, this function returns `undefined`.
     * 
     * @throws An {@link Error} instance explaining that the variable was present, but that it could
     * not be parsed into a valid integer.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {number|undefined} An `integer` corresponding to the parsed variable's value, if any,
     * else `undefined`
     * 
     * @see {@link asInteger}
     * 
     * @note Internally, this function uses {@link Number.parseInt} to try to convert the string
     * into an integer. That means, for example, that a value like "123_test" will yield "123"
     * instead of failing. In other words, if {@link Number.parseInt} returns something other than
     * `NaN`, this function won't throw.
     */
    export const asOptionalInteger = (name: string): number | undefined => {
        try {
            asString(name);
        } catch (_) {
            return undefined;
        }
        return asInteger(name);
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, validates that it can be parsed as a `float` value, and, if
     * so, returns it as a `number` value.
     * 
     * @throws An {@link Error} instance explaining that the variable was either not found or that
     * it could not be parsed into a valid float.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {number} A `float` corresponding to the parsed variable's value.
     * 
     * @see {@link asOptionalFloat}
     * 
     * @note Internally, this function uses {@link Number.parseFloat} to try to convert the string
     * into a number. That means, for example, that a value like "123.5_test" will yield "123.5"
     * instead of failing. In other words, if {@link Number.parseFloat} returns something other than
     * `NaN`, this function won't throw.
     */
    export const asFloat = (name: string): number => {
        const envVar = asString(name);
        const value = Number.parseFloat(envVar);
        if (Number.isNaN(value)) {
            throw new Error(`expecting environment variable '${name} = ${envVar}' to be parsable as a float`);
        }
        return value;
    }

    /**
     * A function that tries to retrieve an environment variable from the {@link process.env}
     * object and, if it succeeds, validates that it can be parsed as a `float` value, and, if
     * so, returns it as a `number` value. If no variable is found, this function returns `undefined`.
     * 
     * @throws An {@link Error} instance explaining that the variable was present, but that it could
     * not be parsed into a valid float.
     * 
     * @param {string} name The name of the environment variable to look for in {@link process.env}.
     * 
     * @returns {number|undefined} A `float` corresponding to the parsed variable's value, if any, else
     * `undefined`.
     * 
     * @see {@link asFloat}
     * 
     * @note Internally, this function uses {@link Number.parseFloat} to try to convert the string
     * into a number. That means, for example, that a value like "123.5_test" will yield "123.5"
     * instead of failing. In other words, if {@link Number.parseFloat} returns something other than
     * `NaN`, this function won't throw.
     */
    export const asOptionalFloat = (name: string): number | undefined => {
        try {
            asString(name);
        } catch (_) {
            return undefined;
        }
        return asFloat(name);
    }
}