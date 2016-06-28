import assert from 'power-assert';
import gutil from 'gulp-util';
import path from 'path';
import txtjs from '../index.babel.js';

function createFile(fileName, contents) {
  return new gutil.File({
    cwd: __dirname,
    base: __dirname,
    path: path.join(__dirname, fileName),
    contents: new Buffer(contents),
  });
}

it('should pass files when empty file is given', (done) => {
  const file = {isNull: () => true};
  const stream = txtjs();
  stream.on('data', (f) => {
    assert(f === file);
    done();
  });
  stream.write(file);
});

it('should emit error when steam is given', (done) => {
  const file = {isStream: () => true, isNull: () => false};
  const stream = txtjs();
  stream.on('error', (err) => {
    assert(err.message === 'file must be buffer.');
    done();
  });
  stream.write(file);
});

it('should convert with es5', (done) => {
  const contents = 'hello world\nnew line\n"double quote"';
  const file = createFile('hello.txt', contents);
  const stream = txtjs();
  stream.on('data', (f) => {
    assert(f.path === path.join(__dirname, 'hello.txt.js'));
    assert(f.contents.toString() === 'module.exports = "hello world\\nnew line\\n\\"double quote\\"";\n');
    done();
  });
  stream.write(file);
});

it('should convert with es6', (done) => {
  const contents = 'hello world\nnew line\n"double quote"';
  const file = createFile('hello.txt', contents);
  const stream = txtjs({target: 'es6'});
  stream.on('data', (f) => {
    assert(f.path === path.join(__dirname, 'hello.txt.js'));
    assert(f.contents.toString() === 'export default "hello world\\nnew line\\n\\"double quote\\"";\n');
    done();
  });
  stream.write(file);
});
