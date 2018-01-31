<template>
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
						
						
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span><Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input><Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input><Button type="success" size="small" @click="show_addFiliale">新增分公司</Button>				
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
		<Modal width='500' v-model="modal_edit" title="期货">
		  <Form ref="arg_modify" :model="arg_modify" :rules="ruleValidate" :label-width="90">
		        <Form-item label="登录密码" prop="password">
		            <Input v-model="arg_modify.password" placeholder="请输入登录密码"></Input>
		        </Form-item>
		        <Form-item label="管理员名称" prop="name">
		            <Input v-model="arg_modify.name" placeholder="请输入公司名称或者管理员名称"></Input>
		        </Form-item>
		        <Form-item label="公司地址" prop="address">
		            <Input v-model="arg_modify.address" placeholder="请输入公司地址"></Input>
		        </Form-item>
		        <Form-item label="传真" prop="fax">
		            <Input v-model="arg_modify.fax" placeholder="请输入邮箱"></Input>
		        </Form-item>
		        <Form-item label="手机号" prop="phone">
		            <Input v-model="arg_modify.phone" placeholder="请输入手机号"></Input>
		        </Form-item>
		        <Form-item label="是否启用" prop="enable">
		            <Radio-group v-model="arg_modify.enable">
				        <Radio label="启用"></Radio>
				        <Radio label="禁用"></Radio>
				    </Radio-group>
		        </Form-item>
		    </Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_modify">确定</Button>
				<Button type="info" size='large' @click="modal_edit=false">取消</Button>
			</div>
		</Modal>
		<Modal width='500' v-model="modal_addFiliale" title="添加分公司">
		  <Form ref="arg_addFiliale" :model="arg_addFiliale" :rules="validate_addFiliale" :label-width="90">
		  		 <Form-item label="登录帐号" prop="username">
		            <Input v-model="arg_addFiliale.username" placeholder="请输入公司地址"></Input>
		        </Form-item>
		        <Form-item label="登录密码" prop="password">
		            <Input v-model="arg_addFiliale.password" placeholder="请输入登录密码"></Input>
		        </Form-item>
		        <Form-item label="管理员名称" prop="name">
		            <Input v-model="arg_addFiliale.name" placeholder="请输入公司名称或者管理员名称"></Input>
		        </Form-item>
		        <Form-item label="公司地址" prop="address">
		            <Input v-model="arg_addFiliale.address" placeholder="请输入公司地址"></Input>
		        </Form-item>
		        <Form-item label="传真" prop="fax">
		            <Input v-model="arg_addFiliale.fax" placeholder="请输入邮箱"></Input>
		        </Form-item>
		        <Form-item label="手机号" prop="phone">
		            <Input v-model="arg_addFiliale.phone" placeholder="请输入手机号"></Input>
		        </Form-item>
		    </Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_addFiliale">确定</Button>
				<Button type="info" size='large' @click="modal_addFiliale=false">取消</Button>
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
        data () {
            return {
            	data_table:[],
            	total:null,
            	argsObj:{
					active:'17-1',
					open:"['17']"
				},
				arg_addFiliale:{
					"username":"",
					"password":"",
					"name":"",
					"address":"",
					"fax":"",
					"phone":"",
					"adminId":""
				},
				modal_addFiliale:false,
            	modal_edit:false,
            	 arg_modify: {
					  "id":null,
					  "password":null,
					  "name":null,
					  "address":null,
					  "fax":null,
					  "phone":null,
					  "enable":"启用"
				},
				validate_addFiliale:{
					username: [
                        { required: true, message: '登录账号不能为空', trigger: 'blur' }
                    ],
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
					url: window.http + '/users?id=1&start=1&length=20',
					columns: [
						{
							title: '管理员编号',
							key: 'id',
							align: 'center'
						},
						{
							title: '用户名',
							key: 'username',
							align: 'center'
						},
						{
							title: '状态',
							key: 'enable',
							align: 'center'
						},
						{
							title: '名字',
							key: 'name',
							align: 'center'
						},
						{
							title: '地址',
							key: 'address',
							align: 'center'
						},
						{
							title: '传真',
							key: 'fax',
							align: 'center'
						},
						{
							title: '手机',
							key: 'phone',
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
	                                            this.bt_assign_roles(params.row)
	                                        }
	                                    }
	                                }, '分配角色'),
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
	                                            this.bt_Enabled(params.row.id)
	                                        }
	                                    }
	                                }, '启动'),
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
	                                            this.bt_disabled(params.row.id)
	                                        }
	                                    }
	                                }, '禁用'),
	                                h('Button', {
	                                    props: {
	                                        type: 'primary',
	                                        size: 'small'
	                                    },
	                                    on: {
	                                        click: () => {
	                                            this.bt_Modify(params.row.id)
	                                        }
	                                    }
	                                }, '修改')
	                            ]);
	                        }
	                    }
					]
				}
            }
        },
        methods:{
        	up_addFiliale(){
        		this.arg_addFiliale.adminId = sessionStorage.userId
        		this.$http({
					method: 'post',
					url:window.http+ '/users/add',
					data:this.arg_addFiliale,
				}).then((res)=> {
					console.log(res)
					if(res.status==200){
						this.down_table()
					}
				});
        	},
        	show_addFiliale(){
        		this.modal_addFiliale = true
        	},
        	bt_Enabled(id){
        		const that = this
        		that.$http({
					method: 'post',
					url:window.http+ '/users/update',
					data:{
					  "id":id,
					  "enable":"1"
					},
				}).then(function(res) {
					console.log(res)
					if(res.status==200){
						window.that.down_table()
					}
				});
        	},
        	up_modify(){
        		console.log(this.arg_modify)
        		const that = this
        		
        		if(that.arg_modify.enable=="启用"){
        			that.arg_modify.enable = 1
        		}else if(that.arg_modify.enable=="禁用"){
        			that.arg_modify.enable = 2
        		}
        		that.arg_modify.id =  that.now_id
        		
        		console.log(this.arg_modify)
          		that.$http({
					method: 'post',
					url:window.http+ '/users/update',
					data:that.arg_modify
				}).then(function(res) {
					console.log(res)
					if(res.status==200){
						window.that.down_table()
					}
				});
        		
        	},
        	bt_assignRoles(){
        		
        	},
        	bt_disabled(id){
        		const that = this
        		that.$http({
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
				this.$http({
					method: 'get',
					url: this.tableInfo.url,
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
						if(this.tableInfo.name == "员工管理"){
							this.data_table = res.data.data.list
							this.total = res.data.total
						}else{
							this.data_table = res.data.data
							this.total = res.data.recordsTotal
						}
						console.log('tableData',res.data.data)
						if(this.tableInfo.name == "巡店查询"){
							this.countYes = res.data.countYes
							this.countNo = res.data.countNo
						}
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
				font:700 12px/30px 'microsoft yahei';
			    text-align: left;
    			border: 1px solid #ddd;
    			.serach_main{
    				padding: 12px 0 0 12px;
    			}
			}
			.table-box{
				background:#fff;
				width: 100%;
				font:700 12px/30px 'microsoft yahei';
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
			font:700 12px/30px 'microsoft yahei';
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