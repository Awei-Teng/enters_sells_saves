﻿<template>
	<div class="box">
		    <Breadcrumb class="crumb" separator=">">
		        <BreadcrumbItem href="/">
		            <Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
		        </BreadcrumbItem>
		        <BreadcrumbItem href="/">商品管理</BreadcrumbItem>
		        <BreadcrumbItem>商品管理</BreadcrumbItem>
		    </Breadcrumb>
		    <div class="thisName">
		    	<span>商品管理a </span>
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
						
						
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span><Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input><Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span><Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input><Button type="success" size="small">添加商品</Button>				
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
    </div>
</template>
<!--宽高在这里写-->
<script>
	import moduleTree from '../components/module_tree'
	import moduleTable from '../components/module_table'
    export default {
		components: {
			moduleTree,
			moduleTable,
		},
		/*        {
            "countId": 1,
            "storeId": 15,
            "patrolStoreId": 1,
            "noPatrolStore": 1,
            "yesPatrolStore": 0,
            "storeAddress": "杭州市",
            "storeName": "桂林吴彦祖专门店",
            "patrolStoreStatus": null,
            "cTime": null
        },*/
        data () {
            return {
            	data_table:[],
            	total:null,
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	tableInfo: {
					name: '门店管理',
					search: 0,
					url: window.http + '//patrol_store/count?start=1&length=10',
					columns: [
						{
							title: '门店ID',
							key: 'storeId',
							align: 'center',
						},
						{
							title: '巡店任务ID',
							key: 'patrolStoreId',
							align: 'center',
						},
						{
							title: '未巡店',
							key: 'noPatrolStore',
							align: 'center',
						},
						{
							title: '已巡店',
							key: 'yesPatrolStore',
							align: 'center',
						},
						{
							title: '门店地址',
							key: 'storeAddress',
							align: 'center',
						},
						{
							title: '门店名称',
							key: 'storeName',
							align: 'center',
						},
						{
							title: '巡店状态',
							key: 'patrolStoreStatus',
							align: 'center',
						},{
	                        title: '操作',
	                        key: 'action',
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
	                                            this.bt_assign_roles(params.row)
	                                        }
	                                    }
	                                }, '编辑'),
	                                h('Button', {
	                                    props: {
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                            this.bt_Enabled(params.row.id)
	                                        }
	                                    }
	                                }, '删除')
	                        ]);
	                    }
	                   }
					]
				}
            }
        },
        methods:{
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
			pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
        	},
			down_table(){
				this.$http({
					method: 'get',
					url: this.tableInfo.url,
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
						if(this.tableInfo.name == "员工管理"){
							this.data_table = res.data.data.list
							this.total = res.data.total
						}else{
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
						}
						console.log('tableData',res.data.data)
						if(this.tableInfo.name == "巡店查询"){
							this.countYes = res.data.countYes
							this.countNo = res.data.countNo
						}
					}
					
				});

			}
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
			    top: 105px;
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