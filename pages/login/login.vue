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
			</view>
			<button class="login-btn" @click="login">登录</button>
			<view class="link-container">
				<text>没有账号？</text>
				<navigator url="/pages/regi/regi" class="login-link">去注册</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: 'user1',
				password: '123456',
			};
		},
		methods: {
			login() {
				// 校验用户名和密码
				if ((this.username === 'user1' || this.username === 'admin') && this.password === '123456') {
					uni.showToast({
						title: '登录成功',
						icon: 'success',
					});
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 1000);
					// 验证通过，跳转到首页
				} else {
					// 验证失败，显示错误提示
					uni.showToast({
						title: '用户名或密码错误',
						icon: 'none'
					});
				}
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

	.body {
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

	.login-btn {
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