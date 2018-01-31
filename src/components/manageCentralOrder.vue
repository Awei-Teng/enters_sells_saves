<template>
	<div class="box">
		<Breadcrumb class="crumb" separator=">">
			<BreadcrumbItem href="/">
				<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
			</BreadcrumbItem>
			<BreadcrumbItem href="/">进货管理</BreadcrumbItem>
			<BreadcrumbItem>总仓进货查询</BreadcrumbItem>
		</Breadcrumb>
		<div class="thisName">
			<span>总仓进货查询</span>
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

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small">查询</Button>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="success" size="small" @click="show_addGoods">添加商品</Button>
				</div>
			</div>
			<div class="table-box">
				<div class="module-table">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="navicon-round"></Icon></span>
					<span>商品列表</span>
					<Table size="small" border :columns="tableInfo.columns" :data="data_table" @on-row-dblclick="row_dblclick"></Table>
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
		<Modal width='500' v-model="modal_editPrice" title="编辑价格">
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
		<Modal width='200' v-model="modal_allPrice" title="全部零售价格">
			<div class="v-row">
				<label for="one">价格一 : </label>
				<span id="one" v-text="data_allprice.retailPriceOne"></span>
			</div>
			<div class="v-row">
				<label for="two">价格二 : </label>
				<span id="two" v-text="data_allprice.retailPriceTwo"></span>
			</div>
			<div class="v-row">
				<label for="three">价格三 : </label>
				<span id="three" v-text="data_allprice.retailPriceThree"></span>
			</div>
			<div class="v-row">
				<label for="four">价格四 : </label>
				<span id="four" v-text="data_allprice.retailPriceFour"></span>
			</div>
			<div class="v-row">
				<label for="five">价格五 : </label>
				<span id="five" v-text="data_allprice.retailPriceFive"></span>
			</div>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
		<Modal width='500' v-model="modal_addGoods" title="添加商品">
			<Form ref="arg_modify" :model="arg_addGoods" :rules="ruleValidate" :label-width="90">
				<Form-item label="商品名称" prop="goodsName">
					<Input v-model="arg_addGoods.goodsName" placeholder="请输入商品名称"></Input>
				</Form-item>
				<Form-item label="分类" prop="classifyId">
					<!--<Input v-model="arg_addGoods.classifyId" placeholder="请输入分类ID"></Input>-->
					<Cascader :data="goodsClassifyList" v-model="arg_addGoods.classifyId"></Cascader>
				</Form-item>
				<Form-item label="品牌" prop="brandId">
					<Select v-model="arg_addGoods.brandId">
				        <Option v-for="item in brandList" :value="item.value">{{ item.label }}</Option>
				    </Select>
				</Form-item>
				<Form-item label="商品编号" prop="goodsNumber">
					<Input v-model="arg_addGoods.goodsNumber" placeholder="请输入商品编号"></Input>
				</Form-item>
				<Form-item label="型号" prop="modelNumber">
					<Input v-model="arg_addGoods.modelNumber" placeholder="请输入型号"></Input>
				</Form-item>
				<Form-item label="规格" prop="spec">
					<Input v-model="arg_addGoods.spec" placeholder="请输入规格"></Input>
				</Form-item>
				<Form-item label="单位" prop="unit">
					<Input v-model="arg_addGoods.unit" placeholder="请输入单位"></Input>
				</Form-item>
				<Form-item label="保质期" prop="shelfLife">
					<Input v-model="arg_addGoods.shelfLife" placeholder="请输入保质期"></Input>
				</Form-item>
				<Form-item label="产地" prop="productionAddress">
					<Input v-model="arg_addGoods.productionAddress" placeholder="请输入产地"></Input>
				</Form-item>
				<Form-item label="图片地址" prop="imageUrl">
					<Input v-model="arg_addGoods.imageUrl" placeholder="请输入图片地址"></Input>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_addGoods">确定</Button>
				<Button type="info" size='large' @click="modal_addGoods=false">取消</Button>
			</div>
		</Modal>
		<Modal width='1000' v-model="modal_detailStoreReturnOrder" title="门店退货单详情">
			<Table size="small" border :columns="columns_detail" :data="table_detail"></Table>
			<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
			<div slot="footer" style="text-align: center;">
				&nbsp;
			</div>
		</Modal>
	</div>
</template>
<!--宽高在这里写-->
<script>
	import moduleTree from '../components/module_tree'
	export default {
		components: {
			moduleTree,
		},
		data() {
			return {
				data_table:[],
            	total:null,
				modal_allPrice: false,
				modal_editPrice: false,
				modal_addGoods: false,
				modal_detailStoreReturnOrder: false,
				modal_edit: false,
				data_allprice: {},
				arg_addGoods:{
				  "goodsName":"商品名称 *",
				  "classifyId":[],
				  "brandId":null,
				  "goodsNumber":"商品编号",
				  "modelNumber":"型号 *",
				  "spec":"规格 *",
				  "unit":"单位 *",
				  "shelfLife":"保质期 *",
				  "productionAddress":"产地 *",
				  "imageUrl":"图片地址 *"
				},
				arg_modify: {
					"id": null,
					"password": null,
					"name": null,
					"address": null,
					"fax": null,
					"phone": null,
					"enable": "启用"
				},
				brandList: [],
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
                table_detail:[],
				columns_detail:[{
							title: '品牌名称',
							key: 'brandName',
							align: 'center',
							width:100
						},
						{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
							width:100
						},
						{
							title: '商品Id',
							key: 'detailNumber',
							align: 'center',
							width:100
						},
						{
							title: '数量',
							key: 'price',
							align: 'center',
							width:100
						},
						{
							title: '价格',
							key: 'countPrice',
							align: 'center',
							width:100
						},
						{
							title: '型号',
							key: 'modelNumber',
							align: 'center',
							width:100
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
							width:100
						},
						{
							title: '规格',
							key: 'noNumber',
							align: 'center',
							width:100
						},{
							title: '商品编号',
							key: 'countNumber',
							align: 'center',
							width:100
						},
						{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
							width:100
						},
						{
							title: 'sellDays',
							key: 'sellDays',
							align: 'center',
							width:100
						},
						{
							title: '平均数量',
							key: 'avgNmber',
							align: 'center',
							width:100
						},
						{
							title: 'laterSellDays',
							key: 'laterSellDays',
							align: 'center',
							width:100
						},
				],
				ruleValidate: {
					goodsName: [{
						required: true,
						message: '商品名称不能为空',
						trigger: 'blur'
					}],
					classifyId: [{
						required: true,
						message: '分类ID不能为空',
						trigger: 'blur'
					}],
					brandId: [{
						required: true,
						message: '品牌ID不能为空',
						trigger: 'blur'
					}],
					goodsNumber: [{
						required: true,
						message: '商品编号不能为空',
						trigger: 'blur'
					}],
					modelNumber: [{
						required: true,
						message: '型号不能为空',
						trigger: 'blur'
					}, ],
					spec: [{
						required: true,
						message: '规格不能为空',
						trigger: 'blur'
					}, ],
					unit: [{
						required: true,
						message: '单位不能为空',
						trigger: 'blur'
					}, ],
					shelfLife: [{
						required: true,
						message: '保质期不能为空',
						trigger: 'blur'
					}, ],
					productionAddress: [{
						required: true,
						message: '产地不能为空',
						trigger: 'blur'
					}, ],
					imageUrl: [{
						required: true,
						message: '图片地址不能为空',
						trigger: 'blur'
					}, ],
				},
				treeInfo: {
					url: window.http + '/classify',
					name: "商品管理"
				},
				tableInfo: {
					name: '门店进货查询',
					search: 0,
					//进货单管理与总仓订单管理接口一样?
					url: '/stock/order_list?start=1&length=10&userId=1',
					columns: [{
							title: '订单ID',
							key: 'orderId',
							align: 'center',
							width: 100
						},
						{
							title: '订单号',
							key: 'order',
							align: 'center',
							width: 100
						},
						{
							title: '‌员工ID',
							key: 'userId',
							align: 'center',
							width: 100
						},
						{
							title: '数量',
							key: 'number',
							align: 'center',
							width: 100
						},
						{
							title: '金额',
							key: 'money',
							align: 'center',
							width: 100
						},
						{
							title: '状态',
							key: 'status',
							align: 'center',
							width: 100
						},
						{
							title: '入库时间',
							key: 'putTime',
							align: 'center',
							width: 100
						},{
							title: '备注',
							key: 'reamke',
							align: 'center',
							width: 100
						},
						{
							title: '备注状态',
							key: 'reamkeStaus',
							align: 'center',
							width: 100
						},
						{
							title: '开始时间',
							key: 'startTime',
							align: 'center',
							width: 100
						},
						{
							title: '结束时间',
							key: 'endTime',
							align: 'center',
							width: 100
						},
						{
							title: '供应商名称',
							key: 'supplierName',
							align: 'center',
							width: 100
						},
						{
							title: 'name',
							key: 'name',
							align: 'center',
							width: 100
						},
						{
							title: '用户名',
							key: 'userName',
							align: 'center',
							width: 100
						},
						{
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
												this.bt_editPrice(params.row.id)
											}
										}
									}, '编辑价格'),
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
									}, '编辑'),
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
									}, '删除')
								]);
							}
						}
					]
				},
				args_editPrice: {
					"priceId": "价格ID",
					"companyId": "1",
					"goodsId": "1",
					"wholesalePriceOne": "2",
					"wholesalePriceTwo": "3",
					"wholesalePriceThree": "3",
					"wholesalePriceFour": "3",
					"wholesalePriceFive": "3",
					"retailPriceOne": "3",
					"retailPriceTwo": "3",
					"retailPriceThree": "3",
					"retailPriceFour": "3",
					"retailPriceFive": "3"
				}
			}

		},
		methods: {
			row_dblclick(row){
				console.log(row)
				this.modal_detailStoreReturnOrder = true
				
//				row.storeStockOrderId
				this.$http({
					method: 'get',
					url: window.http + '/stock/detail_list?orderId='+row.orderId,
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						this.table_detail = res.data.data
						for(let i=0;i<res.data.data.length;i++){
						}
					}
				});
			},
			show_addGoods(){
				this.modal_addGoods = true
				//品牌ID
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
				//分类ID
				this.$http({
					method: 'post',
					url: window.http + '/classify',
				}).then((res) => {
					console.log(2,res)
					if(res.status == 200) {
						this.goods_tree(res)
					}
				});
			},
			up_addGoods(){
				console.log('arg',{
					  "goodsName":this.arg_addGoods.goodsName,
					  "classifyId":this.arg_addGoods.classifyId.pop(),
					  "brandId":this.arg_addGoods.brandId,
					  "goodsNumber":this.arg_addGoods.goodsNumber,
					  "modelNumber":this.arg_addGoods.modelNumber,
					  "spec":this.arg_addGoods.spec,
					  "unit":this.arg_addGoods.unit,
					  "shelfLife":this.arg_addGoods.shelfLife,
					  "productionAddress":this.arg_addGoods.productionAddress,
					  "imageUrl":this.arg_addGoods.imageUrl
					})
				this.$http({
					method: 'post',
					url: window.http + '/goods/add',
					data:{
					  "goodsName":this.arg_addGoods.goodsName,
					  "classifyId":this.arg_addGoods.classifyId.pop(),
					  "brandId":this.arg_addGoods.brandId,
					  "goodsNumber":this.arg_addGoods.goodsNumber,
					  "modelNumber":this.arg_addGoods.modelNumber,
					  "spec":this.arg_addGoods.spec,
					  "unit":this.arg_addGoods.unit,
					  "shelfLife":this.arg_addGoods.shelfLife,
					  "productionAddress":this.arg_addGoods.productionAddress,
					  "imageUrl":this.arg_addGoods.imageUrl
					},
				}).then((res) => {
					console.log(res,this.arg_addGoods)
					if(res.status == 200) {
					}
				});
			},
			bt_editPrice(id) {
				this.modal_editPrice = true
				this.$http({
					method: 'post',
					url: window.http + '/users/update',
					data: {
						"id": id,
						"enable": "1"
					},
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						window.that.down_table()
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
			bt_assignRoles() {

			},
			bt_disabled(id) {
				this.$http({
					method: 'post',
					url: window.http + '/users/update',
					data: {
						"id": id,
						"enable": "2"
					},
				}).then(function(res) {
					console.log(res)
					if(res.status == 200) {
						window.that.down_table()
					}
				});
			},
			bt_Modify(id) {
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
					method: 'post',
					url:window.http + this.tableInfo.url,
					data:{
					  "storeId":15,
					  "start":1,
					  "length":20
					}
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						this.data_table = res.data.data
						console.log('this.data_table',this.data_table)
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