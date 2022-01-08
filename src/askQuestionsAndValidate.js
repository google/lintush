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
/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */

const prompts = require("prompts");
const lint = require("@commitlint/lint").default;
const { format } = require("@commitlint/format");
const load = require("@commitlint/load").default;

const buildQuestions = require("./buildQuestions");
const parsers = require("./parsers");
const logger = require("./logger");

const { parseScope, parseBody, parseBugNumber, parseScreenshot } = parsers;

const askQuestionsAndValidate = async (
  lintushConfig,
  commitLintConfig,
  bodyMaxLineLength
) => {
  let valid = false;
  let type = "";
  let scope = "";
  let subject = "";
  let body = "";
  let bugNumber = "";
  let isFix = "";
  let screenshot = "";
  let commitMessage = "";

  while (!valid) {
    const previousValues = {
      type,
      scope,
      subject,
      body,
      bugNumber,
      isFix,
      screenshot,
    };
    const results = await prompts(
      buildQuestions(lintushConfig, previousValues)
    );

    // apply current values to previous values:
    ({ type, scope, subject, body, bugNumber, isFix, screenshot } = results);
    const optionalIsFix = isFix === undefined || isFix === "true";

    const commitParts = [
      `${type}${parseScope(scope)}: ${subject}\n`,
      parseBody(body, bodyMaxLineLength),
      parseBugNumber(bugNumber, optionalIsFix),
      parseScreenshot(screenshot),
    ];

    commitMessage = commitParts.join("\n").trim();

    await load(commitLintConfig)
      .then((opts) => {
        const parserOpts = opts.parserPreset
          ? { parserOpts: opts.parserPreset.parserOpts }
          : {};
        return lint(commitMessage, opts.rules, parserOpts);
      })
      .then((report) => {
        if (!valid) {
          logger.error(
            format({
              results: [report],
            })
          );
        }
        valid = report.valid;
      });
  }
  return commitMessage;
};

module.exports = askQuestionsAndValidate;
