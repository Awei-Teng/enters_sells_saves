<template>
	<div class="box">
		    <Breadcrumb class="crumb" separator=">">
		        <BreadcrumbItem href="/">
		            <Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
		        </BreadcrumbItem>
		        <BreadcrumbItem href="/">商品管理</BreadcrumbItem>
		        <BreadcrumbItem>商品管理</BreadcrumbItem>
		    </Breadcrumb>
		    <div class="thisName">
		    	<span>商品管理</span>
		    </div>
		<div class="main-left">
			<module-tree :treeInfo="treeInfo"></module-tree>
		</div>
		<div class="main-right">
			<div class="serach">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>查询条件</span>	
				</div>
				<div class="serach_main">
					<!--<button type="button" shiro:hasPermission="/resources/add" 
						@click="test" class="btn btn-info" style="float: right; margin-right: 1px;">新增</button>-->
						
						
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<!--<Button type="success" size="small">添加商品</Button>-->				
				</div>
			</div>		
			<div class="serach" style="margin-top:12px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>统计数据</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">应出勤天数:</span>
					<span v-text="data_num.bayNumber" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">休假:</span>			
					<span v-text="data_num.vacation" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">旷工天数:</span>			
					<span v-text="data_num.absent" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">事假:</span>			
					<span v-text="data_num.matterLeave" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">早退:</span>			
					<span v-text="data_num.escape" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">病假:</span>			
					<span v-text="data_num.sickLeave" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">实际出勤天数:</span>			
					<span v-text="data_num.workDays" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">旷工次数:</span>			
					<span v-text="data_num.absenteeism" style="color: red;padding-left: 20px;"></span>
				</div>
			</div>	
			<div class="table-box">
				<!--<module-table :tableInfo="tableInfo"></module-table>-->
				<div class="module-table">
					<div class="title_icon">
						<span style="width:20px;border-right:1px solid #eee"></span>
						<span class="icon_titile"><Icon type="navicon-round"></Icon></span>
						<span>商品列表</span>
						<Table size="small" border :columns="tableInfo.columns" :data="data_table"></Table>
						<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
					</div>
				</div>
				
			</div>
		</div>
		<Modal width='500' v-model="modal_detail" title="查看详情">
			<span>{{patrolStoreContent}}</span>
			<div slot="footer" style="text-align: center;">
				&nbsp;
				<!--<Button type="success" size='large' @click="up_modify">确定</Button>
				<Button type="info" size='large' @click="modal_edit=false">取消</Button>-->
			</div>
		</Modal>
		<Modal width='700' v-model="modal_map" title="查看地址">
			<div id="container" tabindex="0" style="width: 100%;height: 300px;"></div>
			<span style="font: 700 14px/40px '';">地址：</span>	<span style="font: 700 14px/40px '';">{{now_address}}</span>	
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
    </div>
</template>
<!--宽高在这里写-->
<script>
	import moduleTree from '../components/module_tree'
	import bus from '../assets/bus.js'
    export default {
		components: {
			moduleTree,
		},
        data () {
            return {
            	now_address:'',
            	data_table:[],
            	modal_map:false,
            	total:null,
			    countNo: '',
			    countYes: '',
			    modal_detail:false,
			    patrolStoreContent:'',
			    data_num:{},
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	tableInfo: {
					name: '巡店查询',
					search: 0,
					url: window.http + '/clock/monthly_clock_staffId',
					arg:{
						"staffId":null
					},
					columns: [
						{
							title: '员工名称',
							key: 'staffName',
							align: 'center',
							width:100
						},
						{
							title: '编号',
							key: 'staffNumber',
							align: 'center',
							width:100
						},
						{
							title: '职位',
							key: 'postName',
							align: 'center',
							width:100
						},
						{
							title: '所属门店',
							key: 'storeName',
							align: 'center',
							width:150,
						},
						{
							title: '考勤日期',
							key: 'clockTime',
							align: 'center',
							width:120
						},
						{
							title: '上班一签到',
							key: 'clockUpOne',
							align: 'center',
							width:100,
							render: (h, params) => {
	                            return h('div', [
	                                h('a', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.show_map(params.row.upLngLatOne)
	                                        }
	                                    }
	                                }, params.row.clockUpOne),
	                        	]);
	                   		}
						},
						{
							title: '上班一签退',
							key: 'clockBelowOne',
							align: 'center',
							width:100,
							render: (h, params) => {
	                            return h('div', [
	                                h('a', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.show_map(params.row.belowLngLatOne)
	                                        }
	                                    }
	                                }, params.row.clockBelowOne),
	                        	]);
	                   		}
						},
						{
							title: '上班二签到',
							key: 'clockUpTwo',
							align: 'center',
							width:100,
							render: (h, params) => {
	                            return h('div', [
	                                h('a', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.show_map(params.row.upLngLatTwo)
	                                        }
	                                    }
	                                }, params.row.clockUpTwo),
	                        	]);
	                   		}
						},
						{
							title: '上班二签退',
							key: 'clockBelowTwo',
							align: 'center',
							width:100,
							render: (h, params) => {
	                            return h('div', [
	                                h('a', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.show_map(params.row.belowLngLatTwo)
	                                        }
	                                    }
	                                }, params.row.clockBelowTwo),
	                        	]);
	                   		}
						},
						{
							title: '上班三签到',
							key: 'clockUpThree',
							align: 'center',
							width:100,
							render: (h, params) => {
	                            return h('div', [
	                                h('a', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.show_map(params.row.upLngLatThree)
	                                        }
	                                    }
	                                }, params.row.clockUpThree),
	                        	]);
	                   		}
						},
						{
							title: '上班三签退',
							key: 'clockBelowThree',
							align: 'center',
							width:100,
							render: (h, params) => {
	                            return h('div', [
	                                h('a', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        	this.show_map(params.row.belowLngLatThree)
	                                        }
	                                    }
	                                }, params.row.clockBelowThree),
	                        	]);
	                   		}
						},
						{
							title: '打卡状态',
							key: 'clockStatus',
							align: 'center',
							width:100
						},
						{
							title: '工作时长(小时)',
							key: 'workHour',
							align: 'center',
							width:100
						},
						{
							title: '工作时长(分钟)',
							key: 'workMinute',
							align: 'center',
							width:100,
						},
						{
							title: '请假开始时间',
							key: 'startTime',
							align: 'center',
							width:100,
						},
						{
							title: '请假结束时间',
							key: 'endTime',
							align: 'center',
							width:100,
						},
					]
				}
            }
        },
        methods:{
        	show_map(arg){
        		const that = this
        		let jw = null
        		if(arg){
        			jw = arg.split(',')
        		}else{
        		}
        		
        		this.modal_map = true
		        var map = new AMap.Map('container',{
		            resizeEnable: true,
		            zoom: 10,
		            center: jw
		        });
		        var marker = new AMap.Marker({
				    position: jw,//marker所在的位置
				    map:map//创建时直接赋予map属性
				});
				//也可以在创建完成后通过setMap方法执行地图对象
				marker.setMap(map);
						AMap.service('AMap.Geocoder',function(){//回调函数
						    //实例化Geocoder
						    var geocoder = new AMap.Geocoder({
						        city: "010"//城市，默认：“全国”
						    });
						    //TODO: 使用geocoder 对象完成相关功能
						    		//逆地理编码    3200,9600 3200,9600
								var lnglatXY=jw;//地图上所标点的坐标
								geocoder.getAddress(lnglatXY, function(status, result) {
								    if (status === 'complete' && result.info === 'OK') {
								       //获得了有效的地址信息:
								       //即，result.regeocode.formattedAddress
								       that.now_address = result.regeocode.formattedAddress
								    }else{
								       //获取地址失败
								       that.now_address = '未能识别'
								    }
								});  
						})
        	},
        	timer(time) {
				let timec = new Date(time)
				const year = timec.getFullYear()
				const month = timec.getMonth() + 1
				const day = timec.getDate()
				const hours = timec.getHours()
				const minutes = timec.getMinutes()
				const seconds = timec.getSeconds()
			
				let timer =  hours +':'+minutes+':'+seconds
				return timer;
			},
			pageCange(val){
        		console.log(val)
        	},
			down_table(){
				this.$http({
					method: 'post',
					url: this.tableInfo.url,
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(12,res)
					if(res.status==200){
							for(let i=0;i<res.data.data.length;i++){
								res.data.data[i].clockUpOne = this.timer(res.data.data[i].clockUpOne)
								res.data.data[i].clockBelowOne = this.timer(res.data.data[i].clockBelowOne)
								res.data.data[i].clockUpTwo = this.timer(res.data.data[i].clockUpTwo)
								res.data.data[i].clockBelowTwo = this.timer(res.data.data[i].clockBelowTwo)
								res.data.data[i].clockUpThree = this.timer(res.data.data[i].clockUpThree)
								res.data.data[i].clockBelowThree = this.timer(res.data.data[i].clockBelowThree)
							}
							this.data_table = res.data.data
							console.log(12,this.data_table)
							this.total = res.data.recordsTotal
							this.data_num = res.data
							
					}
					
				});

			},
        },
        mounted(){
//      	this.tableInfo.arg.staffId = sessionStorage.staffId
        	
        	bus.$on('getStaffId',(data)=>{
        		this.tableInfo.arg.staffId = data
        		this.down_table()
        	})
        }
    }
</script>
<style lang="less" scoped>
	.box{
		width: 100%;
		height: 90%;
		background:#eee;
		.crumb{
			    padding: 0 2%;
			    height: 36px;
			    font: 12px/36px 'microsoft yahei';
			    text-align: left;
			    background:#fff;
		}
		.thisName{
			width: 96%;
			margin: 0 2% 16px 2%;
			text-align: left;
			border-bottom:1px solid #fff;
			span{
				width: 100%;
				display:inline-block;
				border-bottom:1px solid #ddd;
				font:18px/40px 'microsoft yahei';
			}
		}
		.main-left{
			border:1px solid #ddd;
			background:#fff;
			margin:0 2%;
			height: 88%;
			width: 16%;
			float:left;
		}
		.main-right{
			height: 88%;
			width: 78%;
			float:left;
			position:relative;
			.serach{
				background:#fff;
				width: 100%;
				height: 90px;
				font:700 12px/30px "";
			    text-align: left;
    			border: 1px solid #ddd;
    			.serach_main{
    				padding: 12px 0 0 12px;
    			}
			}
			.table-box{
				background:#fff;
				width: 100%;
				font:700 12px/30px "";
			    text-align: left;
			    border: 1px solid #ddd;
				position: absolute;
			    top: 212px;
			    bottom: 0px;
			    left: 0px;
			    right:0px;
			    .module-table{
					.title_icon{
						height: 30px;
						border-bottom:1px solid #ddd;
						font:700 12px/30px "";
						background:#eee;		
						text-align: left;
						.icon_titile{
						    width: 36px;
						    text-align: center;
						    border-right: 1px solid #ddd;
						    display: inline-block;
						    margin-right: 6px;
						    font-size:16px;
						}	   				
					}
					.ivu-table-wrapper{
						border: none;
					}
				}
			}
		}
		.title_icon{
			height: 30px;
			border-bottom:1px solid #ddd;
			font:700 12px/30px "";
			background:#eee;		
			text-align: left;
			.icon_titile{
			    width: 36px;
			    text-align: center;
			    border-right: 1px solid #ddd;
			    display: inline-block;
			    margin-right: 6px;
			    font-size:16px;
			}	   				
		}
	}
</style>