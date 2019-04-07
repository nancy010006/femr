<?php
require("../dbconnect.php");
// 抓問題清單
function getQuestionList() {
        global $conn;
        $sql = "select * from data,midcase where data.caseid=midcase.id order by midcase.id;";
        // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
        // echo "<br>";
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
// function getMidCaseList() {
//         global $conn;
//         $sql = "select * from midcase order by midcase.id;";
//         // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
//         // echo "<br>";
//         $result = mysqli_query($conn,$sql);
//         $table = array();
//         // 將搜尋到的資料一筆一筆放進陣列再轉json
//         while($rs = mysqli_fetch_assoc($result)){
//                 array_push($table,$rs);
//         }
//         return $table;
//         // return json_encode($table, JSON_FORCE_OBJECT);
// }
function getQuestionListbydate($startday,$endday) {
        // SELECT * from data where writetime BETWEEN '2017-09-04' and DATE_ADD("2017-09-05", INTERVAL 1 DAY);
        global $conn;
        $startday = mysqli_real_escape_string($conn,$startday);
        $endday = mysqli_real_escape_string($conn,$endday);
        if(empty($startday)&&empty($endday)){
               $sql = "select * from data,midcase where data.caseid=midcase.id order by midcase.id,data.writetime;";
        }else if(!empty($startday)&&!empty($endday)){
               $sql = "select * from data,midcase where data.caseid=midcase.id and writetime BETWEEN '$startday' and DATE_ADD('$endday', INTERVAL 1 DAY) order by midcase.id,data.writetime;";
        }else if(!empty($startday)&&empty($endday)){
                $sql="select * from data,midcase where data.caseid=midcase.id and writetime > '$startday' order by midcase.id,data.writetime;";
        }else if(empty($startday)&&!empty($endday)){
                $sql="select * from data,midcase where data.caseid=midcase.id and writetime < DATE_ADD('$endday', INTERVAL 1 DAY) order by midcase.id,data.writetime;";
        }else{
                return 500;
        }
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $table = array();
        if(count($result)==0)
                return $table;
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function getMidCaseData($startday,$endday,$caseid) {
        global $conn;
        $startday = mysqli_real_escape_string($conn,$startday);
        $endday = mysqli_real_escape_string($conn,$endday);
        $caseid = mysqli_real_escape_string($conn,$caseid);
        if(empty($startday)&&empty($endday)){
               $sql = "select * from data,midcase where data.caseid=midcase.id and data.caseid='$caseid' order by midcase.id;";
        }else if(!empty($startday)&&empty($endday)){
               $sql = "select * from data,midcase where data.caseid=midcase.id and data.caseid='$caseid' order by midcase.id;";
        }else if(empty($startday)&&!empty($endday)){
               $sql = "select * from data,midcase where data.caseid=midcase.id and data.caseid='$caseid' order by midcase.id;";
        }else if(!empty($startday)&&!empty($endday)){
               $sql = "select * from data,midcase where data.caseid=midcase.id and data.caseid='$caseid' order by midcase.id;";
        }else{
                return 500;
        }
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $table = array();
        if(count($result)==0)
                return $table;
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function getMidCaseListbydate($startday,$endday) {
        global $conn;
        $startday = mysqli_real_escape_string($conn,$startday);
        $endday = mysqli_real_escape_string($conn,$endday);
        if(empty($startday)&&empty($endday)){
               $sql = "select * from midcase order by midcase.id;";
        }else if(!empty($startday)&&empty($endday)){
               $sql = "select * from midcase where date > DATE_SUB('$startday', INTERVAL 1 DAY) order by id;";
        }else if(empty($startday)&&!empty($endday)){
               $sql = "select * from midcase where date < DATE_ADD('$endday', INTERVAL 1 DAY) order by id;";
        }else if(!empty($startday)&&!empty($endday)){
               $sql = "select * from midcase where date BETWEEN '$startday' and DATE_ADD('$endday', INTERVAL 1 DAY) order by id;";
        }else{
                return 500;
        }
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $table = array();
        if(count($result)==0)
                return $table;
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function addQuestion($alldata) {
        global $conn;
        date_default_timezone_set('Asia/Taipei');
        // echo date("Y-m-d H:i:s");
        $asiatime = date("Y-m-d H:i:s");
        $caseid = mysqli_real_escape_string($conn,@$alldata['caseid']);
        $height = mysqli_real_escape_string($conn,@$alldata['height']);
        $weight = mysqli_real_escape_string($conn,@$alldata['weight']);
        $caregiver = mysqli_real_escape_string($conn,@$alldata['caregiver']);
        $history = mysqli_real_escape_string($conn,@$alldata['history']);
        $day = mysqli_real_escape_string($conn,@$alldata['day']);
        $question_language = mysqli_real_escape_string($conn,@$alldata['question_language']);
        $question_action = mysqli_real_escape_string($conn,@$alldata['question_action']);
        $question_learn = mysqli_real_escape_string($conn,@$alldata['question_learn']);
        $question_relationship = mysqli_real_escape_string($conn,@$alldata['question_relationship']);
        $question_mood = mysqli_real_escape_string($conn,@$alldata['question_mood']);
        $question_attention = mysqli_real_escape_string($conn,@$alldata['question_attention']);
        $question_perception = mysqli_real_escape_string($conn,@$alldata['question_perception']);
        $question_lifestyle = mysqli_real_escape_string($conn,@$alldata['question_lifestyle']);
        $question_strangestyle = mysqli_real_escape_string($conn,@$alldata['question_strangestyle']);
        $question_selfmutilation = mysqli_real_escape_string($conn,@$alldata['question_selfmutilation']);
        $question_helpkid = mysqli_real_escape_string($conn,@$alldata['question_helpkid']);
        $target = mysqli_real_escape_string($conn,@$alldata['target']);
        $family_married = mysqli_real_escape_string($conn,@$alldata['family_married']);
        $family_brother = mysqli_real_escape_string($conn,@$alldata['family_brother']);
        $family_feducation = mysqli_real_escape_string($conn,@$alldata['family_feducation']);
        $family_fcareer = mysqli_real_escape_string($conn,@$alldata['family_fcareer']);
        $family_fcountry = mysqli_real_escape_string($conn,@$alldata['family_fcountry']);
        $family_meducation = mysqli_real_escape_string($conn,@$alldata['family_meducation']);
        $family_mcareer = mysqli_real_escape_string($conn,@$alldata['family_mcareer']);
        $family_mcountry = mysqli_real_escape_string($conn,@$alldata['family_mcountry']);
        $family_family = mysqli_real_escape_string($conn,@$alldata['family_family']);
        $treat_status = mysqli_real_escape_string($conn,@$alldata['treat_status']);
        $treat_type = mysqli_real_escape_string($conn,@$alldata['treat_type']);
        $treat_location = mysqli_real_escape_string($conn,@$alldata['treat_location']);
        $treat_hz = mysqli_real_escape_string($conn,@$alldata['treat_hz']);
        $history_family = mysqli_real_escape_string($conn,@$alldata['history_family']);
        $history_nutrition = mysqli_real_escape_string($conn,@$alldata['history_nutrition']);
        $history_disease = mysqli_real_escape_string($conn,@$alldata['history_disease']);
        $history_medication = mysqli_real_escape_string($conn,@$alldata['history_medication']);
        $history_abuse = mysqli_real_escape_string($conn,@$alldata['history_abuse']);
        $history_pregcount = mysqli_real_escape_string($conn,@$alldata['history_pregcount']);
        $history_birthcount = mysqli_real_escape_string($conn,@$alldata['history_birthcount']);
        $history_abortion = mysqli_real_escape_string($conn,@$alldata['history_abortion']);
        $history_pregweek = mysqli_real_escape_string($conn,@$alldata['history_pregweek']);
        $history_pregprocess = mysqli_real_escape_string($conn,@$alldata['history_pregprocess']);
        $neonatal_screening = mysqli_real_escape_string($conn,@$alldata['neonatal_screening']);
        $abnormal_neonatal = mysqli_real_escape_string($conn,@$alldata['abnormal_neonatal']);
        $abnormal_disease = mysqli_real_escape_string($conn,@$alldata['abnormal_disease']);
        $abnormal_develop = mysqli_real_escape_string($conn,@$alldata['abnormal_develop']);
        if ($height) { //if item is not empty
                $sql = "select id from midcase where id='$caseid';";
                $result = mysqli_query($conn,$sql);
                // $table = array();
                // print_r($result);
                if($result->num_rows==0)
                    return 422;
                $sql = "insert into data 
                (caseid,height, weight, caregiver,history,day,question_language,question_action,question_learn,question_relationship,question_mood,question_attention,question_perception,question_lifestyle,question_strangestyle,question_selfmutilation,question_helpkid,target,family_married,family_brother,family_feducation,family_fcareer,family_fcountry,family_meducation,family_mcareer,family_mcountry,family_family,treat_status,treat_type,treat_location,treat_hz,history_family,history_nutrition,history_disease,history_medication,history_abuse,history_pregcount,history_birthcount,history_abortion,history_pregweek,history_pregprocess,neonatal_screening,abnormal_neonatal,abnormal_disease,abnormal_develop,writetime)
                 values 
                 ('$caseid','$height','$weight','$caregiver','$history','$day','$question_language','$question_action','$question_learn','$question_relationship','$question_mood','$question_attention','$question_perception','$question_lifestyle','$question_strangestyle','$question_selfmutilation','$question_helpkid','$target','$family_married','$family_brother','$family_feducation','$family_fcareer','$family_fcountry','$family_meducation','$family_mcareer','$family_mcountry','$family_family','$treat_status','$treat_type','$treat_location','$treat_hz','$history_family','$history_nutrition','$history_disease','$history_medication','$history_abuse','$history_pregcount','$history_birthcount','$history_abortion','$history_pregweek','$history_pregprocess','$neonatal_screening','$abnormal_neonatal','$abnormal_disease','$abnormal_develop','$asiatime');";
                // echo $sql;
                if(mysqli_query($conn, $sql))
                        return 200;
                else if(mysqli_error($conn)=="Cannot add or update a child row: a foreign key constraint fails (`hospital`.`data`, CONSTRAINT `data_ibfk_1` FOREIGN KEY (`caseid`) REFERENCES `midcase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)")
                        return 422;
                else
                        return 500;
        }else{
                return 400;
        }
        // return 123;
}
function testadd($alldata) {
        global $conn;

        date_default_timezone_set('Asia/Taipei');
        // echo date("Y-m-d H:i:s");
        $asiatime = date("Y-m-d H:i:s");
        $caseid = mysqli_real_escape_string($conn,@$alldata['caseid']);
        $height = mysqli_real_escape_string($conn,@$alldata['height']);
        $weight = mysqli_real_escape_string($conn,@$alldata['weight']);
        $caregiver = mysqli_real_escape_string($conn,@$alldata['caregiver']);
        $history = mysqli_real_escape_string($conn,@$alldata['history']);
        $day = mysqli_real_escape_string($conn,@$alldata['day']);
        $question_language = mysqli_real_escape_string($conn,@$alldata['question_language']);
        $question_action = mysqli_real_escape_string($conn,@$alldata['question_action']);
        $question_learn = mysqli_real_escape_string($conn,@$alldata['question_learn']);
        $question_relationship = mysqli_real_escape_string($conn,@$alldata['question_relationship']);
        $question_mood = mysqli_real_escape_string($conn,@$alldata['question_mood']);
        $question_attention = mysqli_real_escape_string($conn,@$alldata['question_attention']);
        $question_perception = mysqli_real_escape_string($conn,@$alldata['question_perception']);
        $question_lifestyle = mysqli_real_escape_string($conn,@$alldata['question_lifestyle']);
        $question_strangestyle = mysqli_real_escape_string($conn,@$alldata['question_strangestyle']);
        $question_selfmutilation = mysqli_real_escape_string($conn,@$alldata['question_selfmutilation']);
        $question_helpkid = mysqli_real_escape_string($conn,@$alldata['question_helpkid']);
        $target = mysqli_real_escape_string($conn,@$alldata['target']);
        $family_married = mysqli_real_escape_string($conn,@$alldata['family_married']);
        $family_brother = mysqli_real_escape_string($conn,@$alldata['family_brother']);
        $family_feducation = mysqli_real_escape_string($conn,@$alldata['family_feducation']);
        $family_fcareer = mysqli_real_escape_string($conn,@$alldata['family_fcareer']);
        $family_fcountry = mysqli_real_escape_string($conn,@$alldata['family_fcountry']);
        $family_meducation = mysqli_real_escape_string($conn,@$alldata['family_meducation']);
        $family_mcareer = mysqli_real_escape_string($conn,@$alldata['family_mcareer']);
        $family_mcountry = mysqli_real_escape_string($conn,@$alldata['family_mcountry']);
        $family_family = mysqli_real_escape_string($conn,@$alldata['family_family']);
        $treat_status = mysqli_real_escape_string($conn,@$alldata['treat_status']);
        $treat_type = mysqli_real_escape_string($conn,@$alldata['treat_type']);
        $treat_location = mysqli_real_escape_string($conn,@$alldata['treat_location']);
        $treat_hz = mysqli_real_escape_string($conn,@$alldata['treat_hz']);
        $history_family = mysqli_real_escape_string($conn,@$alldata['history_family']);
        $history_nutrition = mysqli_real_escape_string($conn,@$alldata['history_nutrition']);
        $history_disease = mysqli_real_escape_string($conn,@$alldata['history_disease']);
        $history_medication = mysqli_real_escape_string($conn,@$alldata['history_medication']);
        $history_abuse = mysqli_real_escape_string($conn,@$alldata['history_abuse']);
        $history_pregcount = mysqli_real_escape_string($conn,@$alldata['history_pregcount']);
        $history_birthcount = mysqli_real_escape_string($conn,@$alldata['history_birthcount']);
        $history_abortion = mysqli_real_escape_string($conn,@$alldata['history_abortion']);
        $history_pregweek = mysqli_real_escape_string($conn,@$alldata['history_pregweek']);
        $history_pregprocess = mysqli_real_escape_string($conn,@$alldata['history_pregprocess']);
        $neonatal_screening = mysqli_real_escape_string($conn,@$alldata['neonatal_screening']);
        $abnormal_neonatal = mysqli_real_escape_string($conn,@$alldata['abnormal_neonatal']);
        $abnormal_disease = mysqli_real_escape_string($conn,@$alldata['abnormal_disease']);
        $abnormal_develop = mysqli_real_escape_string($conn,@$alldata['abnormal_develop']);
        if ($height) { //if item is not empty
                $sql = "insert into data 
                (caseid,height, weight, caregiver,history,day,question_language,question_action,question_learn,question_relationship,question_mood,question_attention,question_perception,question_lifestyle,question_strangestyle,question_selfmutilation,question_helpkid,target,family_married,family_brother,family_feducation,family_fcareer,family_fcountry,family_meducation,family_mcareer,family_mcountry,family_family,treat_status,treat_type,treat_location,treat_hz,history_family,history_nutrition,history_disease,history_medication,history_abuse,history_pregcount,history_birthcount,history_abortion,history_pregweek,history_pregprocess,neonatal_screening,abnormal_neonatal,abnormal_disease,abnormal_develop,writetime)
                 values 
                 ('$caseid','$height','$weight','$caregiver','$history','$day','$question_language','$question_action','$question_learn','$question_relationship','$question_mood','$question_attention','$question_perception','$question_lifestyle','$question_strangestyle','$question_selfmutilation','$question_helpkid','$target','$family_married','$family_brother','$family_feducation','$family_fcareer','$family_fcountry','$family_meducation','$family_mcareer','$family_mcountry','$family_family','$treat_status','$treat_type','$treat_location','$treat_hz','$history_family','$history_nutrition','$history_disease','$history_medication','$history_abuse','$history_pregcount','$history_birthcount','$history_abortion','$history_pregweek','$history_pregprocess','$neonatal_screening','$abnormal_neonatal','$abnormal_disease','$abnormal_develop','$asiatime');";
                // echo $sql;
                for($i=0; $i<4000; $i++){
                    mysqli_query($conn, $sql);
                }
                if(mysqli_query($conn, $sql))
                        return 200;
                else if(mysqli_error($conn)=="Cannot add or update a child row: a foreign key constraint fails (`hospital`.`data`, CONSTRAINT `data_ibfk_1` FOREIGN KEY (`caseid`) REFERENCES `midcase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)")
                        return 422;
                else
                        return 500;
        }else{
                return 400;
        }
        // return 123;
}
?>
