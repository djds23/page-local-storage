/* @flow */
import { ArgumentError, ReadOnlyError } from './errors'

class pageLocalStorage {
  static setItem(key: string, value: string): void {
    if (arguments.length < 2) {
      throw new ArgumentError('setItem', arguments.length, 2);
    }

    let localCache = window.localStorage.getItem(window.location.href);

    if (localCache) {
      localCache = JSON.parse(localCache);
    } else {
      localCache = {};
    }

    localCache[key] = value;
    window.localStorage.setItem(window.location.href, JSON.stringify(localCache));
  }

  static getItem(key: string): ?string {
    let localCache = window.localStorage.getItem(window.location.href);

    if (!localCache) {
      return null;
    }

    localCache = JSON.parse(localCache);
    let storedValue = localCache[key];
    if (storedValue === undefined) {
      return null;
    }

    return storedValue;
  }

  static removeItem(key: string): void {
    let localCache = window.localStorage.getItem(window.location.href);
    if (localCache === null) {
      return;
    }

    let localObj = JSON.parse(localCache);
    if (Object.keys(localObj).length < 2) {
      window.localStorage.removeItem(window.location.href);
      return;
    }

    delete localObj[key];
    window.localStorage.setItem(window.location.href, JSON.stringify(localObj));
  }

  static key(index: number): ?string {
    let localCache = window.localStorage.getItem(window.location.href);
    if (localCache === null) {
      return null;
    }

    let keyArray = Object.keys(JSON.parse(localCache));
    let returnValue = keyArray[index];
    return typeof returnValue === 'undefined'  ? null : returnValue;
  }

  static clear(): void {
    window.localStorage.removeItem(window.location.href);
  }
}

pageLocalStorage.__defineGetter__('length', () => {
  let localCache = window.localStorage.getItem(window.location.href);
  if (localCache === null) {
    return 0;
  }

  let localObj = JSON.parse(localCache);
  return Object.keys(localObj).length;
})

pageLocalStorage.__defineSetter__('length', () => {
  throw new ReadOnlyError('length');
})

export default pageLocalStorage;

