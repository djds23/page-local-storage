# page-local-storage

This package creates a localStorage object for each different URL.

```javascript
// http://example.com/user/123
pageLocalStorage.setItem("name", "Greg")

// http://example.com/user/456
pageLocalStorage.setItem("name", "Frank")

// http://example.com/user/789
pageLocalStorage.setItem("name", "Robert")

/*
  window.localStorage now has this:
  {
    "http://example.com/user/123": '{"name":"Greg"}',
    "http://example.com/user/456": '{"name":"Frank"}',
    "http://example.com/user/789": '{"name":"Robert"}'
  }
*/
```

# Installation

`npm install page-local-storage`

# Fork and Contribute

This project uses babel, ES6, browserify and flow to deliver type safe javascript. You can learn more about installing [flow here](http://flowtype.org/docs/getting-started.html#_). Take a peak [here to read about the different type annotations](http://flowtype.org/docs/quick-reference.html#_).

Fork and make a pull request! I will be happy to review all suggestions.

The MIT License (MIT)
Copyright (c) 2016 Dean Silfen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
