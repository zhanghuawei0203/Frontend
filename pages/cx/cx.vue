<template>
  <view class="privilege-container">
    <!-- 自定义导航栏 -->
    <!-- <view class="custom-nav-bar">
      <view class="nav-back" @click="goBack">
        <image class="back-icon" src="/static/common/back.png"></image>
      </view>
      <text class="nav-title">会员特权查询</text>
      <view class="nav-right"></view>
    </view> -->
    
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <image class="avatar" src="/static/head.png"></image>
      <view class="user-info">
        <text class="username">超级会员用户</text>
        <text class="level">VIP2会员</text>
      </view>
    </view>
    
    <!-- 特权列表 -->
    <view class="privilege-list">
      <view class="section-title">我的特权</view>
      
      <view class="privilege-item" v-for="(item, index) in privilegeList" :key="index" @click="showPrivilegeDetail(item)">
        <image class="privilege-icon" :src="item.icon"></image>
        <view class="privilege-content">
          <text class="privilege-title">{{item.title}}</text>
          <text class="privilege-desc">{{item.desc}}</text>
        </view>
        <view class="privilege-right">
          <text class="valid-date" v-if="item.expireTime">至{{item.expireTime}}</text>
          <text class="valid-date" v-else>永久有效</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
      </view>
    </view>
    
    <!-- 特权详情弹窗 -->
    <view class="privilege-modal" v-if="showModal" @touchmove.stop.prevent>
      <view class="modal-mask" @click="closeModal"></view>
      <view class="modal-content">
        <view class="modal-header">
          <image class="modal-icon" :src="currentPrivilege.icon"></image>
          <text class="modal-title">{{currentPrivilege.title}}</text>
        </view>
        <view class="modal-body">
          {{currentPrivilege.detail}}
        </view>
        <view class="modal-footer">
          <button class="modal-btn" @click="closeModal">我知道了</button>
        </view>
      </view>
    </view>
    
    <!-- 底部操作按钮 -->
    <view class="action-buttons">
      <button class="primary-btn" @click="upgradeMembership">升级会员</button>
      <button class="secondary-btn" @click="sharePrivilege">分享特权</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      privilegeList: [
        {
          title: "商品识别特权",
          desc: "每月可识别500件商品",
          detail: "作为VIP会员，您每月可以识别500件商品，获取详细信息和优惠。超出部分按普通会员标准计费。",
          icon: "/static/privilege/scan.png",
          expireTime: "2025-12-31"
        },
        {
          title: "专享折扣",
          desc: "识别商品可享会员折扣",
          detail: "通过本App识别的商品，在结算时可享受额外5%的会员折扣，部分特价商品除外。",
          icon: "/static/privilege/discount.png",
          expireTime: ""
        },
        {
          title: "历史记录",
          desc: "永久保存识别记录",
          detail: "普通用户只能保存30天内的识别记录，VIP会员可永久保存所有识别历史。",
          icon: "/static/privilege/history.png",
          expireTime: ""
        },
        {
          title: "优先客服",
          desc: "问题优先处理",
          detail: "VIP会员的问题咨询将进入优先队列，客服会优先处理您的问题。",
          icon: "/static/privilege/service.png",
          expireTime: "2025-12-31"
        },
        {
          title: "专属优惠券",
          desc: "每月领取专属优惠券",
          detail: "每月1号可领取3张专属优惠券，适用于超市内大部分商品。",
          icon: "/static/privilege/coupon.png",
          expireTime: "2025-12-31"
        }
      ],
      currentPrivilege: {},
      showModal: false
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    showPrivilegeDetail(item) {
      this.currentPrivilege = item;
      this.showModal = true;
    },
    
    closeModal() {
      this.showModal = false;
    },
    
    upgradeMembership() {
      uni.showToast({
        title: '跳转升级会员页面',
        icon: 'none'
      });
    },
    
    sharePrivilege() {
      uni.showToast({
        title: '调用分享功能',
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss">
.privilege-container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 120rpx;
}

/* 自定义导航栏样式 */
.custom-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15rpx 30rpx;
  background-color: #eb8750;
  color: #fff;
  height: 88rpx;
  box-sizing: border-box;
  position: relative;
  
  .nav-back {
    width: 80rpx;
    height: 100%;
    display: flex;
    align-items: center;
    
    .back-icon {
      width: 40rpx;
      height: 40rpx;
    }
  }
  
  .nav-title {
    font-size: 36rpx;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .nav-right {
    width: 80rpx;
  }
}

/* 用户卡片样式 */
.user-card {
  display: flex;
	height: 200rpx;
  align-items: center;
  padding: 40rpx 30rpx;
  background: linear-gradient(to right, #eb8750, #fa8f55);
  color: #fff;
  margin-bottom: 20rpx;
  
  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    border: 4rpx solid rgba(255, 255, 255, 0.5);
  }
  
  .user-info {
    margin-left: 30rpx;
    display: flex;
    flex-direction: column;
    
    .username {
      font-size: 36rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .level {
      font-size: 28rpx;
      background-color: rgba(255, 255, 255, 0.7);
      padding: 5rpx 15rpx;
      border-radius: 30rpx;
      align-self: flex-start;
			color: #ceb01b;
			font-weight: bold;
    }
  }
}

/* 特权列表样式 */
.section-title {
  padding: 20rpx 30rpx;
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
	margin-bottom: 20rpx;
}

.privilege-item {
  display: flex;
  align-items: center;
  padding: 30rpx 30rpx;
  background-color: #fff;
  margin-bottom: 2rpx;
	border-bottom: 1rpx solid #eee; /* 添加浅灰色下划线 */
	
  
  .privilege-icon {
    width: 80rpx;
    height: 80rpx;
    margin-right: 25rpx;
  }
  
  .privilege-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .privilege-title {
      font-size: 32rpx;
      color: #333;
      margin-bottom: 8rpx;
    }
    
    .privilege-desc {
      font-size: 26rpx;
      color: #999;
    }
  }
  
  .privilege-right {
    display: flex;
    align-items: center;
    
    .valid-date {
      font-size: 24rpx;
      color: #999;
      margin-right: 15rpx;
    }
    
    .arrow-icon {
      width: 32rpx;
      height: 32rpx;
    }
  }
}

/* 模态框样式 */
.privilege-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    width: 600rpx;
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    z-index: 1000;
    
    .modal-header {
      display: flex;
      align-items: center;
      padding: 30rpx;
      background-color: #f7f7f7;
      
      .modal-icon {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
      }
      
      .modal-title {
        font-size: 34rpx;
        font-weight: bold;
        color: #333;
      }
    }
    
    .modal-body {
      padding: 30rpx;
      font-size: 30rpx;
      color: #666;
      line-height: 1.6;
    }
    
    .modal-footer {
      padding: 20rpx 30rpx;
      border-top: 1rpx solid #eee;
      
      .modal-btn {
        background-color: #eb8750;
        color: #fff;
        border-radius: 50rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 32rpx;
      }
    }
  }
}

/* 底部按钮样式 */
.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  
  button {
    flex: 1;
    margin: 0 10rpx;
    font-size: 32rpx;
    border-radius: 50rpx;
    height: 80rpx;
    line-height: 80rpx;
    border: none;
    
    &:after {
      border: none;
    }
  }
  
  .primary-btn {
    background-color: #eb8750;
    color: #fff;
  }
  
  .secondary-btn {
    background-color: #fff;
    color: #eb8750;
    border: 1rpx solid #eb8750 !important;
  }
}
</style>