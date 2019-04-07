var caseid="";
var finalpostdata;
function special(a){
        console.log();
        var name=a.name;
        // console.log(name);
        if($(a).prop('checked')){
            var content=$("<input onkeyup='chk(this)' type='text' name='"+name+"'>");
            $("#treat_locationcontent_special1").empty();
            $("#treat_locationcontent_special1").append(content);
        }else{
            $("#treat_locationcontent_special1").empty();
        }
}
function special2(a){
        console.log();
        var name=a.name;
        // console.log(name);
        if($(a).prop('checked')){
            var content=$("<input onkeyup='chk(this)' type='text' name='"+name+"'>");
            $("#treat_locationcontent_special2").empty();
            $("#treat_locationcontent_special2").append(content);
        }else{
            $("#treat_locationcontent_special2").empty();
        }
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
//跳下題防呆
function clickNo(no){
    // console.log(no.checked);
    if(no.checked){
        $("input[name="+no.name+"]").prop("disabled",true);
        $("input[name="+no.name+"]").prop("checked",false);
        $(no).prop("disabled",false);    
        $(no).prop("checked",true);
        if(no.name=="treat_hz"){
            $("#treat_hz1").empty();
            $("#treat_hz2").empty();
            $("#treat_hz3").empty();
            $("#treat_hz4").empty();
        } 
    }else{
        $("input[name="+no.name+"]").prop("disabled",false);
        // $(no).prop("disabled",true);    
    }
}
function dnaother(){
    if($("#dnaothercheck").prop('checked')){
        var dnaother=$("<input type='text' name='history_family'>");
        $("#dnaother").append(dnaother);
    }else{
        $("#dnaother").empty();
        $("#dnaother").append("其他");
    }
}

/***修正特殊字元***/
var toalarm = false;
var ch;
var stralarm = new Array("，"); //列出所有被禁止的方法字元
function chk(obj)
{
    var str =obj.value;
    for (var i=0;i<stralarm.length;i++){ //依序載入使用者輸入的每個字元
        for (var j=0;j<str.length;j++)
        {
        ch=str.substr(j,1);
        if (ch==stralarm[i]) //如果包含禁止字元
        {
        toalarm = true; //設置此變數為true
        }
        } 
        }
        if (toalarm){
            alert("包含特殊字元,請修正!"); 
            obj.value="";
            toalarm = false;
        }
} 
/***修正特殊字元***/
$(document).ready(function() {
    //若為寄養媽媽則不用填的資料
    familydata = $("#family_status").html();
    pregdata = $("#preg").html();
    //功能按鈕
    $("#makecaseid").click(function(event){
        event.preventDefault();
        $("#makecaseid").attr("id","makecaseid2");
        $("#makecaseid2").attr("onclick","chcaseid()");
        $("#hospital_user").attr("style","display:none");
        caseid=$("#caseid").val();
        $("#showid").empty();
        $("#showid").append("病歷號碼:"+caseid);
        $("#form1").attr("style","display:block");
        $("#formsubmit").attr("style","display:block");
        $("#reset").attr("style","display:block");
        $("#chpart").attr("style","display:block");
    });
    $("#makecaseid2").click(function(event){
        event.preventDefault();
        $("#showid").empty();
        caseid=$("#caseid2").val();
        $("#showid").append("病歷號碼:"+caseid);
        $("#reset").attr("style","display:block");
        $("#hospital_user2").attr("style","display:none");
    });
    $("#reset").click(function(event){
        event.preventDefault();
        $("#hospital_user2").attr("style","display:block");
        $("#reset").attr("style","display:none");
        // location.reload();
    });
    $(".chpart").click(function(event){
        event.preventDefault();
        $( "div[id^='part']" ).attr("style","display:none");
        $("#part"+this.value).attr("style","display:block");
        jQuery("html,body").animate({
                scrollTop:0
        },0);
    });

    //select會造成serialize狀況 特別處理點擊後出現
    //radio其他通用
    $("input[id$='check'][type='radio'],input[id$='check2'][type='radio']").click(function(){
        var name=this.name;
        if($("#"+name+"check2").prop('checked')){
            var content=$("<input type='text' name='"+name+"'>");
            $("#"+name+"content").empty();
            $("#"+name+"content").append(content);
        }else{
            $("#"+name+"content").empty();
        }
    });
    //checkbox其他通用
    $("input[id$='check'][type='checkbox']").click(function(){
        var name=this.name;
        if($("#"+name+"check").prop('checked')){
            var content=$("<input type='text' onkeyup='chk(this)' name='"+name+"'>");
            $("#"+name+"content").empty();
            $("#"+name+"content").append(content);
        }else{
            $("#"+name+"content").empty();
        }
    });

    $("#eyecheck").click(function(){
        if($("#eyecheck").prop('checked')){
            var eye=$("<select name='question_perception'><option name='斜視' value='斜視'>斜視</option><option name='弱視' value='弱視'>弱視</option><option name='遠視' value='遠視'>遠視</option><option name='近視' value='近視'>近視</option></select>");
            $("#eye").append(eye);
        }else{
            $("#eye").empty();
        }
    });
    $("#touchcheck").click(function(){
        if($("#touchcheck").prop('checked')){
            var touch=$("<select name='question_perception'><option name='缺乏反應' value='缺乏反應'>缺乏反應</option><option name='過度排斥' value='過度排斥'>過度排斥</option></select>");
            $("#touch").append(touch);
        }else{
            $("#touch").empty();
        }
    });
    $("#historycheck,#historycheck2").click(function(){
        if($("#historycheck").prop('checked')){
            $("#history").empty();
            var history=("<select name='history'><option value=''></option><option value='公立'>公立</option><option value='私立'>私立</option></select>，<select name='history' onchange='changeHistory(this)'><option value=''></option><option value='幼稚園'>幼稚園</option><option value='托嬰'>托嬰</option></select>");
            // 幼稚園<select name='history'><option name='' value=''></option><option name='幼幼' value='幼幼班'>幼幼</option><option name='小' value='小班'>小</option><option name='中' value='中班'>中</option><option name='大' value='大班'>大</option><option name='特教' value='特教班'>特教</option></select>班
            // history+="(<input type='radio' name='day' value='全日' checked='true'>全日/<input type='radio' name='day' value='半日'>半日)";
            $("#history").append(history);
        }else{
            $("#history").empty();
        }
    });
    $("input[id^='treat_hzcheck']").click(function(){
        var id = this.id;
        if($("#"+id).prop('checked')){
            $("#treat_hz"+id.substring(13,14)).empty();
            var treat_hz=$("<select name='treat_hz'><option value=''></option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>");
            $("#treat_hz"+id.substring(13,14)).append(treat_hz);
            $("#treat_hz"+id.substring(13,14)).append("次");
        }else{
            $("#treat_hz"+id.substring(13,14)).empty();
        }
    });
    $(".ifpart3").click(function(){
        if($("#nopart3").prop('checked')){
            $("#treat_hz1").empty();
            $("#treat_hz2").empty();
            $("#treat_hz3").empty();
            $("#treat_hz4").empty();
            $("div[id='part3'] input").prop("disabled",true);
            $("div[id='part3'] input").prop("checked",false);
            $(".ifpart3").prop("disabled",false);
            $("#nopart3").prop("checked",true);
            $("part3additional").empty();
            $("#part3additional").append("<input type='hidden' name='treat_type' value='無'>");
            $("#part3additional").append("<input type='hidden' name='treat_location' value='無'>");
            $("#part3additional").append("<input type='hidden' name='treat_hz' value='無'>");
        }else{
            $("div[id='part3'] input").prop("disabled",false);
            $("#part3additional").empty();
        }
    });
    $("#earcheck").click(function(){
        if($("#earcheck").prop('checked')){
            $("#ear").empty();
            var ear=("(<input type='radio' name='history_family' value='先天' checked='true'>先天/<input type='radio' name='history_family' value='後天'>後天)");
            $("#ear").append(ear);
        }else{
            $("#ear").empty();
        }
    });
    $("#mentalcheck").click(function(){
        if($("#mentalcheck").prop('checked')){
            $("#mental").empty();
            var mental=("(<input type='checkbox' name='history_family' value='精神分裂症'>精神分裂症<input type='checkbox' name='history_family' value='躁鬱症'>躁鬱症<input type='checkbox' name='history_family' value='憂鬱症'>憂鬱症<input type='checkbox' name='history_family' value='焦慮症'>焦慮症)");
            $("#mental").append(mental);
        }else{
            $("#mental").empty();
        }
    });
    $("#dnacheck").click(function(){
        if($("#dnacheck").prop('checked')){
            $("#dna").empty();
            var dna=("(<input type='checkbox' name='history_family' value='唐氏症'>唐氏症<input type='checkbox' name='history_family' value='脆弱染色體X'>脆弱染色體X<input id='dnaothercheck' type='checkbox' name='history_family' value='其他' onclick='dnaother()'><span id='dnaother'>其他</span>)");
            $("#dna").append(dna);
        }else{
            $("#dna").empty();
        }
    });

    $("#history_pregweek_special,#history_pregweek_special2").click(function(){
        var select = ("(懷孕<select id='babyweek' name='babyweek'></select>週又<select id='babyday' name='babyweek'></select>天出生，體重<span id='babyweight'></span>公克)");
        $("#history_pregweek").empty();
        $("#history_pregweek").append(select);
        if($("#history_pregweek_special").prop('checked')){
            var option="<option value=''></option>"
            $("#babyweek").append(option);
            for (var i = 37; i <=50; i++) {
                var option="<option value='"+i+"週'>"+i+"</option>"
                $("#babyweek").append(option);
            }
            var option="<option value=''></option>"
            $("#babyday").append(option);
            for (var i = 0; i <=31; i++) {
                var option="<option value='"+i+"天'>"+i+"</option>"
                $("#babyday").append(option);
            }
            var option="<option value='不清楚天'>不清楚</option>"
            $("#babyday").append(option);
        }else{
            var option="<option value=''></option>"
            $("#babyweek").append(option);
            for (var i = 1; i <=36; i++) {
                var option="<option value='"+i+"週'>"+i+"</option>"
                $("#babyweek").append(option);
            }
            var option="<option value=''></option>"
            $("#babyday").append(option);
            for (var i = 0; i <=31; i++) {
                var option="<option value='"+i+"天'>"+i+"</option>"
                $("#babyday").append(option);
            }
        }
                $("#babyweight").append("<input type='number' name='babyweight'>");
    });

    for (var i = 0; i <=36; i++) {
        var option="<option value='"+i+"個月'>"+i+"</option>"
        $(".opt1year").append(option);
    }
    $(".opt1year").append("<option value='不清楚'>不清楚</option>");

    for (var i = 0; i <=48; i++) {
        var option="<option value='"+i+"個月'>"+i+"</option>"
        $(".opt2year").append(option);
    }
    $(".opt2year").append("<option value='不清楚'>不清楚</option>");

    for (var i = 0; i <=24; i++) {
        var option="<option value='"+i+"個月'>"+i+"</option>"
        $(".opt3year").append(option);
    }
    $(".opt3year").append("<option value='不清楚'>不清楚</option>");
    var count=1;
    var nowformrecord=[];
    var complete=0;
    var abcde=[];
	$('#next').click(function(event){
        // console.log(caseid);
        event.preventDefault();
        var error=0;
        var form=document.forms["form"+count];
        // console.error(form.elements);
        var formarr =[];
        for (var i = 0; i < form.elements.length; i++) {
            var check=0;
            var name = form.elements[i].name;
            // console.error(name);
            for(var j=-1; j<formarr.length; j++){
                if(name==formarr[j+1]){
                    check=1;
                    break;
                }
            }
            if(check==0){
                if(name!="")
                formarr.push(name);
            }
        }
        var serializeform = $('#form'+count).serializeArray();
        // console.log(serializeform);
        // console.log(formarr);
        for (var i = 0; i < formarr.length; i++) {
            var check=0;
            for (var j = 0; j < serializeform.length; j++) {
                if(formarr[i]==serializeform[j].name){
                    check=1;
                    break;
                }
            }
            if(check==0){
                // console.log("h2[name="+formarr[i]+"]");
                $("h2[name='"+formarr[i]+"']").css("background-color", "red");
                $("h4[name='"+formarr[i]+"']").css("background-color", "red");
                $("h5[name='"+formarr[i]+"']").css("background-color", "red");
                error++;
                console.log("error1"+formarr[i]);
            }else{
                $("h2[name='"+formarr[i]+"']").css("background-color", "white");
                $("h4[name='"+formarr[i]+"']").css("background-color", "white");
                $("h5[name='"+formarr[i]+"']").css("background-color", "white");
            }
        }
        console.error(serializeform);
        for (var i = 0; i < serializeform.length; i++) {
            if(serializeform[i].value==""){
                var key = serializeform[i].name;
                $("input[name="+key+"]").css("background-color", "red");
                $("input[id="+key+"]").css("background-color", "red");
                $("select[name="+key+"]").css("background-color", "red");
                console.log("error2"+key);
                error++;
            }else{
                var key = serializeform[i].name;
                $("input[name="+key+"]").css("background-color", "white");
                $("select[name="+key+"]").css("background-color", "white");
            }
        }
        //特殊處理手足人數
        if(count==2 && checkmom!="寄養媽媽"){
            var check=0;
            for (var i = 1; i <= 5; i++) {
                if(serializeform[i].value==""){
                    check=1;
                    break;
                }
            }    
            if(check==1){
                $("select[name=family_brother]").css("background-color", "red");
            }
        }
        //特殊處理發展史
        if(count==4){
            var check=0;
            for (var i = 4; i <= 11; i++) {
                if(serializeform[i].value==""){
                    check=1;
                    break;
                }
            }    
            if(check==1){
                $("select[name=abnormal_develop]").css("background-color", "red");
            }
        }
        
        // console.error(nowformrecord);
        if(error==0){
            $("#prev").attr("style","display:block");
            prev[count]=nowformrecord.slice();
            // console.log("prev[count]");
            // console.error(prev[count]);
            for (var i = 0; i < serializeform.length; i++) {
                nowformrecord.push(serializeform[i]);
            }
            console.log("now下一頁click");
            // console.error(nowformrecord);
            count++;
            complete++;
            // console.log(complete);
            // console.log(count);
            $("#part"+(count-1)).attr("style","display:none");
            $("#part"+(count)).attr("style","display:block");
            jQuery("html,body").animate({
                scrollTop:0
            },0);
        }else{
            alert("未填寫完成 請檢查輸入資料");
            console.log(error);
        }
        if(complete==4){
            //特別處理發展史
            $("#next").attr("style","display:none");
            var postdata= objectifyForm(nowformrecord,"addQuestion");
            console.log(postdata);
            var tmp=postdata[1].abnormal_develop;
            var tmp = tmp.split("，");
            var newdevelop="頭部控制:"+tmp[0];
            newdevelop+="，翻身:"+tmp[1];
            newdevelop+="，坐:"+tmp[2];
            newdevelop+="，爬:"+tmp[3];
            newdevelop+="，走:"+tmp[4];
            newdevelop+="，伸手抓物:"+tmp[5];
            newdevelop+="，塗鴉:"+tmp[6];
            newdevelop+="，第一個有意義單字:"+tmp[7];
            postdata[1].abnormal_develop=newdevelop;
            //特別處理頻率
            var tmp=postdata[1].treat_hz;
            var tmp = tmp.split("，");
            if(tmp.length>=2){
                var newhz="";
                for (var i = 0; i < tmp.length; i++) {
                    if(i%2==0){
                        newhz+=tmp[i];
                    }else{
                        if(i==tmp.length-1)
                            newhz+=(tmp[i]+"次");
                        else
                            newhz+=(tmp[i]+"次，");
                    } 
                }
                postdata[1].treat_hz=newhz;
            }
           
            //特別處理孕期
            postdata[1].babyweight+="公克";
            postdata[1].history_pregweek+=("，"+postdata[1].babyweek);
            postdata[1].history_pregweek+=("，"+postdata[1].babyweight);
            console.error(postdata[1].history_pregweek);
            if(postdata[1].history_pregweek=="undefined，undefined，undefined公克")
                postdata[1].history_pregweek="";
            // console.log(newhz);
            // console.log(tmp);
            postdata[1].caseid=caseid;
            finalpostdata=postdata;
            if(finalpostdata[1]['day'])
            finalpostdata[1]['history']+=("，"+finalpostdata[1]['day']);
            console.log(finalpostdata);
            
            var confirm2="<h2>以下為您填寫的資料</h2><br>"+
            "身高: "+finalpostdata[1].height+"公分 體重: "+finalpostdata[1].weight+"公斤 頭圍: "+finalpostdata[1].head_circumference+"公分 目前主要照顧者: "+finalpostdata[1].caregiver+
            "<br>就學歷史: "+finalpostdata[1].history+
            "<br>就診目的: "+finalpostdata[1].target+
            "<hr><h3>主要在意問題</h3>"+
            "語言: "+finalpostdata[1].question_language+
            "<br>動作: "+finalpostdata[1].question_action+
            "<br>學習: "+finalpostdata[1].question_learn+
            "<br>人際: "+finalpostdata[1].question_relationship+
            "<br>情緒: "+finalpostdata[1].question_mood+
            "<br>活動與注意力: "+finalpostdata[1].question_attention+
            "<br>感官知覺: "+finalpostdata[1].question_perception+
            "<br>生活作息: "+finalpostdata[1].question_lifestyle+
            "<br>怪異言行: "+finalpostdata[1].question_strangestyle+
            "<br>自傷行為: "+finalpostdata[1].question_selfmutilation+
            "<br>不知道如何教導或幫助小孩: "+finalpostdata[1].question_helpkid+
            "<hr><h3>家庭狀況</h3>";
            if(finalpostdata[1].family_married){
                confirm2+="父母婚姻狀況: "+finalpostdata[1].family_married+
                        "<br> 手足人數: "+finalpostdata[1].family_brother+
                        "<br> 父親資料: "+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp姓名: "+finalpostdata[1].family_fname+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp年齡: "+finalpostdata[1].family_fage+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp教育程度: "+finalpostdata[1].family_feducation+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp職業: "+finalpostdata[1].family_fcareer+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp國籍: "+finalpostdata[1].family_fcountry+
                        "<br> 母親資料: "+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp姓名: "+finalpostdata[1].family_mname+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp年齡: "+finalpostdata[1].family_mage+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp教育程度: "+finalpostdata[1].family_meducation+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp職業: "+finalpostdata[1].family_mcareer+
                        "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp國籍: "+finalpostdata[1].family_mcountry;
            }
            confirm2+=
            "<br> 目前居住家庭型態: "+finalpostdata[1].family_family+
            "<hr><h3>療育情形</h3>"+
            "療育現況: "+finalpostdata[1].treat_status+
            "<br> 曾接受過的療癒(上課)種類: "+finalpostdata[1].treat_type+
            "<br> 療育(上課)地點: "+finalpostdata[1].treat_location+
            "<br> 目前的療癒(上課)頻率: "+finalpostdata[1].treat_hz+
            "<hr><h3>發展及疾病史</h3>"+
            "家族史: "+finalpostdata[1].history_family;
            if(finalpostdata[1].history_nutrition){
                confirm2+="<br> 母親懷孕狀況: "+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp營養狀況: "+finalpostdata[1].history_nutrition+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp生理疾病: "+finalpostdata[1].history_disease+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp母親孕期用藥狀況: "+finalpostdata[1].history_medication+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp母親物質濫用習慣: "+finalpostdata[1].history_abuse+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp孕次: "+finalpostdata[1].history_pregcount+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp生次: "+finalpostdata[1].history_birthcount+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp流產: "+finalpostdata[1].history_abortion+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp孕期: "+finalpostdata[1].history_pregweek+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp產程狀況: "+finalpostdata[1].history_pregprocess;
            }
            confirm2+=
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp新生兒篩檢: "+finalpostdata[1].neonatal_screening+
            "<br> 生理異常: "+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp新生兒及幼兒期: "+finalpostdata[1].abnormal_neonatal+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp疾病史: "+finalpostdata[1].abnormal_disease+
            "<br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp發展史: "+finalpostdata[1].abnormal_develop+
            "<br><br><button onclick='submit2()'>確認無誤送出</button>";
            // $("#form").attr("style","display:none");
            $("#formsubmit").attr("style","display:none");
            $("#ready").append(confirm2);
        }
    });
    $("#prev").click(function(){
        if(complete==4)
            $("#ready").empty();
        if(complete>0){
            $("#next").attr("style","display:block");
            count--;
            complete--;
            nowformrecord = prev[count];
            console.log("上衣頁ckick now");
            console.error(nowformrecord);
            console.log(count);
            $("#part"+(count)).attr("style","display:block");
            $("#part"+(count+1)).attr("style","display:none");
        }    
        if(complete==0)
            $("#prev").attr("style","display:none");
    });

});
function submit2(){
    var r = confirm("確定要送出嗎?");
    if(r){
        finalpostdata[1].caseid=caseid;
        console.log(finalpostdata);
        console.log(JSON.stringify(finalpostdata));
        console.log(finalpostdata);
        $.ajax({
            url:'../../Question/controller.php',
            type: 'POST',
            data:JSON.stringify(finalpostdata),
            async:false,
            success:function(r){
                    result=eval(r);
                    // console.log(result);
                    if(result[0].status==200){
                        alert("填寫完成!");
                        $("#ready").empty();
                        $("#ready").append("<h1>感謝您的填寫</h1>");
                        $("#formsubmit").attr("style","display:none");
                        $("#reset").attr("style","display:none");
                        $("#chpart").attr("style","display:none");
                    }
                    else if(result[0].status==422)
                        alert("寫入資料發生問題 請檢查病歷號碼後再試一次");
                    else{
                        alert("發生未預期的錯誤 請聯絡管理員");
                    }
            },
            error:function(err){
                    alert("發生未預期的錯誤 請聯絡管理員");
                    console.log(err);
        }
        });
    }else{
        
    }
}
function chcaseid(){
    caseid=$("caseid").val();
    console.log(caseid);
}
function changeHistory(t){
    if(t.value==("托嬰")){
        $("#history2").empty();
        var choose = "(<input type='radio' name='day' value='全日' checked='true'>全日/<input type='radio' name='day' value='半日'>半日)";
        $("#history2").append(choose);
    }else if(t.value==("幼稚園")){
        $("#history2").empty();
        var choose = "(<input type='radio' name='day' value='大班' checked='true'>大班/<input type='radio' name='day' value='中班'>中班/<input type='radio' name='day' value='小班'>小班/<input type='radio' name='day' value='幼幼班'>幼幼班/<input type='radio' name='day' value='特教班'>特教班)";
        $("#history2").append(choose);
    }else{
        $("#history2").empty();
    }
}
var familydata;
var pregdata;
var checkmom="";
function checkfamily(t){
    if(t.value=="寄養媽媽"){
        console.log(123);
        $("#family_status").empty();
        $("#preg").empty();
        $("#othercaregiver").remove();
    }else{
        $("#family_status").empty();
        $("#family_status").append(familydata);
        $("#preg").empty();
        $("#preg").append(pregdata);
        $("#othercaregiver").remove();
        relaodready();
    }
    if(t.value=="其他"){
        $(t).after(" <input id='othercaregiver' name='caregiver' type='text' placeholder='主要照顧者為'>");
    }
    checkmom=t.value;
}
//有切到主要照顧者 寄養媽媽都要重讀
function relaodready(){
    $("input[id$='check'][type='radio'],input[id$='check2'][type='radio']").click(function(){
        var name=this.name;
        if($("#"+name+"check2").prop('checked')){
            var content=$("<input type='text' name='"+name+"'>");
            $("#"+name+"content").empty();
            $("#"+name+"content").append(content);
        }else{
            $("#"+name+"content").empty();
        }
    });
    //checkbox其他通用
    $("input[id$='check'][type='checkbox']").click(function(){
        var name=this.name;
        if($("#"+name+"check").prop('checked')){
            var content=$("<input type='text' onkeyup='chk(this)' name='"+name+"'>");
            $("#"+name+"content").empty();
            $("#"+name+"content").append(content);
        }else{
            $("#"+name+"content").empty();
        }
    });
    $("#history_pregweek_special,#history_pregweek_special2").click(function(){
        var select = ("(懷孕<select id='babyweek' name='babyweek'></select>週又<select id='babyday' name='babyweek'></select>天出生，體重<span id='babyweight'></span>公克)");
        $("#history_pregweek").empty();
        $("#history_pregweek").append(select);
        if($("#history_pregweek_special").prop('checked')){
            var option="<option value=''></option>"
            $("#babyweek").append(option);
            for (var i = 37; i <=50; i++) {
                var option="<option value='"+i+"週'>"+i+"</option>"
                $("#babyweek").append(option);
            }
            var option="<option value=''></option>"
            $("#babyday").append(option);
            for (var i = 0; i <=31; i++) {
                var option="<option value='"+i+"天'>"+i+"</option>"
                $("#babyday").append(option);
            }
            var option="<option value='不清楚天'>不清楚</option>"
            $("#babyday").append(option);
        }else{
            var option="<option value=''></option>"
            $("#babyweek").append(option);
            for (var i = 1; i <=36; i++) {
                var option="<option value='"+i+"週'>"+i+"</option>"
                $("#babyweek").append(option);
            }
            var option="<option value=''></option>"
            $("#babyday").append(option);
            for (var i = 0; i <=31; i++) {
                var option="<option value='"+i+"天'>"+i+"</option>"
                $("#babyday").append(option);
            }
        }
                $("#babyweight").append("<input type='number' name='babyweight'>");
    });
    $("#family_fage").change(function(){
        var D1=new Date;
        var content = $("#family_fage").val();
        if(content.length!=8){
            alert("請依照日期格式輸入");
            $("#family_fage").val("");
        }else{
            var convertcontent = "";
            convertcontent +=content[0];
            convertcontent +=content[1];
            convertcontent +=content[2];
            convertcontent +=content[3];
            convertcontent +="-";
            convertcontent +=content[4];
            convertcontent +=content[5];
            convertcontent +="-";
            convertcontent +=content[6];
            convertcontent +=content[7];
            var D2=new Date(convertcontent);
            if(D2=="Invalid Date" && content !="77282297"){
                alert("日期輸入錯誤 請重新確認");
                $("#family_fage").val("");
            }else{
                // console.log(D2);
                var Compare=Date.parse(D1.toString())-Date.parse(D2.toString()); //相差毫秒數
                var month=Compare/(1000*60*60*24*30); //相差月數
                var year = parseInt(month/12);
                $("#family_fage_input").val(year);
                if(content=="77282297")
                    $("#family_fage_input").val("不提供");
                // console.log($("#family_fage_input").val());
            }
        }
    })
    $("#family_mage").change(function(){
        var D1=new Date;
        var content = $("#family_mage").val();
        if(content.length!=8){
            alert("請依照日期格式輸入");
            $("#family_mage").val("");
        }else{
            var convertcontent = "";
            convertcontent +=content[0];
            convertcontent +=content[1];
            convertcontent +=content[2];
            convertcontent +=content[3];
            convertcontent +="-";
            convertcontent +=content[4];
            convertcontent +=content[5];
            convertcontent +="-";
            convertcontent +=content[6];
            convertcontent +=content[7];
            var D2=new Date(convertcontent);
            if(D2=="Invalid Date" && content !="77282297"){
                alert("日期輸入錯誤 請重新確認");
                $("#family_mage").val("");
            }else{
                // console.log(D2);
                var Compare=Date.parse(D1.toString())-Date.parse(D2.toString()); //相差毫秒數
                var month=Compare/(1000*60*60*24*30); //相差月數
                var year = parseInt(month/12);
                $("#family_mage_input").val(year);
                console.log($("#family_mage_input").val());
                if(content=="77282297")
                    $("#family_mage_input").val("不提供");
            }
        }
    })
}

//阻止平板頁面重整
// window.addEventListener('load', function () {
//     var touchMoveHandler = function (e) {
//         console.log(123);
//         e.cancelable && e.preventDefault();
//         return;
//     };
//     document.addEventListener('touchmove', touchMoveHandler, false);
// });
// var touchMoveHandler = function (e) {
//     e.preventDefault();
//     return;
//     };
// document.addEventListener('touchmove', touchMoveHandler, {passive: true})