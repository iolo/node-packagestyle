var foo = hello.foo,
    bar = hello.foo.bar,
    qux = hello.foo.qux;

exports.greet = function() {
  foo.puts('hello, foo!');
  bar.puts('hello, bar!');
  qux.puts('hello, qux!');
};
