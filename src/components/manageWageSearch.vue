<template>
	<div class="box">
		<Breadcrumb class="crumb" separator=">">
			<BreadcrumbItem href="/">
				<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
			</BreadcrumbItem>
			<BreadcrumbItem href="/">门店管理</BreadcrumbItem>
			<BreadcrumbItem>门店管理</BreadcrumbItem>
		</Breadcrumb>
		<div class="thisName">
			<span>门店管理</span>
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
					<!--<button type="button" shiro:hasPermission="/resources/add" 
						@click="test" class="btn btn-info" style="float: right; margin-right: 1px;">新增</button>-->

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="success" @click="btn_deduct_salary">编辑扣款规则</Button>
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
		<Modal width='300' v-model="modal_arg_deduct_salary" title="编辑扣款规则">
			<Form ref="arg_add" :model="arg_deduct_salary" :label-width="80">
					<!--<Form-item label="编号" :label-width="100">
						<Input v-model="arg_deduct_salary.deductSalaryId" placeholder="请输入门店地址"></Input>
					</Form-item>-->
					<Form-item label="早退">
						<Input v-model="arg_deduct_salary.earlyLeave" placeholder="请输入早退扣款"></Input>
					</Form-item>
					<Form-item label="事假">
						<Input v-model="arg_deduct_salary.casualLeave" placeholder="请输入事假扣款"></Input>
					</Form-item>
					<Form-item label="病假">
						<Input v-model="arg_deduct_salary.sickLeave" placeholder="请输入病假扣款"></Input>
					</Form-item>
					<Form-item label="旷工">
						<Input v-model="arg_deduct_salary.absenteeism" placeholder="请输入旷工扣款"></Input>
					</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_deduct_salary">确定</Button>
				<Button type="info" size='large' @click="modal_arg_deduct_salary=false">取消</Button>
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
		data() {
			return {
				modal_arg_deduct_salary:false,
				arg_deduct_salary:{
				    "deductSalaryId":"1",
				    "earlyLeave":"",
				    "casualLeave":"",
				    "sickLeave":"",
				    "absenteeism":""
				},
				data_table:[],
            	total:null,
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
				},
				tableInfo: {
					name: '工资查询管理',
					url: window.http + '/staff_payroll/query_staff_wages',
					arg:{
					    "storeId":null,
					    "staffId": 1
					},
					columns: [{
							title: '所属门店',
							key: 'storeName',
							align: 'center',
							width: 100
						},
						{
							title: '员工名称',
							key: 'staffName',
							align: 'center',
							width: 150
						},
						{
							title: '职位',
							key: 'position',
							align: 'center',
							width: 100
						},
						{
							title: '身份证号',
							key: 'staffIdCard',
							align: 'center',
							width: 200
						},
						{
							title: '入职时间',
							key: 'entryTime',
							align: 'center',
							width: 200
						},
						{
							title: '底薪',
							key: 'baseicSalary',
							align: 'center',
							width: 100
						},
						{
							title: '补贴',
							key: 'subsidy',
							align: 'center',
							width: 110
						},
						{
							title: '应出勤天数',
							key: 'attendanceNumber',
							align: 'center',
							width: 130
						},
						{
							title: '实际出勤天数',
							key: 'actualAttendanceNumber',
							align: 'center',
							width: 100
						},
						{
							title: '实际销售业绩',
							key: 'actualSalesPerformance',
							align: 'center',
							width: 120,
						},
						{
							title: '提成',
							key: 'commission',
							align: 'center',
							width: 100
						},
						{
							title: '奖金',
							key: 'bonus',
							align: 'center',
							width: 100
						},
						{
							title: '罚款',
							key: 'fine',
							align: 'center',
							width: 110
						},
						{
							title: '早退次数',
							key: 'earlyLeaveNumber',
							align: 'center',
							width: 110
						},
						{
							title: '早退扣款',
							key: 'earlyLeave',
							align: 'center',
							width: 110
						},
						{
							title: '请假天数',
							key: 'leaveNumber',
							align: 'center',
							width: 110
						},
						{
							title: '请假扣款',
							key: 'leaveDebit',
							align: 'center',
							width: 110
						},
						{
							title: '旷工天数',
							key: 'absenteeismNumber',
							align: 'center',
							width: 110
						},
						{
							title: '旷工扣款',
							key: 'absenteeism',
							align: 'center',
							width: 110
						},
						{
							title: '超低商品提成金额',
							key: 'goodsCommission',
							align: 'center',
							width: 110
						},
						{
							title: '实发工资',
							key: 'actualWages',
							align: 'center',
							width: 110
						}
					]
				},
			}
		},
		methods: {
			up_deduct_salary(){
				this.$http({
					method: 'post',
					url:window.http+ '/staff_payroll/update_deduct_salary',
					data:this.arg_deduct_salary
				 }).then((res)=> {
					if(res.status==200){
						console.log(res,'res')
						this.$Message.info(res.data.msg)
					}
				});
			},
			btn_deduct_salary(){
				this.modal_arg_deduct_salary = true
				this.$http({
					method: 'post',
					url:window.http+ '/staff_payroll/select_deduct_salary',
				 }).then((res)=> {
					if(res.status==200){
						this.arg_deduct_salary = res.data.data
					}
				});
			},
			up_query(obj){
				if(obj.length){
					if(obj[0].storeId){
						this.tableInfo.arg.storeId = obj[0].storeId
						this.down_table()
					}
				}else{
					this.down_table()
				}
			},
			isEmpty(arg,type){
					if(type=='obj'){
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
			},
			up_delete(id){
				 this.$http({
					method: 'post',
					url:window.http+ '/store/update',
					data:{
						"storeStatus":2,
						"storeId":id,
						"type":2
					}
				 }).then((res)=> {
					if(res.status==200){
						console.log(res,'res')
						this.$Message.info(res.data.msg)
						this.down_table()
					}
				});
			},
			pageCange(val){
				console.log(val)
				this.tableInfo.url = window.http + '/store?start='+val+'&length=10'
				this.down_table()
        		
        	},
			down_table(){
				if(!this.tableInfo.arg.storeId){
					this.$Message.info('请在左侧选择门店！')
					return;
				}
				this.$http({
					method: 'post',
					url: this.tableInfo.url,
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						res.data.data.map((item)=>{
							item.entryTime = bus.time(item.entryTime)
						})
						
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
					}
					
				});

			}
		},
		mounted() {
			this.down_table()
		}
	}
</script>
<style lang="less" scoped>
	.box {
		width: 100%;
		height: 90%;
		background: #eee;
		.crumb {
			padding: 0 2%;
			height: 36px;
			font: 12px/36px 'microsoft yahei';
			text-align: left;
			background: #fff;
		}
		.thisName {
			width: 96%;
			margin: 0 2% 16px 2%;
			text-align: left;
			border-bottom: 1px solid #fff;
			span {
				width: 100%;
				display: inline-block;
				border-bottom: 1px solid #ddd;
				font: 18px/40px 'microsoft yahei';
			}
		}
		.main-left {
			border: 1px solid #ddd;
			background: #fff;
			margin: 0 2%;
			height: 88%;
			width: 16%;
			float: left;
		}
		.main-right {
			height: 88%;
			width: 78%;
			float: left;
			position: relative;
			.serach {
				background: #fff;
				width: 100%;
				height: 90px;
				font: 700 12px/30px "";
				text-align: left;
				border: 1px solid #ddd;
				.serach_main {
					padding: 12px 0 0 12px;
				}
			}
			.table-box {
				background: #fff;
				width: 100%;
				font: 700 12px/30px "";
				text-align: left;
				border: 1px solid #ddd;
				position: absolute;
				top: 105px;
				bottom: 0px;
				left: 0px;
				right: 0px;
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
		.title_icon {
			height: 30px;
			border-bottom: 1px solid #ddd;
			font: 700 12px/30px "";
			background: #eee;
			text-align: left;
			.icon_titile {
				width: 36px;
				text-align: center;
				border-right: 1px solid #ddd;
				display: inline-block;
				margin-right: 6px;
				font-size: 16px;
			}
		}
	}
</style>