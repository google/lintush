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
/* eslint-disable no-console */
const { red, green } = require("chalk");

const logger = (msg = "") => console.log(msg);

logger.error = (msg) => console.error(red(msg));

logger.success = (msg) => console.error(green(msg));

logger.logIndent = (msg) => console.log(`    ${msg}`);

logger.configFileWritten = (configPath) => {
  logger();
  logger.logIndent("Successfully written config file.");
  logger.logIndent(`Edit file ${green(configPath)} with your configuration`);
};

module.exports = logger;
