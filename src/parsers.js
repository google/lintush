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
const ANY_SEPARATOR = new RegExp(/\;|\,|\ /);

const parseScope = (scope) => {
  const isScopeEmpty = !scope || scope === "NONE";
  return isScopeEmpty ? "" : `(${scope})`;
};

const parseBody = (body, bodyMaxLineLength) => {
  if (!body) {
    return "";
  }
  const words = body.trim().split(" ");
  let result = "";
  let lineCharCount = 0;
  words.forEach((word) => {
    if (lineCharCount === 0) {
      lineCharCount += word.length;
      result += word;
    } else if (lineCharCount + word.length + 1 < bodyMaxLineLength) {
      lineCharCount += word.length + 1;
      result += ` ${word}`;
    } else {
      result += `\n${word}`;
      lineCharCount = word.length;
    }
  });
  return result.trim();
};

const parseSingleBugNumber = (bugNumber, isFix = true) => {
  if (bugNumber.indexOf("b/") !== -1) {
    return isFix ? `Fixes: ${bugNumber}` : `Bug: ${bugNumber}`;
  }
  return isFix ? `Fixes: b/${bugNumber}` : `Bug: b/${bugNumber}`;
};

const parseBugNumber = (bugNumberString, isFix = true) => {
  if (!bugNumberString) {
    return "";
  }

  return `\n${bugNumberString
    .split(ANY_SEPARATOR)
    .filter((bug) => !!bug) // ignore spaces
    .map((bug) => parseSingleBugNumber(bug, isFix))
    .join("\n")}`;
};

const parseScreenshot = (screenshot) => {
  if (screenshot) {
    return `Screenshot: ${screenshot}`;
  }
  return "";
};

module.exports = {
  parseScope,
  parseBody,
  parseBugNumber,
  parseScreenshot,
};
