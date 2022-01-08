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
/* eslint-disable max-len */
module.exports = `/**
 *  TODO: Edit this code to fit your lint demands:
 *  For example:
 * 
 *  const commitScopes = require("./commitlint.config").rules["scope-enum"][2];
 */
 
const commitScopes = [
  "button",
  "checkbox",
  "config",
  "fonts",
  "grid",
  "palette",
  "web-icons",
  "webpack"
];

module.exports = {
  body: {
    mandatory: false,
    question:
      "Explain the problem that this commit is solving. Focus on why you are making this change as opposed to how (the code explains that). Are there any side effects or other unintuitive consequences of this change?"
  },
  bugNumber: {
    mandatory: false,
    question: "Enter the bug id or click enter"
  },
  isFix: {
    choices: {
      true: "The commit fixes the bug",
      false: "The commit is related to the bug"
    },
    mandatory: false,
    question: "Does this commit fix the bug?"
  },
  scope: {
    choices: commitScopes,
    mandatory: false,
    question: "What is the scope of the commit?"
  },
  screenshot: {
    mandatory: false,
    question:
      "If you have a screenshot of the fix, paste the URL here or click enter"
  },
  subject: {
    mandatory: false,
    question:
      "Commit title - Summarize your changes in 50 characters or less (use imperative mood)"
  },
  type: {
    choices: {
      chore: "other changes that don't modify src or test files",
      docs: "changes to documentation",
      feat: "new feature",
      fix: "bug fix",
      refactor: "code change that neither fixes a bug nor adds a feature",
      revert: "reverts a previous commit",
      style: "formatting, missing semi colons, etc; no code change",
      test: "adding or refactoring tests; no production code change"
    },
    mandatory: true,
    question: "What it the type of the commit?"
  }
};
`;
