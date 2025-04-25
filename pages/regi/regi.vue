<template>
	<view class="container">
		<view class="body">
			<view class="header">
				<text class="greeting">你好</text>
				<text class="welcome">欢迎加入我们</text>
			</view>
			<view class="form-container">
				<view class="form-item">
					<input type="text" placeholder="用户名" v-model="username" />
				</view>
				<view class="form-item">
					<input type="password" placeholder="密码" v-model="password" />
				</view>
				<view class="form-item">
					<input type="password" placeholder="再次输入密码" v-model="confirmPassword" />
				</view>
			</view>
			<button class="register-login-btn" @click="registerAndLogin">注册</button>
			<view class="link-container">
				<text>已有账号？</text>
				<navigator url="/pages/login/login" class="login-link">去登录</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				confirmPassword: ''
			};
		},
		methods: {
			registerAndLogin() {
				// 这里简单校验密码是否一致，实际项目中需更完善的校验
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none'
					});
					return;
				}
				// 此处应添加向服务器发送注册和登录请求的逻辑
				// 示例：
				// uni.request({
				//   url: 'your-api-url',
				//   method: 'POST',
				//   data: {
				//     username: this.username,
				//     password: this.password
				//   },
				//   success: (res) => {
				//     if (res.statusCode === 200) {
				//       uni.showToast({
				//         title: '注册登录成功',
				//         icon:'success'
				//       });
				//     } else {
				//       uni.showToast({
				//         title: '注册登录失败',
				//         icon: 'none'
				//       });
				//     }
				//   },
				//   fail: (err) => {
				//     uni.showToast({
				//       title: '网络错误',
				//       icon: 'none'
				//     });
				//   }
				// });
			}
		}
	};
</script>

<style>
	page {
		background-color: #ffffff;
		height: 100%;
	}

	.container {
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.body{
		padding: 20px;
		margin-top: 150px;
	}
	.header {
		text-align: left;
		margin-bottom: 40px;
		display: flex;
		flex-direction: column;
	}

	.greeting {
		font-size: 24px;
		color: #333;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.welcome {
		font-size: 16px;
		color: #666;
	}

	.form-container {
		width: 100%;
		margin-bottom: 20px;
	}

	.form-item {
		margin-bottom: 20px;
	}

	.form-item input {
		width: 94%;
		padding: 10px;
		border: none;
		border-bottom: 1px solid #ccc;
		font-size: 16px;
	}

	.register-login-btn {
		width: 100%;
		padding: 10px;
		background-color: #f58402;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		margin-bottom: 20px;
	}

	.link-container {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}

	.link-container text {
		color: #999;
		margin-right: 5px;
	}

	.login-link {
		color: #f58402;
		text-decoration: none;
	}
</style>