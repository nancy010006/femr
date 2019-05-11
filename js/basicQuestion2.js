// text
Vue.component('input-text',{
    props:['title','value'],
    template:'<div><label>{{title}}</label><input type="text" class="form-control" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" required=""></div>',
})
//select
Vue.component('input-select',{
    props:['title','value','options','unit'],
    template:'<div><label>{{title}}</label><select v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" class="custom-select d-block w-100" required=""><option v-for="option in options" :value="option">{{option}}</option></select></div>',
})
// other_value
Vue.component('input-other',{
    props:['title','value'],
    template:'<div><label>請詳細填寫{{title}}</label><input type="text" class="form-control" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" required=""></div>',
})
var question_2 = new Vue({
    el:'#question_2',
    data:{
        head:'二、自小養育狀況',
        questions:[
            {
                type: 'text',
                title: '目前身高',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'text',
                title: '體重',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'text',
                title: '頭圍',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'select',
                title: '目前主要照顧者',
                options: ['', '爸爸', '媽媽', '爺爺', '奶奶', '姑姑', '叔叔', '阿姨', '外公', '外婆', '保母', '寄養媽媽', '其他'],
                value: '',
                other_value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'radio',
                title: '誰發現問題',
                options: ['家長', '親友', '教育單位', '醫療單位', '社政單位', '其他'],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
        ],
    }
});
var question_3 = new Vue({
    el:'#question_3',
    data:{
        head:'三、就學歷史',
        questions:[
            {
                type: 'radio',
                title: '是否就學',
                options: ['是', '否', '就學過，但中斷'],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
                type: 'disabled',
                title: '中斷原因',
                options: ['搬家', '適應不良', '因鑑定安置轉學', '其他'],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
                title: '就學多久-年',
                type: 'disabled',
                options: getSelectNum(0,7,'年'),
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                title: '就學多久-月',
                type: 'disabled',
                options: getSelectNum(0,11,'個月'),
                value: '',
                class:'col-md-6 mb-6',
            },
        ],
    },
    computed: {
        everSchool: function() {
            if(this.questions[0].value === '是'){
                this.questions[2].type='select';
                this.questions[3].type='select';
            }
            if(this.questions[0].value === '就學過，但中斷'){
                this.questions[1].type='radio';
                this.questions[2].type='select';
                this.questions[3].type='select';
            }
            if(this.questions[0].value === '否'){
                this.questions[1].type='disabled';
                this.questions[2].type='disabled';
                this.questions[3].type='disabled';
            }
            return;
        }
    },
});

var question_4 = new Vue({
    el:'#question_4',
    data:{
        head:'四、家長主要在意問題:(必選，可複選)',
        questions:[
            {
                title:'A.語言',
                type: 'checkbox',
                options:['無', '說話慢、表達差', '發音不清楚', '聽不懂，常答非所問', '口吃', '流口水', '吃東西會嗆咳'],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'B.動作',
                type:'checkbox',
                options:['無', '大動作發展慢', '動作不靈活、平衡問題', '動作慢吞吞', '走路姿勢與一般孩子不同', '局部肢體問題', '抓東西不穩、握筆姿勢、不太會使用工具'],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'C.學習',
                type:'checkbox',
                options:['無', '跟不上同儕', '學習動機低落', '不喜歡上學',],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'D.人際',
                type:'checkbox',
                options:['無', '不太理熟悉的人', '怕陌生人', '手足關係問題', '不易和同儕建立關係', '易和同儕起衝突', '不守團體規則', '有攻擊性行為','不守家長規則(反抗家長)','退縮'],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'E.情緒',
                type:'checkbox',
                options:['無', '易恐懼', '易焦慮', '易怒', '愛哭', '易興奮', '情緒不易平復',],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'F.活動與注意力',
                type:'checkbox',
                options:['無', '過於好動', '易分心',],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'G.感官知覺',
                type:'checkbox',
                options:['無', '聽力問題', '斜視', '斜視', '弱視', '遠視', '近視', '缺乏反應', '過度敏感',],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'H.生活作息',
                type:'checkbox',
                options:['無', '大小便問題', '睡眠問題', '飲食問題',],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'I.自傷行為',
                type:'checkbox',
                options:['無', '有',],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'J.不知如何教導或幫助小孩',
                type:'checkbox',
                options:['無', '是',],
                value:[],
                class:'col-md-12 mb-12'
            },
        ]
    },
    methods: {
        checkOption: function(event, $index) {
            option_value = event.target.value;
            option_status = event.target.checked;
            if (option_value === '無' && option_status === true) {
                this.questions[$index].value = ['無'];
                this.questions[$index].disabled = true;
            } else if (option_value === '無' && option_status === false) {
                this.questions[$index].disabled = false;
            }
        }
    }
});

var question_5 = new Vue({
    el:'#question_5',
    data:{
        head:'五.就診目的:(複選)',
        questions:[
            {
                type: 'checkbox',
                options:['確定目前能力', '確定診斷病因', '申請手冊', '入學前鑑定', '學校建議', '追蹤複評'],
                value:[],
                class:'col-md-12 mb-12'
            },
        ]
    },
    methods: {
        checkOption: function(event, $index) {
            option_value = event.target.value;
            option_status = event.target.checked;
            if (option_value === '無' && option_status === true) {
                this.questions[$index].value = ['無'];
                this.questions[$index].disabled = true;
            } else if (option_value === '無' && option_status === false) {
                this.questions[$index].disabled = false;
            }
        }
    }
});

var question_6 = new Vue({
    el:'#question_6',
    data:{
        head:'六.家庭狀況',
        questions:[
            {
                type: 'radio',
                title: '親生父母婚姻狀況:(單選)',
                options: ['結婚同居', '結婚分居', '未婚同居', '未婚分居', '離婚', '喪偶', ],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
                type: 'select',
                title: '手足人數-兄',
                options: getSelectNum(0,12,'人'),
                value: '',
                other_value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'select',
                title: '手足人數-弟',
                options: getSelectNum(0,12,'人'),
                value: '',
                other_value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'select',
                title: '手足人數-姐',
                options: getSelectNum(0,12,'人'),
                value: '',
                other_value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'select',
                title: '手足人數-妹',
                options: getSelectNum(0,12,'人'),
                value: '',
                other_value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'text',
                title: '父親-姓名',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'text',
                title: '父親-出生年月日',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'radio',
                title: '父親-教育程度',
                options: ['未受教育', '小學', '初中', '專科', '高中', '大學', '碩士', '博士', ],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
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
                type: 'radio',
                title: '父親-國籍',
                options: ['本國籍原住民', '本國及非原住民', '其他',],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
                type: 'text',
                title: '母親-姓名',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'text',
                title: '母親-出生年月日',
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'radio',
                title: '母親-教育程度',
                options: ['未受教育', '小學', '初中', '專科', '高中', '大學', '碩士', '博士', ],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
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
                type: 'radio',
                title: '母親-國籍',
                options: ['本國籍原住民', '本國及非原住民', '其他',],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
        ],
    }
});

var question_7 = new Vue({
    el:'#question_7',
    data:{
        head:'七、療育情形',
        questions:[
            {
                title: '開始療育年齡-歲數',
                type: 'select',
                options: getSelectNum(0,6,'歲'),
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                title: '開始療育年齡-月數',
                type: 'disabled',
                options: getSelectNum(0,11,'個月'),
                value: '',
                class:'col-md-6 mb-6',
            },
            {
                type: 'radio',
                title: '療育現況',
                options: ['未曾療育過', '療育過但中斷', '療育持續中', ],
                value: '',
                other_value: '',
                class:'col-md-12 mb-12',
            },
            {
                title: '物理治療持續時間',
                type: 'disabled',
                options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                value: '',
                class:'col-md-12 mb-12',
            },
            {
                title: '職能治療持續時間',
                type: 'disabled',
                options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                value: '',
                class:'col-md-12 mb-12',
            },
            {
                title: '語言治療持續時間',
                type: 'disabled',
                options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                value: '',
                class:'col-md-12 mb-12',
            },
            {
                title:'曾接受的療育種類',
                type:'disabled',
                options:['物理治療', '職能治療', '語言治療', '認知訓練', '機構早療課程', '心理治療', '藝術治療', '音樂治療', '馬術治療', '其他'],
                value:[],
                class:'col-md-12 mb-12'
            },
            {
                title:'目前療育(上課)地點',
                type:'disabled',
                options:['亞東醫院', '其他醫院', '復健診所', '日托班', '到宅服務', '其他', ],
                value:[],
                class:'col-md-12 mb-12'
            },
        ],
    },
    computed: {
        ageUnder1: function() {
            if(this.questions[0].value == '0歲'){
                this.questions[1].type = 'select';
            }else{
                this.questions[1].type = 'disabled';
            }
            return;
        },
        healStatus:function(){
            switch(this.questions[2].value)
            {
            case '療育過但中斷':
                this.questions[3].type = 'select';
                this.questions[4].type = 'select';
                this.questions[5].type = 'select';
                this.questions[6].type = 'checkbox';
                this.questions[7].type = 'disabled';
              break;
            case '療育持續中':
                this.questions[3].type = 'disabled';
                this.questions[4].type = 'disabled';
                this.questions[5].type = 'disabled';
                this.questions[6].type = 'checkbox';
                this.questions[7].type = 'checkbox';
              break;
            default:
                this.questions[3].type = 'disabled';
                this.questions[4].type = 'disabled';
                this.questions[5].type = 'disabled';
                this.questions[6].type = 'disabled';
                this.questions[7].type = 'disabled';
            }
            return;
        },
        healPlace:function(){
            heal_places = this.questions[7].value;
            if(heal_places)
                for(heal_place in heal_places){
                    let detail = {
                        title:heal_place+'物理治療每周幾次',
                        type:'text',
                        value:[],
                        class:'col-md-12 mb-12'
                    }
                    this.questions.push(detail);
                }
        }
    },
});
function getSelectNum(from,end,unit=''){
    result = [];
    for(i = from; i <= end; i++){
        result.push(i+unit);
    }
    return result;
}