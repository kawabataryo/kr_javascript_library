module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			options: {
				banner:
				'/**\n' +
				' * kr JavaScript Library\n' +
				' * MIT license\n' +
				' * https://github.com/kawabataryo/kr_javascript_library\n' +
				' * \n'+
				' * @namespace kr\n' +
				' */',
				sourceMap: true
			},
			js: {
				src: 'dest/kr.lib.js',
				dest: 'dest/kr.lib.min.js'
			}
		},
		concat : {
			js : {
				src : [
				'src/kr.namespace.js',
				'src/kr.utils.js',
				'src/kr.decideUA.js',
				'src/kr.getElementsOffsetTop.js'
				],
				dest : 'dest/kr.lib.js'
			}
		},
		watch: {
			js: {
				files: ['src/*.js','js/*.js'],
				tasks: ['concat','uglify']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};