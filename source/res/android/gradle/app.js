/**
 * Created by danney on 16/2/5.
 */
module.exports = {
    apply: [
        '\'com.android.application\'',
        '\'me.tatarka.retrolambda\'',
        '\'com.neenbedankt.android-apt\''
    ],

    android: {
        compileSdkVersion: 23,
        buildToolsVersion: "23.0.2",
        dataBinding: {enabled:true},
        defaultConfig: {
            applicationId: "com.soundario.myapplication",
            minSdkVersion: 9,
            targetSdkVersion: 23,
            versionCode: 1,
            versionName: "1.0"
        },

        buildTypes: {
            release: {
                minifyEnabled: false,
                proguardFiles: 'getDefaultProguardFile(\'proguard-android.txt\'), \'proguard-rules.pro\''
            }
        },

        compileOptions: {
            sourceCompatibility: 'JavaVersion.VERSION_1_8',
            targetCompatibility: 'JavaVersion.VERSION_1_8'
        }
    },

    dependencies: {
        testCompile: ['\'junit:junit:4.12\''],
        apt: ['\'com.android.databinding:compiler:1.0-rc1\''],
        compile: [
            'fileTree(dir: \'libs\', include: [\'*.jar\'])',
            '\'com.android.support:appcompat-v7:23.1.1\'',
            '\'com.squareup.retrofit:retrofit:2.0.0-beta2\'',
            '\'com.squareup.retrofit:converter-gson:2.0.0-beta2\'',
            '\'com.squareup.retrofit:adapter-rxjava:2.0.0-beta2\'',
            '\'io.reactivex:rxjava:1.1.5\'',
            '\'io.reactivex:rxandroid:1.2.0\''
        ]
    }
}