<template>
  <view class="settings-container">
    <!-- 顶部导航栏 -->
   <!-- <view class="custom-nav-bar">
      <view class="nav-back" @click="goBack">
        <image class="back-icon" src="/static/common/back.png"></image>
      </view>
      <text class="nav-title">系统设置</text>
      <view class="nav-right"></view>
    </view> -->
    
    <!-- 设置列表 -->
    <view class="settings-list">
      <!-- 账号设置 -->
      <view class="settings-section">
        <view class="section-title">账号设置</view>
        <view class="settings-item" @click="navigateTo('accountInfo')">
          <text class="item-text">账号信息</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
        <view class="settings-item" @click="navigateTo('changePassword')">
          <text class="item-text">修改密码</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
      </view>
      
      <!-- 通知设置 -->
      <view class="settings-section">
        <view class="section-title">通知设置</view>
        <view class="settings-item">
          <text class="item-text">消息通知</text>
          <switch class="item-switch" :checked="notificationEnabled" @change="toggleNotification" />
        </view>
        <view class="settings-item">
          <text class="item-text">声音提醒</text>
          <switch class="item-switch" :checked="soundEnabled" @change="toggleSound" />
        </view>
        <view class="settings-item">
          <text class="item-text">振动提醒</text>
          <switch class="item-switch" :checked="vibrationEnabled" @change="toggleVibration" />
        </view>
      </view>
      
      <!-- 隐私设置 -->
      <view class="settings-section">
        <view class="section-title">隐私设置</view>
        <view class="settings-item" @click="navigateTo('privacyPolicy')">
          <text class="item-text">隐私政策</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
        <view class="settings-item" @click="navigateTo('dataUsage')">
          <text class="item-text">数据使用</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
      </view>
      
      <!-- 关于 -->
      <view class="settings-section">
        <view class="section-title">关于</view>
        <view class="settings-item" @click="navigateTo('aboutApp')">
          <text class="item-text">关于应用</text>
          <text class="item-value">v1.2.0</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
        <view class="settings-item" @click="navigateTo('checkUpdate')">
          <text class="item-text">检查更新</text>
          <text class="item-value">最新版本</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
        <view class="settings-item" @click="navigateTo('feedback')">
          <text class="item-text">意见反馈</text>
          <image class="arrow-icon" src="/static/irow.png"></image>
        </view>
      </view>
      
      <!-- 退出登录 -->
      <view class="logout-section">
        <button class="logout-btn" @click="logout">退出登录</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 通知设置开关状态
      notificationEnabled: true,
      soundEnabled: true,
      vibrationEnabled: false,
      
      // 固定数据
      appInfo: {
        version: "v1.2.0",
        updateStatus: "最新版本"
      }
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    // 导航到指定页面
    navigateTo(page) {
      const pages = {
        'accountInfo': '/pages/settings/accountInfo',
        'changePassword': '/pages/settings/changePassword',
        'privacyPolicy': '/pages/settings/privacyPolicy',
        'dataUsage': '/pages/settings/dataUsage',
        'aboutApp': '/pages/settings/aboutApp',
        'checkUpdate': '/pages/settings/checkUpdate',
        'feedback': '/pages/settings/feedback'
      };
      
      uni.navigateTo({
        url: pages[page]
      });
    },
    
    // 切换通知开关
    toggleNotification(e) {
      this.notificationEnabled = e.detail.value;
      uni.showToast({
        title: `消息通知已${this.notificationEnabled ? '开启' : '关闭'}`,
        icon: 'none'
      });
    },
    
    // 切换声音开关
    toggleSound(e) {
      this.soundEnabled = e.detail.value;
      uni.showToast({
        title: `声音提醒已${this.soundEnabled ? '开启' : '关闭'}`,
        icon: 'none'
      });
    },
    
    // 切换振动开关
    toggleVibration(e) {
      this.vibrationEnabled = e.detail.value;
      uni.showToast({
        title: `振动提醒已${this.vibrationEnabled ? '开启' : '关闭'}`,
        icon: 'none'
      });
    },
    
    // 退出登录
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: '正在退出...'
            });
            
            // 模拟退出请求
            setTimeout(() => {
              uni.hideLoading();
              uni.reLaunch({
                url: '/pages/login/login'
              });
            }, 1000);
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
.settings-container {
  min-height: 100vh;
  background-color: #f7f7f7;
}

/* 自定义导航栏样式 */
.custom-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15rpx 30rpx;
  background-color: #4a8cff;
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

/* 设置列表样式 */
.settings-list {
  padding: 20rpx 30rpx;
}

.settings-section {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
  
  .section-title {
    padding: 20rpx 30rpx;
    font-size: 28rpx;
    color: #999;
  }
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .item-text {
    font-size: 32rpx;
    color: #333;
  }
  
  .item-value {
    font-size: 28rpx;
    color: #999;
  }
  
  .arrow-icon {
    width: 32rpx;
    height: 32rpx;
  }
  
  .item-switch {
    transform: scale(0.8);
    transform-origin: right center;
  }
}

/* 退出登录按钮 */
.logout-section {
  margin-top: 50rpx;
  
  .logout-btn {
    background-color: #fff;
    color: #ff4d4f;
    border-radius: 12rpx;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
    
    &:after {
      border: none;
    }
  }
}
</style>