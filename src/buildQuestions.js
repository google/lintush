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
const { cyan, yellow, green, gray } = require("chalk");

const OPTIONAL = yellow("[OPTIONAL] ");
const AUTO_COMPLETE_CHIOCES_TITLE_PADDING = 5;

const getSpaces = (spacing = 0) => {
  let result = "";
  for (let i = 0; i < spacing; i++) {
    result += " ";
  }
  return result;
};

const buildQuestionMessage = (question, mandatory, optionsToPrint) => {
  let suffix = "\n";
  if (Array.isArray(optionsToPrint)) {
    suffix += gray(optionsToPrint.join(" | "));
    suffix += `\n`;
  }
  if (!mandatory) {
    return OPTIONAL + cyan(question) + suffix;
  }
  return green(question) + suffix;
};

const buildAutoCompleteChoices = (name, choices, mandatory) => {
  if (Array.isArray(choices)) {
    const result = [];

    if (!mandatory) {
      result.push({
        title: `None ${gray(
          `if you choose this, the ${name} will be omitted`
        )}`,
        value: "NONE",
      });
    }

    return result.concat(
      choices.map((choice) => ({ title: choice, value: choice }))
    );
  }
  let minValueLength = 1;

  const values = Object.keys(choices);

  values.forEach((title) => {
    minValueLength = Math.max(
      minValueLength,
      title.length + AUTO_COMPLETE_CHIOCES_TITLE_PADDING
    );
  });

  return values.map((value) => {
    const spaces = getSpaces(minValueLength - value.length);
    const title = `${value}${spaces}${gray(choices[value])}`;

    return {
      title,
      value,
    };
  });
};

const buildAutoCompleteQuestion = (
  name,
  { question, choices, mandatory },
  initialValue
) => ({
  type: "autocomplete",
  initial: initialValue,
  name,
  message: buildQuestionMessage(question, mandatory, choices),
  choices: buildAutoCompleteChoices(name, choices, mandatory),
});

const buildTextQuestion = (name, { question, mandatory }, initialValue) => ({
  type: "text",
  initial: initialValue,
  name,
  message: buildQuestionMessage(question, mandatory),
});

const buildQuestions = (config, prevValues = {}) => {
  const optionalIsFixQuestion = config.isFix
    ? buildAutoCompleteQuestion("isFix", config.isFix, prevValues.isFix)
    : undefined;

  return [
    buildAutoCompleteQuestion("type", config.type, prevValues.type),
    buildAutoCompleteQuestion("scope", config.scope, prevValues.scope),
    buildTextQuestion("subject", config.subject, prevValues.subject),
    buildTextQuestion("body", config.body, prevValues.body),
    buildTextQuestion("bugNumber", config.bugNumber, prevValues.bugNumber),
    optionalIsFixQuestion,
    buildTextQuestion("screenshot", config.screenshot, prevValues.screenshot),
  ].filter((question) => !!question);
};

module.exports = buildQuestions;
