'use strict'

let parse = (model) => {

}

module.exports = parse;

/**
 * 1 生成Layout
 *  1）生成各个普通属性
 *  2）生成绑定属性
 *      a) 普通绑定，给VM前面加上this
 *      b) 对VM中属性的多层次引用，需要生成判空代码，替换原来的属性值
 *      c）{}中含有逻辑代码，需要计算
 *      d) {}中含有逻辑代码，且涉及到其他函数调用及import
 *  3）生成style属性，检测ID是否存在
 *  4) 生成render-if属性
 *  5）生成Event
 *  */

let audioVMName = null;
if (audioVM != undefined && audioVM != null) {
    let audioVM = audio.VM;
    if (audioVM != undefined && audioVM != null) {
        audioVMName = audioVM.name;
    }
}

let aaudioVMName = R.path(['VM', 'name'], aduio);