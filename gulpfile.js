const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const path = require('path')
const map = require('map-stream')

// 获取文件路径
function fp(getfile) {
    return map(function (file, cb) {
        if (getfile) {
            getfile(file)
        }
        cb(null, file)
    })
}

// 监听错误
function swallowError(error) {
    console.error(error.toString())
    this.emit('end')
}

// 定义公共转义方法
function scssToWxss(filePath, dirPath) {
    gulp.src(filePath)
        .pipe(sass())
        .on('error', swallowError)
        .pipe(rename(path => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(dirPath))
}


// 立即编译所有sass文件
gulp.task('all', () => {
    const cb = fp(file => {
        const fPath = file.path
        const fileDirname = path.dirname(fPath)
        scssToWxss(fPath, fileDirname)
    })
    gulp.src(['app/style/*.scss', 'app/pages/*/*.scss'], { read: false }).pipe(cb)
})

// 监视文件改动并重新载入
gulp.task('serve', () => {
    // 监听变化文件
    const watch_files = [
        'style/**/*.scss',
        'style/*.scss',
        'pages/**/*.scss',
    ]
    // 变化时执行的方法
    const watch_methods = []

    // 监听变化
    const watcher = gulp.watch(watch_files, { cwd: 'app' }, watch_methods)
    watcher.on('change', event => {
        console.log(event)
        // 获取文件路径
        const filePath = event.path
        // 所在文件夹
        const fileDirname = path.dirname(filePath)

        if (fileDirname.includes(`pages`)) {
            scssToWxss(filePath, fileDirname)
        }
        if (fileDirname.includes(`style`)) {
            scssToWxss('app/style/*.scss', 'app/style')
        }
    });
})
