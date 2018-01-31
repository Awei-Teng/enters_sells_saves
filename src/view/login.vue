<template>
	<div class="login-box" style="overflow: hidden;">
		<i-form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box">
			<Form-item class="formLogin-title">
				<h3>系统登录</h3>
			</Form-item>
			<Form-item prop="username">
				<i-input size="large" type="text" id="userId" v-model="formLogin.username" placeholder="用户名">
					<Icon type="ios-person-outline" slot="prepend"></Icon>
				</i-input>
			</Form-item>
			<Form-item prop="password">
				<i-input size="large" type="password" placeholder="密码" id="passWord" v-model="formLogin.password">
					<Icon type="ios-locked-outline" slot="prepend"></Icon>
				</i-input>
			</Form-item>
			<Form-item class="login-no-bottom">
				<Checkbox v-model="remember" @on-change="checkBox"> 记住密码?</Checkbox>
			</Form-item>
			<Form-item class="login-no-bottom">
				<Row>
					<i-col :xs="{ span: 4, offset: 6 }">
						<i-button type="primary" id="login" @click="handleSubmit('formLogin')">登录</i-button>
					</i-col>
					<i-col :xs="{ span: 4, offset: 6 }">
						<i-button type="primary" id="resert" @click="formLoginReset('formLogin')">重置</i-button>
					</i-col>
				</Row>
			</Form-item>
		</i-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formLogin: {
					username: 'admin',
					password: 'admin',
				},
				remember: false,
				formLoginRules: {
					username: [
						{ required: true, message: '请填写用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请填写密码', trigger: 'blur' },
						{ type: 'string', min: 5, message: '密码长度5-20位', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			checkBox(value) {
				if(value) {
					this.remember = value;
					localStorage.setItem('username', this.formLogin.username);
					localStorage.setItem('password', this.formLogin.password);

				} else {
					this.remember = value;
					localStorage.removeItem('username');
					localStorage.removeItem('password');
				}
			},
			getSession() {
				this.formLogin.username = localStorage.getItem('username');
				this.formLogin.password = localStorage.getItem('password');
				if(this.formLogin.username != null && this.formLogin.username != '' && this.formLogin.password != null && this.formLogin.password != '') {
					this.remember = true;
					this.formLogin.username = localStorage.getItem('username');
					this.formLogin.password = localStorage.getItem('password');

				} else {
					this.remember = false;
					this.formLogin.username = '';
					this.formLogin.password = '';
				}
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					sessionStorage.setItem('user', JSON.stringify(this.formLogin.username));
					if(valid) {
						this.$http({
							method: 'post',
							url: window.http + '/login',
							data:{
							  "username":"admin",
							  "password":"admin"
							},
						}).then((res)=>{
							console.log(1,res)
							if(res.status==200){
								sessionStorage.userId = 1
								this.$router.push('/index')
							}
						});
					} else {
						this.$Message.error('请填写正确的账号和密码!');
					}
				})
			},
			formLoginReset(name) {
				this.$refs[name].resetFields();
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>
	.card-box {
		padding: 20px;
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin-bottom: 20px;
		background-color: #F9FAFC;
		margin: 180px auto;
		width: 400px;
	}
	
	.formLogin-title {
		text-align: center;
		font-size: 28px;
	}
	
	.formLogin-title h3 {
		font-size: 18px;
	}
	
	.login-no-bottom {
		margin-bottom: 10px;
	}
</style>