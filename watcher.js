const chokidar = require('chokidar');
const { broadcast } = require('./server');

// Initialize watcher with expanded paths
const watcher = chokidar.watch([
    '*.html',
    'css/*.css',
    'js/*.js',
    'js/stories/*.js',
    'assets/images/*.png',
    'assets/images/*.webp'
], {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: false,     // show initial scan results
    awaitWriteFinish: {       // wait for file writes to finish
        stabilityThreshold: 500,
        pollInterval: 100
    }
});

// Enhanced logging for different events
watcher
    .on('ready', () => {
        console.log('Initial scan complete. Ready for changes...');
        console.log('Watching for changes in:');
        console.log('- HTML files');
        console.log('- CSS files in /css');
        console.log('- JS files in /js');
        console.log('- Story files in /js/stories');
        console.log('- PNG images in /assets/images');
        console.log('- WEBP images in /assets/images');
    })
    .on('add', path => {
        console.log(`File ${path} has been added`);
        broadcast();
    })
    .on('change', path => {
        console.log(`File ${path} has been changed`);
        broadcast();
    })
    .on('unlink', path => {
        console.log(`File ${path} has been removed`);
        broadcast();
    })
    .on('error', error => {
        console.error('Error happened', error);
    }); 