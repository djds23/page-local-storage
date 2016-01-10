/* @flow */

class pagelocalstorage {
  static setItem(key: string, value: string): void {
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
}

export default pagelocalstorage;

