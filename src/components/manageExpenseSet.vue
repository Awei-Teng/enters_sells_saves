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

							<!--<span style="font:12px/32px 'microsoft yahei';padding-left:20px">品牌选择:</span>
							<Input v-model="arg_query_brandName"  placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
							<Button type="info" size="small" @click="btn_query" style="margin-right:12px">查询</Button>-->
							<Button type="success" size="small" @click="show_addCost">新建费用</Button>
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
		
		<Modal width='300' v-model="modal_addCost" title="新增费用">
			<Form ref="arg_addCost" :model="arg_addCost" :label-width="90">
				<Form-item label="费用名称" prop="typename">
					<Input v-model="arg_addCost.typename" placeholder="请输入费用名称"></Input>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_addCost">确定</Button>
				<Button type="info" size='large' @click="modal_addCost=false">取消</Button>
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
				arg_query_brandName:'',
				modal_addBrand: false,
				modal_addCost: false,
				modal_edit: false,
				now_id:null,
				arg_addCost:{
				  "typename":"",
				},
				arg_edit: {
				  "brandId":"品牌ID * ",
				  "brandName":"品牌名称",
				  "remake":"品牌描述",
				},
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
					url: window.http + "/apply_clock_controller/apply_reimburse_type",
					arg:{},
					columns: [{
							title: '类型',
							key: 'typename',
							align: 'center'
						},{
							title: '时间',
							key: 'cTime',
							align: 'center'
						}
					]
				}
			}
		},
		methods: {
			up_addCost(){
				if(!this.arg_addCost){
					this.$Message.info('请检查输入是否完整！')
					return false;
				}
				this.$http({
					method: 'post',
					url: window.http + '/apply_clock_controller/insert_apply_reimburse_type',
					data: this.arg_addCost,
				}).then((res) => {
					console.log(res)
						this.$Message.info(res.data.msg)
						this.down_table()
				});
			},
			show_addCost(){
				this.modal_addCost = true
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
			show_addBrand(){
				this.modal_addBrand = true
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

			},pageCange(){
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