<template>
	<div id="index">
		<div id="sideBar">
			<div class="logo">快车道系统</div>
			<Menu @on-select="onSelectItem" theme="dark" :active-name="activeName" accordion style="width:100%"><!--:open-names="['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18']"-->
				<Submenu name="1">
					<template slot="title">
						<Icon type="ios-paper"></Icon>
						商品管理
					</template>
					<MenuItem name="1-1">商品管理</MenuItem>
					<MenuItem name="1-2" shiro:hasPermission="/roles/add">品牌管理</MenuItem>
				</Submenu>
				<Submenu name="2">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						门店管理
					</template>
					<MenuItem name="2-1">门店管理</MenuItem>
				</Submenu>
				<Submenu name="3">
					<template slot="title">
						<Icon type="stats-bars"></Icon>
						巡店管理
					</template>
					<MenuItem name="3-1">巡店统计查询</MenuItem>
					<MenuItem name="3-2">巡店查询</MenuItem>
				</Submenu>
				<Submenu name="4">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						员工管理
					</template>
					<MenuItem name="4-1">员工管理</MenuItem>
					<MenuItem name="4-2">职位管理</MenuItem>
				</Submenu>
				<Submenu name="5">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						考勤管理
					</template>
					<MenuItem name="5-1">日打卡记录</MenuItem>
					<MenuItem name="5-2">月考勤统计</MenuItem>
					<!--<MenuItem name="5-3">考勤设置</MenuItem>-->
				</Submenu>
				<Submenu name="6">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						审批管理
					</template>
					<MenuItem name="6-1">审批管理</MenuItem>
				</Submenu>
				<Submenu name="7">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						任务管理
					</template>
					<MenuItem name="7-1">任务管理</MenuItem>
				</Submenu>
				<Submenu name="8">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						会员管理
					</template>
					<MenuItem name="8-1">会员查询</MenuItem>
				</Submenu>
				<Submenu name="9">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						进货管理
					</template>
					<MenuItem name="9-1">门店进货查询</MenuItem>
					<MenuItem name="9-2">门店退货查询</MenuItem>
					<MenuItem name="9-3">总仓进货单</MenuItem>
					<MenuItem name="9-4">总仓退货单</MenuItem>
					<MenuItem name="9-5">总仓订单管理</MenuItem>
				</Submenu>
				<Submenu name="10">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						销售管理
					</template>
					<MenuItem name="10-1">门店销售单查询</MenuItem>
					<MenuItem name="10-2">门店销售退货单查询</MenuItem>
					<MenuItem name="10-3">品牌销售明细</MenuItem>
					<MenuItem name="10-4">门店销售明细</MenuItem>
					<MenuItem name="10-5">员工销售明细</MenuItem>
				</Submenu>
				<Submenu name="11">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						库存管理
					</template>
					<MenuItem name="11-1">门店库存查询</MenuItem>
					<MenuItem name="11-2">门店库存盘点</MenuItem>
					<MenuItem name="11-3">总仓库存查询</MenuItem>
					<MenuItem name="11-4">总仓库存盘点</MenuItem>
				</Submenu>
				<Submenu name="12">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						综合报表
					</template>
					<MenuItem name="12-1">门店利润查询</MenuItem>
					<MenuItem name="12-2">商品利润查询</MenuItem>
					<MenuItem name="12-3">进销存查询</MenuItem>
					<MenuItem name="12-4">区域综合报表</MenuItem>
				</Submenu>
				<Submenu name="13">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						工资管理
					</template>
					<MenuItem name="13-1">管理员工资模板</MenuItem>
					<MenuItem name="13-2">普通员工工资模板</MenuItem>
					<MenuItem name="13-3">工资查询</MenuItem>
					<!--<MenuItem name="13-4">工资设置</MenuItem>-->
				</Submenu>
				<Submenu name="14">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						安全报警
					</template>
					<MenuItem name="14-1">总仓库存报警</MenuItem>
					<MenuItem name="14-2">门店库存报警</MenuItem>
					<MenuItem name="14-3">员工生日报警</MenuItem>
					<MenuItem name="14-4">会员生日报警</MenuItem>
					<MenuItem name="14-5">门店未销售报警</MenuItem>
					<MenuItem name="14-6">商品保质期报警</MenuItem>
					<MenuItem name="14-7">巡店报警</MenuItem>
					<MenuItem name="14-8">未盘点商品报警</MenuItem>
				</Submenu>
				<Submenu name="15">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						促销管理
					</template>
					<MenuItem name="15-1">活动申请列表</MenuItem>
					<MenuItem name="15-2">活动销售查询</MenuItem>
					<MenuItem name="15-3">促销商品</MenuItem>
				</Submenu>
				<Submenu name="16">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						供应商管理
					</template>
					<MenuItem name="16-1">供应商管理</MenuItem>
				</Submenu>
				<Submenu name="17">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						权限管理
					</template>
					<MenuItem name="17-1">管理员管理</MenuItem>
					<MenuItem name="17-2">角色管理</MenuItem>
				</Submenu>
				<Submenu name="18">
					<template slot="title">
						<Icon type="ios-people"></Icon>
						钱流管理
					</template>
					<MenuItem name="18-1">支出</MenuItem>
					<MenuItem name="18-2">收入</MenuItem>
					<MenuItem name="18-3">费用设置</MenuItem>
				</Submenu>
			</Menu>
		</div>
		<div class="all-right">
			<div id="header"></div>
			<router-view :name='vRouter' id="viewMain" @changeName="changeActiceName"></router-view>
		</div>

	</div>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				activeName:'1-1',
				vRouter: 'manageGoods',
				time: '',
			}
		},
		mounted(){
			window.vThis = this			
			
		},
		beforeCreate() {},
		methods: {
			changeActiceName(data){
				this.activeName = data
			},
			onSelectItem(name) {
				console.log(name)
				switch(name) {
					case '1-1':this.vRouter = 'manageGoods'
						break;
					case '1-2':this.vRouter = 'manageBrand'
						break;
					case '2-1':this.vRouter = 'manageShop'
						break;
					case '3-1':this.vRouter = 'manageShopVisit'
						break;	
					case '3-2':this.vRouter = 'manageShopVisitQuery'
						break;	
					case '4-1':this.vRouter = 'manageEmployee'
						break;	
					case '4-2':this.vRouter = 'managerPosition'
						break;	
					case '5-1':this.vRouter = 'managePunchCard'
						break;	
					case '5-2':this.vRouter = 'manageMonthAttendance'
						break;
					case '6-1':this.vRouter = 'manageExamineApprove'
						break;
					case '7-1':this.vRouter = 'manageTask'
						break;
					case '8-1':this.vRouter = 'manageVipQuery'
						break;	
					case '9-1':this.vRouter = 'manageShopStockQuery'
						break;	
					case '9-2':this.vRouter = 'manageShopReturnQuery'
						break;	
					case '9-3':this.vRouter = 'manageCentralStock'
						break;		
					case '9-4':this.vRouter = 'manageCentralReturn'
						break;	
					case '9-5':this.vRouter = 'manageCentralOrder'
						break;	
					case '10-1':this.vRouter = 'manageShopSell'
						break;
					case '10-2':this.vRouter = 'manageShopSellReturn'
						break;
					case '10-3':this.vRouter = 'manageBrandSellDetail'
						break;
					case '10-4':this.vRouter = 'manageShopSellDetail'
						break;
					case '10-5':this.vRouter = 'manageEmployeeSellDetail'
						break;
					case '11-1':this.vRouter = 'manageShopStore'
						break;
					case '11-2':this.vRouter = 'manageShopStoreCheck'
						break;
					case '11-3':this.vRouter = 'manageCentralStore'
						break;
					case '13-1':this.vRouter = 'manageWage'
						break;
					case '13-2':this.vRouter = 'manageWage2'
						break;
					case '13-3':this.vRouter = 'manageWageSearch'
						break;
					case '15-1':this.vRouter = 'manageCampaign'
						break;
					case '15-2':this.vRouter = 'manageCampaignSell'
						break;
					case '15-3':this.vRouter = 'manageCampaignGoods'
						break;
					case '16-1':this.vRouter = 'manageSupplier'
						break;	
					case '17-1':this.vRouter = 'manageAdmin'
						break;
					case '17-2':this.vRouter = 'manageRole'
						break;
					case '18-1':this.vRouter = 'manageExpense'
						break;
					case '18-2':this.vRouter = 'manageIncome'
						break;
					case '18-3':this.vRouter = 'manageExpenseSet'
						break;
				}
			},
		}
	}
</script>
<style lang="less" scoped>
	#index {
		height: 100%;
		background: #eee;
		#sideBar {
			height: 100%;
			width: 10%;
			float: left;
			background: rgb(54, 62, 79);
			.logo {
				font: 20px/60px "";
				color: #fff;
				padding-top: 20px;
			}
		}
		.all-right {
			height: 100%;
			float: left;
			width: 90%;
		}
		#header {
			width: 100%;
			height: 50px;
			background: rgb(54, 62, 79);
			top: 0;
		}
		#viewMain {
			/*margin-top: 50px;*/
			float: left;
		}
	}
</style>