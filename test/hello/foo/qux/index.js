var foo = hello.foo;

exports.puts = function (msg) {
  console.log(module.id, '--->', msg);
  foo.puts('hi, foo! this is qux!');
};

