<template>
			<!--<router-view :name='vRouter' id="viewMain"></router-view>-->
			<div class="box">
				<Breadcrumb class="crumb" separator=">">
					<BreadcrumbItem href="/">
						<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
					</BreadcrumbItem>
					<BreadcrumbItem href="/">权限管理</BreadcrumbItem>
					<BreadcrumbItem>管理员管理</BreadcrumbItem>
				</Breadcrumb>
				<div class="thisName">
					<span>管理员管理</span>
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
							<span style="font:12px/32px 'microsoft yahei';padding-left:10px">审核类型:</span>
							 <Select v-model="tableInfo.arg.aType" style="width:180px" size="small">
						        <Option v-for="item in aTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
							<span style="font:12px/32px 'microsoft yahei';padding-left:10px">日期:</span>
							<DatePicker v-model="tableInfo.arg.arrTime" type="daterange" placeholder="Select date" style="width: 200px" size="small"></DatePicker>
							
							<span style="font:12px/32px 'microsoft yahei';padding-left:20px">申请人:</span>
							<Input v-model="tableInfo.arg.staffName"  placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
							<span style="font:12px/32px 'microsoft yahei';padding-left:20px">审核人:</span>
							<Input v-model="tableInfo.arg.auditorName"  placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
							<Button type="info" size="small" @click="btn_query" style="margin-right:12px">查询</Button>
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
		
		<Modal width='500' v-model="modal_detail_vacate" title="请假详情">
			<span style="padding-left: 30px;padding-right: 8px;">申请人： </span><span style="padding-right: 20px;">{{data_detail_vacate.clockView.staffName}}</span>
			<span>发起时间：</span><span style="padding-right: 20px;">{{data_detail_vacate.clockView.cTime}}</span>
			<span>审核状态：</span><span>{{data_detail_vacate.clockView.xapplyStatus}}</span></br></br>
			<Form ref="data_detail_vacate" :model="data_detail_vacate" :label-width="90">
				<Form-item label="开始时间">
					<Input v-model="data_detail_vacate.applyLeave.startTime" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="结束时间">
					 <Input v-model="data_detail_vacate.applyLeave.endTime" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="请假天数">
					<Input v-model="data_detail_vacate.applyLeave.applyDays" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="出差事由">
					 <Input v-model="data_detail_vacate.applyLeave.leaveContent" type="textarea" :rows="4" placeholder="请输入出差事由"></Input>
				</Form-item>
				<Form-item label="审核人意见">
					<Input v-model="data_detail_vacate.clockView.applyOpinion" type="textarea" :rows="4" placeholder="请输入审核人意见"></Input>
				</Form-item>
			</Form>
			<Steps :current="data_detail_vacate.clockView.applyStatus" direction="vertical" style="margin-left: 20px;">
		        <Step :title="data_detail_vacate.clockView.staffName+' 已提交上级'" :content="data_detail_vacate.clockView.cTime"></Step>
		        <Step :title="data_detail_vacate.clockView.staffName + data_detail_vacate.clockView.xapplyStatus+' '" :content="data_detail_vacate.clockView.aPplyAuditorTime"></Step>
		    </Steps>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
		<Modal width='500' v-model="modal_detail_buka" title="补卡详情">
			<span style="padding-left: 30px;padding-right: 8px;">申请人： </span><span style="padding-right: 20px;">{{data_detail_buka.clockView.staffName}}</span>
			<span>发起时间：</span><span style="padding-right: 20px;">{{data_detail_buka.clockView.cTime}}</span>
			<span>审核状态：</span><span>{{data_detail_buka.clockView.xapplyStatus}}</span></br></br>
			<Form ref="data_detail_buka" :model="data_detail_buka" :label-width="90">
				<Form-item label="补卡时间">
					<Input v-model="data_detail_buka.applyFillCard.fTime" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="补卡内容">
					 <Input v-model="data_detail_buka.applyFillCard.fContent" type="textarea" :rows="4" placeholder="请输入出差事由"></Input>
				</Form-item>
				<Form-item label="审核人意见">
					<Input v-model="data_detail_buka.clockView.applyOpinion" type="textarea" :rows="4" placeholder="请输入审核人意见"></Input>
				</Form-item>
			</Form>
			<Steps :current="data_detail_buka.clockView.applyStatus" direction="vertical" style="margin-left: 20px;">
		        <Step :title="data_detail_buka.clockView.staffName+' 已提交上级'" :content="data_detail_buka.clockView.cTime"></Step>
		        <Step :title="data_detail_buka.clockView.staffName + data_detail_buka.clockView.xapplyStatus+' '" :content="data_detail_buka.clockView.aPplyAuditorTime"></Step>
		    </Steps>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
				<Modal width='500' v-model="modal_detail_wuliao" title="物料详情">
			<span style="padding-left: 30px;padding-right: 8px;">申请人： </span><span style="padding-right: 20px;">{{data_detail_wuliao.clockView.staffName}}</span>
			<span>发起时间：</span><span style="padding-right: 20px;">{{data_detail_wuliao.clockView.cTime}}</span>
			<span>审核状态：</span><span>{{data_detail_wuliao.clockView.xapplyStatus}}</span></br></br>
			<Form ref="data_detail_wuliao" :model="data_detail_wuliao" :label-width="90" v-for="(item,index) in data_detail_wuliao.applyMateriels" label-position="left" style="margin-left: 20px;">
				<span style="font:700 14px/32px ''">物品明细({{index+1}})</span>
				<Form-item label="物品名称：" style="height: 12px;">
					<span>{{item.mName}}</span>
				</Form-item>
				<Form-item label="数量：" style="height: 12px;">
					<span>{{item.mSum}}</span>
				</Form-item>
				<Form-item label="物品用途：" style="height: 12px;">
					<span>{{item.mRemake}}</span>
				</Form-item>
			</Form>
			<Steps :current="data_detail_wuliao.clockView.applyStatus" direction="vertical" style="margin-left: 20px;">
		        <Step :title="data_detail_wuliao.clockView.staffName+' 已提交上级'" :content="data_detail_wuliao.clockView.cTime"></Step>
		        <Step :title="data_detail_wuliao.clockView.staffName + data_detail_wuliao.clockView.xapplyStatus+' '" :content="data_detail_wuliao.clockView.aPplyAuditorTime"></Step>
		    </Steps>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
		<Modal width='500' v-model="modal_detail_baoxiao" title="报销详情">
			<span style="padding-left: 30px;padding-right: 8px;">申请人： </span><span style="padding-right: 20px;">{{data_detail_baoxiao.clockView.staffName}}</span>
			<span>发起时间：</span><span style="padding-right: 20px;">{{data_detail_baoxiao.clockView.cTime}}</span>
			<span>审核状态：</span><span>{{data_detail_wuliao.clockView.xapplyStatus}}</span></br></br>
			<Form ref="data_detail_baoxiao" :model="data_detail_baoxiao" :label-width="90" v-for="(item,index) in data_detail_baoxiao.applyReimburses" label-position="left" style="margin-left: 20px;">
				<span style="font:700 14px/32px ''">报销明细({{index+1}})</span>
				<Form-item label="报销金额：" style="height: 12px;">
					<span>{{item.rMoney}}</span>
				</Form-item>
				<Form-item label="报销类型：" style="height: 12px;">
					<span>{{item.typeName}}</span>
				</Form-item>
				<Form-item label="费用明细：" style="height: 12px;">
					<span>{{item.rContent}}</span>
				</Form-item>
				<img :src="now" v-for="(now,index) in item.rImgUrl" style="width: 120px;margin-left: 20px;"/>
			</Form>
			<Steps :current="data_detail_baoxiao.clockView.applyStatus" direction="vertical" style="margin-left: 20px;">
		        <Step :title="data_detail_baoxiao.clockView.staffName+' 已提交上级'" :content="data_detail_baoxiao.clockView.cTime"></Step>
		        <Step :title="data_detail_baoxiao.clockView.staffName + data_detail_baoxiao.clockView.xapplyStatus+' '" :content="data_detail_baoxiao.clockView.aPplyAuditorTime"></Step>
		    </Steps>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
			</div>
			
</template>
<!--宽高在这里写-->
<script>
	import moduleTable from '../components/module_table'
	export default {
		components: {
			moduleTable,
		},
		data() {
			return {
				data_table:[],
            	total:null,
				modal_addBrand: false,
				modal_detail_vacate: false,
				modal_detail_buka: false,
				modal_detail_wuliao: false,
				modal_detail_baoxiao: false,
				modal_edit: false,
				aTypeList:[{
					value:1,
					label:"请假"
				},{
					value:2,
					label:"补卡"
				},{
					value:3,
					label:"物料"
				},{
					value:4,
					label:"报销"
				}],
				data_detail_vacate:{
					"applyLeave":{},
					"clockView":{}
				},
				data_detail_buka:{
					"clockView":{},
					"applyFillCard":{}
				},
				data_detail_baoxiao:{
					"clockView":{},
					"applyReimburses":{}
				},
				data_detail_wuliao:{
					"clockView":{},
					"applyMateriels":[]
				},
				tableInfo: {
					name: '管理员管理',
					search: 0,
					url: window.http + "/apply_clock_controller/apply_clock_details_list",
					arg:{
					    "start":"1",
					    "length":"10",
					     "cTime":null,
					     "andTime":null,
					     "staffName":null,
					     "auditorName":null,
					     "aType":null,
					     "arrTime":[]
					},
					columns: [{
							title: '编号',
							key: 'applyClockId',
							align: 'center'
						},
						{
							title: '创建时间',
							key: 'cTime',
							align: 'center'
						},
						{
							title: '申请人',
							key: 'staffName',
							align: 'center'
						},
						{
							title: '审核人',
							key: 'auditorName',
							align: 'center'
						},{
							title: '审核状态',
							key: 'applyStatus',
							align: 'center'
						},{
							title: '审核结果',
							key: 'applyState',
							align: 'center'
						},{
							title: '审核类型',
							key: 'aType',
							align: 'center'
						}, {
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
												if(params.row.aType=='请假'){
													this.show_detail(1,params.row.applyClockId)
												}else if(params.row.aType=='补卡'){
													this.show_detail(2,params.row.applyClockId)
												}else if(params.row.aType=='物料'){
													this.show_detail(3,params.row.applyClockId)
												}else if(params.row.aType=='报销'){
													this.show_detail(4,params.row.applyClockId)
												}
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
		methods: {
			show_detail(type,id){
				if(type==1){
					this.modal_detail_vacate = true
				}else if(type==2){
					this.modal_detail_buka = true
				}else if(type==3){
					this.modal_detail_wuliao = true
				}else if(type==4){
					this.modal_detail_baoxiao = true
				}
				this.$http({
					method: 'get',
					url: window.http + '/apply_clock_controller/apply_clock_details_id?aPplyClockId='+id,
				}).then((res) => {
					if(res.status==200){
						if(res.data.clockView.applyStatus==1){
							res.data.clockView.xapplyStatus = ' 待审核'
						}else{
							res.data.clockView.xapplyStatus = ' 已审核'
						}
						if(type==1){
							this.data_detail_vacate.applyLeave = res.data.applyLeave
						    this.data_detail_vacate.clockView = res.data.clockView
						}else if(type==2){
							this.data_detail_buka.applyFillCard = res.data.applyFillCard
					   		this.data_detail_buka.clockView = res.data.clockView
						}else if(type==3){
							this.data_detail_wuliao.applyMateriels = res.data.applyMateriels
					   		this.data_detail_wuliao.clockView = res.data.clockView
						}else if(type==4){
							for(let i=0;i<res.data.applyReimburses.length;i++){
								res.data.applyReimburses[i].rImgUrl = res.data.applyReimburses[i].rImgUrl.split(',')
							}
							
							this.data_detail_baoxiao.applyReimburses = res.data.applyReimburses
					   		this.data_detail_baoxiao.clockView = res.data.clockView
					   		
						}
					    
					}
					
				});
			},
			btn_query(){
				if(this.tableInfo.arg.arrTime.length==2){
					this.tableInfo.arg.cTime = this.timer(this.tableInfo.arg.arrTime[0])
					this.tableInfo.arg.andTime = this.timer(this.tableInfo.arg.arrTime[1])
					this.down_table()
				}else{
					this.down_table()
				}
			},
			timer(time) {
				function two(num){
					if(num<10){
						return '0'+num;
					}else{
						return num;
					}
				}
				let timec = new Date(time)
				let year = timec.getFullYear()
				let month = timec.getMonth() + 1
				let day = timec.getDate()
				let hours = timec.getHours()
				let minutes = timec.getMinutes()
				let seconds = timec.getSeconds()
				
				month = two(month);
				day = two(day);
				hours = two(hours);
				minutes = two(minutes);
				seconds = two(seconds);
				let timer = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
				return timer;
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
					console.log(res)
					if(res.status==200){
						for(let i=0;i<res.data.data.length;i++){
							/*审核类型(1,请假,2补卡,3物料,4报销)*/
							if(res.data.data[i].aType==1){
								res.data.data[i].aType = '请假'
							}else if(res.data.data[i].aType==2){
								res.data.data[i].aType = '补卡'
							}else if(res.data.data[i].aType==3){
								res.data.data[i].aType = '物料'
							}else if(res.data.data[i].aType==4){
								res.data.data[i].aType = '报销'
							}
							if(res.data.data[i].applyStatus==1){
								res.data.data[i].applyStatus = ' 待审核'
							}else{
								res.data.data[i].applyStatus = ' 已审核'
							}
							if(res.data.data[i].applyState==1){
								res.data.data[i].applyState = '通过'
							}else{
								res.data.data[i].applyState = '未通过'
							}
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
			font: 12px/36px 'microsoft yahei';
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
				font: 18px/40px 'microsoft yahei';
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
			width: 96%;
			float: left;
			margin: 0 2%;
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
</style>