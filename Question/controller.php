<?php
 // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
//data table做表格的ajax處理
$requestData= $_REQUEST;
// print_r($requestData);
require("Question.php");
if(!($json=file_get_contents("php://input")) && !isset($_GET["act"])) {
        exit(0);
}
//將json解開
$data=json_decode($json,true);
//如果有的話就是post傳json 沒有就是get
if(file_get_contents("php://input")){
        $act =$data[0]["act"];
        if(@$requestData['data']){
            $data=$requestData['data'];
            // print_r($data);
            $act=$requestData['data'][0]['act'];
        }
}
else{
        $act=$_GET["act"];
}
//wrong拿來看一口氣處理大量資料有沒有錯 >0就是有錯
$wrong=0;
function makeReturnMessage($messageCode){
    $table=array();
    array_unshift($table,array('status' => $messageCode));
    if($messageCode==422)
        array_push($table, array('reason'=>"SQL錯誤"));
    return json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
}
function makeErrorReturnMessage(){
    $table=array();
    array_unshift($table,array('status' => "402"));
    return json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
}
switch($act) {
        case "addQuestion":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(addQuestion($alldata)));
                break;
        case "updateQuestion":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(updateQuestion($alldata)));
                break;
        case "getQuestionDetail":
                $table=array();
                $id = @$data[1]['id'];
                if ($table=getQuestionDetail($id)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 500];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "testadd":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(testadd($alldata)));
                break;
        case "deleteData":
                $alldata = @$data[1];
                echo (makeReturnMessage(deleteData($alldata)));
                break;
        case "getQuestionList":
                if ($table=getQuestionList()) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 500];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getQuestionListbydate":
                $startday = @$_GET["startday"];
                $endday = @$_GET["endday"];
                if ($table=getQuestionListbydate($startday,$endday)) {
                        if($table==500){
                                $table=array();
                                array_unshift($table,array('status' => 500));
                                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }else{
                                array_unshift($table,array('status' => 200));
                                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }
                } else {
                        if(count($table)==0){
                                array_unshift($table,array('status' => 204));
                                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }else{
                                $table=['status' => 500];
                                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }
                }
                break;
        case "getMidCaseData":
                $startday = @$_GET["startday"];
                $endday = @$_GET["endday"];
                $caseid = @$_GET["caseid"];
                if ($table=getMidCaseData($startday,$endday,$caseid)) {
                            array_unshift($table,array('status' => 200));
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        if(count($table)==0){
                            array_unshift($table,array('status' => 204));
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }else{
                            $table=['status' => 500];
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }
                }
                break;
        case "getMidCaseList":
                if ($table=getMidCaseList()) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 500];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getMidCaseListbydate":
                $startday = @$_GET["startday"];
                $endday = @$_GET["endday"];
                if ($table=getMidCaseListbydate($startday,$endday)) {
                            array_unshift($table,array('status' => 200));
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        if(count($table)==0){
                            array_unshift($table,array('status' => 204));
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }else{
                            $table=['status' => 500];
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                        }
                }
                break;
        case "DataTablegetDataListbydate":
                if ($table=DataTablegetDataListbydate($requestData)) {
                    if(count($table['data'])==0){
                            array_unshift($table,array('status' => 204));
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                    }else{
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                    }
                } else {
                        $table=['status' => 500];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "DataTablegetMidCaseDataListbydate":
                if ($table=DataTablegetMidCaseDataListbydate($requestData)) {
                    if(count($table['data'])==0){
                            array_unshift($table,array('status' => 204));
                            echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                    }else{
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                    }
                } else {
                        $table=['status' => 500];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        default:
}
?>
