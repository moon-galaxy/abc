import { request } from '../../request/index.js'

// pages/category/category.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    categoryList: [],
    //左侧菜单数据
    leftMenuList: [],
    // 右侧内容数据
    rightContentList: [],
    // 激活的左侧菜单
    currentIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 1. 先判断一下本地存储中有没有旧的数据
     * {time:Date.now(),data:[...]}
     * 2.没有旧数据 发生新请求
     * 3.有旧数据   不发送请求
     */
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCategoryList()
    } else {
      if (Date.now() - cates.time > 60 * 5 * 1000) {
        this.getCategoryList()
      } else {
        const { data: categoryList } = cates
        this.setData({ categoryList })
        const leftMenuList = categoryList.map((v) => v.cat_name)
        const rightContentList = categoryList[0].children
        this.setData({ leftMenuList, rightContentList })
      }
    }
    // console.log(this.categoryList)
  },
  /**
   * 获取分类数据
   */
  async getCategoryList() {
    // request({
    //   url: 'categories'
    // }).then((res) => {
    //   const { message: categoryList } = res.data
    //   this.setData({ categoryList })
    //   wx.setStorageSync('cates', { time: Date.now(), data: categoryList })
    //   const leftMenuList = categoryList.map((v) => v.cat_name)
    //   const rightContentList = categoryList[0].children
    //   this.setData({ leftMenuList, rightContentList })
    // })
    const categoryList = await request({ url: 'categories' })
    this.setData({ categoryList })
    wx.setStorageSync('cates', { time: Date.now(), data: categoryList })
    const leftMenuList = categoryList.map((v) => v.cat_name)
    const rightContentList = categoryList[0].children
    this.setData({ leftMenuList, rightContentList })
  },
  /**
   * 点击菜单触发
   */
  handleItemTap(e) {
    // console.log(e)
    const currentIndex = e.currentTarget.dataset.index
    const rightContentList = this.data.categoryList[currentIndex].children
    this.setData({ currentIndex, rightContentList, scrollTop: 0 })
  }
})
