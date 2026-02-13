Page({
  data: {
    // 摄像头位置：front-前置, back-后置
    devicePosition: 'back',
    // 闪光灯模式：off-关闭, on-开启, auto-自动
    flashMode: 'off',
    // 当前模式索引
    currentModeIndex: 0,
    // 闪光灯图标 base64
    flashIcons: {
      // flash-off
      off: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgogIDxwYXRoIGQ9Ik0zLjI3IDNMMiA0LjI3bDUgNXYzLjUzaDN2OWwzLjU4LTYuMTVMMTcuNzMgMjAgMTkgMTguNzMgMy4yNyAzek0xNyAxMGgtNGw0LThIN3YxLjE4bDguNDYgOC40NkwxNyAxMHoiLz4KPC9zdmc+',
      // flash-on
      on: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgogIDxwYXRoIGQ9Ik03IDJ2MTFoM3Y5bDctMTJoLTRsNC04eiIvPgo8L3N2Zz4=',
      // flash-auto
      auto: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgogIDxwYXRoIGQ9Ik03IDJ2MTFoM3Y5bDctMTJoLTRsNC04eiIvPgogIDx0ZXh0IHg9IjEzIiB5PSI4IiBmb250LXNpemU9IjYiIGZpbGw9IiMwMDAiPkE8L3RleHQ+Cjwvc3ZnPg=='
    },
    // 拍摄模式列表
    modeList: [
      {
        name: '拍药盒',
        title: '拍药盒',
        tip: '请调整拍摄距离 使照片更清晰',
        showTip: true
      },
      {
        name: '拍报告',
        title: '拍报告',
        tip: '将报告单平铺拍摄，确保光线充足',
        showTip: true
      },
      {
        name: '拍饮食',
        title: '拍饮食',
        tip: '拍摄食物全貌，便于识别热量',
        showTip: true
      },
      {
        name: '拍皮肤',
        title: '拍皮肤',
        tip: '对准皮肤问题区域，保持清晰对焦',
        showTip: true
      },
      {
        name: '扫药码',
        title: '扫药码',
        tip: '将药品条形码放入框内',
        showTip: true
      }
    ]
  },

  onLoad(options) {
    // 页面加载时可以接收参数设置初始模式
    if (options.mode) {
      const index = this.data.modeList.findIndex(item => item.name === options.mode);
      if (index !== -1) {
        this.setData({ currentModeIndex: index });
      }
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  },

  // 切换闪光灯
  toggleFlash() {
    const modes = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(this.data.flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.setData({ 
      flashMode: modes[nextIndex] 
    });
    
    const titles = {
      'off': '闪光灯关闭',
      'on': '闪光灯开启',
      'auto': '闪光灯自动'
    };
    
    wx.showToast({
      title: titles[modes[nextIndex]],
      icon: 'none',
      duration: 1000
    });
  },

  // 切换前后摄像头
  switchCamera() {
    this.setData({
      devicePosition: this.data.devicePosition === 'back' ? 'front' : 'back'
    });
  },

  // 切换拍摄模式
  switchMode(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentModeIndex: index
    });
    
    // 如果是扫码模式，可以切换到扫码逻辑
    if (this.data.modeList[index].name === '扫药码') {
      this.startScanCode();
    }
  },

  // 拍照
  takePhoto() {
    const ctx = wx.createCameraContext();
    
    wx.showLoading({ title: '拍照中...' });
    
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.hideLoading();
        
        const tempImagePath = res.tempImagePath;
        
        // 根据当前模式处理照片
        const currentMode = this.data.modeList[this.data.currentModeIndex];
        
        // 这里可以进行后续处理，如预览、上传等
        wx.previewImage({
          urls: [tempImagePath],
          current: tempImagePath,
          success: () => {
            console.log('预览图片:', tempImagePath);
          }
        });
        
        // 示例：可以触发回调或上传图片
        // this.uploadImage(tempImagePath);
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '拍照失败',
          icon: 'none'
        });
        console.error('拍照失败:', err);
      }
    });
  },

  // 从相册选择
  chooseAlbum() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        
        // 预览或处理选择的图片
        wx.previewImage({
          urls: [tempFilePath]
        });
        
        // 可以在这里调用上传或识别接口
        // this.processImage(tempFilePath);
      },
      fail: (err) => {
        if (err.errMsg && !err.errMsg.includes('cancel')) {
          wx.showToast({
            title: '选择失败',
            icon: 'none'
          });
        }
      }
    });
  },

  // 扫码模式（扫药码）
  startScanCode() {
    // 这里可以使用 wx.scanCode 或者 camera 的 scanCode 模式
    wx.showToast({
      title: '切换到扫码模式',
      icon: 'none'
    });
  },

  // 显示帮助
  showHelp() {
    wx.showModal({
      title: '拍摄帮助',
      content: this.data.modeList[this.data.currentModeIndex].tip,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 相机错误处理
  onCameraError(e) {
    console.error('相机错误:', e.detail);
    wx.showModal({
      title: '相机出错',
      content: '请检查相机权限是否开启',
      showCancel: false,
      success: () => {
        // 引导用户去设置页面开启权限
        wx.openSetting();
      }
    });
  },

  // 上传图片示例方法
  uploadImage(filePath) {
    wx.uploadFile({
      url: 'https://your-api-domain.com/upload',
      filePath: filePath,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data);
        console.log('上传成功:', data);
      },
      fail: (err) => {
        console.error('上传失败:', err);
      }
    });
  }
});
