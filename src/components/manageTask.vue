<template>
			<div class="box">
				<Breadcrumb class="crumb" separator=">">
					<BreadcrumbItem href="/">
						<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
					</BreadcrumbItem>
					<BreadcrumbItem href="/">任务管理</BreadcrumbItem>
					<BreadcrumbItem>任务管理</BreadcrumbItem>
				</Breadcrumb>
				<div class="thisName">
					<span>任务管理</span>
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

							<span style="font:12px/32px 'microsoft yahei';padding-left:20px">品牌选择:</span>
							<Input v-model="arg_query_brandName"  placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
							<Button type="info" size="small" @click="btn_query" style="margin-right:12px">查询</Button>
							<Button type="success" size="small" @click="show_addTask">添加任务</Button>
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
		<Modal width='500' v-model="modal_addTask" title="添加任务">
			<Form ref="arg_addTask" :model="arg_addTask" :rules="rule_addBrand" :label-width="90">
				<Form-item label="标题" prop="title">
					<Input v-model="arg_addTask.title" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="任务内容" prop="content">
					<Input v-model="arg_examine.content" type="textarea" :rows="4" placeholder="请输入任务内容..."></Input>
				</Form-item>
				<Form-item label="奖金" prop="bonus">
					<Input v-model="arg_addTask.bonus" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="罚款" prop="penalty">
					<Input v-model="arg_addTask.penalty" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="截止时间" prop="remake">
					<DatePicker v-model="arg_addTask.xuptoTime" type="datetime" placeholder="选择截止时间"></DatePicker>
				</Form-item>
				<Form-item label="执行人" prop="brandName">
					 <Select v-model="arg_addTask.ximplementId" multiple>
				        <Option v-for="item in addTaskimplementIdList" :value="item.value">{{ item.label }}</Option>
				    </Select>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_addTask">确定</Button>
				<Button type="info" size='large' @click="modal_addTask=false">取消</Button>
			</div>
		</Modal>
		
		<Modal width='500' v-model="modal_edit" title="修改品牌">
			<Form ref="arg_edit" :model="arg_edit" :rules="rule_addBrand" :label-width="90">
				<Form-item label="品牌名称" prop="brandName">
					<Input v-model="arg_edit.brandName" placeholder="请输入品牌名称"></Input>
				</Form-item>
				<Form-item label="品牌描述" prop="remake">
					 <Input v-model="arg_edit.remake" type="textarea" :rows="4" placeholder="请输入品牌描述"></Input>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_edit">确定</Button>
				<Button type="info" size='large' @click="modal_edit=false">取消</Button>
			</div>
		</Modal>
		<Modal width='500' v-model="modal_taskDetail" title="任务详情">
			        	<div>
			        		<span class="label">员工姓名 ： </span>{{data_taskDetail.staffName}}
			        	</div>
			        	<div>
			        		<span class="label">标题 ： </span>{{data_taskDetail.title}}
			        	</div>
			        	<div>
			        		<span class="label">内容 ： </span><span style="font: 14px/32px '';">{{data_taskDetail.content}}</span>
			        	</div>
			        	<div>
			        		<span class="label">创建时间 ： </span>{{data_taskDetail.cTime}}
			        	</div>
			        	<div>
			        		<span class="label">审核时间 ： </span>{{data_taskDetail.uptoTime}}
			        	</div>
			        	<div>
			        		<span class="label">奖金 ： </span>{{data_taskDetail.bonus}}
			        	</div>
			        	<div>
			        		<span class="label">罚款 ： </span>{{data_taskDetail.penalty}}
			        	</div>
			        	<div>
			        		<span class="label">执行状态 ： </span>{{data_taskDetail.executeStatus}}
			        	</div>
			        	<div>
			        		<span class="label">任务来源 ： </span>{{data_taskDetail.isApp}}
			        	</div>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
		<Modal width='500' v-model="modal_dailyPaper" title="日报详情">
			<div v-for="item in data_dailies">
				<span class="label">发布时间：</span>
				<span>{{item.cTime}}</span>
				</br>
				<span class="label">内容：</span><span>{{item.dailyContent}}</span>
			</div>
			<span class="label">审批意见：</span>
			 <Input v-model="arg_examine.carryOutOpinion" type="textarea" :rows="4" placeholder="Enter something..."></Input>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_examine">确定</Button>
				<Button type="info" size='large' @click="modal_dailyPaper=false">取消</Button>
			</div>
		</Modal>
			</div>
			
</template>
<!--宽高在这里写-->
<script>
	export default {
		components: {
		},
		data() {
			return {
				data_table:[],
				data_dailies:[],
				data_taskDetail:{},
            	total:null,
				arg_query_brandName:'',
				modal_addTask: false,
				modal_dailyPaper: false,
				modal_edit: false,
				modal_taskDetail: false,
				now_id:null,
				arg_addTask:{
				  "title":"飞到马来西亚去寻找失踪的飞机",
				  "content":"没找到不许回来,赶快去 马上 立刻",
				  "bonus":"8000",
				  "penalty":"6000",
				  "uptoTime":"",
				  "xuptoTime":"",
				  "staffId":"2",
				  "implementId":"3,6,5,4",
				  "ximplementId":[]
				},
				arg_examine:{
				  "carryOutTaskId":"",
				  "carryOutOpinion":"很棒啊 继续发扬这种精神",
				  "carryOutStatus":""
				},
				arg_edit: {
				  "brandId":"品牌ID * ",
				  "brandName":"品牌名称",
				  "remake":"品牌描述",
				},
				addTaskimplementIdList:[],
				rule_addBrand: {
					brandName: [{
						required: true,
						message: '品牌名称不能为空',
						trigger: 'blur'
					}],
					remake: [{
						required: true,
						message: '品牌描述不能为空',
						trigger: 'blur'
					}]
				},
				ruleValidate: {
					password: [{
						required: true,
						message: '登录密码不能为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '管理员名称不能为空',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '公司地址不能为空',
						trigger: 'blur'
					}],
					fax: [{
						required: true,
						message: '传真不能为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '手机号不能为空',
						trigger: 'blur'
					}, ],
				},
				tableInfo: {
					name: '管理员管理',
					search: 0,
					url: window.http + "/task/tack_carryOuts",
					columns: [{
							title: '任务ID',
							key: 'taskId',
							align: 'center',
							width: 100,
						},
						{
							title: '标题',
							key: 'title',
							align: 'center',
							width: 300,
						},
						{
							title: '内容',
							key: 'content',
							align: 'center',
							width: 300,
						},
						{
							title: '审核时间',
							key: 'uptoTime',
							align: 'center',
							width: 150,
						},
						{
							title: '奖金',
							key: 'bonus',
							align: 'center',
							width: 100,
						},
						{
							title: '罚款',
							key: 'penalty',
							align: 'center',
							width: 100,
						},
						{
							title: '状态',
							key: 'staffId',
							align: 'center',
							width: 100,
						},
						{
							title: '创建时间',
							key: 'cTime',
							align: 'center',
							width: 150,
						},
						{
							title: '任务来源',
							key: 'isApp',
							align: 'center',
							width: 100,
						},{
							title: '执行人',
							key: 'action',
							width: 300,
							align: 'center',
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
												this.show_dailyPaper(params.row.carryOuts[0].carryOutTaskId)
											}
										}
									}, params.row.carryOuts[0]?params.row.carryOuts[0].executor+' ':''),
									h('a', {
										props: {
											type: 'primary',
											size: 'small'
										},
										on: {
											click: () => {
												this.show_dailyPaper(params.row.carryOuts[1].carryOutTaskId)
											}
										}
									}, params.row.carryOuts[1]?params.row.carryOuts[1].executor+' ':''),
									h('a', {
										props: {
											type: 'primary',
											size: 'small'
										},
										on: {
											click: () => {
												this.show_dailyPaper(params.row.carryOuts[2].carryOutTaskId)
											}
										}
									}, params.row.carryOuts[2]?params.row.carryOuts[2].executor+' ':''),
									h('a', {
										props: {
											type: 'primary',
											size: 'small'
										},
										on: {
											click: () => {
												this.show_dailyPaper(params.row.carryOuts[3].carryOutTaskId)
											}
										}
									}, params.row.carryOuts[3]?params.row.carryOuts[3].executor+' ':''),
									h('a', {
										props: {
											type: 'primary',
											size: 'small'
										},
										on: {
											click: () => {
												this.show_dailyPaper(params.row.carryOuts[4].carryOutTaskId)
											}
										}
									}, params.row.carryOuts[4]?params.row.carryOuts[4].executor+' ':''),
									h('a', {
										props: {
											type: 'primary',
											size: 'small'
										},
										on: {
											click: () => {
												this.show_dailyPaper(params.row.carryOuts[5].carryOutTaskId)
											}
										}
									}, params.row.carryOuts[5]?params.row.carryOuts[5].executor+' ':'')
								]);
							}
						},{
							title: '操作',
							key: 'action',
							width: 200,
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
												this.show_taskDetail(params.row.carryOuts[0])
											}
										}
									}, '查看任务详情')
								]);
							}
						}
					]
				}
			}
		},
		methods: {
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
			up_addTask(){
				console.log(this.arg_addTask,3366)
				console.log(this.arg_addTask.ximplementId.toString(),123)
				this.arg_addTask.implementId = this.arg_addTask.ximplementId.toString()
				this.arg_addTask.uptoTime = this.timer(this.arg_addTask.xuptoTime);  
				this.arg_addTask.staffId = sessionStorage.userId
				this.$http({
					method: 'post',
					url: window.http + '/task/addTask',
					data: this.arg_addTask,
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.$Message.info('添加成功！')
					}
				});
			},
			show_addTask(){
				this.modal_addTask = true
				this.$http({
					method: 'get',
					url: window.http + '/task/task_rxecutor?start=1&length=10&staffId='+sessionStorage.userId,
				}).then((res) => {
					console.log(res.data.data)
					this.addTaskimplementIdList = []
					this.arg_addTask.ximplementId = []
					for(let i=0;i<res.data.data.length;i++){
						this.addTaskimplementIdList.push({
							value:res.data.data[i].staffId,
							label:res.data.data[i].staffName
						})
					}
					
				});
			},
			up_examine(){
				this.$http({
					method: 'post',
					url: window.http + '/task/upa_carryOut',
					data: this.arg_examine,
				}).then((res) => {
					console.log(res)
					this.$Message.info(res.data.msg)
				});
			},
			show_dailyPaper(id){
				this.modal_dailyPaper = true
				this.$http({
					method: 'post',
					url: window.http + '/task/task_details',
					data: {
					  "carryOutId":1,
					},
				}).then((res) => {
					console.log(res)
					console.log(res.data.dailies,'dailies')
					this.data_dailies = res.data.dailies
					this.arg_examine.carryOutTaskId = res.data.carryOutTaskId
					this.arg_examine.carryOutStatus = res.data.carryOutStatus
				});
			},
			show_taskDetail(obj){
				this.modal_taskDetail = true
				this.$http({
					method: 'post',
					url: window.http + '/task/getTask_particulars',
					data: {
					  "carryOutTaskId":obj.carryOutTaskId,
					  "taskId":obj.taskId
					},
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.data_taskDetail = res.data.data
					}
				});
			},
			btn_query(){
				if(this.arg_query_brandName!=''){
					if(this.tableInfo.url.indexOf('brandName')==-1){
						this.tableInfo.url += '&brandName=' +this.arg_query_brandName
						window.that.down_table()
					}else{
						this.tableInfo.url = window.http + "/brand?start=1"+'&brandName=' +this.arg_query_brandName
						window.that.down_table()
					}
				}else{
					this.tableInfo.url = window.http + "/brand?start=1"
					window.that.down_table()
				}
				
			},
			up_edit(id){
				this.arg_edit.brandId = this.now_id
				console.log(this.arg_edit)
				this.$http({
					method: 'post',
					url: window.http + '/brand/update',
					data: this.arg_edit,
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.$Message.info('修改成功！')
					}
				});
			},
			up_delete(id){
				this.$http({
					method: 'post',
					url: window.http + '/brand/update',
					data: {
					  "brandId":id,
					  "brandStatus":2
					},
				}).then((res) => {
					console.log(res)
					if(res.data.state == "00000") {
						this.down_table()
						this.$Message.info('删除成功！')
					}
				});
			},
			up_modify() {
				console.log(this.arg_modify)

				if(this.arg_modify.enable == "启用") {
					this.arg_modify.enable = 1
				} else if(this.arg_modify.enable == "禁用") {
					this.arg_modify.enable = 2
				}
				this.arg_modify.id = this.now_id

				console.log(this.arg_modify)
				this.$http({
					method: 'post',
					url: window.http + '/users/update',
					data: this.arg_modify
				}).then(function(res) {
					console.log(res)
					if(res.status == 200) {
						window.that.down_table()
					}
				});
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
					}
				}).then((res) => {
					console.log(res)
					if(res.status==200){
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
	.label{
		width:100px;
		display: inline-block;
	    text-align: right;
	    font: 14px/32px '';
	    color: #2d8cf0;
	}

</style>