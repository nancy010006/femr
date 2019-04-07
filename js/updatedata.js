var caseid="";
var finalpostdata;
var Request = new Object();    
Request = GetRequest();  
function GetRequest() {        
     var url = location.search;   
     var theRequest = new Object();        
     if (url.indexOf("?") != -1) {         
        var str = url.substr(1);           
        strs = str.split("&");         
        for(var i = 0; i < strs.length; i++) {          
           theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);         
        }          
     }         
     return theRequest;
} 
var id= Request['id'];
function clickNo(no){
    // console.log(no.checked);
    if(no.checked){
        $("input[name="+no.name+"]").prop("disabled",true);
        $("input[name="+no.name+"]").prop("checked",false);
        $("select[name="+no.name+"]").prop("disabled",true);
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
        $("select[name="+no.name+"]").prop("disabled",false);
        // $(no).prop("disabled",true);    
    }
}
function objectifyForm(formArray,actvalue) {//serialize data function
        var returnArray=[];
        var actObject = {};
        actObject.act=actvalue;
        var formObject = {};
        for (var i = 0; i < formArray.length; i++){
            if(formArray[i]['value']!=""){
                if(formArray[i]['name']!=tmp)
                    formObject[formArray[i]['name']] = formArray[i]['value'];
                else
                    formObject[formArray[i]['name']] += "，"+formArray[i]['value'];
                var tmp =formArray[i]['name'];
            }
        }
        returnArray.push(actObject);
        returnArray.push(formObject);
        return returnArray;
}
$(document).ready(function() {
    //非寄養媽媽的資料
    familydata = $("#family_status").html();
    pregdata = $("#preg").html();
        //radio其他通用
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
        if(this.id=="dnaothercheck")
            return;
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
            $("#eye").empty();
            var eye=$("<select name='question_perception'><option name='斜視' value='斜視'>斜視</option><option name='弱視' value='弱視'>弱視</option><option name='遠視' value='遠視'>遠視</option><option name='近視' value='近視'>近視</option></select>");
            $("#eye").append(eye);
        }else{
            $("#eye").empty();
        }
    });
    $("#touchcheck").click(function(){
        if($("#touchcheck").prop('checked')){
            $("#touch").empty();
            var touch=$("<select name='question_perception'><option name='缺乏反應' value='缺乏反應'>缺乏反應</option><option name='過度排斥' value='過度排斥'>過度排斥</option></select>");
            $("#touch").append(touch);
        }else{
            $("#touch").empty();
        }
    });
    $("#historycheck,#historycheck2").click(function(){
        if($("#historycheck").prop('checked')){
            $("#history").empty();
            var history=('<select name="history"><option value=""></option><option value="公立" selected="selected">公立</option><option value="私立">私立</option></select><select name="history"><option value=""></option><option value="幼稚園">幼稚園</option><option value="托嬰" selected="selected">托嬰</option></select><select name="history"><option value=""></option><option value="幼幼班">幼幼班</option><option value="小班">小班</option><option value="中班">中班</option><option value="大班">大班</option><option value="特教班">特教班</option><option value="半日" selected="selected">半日</option><option value="全日">全日</option></select>');
            $("#history").append(history);
        }else{
            $("#history").empty();
        }
    });
    $("input[id^='treat_hzcheck']").click(function(){
        var id = this.id;
        if($("#"+id).prop('checked')){
            $("#treat_hz"+id.substring(13,14)).empty();
            var treat_hz=$("<select name='treat_hz'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>");
            $("#treat_hz"+id.substring(13,14)).append(treat_hz);
            $("#treat_hz"+id.substring(13,14)).append("次");
        }else{
            $("#treat_hz"+id.substring(13,14)).empty();
        }
    });
    $("#formsubmit").click(function(){
        var serializeform = $('#form').serializeArray();
        console.log(serializeform);
        var postdata = objectifyForm(serializeform,"updateQuestion");
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
        postdata[1].caseid = $("#caseid").val();
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
        // if(postdata[1]['history']!="無")
            // postdata[1]['history']+=("，"+postdata[1]['day']);
        postdata[1].id=id;
        //寄養媽媽處理
        if(postdata[1].caregiver=="寄養媽媽"){
            postdata[1].family_married="無資料";
            postdata[1].family_brother="無資料";
            postdata[1].family_fname="無資料";
            postdata[1].family_fage="無資料";
            postdata[1].family_feducation="無資料";
            postdata[1].family_fcareer="無資料";
            postdata[1].family_fcountry="無資料";
            postdata[1].family_mname="無資料";
            postdata[1].family_mage="無資料";
            postdata[1].family_meducation="無資料";
            postdata[1].family_mcareer="無資料";
            postdata[1].family_mcountry="無資料";
            postdata[1].history_nutrition="無資料";
            postdata[1].history_disease="無資料";
            postdata[1].history_medication="無資料";
            postdata[1].history_abuse="無資料";
            postdata[1].history_pregcount="無資料";
            postdata[1].history_birthcount="無資料";
            postdata[1].history_abortion="無資料";
            postdata[1].history_pregweek="無資料";
            postdata[1].history_pregprocess="無資料";
        }
        console.log(postdata);
        var test = objectifyForm
        var r = confirm("確定要修改嗎?");
        if(r){
            $.ajax({
                url:'../../Question/controller.php',
                type: 'POST',
                data:JSON.stringify(postdata),
                async:false,
                success:function(r){
                        result=eval(r);
                        // console.log(result);
                        if(result[0].status==200){
                            alert("修改完成!");
                            $("#ready").empty();
                            $("#formsubmit").attr("style","display:none");
                            $("#reset").attr("style","display:none");
                            $("#chpart").attr("style","display:none");
                            history.go(-1);
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
        }
    })
    var getdata = [{"act":"getQuestionDetail"},{"id":id}];
    $.ajax({
            url:'../../Question/controller.php',
            type: 'POST',
            data:JSON.stringify(getdata),
            async:false,
            success:function(r){
                    result=eval(r);
                    console.log(result);
                    id=result[1]['id'];
                    var obj=Object.keys(result[1]);
                    if(result[1]['caregiver']=="寄養媽媽"){
                        $("#family_status").empty();
                        $("#preg").empty();
                    }
                    $("#caseid").prop("disabled","true");
                    //處理12個其他input
                    var split = result[1]['family_fcareer'].split("，");
                    if(split.length==3){
                        $("input[name='family_fcareer'][type='text']").val(split[2]);
                        $("#family_fcareercheck2").attr("checked","true");
                    }

                    var split = result[1]['family_mcareer'].split("，");
                    if(split.length==3){
                        $("input[name='family_mcareer'][type='text']").val(split[2]);
                        $("#family_mcareercheck2").attr("checked","true");
                    }

                    var split = result[1]['family_fcountry'].split("，");
                    if(split.length==2)
                        $("input[name='family_fcountry'][type='text']").val(split[1]);

                    var split = result[1]['family_mcountry'].split("，");
                    if(split.length==2)
                        $("input[name='family_mcountry'][type='text']").val(split[1]);

                    var split = result[1]['treat_location'].split("，");
                    // console.log(split);
                    if(split.length>0){
                        var other1 = split.indexOf("其他醫院");
                        var other2 = split.indexOf("復健診所");
                        var other3 = split.indexOf("其他");
                        if(other1!=-1){
                            $("#treat_locationcontent_special1 input[name='treat_location'][type='text']").val(split[other1+1]);
                        }
                        if(other2!=-1){
                            $("#treat_locationcontent_special2 input[name='treat_location'][type='text']").val(split[other2+1]);
                        }
                        if(other3!=-1){
                            $("#treat_locationcontent input[name='treat_location'][type='text']").val(split[other3+1]);
                        }
                        // console.log(other1);
                        // console.log(other2);
                        // console.log(other3);
                    }

                    var split = result[1]['treat_hz'].split("，");
                    if(split.length>0){
                        for (var i = 0; i < split.length; i++) {
                            var start = split[i].indexOf("週");
                            var type = split[i].substr(0,4);
                            var value = split[i].substr(start+1,1);
                            if(type =="物理治療"){
                                $("#treat_hzcheck1").attr("checked",true);
                                $("#treat_hz1 select option[value='"+value+"']").attr("selected","selected");
                            }
                            if(type =="職能治療"){
                                $("#treat_hzcheck2").attr("checked",true);
                                $("#treat_hz2 select option[value='"+value+"']").attr("selected","selected");
                            }
                            if(type =="語言治療"){
                                $("#treat_hzcheck3").attr("checked",true);
                                $("#treat_hz3 select option[value='"+value+"']").attr("selected","selected");
                            }
                            if(type =="認知訓練"){
                                $("#treat_hzcheck4").attr("checked",true);
                                $("#treat_hz4 select option[value='"+value+"']").attr("selected","selected");
                            }
                        }
                    }

                    for (var i = 0; i < obj.length; i++) {
                        // console.log(obj[i]);
                        // console.log(result[1][obj[i]]);
                        // if((result[1].obj[i]).indexOf("，")){
                            var thisobj=result[1][obj[i]];
                            var arr = thisobj.split("，");
                            // console.log(arr);
                        // }
                        // console.log("input[name='"+obj[i]+"'][type='checkbox'][value='"+result[1][obj[i]]+"']");
                        for (var j = 0; j < arr.length; j++) {
                            $("input[name='"+obj[i]+"'][type='number']").val(arr[j]);
                            $("input[name='"+obj[i]+"'][type='text'][class='major']").val(arr[j]);
                            $("select[name='"+obj[i]+"'] option[value='"+arr[j]+"']").attr("selected","selected");
                            $("input[name='"+obj[i]+"'][type='checkbox'][value='"+arr[j]+"']").attr("checked","true");
                            $("input[name='"+obj[i]+"'][type='radio'][value='"+arr[j]+"']").attr("checked","true");
                        }
                    }

                    var split = result[1]['abnormal_develop'].split("，");
                    // console.log(split);
                    for (var i = 0; i < split.length; i++) {
                            var start = split[i].indexOf(":");
                            var end = split[i].indexOf("月");
                            end=end-1;
                            var type = split[i].substr(0,start);
                            var value = split[i].substring(start+1,end);
                            // console.log(type+" "+value);
                            if(type =="頭部控制"){
                                if(value>=0)
                                    $("#dev1 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev1 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="翻身"){
                                if(value>=0)
                                    $("#dev2 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev2 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="坐"){
                                if(value>=0)
                                    $("#dev3 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev3 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="爬"){
                                if(value>=0)
                                    $("#dev4 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev4 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="走"){
                                if(value>=0)
                                    $("#dev5 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev5 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="伸手抓物"){
                                if(value>=0)
                                    $("#dev6 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev6 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="塗鴉"){
                                if(value>=0)
                                    $("#dev7 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev7 option[value='不清楚']").attr("selected","selected");
                            }
                            if(type =="第一個有意義單字"){
                                if(value>=0)
                                    $("#dev8 option[value='"+value+"個月']").attr("selected","selected");
                                else
                                    $("#dev8 option[value='不清楚']").attr("selected","selected");
                            }
                        }
                        var otherarr=["history_disease","history_medication","history_abuse","neonatal_screening"];
                        for(var i=0; i<otherarr.length; i++){
                            var split = result[1][otherarr[i]].split("，");
                            if(split.length>=2){
                                $("input[name='"+otherarr[i]+"'][type='text']").val(split[1]);
                            }
                        }
                        var split = result[1]["history_pregweek"].split("，");
                        console.log(split);
                        var end = split[3].indexOf("公");
                        var str = split[3].substr(0,end);
                        $("input[name='babyweight'][type='number']").val(str);
                        $("#babyweek option[value='"+split[1]+"']").attr("selected","selected");           
                        $("#babyday option[value='"+split[2]+"']").attr("selected","selected");    

                        var split = result[1]["history_family"].split("，");
                        var start = split.indexOf("有");
                        if(start!=-1){
                            $("#who").val(split[start+1]);
                        }
                        var start = split.indexOf("其他");
                        console.log(start);
                        if(start!=-1){
                            $("#dnafail").val(split[start+1]);
                        }
            },
            error:function(err){
                    alert("發生未預期的錯誤 請聯絡管理員");
                    console.log(err);
        }
    });
    $("#form").each(function(){
        var allinput=$(this).find(":input[onclick='clickNo(this)']");
        // console.log($(this).find(':input')) //<-- Should return all input elements in that specific form.
        for (var i = 0; i < allinput.length; i++) {
            if(allinput[i].checked){
                console.log(allinput[i].name);
                $("input[name='"+allinput[i].name+"']").prop("disabled","true");
                $("input[name='"+allinput[i].name+"'][onclick='clickNo(this)']").prop("disabled",false);
            }
            // console.log(allinput[i].checked);
        }
    });

    if($("input[onclick='clickNo(this)']").prop("checked")==true){
        console.log(this);
    }
    // console.log($("input[onclick='clickNo(this)']").prop("checked"));
});
function dnaother(){
    if($("#dnaothercheck").prop('checked')){
        var dnaother=$("<input type='text' name='history_family'>");
        $("#dnaother").append(dnaother);
    }else{
        $("#dnaother").empty();
        $("#dnaother").append("其他");
    }
}
function checkfamily(t){
    if(t.value=="寄養媽媽"){
        console.log(123);
        $("#family_status").empty();
        $("#preg").empty();
    }else{
        $("#family_status").empty();
        $("#family_status").append(familydata);
        $("#preg").empty();
        $("#preg").append(pregdata);
        relaodready();
    }
    checkmom=t.value;
}