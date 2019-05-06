// 想要確認checkbox每個選項都要勾到 但是 因為剛學vuejs 
// 不知道怎麼綁定form 又綁定裡面的input 只好將確認寫成一個button
// 再依序去檢查裡面的值 若有問題的就取消表單的送出
var submit_button = new Vue({
    el: '#submit_button',
    methods: {
        check_checkbox: function(event) {
            var questions = question_4.questions;
            for (var i = questions.length - 1; i >= 0; i--) {
                if (questions[i].hasSelected.length == 0) {
                    questions[i].checked = true;
                    alert('有些選項沒有填寫，請重新確認');
                    event.preventDefault();
                } else {
                    questions[i].checked = false;
                }
            }
            var questions = question_5.questions;
            for (var i = questions.length - 1; i >= 0; i--) {
                if (questions[i].hasSelected.length == 0) {
                    questions[i].checked = true;
                    alert('有些選項沒有填寫，請重新確認');
                    event.preventDefault();
                } else {
                    questions[i].checked = false;
                }
            }
        }
    }
})
var question_2 = new Vue({
    el: '#question_2',
    data: {
        questions: [{
                title: '目前身高',
                input_name: 'height',
                value: ''
            },
            {
                title: '體重',
                input_name: 'weight',
                value: ''
            },
            {
                title: '頭圍',
                input_name: 'head_circumference',
                value: ''
            },
        ],
        caregiver: {
            title: '目前主要照顧者',
            options: ['', '爸爸', '媽媽', '爺爺', '奶奶', '姑姑', '叔叔', '阿姨', '外公', '外婆', '保母', '寄養媽媽', '其他'],
            input_name: 'caregiver',
            value: ''
        },
        who_found_question: {
            title: '誰發現問題',
            options: ['家長', '親友', '教育單位', '醫療單位', '社政單位', '其他'],
            input_name: 'who_found_question',
            value: '',
        }
    },
    computed: {
        BMI: function() {
            return (this.questions[1].value / (this.questions[0].value / 100 * this.questions[0].value / 100)).toFixed(1);
        }
    },
    methods: {
        isforsetCare: function(event) {
            if (event.target.value == '寄養媽媽')
                question_6.isforsetCare = 1;
            else
                question_6.isforsetCare = 0;
        }
    }
})

var question_3 = new Vue({
    el: '#question_3',
    data: {
        read_school: {
            title: '是否就學',
            options: ['是', '否', '就學過，但中斷'],
            input_name: 'history',
            value: '',
        },
        without_read_reason: {
            title: '中斷原因',
            options: ['搬家', '適應不良', '因鑑定安置轉學', '其他'],
            input_name: 'without_read_reason',
            value: '',
        },
        read_time: {
            title: '就學多久',
            years: ['0年', '1年', '2年', '3年', '4年', '5年', '6年', '7年'],
            months: ['0個月', '1個月', '2個月', '3個月', '4個月', '5個月', '6個月', '7個月', '8個月', '9個月', '10個月', '11個月'],
            year_value: '',
            month_value: '',
        },
        questions: [{
                title: '就學形式',
                options: ['全天', '半天'],
                input_name: 'read_type',
            },
            {
                title: '學校語言',
                options: ['國語為主', '雙語', '全美語'],
                input_name: 'read_language',
            },
        ]
    }
})

var question_4 = new Vue({
    el: "#question_4",
    data: {
        questions: [
            // {
            // 	title:'A.語言',
            // 	input_name:'question_language[]',
            // 	options:['無', '說話慢、表達差', '發音不清楚', '聽不懂，常答非所問', '口吃', '流口水', '吃東西會嗆咳'],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false,
            // },
            // {
            // 	title:'B.動作',
            // 	input_name:'question_action[]',
            // 	options:['無', '大動作發展慢', '動作不靈活、平衡問題', '動作慢吞吞', '走路姿勢與一般孩子不同', '局部肢體問題', '抓東西不穩、握筆姿勢、不太會使用工具'],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'C.學習',
            // 	input_name:'question_learn[]',
            // 	options:['無', '跟不上同儕', '學習動機低落', '不喜歡上學',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'D.人際',
            // 	input_name:'question_relationship[]',
            // 	options:['無', '不太理熟悉的人', '怕陌生人', '手足關係問題', '不易和同儕建立關係', '易和同儕起衝突', '不守團體規則', '有攻擊性行為','不守家長規則(反抗家長)','退縮'],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'E.情緒',
            // 	input_name:'question_mood[]',
            // 	options:['無', '易恐懼', '易焦慮', '易怒', '愛哭', '易興奮', '情緒不易平復',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'F.活動與注意力',
            // 	input_name:'question_attention[]',
            // 	options:['無', '過於好動', '易分心',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'G.感官知覺',
            // 	input_name:'question_perception[]',
            // 	options:['無', '聽力問題', '斜視', '斜視', '弱視', '遠視', '近視', '缺乏反應', '過度敏感',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'H.生活作息',
            // 	input_name:'question_lifestyle[]',
            // 	options:['無', '大小便問題', '睡眠問題', '飲食問題',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'I.自傷行為',
            // 	input_name:'question_selfmutilation[]',
            // 	options:['無', '有',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },
            // {
            // 	title:'J.不知如何教導或幫助小孩',
            // 	input_name:'question_helpkid[]',
            // 	options:['無', '是',],
            // 	hasSelected:[],
            // 	disabled:false,
            // 	checked:false
            // },

        ]

    },
    methods: {
        checkOption: function(event, $index) {
            option_value = event.target.value;
            option_status = event.target.checked;
            if (option_value === '無' && option_status === true) {
                this.questions[$index].hasSelected = ['無'];
                this.questions[$index].disabled = true;
            } else if (option_value === '無' && option_status === false) {
                this.questions[$index].disabled = false;
            }
        }
    }
})

var question_5 = new Vue({
    el: "#question_5",
    data: {
        questions: [{
            input_name: 'target[]',
            options: ['確定目前能力', '確定診斷病因', '申請手冊', '入學前鑑定', '學校建議', '追蹤複評'],
            hasSelected: [],
            disabled: false,
            checked: false,
        }, ]
    }
})

Vue.component('question_radio', {
    props: ['prop', 'input_name'],
    template: '<div class="col-md-4 mb-6"><label><input type="radio" :name="input_name" :value="prop" required="">{{prop}}</label></div>'
})
// 创建根实例
var question_6 = new Vue({
    el: '#question_6',
    data: {
        isforsetCare: 0,
        questions: [{
                title: '1.親生父母婚姻狀況:(單選)',
                options: ['結婚同居', '結婚分居', '未婚同居', '未婚分居', '離婚', '喪偶', ],
                input_name: 'family_married',
            },
            {
                title: '2.手足人數',
                contents: [{
                        type: '兄',
                        options: ['', '1人', '2人', '3人', '4人', '5人'],
                        value: '',
                    },
                    {
                        type: '弟',
                        options: ['', '1人', '2人', '3人', '4人', '5人'],
                        value: '',
                    },
                    {
                        type: '姐',
                        options: ['', '1人', '2人', '3人', '4人', '5人'],
                        value: '',
                    },
                    {
                        type: '妹',
                        options: ['', '1人', '2人', '3人', '4人', '5人'],
                        value: '',
                    },
                ],
            },
            {
                title: '5.目前居住家庭型態',
                options: ['小家庭', '單親家庭', '寄養家庭', '大家庭', ],
                input_name: 'family_family',
            },
        ],
        parent_question: [{
                title: '姓名',
                father: {
                    input_name: 'father_name',
                    value: '',
                },
                mother: {
                    input_name: 'mother_name',
                    value: '',
                }
            },
            {
                title: '出生年月日',
                father: {
                    input_name: 'father_birthday',
                    value: '',
                },
                mother: {
                    input_name: 'mother_birthday',
                    value: '',
                }
            },
            {
                title: '教育程度',
                father: {
                    input_name: 'father_education',
                    value: '',
                },
                mother: {
                    input_name: 'mother_education',
                    value: '',
                },
                options: ['未受教育', '小學', '初中', '專科', '高中', '大學', '碩士', '博士', ],
            },
            {
                title: '職業',
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
                father: {
                    input_name: 'father_career',
                    value: '',
                },
                mother: {
                    input_name: 'mother_career',
                    value: '',
                },
            },
            {
                title: '國籍',
                options: [
                    '本國籍原住民',
                    '本國及非原住民',
                    '其他',
                ],
                father: {
                    input_name: 'father_country',
                    value: '',
                },
                mother: {
                    input_name: 'mother_country',
                    value: '',
                },
            },
        ],
    },
    computed: {
        // 算排行只要取哥哥姊姊的數量+1即可
        rank: function() {
            borther = parseInt(this.questions[1].contents[0].value.slice(0, -1));
            sister = parseInt(this.questions[1].contents[2].value.slice(0, -1));
            if (!borther && !sister)
                return 1;
            if (!sister)
                sister = 0;
            if (!borther)
                borther = 0;
            return borther + sister + 1;
        }
    }
})

var question_7 = new Vue({
    el: '#question_7',
    data: {
        heal_age: {
            title: '開始療育年齡',
            year_options: [0, 1, 2, 3, 4, 5, 6],
            month_options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            year_value: '',
            month_value: '',
        },
        heal_status: {
            title: '療育現況',
            options: ['未曾療育過', '療育過但中斷', '療育持續中', ],
            value: '',
            input_name: 'heal_status',
            others: {
                options: ['3個月以下', '3~6個月', '6個月~1年', '1年~2年', '2年以上'],
                questions: [{
                        title: '物理治療持續時間',
                        value: '',
                    },
                    {
                        title: '職能治療持續時間',
                        value: '',
                    },
                    {
                        title: '語言治療持續時間',
                        value: '',
                    },
                ],
            },
        },
        heal_type: {
            title: '曾接受的療育種類',
            options: ['物理治療', '職能治療', '語言治療', '認知訓練', '機構早療課程', '心理治療', '藝術治療', '音樂治療', '馬術治療', '其他'],
            input_name: 'heal_type',
            hasSelected: [],
            other_value: '',
        },
        heal_place: {
            title: '目前療育(上課)地點',
            options: ['亞東醫院', '其他醫院', '復健診所', '日托班', '到宅服務', '其他', ],
            input_name: 'heal_place',
            hasSelected: [],
            other_value: '',
        },
    }
});

var question_8 = new Vue({
    el: '#question_8',
    data: {
        questions: [{
                main_title: '1.家族史',
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
                input_name: 'family_history[]',
                hasSelected: [],
                disabled: false,
                checked: false,
                family_options: ['爸爸', '媽媽', '爸爸及媽媽'],
                family_value: '',
            },
            {
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
                input_name: 'history_disease[]',
                hasSelected: [],
            },
            {
            	main_title:'2.母親懷孕狀況',
                title: '母親孕期用藥狀況',
                type: 'select',
                options: [
                    '',
                    '無',
                    '精神科用藥',
                    '神經科用藥',
                    '內分泌用藥',
                    '心血管用藥',
                    '其他',
                ],
                input_name: 'history_medication[]',
                value: '',
                other_value: '',
            },
            {
                title: '母親物質濫用狀況',
                type: 'select',
                options: [
                    '',
                    '無',
                    '酒精',
                    '抽菸',
                    '毒品',
                    '其他',
                ],
                input_name: 'history_abuse[]',
                value: '',
                other_value: '',
            },
            {
                title: '懷孕次數',
                type: 'select',
                options: [
                    '',
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                ],
                input_name: 'history_pregcount[]',
                value: '',
            },
            {
                title: '活產次數',
                type: 'select',
                options: [
                    '',
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                ],
                input_name: 'history_birthcount[]',
                value: '',
            },
            {
                title: '流產',
                type: 'radio',
                options: [
                    '無',
                    '自然流產',
                    '人工流產',
                ],
                value: '',
            },
            {
                title: '孕期',
                type: 'special',
                options: [
                ],
                value: '',
            },
            {
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
                hasSelected: [],
            },
            {
            	main_title:'3.新生兒篩檢',
                title: '血片檢查',
                type: 'radio',
                options: [
                    '正常',
                    '異常',
                ],
                value: '',
            },
            {
                title: '聽力檢查',
                type: 'radio',
                options: [
                    '正常',
                    '異常',
                ],
                value: '',
            },
            {
                main_title: '4.生理異常',
                title: 'A.新生期及幼兒期',
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
                hasSelected: [],
            },
            {
                title: 'B.疾病史',
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
                hasSelected: [],
            },
            {
            	main_title:'C.發展史',
                title: '頸部控制',
                type: 'select',
                options: getSelectNum(36,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '翻身',
                type: 'select',
                options: getSelectNum(36,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '坐',
                type: 'select',
                options: getSelectNum(36,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '爬',
                type: 'select',
                options: getSelectNum(36,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '走',
                type: 'select',
                options: getSelectNum(48,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '伸手抓物',
                type: 'select',
                options: getSelectNum(24,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '塗鴉',
                type: 'select',
                options: getSelectNum(48,true),
                value: '',
                tail_unit:'個月',
            },
            {
                title: '第一個有意義單字',
                type: 'select',
                options: getSelectNum(48,true),
                value: '',
                tail_unit:'個月',
            },
        ],
    },
    methods: {
        checkOption: function(event, $index) {
            option_value = event.target.value;
            option_status = event.target.checked;
            if (option_value === '無' && option_status === true) {
                this.questions[$index].hasSelected = ['無'];
                this.questions[$index].disabled = true;
            } else if (option_value === '無' && option_status === false) {
                this.questions[$index].disabled = false;
            }
        }
    }
});
function getSelectNum(last,unknown){
	let init = 1;
	let result = [''];
	for (var i = init; i < last; i++) {
		result.push(i);
	}
	if(unknown)
		result.push('不清楚');
	return result;
}