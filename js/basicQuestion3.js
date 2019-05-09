// text
Vue.component('input-text',{
    props:['title','value'],
    template:'<div><h4>{{title}}</h4><input type="text" class="form-control" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" required=""></div>',
})
//select
Vue.component('input-select',{
    props:['title','value','options','unit'],
    template:'<div><h4>{{title}}</h4><select v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" class="custom-select d-block w-100" required=""><option v-for="option in options" :value="option">{{option}}</option></select></div>',
})
// other_value
Vue.component('input-other',{
    props:['title','value'],
    template:'<div><h4>請詳細填寫{{title}}</h4><input type="text" class="form-control" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" required=""></div>',
})
var form = new Vue({
    el:'#form',
    data:{
        // 用來輔助是否需顯示checkbox必填文字
        remind:0,
        part1:{
            questions:[
                {
                    name:'caseid',
                    type: 'text',
                    title: '病歷號碼',
                    value: '',
                    class:'col-md-6 mb-6',
                }
            ],
        },
        part2:{
            head:'二、自小養育狀況',
            questions:[
                {
                    name:'height',
                    type: 'text',
                    title: '目前身高',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'weight',
                    type: 'text',
                    title: '體重',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'head_circumference',
                    type: 'text',
                    title: '頭圍',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'caregiver',
                    type: 'select',
                    title: '目前主要照顧者',
                    options: ['爸爸', '媽媽', '爺爺', '奶奶', '姑姑', '叔叔', '阿姨', '外公', '外婆', '保母', '寄養媽媽', '其他'],
                    value: '',
                    other_value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'who_found_question',
                    type: 'radio',
                    title: '誰發現問題',
                    options: ['家長', '親友', '教育單位', '醫療單位', '社政單位', '其他'],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
            ],
        },
        part3:{
            head:'三、就學歷史',
            questions:[
                {
                    name:'history',
                    type: 'radio',
                    title: '是否就學',
                    options: ['是', '否', '就學過，但中斷'],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'stop_study_reason',
                    type: 'disabled',
                    title: '中斷原因',
                    options: ['搬家', '適應不良', '因鑑定安置轉學', '其他'],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'study_time_year',
                    title: '就學多久-年',
                    type: 'disabled',
                    options: getSelectNum(0,7,'年'),
                    value: '0年',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'study_time_month',
                    title: '就學多久-月',
                    type: 'disabled',
                    options: getSelectNum(0,11,'個月'),
                    value: '0個月',
                    class:'col-md-6 mb-6',
                },
            ],
        },
        part4:{
            head:'四、家長主要在意問題:(必選，可複選)',
            questions:[
                {
                    name:'question_language',
                    title:'A.語言',
                    type: 'checkbox',
                    options:['無', '說話慢、表達差', '發音不清楚', '聽不懂，常答非所問', '口吃', '流口水', '吃東西會嗆咳'],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_action',
                    title:'B.動作',
                    type:'checkbox',
                    options:['無', '大動作發展慢', '動作不靈活、平衡問題', '動作慢吞吞', '走路姿勢與一般孩子不同', '局部肢體問題', '抓東西不穩、握筆姿勢、不太會使用工具'],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_learn',
                    title:'C.學習',
                    type:'checkbox',
                    options:['無', '跟不上同儕', '學習動機低落', '不喜歡上學',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_relationship',
                    title:'D.人際',
                    type:'checkbox',
                    options:['無', '不太理熟悉的人', '怕陌生人', '手足關係問題', '不易和同儕建立關係', '易和同儕起衝突', '不守團體規則', '有攻擊性行為','不守家長規則(反抗家長)','退縮'],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_mood',
                    title:'E.情緒',
                    type:'checkbox',
                    options:['無', '易恐懼', '易焦慮', '易怒', '愛哭', '易興奮', '情緒不易平復',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_attention',
                    title:'F.活動與注意力',
                    type:'checkbox',
                    options:['無', '過於好動', '易分心',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_perception',
                    title:'G.感官知覺',
                    type:'checkbox',
                    options:['無', '聽力問題', '斜視', '斜視', '弱視', '遠視', '近視', '缺乏反應', '過度敏感',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_lifestyle',
                    title:'H.生活作息',
                    type:'checkbox',
                    options:['無', '大小便問題', '睡眠問題', '飲食問題',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_selfmutilation',
                    title:'I.自傷行為',
                    type:'checkbox',
                    options:['無', '有',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'question_helpkid',
                    title:'J.不知如何教導或幫助小孩',
                    type:'checkbox',
                    options:['無', '是',],
                    value:[],
                    class:'col-md-12 mb-12'
                },
            ]
        },
        part5:{
            head:'五.就診目的:(複選)',
            questions:[
                {
                    name:'target',
                    type: 'checkbox',
                    options:['確定目前能力', '確定診斷病因', '申請手冊', '入學前鑑定', '學校建議', '追蹤複評'],
                    value:[],
                    class:'col-md-12 mb-12'
                },
            ]
        },
        part6:{
            head:'六.家庭狀況',
            questions:[
                {
                    name:'family_married',
                    type: 'radio',
                    title: '親生父母婚姻狀況:(單選)',
                    options: ['結婚同居', '結婚分居', '未婚同居', '未婚分居', '離婚', '喪偶', ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_old_brother',
                    type: 'select',
                    title: '手足人數-兄',
                    options: getSelectNum(0,12,'人'),
                    value: '',
                    other_value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_young_brother',
                    type: 'select',
                    title: '手足人數-弟',
                    options: getSelectNum(0,12,'人'),
                    value: '',
                    other_value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_old_sister',
                    type: 'select',
                    title: '手足人數-姐',
                    options: getSelectNum(0,12,'人'),
                    value: '',
                    other_value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_young_sister',
                    type: 'select',
                    title: '手足人數-妹',
                    options: getSelectNum(0,12,'人'),
                    value: '',
                    other_value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_family',
                    type: 'radio',
                    title: '5.目前居住家庭型態',
                    options: ['小家庭', '單親家庭', '寄養家庭', '大家庭', ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_fname',
                    type: 'text',
                    title: '父親-姓名',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_fbirthday',
                    type: 'text',
                    title: '父親-出生年月日',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_feducation',
                    type: 'radio',
                    title: '父親-教育程度',
                    options: ['未受教育', '小學', '初中', '專科', '高中', '大學', '碩士', '博士', ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_fcareer',
                    type: 'select',
                    title: '父親-職業',
                    options: [
                        '1礦業/砂石業 ',
                        '2製造業 ',
                        '3水電燃氣業 ',
                        '4營造業 ',
                        '5批發/零售 ',
                        '6住宿/餐飲 ',
                        '7運輸/倉儲/通信 ',
                        '8金融/保險 ',
                        '9不動產/租賃 ',
                        '10軍/警/消 ',
                        '11公教人員 ',
                        '12專業技術服務 ',
                        '13醫療服務 ',
                        '14休閒服務 ',
                        '15其它/家管 ',
                        '16學生 ',
                        '17教育機構 ',
                        '18農林漁牧業 ',
                        '19律師、會計師、記帳士、公證人或代書 ',
                        '20宗教/慈善/公益團體、基金會 ',
                        '21投資(顧問)公司 ',
                        '22銀樓、珠寶商、藝術品或古董買賣/拍賣商 ',
                        '23大宗物資交易商(如：穀物、油品或煤礦等) ',
                        '24當鋪、貨幣兌換商、虛擬貨幣商、金流(如：西聯匯款、第三方支付)或地下資金融通業者 ',
                        '25賭場或博弈業(網路/實體) ',
                        '26八大特種行業 ',
                        '27國防工業',
                        '其他',
                    ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_fcountry',
                    type: 'radio',
                    title: '父親-國籍',
                    options: ['本國籍原住民', '本國籍非原住民', '其他',],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_mname',
                    type: 'text',
                    title: '母親-姓名',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_mbirthday',
                    type: 'text',
                    title: '母親-出生年月日',
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'family_meducation',
                    type: 'radio',
                    title: '母親-教育程度',
                    options: ['未受教育', '小學', '初中', '專科', '高中', '大學', '碩士', '博士', ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_mcareer',
                    type: 'select',
                    title: '母親-職業',
                    options: [
                        '1礦業/砂石業 ',
                        '2製造業 ',
                        '3水電燃氣業 ',
                        '4營造業 ',
                        '5批發/零售 ',
                        '6住宿/餐飲 ',
                        '7運輸/倉儲/通信 ',
                        '8金融/保險 ',
                        '9不動產/租賃 ',
                        '10軍/警/消 ',
                        '11公教人員 ',
                        '12專業技術服務 ',
                        '13醫療服務 ',
                        '14休閒服務 ',
                        '15其它/家管 ',
                        '16學生 ',
                        '17教育機構 ',
                        '18農林漁牧業 ',
                        '19律師、會計師、記帳士、公證人或代書 ',
                        '20宗教/慈善/公益團體、基金會 ',
                        '21投資(顧問)公司 ',
                        '22銀樓、珠寶商、藝術品或古董買賣/拍賣商 ',
                        '23大宗物資交易商(如：穀物、油品或煤礦等) ',
                        '24當鋪、貨幣兌換商、虛擬貨幣商、金流(如：西聯匯款、第三方支付)或地下資金融通業者 ',
                        '25賭場或博弈業(網路/實體) ',
                        '26八大特種行業 ',
                        '27國防工業',
                        '其他',
                    ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'family_mcountry',
                    type: 'radio',
                    title: '母親-國籍',
                    options: ['本國籍原住民', '本國籍非原住民', '其他',],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
            ],
        },
        part7:{
            head:'七、療育情形',
            questions:[
                {
                    name:'treat_years',
                    title: '開始療育年齡-歲數',
                    type: 'select',
                    options: getSelectNum(0,6,'歲'),
                    value: '',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'treat_months',
                    title: '開始療育年齡-月數',
                    type: 'disabled',
                    options: getSelectNum(0,11,'個月'),
                    value: '2個月',
                    class:'col-md-6 mb-6',
                },
                {
                    name:'treat_status',
                    type: 'radio',
                    title: '療育現況',
                    options: ['未曾療育過', '療育過但中斷', '療育持續中', ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'phy_heal_keep_time',
                    title: '物理治療持續時間',
                    type: 'disabled',
                    options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'fun_heal_keep_time',
                    title: '職能治療持續時間',
                    type: 'disabled',
                    options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'language_heal_keep_time',
                    title: '語言治療持續時間',
                    type: 'disabled',
                    options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'treat_type',
                    title:'曾接受的療育種類',
                    type:'disabled',
                    options:['物理治療', '職能治療', '語言治療', '認知訓練', '機構早療課程', '心理治療', '藝術治療', '音樂治療', '馬術治療', '其他'],
                    value:[],
                    class:'col-md-12 mb-12'
                },
                {
                    name:'treat_location',
                    title:'目前療育(上課)地點',
                    type:'disabled',
                    options:['亞東醫院', '其他醫院', '復健診所', '日托班', '到宅服務', '其他', ],
                    value:[],
                    class:'col-md-12 mb-12'
                },
            ],
        },
        part8:{
            head:'八、發展及疾病史',
            questions:[
                {
                    name:'history_family',
                    title: '家族史',
                    type: 'checkbox',
                    options: ['無',
                        '有',
                        '智能障礙',
                        '自閉症',
                        '注意力不足過動症',
                        '聽障',
                        '構音異常',
                        '口吃',
                        '精神病',
                        '染色體異常',
                        '癲癇',
                        '學習困難',
                        '講話慢',
                        '異位性皮膚炎',
                        '過敏性鼻炎',
                        '氣喘',
                    ],
                    value: [],
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_disease',
                    title: '生理疾病',
                    type: 'checkbox',
                    options: [
                        '無',
                        '感染',
                        '蛋白尿',
                        '癲癇',
                        '高血壓',
                        '水腫',
                        '糖尿病',
                        '甲狀腺疾病',
                        '其他內分泌疾病',
                        '其他',
                    ],
                    value: [],
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_medication',
                    type: 'select',
                    title: '母親孕期用藥狀況',
                    options: [
                        '無',
                        '精神科用藥',
                        '神經科用藥',
                        '內分泌用藥',
                        '心血管用藥',
                        '其他',
                    ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_abuse',
                    type: 'select',
                    title: '母親物質濫用狀況',
                    options: [
                        '無',
                        '酒精',
                        '抽菸',
                        '毒品',
                        '其他',
                    ],
                    value: '',
                    other_value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_pregcount',
                    type: 'select',
                    title: '懷孕次數',
                    options: getSelectNum(1,10),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_birthcount',
                    type: 'select',
                    title: '活產次數',
                    options: getSelectNum(1,10),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_abortion',
                    title: '流產',
                    type: 'radio',
                    options: [
                        '無',
                        '自然流產',
                        '人工流產',
                    ],
                    value: [],
                    class:'col-md-12 mb-12',
                },
                {
                    name:'history_pregprocess',
                    title: '產程',
                    type: 'checkbox',
                    options: [
                        '自然產',
                        '緊急剖腹',
                        '預期剖腹',
                        '真空吸引',
                        '生產時窒息',
                        '胎兒窘迫症',
                        '胎兒急救',
                        '出生時臍帶繞頸',
                    ],
                    value: [],
                    class:'col-md-12 mb-12',
                },
                {
                    name:'neonatal_hp_check',
                    title: '新生兒篩檢-血片檢查',
                    type: 'radio',
                    options: [
                        '正常',
                        '異常',
                    ],
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'neonatal_hear_check',
                    title: '新生兒篩檢-聽力檢查',
                    type: 'radio',
                    options: [
                        '正常',
                        '異常',
                    ],
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_neonatal',
                    title: '新生期及幼兒期生理異常',
                    type: 'checkbox',
                    options: [
                        '無',
                        '曾住過加護病房',
                        '顱內出血',
                        '呼吸暫停',
                        '吸吮不佳',
                        '插鼻胃管',
                        '曾禁食',
                        '保溫箱',
                        '曾手術',
                        '抽筋',
                        '感染',
                        '黃膽',
                        '換血',
                    ],
                    value: [],
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_disease',
                    title: '疾病史',
                    type: 'checkbox',
                    options: [
                        '無',
                        '癲癇',
                        '腦部外傷',
                        '其他疾病',
                        '先天性心臟病',
                        '早產兒',
                        '白質軟化',
                        '慢性呼吸疾病',
                        '妥瑞症',
                        '異位性皮膚炎',
                        '過敏性鼻炎',
                        '氣喘',
                    ],
                    value: [],
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_neck',
                    title: '頸部控制',
                    type: 'select',
                    options: getSelectNum(0,36,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_flip',
                    title: '翻身',
                    type: 'select',
                    options: getSelectNum(0,36,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_sit',
                    title: '坐',
                    type: 'select',
                    options: getSelectNum(0,36,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_crab',
                    title: '爬',
                    type: 'select',
                    options: getSelectNum(0,36,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_walk',
                    title: '走',
                    type: 'select',
                    options: getSelectNum(0,48,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_get',
                    title: '伸手抓物',
                    type: 'select',
                    options: getSelectNum(0,24,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_draw',
                    title: '塗鴉',
                    type: 'select',
                    options: getSelectNum(0,48,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
                {
                    name:'abnormal_develop_first_word',
                    title: '第一個有意義單字',
                    type: 'select',
                    options: getSelectNum(0,48,'個月',true),
                    value: '',
                    class:'col-md-12 mb-12',
                },
            ],
        }
    },
    computed: {
        isForest: function() {
            if(this.part2.questions[3].value == '寄養媽媽'){
                for(i in this.part6.questions){
                    if(i == 5)
                        continue;
                    this.part6.questions[i].type = 'disabled';
                    this.part6.questions[i].value = '';
                }
            }
            return;
        },
        everSchool: function() {
            if(this.part3.questions[0].value === '是'){
                this.part3.questions[2].type='select';
                this.part3.questions[3].type='select';
            }
            if(this.part3.questions[0].value === '就學過，但中斷'){
                this.part3.questions[1].type='radio';
                this.part3.questions[2].type='select';
                this.part3.questions[3].type='select';
            }
            if(this.part3.questions[0].value === '否'){
                this.part3.questions[1].type='disabled';
                this.part3.questions[2].type='disabled';
                this.part3.questions[3].type='disabled';
            }
            return;
        },
        ageUnder1: function() {
            if(this.part7.questions[0].value == '0歲'){
                this.part7.questions[1].type = 'select';
            }else{
                this.part7.questions[1].type = 'disabled';
            }
            return;
        },
        healStatus:function(){
            switch(this.part7.questions[2].value)
            {
            case '療育過但中斷':
                this.part7.questions[3].type = 'select';
                this.part7.questions[4].type = 'select';
                this.part7.questions[5].type = 'select';
                this.part7.questions[6].type = 'checkbox';
                this.part7.questions[7].type = 'disabled';
              break;
            case '療育持續中':
                this.part7.questions[3].type = 'disabled';
                this.part7.questions[4].type = 'disabled';
                this.part7.questions[5].type = 'disabled';
                this.part7.questions[6].type = 'checkbox';
                this.part7.questions[7].type = 'checkbox';
              break;
            default:
                this.part7.questions[3].type = 'disabled';
                this.part7.questions[4].type = 'disabled';
                this.part7.questions[5].type = 'disabled';
                this.part7.questions[6].type = 'disabled';
                this.part7.questions[7].type = 'disabled';
            }
            return;
        },
        healPlace:function(){
            heal_places = this.part7.questions[7].value;
            this.part7.questions.splice(8,this.part7.questions.length);
            console.log(this.part7.questions);
            for(i in heal_places){
                const names = ['物理治療每周幾次','職能治療每周幾次','語言治療每周幾次'];
                const input_names = ['phy_heal_hz','fun_heal_hz','language_heal_hz'];
                const input_time_names = ['phy_heal_time','fun_heal_time','language_heal_time'];
                for(index in names){
                    let detail = 
                    {
                        name:input_names[index],
                        title:heal_places[i]+names[index],
                        type:'text',
                        value:[],
                        class:'col-md-6 mb-6'
                    }
                    this.part7.questions.push(detail);
                    let time = 
                    {
                        name:input_time_names[index],
                        title:'共幾分鐘，以半小時為單位',
                        type:'text',
                        value:[],
                        class:'col-md-6 mb-6'
                    }
                    this.part7.questions.push(time);
                }
            }
        }
    },
    methods:{
        sendData:function(){
            let send_data = {};
            for(qindex in form._data){
                data = form._data[qindex];
                for(index in data.questions){
                    question = data.questions[index];
                    if(question.type != 'disabled'){
                        // console.log(typeof(question.value));
                        if(typeof(question.value)=='object'){
                            // 多選至少要有一個選項
                            if(question.value.length==0){
                                this.remind = 1;
                                that = this;
                                setTimeout(function(){that.$refs.content[0].focus();}, 50);
                                return;
                            }
                        }
                        if(question.other_value)
                            send_data[question.name] = question.value.toString() + question.other_value;
                        else
                            send_data[question.name] = question.value.toString();
                    }
                }
            }
            console.log(send_data);
            axios.post('../../Question/Controller.php', [{act:'test'},send_data])
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        checkOption: function(event, $index, question) {
            option_value = event.target.value;
            option_status = event.target.checked;
            if (option_value === '無' && option_status === true) {
                question.value = ['無'];
                question.disabled = true;
            } else if (option_value === '無' && option_status === false) {
                question.disabled = false;
            }
        }
    },
});
function getSelectNum(from,end,unit='',unknown=''){
    result = [];
    for(i = from; i <= end; i++){
        result.push(i+unit);
    }
    if(unknown)
        result.push('不清楚');
    return result;
}

// 自動填入資料
for(qindex in form._data){
    data = form._data[qindex];
    for(index in data.questions){
        question = data.questions[index];
        switch(question.type)
        {
            case 'text':
                question.value = 1;
                break;
            case 'select':
                question.value = question.options[0];
                break;
            case 'radio':
                question.value = question.options[0];
                break;
            // case 'checkbox':
            //     question.value = question.options[0];
            //     break;
        }
    }
}