$(document).ready(function() {
    var originDatas = [
        {
            part : "part1",
            questions :
            [
                {desc : "1.孩子晚上在同一時間上床（R）"},
                {desc : "2.孩子上床後在 20 分鐘内入睡（R）"},
                {desc : "3.孩子在自己的床上自行入睡（R）"},
                {desc : "4.孩子要在父母或兄弟姐妹的床上才能入睡"},
                {desc : "5.孩子要有父母在房間内才能入睡"},
                {desc : "6.孩子臨睡前不安静（如哭叫、拒絶在床上等）"},
                {desc : "7.孩子害怕在黑暗中睡覺"},
                {desc : "8.孩子害怕自己單獨一人睡覺"},
            ]
        },
        {
            part : "part2",
            questions :
            [
                {desc : "9.孩子睡得太少"},
                {desc : "10.孩子睡眠適量（R）"},
                {desc : "11.孩子每天睡差不多相等時間的覺（R）"},
                {desc : "12.孩子夜裡尿床"},
                {desc : "13.孩子說夢話"},
                {desc : "14.孩子睡眠中不安静和動得太多"},
                {desc : "15.孩子有夢遊症（睡夢中起來活動）"},
                {desc : "16.孩子夜裡鑽到其他人（父母、兄弟姐妹等）的床"},
                {desc : "17.孩子睡眠中磨牙（牙科醫生會發現）"},
                {desc : "18.孩子大聲打呼噜"},
                {desc : "19.孩子睡眠中有時看起來呼吸暫停"},
                {desc : "20.孩子睡眠中用力用鼻子呼吸和/或氣喘"},
                {desc : "21.孩子在陌生環境裡(如到親友家、外出度假等)睡不好"},
                {desc : "22.孩子尖叫着從睡眠中醒來，伴有出汗且不易受安"},
                {desc : "23.孩子被惡夢驚醒"},
            ]
        },
        {
            part : "part3",
            questions :
            [
                {desc : "24.孩子夜間醒來 1 次"},
                {desc : "25.孩子夜間醒來超過 1 次"},
            ]
        },
        {
            part : "part4",
            questions :
            [
                {desc: "26. 孩子早晨自己醒來（R）"},
                {desc: "27.孩子醒來時情绪不佳"},
                {desc: "28.孩子靠大人或兄弟姐妹叫醒"},
                {desc: "29.孩子早晨不願意離開床鋪"},
                {desc: "30.孩子早晨需較長時間才能徹底清醒"},
                {desc: "31.孩子白天看起來很疲憊"},
            ]
        },
        {
            part : "part5",
            questions :
            [
                {desc: "32.看電視"},
                {desc: "33.乘車 "},
            ]
        },
    ];
    $.each(originDatas,function(index,originData) {
        makeQuestionTips(originData.part);
        $.each(originData.questions,function(index, question) {
            // input name 為p1001 p2015 之類 對應題目寫在資料庫註解
            var input_name = 'p'+(parseInt(originData.part.substr(4,1)*1000)+parseInt(index+1));
            makeQuestionDiv(question.desc,originData.part,input_name);
        });
    });
    
    $('input').prop('checked',true);
    $('input').val('1');
    $('#form').submit(function(event) {
        event.preventDefault();
        $.confirm({
            title: 'warning!',
            content: '確定要送出問卷嗎?',
            theme:'modern',
            buttons: {
                sure: {
                    text: '確定',
                    btnClass: 'btn-blue',
                    action: function(){
                        sendData();
                    }
                },
                取消: function () {
                },
            }
        });
    });
});

function makeQuestionDiv(question_desc,where,input_name){
    var question_div = $('<div class="form-row"><div class="col-6"><label>'+question_desc+'</label></div><div class="col-2"><input type="radio" value="3" name="'+input_name+'" required=""></div><div class="col-2"><input type="radio" value="2" name="'+input_name+'" required=""></div><div class="col-2"><input type="radio" value="1" name="'+input_name+'" required=""></div></div>');
    $("#"+where+"").append(question_div);
}
function makeQuestionTips(where){
    // 上面的 3 2 1
    var question_tips_part1 = $('<div class="form-row"><div class="col-6"><label></label></div><div class="col-2"><label>3</label></div><div class="col-2"><label>2</label></div><div class="col-2"><label>1</label></div></div>');
    var question_tips_part2 = $('<div class="form-row"><div class="col-6"><label></label></div><div class="col-2"><label>經常</label></div><div class="col-2"><label>有時</label></div><div class="col-2"><label>很少</label></div></div>');
    var question_tips_part3 = $('<div class="form-row"><div class="col-6"><label></label></div><div class="col-2"><label>(5~7)</label></div><div class="col-2"><label>(2~4)</label></div><div class="col-2"><label>(0~2)</label></div></div>');
    $("#"+where+"").append(question_tips_part1);
    $("#"+where+"").append(question_tips_part2);
    $("#"+where+"").append(question_tips_part3);
}
function sendData(){
    var serializeform = $('#form').serializeArray();
    data = objectifyForm(serializeform,'addSleepQuestion');
    console.log(data);
    data[1].midcase_id = $('#question_no').val();
    $.ajax({
        url:'../../Question/controller.php',
        type: 'POST',
        data:JSON.stringify(data),
        async:false,
        success:function(r){
                result=eval(r);
                console.log(result);
                if(result[0].status==200){
                    var success = '<div class="result d-flex flex-column justify-content-center align-items-center"><h1>新增成功 感謝您的填寫</h1></div>';
                    $('body').html(success);
                }else if(result[0].status==423){
                    $.confirm({
                        title: 'Encountered an error!',
                        icon: 'fa fa-warning',
                        content: result[1].reason,
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            close: function () {
                            }
                        }
                    });
                }else{
                    $.confirm({
                        title: 'Encountered an error!',
                        content: '發生未預期的錯誤 請聯絡管理員',
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            close: function () {
                            }
                        }
                    });
                }
        },
        error:function(err){
            $.confirm({
                title: 'Encountered an error!',
                content: '發生未預期的錯誤 請聯絡管理員',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    close: function () {
                    }
                }
            });
        }
    });
}
function objectifyForm(formArray,actvalue) {//serialize data function
        var returnArray=[];
        var actObject = {};
        actObject.act=actvalue;
        var formObject = {};
        for (var i = 0; i < formArray.length; i++){
                if(formArray[i]['name']!=tmp)
                    formObject[formArray[i]['name']] = formArray[i]['value'];
                else
                    formObject[formArray[i]['name']] += "，"+formArray[i]['value'];
                var tmp =formArray[i]['name'];
        }
        returnArray.push(actObject);
        returnArray.push(formObject);
        return returnArray;
}