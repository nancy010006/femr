<?php
require("../dbconnect.php");
// 抓問題清單
function getQuestionList() {
        global $conn;
        $sql = "select * from data;";
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
function showMidCaseHistory($alldata) {
        global $conn;
        $caseid = mysqli_real_escape_string($conn,@$alldata['caseid']);
        $sql = "select * from midcasehistory where caseid='$caseid';";
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
function deleteCase($alldata) {
        global $conn;
        // echo count($alldata);
        $sql = "delete from midcase where 1=0 ";
        for ($i=0; $i <count($alldata) ; $i++) { 
            // echo $alldata[$i];
            $sql.="or id = '$alldata[$i]' ";
        }
        // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
        // echo "<br>";
        $result = mysqli_query($conn,$sql);
        if(!mysqli_error($conn))
            return 200;
        else
            return 500;
        // return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function deleteCaseHistory($alldata) {
        global $conn;
        // print_r($alldata);
        // echo count($alldata);
        $findempty = array();
        $sql = "delete from midcasehistory where 1=0 ";
        for ($i=0; $i <count($alldata['serialid']) ; $i++) { 
            // echo $alldata[$i];
            $tmp = $alldata['serialid'][$i];
            $sql.="or serialid = '".$tmp."' ";
        }
        // echo $sql;
        // echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)), JSON_UNESCAPED_UNICODE);
        // echo "<br>";
        $result = mysqli_query($conn,$sql);
        if(!mysqli_error($conn)){
            // print_r($alldata['caseid']);
            for ($i=0; $i <count($alldata['caseid']) ; $i++) {
                $tmp = $alldata['caseid'][$i];
                $sql = "select caseid from midcasehistory where caseid = '".$tmp."'";
                $result = mysqli_query($conn,$sql);
                // print_r($result);
                if($result->num_rows==0){
                    $sql = "delete from midcase where id = '".$tmp."';";
                    $sql .= "delete from data where caseid ='".$tmp."';";
                    $result = mysqli_multi_query($conn,$sql);
                }
            }
            return 200;
        }
        else
            return 500;
        // return $table;
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function addCase($alldata) {
        global $conn;
        $id = mysqli_real_escape_string($conn,@$alldata['id']);
        $name = mysqli_real_escape_string($conn,@$alldata['name']);
        $sex = mysqli_real_escape_string($conn,@$alldata['sex']);
        $birthday = mysqli_real_escape_string($conn,@$alldata['birthday']);
        $date = mysqli_real_escape_string($conn,@$alldata['date']);
        // $physical_tool = mysqli_real_escape_string($conn,@$alldata['physical_tool']);
        // $physical_result = mysqli_real_escape_string($conn,@$alldata['physical_result']);
        // $physical_number = mysqli_real_escape_string($conn,@$alldata['physical_number']);
        // $physical_pr = mysqli_real_escape_string($conn,@$alldata['physical_pr']);
        // $function_tool = mysqli_real_escape_string($conn,@$alldata['function_tool']);
        // $function_result = mysqli_real_escape_string($conn,@$alldata['function_result']);
        // $function_number = mysqli_real_escape_string($conn,@$alldata['function_number']);
        // $function_pr = mysqli_real_escape_string($conn,@$alldata['function_pr']);
        // $oral_comprehension_tool = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_tool']);
        // $oral_comprehension_result = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_result']);
        // $oral_comprehension_ability = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_ability']);
        // $oral_expression_tool = mysqli_real_escape_string($conn,@$alldata['oral_expression_tool']);
        // $oral_expression_result = mysqli_real_escape_string($conn,@$alldata['oral_expression_result']);
        // $oral_expression_ability = mysqli_real_escape_string($conn,@$alldata['oral_expression_ability']);
        // $psychotherapy_tool = mysqli_real_escape_string($conn,@$alldata['psychotherapy_tool']);
        // $psychotherapy_result = mysqli_real_escape_string($conn,@$alldata['psychotherapy_result']);
        // $psychotherapy_iq = mysqli_real_escape_string($conn,@$alldata['psychotherapy_iq']);
        // $psychotherapy_pr = mysqli_real_escape_string($conn,@$alldata['psychotherapy_pr']);
        // $psychotherapy_tool2 = mysqli_real_escape_string($conn,@$alldata['psychotherapy_tool2']);
        // $psychotherapy_result2 = mysqli_real_escape_string($conn,@$alldata['psychotherapy_result2']);
        // $datafrom = mysqli_real_escape_string($conn,@$alldata['datafrom']);
        // echo $function_tool;
        // print_r($alldata);
        if ($id) {
                // $sql = "insert into midcase (id, name, sex, birthday, date, physical_tool, physical_result, physical_number, physical_pr, function_tool, function_result, function_number, function_pr, oral_comprehension_tool, oral_comprehension_result, oral_comprehension_ability, oral_expression_tool, oral_expression_result, oral_expression_ability, psychotherapy_tool, psychotherapy_result, psychotherapy_iq, psychotherapy_pr, datafrom) values ('$id', '$name', '$sex', '$birthday', '$date', '$physical_tool', '$physical_result', '$physical_number', '$physical_pr', '$function_tool', '$function_result', '$function_number', '$function_pr', '$oral_comprehension_tool', '$oral_comprehension_result', '$oral_comprehension_ability', '$oral_expression_tool', '$oral_expression_result', '$oral_expression_ability', '$psychotherapy_tool', '$psychotherapy_result', '$psychotherapy_iq', '$psychotherapy_pr', '$datafrom');";
                $sql = "insert into midcase (id, name, sex, birthday, date) values ('$id', '$name', '$sex', '$birthday', '$date');";
                // echo $sql;
                if(mysqli_query($conn, $sql)){
                    addCaseHistory($alldata);
                    return 200;
                }
                else{
                        $str = explode(" ",mysqli_error($conn));
                        if(count($str)==6){
                                if($str[4]=='key'&&$str[5]=="'PRIMARY'")
                                        return 422;
                                else
                                        return 500;
                        }
                }
        }else{
                return 400;
        }
        
        return 401;
}
function addCaseHistory($alldata) {
        global $conn;
        $id = mysqli_real_escape_string($conn,@$alldata['id']);
        $name = mysqli_real_escape_string($conn,@$alldata['name']);
        $sex = mysqli_real_escape_string($conn,@$alldata['sex']);
        $birthday = mysqli_real_escape_string($conn,@$alldata['birthday']);
        $date = mysqli_real_escape_string($conn,@$alldata['date']);
        $physical_tool = mysqli_real_escape_string($conn,@$alldata['physical_tool']);
        $physical_result = mysqli_real_escape_string($conn,@$alldata['physical_result']);
        $physical_number = intval(mysqli_real_escape_string($conn,@$alldata['physical_number']));
        $physical_pr = intval(mysqli_real_escape_string($conn,@$alldata['physical_pr']));
        $physical_remarks = mysqli_real_escape_string($conn,@$alldata['physical_remarks']);
        $function_tool = mysqli_real_escape_string($conn,@$alldata['function_tool']);
        $function_result = mysqli_real_escape_string($conn,@$alldata['function_result']);
        $function_number = intval(mysqli_real_escape_string($conn,@$alldata['function_number']));
        $function_pr = intval(mysqli_real_escape_string($conn,@$alldata['function_pr']));
        $function_remarks = mysqli_real_escape_string($conn,@$alldata['function_remarks']);
        $oral_comprehension_tool = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_tool']);
        $oral_comprehension_result = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_result']);
        $oral_comprehension_ability = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_ability']);
        $oral_expression_tool = mysqli_real_escape_string($conn,@$alldata['oral_expression_tool']);
        $oral_expression_result = mysqli_real_escape_string($conn,@$alldata['oral_expression_result']);
        $oral_expression_ability = mysqli_real_escape_string($conn,@$alldata['oral_expression_ability']);
        $oral_remarks = mysqli_real_escape_string($conn,@$alldata['oral_remarks']);
        $psychotherapy_tool = mysqli_real_escape_string($conn,@$alldata['psychotherapy_tool']);
        $psychotherapy_result = mysqli_real_escape_string($conn,@$alldata['psychotherapy_result']);
        $psychotherapy_iq = intval(mysqli_real_escape_string($conn,@$alldata['psychotherapy_iq']));
        $psychotherapy_pr = intval(mysqli_real_escape_string($conn,@$alldata['psychotherapy_pr']));
        $psychotherapy_tool2 = mysqli_real_escape_string($conn,@$alldata['psychotherapy_tool2']);
        $psychotherapy_result2 = mysqli_real_escape_string($conn,@$alldata['psychotherapy_result2']);
        $psychotherapy_remarks = mysqli_real_escape_string($conn,@$alldata['psychotherapy_remarks']);
        $remarks = mysqli_real_escape_string($conn,@$alldata['remarks']);
        $datafrom = mysqli_real_escape_string($conn,@$alldata['datafrom']);
        // echo $function_tool;
        // print_r($alldata);
        if ($id) {
                $sql = "insert into midcasehistory (caseid, name, sex, birthday, date, physical_tool, physical_result, physical_number, physical_pr, physical_remarks, function_tool, function_result, function_number, function_pr, function_remarks, oral_comprehension_tool, oral_comprehension_result, oral_comprehension_ability, oral_expression_tool, oral_expression_result, oral_expression_ability,oral_remarks, psychotherapy_tool, psychotherapy_result, psychotherapy_iq, psychotherapy_pr,psychotherapy_remarks, datafrom,remarks) values ('$id', '$name', '$sex', '$birthday', '$date', '$physical_tool', '$physical_result', '$physical_number', '$physical_pr', '$physical_remarks', '$function_tool', '$function_result', '$function_number', '$function_pr', '$function_remarks', '$oral_comprehension_tool', '$oral_comprehension_result', '$oral_comprehension_ability', '$oral_expression_tool', '$oral_expression_result', '$oral_expression_ability', '$oral_remarks', '$psychotherapy_tool', '$psychotherapy_result', '$psychotherapy_iq', '$psychotherapy_pr', '$psychotherapy_remarks', '$datafrom','$remarks');";
                // $sql = "insert into midcase (id, name, sex, birthday, date) values ('$id', '$name', '$sex', '$birthday', '$date');";
                // echo $sql;
                if(mysqli_query($conn, $sql))
                        return 200;
                else{
                        $str = explode(" ",mysqli_error($conn));
                        if(count($str)==6){
                                if($str[4]=='key'&&$str[5]=="'PRIMARY'")
                                        return 422;
                                else
                                        return 500;
                        }
                }
        }else{
                return 400;
        }
        
        return 401;
}
function updateCase($alldata) {
        global $conn;
        $id = mysqli_real_escape_string($conn,@$alldata['id2']);
        $name = mysqli_real_escape_string($conn,@$alldata['name2']);
        $sex = mysqli_real_escape_string($conn,@$alldata['sex2']);
        $birthday = mysqli_real_escape_string($conn,@$alldata['birthday2']);
        $date = mysqli_real_escape_string($conn,@$alldata['date2']);
        $physical_tool = mysqli_real_escape_string($conn,@$alldata['physical_tool']);
        $physical_result = mysqli_real_escape_string($conn,@$alldata['physical_result']);
        $physical_number = mysqli_real_escape_string($conn,@$alldata['physical_number']);
        $physical_pr = mysqli_real_escape_string($conn,@$alldata['physical_pr']);
        $physical_remarks = mysqli_real_escape_string($conn,@$alldata['physical_remarks']);
        $function_tool = mysqli_real_escape_string($conn,@$alldata['function_tool']);
        $function_result = mysqli_real_escape_string($conn,@$alldata['function_result']);
        $function_number = mysqli_real_escape_string($conn,@$alldata['function_number']);
        $function_pr = mysqli_real_escape_string($conn,@$alldata['function_pr']);
        $function_remarks = mysqli_real_escape_string($conn,@$alldata['function_remarks']);
        $oral_comprehension_tool = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_tool']);
        $oral_comprehension_result = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_result']);
        $oral_comprehension_ability = mysqli_real_escape_string($conn,@$alldata['oral_comprehension_ability']);
        $oral_expression_tool = mysqli_real_escape_string($conn,@$alldata['oral_expression_tool']);
        $oral_expression_result = mysqli_real_escape_string($conn,@$alldata['oral_expression_result']);
        $oral_expression_ability = mysqli_real_escape_string($conn,@$alldata['oral_expression_ability']);
        $oral_remarks = mysqli_real_escape_string($conn,@$alldata['oral_remarks']);
        $psychotherapy_tool = mysqli_real_escape_string($conn,@$alldata['psychotherapy_tool']);
        $psychotherapy_result = mysqli_real_escape_string($conn,@$alldata['psychotherapy_result']);
        $psychotherapy_iq = mysqli_real_escape_string($conn,@$alldata['psychotherapy_iq']);
        $psychotherapy_pr = mysqli_real_escape_string($conn,@$alldata['psychotherapy_pr']);
        $psychotherapy_tool2 = mysqli_real_escape_string($conn,@$alldata['psychotherapy_tool2']);
        $psychotherapy_result2 = mysqli_real_escape_string($conn,@$alldata['psychotherapy_result2']);
        $psychotherapy_remarks = mysqli_real_escape_string($conn,@$alldata['psychotherapy_remarks']);
        $datafrom = mysqli_real_escape_string($conn,@$alldata['datafrom']);
        $serialid = mysqli_real_escape_string($conn,@$alldata['serialid']);
        // echo $function_tool;
        // print_r($alldata);
        if ($id) {
                $sql = "update midcasehistory set name = '$name', sex = '$sex', birthday = '$birthday', date = '$date', physical_tool = '$physical_tool', physical_result = '$physical_result', physical_number = '$physical_number', physical_pr = '$physical_pr', physical_remarks = '$physical_remarks', function_tool = '$function_tool', function_result = '$function_result', function_number = '$function_number', function_pr = '$function_pr', function_remarks = '$function_remarks', oral_comprehension_tool = '$oral_comprehension_tool', oral_comprehension_result = '$oral_comprehension_result', oral_comprehension_ability = '$oral_comprehension_ability', oral_expression_tool = '$oral_expression_tool', oral_expression_result = '$oral_expression_result', oral_expression_ability = '$oral_expression_ability', oral_remarks = '$oral_remarks', psychotherapy_tool = '$psychotherapy_tool', psychotherapy_result = '$psychotherapy_result', psychotherapy_iq = '$psychotherapy_iq', psychotherapy_pr = '$psychotherapy_pr', psychotherapy_remarks = '$psychotherapy_remarks', datafrom = '$datafrom' where caseid='$id' and serialid='$serialid';";
                // echo $sql;
                if(mysqli_query($conn, $sql))
                        return 200;
                else{
                        $str = explode(" ",mysqli_error($conn));
                        if(count($str)==6){
                                if($str[4]=='key'&&$str[5]=="'PRIMARY'")
                                        return 422;
                                else
                                        return 500;
                        }
                }
        }else{
                return 400;
        }
        
        return 401;
}
function updateid($alldata) {
        global $conn;
        $oldid = mysqli_real_escape_string($conn,@$alldata['oldid']);
        $newid = mysqli_real_escape_string($conn,@$alldata['newid']);
        // echo $function_tool;
        // print_r($alldata);
        if ($oldid) {
                $sql = "select id from midcase where id='$oldid';";
                $result = mysqli_query($conn,$sql);
                $num = $result->num_rows;
                if($num==0){
                    return 402;
                }
                $sql = "update midcase set id = '$newid' where id='$oldid';";
                $sql .= "update midcasehistory set caseid = '$newid' where caseid='$oldid';";
                $sql .= "update data set caseid = '$newid' where caseid='$oldid';";
                // echo $sql;
                if(mysqli_multi_query($conn,$sql))
                        return 200;
        }
        return 400;
}
function remark($caseid,$remarks,$serialid) {
        global $conn;
        $caseid = mysqli_real_escape_string($conn,$caseid);
        $remarks = mysqli_real_escape_string($conn,$remarks);
        $serialid = mysqli_real_escape_stri+ng($conn,$serialid);
        $sql = "update midcasehistory set remarks = '$remarks' where caseid='$caseid' and serialid='$serialid'";
        if(mysqli_query($conn,$sql)){
                return 200;
        }else{
                return 500;
        }
        // return json_encode($table, JSON_FORCE_OBJECT);
}
function getdetailbyid($caseid,$serialid){
        global $conn;
        $caseid = mysqli_real_escape_string($conn,$caseid);
        $serialid = mysqli_real_escape_string($conn,$serialid);
        $sql = "select * from midcasehistory where caseid='$caseid' and serialid='$serialid'";
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        $finaltable = array();
        array_push($finaltable, $table[count($table)-1]);
        return $finaltable;
}
function getupdatedetailbyid($caseid){
        global $conn;
        $caseid = mysqli_real_escape_string($conn,$caseid);
        $sql = "select * from midcasehistory where caseid='$caseid'";
        // echo $sql;
        $result = mysqli_query($conn,$sql);
        $table = array();
        // 將搜尋到的資料一筆一筆放進陣列再轉json
        while($rs = mysqli_fetch_assoc($result)){
                array_push($table,$rs);
        }
        $finaltable = array();
        array_push($finaltable, $table[count($table)-1]);
        return $finaltable;
}
function DataTablegetMidCaseListbydate($requestData) {
        global $conn;
        $tablename='midcasehistory';

        /*** 本方法在有資料庫權限下可使用***/
        // $columns = array();
        //取欄位名稱
        // $sql = "SELECT COLUMN_NAME,ORDINAL_POSITION,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '".$tablename."'";
        // $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        // while($row = mysqli_fetch_array($query)){
        //     if($row[0]!="day")
        //     $columns[] =$row[0];
        // }
        /***********************************/
        /*** 本方法在無資料庫權限使用***/
        $columns=array( "caseid", "date", "name", "sex", "birthday", "physical_tool", "physical_result", "physical_number", "physical_pr", "physical_remarks", "function_tool", "function_result", "function_number", "function_pr", "function_remarks", "oral_comprehension_tool", "oral_comprehension_result", "oral_comprehension_ability", "oral_expression_tool", "oral_expression_result", "oral_expression_ability", "oral_remarks", "psychotherapy_tool", "psychotherapy_result", "psychotherapy_iq", "psychotherapy_pr", "psychotherapy_remarks", "datafrom", "remarks", "serialid"
        );
        /***********************************/
        $sql = "SELECT * ";
        $sql.=" FROM ".$tablename."";
        $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        $totalData = mysqli_num_rows($query);
        $totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.

        //預設搜尋
        $sql = "SELECT ".$columns[0];
        for ($i=1; $i <count($columns); $i++) { 
            $sql.=", ".$columns[$i];
        }
        $sql.=" FROM ".$tablename." WHERE 1=1 ";
        $startday = $requestData['data'][1]['startday'];
        $endday = $requestData['data'][1]['endday'];
                if(!empty($startday)&&empty($endday)){
                       $sql .= "and date >= '$startday' ";
                }else if(empty($startday)&&!empty($endday)){
                       $sql .= "and date <= '$endday' ";
                }else if(!empty($startday)&&!empty($endday)){
                       $sql .= "and date >= '$startday' and date <= '$endday'";
                }else{
                }

        //搜尋框
        if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
            $sql.=" AND ( ".$columns[0]." LIKE '%".$requestData['search']['value']."%' ";
            for ($i=1; $i <count($columns)-1; $i++) { 
                $sql.=" OR ".$columns[$i]." LIKE '%".$requestData['search']['value']."%' ";
            }
            $sql.=" OR ".$columns[$i]." LIKE '%".$requestData['search']['value']."%' )";
        }
        //單列搜尋
        if(!empty($requestData['columns'][1]['search']['value']) )
                $sql.=" AND ".$columns[0]." = '".$requestData['columns'][1]['search']['value']."' ";
        for ($i=1; $i <count($columns) ; $i++) { 
            if( isset($requestData['columns'][$i+1]['search']['value']) ){   //name
                $sql.=" AND ".$columns[$i]." LIKE '%".$requestData['columns'][$i+1]['search']['value']."%' ";
            }
        }
        // print_r($requestData);
        // echo $sql;
        $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        $totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result.

        if($requestData['length']!=-1)
            if($requestData['order'][0]['column']==0)
                $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
            else{
                $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']-1]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
            }
        else
            $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']-1]."   ".$requestData['order'][0]['dir'];
        // echo $sql;
        $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        mysqli_close($conn);
        $data = array();
        while( $row=mysqli_fetch_array($query) ) {  // preparing an array
            $nestedData=array(); 
            for ($i=0; $i <count($columns); $i++) { 
                $nestedData[] = $row[$columns[$i]];
            }
            $data[] = $nestedData;
        }
        $json_data = array(
                    "draw"            => intval( $requestData['draw'] ),

                    "recordsTotal"    => intval( $totalData ),  // total number of records
                    "recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
                    "data"            => $data   // total data array
                    );
        return $json_data;
}
function DataTablegetMidCaseHistoryListbydate($requestData) {
        global $conn;
        $tablename='midcasehistory';

        /*** 本方法在有資料庫權限下可使用***/
        // $columns = array();
        //取欄位名稱
        // $sql = "SELECT COLUMN_NAME,ORDINAL_POSITION,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '".$tablename."'";
        // $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        // while($row = mysqli_fetch_array($query)){
        //     if($row[0]!="day")
        //     $columns[] =$row[0];
        // }
        /***********************************/
        /*** 本方法在無資料庫權限使用***/
         $columns=array( "caseid", "date", "name", "sex", "birthday", "physical_tool", "physical_result", "physical_number", "physical_pr", "physical_remarks", "function_tool", "function_result", "function_number", "function_pr", "function_remarks", "oral_comprehension_tool", "oral_comprehension_result", "oral_comprehension_ability", "oral_expression_tool", "oral_expression_result", "oral_expression_ability", "oral_remarks", "psychotherapy_tool", "psychotherapy_result", "psychotherapy_iq", "psychotherapy_pr", "psychotherapy_remarks", "datafrom", "remarks", "serialid"
        );
        /***********************************/
        $sql = "SELECT * ";
        $sql.=" FROM ".$tablename."";
        $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        $totalData = mysqli_num_rows($query);
        $totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.

        //預設搜尋
        $sql = "SELECT ".$columns[0];
        for ($i=1; $i <count($columns); $i++) { 
            $sql.=", ".$columns[$i];
        }
        $sql.=" FROM ".$tablename." WHERE 1=1 ";
        $caseid = $requestData['data'][1]['caseid'];
        $sql .= "and caseid = '$caseid' ";

        //搜尋框
        if( !empty($requestData['search']['value']) ) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
            $sql.=" AND ( ".$columns[0]." LIKE '%".$requestData['search']['value']."%' ";
            for ($i=1; $i <count($columns)-1; $i++) { 
                $sql.=" OR ".$columns[$i]." LIKE '%".$requestData['search']['value']."%' ";
            }
            $sql.=" OR ".$columns[$i]." LIKE '%".$requestData['search']['value']."%' )";
        }
        //單列搜尋
        if(!empty($requestData['columns'][1]['search']['value']) )
                $sql.=" AND ".$columns[0]." = '".$requestData['columns'][1]['search']['value']."' ";
        for ($i=1; $i <count($columns) ; $i++) { 
            if( isset($requestData['columns'][$i+1]['search']['value']) ){   //name
                $sql.=" AND ".$columns[$i]." LIKE '%".$requestData['columns'][$i+1]['search']['value']."%' ";
            }
        }
        // print_r($requestData);
        // echo $sql;
        $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        $totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result.

        if($requestData['length']!=-1)
            if($requestData['order'][0]['column']==0)
                $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
            else{
                $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']-1]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
            }
        else
            $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']-1]."   ".$requestData['order'][0]['dir'];
        // echo $sql;
        $query=mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
        mysqli_close($conn);
        $data = array();
        while( $row=mysqli_fetch_array($query) ) {  // preparing an array
            $nestedData=array(); 
            for ($i=0; $i <count($columns); $i++) { 
                $nestedData[] = $row[$columns[$i]];
            }
            $data[] = $nestedData;
        }
        $json_data = array(
                    "draw"            => intval( $requestData['draw'] ),

                    "recordsTotal"    => intval( $totalData ),  // total number of records
                    "recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
                    "data"            => $data   // total data array
                    );
        return $json_data;
}
?>
