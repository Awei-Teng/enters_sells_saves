<template>
			<!--<router-view :name='vRouter' id="viewMain"></router-view>-->
			<div class="box">
				<Breadcrumb class="crumb" separator=">">
					<BreadcrumbItem href="/">
						<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
					</BreadcrumbItem>
					<BreadcrumbItem href="/">权限管理</BreadcrumbItem>
					<BreadcrumbItem>管理员管理</BreadcrumbItem>
				</Breadcrumb>
				<div class="thisName">
					<span>管理员管理</span>
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

							<span style="font:12px/32px 'microsoft yahei';padding-left:20px">工资模板名称:</span>
							<Input v-model="tableInfo.arg.modelName"  placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
							<Button type="info" size="small" @click="btn_query" style="margin-right:12px">查询</Button>
							<Button type="success" size="small" @click="show_addAdminTemplate">添加管理员资模板</Button>
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
		<Modal width='500' v-model="modal_addAdminTemplate" title="添加品牌">
			<Form ref="arg_addBrand" :model="arg_addAdminTemplate" :label-width="140">
				<Form-item label="模板名称">
					<Input v-model="arg_addAdminTemplate.modelName" placeholder="请输入模板名称"></Input>
				</Form-item>
				<Form-item label="模板类型编号">
					 <Input v-model="arg_addAdminTemplate.salaryModelId" placeholder="请输入品牌描述"></Input>
				</Form-item>
				<Form-item label="区域计划销售业绩">
					<Input v-model="arg_addAdminTemplate.performancePlans" placeholder="请输入区域计划销售业绩"></Input>
				</Form-item>
				<Form-item label="区域实际销售业绩">
					 <Input v-model="arg_addAdminTemplate.performance" placeholder="请输入区域实际销售业绩"></Input>
				</Form-item>
				<Form-item label="计划内销售额提成">
					<Input v-model="arg_addAdminTemplate.plansSellPushMoney" placeholder="请输入计划内销售额提成"></Input>
				</Form-item>
				<Form-item label="超额部分金额提成">
					 <Input v-model="arg_addAdminTemplate.surpassPushMoney" placeholder="请输入超额部分金额提成"></Input>
				</Form-item>
				<Form-item label="超销售目标金额基数">
					<Input v-model="arg_addAdminTemplate.surpassSellBase" placeholder="请输入超销售目标金额基数"></Input>
				</Form-item>
				<Form-item label="人员奖">
					 <Input v-model="arg_addAdminTemplate.staffReward" placeholder="请输入人员奖"></Input>
				</Form-item>
				<Form-item label="未完成月销售计划人员">
					<Input v-model="arg_addAdminTemplate.noSellStaff" placeholder="请输入未完成月销售计划人员"></Input>
				</Form-item>
				<Form-item label="月工作未满10天人员">
					 <Input v-model="arg_addAdminTemplate.noWorkStaff" placeholder="请输入月工作未满10天人员"></Input>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_addAdminTemplate">确定</Button>
				<Button type="info" size='large' @click="modal_addAdminTemplate=false">取消</Button>
			</div>
		</Modal>
		
			</div>
			
</template>
<!--宽高在这里写-->
<script>
	import moduleTable from '../components/module_table'
	export default {
		components: {
			moduleTable,
		},
		data() {
			return {
				data_table:[],
            	total:null,
				modal_addAdminTemplate: false,
				modal_edit: false,
				now_id:null,
				arg_addAdminTemplate:{
				  "brandName":"品牌名称 *",
				  "remake":"品牌描述"
				},
				arg_edit: {
				  "brandId":"品牌ID * ",
				  "brandName":"品牌名称",
				  "remake":"品牌描述",
				},
				tableInfo: {
					name: '管理员管理',
					search: 0,
					url: window.http + "/staff_payroll/query_ordinary_staffMode?length=10",
					arg:{
						modelName:'',
						start:1
					},
					columns: [{
							title: '编号Id',
							key: 'modelId',
							align: 'center'
						},
						{
							title: '模板名称',
							key: 'modelName',
							align: 'center'
						},
						{
							title: '底薪',
							key: 'baseicSalary',
							align: 'center'
						},
						{
							title: '补贴',
							key: 'subsidy',
							align: 'center'
						},
						{
							title: '业绩提成',
							key: 'pushMoney',
							align: 'center'
						},
						{
							title: '超出提成',
							key: 'sellPushMoney',
							align: 'center'
						},
						{
							title: '超出目标金额基数',
							key: 'surpassSellBase',
							align: 'center'
						},
						{
							title: '超出目标金额基数奖金',
							key: 'surpassSellBase',
							align: 'center'
						},
						{
							title: '工资模版类型编号',
							key: 'salaryModelId',
							align: 'center'
						},
						{
							title: '工资模版类型名称',
							key: 'modelTypeName',
							align: 'center'
						}
					]
				}
			}
		},
		methods: {
			show_edit(){
				this.modal_edit = true
			},
			btn_query(){
					this.down_table()
				
			},
			up_edit(id){
				this.arg_edit.brandId = this.now_id
				console.log(this.arg_edit)
				this.$http({
					method: 'post',
					url: window.http + '/brand/update',
					data: this.arg_edit,
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.$Message.info('修改成功！')
					}
				});
			},
			up_delete(id){
				this.$http({
					method: 'post',
					url: window.http + '/brand/update',
					data: {
					  "brandId":id,
					  "brandStatus":2
					},
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.down_table()
						this.$Message.info('删除成功！')
					}
				});
			},
			up_addAdminTemplate(){
				this.$http({
					method: 'post',
					url: window.http + '/brand/add',
					data: this.arg_addAdminTemplate,
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.$Message.info('添加成功！')
						this.down_table()
					}
				});
			},
			show_addAdminTemplate(){
				this.modal_addAdminTemplate = true
			},
			pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
        	},
			down_table(){
				this.$http({
					method: 'get',
					url: this.tableInfo.url+"&start="+this.tableInfo.arg.start+"&modelName="+this.tableInfo.arg.modelName,
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
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
			width: 96%;
			float: left;
			margin: 0 2%;
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