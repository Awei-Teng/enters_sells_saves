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
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">品牌:</span>
				    <Select v-model="tableInfo.arg.brandId" style="width: 200px;padding:0 12px" size="small" clearable>
				        <Option v-for="item in brandIdList" :value="item.brandId">{{ item.brandName }}</Option>
				    </Select>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:20px">时间:</span>
				     <Date-picker v-model="arg_xtime"  type="date" placeholder="选择日期" style="width: 200px" size="small"></Date-picker>
					<Button type="info" @click="up_search">查询</Button>
					<!--<Button type="success" size="small">添加商品</Button>-->				
				</div>
			</div>		
			<div class="serach" style="margin-top:12px;height: 240px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>门店查询列表</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">实际销售金额:</span>
					<span v-text="actualNumber" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">销量:</span>			
					<span v-text="actualSales" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">月计划销售额:</span>			
					<span v-text="planSalesVolume" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">毛利:</span>			
					<span v-text="grossProfit" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">毛利率:</span>			
					<span v-text="proportion" style="color: red;padding-left: 20px;"></span>
					</br>
					<Table size="small" border :columns="sale_columns" :data="sale"></Table>
					<Table size="small" border :columns="returngoods_columns" :data="returngoods"></Table>
				</div>
			</div>	
			<div class="table-box">
				<!--<module-table :tableInfo="tableInfo"></module-table>-->
				<div class="module-table">
					<div class="title_icon">
						<span style="width:20px;border-right:1px solid #eee"></span>
						<span class="icon_titile"><Icon type="navicon-round"></Icon></span>
						<span>商品列表</span>
						<Table size="small" border :columns="tableInfo.columns" :data="data_table" @on-row-click="show_detail"></Table>
						<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
					</div>
				</div>
				
			</div>
		</div>
		<Modal width='1250' v-model="modal_detail" title="查看销售单详情">
			<Table size="small" border :columns="dataDetail_columns" :data="dataDetail_table"></Table>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
		<Modal width='1250' v-model="modal_detail2" title="查看退货单详情">
			<Table size="small" border :columns="dataDetail_columns2" :data="dataDetail_table2"></Table>
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
            	data_table:[],
            	modalTotal:null,
            	modalTotal2:null,
            	brandIdList:[],
            	sale_columns:[
			    		{
							title: '销量',
							key: 'sellNumber',
							align: 'center',
						},
						{
							title: '成本',
							key: 'cost',
							align: 'center',
						},
						{
							title: '销售金额',
							key: 'salesAmount',
							align: 'center',
						},
						{
							title: '退货量',
							key: 'returnGoodsNumber',
							align: 'center',
						},
						{
							title: '退货金额',
							key: 'returnGoodsMoney',
							align: 'center',
						},
						{
							title: '优惠金额',
							key: 'discountMoney',
							align: 'center',
						},
						{
							title: '超市返利金额',
							key: 'supermarketRebateMoney',
							align: 'center',
						},
						{
							title: '返还金额',
							key: 'returnMoney',
							align: 'center',
						},
						{
							title: '毛利',
							key: 'grossProfit',
							align: 'center',
						},
						{
							title: '毛利率',
							key: 'proportion',
							align: 'center',
						},
						
            	],
            	returngoods_columns:[
            			{
							title: '销量',
							key: 'sellNumber',
							align: 'center',
						},
						{
							title: '成本',
							key: 'cost',
							align: 'center',
						},
						{
							title: '销售额',
							key: 'salesAmount',
							align: 'center',
						},
						{
							title: '退货数量',
							key: 'returnGoodsNumber',
							align: 'center',
						},
						{
							title: '退货金额',
							key: 'returnGoodsMoney',
							align: 'center',
						},
						{
							title: '退货优惠金额',
							key: 'discountMoney',
							align: 'center',
						},
						{
							title: '退货返利金额',
							key: 'supermarketRebateMoney',
							align: 'center',
						},
						{
							title: '退货返还金额',
							key: 'returnMoney',
							align: 'center',
						},
						{
							title: '销售负毛利',
							key: 'grossProfit',
							align: 'center',
						},
						{
							title: '毛利率',
							key: 'proportion',
							align: 'center',
						},
						
            	],
            	typeList:[{
            		value:1,
            		label:'正常'
            	},{
            		value:2,
            		label:'团购'
            	},{
            		value:3,
            		label:'促销活动'
            	},{
            		value:4,
            		label:'促销商品'
            	}],
            	arg_xtime:null,
            	now_id:null,
            	total:null,
            	modal_start:1,
            	
			    actualSales: '',
			    planSalesVolume: '',
			    actualNumber: '',
			    proportion: '',
			    grossProfit: '',
			    modal_detail:false,
			    modal_detail2:false,
			    patrolStoreContent:'',
			    dataDetail_table:[],
			    dataDetail_table2:[],
			    returngoods:[],
			    sale:[],
			     dataDetail_columns2:[
			    		{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
						},
						{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
						},
						{
							title: '型号',
							key: 'modelNumber',
							align: 'center',
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
						},
						{
							title: '单位',
							key: 'unit',
							align: 'center',
						},
						{
							title: '所属品牌',
							key: 'brandName',
							align: 'center',
						},
//						{
//							title: '销售量',
//							key: 'sellNumber',
//							align: 'center',
//						},
//						{
//							title: '销售金额',
//							key: 'totalPrice',
//							align: 'center',
//						},
						{
							title: '客户',
							key: 'memberName',
							align: 'center',
						},
						{
							title: '促销员',
							key: 'staffName',
							align: 'center',
						},
						{
							title: '所属门店',
							key: 'storeName',
							align: 'center',
						},
						{
							title: '促销时间',
							key: 'cTime',
							align: 'center',
						},
						{
							title: '退货数量',
							key: 'returnNumber',
							align: 'center',
						},
						{
							title: '退货金额',
							key: 'returnMoney',
							align: 'center',
						},
			     ],
			    dataDetail_columns:[
			    		{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
						},
						{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
						},
						{
							title: '型号',
							key: 'modelNumber',
							align: 'center',
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
						},
						{
							title: '单位',
							key: 'unit',
							align: 'center',
						},
						{
							title: '所属品牌',
							key: 'brandName',
							align: 'center',
						},
						{
							title: '销售量',
							key: 'sellNumber',
							align: 'center',
						},
						{
							title: '销售金额',
							key: 'totalPrice',
							align: 'center',
						},
						{
							title: '客户',
							key: 'memberName',
							align: 'center',
						},
						{
							title: '促销员',
							key: 'staffName',
							align: 'center',
						},
						{
							title: '所属门店',
							key: 'storeName',
							align: 'center',
						},
						{
							title: '促销时间',
							key: 'cTime',
							align: 'center',
						},
					],
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	tableInfo: {
					name: '巡店查询',
					search: 0,
					url: window.http + '/sell_record/query_store_sales_details',
					arg:{
					    "storeId":null,
					    "brandId":null,
					    "startTime":null,
					    "start":"1",
  						"length":"10"
					},
					columns: [
						{
							title: '编号ID',
							key: 'sellRecordId',
							align: 'center',
							width:100
						},
						{
							title: '订单号',
							key: 'sellOrder',
							align: 'center',
							width:150,
						},
						{
							title: '单据日期',
							key: 'cTime',
							align: 'center',
							width:200
						},
						{
							title: '客户',
							key: 'customer',
							align: 'center',
							width:100
						},
						{
							title: '销售人员',
							key: 'salesman',
							align: 'center',
							width:150
						},
						{
							title: '出售数量',
							key: 'sellNumber',
							align: 'center',
							width:100,
						},
						{
							title: '成本',
							key: 'cost',
							align: 'center',
							width:100
						},
						{
							title: '销售金额',
							key: 'salesAmount',
							align: 'center',
							width:100
						},
						{
							title: '退货数量',
							key: 'returnGoodsNumber',
							align: 'center',
							width:100
						},
						
						{
							title: '退货金额',
							key: 'returnGoodsMoney',
							align: 'center',
							width:100
						},
						
						{
							title: '优惠金额',
							key: 'discountMoney',
							align: 'center',
							width:100,
						},
						{
							title: '超市返利金额',
							key: 'supermarketRebateMoney',
							align: 'center',
							width:150
						},
						{
							title: '促销活动超市返还金额',
							key: 'returnMoney',
							align: 'center',
							width:200
						},
						{
							title: '毛利润',
							key: 'grossProfit',
							align: 'center',
							width:100
						},
						
						{
							title: '毛利率',
							key: 'proportion',
							align: 'center',
							width:100
						},
//						{
//	                        title: '操作',
//	                        key: 'action',
//	                        width: 300,
//	                        align: 'center',
//	                        render: (h, params) => {
//	                            return h('div', [
//	                                h('Button', {
//	                                    props: {
//	                                        type: 'primary',
//	                                        size: 'small'
//	                                    },
//	                                    style: {
//	                                        marginRight: '5px'
//	                                    },
//	                                    on: {
//	                                        click: () => {
//	                                        	this.now_id = params.row.sellReturnId
//	                                        	this.show_detail()
//	                                        	
//	                                        }
//	                                    }
//	                                }, '查看'),
//	                            ]);
//	                        }
//	                    }
					]
				}
            }
        },
        methods:{
        	up_search(){
        		if(this.arg_xtime){
					this.tableInfo.arg.startTime = bus.time(this.arg_xtime,'no:')
				}else{
					this.tableInfo.arg.startTime = null
				}
				this.down_table()
        	},
        	up_query(obj){
				if(obj.length>0){
					this.tableInfo.arg.storeId = obj[0].storeId
					this.$http({
						method: 'post',
						url: window.http + '/promotionGoods/query_brand_storeId',
						data:{
						    "storeId":obj[0].storeId
						}
					}).then((res) => {
						console.log(2,res)
						if(res.data.state == '00000') {
							this.brandIdList = []
							this.brandIdList = res.data.data
						}
					});
				}
				this.down_table()
			},
        	show_detail(row){
        		if(row.identification=="销售单"){
            		this.modal_detail = true
	        		this.$http({
						method: 'get',
						url: window.http + "/sell_record/query_order_sellRecordId?sellRecordId="+row.sellRecordId,
					}).then((res) => {
						if(res.status==200){
							console.log(res.data.data)
							res.data.data.map(function(item){
								item.cTime = bus.time(item.cTime)
							})
							this.dataDetail_table = res.data.data
							this.modalTotal = res.data.recordsTotal
						}
						
					});    			
        		}else if(row.identification=="退货单"){
        			this.modal_detail2 = true
	        		this.$http({
						method: 'get',
						url: window.http + "/sell_record/query_return_goods_detailed?sellRecordId="+row.sellRecordId,
					}).then((res) => {
						if(res.status==200){
							console.log(res.data.data)
							res.data.data.map(function(item){
								item.cTime = bus.time(item.cTime)
							})
							this.dataDetail_table2 = res.data.data
							this.modalTotal2 = res.data.recordsTotal
						}
						
					}); 
        		}

        	},
			pageCange(val){
        		console.log(val)
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
					console.log(22,res)
					if(res.status==200){
						res.data.data.map(function(item) {
							if(item.type==1){
								item.type = "正常"
							}else if(item.type==2){
								item.type = "团购"
							}else if(item.type==3){
								item.type = "促销活动"
							}else if(item.type==4){
								item.type = "促销商品"
							}
							item.cTime = bus.time(item.cTime)
							for(let x in item){
								if(typeof item[x] == 'number'&&x!='cTime'&&x!='sellRecordId'&&x!='sellNumber'&&x!='returnGoodsNumber'){
									item[x] = item[x].toFixed(2)
								}
							}
							return item;
						});
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
							this.actualNumber = res.data.actualNumber.toFixed(2)//实际销售
							this.grossProfit = res.data.grossProfit.toFixed(2)//毛利
							this.planSalesVolume = res.data.planSalesVolume.toFixed(2)//月计划销售额
							this.proportion = res.data.proportion.toFixed(2)//毛利率
							this.actualSales = res.data.actualSales.toFixed(2)//销量
							
							for(let item in res.data.sale){
								if(typeof res.data.sale[item] == 'number'){
									res.data.sale[item] = res.data.sale[item].toFixed(2)
								}
							}
							for(let item in res.data.returngoods){
								if(typeof res.data.returngoods[item] == 'number'){
									res.data.returngoods[item] = res.data.returngoods[item].toFixed(2)
								}
							}
							this.sale = []
							this.returngoods = []
							this.returngoods.push(res.data.returngoods)
							this.sale.push(res.data.sale)
							
					}
					
				});

			},
        },
        mounted(){
        	this.down_table()
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
			    top: 355px;
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
	.ivu-table-wrapper{
						border: none;
					}
</style>