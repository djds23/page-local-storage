import {assert, expect} from 'chai';
import simple from 'simple-mock';
import jsdom from 'mocha-jsdom';

import MockLocalStorage from './localStorage';
import pageLocalStorage from '../src/store';


describe('pageLocalStorage', function () {
  jsdom()

  beforeEach(function () {
    global.window = document.defaultView;
    window.localStorage = new MockLocalStorage();
  })

  describe('#setItem', function () {
    beforeEach(function () {
      window.location.href = 'about:blank';
    })

    it('demands two arguments', function () {
      let badCall = function () {
        pageLocalStorage.setItem('foo');
      }

      expect(badCall).to.throw(Error);
    })

    it('sets items in the current url', function () {
      let expectedStore = {};

      let urlOne = 'https://github.com/djds23/page-local-storage/pulls/1';
      expectedStore[urlOne] = JSON.stringify({foo: 'bar'});

      window.location.href = urlOne;
      pageLocalStorage.setItem('foo', 'bar');
      expect(window.localStorage.store).to.eql(expectedStore);

      let urlTwo = 'https://github.com/djds23/page-local-storage/pulls/2';
      expectedStore[urlTwo] = JSON.stringify({foo: 'quux'});

      window.location.href = urlTwo;
      pageLocalStorage.setItem('foo', 'quux');
      expect(window.localStorage.store).to.eql(expectedStore);
    })

    it('appends to the current localStorage if nothing is added', function () {
      let expectedStore = { 'about:blank': JSON.stringify({ foo: 'bar', quux: 'baz' }) };
      pageLocalStorage.setItem('foo', 'bar');
      pageLocalStorage.setItem('quux', 'baz');
      expect(window.localStorage.store).to.eql(expectedStore);
    })
  })

  describe('#getItem', function () {
    it('returns null if store is empty', function () {
      expect(pageLocalStorage.getItem('foo')).to.be.null;
    })

    it('returns item cached on page', function () {
      let expectedStore = { 'about:blank': JSON.stringify({ foo: 'bar' }) };
      pageLocalStorage.setItem('foo', 'bar');
      expect(window.localStorage.store).to.eql(expectedStore);
      expect(pageLocalStorage.getItem('foo')).to.eql('bar');
    })
  })

  describe('#clear', function () {
    it('removes all items from page local storage', function () {
      let expectedStore = { 'about:blank': JSON.stringify({ foo: 'bar' }) };

      pageLocalStorage.setItem('foo', 'bar');
      expect(pageLocalStorage.getItem('foo')).to.eql('bar');

      pageLocalStorage.clear();
      expect(pageLocalStorage.getItem('foo')).to.be.null;
    })
  })

  describe('#removeItem', function () {
    it('does nothing if the cache is empty', function () {
      pageLocalStorage.removeItem('nonExistant');
      expect(window.localStorage.store).to.be.empty;
    })

    it('removes one key from new page local cache', function () {
      pageLocalStorage.setItem('foo', 'bar');
      pageLocalStorage.setItem('quux', 'baz');

      expect(window.localStorage.store).to.eql({
        'about:blank': JSON.stringify({foo: 'bar', quux: 'baz'})
      });

      pageLocalStorage.removeItem('foo');
      expect(window.localStorage.store).to.eql({
        'about:blank': JSON.stringify({quux: 'baz'})
      });
    })

    it('removes url key if new page local cache is empty', function () {
      pageLocalStorage.setItem('foo', 'bar');
      expect(window.localStorage.store).to.eql({
        'about:blank': JSON.stringify({foo: 'bar'})
      });

      pageLocalStorage.removeItem('foo');
      expect(window.localStorage.store).to.eql({});
    })
  })

  describe('#length', function () {
    it('returns the number of items in the page local store', function () {
      expect(pageLocalStorage.length).to.eql(0);
      pageLocalStorage.setItem('foo', 'bar');
      expect(pageLocalStorage.length).to.eql(1);
    })

    it('is read-only', function () {
      expect(() => {
        pageLocalStorage.length = 100;
      }).to.throw(Error);
    })
  })

  describe('#key', function () {
    it('returns null when empty', function () {
      expect(pageLocalStorage.key(0)).to.be.null;
    })

    it('returns the key attached to the object', function () {
      pageLocalStorage.setItem('foo', 'bar');
      expect(pageLocalStorage.key(0)).to.eql('foo');
    })
  })
});

