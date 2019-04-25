// 想要確認checkbox每個選項都要勾到 但是 因為剛學vuejs 
// 不知道怎麼綁定form 又綁定裡面的input 只好將確認寫成一個button
// 再依序去檢查裡面的值 若有問題的就取消表單的送出
var submit_button = new Vue({
	el:'#submit_button',
	methods:{
		check_checkbox:function(event){
			var questions = question_4.questions;
			for (var i = questions.length - 1; i >= 0; i--) {
				if(questions[i].hasSelected.length==0){
					questions[i].checked = true;
					event.preventDefault();
				}else{
					questions[i].checked = false;
				}
			}
			var questions = question_5.questions;
			for (var i = questions.length - 1; i >= 0; i--) {
				if(questions[i].hasSelected.length==0){
					questions[i].checked = true;
					event.preventDefault();
				}else{
					questions[i].checked = false;
				}
			}
		}
	}
})
var question_2 = new Vue({
	el:'#question_2',
	data:{
		questions:[
			{
				title:'目前身高',
				input_name:'height',
				value:''
			},
			{
				title:'體重',
				input_name:'weight',
				value:''
			},
			{
				title:'頭圍',
				input_name:'head_circumference',
				value:''
			},
		],
		caregiver:{
			title:'目前主要照顧者',
			options:['','爸爸','媽媽','爺爺','奶奶','姑姑','叔叔','阿姨','外公','外婆','保母','寄養媽媽','其他'],
			input_name:'caregiver',
			value:''
		},
		who_found_question:{
			title:'誰發現問題',
			options:['家長','親友','教育單位','醫療單位','社政單位','其他'],
			input_name:'who_found_question',
			value:'',
		}
	},
	computed:{
		BMI: function(){
			return (this.questions[1].value/(this.questions[0].value/100*this.questions[0].value/100)).toFixed(1);
		}
	},
	methods:{
		isforsetCare: function(event){
			console.log(event.target.value);
		}
	}
})

var question_3 = new Vue({
	el:'#question_3',
	data:{
		read_school:{
			title:'是否就學',
			options:['是','否','就學過，但中斷'],
			input_name : 'history',
			value:'',
		},
		without_read_reason:{
			title:'中斷原因',
			options:['搬家','適應不良','因鑑定安置轉學','其他'],
			input_name:'without_read_reason',
			value:'',
		},
		read_time:{
			title:'就學多久',
			years:['0年','1年','2年','3年','4年','5年','6年','7年'],
			months:['0個月','1個月','2個月','3個月','4個月','5個月','6個月','7個月','8個月','9個月','10個月','11個月'],
			year_value:'',
			month_value:'',
		},
		questions:[
			{
				title:'就學形式',
				options:['全天','半天'],
				input_name:'read_type',
			},
			{
				title:'學校語言',
				options:['國語為主','雙語','全美語'],
				input_name:'read_language',
			},
		]
	}
})

var question_4 = new Vue({
	el: "#question_4",
	data:{
		questions:[
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
	methods:{
		checkOption: function(event, $index) {
			option_value = event.target.value;
			option_status = event.target.checked;
			if(option_value === '無' && option_status === true){
				this.questions[$index].hasSelected =['無'];
				this.questions[$index].disabled = true;
			}
			else if(option_value === '無' && option_status === false){
				this.questions[$index].disabled = false;
			}
	    }
	}
})

var question_5 = new Vue({
	el: "#question_5",
	data:{
		questions:[
			{
				input_name:'target[]',
				options:['確定目前能力', '確定診斷病因', '申請手冊', '入學前鑑定', '學校建議','追蹤複評'],
				hasSelected:[],
				disabled:false,
				checked:false,
			},
	    ]
	}
})

Vue.component('question_radio', {
	props: ['prop'],
 	template: '<div class="col-md-4 mb-6"><label><input type="radio" name="test" value="a" required="">{{prop}}</label></div>'
})
// 创建根实例
var question_6 = new Vue({
 	el: '#question_6',
	data:{
		questions:[
			{
				title:'1.親生父母婚姻狀況:(單選)',
				options:['結婚同居', '結婚分居', '未婚同居', '未婚分居', '離婚', '喪偶',],
			},
			{
				title:'2.手足人數',
				contents:[
					{
						type:'兄',
						options:['','1人','2人','3人','4人','5人'],
						value:'',
					},
					{
						type:'弟',
						options:['','1人','2人','3人','4人','5人'],
						value:'',
					},
					{
						type:'姐',
						options:['','1人','2人','3人','4人','5人'],
						value:'',
					},
					{
						type:'妹',
						options:['','1人','2人','3人','4人','5人'],
						value:'',
					},
				],
			},
		],
	},
	computed:{
		// 算排行只要取哥哥姊姊的數量+1即可
		rank:function(){
			borther = parseInt(this.questions[1].contents[0].value.slice(0,-1));
			sister = parseInt(this.questions[1].contents[2].value.slice(0,-1));
			if(!borther && !sister)
				return 1;
			if(!sister)
				sister = 0;
			if(!borther)
				borther = 0;
			return borther+sister+1;
		}
	}
})