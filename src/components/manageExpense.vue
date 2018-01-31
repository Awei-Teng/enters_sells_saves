<template>
	<div class="box">
		<Breadcrumb class="crumb" separator=">">
			<BreadcrumbItem href="/">
				<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
			</BreadcrumbItem>
			<BreadcrumbItem href="/">钱流管理</BreadcrumbItem>
			<BreadcrumbItem>支出管理</BreadcrumbItem>
		</Breadcrumb>
		<div class="thisName">
			<span>支出管理</span>
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
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">员工名称:</span>
					<Input v-model="tableInfo.arg.staffName" placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">状态:</span>
					 <Select v-model="tableInfo.arg.moneyFlowsStatus" style="width:200px" size="small">
				        <Option v-for="item in moneyFlowsStatusList" :value="item.value">{{ item.label }}</Option>
				    </Select>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:20px">时间范围:</span>
				    <Date-picker v-model="tableInfo.arg.xtime" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" size="small"></Date-picker>
					<Button type="info" size="small" @click="bt_query">查询</Button>
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
		<Modal width='800' v-model="modal_detail" title="详情">
			<Form ref="data_detail" :model="data_detail" :label-width="90">
				<Row>
					<Col span="12">
						<Form-item label="发布人">
							<Input v-model="data_detail.staffName" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="创建时间">
							<Input v-model="data_detail.cTime" placeholder="请输入考勤时长"></Input>
						</Form-item>
						<Form-item label="状态">
							<Input v-model="data_detail.moneyFlowsStatus" placeholder="请输入应出勤天数"></Input>
						</Form-item>
						<Form-item label="项目类型名称">
							<Input v-model="data_detail.typeName" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="所属门店">
							<Input v-model="data_detail.storeName" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="审批时间">
							<Input v-model="data_detail.uTime" placeholder="请输入公司地址"></Input>
						</Form-item>
					</Col>
					<Col span="12">
						<Form-item label="金额">
							<Input v-model="data_detail.money" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="描述">
							<Input v-model="data_detail.remake" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="审批意见">
							<Input v-model="data_detail.auditOpinion" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="缴费人">
							<Input v-model="data_detail.moneyName" placeholder="请输入公司地址"></Input>
						</Form-item>
						<Form-item label="审批人">
							<Input v-model="data_detail.checkName" placeholder="请输入公司地址"></Input>
						</Form-item>
					</Col>
				</Row>


			</Form>
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
	import moduleTable from '../components/module_table'
	export default {
		components: {
			moduleTree,
			moduleTable,
		},
		data() {
			return {
				data_table:[],
            	total:null,
            	modal_detail:false,
            	data_detail:{},
				moneyFlowsStatusList: [
                    {
                        value: '',
                        label: '空'
                    },{
                        value: 1,
                        label: '待审核'
                    },{
                        value: 2,
                        label: '审核通过'
                    },{
                        value: 3,
                        label: '审核通过'
                    },
				 ],
				goodsClassifyList: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }],
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
					name: "商品管理"
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: window.http + '/money_flows/moneyFlows_list',
					arg:{
					    "storeId":null,
					    "type":"2",
					    "staffName":null,
					    "moneyFlowsStatus":null,
					    "startTime":null,
					    "endTime":null,
					    "xtime":[]
					},
					columns: [
//						{
//							title: '编号',
//							key: 'moneyFlowsId',
//							align: 'center',
//							width: 100
//						},
//						{
//							title: '项目类型编号',
//							key: 'moneyFlowsType',
//							align: 'center',
//							width: 100
//						},
//						{
//							title: '标题',
//							key: 'moneyFlowsTitle',
//							align: 'center',
//							width: 100
//						},
						{
							title: '金额',
							key: 'money',
							align: 'center',
							width: 120
						},
						{
							title: '员工名称',
							key: 'staffName',
							align: 'center',
							width: 100
						},
						{
							title: '门店名称',
							key: 'storeName',
							align: 'center',
							width: 100
						},
						{
							title: 'checkName',
							key: 'storeName',
							align: 'center',
							width: 100
						},
						{
							title: '描述',
							key: 'remake',
							align: 'center',
							width: 100
						},
						{
							title: '审核人编号',
							key: 'check',
							align: 'center',
							width: 100
						},
						{
							title: '状态',
							key: 'moneyFlowsStatus',
							align: 'center',
							width: 100
						},
						{
							title: '类型',
							key: 'type',
							align: 'center',
							width: 100
						},
						{
							title: '发布人编号',
							key: 'staffId',
							align: 'center',
							width: 100
						},
						{
							title: '门店编号',
							key: 'storeId',
							align: 'center',
							width: 100
						},
						{
							title: '申请时间',
							key: 'cTime',
							align: 'center',
							width: 180
						},
						{
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
	                                        	this.up_detail(params.row.moneyFlowsId)
	                                        }
	                                    }
	                                }, '详情'),
	                        ]);
	                    }
	                   }
					]
				},
			}

		},
		methods: {
			up_detail(id){
				this.modal_detail = true
				this.$http({
					method: 'post',
					url: window.http + '/app/money_flows/money_flows_id',
					data:{
					    "moneyFlowsId":id
					}
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						this.data_detail =res.data.data
					}
					
				});
			},
			bt_query(){
				this.down_table()
				if(this.tableInfo.arg.xtime.length[0]){
					this.tableInfo.arg.startTime = this.timer(this.tableInfo.arg.xtime[0])
					this.tableInfo.arg.endTime = this.timer(this.tableInfo.arg.xtime[1])
				}else{
					this.tableInfo.arg.startTime = null
					this.tableInfo.arg.endTime = null
				}
				
				console.log(this.tableInfo.arg.xtime)
				
			},
			up_query(obj){
				this.tableInfo.arg.storeId = obj[0].storeId
				this.down_table()
			},
			timer(time) {
				let timec = new Date(time)
				const year = timec.getFullYear()
				const month = timec.getMonth() + 1
				const day = timec.getDate()
				const hours = timec.getHours()
				const minutes = timec.getMinutes()
				const seconds = timec.getSeconds()
			
				let timer = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
				return timer;
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
					url: this.tableInfo.url,
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(res)
					if(res.status==200){
//						状态 1待审核 2 审核通过 3审核不过
						for(let i=0;i<res.data.data.length;i++){
							
							switch(res.data.data[i].moneyFlowsStatus){
								case 1:res.data.data[i].moneyFlowsStatus = "待审核";
									break;
								case 2:res.data.data[i].moneyFlowsStatus = "审核通过";
									break;
								case 3:res.data.data[i].moneyFlowsStatus = "审核不通过";
									break;
							}
							res.data.data[i].cTime = this.timer(res.data.data[i].cTime)

						}
							this.data_table = res.data.data
							console.log('this.data_table',this.data_table)
							this.total = res.data.recordsTotal
					}
					
				});

			},
			goods_tree(res){
				let vdata = res.data.data
				let list1 = []
				let list2 = []
				let list3 = []
				let list4 = []
				let list5 = []
				for(let i=0;i<vdata.length;i++){
					if(vdata[i].grade ==1){}
					switch(vdata[i].grade){
						case 1:list1.push(vdata[i])
							break;
						case 2:list2.push(vdata[i])
							break;	
						case 3:list3.push(vdata[i])
							break;
						case 4:list4.push(vdata[i])
							break;
						case 5:list5.push(vdata[i])
							break;
					}
				}
				let arr = [{
						value: 0,
						label: '全部',
						children: []
					}]
					
					for(let i=0;i<list1.length;i++){
						arr[0].children.push({
							value: list1[i].classifyId,
							label: list1[i].classifyName,
							classifyId:list1[i].classifyId,
							children: []
						})
						for(let j=0;j<list2.length;j++){
							if(list2[j].superiorId == arr[0].children[i].classifyId){
								
								arr[0].children[i].children.push({
									value: list2[j].classifyId,
									label: list2[j].classifyName,
									classifyId:list2[j].classifyId,
									children: [],
								})
							}
						}
					}
					for(let a=0;a<arr.length;a++){
						for(let b=0;b<arr[a].children.length;b++){
							for(let c=0;c<arr[a].children[b].children.length;c++){
								for(let d=0;d<list3.length;d++){
									if(arr[a].children[b].children[c].classifyId == list3[d].superiorId){
										
										arr[a].children[b].children[c].children.push({
											value: list3[d].classifyId,
											label: list3[d].classifyName,
											classifyId:list3[d].classifyId,
											children: [],
										})
									}
									
								}
								
							}
						}
					}
					for(let a=0;a<arr.length;a++){
						for(let b=0;b<arr[a].children.length;b++){
							for(let c=0;c<arr[a].children[b].children.length;c++){
								for(let d=0;d<arr[a].children[b].children[c].children.length;d++){
									for(let e=0;e<list4.length;e++){
										if(arr[a].children[b].children[c].children[d].classifyId == list4[e].superiorId){
											
											arr[a].children[b].children[c].children[d].children.push({
												value: list4[e].classifyId, 
												label: list4[e].classifyName,
												classifyId:list4[e].classifyId,
												children: [],
											})
										}
										
									}
								}
							}
						}
					}
					for(let a=0;a<arr.length;a++){
						for(let b=0;b<arr[a].children.length;b++){
							for(let c=0;c<arr[a].children[b].children.length;c++){
								for(let d=0;d<arr[a].children[b].children[c].children.length;d++){
									for(let e=0;e<arr[a].children[b].children[c].children[d].children.length;e++){
										for(let f=0;f<list5.length;f++){
											if(arr[a].children[b].children[c].children[d].children[e].classifyId == list5[f].superiorId){
												
												arr[a].children[b].children[c].children[d].children[e].children.push({
													value: list5[f].classifyId, 
													label: list5[f].classifyName,
													classifyId:list5[f].classifyId,
													children: [],
												})
											}
											
										}
									}
								}
							}
						}
					}
					this.goodsClassifyList = arr
					console.log('goodsClassifyList',this.goodsClassifyList)
			},
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