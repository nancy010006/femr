$(document).ready(function() {
    $(".index").click(function(event){
        event.preventDefault();
        window.location.href = "index.html";
    })
    $("#filter").click(function(){
        filter();
    });
    $("#reset").click(function(){
        location.reload();
    });
});
function filter(){
    $("#filter").attr("style","display:none");
    $("#reset").attr("style","display:block");
    $("#tbody").empty();
    var startday=$("#startday").val();
    var endday=$("#endday").val();
    // console.log('../Question/controller.php?act=getQuestionListbydate&startday='+startday+'&endday='+endday);
    $.ajax({
        url:'../../Question/controller.php?act=getQuestionListbydate&startday='+startday+'&endday='+endday,
        type: 'GET',
        async:false,
        success:function(r){
                // console.log(r);
                result=eval(r);
                console.log(result);
                if(result[0].status=="200"){
                        var tbody =$("#tbody");
                        for(var i=1; i<result.length; i++){
                            var writetime = (result[i].writetime).substr(0,10);
                            var row = "<tr><td>"+
                            result[i].caseid+"</td><td>"+
                            writetime+"</td><td>"+
                            result[i].height+"</td><td>"+
                            result[i].weight+"</td><td>"+
                            result[i].caregiver+"</td><td>"+
                            result[i].history+" "+result[i].day+"</td><td>"+
                            result[i].question_language+"</td><td>"+
                            result[i].question_action+"</td><td>"+
                            result[i].question_learn+"</td><td>"+
                            result[i].question_relationship+"</td><td>"+
                            result[i].question_mood+"</td><td>"+
                            result[i].question_attention+"</td><td>"+
                            result[i].question_perception+"</td><td>"+
                            result[i].question_lifestyle+"</td><td>"+
                            result[i].question_strangestyle+"</td><td>"+
                            result[i].question_selfmutilation+"</td><td>"+
                            result[i].question_helpkid+"</td><td>"+
                            result[i].target+"</td><td>"+
                            result[i].family_married+"</td><td>"+
                            result[i].family_brother+"</td><td>"+
                            result[i].family_feducation+"</td><td>"+
                            result[i].family_fcareer+"</td><td>"+
                            result[i].family_fcountry+"</td><td>"+
                            result[i].family_meducation+"</td><td>"+
                            result[i].family_mcareer+"</td><td>"+
                            result[i].family_mcountry+"</td><td>"+
                            result[i].family_family+"</td><td>"+
                            result[i].treat_status+"</td><td>"+
                            result[i].treat_type+"</td><td>"+
                            result[i].treat_location+"</td><td>"+
                            result[i].treat_hz+"</td><td>"+
                            result[i].history_family+"</td><td>"+
                            result[i].history_nutrition+"</td><td>"+
                            result[i].history_disease+"</td><td>"+
                            result[i].history_medication+"</td><td>"+
                            result[i].history_abuse+"</td><td>"+
                            result[i].history_pregcount+"</td><td>"+
                            result[i].history_birthcount+"</td><td>"+
                            result[i].history_abortion+"</td><td>"+
                            result[i].history_pregweek+"</td><td>"+
                            result[i].history_pregprocess+"</td><td>"+
                            result[i].abnormal_neonatal+"</td><td>"+
                            result[i].abnormal_disease+"</td><td>"+
                            result[i].abnormal_develop+"</td></tr>";
                            tbody.append(row);
                        }
                }else if(result[0].status=="204"){
                    alert("無資料");
                }else{
                    alert("發生未預期的錯誤 請聯絡管理員");
                }
                start = new Date().getTime();
                $('#table').DataTable({
                    "bProcessing" : true,
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                    dom: 'lfrtipB',
                    buttons: [
                        'excel'
                    ]
                });
                end = new Date().getTime();
                console.log(((end - start) / 1000 + "sec"));
                // $("#table_info").attr("style","display:none");
                // $("#table_filter").attr("style","display:none");
        },
        error:function(err){
                console.log(err);
        }
    });
}