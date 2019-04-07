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
        // makeQuestionTips(originData.part);
        $.each(originData.questions,function(index, question) {
        	$('#thead tr').append('<th class="classa">'+question.desc+'</th>');
        	$('#tfoot tr').append('<th></th>');
            // input name 為p1001 p2015 之類 對應題目寫在資料庫註解
            // var input_name = 'p'+(parseInt(originData.part.substr(4,1)*1000)+parseInt(index+1));
            // makeQuestionDiv(question.desc,originData.part,input_name);
        });
    });
});