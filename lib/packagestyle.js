/*jslint node:true,white:true,nomen:true */
'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

/**
 * ```
 * require('packagestyle').imports('./lib');
 * ```
 * @param modulePath {string}
 * @param parentModule {object}
 */
function imports(modulePath, parentModule) {
  var stat, newModule, existingModule, moduleFile, moduleName, submoduleFiles, submoduleFile;
  
  if (!parentModule) {
    parentModule = {};
  }

  moduleFile = path.resolve(__dirname, modulePath);

  /*jslint stupid:true */
  if (!fs.existsSync(moduleFile)) {
    throw new Error('MODULE NOT FOUND:' + moduleFile);
  }
  /*jslint stupid:false */

  /*jslint stupid:true */
  stat = fs.statSync(moduleFile);
  /*jslint stupid:false */

  if (stat.isFile()) {
    if (path.extname(moduleFile) === '.js') {
      moduleName = path.basename(moduleFile, '.js');

      // index module is reference to parent module
      /*
      if (moduleName === 'index') {
        console.log('********* load index module:', modulePath);
        parentModule.index = parentModule;
        return parentModule;
      }
      */

      existingModule = parentModule[moduleName];
      delete parentModule[moduleName];

      parentModule.__defineGetter__(moduleName, function () {
        console.log('********* load file module:', modulePath);
        newModule = require(modulePath);

        // mixin with existing module
        // ex) when there are both module.js and module/index.js
        newModule = _.extend(newModule, existingModule);

        // bypass getter later
        delete parentModule[moduleName];
        parentModule[moduleName] = newModule;
        return newModule;
      });
    }
  } else if (stat.isDirectory()) {
    moduleName = path.basename(moduleFile);

    parentModule.__defineGetter__(moduleName, function () {
      try {
        console.log('********* load directory module:', modulePath);
        newModule = require(modulePath + '/index');
      } catch(e) {
        console.log('********* failed to load directory module:', e);
        console.log('********* create dummy module:', modulePath);
        newModule = { };
      }

      /*jslint stupid:true */
      submoduleFiles = fs.readdirSync(moduleFile);
      /*jslint stupid:false */

      submoduleFiles.forEach(function (submoduleFileName) {
        submoduleFile = path.resolve(moduleFile, submoduleFileName);
        imports(submoduleFile, newModule);
      });

      // bypass getter later
      delete parentModule[moduleName];
      parentModule[moduleName] = newModule;
      return newModule;
    });
  }

  return parentModule;
}

exports.imports = imports;
