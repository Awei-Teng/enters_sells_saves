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

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">时间区间:</span>
					<Date-picker v-model="arg_xtime" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 260px" size="small"></Date-picker>
					
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品编号:</span>
					<Input v-model="arg_goodsNumber" placeholder="请输入..." style="width: 200px;padding:0 12px" size="small"></Input>
					<Button type="info" size="small" @click="btn_query">查询</Button>
					<Button type="info" size="small" @click="show_addGoods">添加促销商品</Button>
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
		<Modal width='500' v-model="modal_addGoods" title="添加促销商品">
			<Form ref="arg_addGoods" :model="arg_addGoods" :label-width="90">
				<Form-item label="门店">
					<Cascader :data="shopClassifyList" v-model="arg_addGoods.xstoreId" @on-change="change_storeId"></Cascader>					
					<!--<Input v-model="arg_add.storeId" placeholder="请输入门店库存报警天数上限"></Input>-->
				</Form-item>
				<Form-item label="品牌">
				    <Select v-model="arg_addGoods.xbrandId" @on-change="change_brandId">
				        <Option v-for="item in brandIdList" :value="item.brandId">{{ item.brandName }}</Option>
				    </Select>
			    </Form-item>
			    <Form-item label="商品">
				    <Select v-model="arg_addGoods.xgoodsId">
				        <Option v-for="item in goodsIdList" :value="item.goodsId">{{ item.goodsName }}</Option>
				    </Select>
			    </Form-item>
				<Form-item label="超市返利点">
					<Input v-model="arg_addGoods.rebate" placeholder="请输入超市返利点" disabled></Input>
				</Form-item>
				<Form-item label="促销价格">
					<Input v-model="arg_addGoods.promotionPrice" placeholder="请输入促销价格"></Input>
				</Form-item>
				<Form-item label="促销返还点">
					<Input v-model="arg_addGoods.returnDot" placeholder="请输入促销返还点"></Input>
				</Form-item>
				<Form-item label="时间范围">
					<Date-picker v-model="arg_addGoods.xtime" type="daterange" format="yyyy-MM-dd" placeholder="选择日期和时间（不含秒）" style="width: 100%"></Date-picker>
				</Form-item>
				<Form-item label="批发差价">
					<Input v-model="arg_addGoods.differ" placeholder="请输入公司地址"></Input>
				</Form-item>
				<Form-item label="是否是超低价">
					    <RadioGroup v-model="disabledGroup">
					        <Radio label="是"></Radio>
					        <Radio label="不是"></Radio>
					    </RadioGroup>
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
	import bus from '../assets/bus.js'
	export default {
		components: {
			moduleTree,
		},
		data() {
			return {
				disabledGroup:'不是',
				memberSum:"",
				memberCount:"",
				data_table:[],
				dataDetail_table:[],
				shopClassifyList:[],
				arg_xtime:[],
				arg_goodsNumber:null,
				arg_endTime:[],
				brandIdList:[],
				goodsIdList:[],
            	total:null,
				modal_addGoods:false,
				arg_addGoods:{},
				dataDetail_columns:[{
							title: '类型',
							key: 'leixin',
							align: 'center',
						},
						{
							title: '计划',
							key: 'jihua',
							align: 'center',
						},
						{
							title: '实际',
							key: 'c',
							align: 'center',
						},
						{
							title: '说明',
							key: 'shuoming',
							align: 'center',
						},
					],
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
					name: "商品管理",
					
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: window.http + '/promotionGoods/get_promotion_goods_list',
					arg:{
					    "storeId":"15",
					    "start":"1",
					    "length":"10",
					    "goodsNumber":null,
					    "startTime":null,
					    "endTime":null
					},
					columns: [{
							title: '编号ID',
							key: 'promotionId',
							align: 'center',
							width: 100
						},{
							title: '商品编号',
							key: 'goodsNumber',
							align: 'center',
							width: 100
						},{
							title: '品牌名称',
							key: 'brandName',
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
							title: '促销价格',
							key: 'promotionPrice',
							align: 'center',
							width: 100
						},
						{
							title: '超市返利点',
							key: 'rebate',
							align: 'center',
							width: 100
						},
						{
							title: '促销返还点',
							key: 'returnDot',
							align: 'center',
							width: 100
						},
						{
							title: '是否为超低价格',
							key: 'isLowPrice',
							align: 'center',
							width: 140,
							render (row, column, index) {
	                            return row.isLowPrice==1?"不是":"是";
	                        }
						},
						{
							title: '开始时间',
							key: 'startTime',
							align: 'center',
							width: 180
						},
						{
							title: '结束时间',
							key: 'endTime',
							align: 'center',
							width: 180
						},
						{
							title: '批发差价',
							key: 'differ',
							align: 'center',
							width: 100
						},
						{
							title: '所属门店',
							key: 'storeName',
							align: 'center',
							width: 100
						},
					]
				},
			}

		},
		methods: {
			up_addGoods(){
				let up_arg = {
					    "goodsId":this.arg_addGoods.xgoodsId,
					    "rebate":this.arg_addGoods.rebate,
					    "promotionPrice":this.arg_addGoods.promotionPrice,
					    "returnDot":this.arg_addGoods.returnDot,
					    "startTime":bus.time(this.arg_addGoods.xtime[0],"no:"),
					    "endTime":bus.time(this.arg_addGoods.xtime[1],"no:"),
					    "differ":this.arg_addGoods.differ,
					    "storeId":this.arg_addGoods.xstoreId?this.arg_addGoods.xstoreId[this.arg_addGoods.xstoreId.length-1]:null,
					    "isLowPrice":this.disabledGroup=="不是"?1:2
					}
				if(!bus.checkEmpty(up_arg)){
					this.$Message.info("请检查输入是否完整！")
					return;
				}
				this.$http({
					method: 'post',
					url: window.http + '/promotionGoods/add_promotion_goods',
					data:up_arg
				}).then((res) => {
					console.log(333,res)
					this.$Message.info(res.data.msg)
				});
			},
			change_brandId(value){
				console.log(value)
				this.$http({
					method: 'post',
					url: window.http + '/promotionGoods/query_rebate',
					data:{
					  "brandId":this.arg_addGoods.xbrandId,
					  "storeId":this.arg_addGoods.xstoreId[this.arg_addGoods.xstoreId.length-1],
					}
				}).then((res) => {
					console.log(223,res)
						this.arg_addGoods.rebate = res.data.data
				});
				this.$http({
					method: 'post',
					url: window.http + '/goods/goods_by_brandId',
					data:{
					    "brandId":value
					}
				}).then((res) => {
					console.log(22,res)
						this.goodsIdList = res.data.data
				});
			},
			change_storeId(value, selectedData){
				console.log(value, selectedData)
				this.$http({
					method: 'post',
					url: window.http + '/promotionGoods/query_brand_storeId',
					data:{
					    "storeId":value[value.length-1]
					}
				}).then((res) => {
					console.log(2,res)
					if(res.data.state == '00000') {
						this.brandIdList = []
						this.brandIdList = res.data.data
					}
				});
			},
			show_addGoods(id){
				this.modal_addGoods = true
				this.$http({
					method: 'post',
					url: window.http + '/store/region_classfy?userId=1',
				}).then((res) => {
					console.log(2,res)
					if(res.data.state == '00000') {
						this.shop_tree(res)
					}
				});
			},
			btn_query(){
				if(this.arg_xtime[0]){
					this.tableInfo.arg.startTime = bus.time(this.arg_xtime[0]).split(' ')[0]
					this.tableInfo.arg.endTime = bus.time(this.arg_xtime[1]).split(' ')[0]
				}else{
					this.tableInfo.arg.startTime = null
					this.tableInfo.arg.endTime = null
				}
				if(this.arg_goodsNumber){
					this.tableInfo.arg.goodsNumber = Number(this.arg_goodsNumber)
				}else{
					this.tableInfo.arg.goodsNumber =null
				}
				
				this.down_table()
			},
			btn_check(){
				
			},
			pageCange(){
        		console.log(this.tableInfo.url.substring( this.tableInfo.url.indexOf('?'), this.tableInfo.url.indexOf('?')+1 ) )
        		if(this.tableInfo.url.indexOf('start')==-1){
        			
        		}
        		
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
			down_table(){
				this.$http({
					method: 'post',
					url: this.tableInfo.url,
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(1,res)
					if(res.status==200){
						
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].startTime = bus.time(res.data.data[i].startTime)
							res.data.data[i].endTime = bus.time(res.data.data[i].endTime)
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