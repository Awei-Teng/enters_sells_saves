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

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">时间范围:</span>
					<DatePicker v-model="tableInfo.arg.xTime" size="small" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">单类型:</span>
					<Select v-model="tableInfo.arg.xType" style="width: 200px;padding:0 12px" size="small" clearable>
				        <Option v-for="item in orderTypeList" :value="item.value">{{ item.label }}</Option>
				    </Select>
					<Button type="info" size="small" @click="btn_query">查询</Button>
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
		<Modal width='800' v-model="modal_detail" title="查看详情">
			<Table size="small" border :columns="dataDetail_columns" :data="dataDetail_table"></Table>
			<!--<Page :total="modalTotal" @on-change="modalPageCange" style="text-align: center;margin: 20px;"></Page>-->
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
		data() {
			return {
				data_table:[],
            	total:null,
            	modalTotal:null,
            	modal_detail:false,
            	dataDetail_table:[],
			    dataDetail_columns:[
			    		{
							title: '商品id',
							key: 'goodsId',
							align: 'center',
							width:100
						},
						{
							title: '盘点前数量',
							key: 'beforeNumber',
							align: 'center',
							width:100
						},
						{
							title: '盘点数量',
							key: 'checkNumber',
							align: 'center',
							width:100
						},
						{
							title: '盘盈成本金额',
							key: 'profitCostMoney',
							align: 'center',
							width:120
						},
						{
							title: '盘盈售价金额',
							key: 'profitSaleMoney',
							align: 'center',
							width:120
						},
						{
							title: '盘亏售价金额',
							key: 'lossSaleMoney',
							align: 'center',
							width:120
						},
						{
							title: '盘亏成本金额',
							key: 'lossCostMoney',
							align: 'center',
							width:120
						},
						{
							title: '盘点状态',
							key: 'state',
							align: 'center',
							width:100
						},
						{
							title: '品牌名称',
							key: 'brandName',
							align: 'center',
							width:100
						},
						{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
							width:100
						},
						{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
							width:100
						},
						{
							title: '型号',
							key: 'modelNumber',
							align: 'center',
							width:100
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
							width:100
						},
						{
							title: '单位',
							key: 'unit',
							align: 'center',
							width:100
						},
						{
							title: '盘盈盘亏数量',
							key: 'changeNumber',
							align: 'center',
							width:120
						},
						{
							title: '盈亏金额',
							key: 'changeMoney',
							align: 'center',
							width:100
						},
					],
				arg_edit: {
					"storeId": "1",
					"storeName": "2",
					"contacts": "12",
					"storePhone": "21",
					"storeTelephone": "21",
					"regionId": "21",
					"storeDirector": "12",
					"staffNumber": "21",
					"storeClassifyId": "12",
					"storeAddress": "12",
					"longitudeLatitude": "21",
					"storeStatus": "21",
					"brandNumber": "21",
					"repertoryAlarmUpperlimit": "21",
					"repertoryAlarmLowlimit": "12",
					"profitPattern": "12",
					"profitType": "21",
					"rebate": "12",
					"brandIds": "2,5,6,7,8,9",
					"type":1
				},
				profitTypeList: [
                    {
                        value: 1,
                        label: '私营'
                    },{
                        value: 2,
                        label: '联营'
                    }
                ],
                orderTypeList: [
                    {
                        value: 0,
                        label: '报溢单'
                    },{
                        value: 1,
                        label: '报损单'
                    }
                ],
				modal_edit: false,
				treeInfo: {
					url: window.http + '/stock/company_list',
				},
				tableInfo: {
					name: '门店管理',
					search: 0,
					url: window.http + '/inventory/store_inventory_check_order',
					arg:{
						'companyId':null,
						'checkOrder':null,
						'beginDate':null,
						'endDate':null,
						'containProfitOrder':null,
						'containLossOrder':null,
						"xTime":[],
						"xType":null
					},
					columns: [{
							title: '盘点单据',
							key: 'checkOrder',
							align: 'center',
							width: 200
						},
						{
							title: '盘点前数量',
							key: 'beforeNumber',
							align: 'center',
							width: 150
						},
						{
							title: '盘点数量',
							key: 'checkNumber',
							align: 'center',
							width: 100
						},
						{
							title: '盘点时间',
							key: 'cTime',
							align: 'center',
							width: 180
						},
						{
							title: '盘盈成本金额',
							key: 'profitCostMoney',
							align: 'center',
							width: 120
						},
						{
							title: '盘盈售价金额',
							key: 'profitSaleMoney',
							align: 'center',
							width: 120
						},
						{
							title: '盘亏成本金额',
							key: 'lossCostMoney',
							align: 'center',
							width: 120
						},
						{
							title: '盘亏售价金额',
							key: 'lossSaleMoney',
							align: 'center',
							width: 120
						},
						{
							title: '存放单位',
							key: 'staffName',
							align: 'center',
							width: 100
						},
						{
							title: '门店id',
							key: 'storeId',
							align: 'center',
							width: 120,
						},
						{
							title: '门店名称',
							key: 'storeName',
							align: 'center',
							width: 100
						},
						{
							title: '合计盘盈/盘亏成本金额',
							key: 'totalCostMoney',
							align: 'center',
							width: 120
						},
						{
							title: '合计盘盈/盘亏售价金额',
							key: 'totalSaleMoney',
							align: 'center',
							width: 120
						},
						{
							title: '是否包含盘盈记录',
							key: 'containProfitOrder',
							align: 'center',
							width: 120
						},
						{
							title: '是否包含盘亏记录',
							key: 'containLossOrder',
							align: 'center',
							width: 110
						},
						{
							title: '盘点单id',
							key: 'checkId',
							align: 'center',
							width: 110
						},{
							title: '操作',
							key: 'action',
							width: 150,
							align: 'center',
							fixed: 'right',
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
												
												this.show_detail(params.row.checkId)
											}
										}
									}, '查看')
								]);
							}
						}
					]
				},
				arg_add:{
					"storeName":null,
					"contacts":"1",
					"storePhone":"1",
					"storeTelephone":"1",
					"regionOneId":"1",
					"regionTwoId":"1",
					"regionThreeId":"1",
					"regionFourId":"1",
					"regionFiveId":"1",
					"storeDirector":"1",
					"staffNumber":"1",
					"storeClassifyId":"1",
					"storeAddress":"1",
					"longitudeLatitude":"1",
					"storeStatus":"1",
					"brandNumber":"1",
					"repertoryAlarmUpperlimit":"1",
					"repertoryAlarmLowlimit":"1",
					"profitPattern":"1",
					"profitType":"1",
					"rebate":"1",
					"brandIds":"2,5,6,7,8,9"
				
				}
			}
		},
		methods: {
			up_query(obj){
				if(obj.length>0){
					this.tableInfo.arg.companyId = obj[0].companyId
				}
				this.down_table()
			},
			show_detail(id){
				this.modal_detail = true
				this.$http({
					method: 'post',
					url: window.http + "/inventory/store_inventory_check_order_show",
					data:{
					    "checkId":id,
					    "goodsId":null,
					    "brandId":null,
					    "state":null,
					}
				}).then((res) => {
					if(res.status==200){
						console.log(res.data.data)
						this.dataDetail_table = res.data.data
						this.modalTotal = res.data.recordsTotal
					}
					
				});
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
			btn_query(){
				if(this.tableInfo.arg.xTime[0]){
					this.tableInfo.arg.beginDate = bus.time(this.tableInfo.arg.xTime[0],'no:')
					this.tableInfo.arg.endDate = bus.time(this.tableInfo.arg.xTime[1],'no:')
				}else{
					this.tableInfo.arg.beginDate = null
					this.tableInfo.arg.endDate =  null
				}
				if(this.tableInfo.arg.xType==0){
					this.tableInfo.arg.containProfitOrder = 1
					this.tableInfo.arg.containLossOrder = 0
				}else if(this.tableInfo.arg.xType==1){
					this.tableInfo.arg.containLossOrder = 1
					this.tableInfo.arg.containProfitOrder = 0
				}else{
					this.tableInfo.arg.containLossOrder = 0
					this.tableInfo.arg.containProfitOrder = 0
				}
				this.down_table()
				
			},
			pageCange(val){
				console.log(val)
				this.tableInfo.url = window.http + '/store?start='+val+'&length=10'
				this.down_table()
        		
        	},
        	modalPageCange(val){
        		console.log(val)
        		this.modal_start = val
        		this.show_detail()
        	},
			down_table(){
				if(!this.tableInfo.arg.companyId){
					this.$Message.info('请在左侧选择分公司！')
					return;
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