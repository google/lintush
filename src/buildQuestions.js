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
const {cyan, yellow, green, gray} = require('chalk');
const _ = require('lodash');

const OPTIONAL = yellow('[OPTIONAL] ');
const AUTO_COMPLETE_CHIOCES_TITLE_PADDING = 5;

const getSpaces = (spacing) => _.times(spacing, _.constant(' ')).join('');

const buildQuestionMessage = (question, mandatory, optionsToPrint) => {
  let suffix = '\n';
  if (_.isArray(optionsToPrint)) {
    suffix += gray(optionsToPrint.join(' | '));
    suffix += `\n`;
  }
  if (!mandatory) {
    return OPTIONAL + cyan(question) + suffix;
  }
  return green(question) + suffix;
};

const buildAutoCompleteChoices = (name, choices, mandatory) => {
  if (_.isArray(choices)) {
    const result = [];

    if (!mandatory) {
      result.push({
        title: `None ${gray(
            `if you choose this, the ${name} will be omitted`
        )}`,
        value: 'NONE',
      });
    }

    return result.concat(
        choices.map((choice) => ({title: choice, value: choice}))
    );
  }
  let minValueLength = 1;
  let extensionFlg = false;
  _.forEach(choices, (value, title) => {
    extensionFlg = _.isArray(value);
    minValueLength = Math.max(
        minValueLength,
        title.length + AUTO_COMPLETE_CHIOCES_TITLE_PADDING
    );
  });

  if (extensionFlg) {
    return _.map(choices, (title, value) => ({
      // eslint-disable-next-line max-len
      title: `${value}${getSpaces(minValueLength - value.length)} ${title[1].titlePrefix}  ${gray(title[0])}`,
      value: title[1].value,
    }));
  }

  return _.map(choices, (title, value) => ({
    title: `${value}${getSpaces(minValueLength - value.length)}${gray(title)}`,
    value,
  }));
};

const buildAutoCompleteQuestion = (
    name,
    {question, choices, mandatory},
    initialValue
) => ({
  type: 'autocomplete',
  initial: initialValue,
  name,
  message: buildQuestionMessage(question, mandatory, choices),
  choices: buildAutoCompleteChoices(name, choices, mandatory),
});

const buildTextQuestion = (name, {question, mandatory}, initialValue) => ({
  type: 'text',
  initial: initialValue,
  name,
  message: buildQuestionMessage(question, mandatory),
});

function buildQuestions(config, prevValues = {}) {
  return [
    buildAutoCompleteQuestion('type', config.type, prevValues.type),
    buildAutoCompleteQuestion('scope', config.scope, prevValues.scope),
    buildTextQuestion('subject', config.subject, prevValues.subject),
    buildTextQuestion('body', config.body, prevValues.body),
    buildTextQuestion('bugNumber', config.bugNumber, prevValues.bugNumber),
    buildTextQuestion('screenshot', config.screenshot, prevValues.screenshot),
  ];
}

module.exports = buildQuestions;
