Point24.init();
var objA = null;
var showNumA = null;
var op = null;
// Reset
function reset(){
    $('#number_group').html('');
    $('#op_char_group').children().removeClass("curr");
    Point24.showNum();
}

// show all answers of the given number
function seeAnswer(){
    var num = '';
    for(let i=0; i<Point24.nums.length; i++){
        num += Point24.nums[i] + ' ';
    }
    alert('Numbers: ' + num + '\nAnswers:\n' + Point24.answer);
}

// Shuffle
function shuffle(){
    location.reload();
}

/**分数字符串转储为数字数组 */
function getArr(str) {
    if (str.indexOf('/') > 0) {
        var arr = str.split("/");
        return [parseInt(arr[0]),parseInt(arr[1])];
    }
    else return [parseInt(str),1];
}
/** 分数计算算法 */
function getShowResult(showNumA, showNumB, op) {
    var arrA = getArr(showNumA);
    var arrB = getArr(showNumB);
    var res = new Array(2);
    if (op == 'add') {
        if (arrA[1] == arrB[1]) {
            res[0] = arrA[0] + arrB[0];
            res[1] = arrA[1];
        } else {
            res[0] = arrA[0]*arrB[1] + arrB[0]*arrA[1];
            res[1] = arrA[1] * arrB[1];
        }
    }
    else if (op == 'sub') {
        if (arrA[1] == arrB[1]) {
            res[0] = arrA[0] - arrB[0];
            res[1] = arrA[1];
        } else {
            res[0] = arrA[0]*arrB[1] - arrB[0]*arrA[1];
            res[1] = arrA[1] * arrB[1];
        }
    }
    else if (op == 'mul') {
        res[0] = arrA[0]*arrB[0];
        res[1] = arrA[1] * arrB[1];
    }
    else if (op == 'div') {
        res[0] = arrA[0]*arrB[1];
        res[1] = arrA[1] * arrB[0];
    }
    return format(res);
}

/**化简与格式化分数*/
function format(res) {
    var a = res[0], b = res[1], c;
    while( !(a%b==0) ) {
        c = a%b;
        a = b;
        b = c;
    }
    res[0] /= b;
    res[1] /= b;
    if (res[1] == 1) return res[0];
    else return res[0]+'/'+res[1];
}

$(function (){
    /** 数字块 事件绑定 */
    $('#number_group').on('click', '.number',function(){
        //满足计算条件否？
        if (showNumA != null && op != null && !$(this).is(objA)) {
            //移除numA
            objA.hide();

            //获得显示结果
            var showNumB = $(this).children("p").text();
            var showRes = getShowResult(showNumA, showNumB, op);
            //alert(showRes);
            //将结果显示在numB
            $(this).children("p").text(showRes);

            //是否只剩最后1个
            if ($('#number_group').find('div:hidden').length === 3) {
                //判断结果
                if (parseInt(showRes) === 24) {
                    alert('恭喜，答对了！');
                } else {
                    alert('很遗憾，答错了！');
                }
            }
            objA = null;
            showNumA = null;
            op = null;
            $('#op_char_group').children().removeClass("curr");
        } else {
            objA = $(this);
            showNumA = $(this).children("p").text();
            $(this).addClass("current").siblings().removeClass("current");
        }
    });
    // $('#number_group').on('click', '.number', function(){
    //     objA = $(this);
    //     showNumA = $(this).children("p").text();
    //     $(this).addClass("current").siblings().removeClass("current");
    // });

    /** 运算符事件绑定 */
    $('#op_char_group').on('click', '.op_char',function(){
        if (showNumA == null) return;
        op = $(this).attr('id');
        $(this).addClass("curr").siblings().removeClass("curr");
    });
});