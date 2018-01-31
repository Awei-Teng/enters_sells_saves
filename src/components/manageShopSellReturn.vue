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
						
						
					
				    <span style="font:12px/32px 'microsoft yahei';padding-left:10px">单据号:</span>
				    	<Input v-model="tableInfo.arg.sellOrder" placeholder="请输入单据号..." style="width: 100px;" size="small"></Input>
				     <span style="font:12px/32px 'microsoft yahei';padding-left:10px">会员编号:</span>
				    	<Input v-model="tableInfo.arg.member" placeholder="请输入会员编号..." style="width: 100px;" size="small"></Input>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:10px">会员名称:</span>
				    	<Input v-model="tableInfo.arg.memberName" placeholder="请输入会员名称..." style="width: 100px;" size="small"></Input>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:10px">销售员工:</span>
				    	<Input v-model="tableInfo.arg.staffName" placeholder="请输入销售员工..." style="width: 100px;" size="small"></Input>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:10px">销售形式:</span>
				    	<Select v-model="tableInfo.arg.type" style="width: 100px;padding:0 6px" size="small" clearable>
					        <Option v-for="item in typeList" :value="item.value">{{ item.label }}</Option>
					    </Select>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:10px">时间:</span>
				    <Date-picker v-model="arg_xtime" type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期和时间（不含秒）" style="width: 200px" size="small"></Date-picker>
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
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">销售量:</span>
					<span v-text="countStockNumber" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">销售总金额:</span>			
					<span v-text="countStockMoney" style="color: red;padding-left: 20px;"></span>
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
            	arg_xtime:[],
            	now_id:null,
            	total:null,
            	modal_start:1,
			    countStockNumber: '',
			    countStockMoney: '',
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
					url: window.http + '/sell_record/sell_record_return_list',
					arg:{
					    "start":"1",
					    "length":"20",
					    "storeId":null,
					    "startTime":null,
					    "endTime":null,
					    "sellOrder":null,
					    "member":null,
					    "memberName":null,
					    "staffName":null,
					    "type":1
					},
					columns: [
						{
							title: '订单号',
							key: 'sellOrder',
							align: 'center',
							width:100
						},
						{
							title: '数量',
							key: 'number',
							align: 'center',
							width:100,
						},
						{
							title: '金额',
							key: 'money',
							align: 'center',
							width:100
						},
						{
							title: '销售形式',
							key: 'type',
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
							title: '门店名称',
							key: 'storeName',
							align: 'center',
							width:100,
						},
						{
							title: '销售员工',
							key: 'staffName',
							align: 'center',
							width:100
						},
						{
							title: '会员名称',
							key: 'memberName',
							align: 'center',
							width:100
						},
						{
							title: '会员编号',
							key: 'member',
							align: 'center',
							width:100
						},
						{
	                        title: '操作',
	                        key: 'action',
	                        width: 300,
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
	                                        	this.now_id = params.row.sellReturnId
	                                        	this.show_detail()
	                                        	
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
        	up_search(){
        		if(this.arg_xtime[0]){
					this.tableInfo.arg.startTime = bus.time(this.arg_xtime[0]).split(' ')[0]
					this.tableInfo.arg.endTime = bus.time(this.arg_xtime[1]).split(' ')[0]
				}else{
					this.tableInfo.arg.startTime = null
					this.tableInfo.arg.endTime = null
				}
				this.down_table()
        	},
        	up_query(obj){
				if(obj.length>0){
					this.tableInfo.arg.storeId = obj[0].storeId
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
							
							this.countStockMoney = res.data.count.countStockMoney
							this.countStockNumber = res.data.count.countStockNumber
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