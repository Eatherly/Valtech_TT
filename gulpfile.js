
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano =require('gulp-cssnano');
var rename  =require('gulp-rename');
var del = require('del');
var imagemin =require('gulp-imagemin');
var pngquant =require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');

gulp.task('myfirsttask' , function() {
    var name = "Eatherly";
    console.log('Hi my name is ' + name);
});

gulp.task('sass' , function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})); //
});

gulp.task('browser-sync' , function() {
    browserSync({
        server: {
            baseDir: "app"
        },
        notify: false
    });

});

gulp.task('scripts' , function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/bootstrap/dist/js/bootstrap.min.js',
        'app/libs/jquery-ui/ui/**/*.js'
    ])

        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));

});
gulp.task('img' , function() {
    return gulp.src(
        'app/image/**/*'
    )
        .pipe(imagemin())
        .pipe(gulp.dest('app/image'));
})

gulp.task('css-libs' , ['sass'] , function() {
  return gulp.src('app/styles/libs.css')
      .pipe(cssnano())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('app/css'));
});

gulp.task('watch' ,['browser-sync','css-libs','sass', 'scripts'], function(){
    gulp.watch('app/sass/**/*.scss' , ['sass']);
    gulp.watch('app/*.html' , browserSync.reload);
    gulp.watch('app/scripts/**/*.js' , browserSync.reload);
    gulp.watch('app/sass/**/*.scss' , browserSync.reload);
});

gulp.task('clear' , function() {
    return del.sync('dist');
})

gulp.task('json' , function(){
	var buildJson = gulp.src('app/*.json')
    .pipe(gulp.dest('dist'));

})



gulp.task('buildup' , ['clear','sass' , 'scripts' , 'img' ,'json'], function() {
var buildCss = gulp.src([
    'app/css/style.css',
    'app/styles/libs.min.css'
])
    .pipe(gulp.dest('dist/css'))

var  buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest("dist/fonts"))

var buildJs = gulp.src('app/scripts/**/*')
    .pipe(gulp.dest('dist/scripts'))
    var buildImg = gulp.src('app/image/**/*')
        .pipe(gulp.dest('dist/image'))
var buildlips = gulp.src('app/libs/**/*')
    .pipe(gulp.dest('dist/libs'));
var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});



gulp.task('babel', function() {
    return gulp.src('app/js/**/*')
        .pipe(babel({
            presets: [es2015]
        }))
        .pipe(gulp.dest('dist/scripts'));
});