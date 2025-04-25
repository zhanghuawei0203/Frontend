<template>
	<view class="container">
		<view class="product-list">
			<view class="product-item" v-for="(product, index) in filteredproductList" :key="index">
				<image class="product-img" :src="product.image" mode="aspectFill"></image>
				<view class="product-info">
					<text class="product-name">{{ product.name }}</text>
					<view class="detail">
						<text class="detail-label">识别结果</text>
					</view>
					<view class="detail">
						<text class="detail-value">{{ product.info }}</text>
					</view>
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
						image: 'https://picsum.photos/200', // 实际使用请替换为真实图片地址
						info: '可乐x1，农夫山泉x2',
					},
					{
						name: '商品1',
						image: 'https://picsum.photos/200', // 实际使用请替换为真实图片地址
						info: '可乐x1，农夫山泉x2',
					},
					{
						name: '商品1',
						image: 'https://picsum.photos/200', // 实际使用请替换为真实图片地址
						info: '可乐x1，农夫山泉x2',
					},
					{
						name: '商品1',
						image: 'https://picsum.photos/200', // 实际使用请替换为真实图片地址
						info: '可乐x1，农夫山泉x2',
					},
					{
						name: '商品1',
						image: 'https://picsum.photos/200', // 实际使用请替换为真实图片地址
						info: '可乐x1，农夫山泉x2',
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
		background-color: #f9f9f9;
	}
	.container {
		background-color: #f9f9f9;
		padding: 20px;
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
		width: 100px;
		height: 100px;
		margin: auto;
		/* object-fit: cover; */
		border-radius: 5px 0 0 5px;
	}

	.product-info {
		margin: auto;
		width: 50%;
		padding: 15px;
		
	}

	.product-name {
		font-size: 20px;
		margin-bottom: 10px;
	}

	.detail {
		display: flex;
		flex-direction: column;
		margin-bottom: 5px;
	}

	.detail-label {
		font-size: 14px;
		color: #333;
		margin-right: 15px;
	}

	.detail-value {
		font-size: 14px;
		color: #333;
	}

	.description {
		font-size: 14px;
		line-height: 1.4;
		color: #666;
	}
</style>