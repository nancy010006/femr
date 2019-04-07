$(document).ready(function(){
    $(".index").click(function(event){
        event.preventDefault();
        window.location.href = "index.html";
    })
	$("#form").submit(function(e){
		e.preventDefault();
		var formdata = objectifyForm($(this).serializeArray(),"updateid");
		console.log(JSON.stringify(formdata));
         $.ajax({
            url:'../../midcase/controller.php',
            type: 'POST',
            data:JSON.stringify(formdata),
            async:false,
            success:function(r){
                    result=eval(r);
                    console.log(result);
                    if(result[0].status==200){
                        alert("更新成功!");
                        location.href="index.html";
                    }
                    else if(result[0].status==402)
                        alert("無此病歷號碼 請確認後並重試");
                    else{
                        alert("發生未預期的錯誤 請聯絡管理員");
                    }
            },
            error:function(err){
                    alert("發生未預期的錯誤 請聯絡管理員");
                    console.log(err);
            }
        });
	})
})
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