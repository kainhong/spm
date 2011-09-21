// vim: set tabstop=2 shiftwidth=2:

/**
 * @fileoverview transport external modules to seajs compatible code.
 * @author yyfrankyy@gmail.com (Frank Xu)
 */

// arguments parser
//
// get these args:
//
//     a b c -d e -fff g -h
//
// with this available options:
//
//     {
//       '-d': {
//         alias: ['-ddd'],
//         length: 1
//       },
//       '-f': {
//         alias: ['-fff']
//       }
//     }
//
// parse into:
//
//     {
//       options: {
//         '-d': [e]
//         '-f': []
//       },
//       modules: ['a', 'b', 'c', 'g']
//     }
//
module.exports = function(args, AVAILABLE_OPTIONS) {
  args = args || [];
  AVAILABLE_OPTIONS = AVAILABLE_OPTIONS || {};

  var options = {};
  var modules = [];

  for (var i = 0, l = args.length; i < l; i++) {
    var arg = args[i];

    // NOT an option. An option starts with `-`
    if (arg.charAt(0) !== '-') {
      modules.push(arg);
      continue;
    }

    var name;

    for (var key in AVAILABLE_OPTIONS) {
      var alias = AVAILABLE_OPTIONS[key].alias || [];

      if (alias.indexOf(arg) !== -1) {
        name = key;
        break;
      }
    }
    
    if (!name) continue;

    options[name] = [];
    var len = AVAILABLE_OPTIONS[name].length || 0;

    // have more arguments for this option
    while (len--) {
      i++;
      if (args[i] === undefined) {
        throw 'Option arguments are not enough.';
      }
      options[key].push(args[i]);
    }
  }

  return {
    options: options,
    modules: modules
  };
};