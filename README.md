packagestyle
============

`packagestyle` is java package style module loader.

## how to use by example

### directory structure

```
/your_project_dir
  /bin
    /main.js /* this is main module */
  /lib
    /hello
      /world.js
      /foo
        /bar.js
```

### bin/main.js

```
// NOTE: GLOBAL to declare global variable
require('packagestyle').imports('../lib/hello', GLOBAL);
hello.world.greet('iolo');
```

### lib/hello/world.js

```
// NOTE: no require!!!
var puts = hello.foo.bar.puts;
exports.greet = function(name) {
  puts('hello,' + name);
};
```

### lib/hello/foo/bar.js

```
exports.puts = function(msg) {
  console.log(msg);
};
```

----
may the source be with you...
