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
					<Button type="success" size="small" shiro:hasPermission="/users/add"  @click="show_groupSend">群发</Button>
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
					<Table size="small" border :columns="tableInfo.columns" :data="data_table"></Table>
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
				modal_groupSend:false,
				arg_groupSend:{
				  "userId":"1",
				  "storeId": 16,
				  "content":" "
				},
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
					name: "商品管理"
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: window.http + '/member',
					columns: [{
							title: '门店ID',
							key: 'storeId',
							align: 'center',
							width: 100
						},
						{
							title: '员工名称',
							key: 'staffName',
							align: 'center',
							width: 100
						},
						{
							title: '会员数量',
							key: 'memberCount',
							align: 'center',
							width: 100
						},
						{
							title: '销售金额',
							key: 'consumptionSum',
							align: 'center',
							width: 100
						},
						{
							title: '员工',
							key: 'staffId',
							align: 'center',
							width: 100
						},
						{
							title: '型号',
							key: 'modelNumber',
							align: 'center',
							width: 100
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
							width: 100
						},
					]
				},
			}

		},
		methods: {
			up_groupSend(){
				this.$http({
					method: 'post',
					url: window.http + '/member/sendOutMessage',
					data: this.arg_groupSend
				}).then((res) => {
					console.log(res)
				});
			},
			show_groupSend(){
				this.modal_groupSend = true
				
			},
			pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
        	},
			down_table(){
				this.$http({
					method: 'post',
					url: this.tableInfo.url,
					data:{
					   "storeId": 16
					}
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
</style>