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
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="success" size="small">添加商品</Button>				
					 <Date-picker type="daterange" v-model="arg_search.time" :options="options2" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
					<Button type="info" size="small" @click="up_search">查询</Button>
				</div>
			</div>		
			<div class="serach" style="margin-top:12px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>门店查询列表</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">退货量:</span>
					<span v-text="countYes" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">实际退货总金额:</span>			
					<span v-text="countNo" style="color: red;padding-left: 20px;"></span>
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
		<Modal width='400' v-model="modal_check" title="审核">
			<div class="v-row">
				<label for="five" style="font: 14px/32px '';">审核描述 : </label>
				<Input v-model="arg_check.reamke" type="textarea" :rows="4" placeholder="请输入..."></Input>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_check(2)">通过</Button>
				<Button type="info" size='large' @click="up_check(3)">不通过</Button>
			</div>
		</Modal>
		<Modal width='1000' v-model="modal_detailStoreReturnOrder" title="门店退货单详情">
			<Table size="small" border :columns="columns_detail" :data="table_detail"></Table>
			<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
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
        data () {
            return {
            	modal_check:false,
            	modal_detailStoreReturnOrder:false,
            	now_id:'',
            	data_table:[],
            	arg_search:{
            		time:[]
            	},
            	arg_check:{
				  "orderId":null,
				  "reamke":"",
				  "reamkeStaus":""
				},
            	total:null,
			    countNo: '',
			    countYes: '',
			    table_detail:[],
			    /*        {
            "detailId": null,
            "storeStockReturnId": null,
            "goodsId": null,
            "number": 1,
            "price": 1,
            "goodsName": "哈哈",
            "brandName": "品牌名称",
            "spec": "1",
            "goodsNumber": "12456",
            "modelNumber": "1",
            "returnTime": 1512377712000
        },*/
				columns_detail:[{
							title: '退货单详情Id',
							key: 'detailId',
							align: 'center',
							width:100
						},
						{
							title: '门店退货Id',
							key: 'storeStockReturnId',
							align: 'center',
							width:100
						},
						{
							title: '商品Id',
							key: 'goodsId',
							align: 'center',
							width:100
						},
						{
							title: '数量',
							key: 'number',
							align: 'center',
							width:100
						},
						{
							title: '价格',
							key: 'price',
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
							title: '品牌名称',
							key: 'brandName',
							align: 'center',
							width:100
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
							width:100
						},{
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
							title: '退货名称',
							key: 'returnTime',
							align: 'center',
							width:100
						},
				],
			    options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	/*
            	         {
            "storeStockReturnId": 1,
            "storeId": null,
            "returnOrder": "2564684651",
            "adminid": null,
            "returnTime": "2017-12-04 08:55",
            "staffId": null,
            "returnNumber": 123,
            "returnMoney": 23,
            "status": 1,
            "remake": "1",
            "startTime": null,
            "endTime": null,
            "staffName": "甲桂林2",
            "storeName": null,
            "name": "总公司",
            "start": null,
            "length": null,
            "storeStockReturnDetailVo": null
        }*/
            	tableInfo: {
					name: '巡店查询',
					search: 0,
					url: window.http + '/stock/store_return_list',
					arg:{
						"storeId":null,
						"start":1,
						"length": 10
					},
					columns: [
						{
							title: '门店退货订单id',
							key: 'storeStockReturnId',
							align: 'center',
							width:100
						},
						{
							title: '门店ID',
							key: 'storeId',
							align: 'center',
							width:100
						},
						{
							title: '退货订单号',
							key: 'returnOrder',
							align: 'center',
							width:100
						},
						{
							title: '管理员Id',
							key: 'adminid',
							align: 'center',
							width:100
						},
						{
							title: '退货时间',
							key: 'returnTime',
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
							title: '退货数量',
							key: 'returnNumber',
							align: 'center',
							width:100
						},
						{
							title: '退货金额',
							key: 'returnMoney',
							align: 'center',
							width:100
						},
						{
							title: '状态',
							key: 'status',
							align: 'center',
							width:120
						},
						{
							title: '备注',
							key: 'remake',
							align: 'center',
							width:120
						},{
							title: '开始时间',
							key: 'startTime',
							align: 'center',
							width:100
						},
						{
							title: '结束时间',
							key: 'endTime',
							align: 'center',
							width:100
						},
						{
							title: '员工名称',
							key: 'staffName',
							align: 'center',
							width:150
						},{
							title: '门店名称',
							key: 'storeName',
							align: 'center',
							width:100
						},{
							title: '姓名',
							key: 'name',
							align: 'center',
							width:100
						},{
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
	                                            this.bt_check(params.row.orderId)
	                                        }
	                                    }
	                                }, '审核'),
	                        ]);
	                    }
	                   }
					]
				}
            }
        },
        methods:{
        	up_query(obj){
				if(obj.length){
					console.log('adf',obj)
					if(obj[0].storeId){
						this.tableInfo.arg.storeId = obj[0].storeId
						this.down_table()
					}
				}else{
					this.down_table()
				}
			},
        	row_dblclick(row){
				console.log(row)
				this.modal_detailStoreReturnOrder = true
				
//				row.storeStockOrderId
				this.$http({
					method: 'get',
					url: window.http + '/stock/store_return_detail?storeStockReturnId='+row.storeStockReturnId,
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						this.table_detail = res.data.data
						for(let i=0;i<res.data.data.length;i++){
						}
					}
				});
			},
        	up_check(num){
        		this.arg_check.reamkeStaus = num
        		this.$http({
					method: 'post',
					url: window.http +'/stock/check',
					data: this.arg_check,
				}).then((res)=> {
					console.log(res)
					if(res.data.state=="00000"){
						this.$Message.info("审核成功！")
						this.modal_check = false
					}
				});
        	},
        	bt_check(id){
        		this.modal_check = true
        		this.arg_check.orderId = id
        		
        	},
        	up_search(){
        		console.log('search_time',this.arg_search.time)
        	},
			test(){
				console.log('lala')
//				this.$http({
//					method: 'post',
//					url: window.http + '/login',
//					data: {
//						"username": "admin",
//						"password":"admin"
//					}
//				}).then(function(response) {
//					console.log(response)
//				});
				
				ajax({
					type: "post",
					url: window.http + '/login',
					data: JSON.stringify({
						"username": "admin",
						"password":"admin"
					}),
					headers: {
              		  "Content-Type": "application/json;charset=UTF-8"
         		    },
					success: function(res) {
						console.log(res)
					}
				})
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
					console.log(res)
					if(res.status==200 &&res.data.data.length &&res.data.count){
						
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
							
							this.countYes = res.data.count.countStockNumber
							this.countNo = res.data.count.countStockMoney
					}else{
						this.data_table = []
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