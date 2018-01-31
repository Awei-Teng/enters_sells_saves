<template>
  <div class="hello">
  			<button type="button" shiro:hasPermission="/resources/add" @click="" class="btn btn-info" style="float: right; margin-right: 1px;">新增</button>
        <button type="button" shiro:hasPermission="/resources/delete" onclick="delById();" class="btn btn-info" style="float: right; margin-right: 1px;">删除</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
