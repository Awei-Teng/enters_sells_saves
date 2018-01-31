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
					<!--<button type="button" shiro:hasPermission="/resources/add" 
						@click="test" class="btn btn-info" style="float: right; margin-right: 1px;">新增</button>-->

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="success" size="small" @click="show_groupSend">群发</Button>
					<Button type="success" size="small" @click="show_integralSet">会员消费积分设置</Button>
				</div>
			</div>
			<div class="serach" style="margin-top:12px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>门店查询列表</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">会员数量:</span>
					<span v-text="memberCount" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">会员消费总金额:</span>			
					<span v-text="memberSum" style="color: red;padding-left: 20px;"></span>
				</div>
			</div>	
			<div class="table-box">
				<!--<module-table :tableInfo="tableInfo"></module-table>-->
				<div class="module-table">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="navicon-round"></Icon></span>
					<span>商品列表</span>
					<Table size="small" border :columns="tableInfo.columns" :data="data_table" @on-row-dblclick="row_dblclick"></Table>
					<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
				</div>
			</div>
			</div>
		</div>
		<Modal width='500' v-model="modal_groupSend" title="群发">
			<Input placeholder="请输入群发内容..." v-model="arg_groupSend.content" type="textarea" :rows="4" ></Input>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_groupSend">确定</Button>
				<Button type="info" size='large' @click="modal_groupSend=false">取消</Button>
			</div>
		</Modal>
		<Modal width='500' v-model="modal_integralSet" title="会员消费积分设置">
			<Input placeholder="请输入群发内容..." v-model="arg_groupSend.content" type="textarea" :rows="4" ></Input>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="">确定</Button>
				<Button type="info" size='large' @click="modal_integralSet=false">取消</Button>
			</div>
		</Modal>
		<Modal width='1000' v-model="modal_detailCentralReturnOrder" title="门店退货单详情">
			<Table size="small" border :columns="columns_detail" :data="table_detail"></Table>
			<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
		<Modal width='500' v-model="modal_checkInfo" title="查看信息">
			   <Tabs value="name1">
			        <TabPane label="标签一" name="name1">
			        	<div>
			        		<span class="label">会员号 ： </span>{{vipInfo.member}}
			        	</div>
			        	<div>
			        		<span class="label">名称 ： </span>{{vipInfo.memberName}}
			        	</div>
			        	<div>
			        		<span class="label">手机号 ： </span>{{vipInfo.memberPhone}}
			        	</div>
			        	<div>
			        		<span class="label">性别 ： </span>{{vipInfo.sex}}
			        	</div>
			        	<div>
			        		<span class="label">年龄 ： </span>{{vipInfo.age}}
			        	</div>
			        	<div>
			        		<span class="label">职业 ： </span>{{vipInfo.profession}}
			        	</div>
			        	<div>
			        		<span class="label">收入 ： </span>{{vipInfo.income}}
			        	</div>
			        	<div>
			        		<span class="label">积分 ： </span>{{vipInfo.integral}}
			        	</div>
			        	<div>
			        		<span class="label">消费金额 ： </span>{{vipInfo.consumptionSum}}
			        	</div>
			        	<div>
			        		<span class="label">创建时间 ： </span>{{vipInfo.cTime}}
			        	</div>
			        	
			        	
			        </TabPane>
			        <TabPane label="标签二" name="name2">
			        	<Table size="small" border :columns="columns_consumeInfo" :data="table_consumeInfo"></Table>
						<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
			        </TabPane>
			    </Tabs>
			
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
	</div>
</template>
<!--宽高在这里写-->
<script>
	import moduleTree from '../components/module_tree'
	export default {
		components: {
			moduleTree,
		},
		data() {
			return {
				memberSum:"",
				memberCount:"",
				data_table:[],
            	total:null,
            	modal_integralSet:false,
				modal_groupSend:false,
				modal_detailCentralReturnOrder:false,
				modal_checkInfo:false,
				arg_integralSet:{
				},
				arg_groupSend:{
				  "userId":"1",
				  "storeId": null,
				  "content":""
				},
				vipInfo:{},
				table_consumeInfo:[],
				columns_consumeInfo:[{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
						},
						{
							title: '单价',
							key: 'unitPrice',
							align: 'center',
						},{
							title: '数量',
							key: 'quantity',
							align: 'center',
						},
						{
							title: '创建时间',
							key: 'cTime',
							align: 'center',
						},
						{
							title: '总金额',
							key: 'totalAmount',
							align: 'center',
						},
				],
				table_detail:[],
				columns_detail:[{
							title: '会员ID',
							key: 'memberId',
							align: 'center',
							width:100
						},
						{
							title: '会员号',
							key: 'member',
							align: 'center',
							width:100
						},
						{
							title: '员工Id',
							key: 'staffId',
							align: 'center',
							width:100
						},
						{
							title: '数量',
							key: 'storeId',
							align: 'center',
							width:100
						},
						{
							title: '会员改名',
							key: 'memberName',
							align: 'center',
							width:100
						},
						{
							title: '会员手机',
							key: 'memberPhone',
							align: 'center',
							width:100
						},
						{
							title: '性别',
							key: 'sex',
							align: 'center',
							width:100
						},
						{
							title: '年龄',
							key: 'age',
							align: 'center',
							width:100
						},{
							title: '职业',
							key: 'profession',
							align: 'center',
							width:100
						},
						{
							title: '收入',
							key: 'income',
							align: 'center',
							width:100
						},
						{
							title: '积分',
							key: 'integral',
							align: 'center',
							width:100
						},
						{
							title: '密码',
							key: 'pwd',
							align: 'center',
							width:100
						},
						{
							title: '创建时间',
							key: 'cTime',
							align: 'center',
							width:100
						},
						{
							title: '消费金额',
							key: 'consumptionSum',
							align: 'center',
							width:100
						},
				],
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
					name: "商品管理"
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: window.http + '/member',
					arg:{
						store:null
					},
					columns: [{
							title: '门店ID',
							key: 'storeId',
							align: 'center',
						},
						{
							title: '员工名称',
							key: 'staffName',
							align: 'center',
						},
						{
							title: '会员数量',
							key: 'memberCount',
							align: 'center',
						},
						{
							title: '销售金额',
							key: 'consumptionSum',
							align: 'center',
						},
						{
							title: '员工ID',
							key: 'staffId',
							align: 'center',
						},
						{
							title: '操作',
							key: 'action',
							width: 200,
							align: 'center',
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
												this.show_vipInfo(params.row.memberId)
											}
										}
									}, '查看信息'),
								]);
							}
						}
					]
				},
			}

		},
		methods: {
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
			show_vipInfo(id){
				this.modal_checkInfo = true
				console.log(id)
				this.$http({
					method: 'post',
					url: window.http + '/member/selectMemberById',
					data:{
					  "memberId":id
					}
				}).then((res) => {
						console.log(res.data)
						this.vipInfo = res.data.data
				});		
				this.$http({
					method: 'post',
					url: window.http + '/member/selectGoodsByMemberId',
					data:{
					  "memberId":id,
					  "start":"1",
					  "length":"10"
					}
				}).then((res) => {
						console.log(res.data)
						this.table_consumeInfo = res.data.data
				});	
			},
			row_dblclick(row){
				console.log(row)
				this.modal_detailCentralReturnOrder = true
				
//				row.storeStockOrderId
				this.$http({
					method: 'post',
					url: window.http + '/member/getMemberDetails',
					data:{
						"storeId":row.storeId
					}
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						this.table_detail = res.data.data
						for(let i=0;i<res.data.data.length;i++){
						}
					}
				});
			},
			up_integralSet(){
				
			},
			show_integralSet(){
				this.modal_integralSet = true
			},
			up_groupSend(){
				this.$http({
					method: 'post',
					url: window.http + '/member/sendOutMessage',
					data: this.arg_groupSend
				}).then((res) => {
					console.log(res)
					this.$Message.info(res.data.msg)
				});
			},
			show_groupSend(){
				console.log(window.selectTree)
					if(window.selectTree.length){
						this.modal_groupSend = true
						this.arg_groupSend.storeId = this.tableInfo.arg.storeId
					}else{
						this.$Message.info('请先在左侧选择门店!')
					}
				
			},
			pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
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
					console.log(1,res)
					if(res.status==200){
						this.data_table = res.data.data
						this.total = res.data.recordsTotal
						this.memberSum = res.data.memberSum
						this.memberCount = res.data.count
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
			font: 12px/36px "";
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
				font: 18px/40px "";
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
				top: 205px;
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
	.v-row{
		font: 16px/30px '';
		text-align: center;
	}
	.label{
		width:100px;
		display: inline-block;
	    text-align: right;
	    font: 14px/32px '';
	}
</style>