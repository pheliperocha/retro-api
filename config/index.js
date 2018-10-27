const _ = require('lodash');

const config = require('./config.js');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
const debug = require('debug')('express:server');

global.gConfig = finalConfig;

debug(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);