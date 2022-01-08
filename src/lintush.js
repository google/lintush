/**
    Copyright 2019 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
**/
const findUp = require("find-up");
const path = require("path");
const minimist = require("minimist");
const askQuestionsAndValidate = require("./askQuestionsAndValidate");
const handleCommitMessage = require("./handleCommitMessage");
const logger = require("./logger");
const { createConfigFileIfNeeded } = require("./utils");

const CWD = process.cwd();
const argv = minimist(process.argv.slice(2));
const defaultLintushConfigPath = path.join(CWD, "lintush-config.js");
const defaultCommitLintConfigPath = path.join(CWD, "commitlint.config.js");

const getLintConfigValue = (commitLintConfig, ruleName, defaultValue) => {
  if (
    commitLintConfig.rules &&
    commitLintConfig.rules[ruleName] &&
    commitLintConfig.rules[ruleName]["2"] !== undefined
  ) {
    return commitLintConfig.rules[ruleName]["2"];
  } else {
    return defaultValue;
  }
};

(async () => {
  if (argv.version) {
    const currentVersion = require("../package").version;
    logger(currentVersion);
    return;
  }

  if (argv.init) {
    createConfigFileIfNeeded(
      defaultLintushConfigPath,
      require("./lintush-config-example")
    );
    createConfigFileIfNeeded(
      defaultCommitLintConfigPath,
      require("./commitlint-config-example")
    );
    return;
  }

  const commitLintConfigPath = await findUp.sync("commitlint.config.js");
  const lintushConfigPath =
    (await findUp.sync("lintush-config.js")) ||
    (await findUp.sync("lintush-config.json"));

  if (!commitLintConfigPath) {
    logger.error(`Could not find config file ${CWD}/commitlint.config.js`);
    logger.success(`Type "lintush --init" to create it`);
    process.exit(1);
  }
  if (!lintushConfigPath) {
    logger.error(`Could not find config file ${CWD}/lintush-config.js|json`);
    logger.success(`Type "lintush --init" to create it`);
    process.exit(1);
  }
  const commitLintConfig = require(commitLintConfigPath);
  const lintushConfig = require(lintushConfigPath);

  const bodyMaxLineLength = getLintConfigValue(
    commitLintConfig,
    "body-max-line-length",
    72
  );

  const commitMessage = await askQuestionsAndValidate(
    lintushConfig,
    commitLintConfig,
    bodyMaxLineLength
  );

  handleCommitMessage(commitMessage);
})();
