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
var getcaseid= Request['caseid'];
var getserialid= Request['serialid'];
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
$(document).ready(function() {
    if(!getcaseid){
        $("#form2").attr("style","display:none");
    }else{
        $("#form").attr("style","display:none");
    }
    var d = new Date(); 
    var month = d.getMonth()+1; 
    var day = d.getDate(); 

    var output = d.getFullYear() + '-' + 
    (month<10 ? '0' : '') + month + '-' + 
    (day<10 ? '0' : '') + day;
    console.log(output);
    $("#date").val(output);
    // $("#date2").val(output);
    //修改病歷資料用
    if(getcaseid){
        console.log(123);
        $("#getcaseid").val(getcaseid);
        var act={};
        var updatedata=[];
        act.act="getdetailbyid";
        var obj={};
        obj.caseid=getcaseid;
        obj.serialid=getserialid;
        updatedata.push(act);
        updatedata.push(obj);
        $.ajax({
            url:'../../midcase/controller.php',
            type: 'POST',
            data:JSON.stringify(updatedata),
            async:false,
            success:function(r){
                    // console.log(r);
                    $("#getcaseid").attr("disabled",true);
                    result=eval(r);
                    if(result[0].status==200){
                        console.log(result);
                        var readydata = Object.keys(result[1]);
                        for (var i = 1; i < readydata.length; i++) {
                            // console.log(readydata[i]);
                            var value =readydata[i];
                            if(value!='datafrom'){
                                $("#form2 input[name='"+readydata[i]+"']").val(result[1][value]);
                                $("#form2 select[name='"+readydata[i]+"']").val(result[1][value]);
                                $("#form2 textarea[name='"+readydata[i]+"']").val(result[1][value]);
                                // $("#form2 input[name='"datafrom"'][value='"+result[1]['datafrom']+"']").attr("checked",true);
                            }
                        }
                        $("#form2 input[name='name2']").val(result[1]['name']);
                        $("#form2 input[name='birthday2']").val(result[1]['birthday']);
                        $("#form2 input[name='date2']").val(result[1]['date']);
                        $("#form2 input[name='datafrom'][value='"+result[1]['datafrom']+"']").attr("checked",true);
                        $("#form2 input[name='sex2'][value='"+result[1]['sex']+"']").attr("checked",true);
                    }else if(result[0].status==422){
                    }else{
                        alert("發生未預期的錯誤 請聯絡管理員");
                    }
            },
            error:function(err){
                    alert("發生未預期的錯誤 請聯絡管理員");
                    console.log(err);
            }
        });
    }
    //修改病歷資料用↑↑↑↑↑↑↑↑↑↑

    // $("#date2").val(output);

    $(".index").click(function(event){
        event.preventDefault();
        window.location.href = "index.html";
    })
    $("input[name=datafrom]").click(function(){
        if($("#other").prop('checked')){
            $("input[name=othercontent]").attr("disabled",false);
            $("input[name=othercontent]").css("background-color", "white");
        }else{
            $("input[name=othercontent]").attr("disabled",true);
            $("input[name=othercontent]").val("");
            $("input[name=othercontent]").css("background-color", "rgb(235, 235, 228)");
        }
    });
	$('#form').submit(function(event){
        var error = 0;
		event.preventDefault();
		var serializeform = $('#form').serializeArray();
		// console.log(serializeform);
		var postdata= objectifyForm(serializeform,"addCase");
        if($("#other").prop('checked')){
            var key = 'datafrom';
            // 复制原来的值
            postdata[1][key] = postdata[1]['othercontent'];
            // 删除原来的键
            delete postdata['othercontent'];
            // 检查效果
        }
        // console.log(postdata);
        // console.log(serializeform);
        for (var i = 0; i < serializeform.length; i++) {
            if(serializeform[i].value==""){
                var key = serializeform[i].name;
                // console.log(key);
                // console.log($("input[name="+key+"]").val());
                $("input[name="+key+"]").css("background-color", "red");
                error++;
            }else{
                var key = serializeform[i].name;
                $("input[name="+key+"]").css("background-color", "white");
            }
        }
        if(error>0){
            alert("未填寫完成 請檢查輸入資料");
            console.log(postdata);
        }
        else{
            // var confirm2 = "以下為您填寫的資料\n姓名:"+postdata[1].name+" 性別:"+postdata[1].sex+" 病歷號碼"+postdata[1].id
            // +"\n出生日期"+postdata[1].birthday+" 聯合門診日期"+postdata[1].date
            // +"\n物理治療評估: 工具"+postdata[1].physical_tool+" 結果 "+postdata[1].physical_result+" 發展商數 "+postdata[1].physical_number+" PR "+postdata[1].physical_pr
            // +"\n職能治療評估: 工具"+postdata[1].function_tool+" 結果 "+postdata[1].function_result+" 發展商數 "+postdata[1].function_number+" PR "+postdata[1].function_pr
            // +"\n語言治療評估:"
            // +"\n    口語理解工具 "+postdata[1].oral_comprehension_tool+" 結果 "+postdata[1].oral_comprehension_result+" 能力 "+postdata[1].oral_comprehension_ability
            // +"\n    口語表達工具 "+postdata[1].oral_expression_tool+" 結果 "+postdata[1].oral_expression_result+" 能力 "+postdata[1].oral_expression_ability
            // +"\n心理治療評估:"
            // +"\n    工具 "+postdata[1].psychotherapy_tool+" 結果 "+postdata[1].psychotherapy_result+" 全智商 "+postdata[1].psychotherapy_iq+" PR "+postdata[1].psychotherapy_pr
            // +"\n個案轉介來源 "+postdata[1].datafrom
            var confirm2 = "以下為您填寫的資料\n姓名: "+postdata[1].name+"\n性別: "+postdata[1].sex+"\n病歷號碼: "+postdata[1].id
            +"\n出生日期: "+postdata[1].birthday+"\n聯合門診日期: "+postdata[1].date
            var r = confirm(confirm2);
            if(r==true){
                $.ajax({
                    url:'../../midcase/controller.php',
                    type: 'POST',
                    data:JSON.stringify(postdata),
                    async:false,
                    success:function(r){
                            // console.log(r);
                            result=eval(r);
                            if(result[0].status==200){
                                alert("新增成功");
                                $("#form").empty();
                                $("#form").append("<h1>新增成功</h1><button id='setup'>再新增一筆</button><button id='index2'>首頁</button>");
                                $("#setup").click(function(event){
                                    event.preventDefault();
                                    // console.log(this.id);
                                    window.location.href = this.id+".html";
                                })
                                $("#index2").click(function(event){
                                    // console.log(this.id);
                                    event.preventDefault();
                                    window.location.href = "index.html";
                                })
                            }
                            else if(result[0].status==422){
                                alert("病歷號碼重複 請重新確認");
                            }else{
                                alert("發生未預期的錯誤 請聯絡管理員");
                            }
                    },
                    error:function(err){
                            alert("發生未預期的錯誤 請聯絡管理員");
                            console.log(err);
                    }
                });
            }else{
                // console.log("no")
            }
        }
        // console.log(JSON.stringify(postdata));
		// window.location.href='show.html';
	});
    $('#form2').submit(function(event){
        var error = 0;
        event.preventDefault();
        var serializeform = $('#form2').serializeArray();
        // console.log(serializeform);
        var postdata= objectifyForm(serializeform,"updateCase");
        if($("#other").prop('checked')){
            var key = 'datafrom';
            // 复制原来的值
            postdata[1][key] = postdata[1]['othercontent'];
            // 删除原来的键
            delete postdata['othercontent'];
            // 检查效果
        }
        console.log(getcaseid);
        if(getcaseid){
            postdata[1].id2=getcaseid;
            postdata[1].serialid=getserialid;
        }
        console.log(postdata);
        var r = confirm("確定要修改嗎?");
        if(r==true){
            $.ajax({
                url:'../../midcase/controller.php',
                type: 'POST',
                data:JSON.stringify(postdata),
                async:false,
                success:function(r){
                        // console.log(r);
                        result=eval(r);
                        if(result[0].status==200){
                            // alert("新增成功");
                            $("#form2").empty();
                            $("#form2").append("<h1>修改成功</h1><button id='back'>上一頁</button><button id='index2'>首頁</button>");
                            $("#back").click(function(event){
                                event.preventDefault();
                                // console.log(this.id);
                                history.go(-1);
                            })
                            $("#index2").click(function(event){
                                // console.log(this.id);
                                event.preventDefault();
                                window.location.href = "index.html";
                            })
                        }
                        else if(result[0].status==422){
                            alert("病歷號碼重複 請重新確認");
                        }else{
                            alert("發生未預期的錯誤 請聯絡管理員");
                        }
                },
                error:function(err){
                        alert("發生未預期的錯誤 請聯絡管理員");
                        console.log(err);
                }
            });
        }else{
            // console.log("no")
        }
        // console.log(JSON.stringify(postdata));
        // window.location.href='show.html';
    });
});

