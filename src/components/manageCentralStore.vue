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

					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">门店:</span>
					<Cascader :data="shopClassifyList" v-model="tableInfo.arg.xstoreId" @on-change="change_storeId" style="width: 300px;padding:0 12px;display: inline-block;" size="small"></Cascader>		
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">品牌:</span>
				    <Select v-model="tableInfo.arg.xbrandId" style="width: 200px;padding:0 12px" size="small" clearable>
				        <Option v-for="item in brandIdList" :value="item.brandId">{{ item.brandName }}</Option>
				    </Select>
				    <span style="font:12px/32px 'microsoft yahei';padding-left:20px">商品名称:</span>
				    <Input placeholder="请输入群发内容..." v-model="tableInfo.arg.goodsName" style="width: 200px;padding:0 12px" size="small"></Input>
			    	<Button type="info" size="small" @click="btn_query">查询</Button>
				</div>
			</div>
			<div class="serach" style="margin-top:12px;">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="ios-search-strong"></Icon></span>
					<span>门店查询列表</span>	
				</div>
				<div class="serach_main">
					<span style="font:12px/32px 'microsoft yahei';padding-left:20px">库存量:</span>
					<span v-text="totalNumber" style="color: red;padding-left: 20px;"></span>
					<span style="font:12px/32px 'microsoft yahei';padding-left:40px">库存成本:</span>			
					<span v-text="totalCost" style="color: red;padding-left: 20px;"></span>
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
		<Modal width='500' v-model="modal_groupSend" title="群发">
			<Input placeholder="请输入群发内容..." v-model="arg_groupSend.content" type="textarea" :rows="4" ></Input>
			<div slot="footer" style="text-align: center;">
				<Button type="success" size='large' @click="up_groupSend">确定</Button>
				<Button type="info" size='large' @click="modal_groupSend=false">取消</Button>
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
				totalNumber:"",
				totalCost:"",
				data_table:[],
				shopClassifyList:[],
				brandIdList:[],
				goodsIdList:[],
            	total:null,
				modal_groupSend:false,
				arg_groupSend:{
				  "userId":"1",
				  "storeId": 16,
				  "content":" "
				},
				treeInfo: {
					url: window.http + '/store/region_classfy?userId=1',
				},
				tableInfo: {
					name: '商品管理',
					search: 0,
					url: window.http + '/inventory/base_depot_list',
					arg:{
						"xstoreId":[],
					    "xbrandId":'',
					    "adminId":1,
					    "brandId":null,
					    "goodsName":"",
					    "start":1,
					    "length":10
					},
					columns: [{
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
							title: '商品条码',
							key: 'goodsNumber',
							align: 'center',
							width: 100
						},
						{
							title: '库存数量',
							key: 'countNumber',
							align: 'center',
							width: 100
						},
						{
							title: '所属分公司',
							key: 'companyName',
							align: 'center',
							width: 100
						},
						{
							title: '成本金额',
							key: 'stockMoney',
							align: 'center',
							width: 100
						},
						{
							title: '售价金额',
							key: 'sellMoney',
							align: 'center',
							width: 100
						},
						{
							title: '日均销量',
							key: 'daysAvg',
							align: 'center',
							width: 100
						},
						{
							title: '可售天数',
							key: 'sellDay',
							align: 'center',
							width: 100
						}
					]
				},
			}

		},
		methods: {
			btn_query(){
//				this.down_table()
				if(this.tableInfo.arg.xbrandId!==''){
					this.tableInfo.arg.brandId = this.tableInfo.arg.xbrandId
				}else{
					this.tableInfo.arg.brandId = null
				}
				console.log(this.tableInfo.arg)
				this.down_table()
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
			up_groupSend(){
				this.$http({
					method: 'post',
					url: window.http + '/member/sendOutMessage',
					data: this.arg_groupSend
				}).then((res) => {
					console.log(res)
				});
			},
			show_groupSend(){
				this.modal_groupSend = true
				
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
					data:this.tableInfo.arg
				}).then((res) => {
					console.log(1,res)
					if(res.status==200){
						this.data_table = res.data.data
						this.total = res.data.recordsTotal
						this.totalNumber = res.data.totalNumber
						this.totalCost = res.data.totalCost
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
			}
		},
		mounted() {
			this.down_table()
			this.$http({
					method: 'post',
					url: window.http + '/store/region_classfy?userId=1',
				}).then((res) => {
					console.log(2,res)
					if(res.data.state == '00000') {
						this.shop_tree(res)
					}
				});
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
				top: 205px;
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