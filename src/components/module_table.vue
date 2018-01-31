<template>
			<div class="module-table">
				<div class="title_icon">
					<span style="width:20px;border-right:1px solid #eee"></span>
					<span class="icon_titile"><Icon type="navicon-round"></Icon></span>
					<span>商品列表</span>
					<Table size="small" border :columns="tableInfo.columns" :data="data_table"></Table>
					<Page :total="total" @on-change="pageCange" style="text-align: center;margin: 20px;"></Page>
				</div>
			</div>
</template>
<script>
    export default {
        data () {
            return {
            	data_table:[],
            	total:null,
            	countNo:'',
            	countYes:'',
            }
        },
        props: ['tableInfo'],
        methods:{
        	getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var str = '?'+this.tableInfo.url.split('?')[1]
				var r = str.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
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
        	window.that = this
        	this.down_table()
        	console.log(this.tableInfo.url,'this.tableInfo.url,')
        }
    }
</script>
<style lang="less" scoped>
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
</style>