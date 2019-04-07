var Request = new Object();    
var dataTable;
var tablehead;
var serialid=0;
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
var caseid= Request['caseid'];
function chremarks(t){
    // console.log(t.value);
    $("#text"+t.value).attr("disabled","true");
    // console.log($("#text"+t.value).attr("id"));
    // console.log($("#text"+t.value).val());
    var obj={};
    obj.act="remark";
    var data={};
    data.caseid=caseid;
    data.serialid=t.value;
    data.remarks=$("#text"+t.value).val();
    var post=[];
    post.push(obj);
    post.push(data);
    console.log(post);
    $.ajax({
        url:'../../midcase/controller.php',
        data:JSON.stringify(post),
        type: 'POST',
        async:false,
        success:function(r){
                // console.log(r);
                result=eval(r);
                // console.log(result);
                if(result[0].status=="200"){    
                }else{
                    alert("發生未預期的錯誤 請聯絡管理員");
                }
        },
        error:function(err){
                console.log(err);
        }
    });
}
$(document).ready(function() {
    // initialize();
    // inihead();
    filter2();
    $('#update1').click( function () {
        var length = tablehead.rows('.selected').data().length;
        if(length>1)
            alert("一次只能修改一項");
        else if(length<1){
            alert("請選擇要修改的項目");
        }else{
            var data = tablehead.rows('.selected').data()[0];
            console.log(data);
            window.location.href = "setup.html?caseid="+data[0]+"&serialid="+data[29];
        }
    });
    $('#update2').click( function () {
        var length = dataTable.rows('.selected').data().length;
        if(length>1)
            alert("一次只能修改一項");
        else if(length<1){
            alert("請選擇要修改的項目");
        }else{
            var data = dataTable.rows('.selected').data()[0];
            console.log(data);
            window.location.href = "updatedata.html?id="+data[0];
        }
    });
    $("#addmidcase").attr("href","updatemidcase.html?caseid="+caseid);
    // $('#tablehead tbody').on( 'click', 'tr', function () {
    //     $(this).toggleClass('selected');
    // });
    $("#selectall2").click(function(event){
        // event.preventDefault();
        if($("#selectall2").prop("checked")==true){
            $("#tablehead input").prop("checked",true);
            $("#tablehead tr").toggleClass('selected',true);
        }else{
            $("#tablehead input").prop("checked",false);
            $("#tablehead tr").toggleClass('selected',false);
        }
    });
    $(".index").click(function(event){
        event.preventDefault();
        window.location.href = "index.html";
    })
    $('#table tfoot th').each( function (index) {
        if(index!=0){
            var title = $(this).text();
            $(this).html( '<input type="text" class="search" placeholder="Search '+title+'" />' );
        }
    });
    filter();
    $("#filter").click(function(){
        dataTable.destroy();
        filter();
    });
    $("#reset").click(function(){
        location.reload();
    });
    $('#button').click( function () {
        console.log(dataTable.rows('.selected').data());
        console.log(dataTable.rows('.selected'));
        var length = dataTable.rows('.selected').data().length;
        var postdata = [{"act":"deleteData"}];
        var obj={};
        var tip="確定要刪除嗎?以下是您選擇的病歷號碼及填寫時間\n";
        for (var i = 0; i < length; i++) {
            var id = dataTable.rows('.selected').data()[i][1];
            var deleteid = dataTable.rows('.selected').data()[i][0];
            obj[i]=deleteid;
            id+=" "+dataTable.rows('.selected').data()[i][2];
            tip+=(id+"\n");
        }
        postdata.push(obj);
        console.log(obj);
        var r = confirm(tip);
        if(r){
            $.ajax({
                url:'../../Question/controller.php',
                data:JSON.stringify(postdata),
                type: 'POST',
                async:false,
                success:function(r){
                        // console.log(r);
                        result=eval(r);
                        console.log(result);
                        if(result[0].status=="200"){
                            alert("刪除成功");
                            dataTable.destroy();
                            filter();
                            $("input").prop("checked",false);
                        }else{
                            alert("發生未預期的錯誤 請聯絡管理員");
                        }
                },
                error:function(err){
                        console.log(err);
                }
            });
        }
    });
    $('#deletehead').click( function () {
        console.log(tablehead.rows('.selected').data());
        console.log(tablehead.rows('.selected'));
        var length = tablehead.rows('.selected').data().length;
        var postdata = [{"act":"deleteCaseHistory"}];
        var obj={};
        obj.serialid=[];
        obj.caseid=[];
        var tip="確定要刪除嗎?以下是您選擇的病歷號碼及填寫時間\n";
        for (var i = 0; i < length; i++) {
            // console.error(tablehead.rows('.selected').data()[i]);
            var id = tablehead.rows('.selected').data()[i][1];
            var deleteid = tablehead.rows('.selected').data()[i][29];
            obj.serialid[i]=deleteid;
            obj.caseid[i]=tablehead.rows('.selected').data()[i][0];
            id+=" "+tablehead.rows('.selected').data()[i][2];
            tip+=(id+"\n");
        }
        postdata.push(obj);
        console.log(obj);
        console.log(postdata);
        var r = confirm(tip);
        if(r){
            $.ajax({
                url:'../../midcase/controller.php',
                data:JSON.stringify(postdata),
                type: 'POST',
                async:false,
                success:function(r){
                        // console.log(r);
                        result=eval(r);
                        console.log(result);
                        if(result[0].status=="200"){
                            alert("刪除成功");
                            tablehead.destroy();
                            filter2();
                            $("input").prop("checked",false);
                        }else{
                            alert("發生未預期的錯誤 請聯絡管理員");
                        }
                },
                error:function(err){
                        console.log(err);
                }
            });
        }
    });
    $("#selectall").click(function(event){
        if($("#selectall").prop("checked")==true){
            $("#table input").prop("checked",true);
            $("#table tr").toggleClass('selected',true);
        }else{
            $("#table input").prop("checked",false);
            $("#table tr").toggleClass('selected',false);
        }
    });
});
function filter(){
    // $("#filter").attr("style","display:none");
    // $("#reset").attr("style","display:block");
    // $("#tbody").empty();
    var startday=$("#startday").val();
    var endday=$("#endday").val();
    var data ={"data": [{"act":"DataTablegetMidCaseDataListbydate"},{"endday":endday,"startday":startday,"caseid":caseid}]};
    // console.log('../Question/controller.php?act=getQuestionListbydate&startday='+startday+'&endday='+endday);
    dataTable = $('#table').DataTable( {
        "drawCallback": function( settings ) {
            $('input').on( 'click', function () {
                $(this.closest("tr")).toggleClass('selected');
            });
        },
        "processing": true,
        "serverSide": true,
        "ajax":{
            url :"../../Question/controller.php", // json datasource
            // url :"../ptt_online/question/test.php", // json datasource
            data: data,
            type: "post",  // method  , by default get
            // success:function(r){
            //  console.log(r);
            // },
            dataSrc: function ( json ) {
                //Make your callback here.
                console.log(json);
                if(json[0].status==204){
                    // $(".employee-grid-error").html("");
                    // $("#table").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#employee-grid_processing").css("display","none");
                    return false;
                }
                else{
                    console.log(json.data);
                    return json.data;
                }
            },
            error: function(r){  // error handling
                console.log(r);
                $(".employee-grid-error").html("");
                $("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                $("#employee-grid_processing").css("display","none");
                
            }
        },
        "order": [[ 2, 'asc' ]],
        'aoColumnDefs' : [
            {
                "aTargets" :　[0],  
                "orderable": false,
                "mRender" : function(data, type, full){  
                    var EditLinkText = "<input type='checkbox'/>";
                       return EditLinkText;
                }
            },
            {
                "targets": [ 1 ],
                "visible": false,
                "searchable": false
            },
            {
                "aTargets" :　["_all"],  
                "mRender" : function(data, type, full,a){
                    return full[a.col-1];  
                }  
            }
        ],
        "bProcessing" : true,
        "lengthMenu": [[10, 25, 50, 100,500,1000, -1], [10, 25, 50, 100,500,1000, "All"]],
        dom: 'lfrtpB<"bottom"i>',
        buttons: [{
                extend: 'excelHtml5',
                text: '匯出全部',
                exportOptions: {
                    columns: ':visible:not(.not-exported)'
                },
                title: 'Data export'
            }, {
                extend: 'excelHtml5',
                text: '匯出勾選項目',
                exportOptions: {
                    columns: ':visible:not(.not-exported)',
                    modifier: {
                        selected: true
                    }
                },
                title: '回覆資料'
            }
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child input'
        }
    });
    dataTable.columns().every( function () {
        var that = this;
        $( 'input[class="search"]', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
                    $("input").prop("checked",false);
            }
        } );
    });
}
function filter2(){
    var i=0;
    var data ={"data": [{"act":"DataTablegetMidCaseHistoryListbydate"},{"caseid":caseid}]};
    // console.log('../Question/controller.php?act=getQuestionListbydate&startday='+startday+'&endday='+endday);
        tablehead = $('#tablehead').DataTable( {
        "searching" : false,
        "processing": true,
        "serverSide": true,
        "paging"    : false,
        "ajax":{
            url :"../../midcase/controller.php", // json datasource
            // url :"../ptt_online/question/test.php", // json datasource
            data: data,
            type: "post",  // method  , by default get
            // success:function(r){
            //  console.log(r);
            // },
            dataSrc: function ( json ) {
                //Make your callback here.
                console.log(json);
                if(json[0].status==204){
                    // $(".employee-grid-error").html("");
                    // $("#table").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#employee-grid_processing").css("display","none");
                    return false;
                }
                else{
                    return json.data;
                }
            },
            error: function(r){  // error handling
                console.log(r);
                $(".employee-grid-error").html("");
                $("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                $("#employee-grid_processing").css("display","none");
                
            }
        },
        "order": [[ 2, 'asc' ]],
        'aoColumnDefs' : [
            {
                "aTargets" :　[0],  
                "orderable": false,
                "mRender" : function(data, type, full){  
                    var EditLinkText = "<input type='checkbox'/>";
                       return EditLinkText;
                }  
            },
            // {
            //     "aTargets" :　[1],  
            //     "mRender" : function(data, type, full,row){
            //         var prev = full[row.col-1];
            //         var EditLinkText = "<a  href='showmidcasedata.html?caseid="+prev+"'>"+prev+"</a>";
            //            return EditLinkText;
            //     }  
            // },
            //修改病例
            // {
            //     "aTargets" :　[25],  
            //     "mRender" : function(data, type, full,row){  
            //         var link="<a target='_self' href='setup.html?caseid="+full[0]+"&serialid="+full[25]+"'>修改病歷資料</a>";
            //         return link;  
            //     }  
            // },
            //備註
            {
                "aTargets" :　[29],  
                "visible": false
            },
            //修改備註按鈕
            {
                "aTargets" :　[30],  
                "visible": false 
            },
            {
                "aTargets" :　["_all"],  
                "mRender" : function(data, type, full,row){  
                    return full[row.col-1];
                }  
            }
            
        ],
        dom: 'lfrtpB<"bottom"i>',
        buttons: [{
                extend: 'excelHtml5',
                text: '匯出全部',
                exportOptions: {
                    columns: ':visible:not(.not-exported)'
                },
                title: 'Data export'
            }, {
                extend: 'excelHtml5',
                text: '匯出勾選項目',
                exportOptions: {
                    columns: ':visible:not(.not-exported)',
                    modifier: {
                        selected: true
                    }
                },
                title: '建檔資料'
            }
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child input'
        }
    });
}