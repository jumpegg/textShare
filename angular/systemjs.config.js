System.config({
    defaultJSExtensions: true,
    paths:{
      'npm/':'node_modules/@angular/'
    },
    map: {
        app:"applicationStartup",
        '@angular/core': 'npm/core/bundles/core.umd.js',
        '@angular/common': 'npm/common/bundles/common.umd.js',
        '@angular/compiler': 'npm/compiler/bundles/compiler.umd.js',
        '@angular/forms':'npm/forms/bundles/forms.umd.js',
        '@angular/http':'npm/http/bundles/http.umd.js',
        '@angular/platform-browser':'npm/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic':'npm/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/router': 'npm/router/bundles/router.umd.js',
        'rxjs': 'node_modules/rxjs',
        'marked': 'node_modules/marked/index.js',
        'mydatepicker': 'node_modules/mydatepicker/bundles/mydatepicker.umd.js',
        'tree-component': 'node_modules/angular-tree-component/dist/angular-tree-component.umd.js'
    },
    packages : {
        app : {
                main : '../client/main.js',
                defaultJSExtensions : 'js'
            },
        rxjs :{
            defaultJSExtensions : "js"
        }
    }
});
