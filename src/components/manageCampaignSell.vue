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
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input v-model="tableInfo.arg.goodsNumber" placeholder="请输入商品编号..." style="width: 200px;padding:0 12px" size="small"></Input>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">时间区间:</span>
					<Date-picker v-model="arg_xtime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 260px" size="small"></Date-picker>
					<Button type="info" size="small" @click="up_query">查询</Button>
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
	import bus from '../assets/bus.js'
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
				arg_xtime:[],
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: '/promotionGoods/get_promotion_goods_list',
					arg:{
					    "storeId":null,
					    "start":"1",
					    "length":"10",
					    "goodsNumber":null,
					    "startTime":null,
					    "endTime":null,
					},
					columns: [{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
							width: 100
						},
						{
							title: '品牌名称',
							key: 'brandName',
							align: 'center',
							width: 100
						},
						{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
							width: 100
						},
						{
							title: '促销价格',
							key: 'promotionPrice',
							align: 'center',
							width: 100
						},
						{
							title: '超市返利点',
							key: 'rebate',
							align: 'center',
							width: 100
						},
						{
							title: '促销返还点',
							key: 'returnDot',
							align: 'center',
							width: 100
						},
						{
							title: '是否是超低价格',
							key: 'isLowPrice',
							align: 'center',
							width: 100
						},
						{
							title: '开始时间',
							key: 'startTime',
							align: 'center',
							width: 180
						},
						{
							title: '结束时间',
							key: 'endTime',
							align: 'center',
							width: 180
						},
						{
							title: '批发差价',
							key: 'differ',
							align: 'center',
							width: 100
						},
						{
							title: '所属门店',
							key: 'storeName',
							align: 'center',
							width: 100
						},
					]
				},
			}

		},
		methods: {
			up_query(obj){
				if(obj.length>0){
					this.tableInfo.arg.storeId = obj[0].storeId
				}
				if(this.arg_xtime[0]){
					this.tableInfo.arg.startTime = bus.time(this.arg_xtime[0]).split(' ')[0]
					this.tableInfo.arg.endTime = bus.time(this.arg_xtime[1]).split(' ')[0]
				}else{
					this.tableInfo.arg.startTime = null
					this.tableInfo.arg.endTime = null
				}
				if(!this.tableInfo.arg.goodsNumber){
					this.tableInfo.arg.goodsNumber = null
				}
				this.down_table()
			},
			pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
        	},
			down_table(){
				if(!this.tableInfo.arg.storeId){
					this.$Message.info('请在左侧选择门店！')
				}
				this.$http({
					method: 'post',
					url: window.http + this.tableInfo.url,
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(1,res)
					if(res.status==200){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].startTime =bus.time(res.data.data[i].startTime)
							res.data.data[i].endTime =bus.time(res.data.data[i].endTime)
							if(res.data.data[i].isLowPrice==1){
								res.data.data[i].isLowPrice = '不是'
							}else if(res.data.data[i].isLowPrice==2){
								res.data.data[i].isLowPrice = '是'
							}
						}
						this.data_table = res.data.data 
						
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
				top: 100px;
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