import { isString }  from 'utils/validators/';
import { mergeWith } from 'lodash-es';
import walk          from './walk';

const ERROR_MESSAGE = 'Configuration doesnt match with schema';

const defaultConfig = {
  apiUrl: window.location.origin,
};

const perfectConfig = {
  apiUrl: isString,
};

export default () => new Promise((resolve) => {
  fetch('/config.json')
    .then(response => response.json())
    .then((response) => {
      if (!walk(perfectConfig, response)) {
        throw new Error(ERROR_MESSAGE);
      }
      resolve(mergeWith(response, defaultConfig, ((a, b) => a || b)));
    })
    .catch((error) => {
      resolve(defaultConfig);
      alert(error);
    });
});
