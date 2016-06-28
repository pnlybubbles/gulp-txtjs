import gutil from 'gulp-util';
import through from 'through2';

const PLUGIN_NAME = 'gulp-txtjs';

export default (options) => {
  return through.obj((f, e, cb) => {
    try {
      if (f.isNull()) {
        return cb(null, f);
      }
      if (f.isStream()) {
        return cb(new gutil.PluginError(PLUGIN_NAME, 'file must be buffer.'));
      }
      let content;
      if (options && options.target === 'es6') {
        content = new Buffer(`export default ${JSON.stringify(f.contents.toString('utf8'))};\n`);
      } else { // option.target === 'es5'
        content = new Buffer(`exports.default = ${JSON.stringify(f.contents.toString('utf8'))};\n`);
      }
      const output = new gutil.File({
        cwd: f.cwd,
        base: f.base,
        path: f.path + '.js',
        contents: content,
      });
      return cb(null, output);
    } catch (err) {
      return cb(new gutil.PluginError(PLUGIN_NAME, err));
    }
  });
};
