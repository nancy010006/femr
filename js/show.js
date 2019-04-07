var dataTable;
$(document).ready(function() {
    $('#table tfoot th').each( function (index) {
        if(index!=0){
            var title = $(this).text();
            $(this).html( '<input class="search" type="text" placeholder="Search '+title+'" />' );
        }
    });
    filter();
    $(".index").click(function(event){
        event.preventDefault();
        window.location.href = "index.html";
    })
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
    $('#update').click( function () {
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
    $('#table tbody').on( 'click', 'tr', function () {
        console.log(123);
        // $(this).toggleClass('selected',"false");
        console.log(dataTable.row(".odd"));
        // $("tr").toggleClass('selected',false);
    });
});
function filter(){
    var i=0;
    // $("#filter").attr("style","display:none");
    // $("#reset").attr("style","display:block");
    $("#tbody").empty();
    var startday=$("#startday").val();
    var endday=$("#endday").val();
    var data ={"data": [{"act":"DataTablegetDataListbydate"},{"endday":endday,"startday":startday}]};
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
        // initComplete: function () {
        //     this.api().columns().every( function () {
        //         var column = this;
        //         var select = $('<select><option value=""></option></select>')
        //             .appendTo( $(column.footer()).empty() )
        //             .on( 'change', function () {
        //                 var val = $.fn.dataTable.util.escapeRegex(
        //                     $(this).val()
        //                 );
 
        //                 column
        //                     .search( val ? '^'+val+'$' : '', true, false )
        //                     .draw();
        //             } );
 
        //         column.data().unique().sort().each( function ( d, j ) {
        //             select.append( '<option value="'+d+'">'+d+'</option>' )
        //         } );
        //     } );
        // }
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
        });
    });
}