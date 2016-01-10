/* @flow */

import pageLocalStorage from './store';

if (window !== undefined) {
  window.pageLocalStorage = pageLocalStorage
}

