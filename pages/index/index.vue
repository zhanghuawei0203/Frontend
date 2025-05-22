<template>
	<view class="container">
		<view class="header">
			<view class="title">商品价格识别</view>
			
		</view>
		<view class="upload">
			<view class="text">请选择图片上传方式</view>
			<view class="upload-section">

				<button @click="chooseImage" class="icon-button square-button">
					<view class="button-text">选择图片</view>
					<view class="icon-wrapper">
						<uniIcons type="image" size="80" color="#eb8750"></uniIcons>
					</view>

				</button>
				<button @click="takePhoto" class="icon-button square-button">
					<view class="button-text">拍照上传</view>
					<view class="icon-wrapper">
						<uniIcons type="camera" size="80" color="#eb8750"></uniIcons>
					</view>
				</button>
			</view>

		</view>
		<view class="detect-button-container">
			<button @click="detectImage" :disabled="isDetecting" class="detect-button common-button">
				<uniIcons :type="isDetecting ? 'spinner-cycle' : 'search'" size="20" color="white"></uniIcons>
				{{ isDetecting ? '检测中...' : '开始检测' }}
			</button>
		</view>


		<view class="image-result-container">
			<view class="box-title">待检测的图片</view>
			<view class="image-box">
				<image v-if="selectedImage" :src="selectedImage" mode="aspectFit" class="image"></image>
			</view>
			<view class="box-title">使用yolo算法检测后图片</view>
			<view class="image-box">

				<image v-if="resultImage" :src="resultImage" mode="aspectFit" class="image"></image>
			</view>
			<view class="box-title">检测结果</view>
			<!-- 检测结果区域 -->
			<view class="result-box">

				<view class="product-item" v-for="product in productList" :key="product.id">
					<view class="product-name">{{ "商品名称：" + product.Name }}</view>
					<view class="product-price">{{ "商品价格：" + product.num +"元"}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from 'axios';
	import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				selectedImage: '/static/de.jpg',
				resultImage: '/static/de.jpg',
				productData: '',
				productList: [
					{
						Name:'--',
						num:'--'
					}
				],
				isDetecting: false,
			};
		},
		methods: {
			clearDetectionResults() {
				this.resultImage = '';
				this.productData = '';
				this.productList = [];
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: (res) => {
						this.clearDetectionResults();
						this.selectedImage = res.tempFilePaths[0];
						// console.log(this.selectedImage )
					},
					fail: (err) => {
						console.error('选择图片失败', err);
					}
				});
			},
			takePhoto() {
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: (res) => {
						this.clearDetectionResults();
						this.selectedImage = res.tempFilePaths[0];
						// console.log(this.selectedImage )
					},
					fail: (err) => {
						console.error('拍摄图片失败', err);
					}
				});
			},
			detectImage() {
				if (this.selectedImage) {
					// this.fetchImage(this.selectedImage);
					this.isDetecting = true; // 开始检测，设置为 true
					const backendUrl = 'http://10.153.230.110:8080/detect';
					uni.uploadFile({
						url: backendUrl,
						filePath: this.selectedImage,
						name: 'image',
						responseType: 'arraybuffer', // 指定响应类型为二进制数据
						success: (res) => {
							if (res.statusCode === 200) {
								this.productData = JSON.parse(res.data);
								this.productList = this.productData.data;
								if (this.productData.image_url) {
									// 直接使用后端返回的图片 URL
									this.resultImage = `http://10.153.230.110:8080${this.productData.image_url}`;
									// console.log(this.productList);
								} else {
									console.error('后端返回的结果中没有图片 URL');
								}
							} else {
								console.error('上传失败，状态码：', res.statusCode);
							}
						},
						fail: (err) => {
							console.error('上传失败', err);
						},
						complete: () => {
							this.isDetecting = false; // 检测完成，设置为 false
						}
					});
				} else {
					console.error('请先选择或拍摄图片');
				}
			},
		}
	};
</script>

<style scoped>
	page {
		background-color: #f8f8f8;
	}

	.container {
		padding: 20px;
	}

	.title {
		font-size: 24px;
		font-weight: bold;
		/* margin-top: 10px; */
		text-align: center;
	}

	.header {
		height: 40px;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 18rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		text-align: center;
		/* 标题居中 */
		margin-top: -10px;
		margin-bottom: 20px;
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
	}

	.detect-button-container {
		margin-top: 45px;
		/* 定位到右侧 */
		transform: translateY(-50%);
		/* 微调垂直位置 */
	}

	.square-button {
		width: 120px;
		/* 设定宽度 */
		height: 120px;
		background-color: white;
		border: 2px solid #EB8750;
		/* box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05); */
		/* 设定高度与宽度相等，形成正方形 */
	}

	.icon-wrapper {
		margin-top: 40px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.button-text {
		color: #626262;
		margin-bottom: -110px;
		/* 给文本和图标之间添加一些间距 */
	}

	.upload {
		/* display: flex; */
		background-color: #fff;
		border-radius: 18rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		padding: 20px;
	}

	.text {
		margin: 0 auto;
		/* 上下 margin 为 0，左右自动居中 */
		max-width: fit-content;
		/* 自适应内容宽度 */
		font-size: 20px;
		color: #626262;
		align-items: center;
		justify-content: center;
	}

	.upload-section {
		margin-top: 30px;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-around;
	}


	.image-section {
		display: flex;
		justify-content: space-around;
	}

	.detect-button {
		background-color: #EB8750;
		/* 黄色 */
		color: white;
		width: 300px;
		height: 50px;
		border: none;
		border-radius: 50px;
		margin-bottom: 20px;
	}

	/* 点击时按钮变灰 */
	.detect-button:active,
	.icon-button:active {
		background-color: #ccc;
		color: #666;
	}

	/* 检测中按钮样式 */
	.detect-button:disabled {
		background-color: #b1b1b1;
		color: #666;
		cursor: not-allowed;
	}

	.image-section {
		display: flex;
		justify-content: space-around;
	}

	.image-result-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: -25px;
		/* 允许换行 */
	}

	.image-box {
		width: 100%;
		height: 300px;
		/* border: 1px solid #ccc; */
		padding: 10px;
		display: flex;
		/* 使用 flexbox 布局 */
		align-items: center;
		/* 垂直居中 */
		justify-content: center;
		/* 水平居中 */
		box-sizing: border-box;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius:0 0 18rpx 18rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.result-box {
		width: 100%;
		height: 300px;
		/* border: 1px solid #ccc; */
		padding: 10px;
		box-sizing: border-box;
		background-color: #fff;
		border-radius:0 0 18rpx 18rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.box-title {
		margin: auto;
		font-size: 18px;
		padding: 10px;
		/* margin-bottom: 10px; */
		text-align: center;
		width: 100%;
		background-color: #fff;
		border-radius: 500px 500px 0 0;
		border-bottom: 2px solid #ebebeb;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.box-image {
		width: 100%;
		height: auto;
	}

	.product-item {
		margin-bottom: 10px;
		padding: 20px;
	}

	.product-name,
	.product-price {
		font-size: 18px;
	}

	.original-image,
	.result-image {
		width: 48%;
	}
</style>