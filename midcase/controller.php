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
require("midcase.php");
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
        case "addCase":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(addCase($alldata)));
                break;
        case "addCaseHistory":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(addCaseHistory($alldata)));
                break;
        case "deleteCase":
                $alldata = @$data[1];
                echo 1232323;
                echo (makeReturnMessage(deleteCase($alldata)));
                break;
        case "deleteCaseHistory":
                $alldata = @$data[1];
                echo (makeReturnMessage(deleteCaseHistory($alldata)));
                break;
        case "updateCase":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(updateCase($alldata)));
                break;
        case "updateid":
                $table=array();
                $alldata = @$data[1];
                echo (makeReturnMessage(updateid($alldata)));
                break;
        case "showQuestionList":
                if (getQuestionList()) {
                        $table=getQuestionList();
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "showMidCaseHistory":
                $alldata = @$data[1];
                if (showMidCaseHistory($alldata)) {
                        $table=showMidCaseHistory($alldata);
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
		case "remark":
                $caseid = @$data[1]["caseid"];
                $remarks = @$data[1]["remarks"];
                $serialid = @$data[1]["serialid"];
                $status = remark($caseid,$remarks,$serialid);
                $table=array();
                array_unshift($table,array('status' => $status));
                echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                break;
        case "getdetailbyid":
                $caseid = @$data[1]["caseid"];
                $serialid = @$data[1]["serialid"];
                if ($table=getdetailbyid($caseid,$serialid)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "getupdatedetailbyid":
                $caseid = @$data[1]["caseid"];
                if ($table=getupdatedetailbyid($caseid)) {
                        array_unshift($table,array('status' => 200));
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                } else {
                        $table=['status' => 400];
                        echo json_encode($table, JSON_UNESCAPED_UNICODE,JSON_FORCE_OBJECT);
                }
                break;
        case "DataTablegetMidCaseListbydate":
                if ($table=DataTablegetMidCaseListbydate($requestData)) {
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
        case "DataTablegetMidCaseHistoryListbydate":
                if ($table=DataTablegetMidCaseHistoryListbydate($requestData)) {
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
