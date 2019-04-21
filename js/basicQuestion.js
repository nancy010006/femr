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
		}
	}
})

var question_4 = new Vue({
	el: "#question_4",
	data:{
		questions:[
			{
				title:'A.語言',
				input_name:'question_language',
				options:['無', '說話慢、表達差', '發音不清楚', '答非所問、不會對答', '口吃', '流口水', '吃東西會嗆咳'],
				hasSelected:[],
				disabled:false,
			},
			{
				title:'B.動作',
				input_name:'question_action',
				options:['無', '大動作發展慢', '動作不靈活、平衡問題', '動作慢吞吞', '走路姿勢異常', '局部肢體問題', '手部動作發展慢'],
				hasSelected:[],
				disabled:false,
				checked:false
			}
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