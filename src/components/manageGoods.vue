<template>
	<div class="box">
		<Breadcrumb class="crumb" separator=">">
			<BreadcrumbItem href="/">
				<Icon type="ios-home-outline" style="font-size:14px"></Icon> 首页
			</BreadcrumbItem>
			<BreadcrumbItem href="/">商品管理</BreadcrumbItem>
			<BreadcrumbItem>商品管理</BreadcrumbItem>
		</Breadcrumb>
		<div class="thisName">
			<span>商品管理</span>
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
					<!--<button type="button" shiro:hasPermission="/resources/add" 
						@click="test" class="btn btn-info" style="float: right; margin-right: 1px;">新增</button>-->
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品选择:</span>
					<Input v-model="query_name" placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input v-model="query_goodsId" placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					
					<Button type="info" size="small" @click="up_query">查询</Button>
					<Button type="success" size="small" @click="show_addGoods">添加商品</Button>
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
		<!--{
	"priceId":"价格ID * ",
	"companyId":"1",
	"goodsId":"1",
	"wholesalePriceOne":"2",
	"wholesalePriceTwo":"3",
	"wholesalePriceThree":"3",
	"wholesalePriceFour":"3",
	"wholesalePriceFive":"3",
	"retailPriceOne":"3",
	"retailPriceTwo":"3",
	"retailPriceThree":"3",
	"retailPriceFour":"3",
	"retailPriceFive":"3"
}-->
		<Modal width='500' v-model="modal_editPrice" title="编辑价格">
			<Form ref="args_editPrice" :model="args_editPrice" :rules="ruleValidate" :label-width="90">
				<Form-item label="零售价格1" prop="retailPriceOne">
					<Input v-model="args_editPrice.retailPriceOne" placeholder="请输入零售价格1"></Input>
				</Form-item>
				<Form-item label="零售价格2" prop="retailPriceTwo">
					<Input v-model="args_editPrice.retailPriceTwo" placeholder="请输入零售价格2"></Input>
				</Form-item>
				<Form-item label="零售价格3" prop="retailPriceThree">
					<Input v-model="args_editPrice.retailPriceThree" placeholder="请输入零售价格3"></Input>
				</Form-item>
				<Form-item label="零售价格4" prop="retailPriceFour">
					<Input v-model="args_editPrice.retailPriceFour" placeholder="请输入零售价格4"></Input>
				</Form-item>
				<Form-item label="零售价格5" prop="retailPriceFive">
					<Input v-model="args_editPrice.retailPriceFive" placeholder="请输入零售价格5"></Input>
				</Form-item>
			</Form>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_editPrice">确定</Button>
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
					<Date-picker v-model="arg_addGoods.shelfLife" type="date" placeholder="请输入保质期" style="width:100%"></Date-picker>
					<!--<Input v-model="arg_addGoods.shelfLife" placeholder="请输入保质期"></Input>-->
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
				query_name:'',
				query_goodsId:null,
				data_table:[],
            	total:null,
				modal_allPrice: false,
				modal_editPrice: false,
				modal_addGoods: false,
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
					name: '商品管理',
					search: 0,
					url: window.http + '/goods?start=1&length=10',
					columns: [{
							title: '商品ID',
							key: 'goodsId',
							align: 'center',
							width: 100
						},
						{
							title: '商品名称',
							key: 'goodsName',
							align: 'center',
							width: 100
						},
						{
							title: '分类ID',
							key: 'classifyId',
							align: 'center',
							width: 100
						},
						{
							title: '‌品牌ID',
							key: 'brandId',
							align: 'center',
							width: 100
						},
						{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
							width: 100
						},
						{
							title: '型号',
							key: 'modelNumber',
							align: 'center',
							width: 100
						},
						{
							title: '规格',
							key: 'spec',
							align: 'center',
							width: 100
						},
						{
							title: '零售价格',
							key: 'retailPrice',
							width: 100,
							align: 'center',
							render: (h, params) => {
								return h('div', {
									style: {
										width: '100%',
										height: '100%',
										cursor: 'pointer',
										color:'#2d8cf0'
									},
									on: {
										click: () => {
											this.show_allPrice(params.row.goodsId)
										}
									}
								}, params.row.retailPrice);
							}
						},
						{
							title: '单位',
							key: 'unit',
							align: 'center',
							width: 100
						},
						{
							title: '保质期',
							key: 'shelfLife',
							align: 'center',
							width: 100
						},
						{
							title: '产地',
							key: 'productionAddress',
							align: 'center',
							width: 100
						},
						{
							title: '进货价格',
							key: 'restockPrice',
							align: 'center',
							width: 100
						},
						{
							title: '批发价格',
							key: 'wholesalePrice',
							align: 'center',
							width: 100
						},
						{
							title: '图片地址',
							key: 'imageUrl',
							align: 'center',
							width: 100
						},
						{
							title: '商品状态',
							key: 'goodsStatus',
							align: 'center',
							width: 100
						}, {
							title: '操作',
							key: 'action',
							fixed: "right",
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
												this.bt_editPrice(params.row.goodsId)
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
//									h('Button', {
//										props: {
//											type: 'primary',
//											size: 'small'
//										},
//										on: {
//											click: () => {
//												this.bt_Modify(params.row.id)
//											}
//										}
//									}, '删除')
								]);
							}
						}
					]
				},
				args_editPrice: {
					"priceId": "1",
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
			up_query(obj){
				if(obj.length){
					console.log('adf',obj)
					if(obj[0].storeId){
						this.tableInfo.url =window.http + '/goods?start=1&length=10'+'&storeId='+obj[0].storeId + '&goodsName='+this.query_name + '&goodsId='+ this.query_staffId
						this.down_table()
					}
				}else{
					this.tableInfo.url =window.http + '/goods?start=1&length=10'+ '&goodsName='+this.query_name
					this.down_table()
				}
					
				
			},
			up_editPrice(){
				this.$http({
					method: 'post',
					url: window.http + '/goods/update_price',
					data:this.args_editPrice,
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						window.that.down_table()
					}
				});
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
					  "shelfLife":this.timer(this.arg_addGoods.shelfLife),
					  "productionAddress":this.arg_addGoods.productionAddress,
					  "imageUrl":this.arg_addGoods.imageUrl
					},
				}).then((res) => {
					console.log(res,this.arg_addGoods)
					if(res.status == 200) {
					}
				});
			},
			show_allPrice(id) {
				this.modal_allPrice = true
				this.$http({
					method: 'post',
					url: window.http + '/goods/price_list?companyId=1&goodsId=' + id,
				}).then((res) => {
					console.log(res)
					if(res.status == 200) {
						this.data_allprice = res.data.data 
						||{ "retailPriceOne": "无",
							"retailPriceTwo": "无",
							"retailPriceThree": "无",
							"retailPriceFour": "无",
							"retailPriceFive": "无"
						  }
						console.log('res.data.data',res.data.data)
					}
				});
			},
			bt_editPrice(goodsId) {
				this.args_editPrice.goodsId = goodsId
				this.modal_editPrice = true
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
					method: 'get',
					url: this.tableInfo.url,
				}).then((res) => {
					console.log(res)
					if(res.status==200){
						
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