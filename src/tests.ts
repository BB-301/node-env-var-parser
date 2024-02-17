import { EnvVar } from ".";
import assert from "assert";

const MY_ENV_VAR_NAME: string = "MY_ENV_VAR";
const MY_MISSING_ENV_VAR_NAME: string = "MY_MISSING_ENV_VAR";

const testEnvVarAsString = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.throws(() => {
        EnvVar.asString(MY_MISSING_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = "";
    assert.throws(() => {
        EnvVar.asString(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = "this_is_a_test";
    assert.equal(EnvVar.asString(MY_ENV_VAR_NAME), "this_is_a_test");
}

const testEnvVarAsOptionalString = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.equal(EnvVar.asOptionalString(MY_MISSING_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = "";
    assert.equal(EnvVar.asOptionalString(MY_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = "this_is_a_test";
    assert.equal(EnvVar.asOptionalString(MY_ENV_VAR_NAME), "this_is_a_test");
}

const testEnvVarAsInteger = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.throws(() => {
        EnvVar.asInteger(MY_MISSING_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `invalid_number`;
    assert.throws(() => {
        EnvVar.asInteger(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = "111";
    assert.equal(EnvVar.asInteger(MY_ENV_VAR_NAME), 111);

    process.env[MY_ENV_VAR_NAME] = "111.55";
    assert.equal(EnvVar.asInteger(MY_ENV_VAR_NAME), 111);

    process.env[MY_ENV_VAR_NAME] = "-111";
    assert.equal(EnvVar.asInteger(MY_ENV_VAR_NAME), -111);

    process.env[MY_ENV_VAR_NAME] = "111test";
    assert.equal(EnvVar.asInteger(MY_ENV_VAR_NAME), 111);

    process.env[MY_ENV_VAR_NAME] = "-111test";
    assert.equal(EnvVar.asInteger(MY_ENV_VAR_NAME), -111);
}

const testEnvVarAsOptionalInteger = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.equal(EnvVar.asOptionalInteger(MY_MISSING_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = "";
    assert.equal(EnvVar.asOptionalInteger(MY_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = "invalid";
    assert.throws(() => {
        EnvVar.asOptionalInteger(MY_ENV_VAR_NAME)
    });

    process.env[MY_ENV_VAR_NAME] = "123";
    assert.equal(EnvVar.asOptionalInteger(MY_ENV_VAR_NAME), 123);
}

const testEnvVarAsFloat = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.throws(() => {
        EnvVar.asFloat(MY_MISSING_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `invalid_number`;
    assert.throws(() => {
        EnvVar.asFloat(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = "111";
    assert.equal(EnvVar.asFloat(MY_ENV_VAR_NAME), 111);

    process.env[MY_ENV_VAR_NAME] = "111.6";
    assert.equal(EnvVar.asFloat(MY_ENV_VAR_NAME), 111.6);

    process.env[MY_ENV_VAR_NAME] = "-111.6";
    assert.equal(EnvVar.asFloat(MY_ENV_VAR_NAME), -111.6);

    process.env[MY_ENV_VAR_NAME] = "111.6test";
    assert.equal(EnvVar.asFloat(MY_ENV_VAR_NAME), 111.6);

    process.env[MY_ENV_VAR_NAME] = "-111.6test";
    assert.equal(EnvVar.asFloat(MY_ENV_VAR_NAME), -111.6);
}

const testEnvVarAsOptionalFloat = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.equal(EnvVar.asOptionalFloat(MY_MISSING_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = "";
    assert.equal(EnvVar.asOptionalFloat(MY_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = `invalid_number`;
    assert.throws(() => {
        EnvVar.asOptionalFloat(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = "111";
    assert.equal(EnvVar.asOptionalFloat(MY_ENV_VAR_NAME), 111);
}

const testEnvVarAsBoolean = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.throws(() => {
        EnvVar.asBoolean(MY_MISSING_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `invalid_bool`;
    assert.throws(() => {
        EnvVar.asBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `TRU`;
    assert.throws(() => {
        EnvVar.asBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `FA`;
    assert.throws(() => {
        EnvVar.asBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `-1`;
    assert.throws(() => {
        EnvVar.asBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `1.0`;
    assert.throws(() => {
        EnvVar.asBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `0.0`;
    assert.throws(() => {
        EnvVar.asBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = `TRUE`;
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = `True`;
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = "true";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = "1";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = "t";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = "tRue";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = "false";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), false);

    process.env[MY_ENV_VAR_NAME] = "False";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), false);

    process.env[MY_ENV_VAR_NAME] = "FALSE";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), false);

    process.env[MY_ENV_VAR_NAME] = "F";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), false);

    process.env[MY_ENV_VAR_NAME] = "FalSE";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), false);

    process.env[MY_ENV_VAR_NAME] = "0";
    assert.equal(EnvVar.asBoolean(MY_ENV_VAR_NAME), false);
}

const testEnvVarAsOptionalBoolean = () => {
    delete process.env[MY_ENV_VAR_NAME];

    assert.equal(EnvVar.asOptionalBoolean(MY_MISSING_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = "";
    assert.equal(EnvVar.asOptionalBoolean(MY_ENV_VAR_NAME), undefined);

    process.env[MY_ENV_VAR_NAME] = `invalid_bool`;
    assert.throws(() => {
        EnvVar.asOptionalBoolean(MY_ENV_VAR_NAME);
    });

    process.env[MY_ENV_VAR_NAME] = "true";
    assert.equal(EnvVar.asOptionalBoolean(MY_ENV_VAR_NAME), true);

    process.env[MY_ENV_VAR_NAME] = "false";
    assert.equal(EnvVar.asOptionalBoolean(MY_ENV_VAR_NAME), false);
}

const main = () => {
    testEnvVarAsString();
    testEnvVarAsOptionalString();
    testEnvVarAsInteger();
    testEnvVarAsOptionalInteger()
    testEnvVarAsFloat();
    testEnvVarAsOptionalFloat()
    testEnvVarAsBoolean();
    testEnvVarAsOptionalBoolean();
}

main();