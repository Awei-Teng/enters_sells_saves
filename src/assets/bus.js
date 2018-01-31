import Vue from 'vue'
let bus = new Vue({
		methods: {
			time(time,type) {
				function two(num){
					if(num<10){
						return '0'+num;
					}else{
						return num;
					}
				}
				let timec = new Date(time)
				let year = timec.getFullYear()
				let month = timec.getMonth() + 1
				let day = timec.getDate()
				let hours = timec.getHours()
				let minutes = timec.getMinutes()
				let seconds = timec.getSeconds()
				
				month = two(month);
				day = two(day);
				hours = two(hours);
				minutes = two(minutes);
				seconds = two(seconds);
				if(type=='no:'){
					let timer = year + '-' + month + '-' + day
					return timer;
				}else{
					let timer = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
					return timer;
				}
				
			},
			checkEmpty(arg){
					if(typeof arg=="object"){
							for(var item in arg){
										if(arg[item]==='' || arg[item]===null || arg[item]===undefined || arg[item]===NaN || (arg[item] && typeof arg[item]=="string"&&arg[item].trim().length == 0) ){
												return false;
										}
							}
							return true;
					}else{
								if(arg==='' || arg===null || arg===undefined || arg===NaN || (arg && typeof arg=="string"&&arg.trim().length == 0) ){
									return false;
								}else{
									return true;
								}
					}
			}
		}
	});
export default bus;
