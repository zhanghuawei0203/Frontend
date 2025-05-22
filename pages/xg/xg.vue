<template>
	<view class="edit-info-container">
		<!-- 表单内容区域 -->
		<scroll-view class="form-content" scroll-y>
			<!-- 用户头像 -->
			<view class="avatar-section">
				<text class="section-label">头像</text>
				<view class="avatar-wrapper" @click="changeAvatar">
					<image class="avatar" :src="formData.avatar"></image>
					<image class="edit-icon" src="/static/common/edit.png"></image>
				</view>
			</view>

			<!-- 表单区域 -->
			<view class="form-section">
				<view class="form-item">
					<text class="item-label">用户名</text>
					<input class="item-input" v-model="formData.username" placeholder="请输入用户名" />
				</view>

				<view class="form-item">
					<text class="item-label">手机号</text>
					<input class="item-input" v-model="formData.phone" placeholder="请输入手机号" type="number" />
				</view>

				<view class="form-item">
					<text class="item-label">性别</text>
					<picker class="item-picker" mode="selector" :range="genderOptions" :value="genderIndex"
						@change="changeGender">
						<view class="picker-content">
							{{formData.gender}}
							<image class="arrow-icon" src="/static/irow.png"></image>
						</view>
					</picker>
				</view>

				<view class="form-item">
					<text class="item-label">生日</text>
					<picker class="item-picker" mode="date" :value="formData.birthday" @change="changeBirthday">
						<view class="picker-content">
							{{formData.birthday || '请选择生日'}}
							<image class="arrow-icon" src="/static/irow.png"></image>
						</view>
					</picker>
				</view>

				<view class="form-item">
					<text class="item-label">地区</text>
					<view class="picker-content" @click="showRegionPicker">
						{{formData.region || '请选择地区'}}
						<image class="arrow-icon" src="/static/irow.png"></image>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 底部保存按钮 -->
		<view class="footer-save-btn">
			<button class="save-button" @click="saveInfo">保存修改</button>
		</view>

		<!-- 省市区选择器弹窗 -->
		<view class="region-picker-modal" v-if="showRegionPickerModal" @touchmove.stop.prevent>
			<view class="modal-mask" @click="hideRegionPicker"></view>
			<view class="modal-content">
				<view class="modal-header">
					<text class="cancel-btn" @click="hideRegionPicker">取消</text>
					<text class="modal-title">选择地区</text>
					<text class="confirm-btn" @click="confirmRegion">确定</text>
				</view>
				<view class="region-picker">
					<picker-view class="picker-view" :value="regionIndex" @change="regionChange">
						<picker-view-column>
							<view class="picker-item" v-for="(province, index) in provinces" :key="index">{{province.name}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-item" v-for="(city, index) in cities" :key="index">{{city.name}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-item" v-for="(district, index) in districts" :key="index">{{district.name}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 固定省市区数据
	const regionData = [{
			name: "北京市",
			children: [{
				name: "北京市",
				children: [{
						name: "东城区"
					}, {
						name: "西城区"
					}, {
						name: "朝阳区"
					},
					{
						name: "海淀区"
					}, {
						name: "丰台区"
					}, {
						name: "石景山区"
					}
				]
			}]
		},
		{
			name: "上海市",
			children: [{
				name: "上海市",
				children: [{
						name: "黄浦区"
					}, {
						name: "徐汇区"
					}, {
						name: "长宁区"
					},
					{
						name: "静安区"
					}, {
						name: "普陀区"
					}, {
						name: "虹口区"
					}
				]
			}]
		},
		{
			name: "广东省",
			children: [{
					name: "广州市",
					children: [{
							name: "天河区"
						}, {
							name: "越秀区"
						}, {
							name: "海珠区"
						},
						{
							name: "荔湾区"
						}, {
							name: "白云区"
						}, {
							name: "黄埔区"
						}
					]
				},
				{
					name: "深圳市",
					children: [{
							name: "福田区"
						}, {
							name: "罗湖区"
						}, {
							name: "南山区"
						},
						{
							name: "宝安区"
						}, {
							name: "龙岗区"
						}, {
							name: "盐田区"
						}
					]
				}
			]
		},
		{
			name: "江苏省",
			children: [{
				name: "南京市",
				children: [{
						name: "玄武区"
					}, {
						name: "秦淮区"
					}, {
						name: "鼓楼区"
					},
					{
						name: "建邺区"
					}, {
						name: "雨花台区"
					}, {
						name: "栖霞区"
					}
				]
			}]
		}
	];

	export default {
		data() {
			return {
				// 固定用户数据
				formData: {
					avatar: "/static/head.png",
					username: "超市小达人",
					phone: "13800138000",
					gender: "男",
					birthday: "1990-01-01",
					region: "广东省深圳市福田区"
				},
				// 性别选项
				genderOptions: ["男", "女", "保密"],
				genderIndex: 0,
				// 地区选择相关数据
				showRegionPickerModal: false,
				provinces: regionData,
				cities: [],
				districts: [],
				regionIndex: [2, 1, 0], // 默认选中广东省深圳市福田区
				tempRegion: []
			}
		},
		created() {
			this.initRegionData();
		},
		methods: {
			// 初始化地区数据
			initRegionData() {
				// 设置默认城市和区县
				this.cities = this.provinces[this.regionIndex[0]].children;
				this.districts = this.cities[this.regionIndex[1]].children;
				this.tempRegion = [
					this.provinces[this.regionIndex[0]].name,
					this.cities[this.regionIndex[1]].name,
					this.districts[this.regionIndex[2]].name
				];
			},

			goBack() {
				uni.navigateBack();
			},

			// 保存信息
			saveInfo() {
				uni.showLoading({
					title: '保存中...',
					mask: true
				});

				setTimeout(() => {
					uni.hideLoading();
					uni.showToast({
						title: '信息保存成功',
						icon: 'success',
						duration: 1500
					});
				}, 1000);
			},

			// 修改头像
			changeAvatar() {
				uni.showToast({
					title: '选择头像功能',
					icon: 'none'
				});
			},

			// 修改性别
			changeGender(e) {
				this.genderIndex = e.detail.value;
				this.formData.gender = this.genderOptions[this.genderIndex];
			},

			// 修改生日
			changeBirthday(e) {
				this.formData.birthday = e.detail.value;
			},

			// 显示地区选择器
			showRegionPicker() {
				this.showRegionPickerModal = true;
			},

			// 隐藏地区选择器
			hideRegionPicker() {
				this.showRegionPickerModal = false;
			},

			// 地区选择变化
			regionChange(e) {
				const [provinceIdx, cityIdx, districtIdx] = e.detail.value;

				// 更新城市列表
				if (provinceIdx !== this.regionIndex[0]) {
					this.cities = this.provinces[provinceIdx].children;
					this.districts = this.cities[0].children;
					this.regionIndex = [provinceIdx, 0, 0];
				}
				// 更新区县列表
				else if (cityIdx !== this.regionIndex[1]) {
					this.districts = this.cities[cityIdx].children;
					this.regionIndex = [provinceIdx, cityIdx, 0];
				}
				// 只更新区县索引
				else {
					this.regionIndex = [provinceIdx, cityIdx, districtIdx];
				}

				// 更新临时选择的地区
				this.tempRegion = [
					this.provinces[this.regionIndex[0]].name,
					this.cities[this.regionIndex[1]].name,
					this.districts[this.regionIndex[2]].name
				];
			},

			// 确认地区选择
			confirmRegion() {
				this.formData.region = this.tempRegion.join('');
				this.hideRegionPicker();
			}
		}
	}
</script>

<style lang="scss">
	.edit-info-container {
		min-height: 100vh;
		background-color: #f7f7f7;
		padding-bottom: 120rpx;
		box-sizing: border-box;
	}

	/* 表单内容区域 */
	.form-content {
		height: calc(100vh - 120rpx);
	}

	/* 头像区域 */
	.avatar-section {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 30rpx;
		background-color: #fff;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		.section-label {
			font-size: 32rpx;
			color: #333;
		}

		.avatar-wrapper {
			position: relative;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}

			.edit-icon {
				position: absolute;
				right: 0;
				bottom: 0;
				top: 10;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	/* 表单区域 */
	.form-section {
		background-color: #fff;
		padding: 0 30rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f0f0f0;

		&:last-child {
			border-bottom: none;
		}

		.item-label {
			font-size: 32rpx;
			color: #333;
			width: 150rpx;
		}

		.item-input {
			flex: 1;
			font-size: 32rpx;
			text-align: right;
			color: #666;
			margin-right: 15rpx;
		}

		.item-picker {
			flex: 1;
		}

		.picker-content {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 32rpx;
			color: #666;

			.arrow-icon {
				width: 32rpx;
				height: 32rpx;
				margin-left: 15rpx;
			}
		}
	}

	/* 底部保存按钮 */
	.footer-save-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 30rpx;
		background-color: #fff;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);

		.save-button {
			background-color: #e98f36;
			color: #fff;
			border-radius: 50rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 32rpx;

			&:after {
				border: none;
			}
		}
	}

	/* 省市区选择器弹窗样式 */
	.region-picker-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;

		.modal-mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.modal-content {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			// border-radius: 20rpx 20rpx 0 0;
			padding-bottom: env(safe-area-inset-bottom);

			.modal-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;
				border-bottom: 1rpx solid #f0f0f0;

				.cancel-btn {
					font-size: 32rpx;
					color: #888;
				}

				.confirm-btn {
					font-size: 32rpx;
					color: #3187ff;
				}

				.modal-title {
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.region-picker {
				height: 500rpx;

				.picker-view {
					height: 100%;

					.picker-item {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 32rpx;
						// height: 80rpx;
						// line-height: 80rpx;
					}
				}
			}
		}
	}
</style>