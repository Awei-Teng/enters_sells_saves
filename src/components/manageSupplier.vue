<template>
	<div class="box">
		    <Breadcrumb class="crumb" separator=">">
		        <BreadcrumbItem href="/">
		            <Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
		        </BreadcrumbItem>
		        <BreadcrumbItem href="/">权限管理</BreadcrumbItem>
		        <BreadcrumbItem>供应商管理</BreadcrumbItem>
		    </Breadcrumb>
		    <div class="thisName">
		    	<span>供应商管理</span>
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
					<Button type="success" size="small" @click="show_add">添加供应商</Button>				
				</div>
			</div>		
			<div class="table-box">
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
		<!--
			{
	"supplierName":"光头飘柔",
	"principal":"老衲",
	"principalPhone":"548465153",
	"fax":"234234",
	"address":"灵山寺庙",
	"mail":"ling山@qq.com"

}
		-->
		<Modal width='500' v-model="modal_add" title="添加供应商">
		  <Form ref="arg_add" :model="arg_add" :rules="ruleValidate" :label-width="90">
		        <Form-item label="供应商名称" prop="supplierName">
		            <Input v-model="arg_add.supplierName" placeholder="请输入供应商名称"></Input>
		        </Form-item>
		        <Form-item label="负责人" prop="principal">
		            <Input v-model="arg_add.principal" placeholder="请输入负责人"></Input>
		        </Form-item>
		        <Form-item label="负责人电话" prop="principalPhone">
		            <Input v-model="arg_add.principalPhone" placeholder="请输入负责人电话"></Input>
		        </Form-item>
		        <Form-item label="传真" prop="fax">
		            <Input v-model="arg_add.fax" placeholder="请输入传真"></Input>
		        </Form-item>
		        <Form-item label="地址" prop="address">
		            <Input v-model="arg_add.address" placeholder="请输入地址"></Input>
		        </Form-item>
		        <Form-item label="邮箱" prop="mail">
		            <Input v-model="arg_add.mail" placeholder="请输入邮箱"></Input>
		        </Form-item>
		    </Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_add">确定</Button>
				<Button type="info" size='large' @click="modal_add=false">取消</Button>
			</div>
		</Modal>
		<Modal width='500' v-model="modal_edit" title="添加供应商">
		  <Form ref="arg_edit" :model="arg_edit" :rules="ruleValidate" :label-width="90">
		        <Form-item label="供应商名称" prop="supplierName">
		            <Input v-model="arg_edit.supplierName" placeholder="请输入供应商名称"></Input>
		        </Form-item>
		        <Form-item label="负责人" prop="principal">
		            <Input v-model="arg_edit.principal" placeholder="请输入负责人"></Input>
		        </Form-item>
		        <Form-item label="负责人电话" prop="principalPhone">
		            <Input v-model="arg_edit.principalPhone" placeholder="请输入负责人电话"></Input>
		        </Form-item>
		        <Form-item label="传真" prop="fax">
		            <Input v-model="arg_edit.fax" placeholder="请输入传真"></Input>
		        </Form-item>
		        <Form-item label="地址" prop="address">
		            <Input v-model="arg_edit.address" placeholder="请输入地址"></Input>
		        </Form-item>
		        <Form-item label="邮箱" prop="mail">
		            <Input v-model="arg_edit.mail" placeholder="请输入邮箱"></Input>
		        </Form-item>
		    </Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_edit">确定</Button>
				<Button type="info" size='large' @click="modal_edit=false">取消</Button>
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
        data () {
            return {
            	modal_add:false,
            	modal_edit:false,
            	data_table:[],
            	total:null,
            	modal_edit:false,
            	arg_edit:{
            		"supplierId":"4",
					"supplierName":"光头飘柔",
					"principal":"老衲",
					"principalPhone":"548465153",
					"fax":"234234",
					"address":"灵山寺庙",
					"mail":"ling山@qq.com"
				},
            	arg_add:{
					"supplierName":"光头飘柔",
					"principal":"老衲",
					"principalPhone":"548465153",
					"fax":"234234",
					"address":"灵山寺庙",
					"mail":"ling山@qq.com"
				},
            	 arg_modify: {
					  "id":null,
					  "password":null,
					  "name":null,
					  "address":null,
					  "fax":null,
					  "phone":null,
					  "enable":"启用"
				},
                ruleValidate: {
                    password: [
                        { required: true, message: '登录密码不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '管理员名称不能为空', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '公司地址不能为空', trigger: 'blur' }
                    ],
                    fax: [
                        { required: true, message: '传真不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                    ],                   
                },
            	tableInfo: {
					name: '管理员管理',
					search: 0,
					url: window.http + '/supplier?start=1&length=10',
					columns: [
						{
							title: '供应商Id',
							key: 'supplierId',
							align: 'center'
						},
						{
							title: '供应商名称',
							key: 'supplierName',
							align: 'center'
						},
						{
							title: '负责人',
							key: 'principal',
							align: 'center'
						},
						{
							title: '负责人电话',
							key: 'principalPhone',
							align: 'center'
						},{
							title: '传真',
							key: 'fax',
							align: 'center'
						},{
							title: '地址',
							key: 'address',
							align: 'center'
						},{
							title: '状态',
							key: 'status',
							align: 'center'
						},{
							title: '邮箱',
							key: 'mail',
							align: 'center'
						},{
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
	                                        	this.modal_edit = true
	                                        	this.arg_edit = {
													"supplierId":params.row.supplierId,
													"supplierName":params.row.supplierName,
													"principal":params.row.principal,
													"principalPhone":params.row.principalPhone,
													"fax":params.row.fax,
													"address":params.row.address,
													"mail":params.row.mail
												}
	                                        }
	                                    }
	                                }, '编辑供应商'),
	                            ]);
	                        }
	                    }
					]
				}
            }
        },
        methods:{
        	up_edit(){
            	this.$http({
					method: 'post',
					url:window.http+ '/supplier/update',
					data:this.arg_edit,
				}).then((res) => {
					console.log(res)
					if(res.data.state=="00000"){
						this.$Message.info(res.data.msg)
						this.down_table()
						this.modal_add = false
						this.arg_add = {}
					}
				});    		
        	},
        	up_add(){
        		this.$http({
					method: 'post',
					url:window.http+ '/supplier/add',
					data:this.arg_add,
				}).then((res) => {
					console.log(res)
					if(res.data.state=="00000"){
						this.$Message.info(res.data.msg)
						this.down_table()
						this.modal_add = false
						this.arg_add = {}
					}
				});
        	},
        	show_add(){
        		this.modal_add = true
        	},
        	bt_Enabled(id){
        		this.$http({
					method: 'post',
					url:window.http+ '/users/update',
					data:{
					  "id":id,
					  "enable":"1"
					},
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						window.that.down_table()
					}
				});
        	},
        	bt_assignRoles(){
        		
        	},
        	bt_disabled(id){
        		this.$http({
					method: 'post',
					url:window.http+ '/users/update',
					data:{
					  "id":id,
					  "enable":"2"
					},
				}).then(function(res) {
					console.log(res)
					if(res.status==200){
						window.that.down_table()
					}
				});
        	},
        	bt_Modify(id){
        		this.modal_edit = true
        		this.now_id = id
        	},
        	pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
        	},
			down_table(){
					this.data_table =[
						        {
						            "supplierId": 3,
						            "supplierName": "光头飘柔",
						            "principal": "老衲",
						            "principalPhone": "548465153",
						            "fax": "234234",
						            "address": "灵山寺庙",
						            "status": 1,
						            "mail": "ling山@qq.com",
						            "cTime": "2017-11-13 08:57:58",
						            "tTime": null
						        }]
				this.$http({
					method: 'get',
					url: 'http://192.168.0.66:8080/supplier?start=1&length=20',
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
						
							this.total = res.data.recordsTotal
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
			width: 96%;
			float:left;
			margin: 0 2%;
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