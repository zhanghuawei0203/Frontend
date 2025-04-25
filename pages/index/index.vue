<template>
	<view class="container">
		<view class="header">
			<view class="title">商品价格识别</view>
			<view class="detect-button-container">
				<button @click="detectImage" :disabled="isDetecting" class="detect-button common-button">
					<uniIcons :type="isDetecting ? 'spinner-cycle' : 'search'" size="20"></uniIcons>
					{{ isDetecting ? '检测中...' : '检测' }}
				</button>
			</view>
		</view>
		<view class="upload-section">
			<button @click="chooseImage" class="icon-button square-button">
                <view class="button-text">选择图片</view>
				<view class="icon-wrapper">
                    <uniIcons type="image" size="120"></uniIcons>
                </view>
						
			</button>
			<button @click="takePhoto" class="icon-button square-button">
				<view class="button-text">拍照上传</view>
                <view class="icon-wrapper">
                    <uniIcons type="camera" size="120"></uniIcons>
                </view>
			</button>

		</view>
       
		
		<view class="image-result-container">
            <view class="box-title">还没检测的图片</view>
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
                    <view class="product-name">{{ "商品名称:" + product.Name }}</view>
                    <view class="product-price">{{ "商品价格:" + product.num +"元"}}</view>
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
				selectedImage: '',
				resultImage: '',
				productData:'',
				productList: [],
				isDetecting:false,
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
					const backendUrl = 'http://localhost:8080/detect';
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
									this.resultImage = `http://localhost:8080${this.productData.image_url}`;
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
	.container {
		padding: 20px;
	}

	.title {
		font-size: 30px;
		margin-bottom: 20px;
		text-align: center;
	}
	.header {
    position: relative; /* 使检测按钮能相对于 header 定位 */
    text-align: center; /* 标题居中 */
    margin-bottom: 20px;
    display: flex; /* 使用 flex 布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
	}
	.detect-button-container {
	    position: absolute; /* 绝对定位 */
	    top: 50%; /* 垂直居中 */
	    right: 0; /* 定位到右侧 */
	    transform: translateY(-50%); /* 微调垂直位置 */
	}
    .square-button {
    width: 150px; /* 设定宽度 */
    height: 150px; /* 设定高度与宽度相等，形成正方形 */
    }
	.icon-wrapper {
	flex : 1;
    display: flex;
    align-items: center;
    justify-content: center;
	overflow: hidden;
	}
   .button-text {
		margin-bottom: -110px; /* 给文本和图标之间添加一些间距 */
	}
	.upload-section {
		margin-bottom: 20px;
		display: flex;
		justify-content: space-around;
	}

	.image-section {
		display: flex;
		justify-content: space-around;
	}
	.detect-button {
		background-color: #EB8750; /* 黄色 */
		color: black;
		width: 150px; 
		height: 50px;
		border: none;
		border-radius: 4px;
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
		flex-wrap: wrap; /* 允许换行 */
	}
	.image-box {
	    width: 100%;
 		height: 300px; 
	    border: 1px solid #ccc;
	    padding: 10px;
		display: flex; /* 使用 flexbox 布局 */
		align-items: center; /* 垂直居中 */
		justify-content: center; /* 水平居中 */
	    box-sizing: border-box;
		margin-bottom: 40px;
	}
	.result-box {
		width: 100%;
		height:300px;
	    border: 1px solid #ccc;
	    padding: 10px;
	    box-sizing: border-box;
	}
	.box-title {
	    font-size: 18px;
	    margin-bottom: 10px;
	    text-align: center;
		width: 100%;
	}
	.box-image {
	    width: 100%;
	    height: auto;
	}
	.product-item {
	    margin-bottom: 10px;
	}
	.product-name,
	.product-price {
	    font-size: 14px;
	}
	.original-image,
	.result-image {
		width: 48%;
	}
</style>