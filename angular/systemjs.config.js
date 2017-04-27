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
        '@angular/platform-browser/animations' : 'npm/platform-browser/bundles/platform-browser-animations.umd.min.js',
        '@angular/router': 'npm/router/bundles/router.umd.js',
        '@angular/animations':'npm/animations/bundles/animations.umd.js',
        // '@angular/animations/browser':'npm/animations/bundles/animations.umd.js',
        // '@angular/animations/browser':'npm/animations/browser.d.ts',
        '@angular/material':'npm/material/bundles/material.umd.js',
        'jquery': 'node_modules/jquery/dist/jquery.js',
        'rxjs': 'node_modules/rxjs',
        'marked': 'node_modules/marked/index.js',
        'mydatepicker': 'node_modules/mydatepicker/bundles/mydatepicker.umd.js',
        'tree-component': 'node_modules/angular-tree-component/dist/angular-tree-component.umd.js'
    },
    packages : {
        '../client': {
            defaultExtension : 'js'
        },
        app : {
                main : '../client/main.js',
                defaultExtension : 'js'
            },
        rxjs :{
            defaultExtension : "js"
        }
    }
});
