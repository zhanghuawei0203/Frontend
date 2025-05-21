<template>
	<view class="container">
		<!-- 顶部头像和用户名区域 -->
		<view class="header">
			<image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
			<text class="username">{{ username }}</text>
		</view>
		<view class="bottom">
			<!-- 功能列表区域 -->
			<view class="function-list">
				<view class="function-item" @click="goToMessageCenter">
					<image class="icon" src="/static/logo.png" mode="aspectFit"></image>
					<text class="text">特权查询</text>
					<image class="arrow-icon" src="/static/irow.png" mode="aspectFit"></image>
				</view>
				<view class="function-item" @click="goToMessageCenter">
					<image class="icon" src="/static/logo.png" mode="aspectFit"></image>
					<text class="text">信息修改</text>
					<image class="arrow-icon" src="/static/irow.png" mode="aspectFit"></image>
				</view>
				<view class="function-item" @click="goToMessageCenter">
					<image class="icon" src="/static/logo.png" mode="aspectFit"></image>
					<text class="text">系统设置</text>
					<image class="arrow-icon" src="/static/irow.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<!-- 退出登录按钮区域 -->
		<view class="logout-button">
			<button class="logout-btn" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: '/static/logo.png', // 实际使用时需替换为真实头像地址
				username: 'user',
			};
		},
		methods: {
			logout() {
				// 退出登录逻辑，比如清除本地登录状态等
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							// 这里可添加清除本地token等操作
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}
					}
				});
			},
			goToMessageCenter() {

			}
		}
	};
</script>

<style>
	page {
		background-color: #f8f8f8;
		height: 100%;
	}

	.container {
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* 修改背景为图片，将路径替换为你实际的图片路径 */
		background-image: url('/static/back.png');
		background-size: cover;
		/* 使图片覆盖整个背景区域 */
		background-position: center;
		/* 图片居中显示 */
		padding: 20px;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.username {
		font-size: 18px;
		color: white;
		margin-top: 10px;
	}

	.bottom {
		height: 55%;
		display: flex;
		flex-direction: column;
	}

	.function-list {
		margin: 20px;
		padding: 10px;
		background-color: white;
	}

	.function-item {
		height: 30px;
		display: flex;
		align-items: center;
		padding: 15px 0;
		border-bottom: 2px solid #e0e0e0;
	}

	.icon {
		width: 25px;
		height: 25px;
		margin: 0 20px 0 10px;
	}

	.text {
		flex: 1;
		font-size: 20px;
	}

	.arrow-icon {
		width: 25px;
		height: 25px;
		margin: 0 0 0 10px;
	}

	.logout-button {
		text-align: center;
		margin: 20px;
		height: 20px;
		flex: 1;
	}

	.logout-btn {
		width: 100%;
		padding: 10px;
		background-color: white;
		color: #f04142;
		border-radius: 5px;
	}
</style>