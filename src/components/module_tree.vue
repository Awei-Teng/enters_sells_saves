<template>
	<div class="module_tree">
		<div class="title">商品分类</div>
		<div class="serach_tree">
			<Input v-model="input" placeholder="输入分类名称定位" style="width: 70%;margin-right:4%" size="small"></Input>
			<Button size="small">定位</Button>
		</div>
		<Tree :data="baseData" @on-select-change="click_tree" style="text-align: left; margin-left: 20px;"></Tree>
		<div class="edit_tree contain">
			<label for="edit_id" class="contain" style="margin-right: 8px;">标题</label><input v-model="treeName" class="contain" @input="edit_treeName" id="edit_id"></Input>
			<div class="contain" style="padding: 6px 0;">
				<input type="radio" id="zi" class="contain" name="grade" style="vertical-align: middle;" />
				<label for="zi" class="contain">子级分类</label>
				<input type="radio" id="tong" class="contain" name="grade" style="vertical-align: middle;" />
				<label for="tong" class="contain">同级分类</label>
			</div>
			<input v-model="add_treeName" id="edit_id" class="contain" style="width: 146px;margin-bottom: 6px;">
			<button class="contain" style="width: 100px;background: #2db7f5;border: none;border-radius: 4px;color: #fff;padding: 2px 0;">添加</button>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				input: '',
				baseData: [],
				treeName: '',
				treeObj: '',
				type_add_grade: '子级分类',
				add_treeName: ''
			}
		},
		props: ['treeInfo'],
		mounted() {
			window.selectTree = []
			this.$http({
				method: 'post',
				url: this.treeInfo.url,
			}).then((res)=> {
				console.log(this.treeInfo.url,res)
				if(res.data.state=="00000" || res.status ==200){
					if(this.treeInfo.url.indexOf('region_classfy')!=-1){
						this.shop_tree(res)
					}else if(this.treeInfo.url.indexOf('classify')!=-1){
						this.goods_tree(res)
					}else if(this.treeInfo.url.indexOf('company_list')!=-1){
						this.company_tree(res)
					}
					
				}
			});
		},
		methods: {
			company_tree(res){
				let data = res.data
				console.log(res,12)
				this.baseData = [{
                        title: '全部',
                        expand: true,
                        children: []
                    }]
                    
				data.map((item)=>{
					this.baseData[0].children.push({
                        title: item.companyName,
                        companyId: item.companyId,
                        expand: true,
                    })
				})
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
						expand: true,
						title: '全部',
						children: []
					}]
					
					for(let i=0;i<list1.length;i++){
						if(list1[i].storeName){
							arr[0].children.push({
								expand: true,
								title: list1[i].storeName,
								storeId:list1[i].storeId,
								regionId:list1[i].regionId,
								children: []
							})
						}else{
							arr[0].children.push({
								expand: true,
								title: list1[i].regionName,
								regionId:list1[i].regionId,
								children: []
							})
						}

						for(let j=0;j<list2.length;j++){
							if(list2[j].storeName){
								if(list2[j].regionId == arr[0].children[i].regionId){
									
									arr[0].children[i].children.push({
										expand: true, 
										title: list2[j].storeName,
										storeId:list2[j].storeId,
										regionId:list2[j].regionId,
										children: [],
									})
								}
							}else if(list2[j].superiorId == arr[0].children[i].regionId){
								
								arr[0].children[i].children.push({
									expand: true, 
									title: list2[j].regionName,
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
											expand: true, 
											title: list3[d].storeName,
											storeId:list3[d].storeId,
											regionId:list3[d].regionId,
											children: [],
										})
								}
							}else if(arr[a].children[b].children[c].regionId == list3[d].superiorId){
										
										arr[a].children[b].children[c].children.push({
											expand: true, 
											title: list3[d].regionName,
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
													expand: true, 
													title: list4[e].storeName,
													storeId:list4[e].storeId,
													regionId:list4[e].regionId,
													children: [],
												})
											}
										}else if(arr[a].children[b].children[c].children[d].regionId == list4[e].superiorId){
											
											arr[a].children[b].children[c].children[d].children.push({
												expand: true, 
												title: list4[e].regionName,
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
														expand: true, 
														title: list5[f].storeName,
														storeId:list5[f].storeId,
														regionId:list5[f].regionId,
														children: [],
													})
												}
											}else if(arr[a].children[b].children[c].children[d].children[e].regionId == list5[f].superiorId){
												arr[a].children[b].children[c].children[d].children[e].children.push({
													expand: true, 
													title: list5[f].regionName,
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
					this.baseData = arr
					console.log('bases',this.baseData)
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
						expand: true,
						title: '全部',
						children: []
					}]
					
					for(let i=0;i<list1.length;i++){
						arr[0].children.push({
							expand: true,
							title: list1[i].classifyName,
							classifyId:list1[i].classifyId,
							children: []
						})
						for(let j=0;j<list2.length;j++){
							if(list2[j].superiorId == arr[0].children[i].classifyId){
								
								arr[0].children[i].children.push({
									expand: true, 
									title: list2[j].classifyName,
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
											expand: true, 
											title: list3[d].classifyName,
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
												expand: true, 
												title: list4[e].classifyName,
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
													expand: true, 
													title: list5[f].classifyName,
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
					this.baseData = arr
					console.log('bases',this.baseData)
			},
			edit_treeName() {
				if(this.treeName != '') {
					console.log(this.treeObj)
					this.treeObj[0].title = this.treeName
				} else {
					this.$Message.info('输入不能为空!')
				}
			},
			click_tree(obj) {
				console.log(obj)
				window.selectTree = obj
				this.$emit('getStoreId', obj)
				if(obj.length!=0&&this.treeInfo.name){
					
					this.treeName = obj[0].title
					this.treeObj = obj
					
					const edit_tree = document.getElementsByClassName('edit_tree')[0]
	
					edit_tree.style.opacity = 1
					edit_tree.style.left = window.event.clientX + 60 + 'px'
					edit_tree.style.top = window.event.clientY - 26 + 'px'
	
					window.onclick = function(e) {
						if(!e.target.getAttribute('class') || (e.target.getAttribute('class').indexOf('ivu-tree-title') == -1 && e.target.getAttribute('class').indexOf('contain') == -1)) {
							edit_tree.style.opacity = 0
							setTimeout(function() {
								edit_tree.style.top = '-5000px'
							}, 500)
	
						}
					}
				}

			}
		}

	}
</script>
<style lang="less" scoped>
	.module_tree {
		width: 100%;
		height: 90%;
		background: #fff;
		.title {
			height: 30px;
			font: 700 12px/30px "";
			background: #eee;
			text-align: left;
			padding-left: 20px;
		}
		.serach_tree {
			text-align: left;
			padding-left: 18px;
			padding-top: 8px;
			height: 40px;
			border-bottom: 1px solid #ddd;
			border-top: 1px solid #ddd;
		}
		.edit_tree {
			z-index: 999;
			width: 200px;
			height: 120px;
			background: #fff;
			border: 1px solid #eee;
			position: absolute;
			left: 0;
			top:-5000px;
			opacity: 1;
			transition: opacity 0.5s ease-in-out;
			padding-top: 8px;
			#edit_id {
				width: 114px;
				border-radius: 4px;
				border: 1px solid #eee;
			}
		}
	}
</style>