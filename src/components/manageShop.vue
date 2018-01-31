<template>
	<div class="box">
		<Breadcrumb class="crumb" separator=">">
			<BreadcrumbItem href="/">
				<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
			</BreadcrumbItem>
			<BreadcrumbItem href="/">门店管理</BreadcrumbItem>
			<BreadcrumbItem>门店管理</BreadcrumbItem>
		</Breadcrumb>
		<div class="thisName">
			<span>门店管理</span>
		</div>
		<div class="main-left">
			<module-tree :treeInfo="treeInfo"></module-tree>
		</div>
		<div class="main-right">
			<div class="serach">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>功能</span>
				</div>
				<div class="serach_main">

					<!--<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>-->
					<Button type="success" @click="btn_addShop">添加门店</Button>
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
		<Modal width='800' v-model="modal_edit" title="门店修改">
			<Form ref="arg_edit" :model="arg_edit" :label-width="90">
				<Row>
					<Col span="12">
					<Form-item label="门店名称" prop="storeName">
						<Input v-model="arg_edit.storeName" placeholder="请输入登录密码"></Input>
					</Form-item>
					<Form-item label="联系人" prop="contacts">
						<Input v-model="arg_edit.contacts" placeholder="请输入公司名称或者管理员名称"></Input>
					</Form-item>
					<Form-item label="联系方式" prop="storePhone">
						<Input v-model="arg_edit.storePhone" placeholder="请输入公司地址"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="storeTelephone">
						<Input v-model="arg_edit.storeTelephone" placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="门店分类ID" prop="regionId">
						<Input v-model="arg_edit.regionId" placeholder="请输入手机号"></Input>
					</Form-item>

					<Form-item label="门店负责人" prop="storeDirector">
						<Input v-model="arg_edit.storeDirector" placeholder="请输入登录密码"></Input>
					</Form-item>
					<Form-item label="计划员工人数" prop="staffNumber">
						<Input v-model="arg_edit.staffNumber" placeholder="请输入公司名称或者管理员名称"></Input>
					</Form-item>
					<Form-item label="门店合作分类ID" prop="storeClassifyId" :label-width="100">
						<Input v-model="arg_edit.storeClassifyId" placeholder="请输入公司地址"></Input>
					</Form-item>
					</Col>
					
					<Col span="12">
					<Form-item label="经纬度" prop="longitudeLatitude">
						<Input v-model="arg_edit.longitudeLatitude" placeholder="请输入手机号"></Input>
					</Form-item>

					<Form-item label="门店状态" prop="storeStatus">
						<Input v-model="arg_edit.storeStatus" placeholder="请输入登录密码"></Input>
					</Form-item>
					<Form-item label="品牌数量" prop="brandNumber">
						<Input v-model="arg_edit.brandNumber" placeholder="请输入公司名称或者管理员名称"></Input>
					</Form-item>
					<Form-item label="门店库存报警天数上限" :label-width="140" prop="repertoryAlarmUpperlimit">
						<Input v-model="arg_edit.repertoryAlarmUpperlimit" placeholder="请输入公司地址"></Input>
					</Form-item>
					<Form-item label="门店库存报警天数下限"  :label-width="140" prop="repertoryAlarmLowlimit">
						<Input v-model="arg_edit.repertoryAlarmLowlimit" placeholder="请输入邮箱"></Input>
					</Form-item>
					<!--<Form-item label="盈利模式" prop="profitPattern">
						<Input v-model="arg_edit.profitPattern" placeholder="请输入手机号"></Input>
					</Form-item>-->
					
					<Form-item label="合作模式" prop="profitType">
						<!--<Input v-model="arg_edit.profitType" placeholder="请输入手机号"></Input>-->
						<Select v-model="arg_edit.profitType">
					        <Option v-for="item in profitTypeList" :value="item.value">{{ item.label }}</Option>
					    </Select>
					</Form-item>
					<Form-item label="返利点" prop="rebate">
						<Input v-model="arg_edit.rebate" placeholder="请输入手机号"></Input>
					</Form-item>
					<Form-item label="门店地址" prop="storeAddress">
						<Input v-model="arg_edit.storeAddress" placeholder="请输入邮箱"></Input>
					</Form-item>
					<!--<Form-item label="品牌ids" prop="brandIds">
						<Input v-model="arg_edit.brandIds" placeholder="请输入手机号"></Input>
					</Form-item>-->
					</Col>
				</Row>
				
			</Form>
			<div style="text-align: center;font: 16px/40px '';">选择品牌</div>
			<Select
	            v-model="arg_brandList"
	            multiple
	            filterable
	            remote
	            placeholder="请输入搜索关键字..."
	            :remote-method="remoteMethod2"
	            :loading="loading2">
	            <Option v-for="option in brandOptions" :value="option.value" :key="option.label">{{option.label}}</Option>
	        </Select>
			<!--<Checkbox-group v-model="selectBrandGroup" @on-change="brandGroupChange">
				        <Checkbox :label="allBrandGroup[index]" v-for="(item,index) in allBrandGroup"></Checkbox>
			</Checkbox-group>-->
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_edit">确定</Button>
				<Button type="info" size='large' @click="modal_edit=false">取消</Button>
			</div>
		</Modal>
				<Modal width='800' v-model="modal_addShop" title="添加门店">
			<Form ref="arg_add" :model="arg_add" :label-width="90">
				<Row>
					<Col span="12">
					<Form-item label="门店名称" prop="storeName">
						<Input v-model="arg_add.storeName" placeholder="请输入门店名称"></Input>
					</Form-item>
					<Form-item label="联系人" prop="contacts">
						<Input v-model="arg_add.contacts" placeholder="请输入联系人"></Input>
					</Form-item>
					<Form-item label="联系方式" prop="storePhone">
						<Input v-model="arg_add.storePhone" placeholder="请输入联系方式"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="storeTelephone">
						<Input v-model="arg_add.storeTelephone" placeholder="请输入固定电话"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="regionOneId">
						<Input v-model="arg_add.regionOneId" placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="regionTwoId">
						<Input v-model="arg_add.regionTwoId" placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="regionThreeId">
						<Input v-model="arg_add.regionThreeId" placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="regionFourId">
						<Input v-model="arg_add.regionFourId" placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="固定电话" prop="regionFiveId">
						<Input v-model="arg_add.regionFiveId" placeholder="请输入邮箱"></Input>
					</Form-item>
					<Form-item label="门店负责人" prop="storeDirector">
						<Input v-model="arg_add.storeDirector" placeholder="请输入门店负责人"></Input>
					</Form-item>
					</Col>
					
					<Col span="12">
					<Form-item label="门店地址" prop="storeAddress" :label-width="100">
						<Input v-model="arg_add.storeAddress" placeholder="请输入门店地址"></Input>
					</Form-item>
					<Form-item label="经纬度" prop="longitudeLatitude" :label-width="100">
						<Input v-model="arg_add.longitudeLatitude" placeholder="请输入经纬度"></Input>
					</Form-item>
					<Form-item label="门店状态" prop="storeStatus" :label-width="100">
						<Input v-model="arg_add.storeStatus" placeholder="请输入门店状态"></Input>
					</Form-item>
					<Form-item label="品牌数量" prop="brandNumber" :label-width="100">
						<Input v-model="arg_add.brandNumber" placeholder="请输入品牌数量"></Input>
					</Form-item>
					<Form-item label="门店库存报警天数上限" prop="repertoryAlarmUpperlimit" :label-width="150">
						<Input v-model="arg_add.repertoryAlarmUpperlimit" placeholder="请输入门店库存报警天数上限"></Input>
					</Form-item>
					
					<Form-item label="门店库存报警天数下限" prop="repertoryAlarmLowlimit":label-width="150">
						<Input v-model="arg_edit.repertoryAlarmLowlimit" placeholder="请输入门店库存报警天数下限"></Input>
					</Form-item>
					<Form-item label="计划员工人数" prop="staffNumber">
						<Input v-model="arg_add.staffNumber" placeholder="请输入计划员工人数"></Input>
					</Form-item>
					<!--<Form-item label="盈利模式" prop="profitPattern">
						<Input v-model="arg_edit.profitPattern" placeholder="请输入盈利模式"></Input>
					</Form-item>-->
						<Form-item label="合作模式" prop="profitType">
						<Select v-model="arg_edit.profitType">
					        <Option v-for="item in profitTypeList" :value="item.value">{{ item.label }}</Option>
					    </Select>
					</Form-item>
					<Form-item label="返利点" prop="rebate">
						<Input v-model="arg_edit.rebate" placeholder="请输入返利点"></Input>
					</Form-item>
					<!--<Form-item label="品牌ids" prop="brandIds">
						<Input v-model="arg_edit.brandIds" placeholder="请输入手机号"></Input>
					</Form-item>-->
						<Form-item label="门店合作分类ID" prop="storeClassifyId" :label-width="100">
						<Input v-model="arg_add.storeClassifyId" placeholder="请输入门店合作分类ID"></Input>
					</Form-item>
					</Col>
				</Row>
				
			</Form>
			<div style="text-align: center;font: 16px/40px '';">选择品牌</div>
			<Select
	            v-model="arg_brandList"
	            multiple
	            filterable
	            remote
	            placeholder="请输入搜索关键字..."
	            :remote-method="remoteMethod2"
	            :loading="loading2">
	            <Option v-for="option in brandOptions" :value="option.value" :key="option.label">{{option.label}}</Option>
	        </Select>
			<!--<Checkbox-group v-model="selectBrandGroup" @on-change="brandGroupChange">
				        <Checkbox :label="allBrandGroup[index]" v-for="(item,index) in allBrandGroup"></Checkbox>
			</Checkbox-group>-->
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_add">确定</Button>
				<Button type="info" size='large' @click="modal_addShop=false">取消</Button>
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
				modal_addShop:false,
				data_table:[],
            	total:null,
				arg_brandList: [],
                loading2: false,
                brandOptions: [],
				data_allBrand:[],
				allBrandGroup:[],
				selectBrandGroup:[],
				arg_edit: {
					"storeId": "1",
					"storeName": "2",
					"contacts": "12",
					"storePhone": "21",
					"storeTelephone": "21",
					"regionId": "21",
					"storeDirector": "12",
					"staffNumber": "21",
					"storeClassifyId": "12",
					"storeAddress": "12",
					"longitudeLatitude": "21",
					"storeStatus": "21",
					"brandNumber": "21",
					"repertoryAlarmUpperlimit": "21",
					"repertoryAlarmLowlimit": "12",
					"profitPattern": "12",
					"profitType": "21",
					"rebate": "12",
					"brandIds": "2,5,6,7,8,9",
					"type":1
				},
				profitTypeList: [
                    {
                        value: 1,
                        label: '私营'
                    },{
                        value: 2,
                        label: '联营'
                    }
                ],
				modal_edit: false,
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
					name: "门店管理"
				},
				tableInfo: {
					name: '门店管理',
					search: 0,
					url: window.http + '/store',
					columns: [{
							title: '门店ID',
							key: 'storeId',
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
							title: '联系人',
							key: 'contacts',
							align: 'center',
							width: 100
						},
						{
							title: '联系方式',
							key: 'storePhone',
							align: 'center',
							width: 120
						},
						{
							title: '固定电话',
							key: 'storeTelephone',
							align: 'center',
							width: 100
						},
						{
							title: '型号',
							key: 'storeDirector',
							align: 'center',
							width: 100
						},
						{
							title: '计划员工人数',
							key: 'staffNumber',
							align: 'center',
							width: 110
						},
						{
							title: '门店合作分类ID',
							key: 'storeClassifyId',
							align: 'center',
							width: 130
						},
						{
							title: '门店地址',
							key: 'storeAddress',
							align: 'center',
							width: 100
						},
						{
							title: '经纬度',
							key: 'longitudeLatitude',
							align: 'center',
							width: 120,
						},
						{
							title: '门店状态',
							key: 'storeStatus',
							align: 'center',
							width: 100
						},
						{
							title: '品牌数量',
							key: 'brandNumber',
							align: 'center',
							width: 100
						},
						{
							title: '报警天数上限',
							key: 'repertoryAlarmUpperlimit',
							align: 'center',
							width: 110
						},
						{
							title: '报警天数下限',
							key: 'repertoryAlarmLowlimit',
							align: 'center',
							width: 110
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
												this.bt_edit(params.row)
												this.arg_edit = params.row
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
												this.up_delete(params.row.storeId)
											}
										}
									}, '删除')
								]);
							}
						}
					]
				},
				arg_add:{
					"storeName":null,
					"contacts":"1",
					"storePhone":"1",
					"storeTelephone":"1",
					"regionOneId":"1",
					"regionTwoId":"1",
					"regionThreeId":"1",
					"regionFourId":"1",
					"regionFiveId":"1",
					"storeDirector":"1",
					"staffNumber":"1",
					"storeClassifyId":"1",
					"storeAddress":"1",
					"longitudeLatitude":"1",
					"storeStatus":"1",
					"brandNumber":"1",
					"repertoryAlarmUpperlimit":"1",
					"repertoryAlarmLowlimit":"1",
					"profitPattern":"1",
					"profitType":"1",
					"rebate":"1",
					"brandIds":"2,5,6,7,8,9"
				
				}
			}
		},
		methods: {
			isEmpty(arg,type){
					if(type=='obj'){
						for(var item in arg){
							if(arg[item]==='' || arg[item]===null || arg[item]===undefined || arg[item]===NaN || (arg[item] && typeof arg[item]=="string"&&arg[item].trim().length == 0) ){
									return false;
							}
						}
						return true;
					}else{
						if(arg==='' || arg===null || arg===undefined || arg===NaN || (arg && typeof arg=="string"&&arg.trim().length == 0) ){
							return false;
						}else{
							return true;
						}
					}
			},
			up_add(){
				console.log('arg_brandList',this.arg_brandList)
				let allBrandId = ''
				for(let i=0;i<this.arg_brandList.length;i++){
					allBrandId += this.arg_brandList[i]+','
				}
				this.arg_add.brandIds = allBrandId.substring(0,allBrandId.length-1)
				console.log('arg_brandList',this.arg_brandList,this.arg_add.brandIds)
				console.log('this.arg_add,',this.arg_add)
				if(!this.isEmpty(this.arg_add,'obj')){
					console.log('adsfaf')
					this.$Message.info("请检查输入是否完整！")
					return;
				}
//				this.$http({
//					method: 'post',
//					url:window.http+ '/store/update',
//					data:this.arg_add,
//				}).then((res)=> {
//					console.log(res)
//						this.$Message.info(res.data.msg)
//				});
			},
			btn_addShop(){
				this.modal_addShop = true
			},
			up_delete(id){
				 this.$http({
					method: 'post',
					url:window.http+ '/store/update',
					data:{
						"storeStatus":2,
						"storeId":id,
						"type":2
					}
				 }).then((res)=> {
					if(res.status==200){
						console.log(res,'res')
						this.$Message.info(res.data.msg)
						this.down_table()
					}
				});
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
			up_edit(){
//				let allBrandId = ''
//				for(let i=0;i<this.data_allBrand.length;i++){
//					for(let j=0;j<this.selectBrandGroup.length;j++)
//					if(this.data_allBrand[i].brandName ==this.selectBrandGroup[j]){
//						allBrandId += this.data_allBrand[i].brandId+','
//					}
//				}
//				this.arg_edit.brandIds = allBrandId.substring(0,allBrandId.length-1)
				console.log('arg_brandList',this.arg_brandList)
				let allBrandId = ''
				for(let i=0;i<this.arg_brandList.length;i++){
					allBrandId += this.arg_brandList[i]+','
				}
				this.arg_edit.brandIds = allBrandId.substring(0,allBrandId.length-1)
				console.log('arg_brandList',this.arg_brandList,this.arg_edit.brandIds)
				console.log('this.arg_edit,',this.arg_edit)
//				this.$http({
//					method: 'post',
//					url:window.http+ '/store/update',
//					data:this.arg_edit,
//				}).then((res)=> {
//					console.log(res)
//						this.$Message.info(res.data.msg)
//				});
			},
			brandGroupChange(){
				console.log(this.selectBrandGroup)
			},
			bt_edit() {
				this.modal_edit = true
				this.$http({
					method: 'get',
					url:window.http+ '/brand',
				}).then((res)=> {
					console.log(res)
					this.data_allBrand = res.data.data
					if(res.status==200){
						this.allBrandGroup = []
						for(let i=0;i<res.data.data.length;i++){
							this.allBrandGroup.push(res.data.data[i].brandName)
						}
						
					}
				});
			},
			pageCange(val){
				console.log(val)
				this.tableInfo.url = window.http + '/store?start='+val+'&length=10'
				this.down_table()
        		
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