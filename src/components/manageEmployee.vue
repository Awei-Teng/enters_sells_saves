<template>
			<div class="box">
				<Breadcrumb class="crumb" separator=">">
					<BreadcrumbItem href="/">
						<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
					</BreadcrumbItem>
					<BreadcrumbItem href="/">员工管理</BreadcrumbItem>
					<BreadcrumbItem>员工管理</BreadcrumbItem>
				</Breadcrumb>
				<div class="thisName">
					<span>员工管理</span>
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

							<span style="font:12px/32px 'microsoft yahei';padding-left:20px">员工名称:</span>
							<Input v-model="query_name" placeholder="请输入员工名称..." style="width: 200px;padding:0 12px" size="small"></Input>
							<span style="font:12px/32px 'microsoft yahei';padding-left:20px">员工编号:</span>
							<Input v-model="query_staffId" placeholder="请输入员工编号..." style="width: 200px;padding:0 12px" size="small"></Input>
							<Button type="info" size="small" @click="up_query">查询</Button>
							
							
							<Button type="success" size="small" @click="show_add('add')">添加员工</Button>
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
			<Modal width='1000' v-model="modal_add" :title="type_modal=='add'?'添加员工':'编辑员工'">
				<!--
					门店可选多个
					门店选一个时_不能选管理员模板 可选最多两个员工模板。
					门店选多个时_只能选一个员工模板 一个管理员模板
					
				-->
			<Form ref="arg_add" :model="arg_add" :label-width="100">
				<Row>
					<Col span="8">
					<Form-item label="员工姓名" prop="staffName">
						<Input v-model="arg_addEmployee.staffName" placeholder="请输入门店名称"></Input>
					</Form-item>
					<Form-item label="员工账号" prop="staffAccount">
						<Input v-model="arg_addEmployee.staffAccount" placeholder="请输入员工账号"></Input>
					</Form-item>
					<Form-item label="员工密码" prop="staffPwd" :label-width="100" v-if="type_modal=='add'">
						<Input v-model="arg_addEmployee.staffPwd" placeholder="请输入员工密码"></Input>
					</Form-item>
					<Form-item label="确认密码" prop="newPwd" :label-width="100" v-if="type_modal=='add'">
						<Input v-model="arg_addEmployee.newPwd" placeholder="请输入经纬度"></Input>
					</Form-item>
					<Form-item label="联系方式" prop="staffPhone" :label-width="100">
						<Input v-model="arg_addEmployee.staffPhone" placeholder="请输入门店状态"></Input>
					</Form-item>
					<Form-item label="月销售金额" prop="staffSalesAmount" :label-width="100">
						<Input v-model="arg_addEmployee.staffSalesAmount" placeholder="请输入月销售金额"></Input>
					</Form-item>
					<Form-item label="员工居住地址" prop="address" :label-width="100">
						<Input v-model="arg_addEmployee.address" placeholder="请输入员工居住地址"></Input>
					</Form-item>
					<Form-item label="员工身份证号" prop="staffIdCard" :label-width="100">
						<Input v-model="arg_addEmployee.staffIdCard" placeholder="请输入员工身份证号"></Input>
					</Form-item>
					</Col>
					
					<Col span="16">
					<Form-item label="员工职位类型" prop="staffPostType">
						<Select v-model="arg_addEmployee.staffPostType" placeholder="请输入员工职位类型">
					        <Option v-for="item in staffList" :value="item.postId">{{ item.postName }}</Option>
					    </Select>
					</Form-item>
					<Form-item label="员工状态" prop="staffStatus" :label-width="100">
						<Select v-model="arg_addEmployee.staffStatus" placeholder="请输入员工状态">
					        <Option v-for="item in staffStatusList" :value="item.value">{{ item.label }}</Option>
					    </Select>
					</Form-item>
			   		<Form-item label="选择门店" prop="storeId" :label-width="100">
						<Cascader :data="shopClassifyList" v-model="arg_add.xstoreId" @on-change="change_addShop"></Cascader>					
						<!--<Input v-model="arg_add.storeId" placeholder="请输入门店库存报警天数上限"></Input>-->
					</Form-item>
					<Form-item label="已选门店－" prop="storeId" :label-width="180">
						<Select v-model="shopList" multiple  @on-change="change_selectShop">
					        <Option v-for="item in allShopList" :value="item.value">{{ item.label }}</Option>
					    </Select>
			   		</Form-item>
			   		<Form-item label="员工工资模板" prop="storeId" :label-width="100">
						<Select v-model="employeeWagesList" multiple placeholder="请选择员工工资模板！"  @on-change="change_selectModel0">
					        <Option v-for="item in allEmployeeWagesList" :value="item.modelId">{{ item.modelName }}</Option>
					    </Select>
			   		</Form-item>
			   		<Form-item :label="name_employeeWagesList[index]+'－'" prop="storeId" :label-width="180" v-for="(item,index) in employeeWagesList" >
			   			<Select
				            v-model="index==0?brandId0:brandId1"
				            multiple
				            filterable
				            remote
				            placeholder="请输入品牌搜索关键字..."
				            :remote-method="remoteMethod2"
				            :loading="loading2">
				            <Option v-for="option in brandOptions" :value="option.value" :key="option.label">{{option.label}}</Option>
				        </Select>
			   		</Form-item>
		        	<Form-item label="负责人工资模板" prop="storeId" :label-width="100" v-show="shopList.length>1">
						<Select v-model="leaderWagesList" multiple placeholder="最多只能选择一个模板！" @on-change="change_selectModel1">
					        <Option v-for="item in allLeaderWagesList" :value="item.modelId">{{ item.modelName }}</Option>
					    </Select>
			   		</Form-item>
					</Col>
				</Row>
				
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_add">确定</Button>
				<Button type="info" size='large' @click="modal_add=false">取消</Button>
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
				now_index1:0,
				now_index2:0,
				brandId0:[],
				brandId1:[],
				brandId20:[],
				brandId21:[],
				idBrands0:[],
				idBrands1:[],
				arr_tId:[],
				arg_brandList: [[],[],[],[],[],[],[],[],[]],
				arg_brandList2: [],
				allEmployeeWagesList:[],
				brandOptions: [],
				name_employeeWagesList: [],
				name_leaderWagesList: [],
				employeeWagesList:[],
				allLeaderWagesList:[],
				leaderWagesList:[3],
				shopList:[],
				allShopList:[],
				query_name:'',
				query_staffId:null,
				loading2: false,
				modal_add:false,
				modal_edit:false,
				data_table:[],
				brandList:[],
				shopClassifyList:[],
				staffList:[],
				now_id:'',
            	total:null,
            	type_modal:null,
            	staffStatusList:[{
            		value:1,
            		label:'在职'
            	},{
            		value:2,
            		label:'离职'
            	}],
            	arg_addEmployee:{
				  "staffName":null,
				  "staffPostType":null,
				  "staffAccount":null,
				  "staffPwd":null,
				  "newPwd":null,
				  "staffPhone":null,
				  "staffSalesAmount":null,
				  "address":null,
				  "staffBrandNumber":null,
				  "staffStatus":1,
				  "brandId":"1",
				  "staffIdCard":null,
				  "adminTemplate":null,
				  "storeId":null,
				  "storeIds":null,
				  "staffSalary":null,
				  "staffBrand":null,
				  "templateAndBrands":[]
				},
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
				},
				tableInfo: {
					name: '员工管理',
					search: 0,
					url: window.http + '/staff',
					arg:{
						"start":1,
						"length":10,
					},
					columns: [
						{
							title: '员工Id',
							key: 'staffId',
							align: 'center',
							width: 100
						},
						{
							title: '门店名称',
							key: 'storeName',
							align: 'center',
							width: 150
						}, 
						{
							title: '员工姓名',
							key: 'staffName',
							align: 'center',
							width: 100
						},
						{
							title: '员工职位',
							key: 'staffPost',
							align: 'center',
							width: 100
						},
						{
							title: '员工职位类型',
							key: 'staffPostType',
							align: 'center',
							width: 120
						},
						{
							title: '员工编号',
							key: 'staffNumber',
							align: 'center',
							width: 120
						},
						{
							title: '员工帐号/手机号',
							key: 'staffAccount',
							align: 'center',
							width: 130
						},
//						{
//							title: '密码',
//							key: 'staffPwd',
//							align: 'center',
//							width: 100
//						},
						{
							title: '计划员工人数',
							key: 'newPwd',
							align: 'center',
							width: 110
						},
						{
							title: '联系电话',
							key: 'staffPhone',
							align: 'center',
							width: 130
						},
						{
							title: '月销售金额',
							key: 'staffSalesAmount',
							align: 'center',
							width: 100
						},
						{
							title: '工资模版',
							key: 'staffSalary',
							align: 'center',
							width: 120,
						},
						{
							title: '员工选择销售品牌',
							key: 'staffBrand',
							align: 'center',
							width: 150
						},
						{
							title: '数量',
							key: 'staffBrandNumber',
							align: 'center',
							width: 100
						},
						{
							title: '员工生日',
							key: 'staffBirthday',
							align: 'center',
							width: 110
						},
						{
							title: '身份证',
							key: 'staffIdCard',
							align: 'center',
							width: 180
						}, {
							title: '紧急联系人',
							key: 'urgencyName',
							align: 'center',
							width: 110
						}, {
							title: '紧急联系人电话',
							key: 'urgencyPhone',
							align: 'center',
							width: 130
						}, {
							title: '现居住地址',
							key: 'address',
							align: 'center',
							width: 110
						}, {
							title: '身份证照片',
							key: 'idCardUrl',
							align: 'center',
							width: 180
						}, {
							title: '状态',
							key: 'staffStatus',
							align: 'center',
							width: 110
						}, {
							title: '门店ID',
							key: 'storeId',
							align: 'center',
							width: 110
						}, {
							title: '职位名称',
							key: 'postName',
							align: 'center',
							width: 110
						}, {
							title: '工资模板',
							key: 'modelName',
							align: 'center',
							width: 120
						}, {
							title: '操作',
							key: 'action',
							width: 150,
							align: 'center',
							fixed: 'right',
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
												
												this.now_id = params.row.staffId
												this.show_add('edit')
											}
										}
									}, '编辑'),
									h('Button', {
										props: {
											type: 'error',
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
									}, '删除')
								]);
							}
						}
					]
				},
				arg_add:{
				  "staffName":"",
				  "staffPostType":"2",
				  "staffAccount":"18329184501",
				  "staffPwd":"123456",
				  "newPwd":"123456",
				  "staffPhone":"18329184502",
				  "staffSalesAmount":"390000",
				  "staffSalary":"1",
				  "staffBrand":"天猫,京东",
				  "xstaffBrand":[],
				  "address":"杭州市余杭区",
				  "storeId":"18",
				  "xstoreId":[],
				  "staffBrandNumber":"2",
				  "staffStatus":"1",
				  "staffIdCard":"360122199708053033"
				}
				
			}
		},
		methods: {
			change_selectShop(id){
				if(this.shopList.length>1){
					this.employeeWagesList = this.employeeWagesList.splice(0,1)
					
				}else{
					this.leaderWagesList = []
				}
			},
			change_selectModel1(id){
				this.name_leaderWagesList = []
				if(this.leaderWagesList.length>1){
					this.leaderWagesList = this.leaderWagesList.splice(0,1)
					this.$Message.info('最多选择一个模板！')
				}
				this.allLeaderWagesList.map((item)=>{
					this.leaderWagesList.map((x)=>{
						if(item.modelId==x){
							this.name_leaderWagesList.push(item.modelName)
						}
					})
					
				})
			
			},
			change_selectModel0(id){
				this.name_employeeWagesList = []
				if(this.shopList.length>1&&this.employeeWagesList.length>1){
					this.employeeWagesList = this.employeeWagesList.splice(0,1)
					this.$Message.info('最多选择一个模板！')
				}
				if(this.shopList.length<2&&this.employeeWagesList.length>2){
					this.employeeWagesList = this.employeeWagesList.splice(0,2)
					this.$Message.info('最多选择两个模板！')
				}
				
				this.allEmployeeWagesList.map((item)=>{
					this.employeeWagesList.map((x)=>{
						if(item.modelId==x){
							this.name_employeeWagesList.push(item.modelName)
						}
					})
					
				})
			
			},
			remoteMethod2 (query) {
                if (query !== '') {
                    this.loading2 = true;
                        
//                      const list = this.list.map(item => {
//                          return {
//                              value: item,
//                              label: '1item'
//                          };
//                      });
//                      this.brandOptions = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
		                this.$http({
							method: 'post',
							url:window.http + "/brand?start=1"+'&brandName=' + query,
						}).then((res)=> {
							
							if(res.status==200&&res.data.data.length){
								console.log(res,'res')
								this.loading2 = false;
								const brandlist = res.data.data.map(item => {
		                            return {
		                                value: item.brandId,
		                                label: item.brandName,
		                            };
								})
								 this.brandOptions = brandlist
		                        console.log(this.brandOptions)
							}
						});
                            
                } else {
                    this.brandOptions = [];
                }
            },
			change_addShop(value,data){
				console.log(value,data)
				let isOk = true
				this.allShopList.map(function(item){
					if(item.value ==data[data.length-1].value){
						isOk = false
						return;
					}
				})
				if(isOk){
					this.allShopList.push(data[data.length-1])
					this.shopList.push(data[data.length-1].value)
					console.log(this.allShopList,this.shopList)
				}
				
			},
			up_query(obj){
				if(obj.length){
					console.log('adf',obj)
					if(obj[0].storeId){
						this.tableInfo.url =window.http + '/staff?start=1&length=10'+'&storeId='+obj[0].storeId + '&staffName='+this.query_name + '&staffId='+ this.query_staffId
						this.down_table()
					}
				}else{
					this.tableInfo.url =window.http + '/staff?start=1&length=10'+ '&staffName='+this.query_name + '&staffId='+ this.query_staffId
					this.down_table()
				}
					
				
			},
			show_add(type){
				console.log(this.now_id,type)
				this.modal_add = true
				this.type_modal = type
				if(this.now_id&&type=='edit'){
					this.$http({
						method: 'post',
						url: window.http + '/staff/selectStaffById',
						data:{
						  "staffId":15
						}
					}).then((res) => {
						console.log(21131,res)
						if(res.status == 200) {
							//信息填充
							this.arg_addEmployee = res.data.staff
							//门店反填充
							if(this.arg_addEmployee.staffByStoreVos.length!=0){
								for(let a=0;a<this.arg_addEmployee.staffByStoreVos.length;a++){
									this.$set(this.allShopList,a,{
										value:this.arg_addEmployee.staffByStoreVos[a].storeId,
										label:this.arg_addEmployee.staffByStoreVos[a].storeName
									})
									this.$set(this.shopList,a,this.arg_addEmployee.staffByStoreVos[a].storeId)
								}
								
							}
							//模板填充
							this.employeeWagesList = []
							this.brandId0 = []
							this.brandId1 = []
							this.leaderWagesList = []
							this.leaderWagesList.push(res.data.staff.adminTemplate)
							for(let j=0;j<res.data.ordinaryStaffModels.length;j++){
								this.employeeWagesList.push(res.data.ordinaryStaffModels[j].modelId)
								this.arr_tId.push(res.data.ordinaryStaffModels[j])
								for(let k=0;k<res.data.ordinaryStaffModels[j].brandByTemplateVos.length;k++){
									
//									this.brandOptions.push({
//				                        value: res.data.ordinaryStaffModels[j].brandByTemplateVos[k].brandId,
//				                        label: res.data.ordinaryStaffModels[j].brandByTemplateVos[k].brandName,
//				                    })
									//要把name替换成id
									this["brandId"+j].push(res.data.ordinaryStaffModels[j].brandByTemplateVos[k].brandName)
									this["idBrands"+j].push(res.data.ordinaryStaffModels[j].brandByTemplateVos[k].brandId)
								}
							}
							
							
							
							console.log(this.allShopList,this.shopList,this.modal_add)
						}
					});
				}
				
				this.$http({
					method: 'post',
					url: window.http + '/brand',
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						this.brandList = []
						for(let i=0;i<res.data.data.length;i++){
							this.brandList.push({
								value:res.data.data[i].brandId,
								label:res.data.data[i].brandName,
							})
						}
					}
				});
				//职位
				this.$http({
					method: 'post',
					url: window.http + '/staff/getStaffPostList',
				}).then((res) => {
					this.staffList = res.data.data
				});
				//门店
				this.$http({
					method: 'post',
					url: window.http + '/store/region_classfy?userId=1',
				}).then((res) => {
					console.log(2,res)
					if(res.data.state == '00000') {
						this.shop_tree(res)
					}
				});
				//普通员工模板
				this.$http({
					method: 'get',
					url: window.http + '/staff_payroll/query_ordinary_staffMode?start=1&modelName=',
				}).then((res) => {
					console.log(2111,res)
					if(res.status == 200) {
						this.allEmployeeWagesList = res.data.data
					}
				});
				//管理员模板
				this.$http({
					method: 'get',
					url: window.http + '/staff_payroll/query_admin_mode?start=1&modelName=',
				}).then((res) => {
					console.log(21131,res)
					if(res.status == 200) {
						this.allLeaderWagesList = res.data.data
					}
				});
				
				
			},
			up_edit(){
				this.arg_add.staffId = this.now_id
				this.$http({
					method: 'post',
					url: window.http + "/staff/updateStaff",
					data:this.arg_add,
				}).then((res) => {
					console.log(res)
					if(res.data.state=='00000'){
						this.$Message.info(res.data.msg)
						this.down_table()
					}
				});
			},
			up_add(){
				console.log('this.arg_addEmployee',this.arg_addEmployee)
				
				this.arg_addEmployee.templateAndBrands = []
				this.arg_addEmployee.storeId = null
				this.arg_addEmployee.storeIds = null
				this.arg_addEmployee.adminTemplate = null
				this.arg_addEmployee.staffSalary = null
				this.arg_addEmployee.staffBrand = null
				//可选员工与管理员时
				if(this.shopList.length>1){
					//"storeIds"
					this.arg_addEmployee.storeIds = this.shopList.toString()
					//"adminTemplate"
					this.arg_addEmployee.adminTemplate = this.leaderWagesList.toString()
					//"templateAndBrands"
					if(this.employeeWagesList.length>0){
						this.arg_addEmployee.templateAndBrands.push({
			             "modelId":this.employeeWagesList[0],
			             "brandId":this.brandId0.toString()
						})
					}
					this.arg_addEmployee.staffSalary = this.arg_addEmployee.templateAndBrands[0].modelId + ''
					this.arg_addEmployee.staffBrand = this.arg_addEmployee.templateAndBrands[0].brandId + ''
					
				}else{
					//可选员工 不可选管理员
					for(let a=0;a<this.brandId0.length;a++){
						if(this.brandId1.indexOf(this.brandId0[a])!=-1){
							this.$Message.info('两个员工模板中不能有相同的品牌！')
							return;
						}
					}
					//"storeId"
					this.arg_addEmployee.storeId = this.shopList.toString()
					//"templateAndBrands"
					//员工模板有一个时
					if(this.employeeWagesList.length>0){
						this.arg_addEmployee.templateAndBrands.push({
			             "modelId":this.employeeWagesList[0],
			             "brandId":this.brandId0.toString()
						})
						this.arg_addEmployee.staffSalary = this.arg_addEmployee.templateAndBrands[0].modelId + ''
					    this.arg_addEmployee.staffBrand = this.arg_addEmployee.templateAndBrands[0].brandId + ''
					}
					//员工模板有二个时
					if(this.employeeWagesList.length>1){
						this.arg_addEmployee.templateAndBrands.push({
			             "modelId":this.employeeWagesList[1],
			             "brandId":this.brandId1.toString()
						})
						this.arg_addEmployee.staffSalary +=',' + this.arg_addEmployee.templateAndBrands[1].modelId 
						this.arg_addEmployee.staffBrand += ',' + this.arg_addEmployee.templateAndBrands[1].brandId
					}
					
				}
				
				

				if(this.type_modal=='add'){
					this.arg_addEmployee.staffId = null
					this.arg_addEmployee.staffBrandNumber = 0
					if(this.arg_addEmployee.templateAndBrands.length>0){
						this.arg_addEmployee.staffBrandNumber += this.arg_addEmployee.templateAndBrands[0].brandId.split(',').length
					}
					if(this.arg_addEmployee.templateAndBrands.length>1){
						this.arg_addEmployee.staffBrandNumber += this.arg_addEmployee.templateAndBrands[1].brandId.split(',').length
					}
					this.$http({
						method: 'post',
						url: window.http + "/staff/addStaff",
						data:this.arg_addEmployee,
					}).then((res) => {
						console.log(res)
							this.$Message.info(res.data.msg)
							this.down_table()
						
					});
				}else if(this.type_modal=='edit'){
					console.log('awei',this.arg_addEmployee)
					let arr_brand = []
					for(let a=0;a<this.arg_addEmployee.templateAndBrands.length;a++){
						//判断数据是修改的还是新增.修改要加tId
						this.arg_addEmployee.templateAndBrands[a].tId = null
						for(let aa=0;aa<this.arr_tId.length;aa++){
							
							if(this.arg_addEmployee.templateAndBrands[a].modelId == this.arr_tId[aa].modelId){
								this.arg_addEmployee.templateAndBrands[a].tId = this.arr_tId[aa].tId
							}
						}
						
					}
					
					if(this.arg_addEmployee.templateAndBrands.length>0){
						for(let b=0;b<this.brandId0.length;b++){
							for(let c=0;c<this.arr_tId.length;c++){
								for(let d=0;d<this.arr_tId[c].brandByTemplateVos.length;d++){
									if(this.brandId0[b] == this.arr_tId[c].brandByTemplateVos[d].brandName){
										this.brandId0[b] = this.arr_tId[c].brandByTemplateVos[d].brandId
									}
								}
							}
							
						}
						for(let bb=0;bb<this.brandId1.length;bb++){
							for(let c=0;c<this.arr_tId.length;c++){
								for(let d=0;d<this.arr_tId[c].brandByTemplateVos.length;d++){
									if(this.brandId1[bb] == this.arr_tId[c].brandByTemplateVos[d].brandName){
										this.brandId1[bb] = this.arr_tId[c].brandByTemplateVos[d].brandId
									}
								}
							}
						}
						arr_brand.push({
				             "tId": this.arg_addEmployee.templateAndBrands[0].tId,
				             "modelId":this.arg_addEmployee.templateAndBrands[0].modelId,
				             "brandId":this.brandId0.toString()
				         })
					}
					if(this.arg_addEmployee.templateAndBrands.length>1){
						arr_brand.push({
				             "tId": this.arg_addEmployee.templateAndBrands[1].tId,
				             "modelId":this.arg_addEmployee.templateAndBrands[1].modelId,
				             "brandId":this.brandId1.toString()
				         })
					}
					let staffBrand = ''
					if(arr_brand.length>0){
						staffBrand += arr_brand[0].brandId
					}
					if(arr_brand.length>1){
						staffBrand += ','+arr_brand[1].brandId
					}
					this.$http({
						method: 'post',
						url: window.http + "/staff/updateStaff",
						data:{
						  "staffId":this.arg_addEmployee.staffId,    
						  "staffName":this.arg_addEmployee.staffName, 
						  "staffPostType":this.arg_addEmployee.staffPostType, 
						  "staffAccount":this.arg_addEmployee.staffAccount, 
//						  "staffPwd":this.arg_addEmployee.staffPwd, 
//						  "newPwd":this.arg_addEmployee.staffPwd, 
						  "staffPhone":this.arg_addEmployee.staffPhone, 
						  "staffSalesAmount":this.arg_addEmployee.staffSalesAmount, 
						  "staffSalary":this.arg_addEmployee.staffSalary, 
						  "staffBrand":staffBrand, 
						  "address":this.arg_addEmployee.address, 
						  "storeId":this.arg_addEmployee.storeId, 
						  "storeIds":this.arg_addEmployee.storeIds, 
						  "staffBrandNumber":this.arg_addEmployee.staffBrandNumber, 
						  "staffStatus":this.arg_addEmployee.staffStatus, 
						  "adminTemplate":this.arg_addEmployee.adminTemplate, 
						  "staffIdCard":this.arg_addEmployee.staffIdCard, 
						  "templateAndBrands":arr_brand
						}
					}).then((res) => {
						console.log(res)
							this.$Message.info(res.data.msg)
							this.down_table()
						
					});
					
				}
			},
			pageCange(val){
        		this.tableInfo.arg.start = val
        		this.down_table()
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

			},
			shop_tree(res){
				
				//00001
				let vdata = res.data.data
				let list1 = []
				let list2 = []
				let list3 = []
				let list4 = []
				let list5 = []
				for(let i=0;i<vdata.length;i++){
					if(vdata[i].storeName){
						vdata[i].grade += 1
					}
					
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
						value : 0,
						label: '全部',
						children: []
					}]
					
					for(let i=0;i<list1.length;i++){
						if(list1[i].storeName){
							arr[0].children.push({
								value: list1[i].storeId,
								label: list1[i].storeName,
								regionId:list1[i].regionId,
								children: []
							})
						}else{
							arr[0].children.push({
								value: list1[i].regionId,
								label: list1[i].regionName,
								regionId:list1[i].regionId,
								children: []
							})
						}

						for(let j=0;j<list2.length;j++){
							if(list2[j].storeName){
								if(list2[j].regionId == arr[0].children[i].regionId){
									
									arr[0].children[i].children.push({
										value: list2[j].storeId,
										label: list2[j].storeName,
										regionId:list2[j].regionId,
										children: [],
									})
								}
							}else if(list2[j].superiorId == arr[0].children[i].regionId){
								
								arr[0].children[i].children.push({
									value: list2[j].regionId,
									label: list2[j].regionName,
									regionId:list2[j].regionId,
									children: [],
								})
							}
						}
					}
					for(let a=0;a<arr.length;a++){
						for(let b=0;b<arr[a].children.length;b++){
							for(let c=0;c<arr[a].children[b].children.length;c++){
								for(let d=0;d<list3.length;d++){
									
							if(list3[d].storeName){
								if(arr[a].children[b].children[c].regionId == list3[d].regionId){
										
										arr[a].children[b].children[c].children.push({
											value: list3[d].storeId,
											label: list3[d].storeName,
											regionId:list3[d].regionId,
											children: [],
										})
								}
							}else if(arr[a].children[b].children[c].regionId == list3[d].superiorId){
										
										arr[a].children[b].children[c].children.push({
											value: list3[d].regionId,
											label: list3[d].regionName,	
											regionId:list3[d].regionId,
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
										if(list4[e].storeName){
											if(arr[a].children[b].children[c].children[d].regionId == list4[e].regionId){
											
												arr[a].children[b].children[c].children[d].children.push({
													value: list4[e].storeId,
													label: list4[e].storeName,
													regionId:list4[e].regionId,
													children: [],
												})
											}
										}else if(arr[a].children[b].children[c].children[d].regionId == list4[e].superiorId){
											
											arr[a].children[b].children[c].children[d].children.push({
												value: list4[e].regionId,
												label: list4[e].regionName,
												regionId:list4[e].regionId,
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
											if(list5[f].storeName){
												if(arr[a].children[b].children[c].children[d].children[e].regionId == list5[f].regionId){
													arr[a].children[b].children[c].children[d].children[e].children.push({
														value: list5[f].storeId,
														label: list5[f].storeName,
														regionId:list5[f].regionId,
														children: [],
													})
												}
											}else if(arr[a].children[b].children[c].children[d].children[e].regionId == list5[f].superiorId){
												arr[a].children[b].children[c].children[d].children[e].children.push({
													value: list5[f].regionId,
													label: list5[f].regionName,
													regionId:list5[f].regionId,
													children: [],
												})
											}
											
										}
									}
								}
							}
						}
					}
					this.shopClassifyList = arr
					console.log('bases',this.shopClassifyList)
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
</style>