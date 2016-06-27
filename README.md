# gulp-txtjs

Convert text file to js to load by js module system.

## Install

```
npm install --save-dev gulp-txtjs
```

## Usage

With es6

```javascript
import gulp from 'gulp';
import txtjs from 'gulp-txtjs';

gulp.task('txtjs', () => {
  return gulp
    .src('./src/**/*.txt')
    .pipe(txtjs({target: 'es6'}))
    .pipe(gulp.dest('./lib'));
});
```

## Options

* **target** - Text string will be wrapped with specified module style. Supported style: `'es6'`, `'es5'`. (default: `'es5'`)

## Sample

### hello.txt

Sample source.

```
hello world
```

### hello.txt.js with es6

Convert with `es6` option.

```javascript
export default 'hello world';
```

### hello.txt.js with es5

Convert with `es5` option.

```javascript
exports.default = 'hello world';
```

Exported js file will be added `.js` extension.  You can import the text file by specifying the path with file name including the extension. (ex: `import hello from 'hello.txt'`)