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
 *  Edit this code to fit your lint demands:
 */
const scopeEnum = [
  // TODO: add desired scopes here (this is an example)
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
  rules: {
    "body-max-line-length": [2, "always", 72],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "scope-enum": [
      2,
      "always",
      scopeEnum
    ],
    "type-enum": [
      2,
      "always",
      ["chore", "docs", "feat", "fix", "refactor", "revert", "style", "test"]
    ]
  }
};
`;
