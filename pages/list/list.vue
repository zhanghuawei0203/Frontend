<template>
	<view class="container">
		<view class="product-list">
			<view class="product-item" v-for="(product, index) in filteredproductList" :key="index">
				<image class="product-img" :src="product.image" mode="aspectFill"></image>
				<view class="product-info">
					<text class="product-name">{{ product.name }}</text>
					<!-- <view class="detail">
						<text class="detail-label">识别结果</text>
					</view> -->
					<view class="detail">
						<text class="detail-info">{{ product.info }}</text>
						<text class="detail-time">{{ product.time }}</text>
					</view>
					<!-- <view class="detail">
						<text class="detail-value">{{ product.time }}</text>
					</view> -->
					<!-- <text class="description">{{ product.description }}</text> -->
					<!-- <text class="description">{{ product.description }}</text> -->
					<!-- <text class="description">{{ product.description }}</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: '',
				productList: [{
						name: '商品1',
						image: '/static/img/11.jpg', // 实际使用请替换为真实图片地址
						info: '百事可乐330mlx2，mini奥利奥55gx1，合味道海鲜风味84gx2',
						time: '2025-04-01 21:09:32'

					},
					{
						name: '商品2',
						image: '/static/img/22.jpg', // 实际使用请替换为真实图片地址
						info: '洽洽凉茶瓜子150gx1，高露洁冰爽180gx3，银鹭莲子玉米粥280gx1',
						time: '2025-04-01 21:10:42'
					},
					{
						name: '商品3',
						image: '/static/img/33.jpg', // 实际使用请替换为真实图片地址
						info: '芬达橙味500mlx3，嘉顿威化饼干柠檬味50gx3，QQ星均膳奶125mlx2',
						time: '2025-04-01 21:11:11'
					},
					{
						name: '商品4',
						image: '/static/img/44.jpg', // 实际使用请替换为真实图片地址
						info: '菜园小饼80gx2，上好佳洋葱圈40gx2，QQ星均膳奶125mlx1',
						time: '2025-04-01 21:12:42'
					},
					{
						name: '商品5',
						image: '/static/img/55.jpg', // 实际使用请替换为真实图片地址
						info: '维达立体美110x1',
						time: '2025-04-01 21:15:45'
					},
				]
			};
		},
		computed: {
			filteredproductList() {
				if (!this.searchText) {
					return this.productList;
				}
				return this.productList.filter(product => product.name.includes(this.searchText));
			}
		}
	};
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.container {
		background-color: #f8f8f8;
		padding: 15px;
	}

	.product-list {
		display: flex;
		flex-direction: column;
	}

	.product-item {
		display: flex;
		margin-bottom: 20px;
		background-color: white;
		border-radius: 5px;
		width: 100%;
		height: 150px;
		 
	}

	.product-img {
		width: 110px;
		height: 110px;
		margin: auto;
		border-radius: 5px;
		padding: 15px;
	}

	.product-info {
		margin: auto;
		width: 50%;
		padding: 15px;
		margin-top: 15px;
	}

	.product-name {
		font-size: 20px;
		font-weight: bold;
		/* margin-bottom: 20px; */
	}

	.detail {
	  position: relative; /* 为时间定位提供基准 */
	  height: 80px; /* 固定容器高度，根据内容调整 */
	  overflow: hidden; /* 隐藏溢出内容 */
	}
	
	.detail-info {
		margin-top: 10px;
	  font-size: 16px;
	  color: #333;
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 1; /* 限制显示两行 */
	  overflow: hidden;
	  
	}
	
	.detail-time {
	  
	  bottom: 0;
	  left: 0;
	  font-size: 14px; /* 缩小字体避免拥挤 */
	  color: #666;
	}
	.description {
		font-size: 14px;
		color: #666;
	}
</style>