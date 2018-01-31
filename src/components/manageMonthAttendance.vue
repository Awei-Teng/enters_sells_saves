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
			<module-tree :treeInfo="treeInfo" @getStoreId='up_query'></module-tree>
		</div>
		<div class="main-right">
			<div class="serach">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>查询条件</span>	
				</div>
				<div class="serach_main">
						
					<!--{
    "storeId":"15",
    "postId":"2",
    "month":"2017-12-01",
    "staffName":"利达",
    "staffNumber":"41654655"
}-->	
					<span style="font:12px/32px 'microsoft yahei';padding-left:10px">职位:</span>
					 <Select v-model="tableInfo.arg.postId" style="width:180px" size="small">
				        <Option v-for="item in postIdList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
					<span style="font:12px/32px 'microsoft yahei';padding-left:10px">日期:</span>
					<DatePicker v-model="tableInfo.arg.month"  type="date" placeholder="请输入..." style="width: 180px" size="small"></DatePicker>
					<span style="font:12px/32px 'microsoft yahei';padding-left:10px">员工姓名:</span>
					<Input v-model="tableInfo.arg.staffName" placeholder="请输入..." style="width: 180px;padding:0 8px" size="small"></Input>
					<span style="font:12px/32px 'microsoft yahei';padding-left:10px">员工编号:</span>
					<Input v-model="tableInfo.arg.staffNumber" placeholder="请输入..." style="width: 180px;padding:0 8px" size="small"></Input>
					<Button type="info" size="small" @click="bt_query">查询</Button>
					<Button type="info" size="small" @click="bt_attendanceSet">考勤设置</Button>
					<!--<Button type="success" size="small">添加商品</Button>-->				
				</div>
			</div>		
			<div class="serach" style="margin-top:12px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>门店查询列表</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">旷工人数:</span>
					<span v-text="data_num.frameCount" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">早退人数:</span>
					<span v-text="data_num.leaveEarlyCount" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">休假人数:</span>
					<span v-text="data_num.vacation" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">事假人数:</span>
					<span v-text="data_num.matterLeave" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">病假人数:</span>
					<span v-text="data_num.sickLeave" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">打卡异常人数:</span>
					<span v-text="data_num.errorCount" style="color: red;padding-left: 20px;"></span>
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
		<Modal width='500' v-model="modal_attendanceSet" title="考勤设置">
			<Form ref="arg_attendanceSet" :model="arg_attendanceSet" :label-width="90">
				<Form-item label="考勤时长（小时）">
					<Input v-model="arg_attendanceSet.password" placeholder="请输入考勤时长"></Input>
				</Form-item>
				<Form-item label="应出勤天数">
					<Input v-model="arg_attendanceSet.name" placeholder="请输入应出勤天数"></Input>
				</Form-item>
				<Form-item label="门店名称">
					<Input v-model="arg_attendanceSet.address" placeholder="请输入公司地址"></Input>
				</Form-item>
				<Form-item label="范围（米）">
					<Input v-model="arg_attendanceSet.address" placeholder="请输入公司地址"></Input>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				&nbsp;
				<!--<Button type="success" size='large' @click="up_modify">确定</Button>
				<Button type="info" size='large' @click="modal_edit=false">取消</Button>-->
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
            	data_table:[],
            	total:null,
			    countNo: '',
			    countYes: '',
			    modal_detail:false,
			    modal_attendanceSet:false,
			    patrolStoreContent:'',
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	postIdList:[],
            	data_num:{},
            	arg_attendanceSet:{
            		
            	},
            	tableInfo: {
					name: '巡店查询',
					search: 0,
					url: window.http + '/clock/monthly_clock',
					arg:{
					    "storeId":null,
					    "postId":null,
					    "month":null,
					    "staffName":null,
					    "staffNumber":null,
					    "start":1,
    				    "length":10
					},
					columns: [
						{
							title: '员工ID',
							key: 'staffId',
							align: 'center',
							width:100
						},
						{
							title: '员工姓名',
							key: 'staffName',
							align: 'center',
							width:100,
						},
						{
							title: '员工编号',
							key: 'staffNumber',
							align: 'center',
							width:120
						},
						{
							title: '职位',
							key: 'postName',
							align: 'center',
							width:100
						},
						{
							title: '门店名称',
							key: 'storeName',
							align: 'center',
							width:150,
						},
						{
							title: '早退',
							key: 'shouldClockCount',
							align: 'center',
							width:100
						},
						{
							title: '事假天数',
							key: 'matterLeave',
							align: 'center',
							width:100
						},
						{
							title: '出勤天数',
							key: 'actualClockCount',
							align: 'center',
							width:100,
						},
						{
							title: '病假',
							key: 'sickLeave',
							align: 'center',
							width:100,
						},
						{
							title: '休假',
							key: 'vacation',
							align: 'center',
							width:100,
						},
						{
							title: '旷工',
							key: 'frameCount',
							align: 'center',
							width:100,
						},
						{
							title: '早退',
							key: 'leaveEarlyCount',
							align: 'center',
							width:100,
						},
						{
							title: '打卡异常',
							key: 'errorCount',
							align: 'center',
							width:100,
						},
						{
							title: '工作时长',
							key: 'workTime',
							align: 'center',
							width:100,
						},
						{
	                        title: '操作',
	                        key: 'action',
	                        align: 'center',
	                        fixed:"right",
	                        width:150,
	                        render: (h, params) => {
	                            return h('div', [
	                                h('Button', {
	                                    props: {
	                                        type: 'primary',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
//	                                        	window.vThis.activeName = "5-1"
	                                        	window.vThis.vRouter = 'managePunchCard'
	                                        	this.$emit('changeName',"5-1")
//	                                        	sessionStorage.staffId = params.row.staffId
												this.$nextTick(function(){
													bus.$emit('getStaffId',params.row.staffId)
												})
	                                        }
	                                    }
	                                }, '查看'),
	                        ]);
	                    }
	                   }
					]
				}
            }
        },
        methods:{
        	bt_attendanceSet(){
        		this.modal_attendanceSet = true
        	},
        	up_query(obj){
				this.tableInfo.arg.storeId = obj[0].storeId
				this.down_table()
			},
        	bt_query(){
        		if(this.tableInfo.arg.month){
        			this.tableInfo.arg.month = this.timer(this.tableInfo.arg.month)
        		}
        		
        		this.down_table()
        	},
			pageCange(val){
				this.tableInfo.arg.start = val
				this.down_table()
        	},
        	timer(time) {
				let timec = new Date(time)
				const year = timec.getFullYear()
				const month = timec.getMonth() + 1
				const day = timec.getDate()
				const hours = timec.getHours()
				const minutes = timec.getMinutes()
				const seconds = timec.getSeconds()
			
				let timer = year + '-' + month + '-' + day
				return timer;
			},
			down_table(){
				
				if(!this.tableInfo.arg.storeId){
					this.$Message.info('请在左侧选择门店！')
				}
				if(this.tableInfo.arg.postId ==''){
					this.tableInfo.arg.postId = null
				}
				 if(this.tableInfo.arg.month ==''){
					this.tableInfo.arg.month = null
				}
				 if(this.tableInfo.arg.staffName ==''){
					this.tableInfo.arg.staffName = null
				}
				 if(this.tableInfo.arg.staffNumber ==''){
					this.tableInfo.arg.staffNumber = null
				}
				this.$http({
					method: 'post',
					url: this.tableInfo.url,
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
							this.data_num  = {
								"frameCount": res.data.frameCount,
 							    "leaveEarlyCount": res.data.leaveEarlyCount,
								"vacation": res.data.vacation,
								"matterLeave": res.data.matterLeave,
								"recordsTotal": res.data.recordsTotal,
								"sickLeave": res.data.sickLeave,
								"errorCount": res.data.errorCount,
							}
							
					}
					
				});

			},
			getPostId(){
				this.$http({
					method: 'post',
					url: window.http + '/staff/getStaffPostList',
					data:{}
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						this.postIdList = [{
							value:'',
							label:'空'
						}]
						for(let i=0;i<res.data.data.length;i++){
							this.postIdList.push({
								value : res.data.data[i].postId,
								label : res.data.data[i].postName
							})
						}
							
					}
					
				});

			},
        },
        mounted(){
        	this.down_table()
        	this.getPostId()
        	
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