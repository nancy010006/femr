var dataTable;
$(document).ready(function() {
    $('#table tfoot th').each( function (index) {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    });
    filter();
    $("#filter").click(function(){
        dataTable.destroy();
        filter();
    });
    $('#update').click( function () {
        var length = dataTable.rows('.selected').data().length;
        if(length>1)
            alert("一次只能修改一項");
        else if(length<1){
            alert("請選擇要修改的項目");
        }else{
            var data = dataTable.rows('.selected').data()[0];
            console.log(data);
            console.log(data[0]);
            console.log(data[25]);
            window.location.href = "setup.html?caseid="+data[0]+"&serialid="+data[29];
        }
    });
    $(".index").click(function(){
        window.location.href = "index.html";
    });
    $("#reset").click(function(){
        location.reload();
    });
    $('#button').click( function () {
        console.log(dataTable.rows('.selected').data()[0]);
        console.log(dataTable.rows('.selected'));
        var length = dataTable.rows('.selected').data().length;
        var postdata = [{"act":"deleteCaseHistory"}];
        var obj={};
        obj.serialid=[];
        obj.caseid=[];
        var tip="確定要刪除嗎?以下是您選擇的病歷號碼及日期\n";
        for (var i = 0; i < length; i++) {
            var id = dataTable.rows('.selected').data()[i][29];
            console.log(id);
            var showid = dataTable.rows('.selected').data()[i][0];
            var date = dataTable.rows('.selected').data()[i][1];
            obj.serialid[i]=id;
            obj.caseid[i]=showid;
            tip+=(showid+" "+date+"\n");
        }
        postdata.push(obj);
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
    $("#selectall").click(function(event){
        // event.preventDefault();
        if($("#selectall").prop("checked")==true){
            $("input").prop("checked",true);
            $("tr").toggleClass('selected',true);
        }else{
            $("input").prop("checked",false);
            $("tr").toggleClass('selected',false);
        }
    });
});
function chremarks(t,caseid){
    // console.log(t.value);
    $("#text"+t.value).attr("disabled","true");
    // console.log($("#text"+t.value).attr("id"));
    // console.log($("#text"+t.value).val());
    console.log(caseid);
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
function filter(){
    var i=0;
    // $("#filter").attr("style","display:none");
    // $("#reset").attr("style","display:block");
    var startday=$("#startday").val();
    var endday=$("#endday").val();
    var data ={"data": [{"act":"DataTablegetMidCaseListbydate"},{"endday":endday,"startday":startday}]};
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
                else
                    return json.data;
            },
            error: function(r){  // error handling
                console.log(r);
                $(".employee-grid-error").html("");
                $("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                $("#employee-grid_processing").css("display","none");
                
            }
        },
        "order": [[ 1, 'asc' ]],
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
                "aTargets" :　[1],  
                "mRender" : function(data, type, full,row){
                    var prev = full[row.col-1];
                    var EditLinkText = "<a target='_self' href='showmidcasedata.html?caseid="+prev+"'>"+prev+"</a>";
                       return EditLinkText;
                }  
            },
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
                title: '建檔資料'
            }
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child input'
        }
    });
        dataTable.columns().every( function () {
            console.log(123);
            var that = this;
            $( 'input', this.footer() ).on( 'keyup change', function () {
                if ( that.search() !== this.value ) {
                    that
                        .search( this.value )
                        .draw();
                        $("input").prop("checked",false);
                }
            });
        });
}