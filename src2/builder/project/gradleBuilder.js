/**
 * Created by danney on 16/2/5.
 */
var fs = require('fs');
var path = require('path');
var util = require('util');
var lotus = require('../../lotus');
var GradleRecorder = lotus.recorder.GradleRecorder;
var projectConfig = lotus.projectConfig;

var GradleBuilder = function() {
    this._gradleRecoder = new GradleRecorder();
}

GradleBuilder.prototype.parse = function(gradleRecorder) {
    this._gradleRecoder.app = require('../../res/android/gradle/app');
    this._gradleRecoder.setting = require('../../res/android/gradle/setting');
    this._gradleRecoder.addAll(gradleRecorder);

    this._gradleRecoder.app.android.defaultConfig.applicationId = projectConfig.getPackageName();

    this._buildApp();
    this._buildSetting();
}

GradleBuilder.prototype._buildApp = function() {
    var app = this._gradleRecoder.app;
    var content = '';

    for(var k in app.apply) {
        var v = app.apply[k];
        content += 'apply plugin: ' + v + '\r';
    }
    content += '\r';

    content += keyToStr('android', app.android).trim() + '\r\r';

    content += this._buildDependencies()

    var filePath = path.resolve(projectConfig.getOutputDir(), projectConfig.get('productName'), 'app', 'build.gradle')
    fs.writeFileSync(filePath, content);
}

GradleBuilder.prototype._buildSetting = function() {
    var setting = this._gradleRecoder.setting;
    var include = setting.include;
    var content = '';

    for(var k in include) {
        var v = include[k];
        content += 'include ' + v + '\r';
    }

    var filePath = path.resolve(projectConfig.getOutputDir(), projectConfig.get('productName'), 'settings.gradle');
    fs.writeFileSync(filePath, content);
}

GradleBuilder.prototype._buildDependencies = function() {
    var dep = this._gradleRecoder.app.dependencies;
    var content = '';
    for(var k in dep) {
        var array = dep[k];
        for(var j in array) {
            content += k + ' ' + array[j] + '\r';
        }
    }
    return 'dependencies {\r' +  content + '}';
}

var keyToStr = function(k, v) {
    var ret = '';
    if(util.isArray(v)) {
        for(var i in v) {
            ret += k + ' ' + v[i] + '\r';
        }
    }
    else if(util.isObject(v)) {
        for(var i in v) {
            var subV = v[i];
            ret += keyToStr(i, subV) + '\r';
        }
        ret = k + ' { \r' + ret.trim() + '\r }\r';
    }
    else {
        if(util.isString(v)) {
            if(k == 'proguardFiles') {

            }
            else {
                v = '"' + v + '"';
            }
        }
        ret = k + ' ' + v;
    }
    return ret;
}


module.exports = GradleBuilder;