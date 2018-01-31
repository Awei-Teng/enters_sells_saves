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
						
						
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
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
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">待巡店门店数:</span>
					<span v-text="countYes" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">已巡店门店数:</span>			
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
            	data_table:[],
            	total:null,
			    countNo: '',
			    countYes: '',
			    modal_detail:false,
			    patrolStoreContent:'',
            	treeInfo:{
            		url: window.http + '/store/region_classfy?userId=1',
            	},
            	tableInfo: {
					name: '巡店查询',
					search: 0,
					url: window.http + '/patrol_store/list',
					columns: [
						{
							title: '巡店id',
							key: 'patrolStoreId',
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
							title: '巡店人ID',
							key: 'staffId',
							align: 'center',
							width:100
						},
						{
							title: '巡店时间',
							key: 'patrolStoreTime',
							align: 'center',
							width:100,
						},
						{
							title: '巡店内容',
							key: 'patrolStoreContent',
							align: 'center',
							width:120,
							render: (h, params) => {
		                            return h('div', [
		                                h('a', {
		                                    props: {
		                                        type: 'primary',
		                                        size: 'small'
		                                    },
		                                    style: {
		                                        marginRight: '5px'
		                                    },
		                                    on: {
		                                        click: () => {
		                                        	this.modal_detail = true
		                                            this.patrolStoreContent = params.row.patrolStoreContent
		                                        }
		                                    }
		                                }, '点击查看详情'),
		                        ]);
		                    }
						},
						{
							title: '巡店照片',
							key: 'patrolStoreImgurl',
							align: 'center',
							width:100
						},
						{
							title: '巡店描述',
							key: 'patrolStoreRemake',
							align: 'center',
							width:100
						},
						{
							title: '评分',
							key: 'grade',
							align: 'center',
							width:100
						},
						{
							title: '巡店签到时间',
							key: 'patrolStoreSigninTime',
							align: 'center',
							width:120
						},
						{
							title: '巡店签退时间',
							key: 'patrolStoreSignoutTime',
							align: 'center',
							width:120
						},{
							title: '巡店状态',
							key: 'patrolStoreStatus',
							align: 'center',
							width:100
						},
						{
							title: '巡店人名字',
							key: 'staffName',
							align: 'center',
							width:100
						},
						{
							title: '巡店人手机',
							key: 'staffPhone',
							align: 'center',
							width:150
						},{
							title: '开始时间',
							key: 'startTime',
							align: 'center',
							width:100
						},{
							title: '结束时间',
							key: 'endTime',
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
	                                        type: 'error',
	                                        size: 'small'
	                                    },
	                                    style: {
	                                        marginRight: '5px'
	                                    },
	                                    on: {
	                                        click: () => {
	                                        }
	                                    }
	                                }, '删除（无接口）'),
	                        ]);
	                    }
	                   }
					]
				}
            }
        },
        methods:{
			pageCange(val){
        		console.log(val)
        	},
			down_table(){
				this.$http({
					method: 'get',
					url: this.tableInfo.url,
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
							
							this.countYes = res.data.countYes
							this.countNo = res.data.countNo
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