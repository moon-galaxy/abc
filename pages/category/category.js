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
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
  },
  /**
   * 获取分类数据
   */
  getCategoryList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then((res) => {
      const { message: categoryList } = res.data
      this.setData({ categoryList })
      const leftMenuList = categoryList.map((v) => v.cat_name)
      const rightContentList = categoryList[0].children
      console.log(rightContentList)
      this.setData({ leftMenuList, rightContentList })
    })
  },
  /**
   * 点击菜单触发
   */
  handleItemTap(e) {
    // console.log(e)
    const currentIndex = e.currentTarget.dataset.index
    const rightContentList = this.data.categoryList[currentIndex].children
    this.setData({ currentIndex, rightContentList })
  }
})
