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
			<div class="serach" style="margin-top:12px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>门店查询列表</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">实际销售金额:</span>
					<span v-text="actuaSalesMoney" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">毛利率:</span>			
					<span v-text="proportion" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">月计划销售额:</span>			
					<span v-text="salesMoney" style="color: red;padding-left: 20px;"></span>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">毛利:</span>			
					<span v-text="grossProfit" style="color: red;padding-left: 20px;"></span>
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
			<Page :total="modalTotal" @on-change="modalPageCange" style="text-align: center;margin: 20px;"></Page>
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
            	brandIdList:[],
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
			    actuaSalesMoney: '',
			    proportion: '',
			    salesMoney: '',
			    grossProfit: '',
			    modal_detail:false,
			    patrolStoreContent:'',
			    dataDetail_table:[],
			    dataDetail_columns:[
			    		{
							title: '价格',
							key: 'sellPrice',
							align: 'center',
						},
						{
							title: '数量',
							key: 'sellNumber',
							align: 'center',
						},
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
							title: '品牌名称',
							key: 'brandName',
							align: 'center',
						},
					],
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	tableInfo: {
					name: '巡店查询',
					search: 0,
					url: window.http + '/sell_record/query_salesVolume_pc',
					arg:{
					    "storeId":null,
					    "brandId":null,
					    "startTime":null,
					},
					columns: [
						{
							title: '订单号',
							key: 'brandId',
							align: 'center',
							width:100
						},
						{
							title: '数量',
							key: 'brandName',
							align: 'center',
							width:100,
						},
						{
							title: '金额',
							key: 'salesNumber',
							align: 'center',
							width:100
						},
						{
							title: '销售形式',
							key: 'salesAmountp',
							align: 'center',
							width:100
						},
						{
							title: '创建时间',
							key: 'purchaseMoney',
							align: 'center',
							width:100
						},
						{
							title: '门店名称',
							key: 'retreatNumber',
							align: 'center',
							width:100,
						},
						{
							title: '销售员工',
							key: 'retreatMoney',
							align: 'center',
							width:100
						},
						{
							title: '会员名称',
							key: 'supermarketRebateMoney',
							align: 'center',
							width:100
						},
						{
							title: '会员编号',
							key: 'grossProfit',
							align: 'center',
							width:100
						},
						
						{
							title: '创建时间',
							key: 'proportion',
							align: 'center',
							width:100
						},
						{
							title: '门店名称',
							key: 'returnMoney',
							align: 'center',
							width:100,
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
        	show_detail(){
        		this.modal_detail = true
        		this.$http({
					method: 'get',
					url: window.http + '/sell_record/sell_record_return_detail?storeWarnId='+this.now_id+"&start="+this.modal_start+"&length=10",
				}).then((res) => {
					if(res.status==200){
						console.log(res.data.data)
						this.dataDetail_table = res.data.data
						this.modalTotal = res.data.recordsTotal
					}
					
				});
        	},
        	modalPageCange(val){
        		console.log(val)
        		this.modal_start = val
        		this.show_detail()
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
					console.log(2,res)
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
							return item;
						});
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
							
							this.actuaSalesMoney = res.data.actuaSalesMoney.toFixed(2)
							this.proportion = res.data.proportion.toFixed(2)
							this.salesMoney = res.data.salesMoney.toFixed(2)
							this.grossProfit = res.data.grossProfit.toFixed(2)
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