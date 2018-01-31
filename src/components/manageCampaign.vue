<template>
	<div class="box">
		<Breadcrumb class="crumb" separator=">">
			<BreadcrumbItem href="/">
				<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
			</BreadcrumbItem>
			<BreadcrumbItem href="/">促销管理</BreadcrumbItem>
			<BreadcrumbItem>促销管理</BreadcrumbItem>
		</Breadcrumb>
		<div class="thisName">
			<span>促销管理</span>
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

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">活动开始时间区间:</span>
					<Date-picker v-model="arg_startTime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 260px" size="small"></Date-picker>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">活动结束时间区间:</span>
					<Date-picker v-model="arg_endTime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 260px" size="small"></Date-picker>
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
					<!--<Table size="small" border :columns="tableInfo.columns" :data="data_table"></Table>-->
					<el-table
					    :data="data_table"
					    border
					    size="mini"
					    style="width: 100%">
					    <el-table-column prop="activityId" label="编号"></el-table-column>
					    <el-table-column prop="storeName" label="所属门店"></el-table-column>
					    <el-table-column prop="brandName" label="品牌名称"></el-table-column>
					    <el-table-column prop="startTime" label="开始时间" width="150"></el-table-column>
					    <el-table-column prop="endTime" label="结束时间" width="150"></el-table-column>
					    
					      <el-table-column label="地址" align="center">
					        <el-table-column prop="salesAmount" label="计划"></el-table-column>
					        <el-table-column prop="salesAmountActual" label="实际"></el-table-column>
					        <el-table-column prop="profit" label="毛利润"></el-table-column>
					        <el-table-column prop="proportion" label="占比（%）" width="90"></el-table-column>
					      </el-table-column>
					      <el-table-column label="场地面积" align="center">
					        <el-table-column prop="floorSpace" label="计划"></el-table-column>
					        <el-table-column prop="floorSpaceActual" label="实际"></el-table-column>
					      </el-table-column>
					      <el-table-column label="费用" align="center">
					        <el-table-column prop="cost" label="计划"></el-table-column>
					        <el-table-column prop="costActual" label="实际"></el-table-column>
					        <el-table-column prop="costProportion" label="占比（%）" width="90"></el-table-column>
					      </el-table-column>
					      <el-table-column label="工资" align="center">
					        <el-table-column prop="wages" label="计划"></el-table-column>
					        <el-table-column prop="wagesActual" label="实际"></el-table-column>
					        <el-table-column prop="wagesProportion" label="占比（%）" width="90"></el-table-column>
					      </el-table-column>
					      <el-table-column label="人员" align="center">
					        <el-table-column prop="people" label="计划"></el-table-column>
					        <el-table-column prop="peopleActual" label="实际"></el-table-column>
					      </el-table-column>
					      <el-table-column prop="activityProfit" label="活动毛利"></el-table-column>
					      <el-table-column prop="executorName" label="执行人"></el-table-column>
					          <el-table-column fixed="right" label="操作" align="center">
							      <template slot-scope="scope">
							      	<Button @click="show_info(scope.row.activityId)" type="success" size='small'>查看</Button>
							        <Button @click="btn_check(scope.row)" type="success" size='small'>通过</Button>
							      </template>
							  </el-table-column>
					  </el-table>
					<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
				</div>
			</div>
			</div>
		</div>
		<Modal width='1200' v-model="modal_info" title="群发">
		<Table size="small" border :columns="dataDetail_columns" :data="dataDetail_table" height="300"></Table>
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
				memberSum:"",
				memberCount:"",
				data_table:[],
				dataDetail_table:[],
				arg_startTime:[],
				arg_endTime:[],
            	total:null,
				modal_info:false,
				dataDetail_columns:[{
							title: '类型',
							key: 'name',
							align: 'center',
							width:200
						},
						{
							title: '计划',
							key: 'sales',
							align: 'center',
							width:160
						},
						{
							title: '实际',
							key: 'actual',
							align: 'center',
							width:160
						},
						{
							title: '实际/计划占比',
							key: 'proportion',
							align: 'center',
							width:160
						},
						{
							title: '说明',
							key: 'remake',
							align: 'center',
							width:486
						},
					],
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
					name: "商品管理",
					
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: window.http + '/promotional/get_promotional_event_list',
					arg:{
					    "storeId":"15",
					    "start":"1",
					    "length":"10",
					    "startTime":null,
					    "endTime":null,
					    "activityStartTime":null,
					    "activityEndTime":null,
					},
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
			show_info(id){
				this.modal_info = true
				this.$http({
					method: 'post',
					url: window.http + '/promotional/get_promotionalEvent_id_pc',
					data: {
					    "activityId":id
					}
				}).then((res) => {
					if(res.status==200){
						console.log(res.data.data)
						this.dataDetail_table = []

					this.dataDetail_table.push(
							{
								"name":"个洗柜组促销",
								"sales":res.data.data.supermarketWashCounterSales,
								"actual":res.data.data.supermarketWashCounterActual,
								"proportion":res.data.data.supermarketWashCounterSalesProportion,
								"remake":res.data.data.supermarketWashCounterSalesExplain
							},
							{
								"name":"个护柜组促销",
								"sales":res.data.data.supermarketCounterSales,
								"actual":res.data.data.supermarketCounterActual,
								"proportion":res.data.data.supermarketCounterSalesProportion,
								"remake":res.data.data.supermarketCounterSalesExplain
							},
							{
								"name":"销售金额",
								"sales":res.data.data.salesAmount,
								"actual":res.data.data.salesAmountActual,
								"proportion":res.data.data.salesAmountProportion,
								"remake":res.data.data.salesAmountExplain
							},
							{
								"name":"场地面积",
								"sales":res.data.data.floorSpace,
								"actual":res.data.data.floorSpaceActual,
								"proportion":res.data.data.floorSpaceProportion,
								"remake":res.data.data.floorSpaceExplain
							},
							{
								"name":"门店费用",
								"sales":res.data.data.storeCost,
								"actual":res.data.data.storeCostActual,
								"proportion":res.data.data.storeCostProportion,
								"remake":res.data.data.storeCostExplain
							},
							{
								"name":"住宿费用",
								"sales":res.data.data.putUpCost,
								"actual":res.data.data.putUpCostActual,
								"proportion":res.data.data.putUpCostProportion,
								"remake":res.data.data.putUpCostExplain
							},
							{
								"name":"交通费用",
								"sales":res.data.data.trafficCost,
								"actual":res.data.data.trafficCostActual,
								"proportion":res.data.data.trafficCostProportion,
								"remake":res.data.data.trafficCostExplain
							},
							{
								"name":"广告费用",
								"sales":res.data.data.advertisingCost,
								"actual":res.data.data.advertisingCostActual,
								"proportion":res.data.data.advertisingCostProportion,
								"remake":res.data.data.advertisingCostExplain
							},
							{
								"name":"活动物料费用",
								"sales":res.data.data.activityMaterialCost,
								"actual":res.data.data.activityMaterialActual,
								"proportion":res.data.data.activityMaterialCostProportion,
								"remake":res.data.data.activityMaterialCostExplain
							},
							{
								"name":"其他费用",
								"sales":res.data.data.otherCost,
								"actual":res.data.data.otherCostActual,
								"proportion":res.data.data.otherCostProportion,
								"remake":res.data.data.otherCostExplain
							},
							{
								"name":"占比费用",
								"sales":res.data.data.costProportion,
								"actual":res.data.data.costProportionActual,
								"proportion":res.data.data.totalCostProportion,
								"remake":res.data.data.costProportionExplain
							},
							{
								"name":"短促工资",
								"sales":res.data.data.briefnessSalary,
								"actual":res.data.data.briefnessSalaryActual,
								"proportion":res.data.data.briefnessSalaryProportion,
								"remake":res.data.data.briefnessSalaryExplain
							},
							{
								"name":"外援工资",
								"sales":res.data.data.aidSalary,
								"actual":res.data.data.aidSalaryActual,
								"proportion":res.data.data.aidSalaryProportion,
								"remake":res.data.data.aidSalaryExplain
							},
							{
								"name":"住店工资",
								"sales":res.data.data.inHotelSalary,
								"actual":res.data.data.inHotelSalaryActual,
								"proportion":res.data.data.inHotelSalaryProportion,
								"remake":res.data.data.inHotelSalaryExplain
							},
							{
								"name":"其它人员工资",
								"sales":res.data.data.otherPersonnelSalary,
								"actual":res.data.data.otherPersonnelSalaryActual,
								"proportion":res.data.data.otherPersonnelSalaryProportion,
								"remake":res.data.data.otherPersonnelSalaryExplain
							},
							{
								"name":"工资占比",
								"sales":res.data.data.salaryProportion,
								"actual":res.data.data.salaryProportionActual,
								"proportion":res.data.data.totalSalaryProportion,
								"remake":res.data.data.salaryProportionExplain
							},
							{
								"name":"短促人员",
								"sales":res.data.data.briefnessCrew,
								"actual":res.data.data.briefnessCrewActual,
								"proportion":res.data.data.briefnessCrewProportion,
								"remake":res.data.data.briefnessCrewExplain
							},
							{
								"name":"短促人员",
								"sales":res.data.data.aidCrew,
								"actual":res.data.data.aidCrewActual,
								"proportion":res.data.data.aidCrewProportion,
								"remake":res.data.data.aidCrewExplain
							},
							{
								"name":"住店人员",
								"sales":res.data.data.inHotelCrew,
								"actual":res.data.data.inHotelCrewActual,
								"proportion":res.data.data.inHhotelCrewProportion,
								"remake":res.data.data.inHotelCrewExplain
							},
							{
								"name":"其它人员",
								"sales":res.data.data.otherCrew,
								"actual":res.data.data.otherCrewActual,
								"proportion":res.data.data.otherCrewProportion,
								"remake":res.data.data.otherCrewExplain
							},
						)
					}
					
				});
			},
			btn_query(){
				if(this.arg_startTime[0]){
					this.tableInfo.arg.startTime = bus.time(this.arg_startTime[0])
					this.tableInfo.arg.endTime = bus.time(this.arg_startTime[1])
				}else{
					this.tableInfo.arg.startTime = null
					this.tableInfo.arg.endTime = null
				}
				if(this.arg_endTime[0]){
					this.tableInfo.arg.activityStartTime = bus.time(this.arg_endTime[0])
					this.tableInfo.arg.activityEndTime = bus.time(this.arg_endTime[1])
				}else{
					this.tableInfo.arg.activityStartTime = null
					this.tableInfo.arg.activityEndTime = null
				}
				console.log(this.tableInfo.arg.startTime)
				this.down_table()
			},
			btn_check(){
				
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
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(1,res)
					if(res.status==200){
						
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].startTime = bus.time(res.data.data[i].startTime)
							res.data.data[i].endTime = bus.time(res.data.data[i].endTime)
						}
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
	.v-row{
		font: 16px/30px '';
		text-align: center;
	}
</style>