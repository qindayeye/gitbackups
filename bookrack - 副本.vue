<template>
	<view v-if="loading" class="container">
		<!-- 空白页 -->
		<view v-if="cartList.length!=0">
			<!-- 列表 -->
			<view class="cart-list">
				<!-- 地址 -->
				<!-- 每次可借10本 -->
				<view class="disc clear">
					<image class="fl" :src="allChecked==1?'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/selected.png':'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="hint fl">
						<text>每次最多可借阅10本</text>
					</view>
					<text class="fr" v-if="restatd" style="color: #333;" @click="redact()">编辑</text>
					<text class="fr" v-else @click="redact()">完成</text>
				</view>
				<!-- 列表详情 -->
				<view class="bookcarklist ">
					<block v-for="(item, index) in cartList" :key='index'>
						<view class="cart-item clear" @click="gotodet(item.goods_id)">
							<image class="fl onechecked" src="http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/disable.png" mode="aspectFit" v-if="item.goods_real_number==0"></image>
							<image v-else class="fl onechecked" :src="item.is_checked==1 ?'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/selected.png':'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/select.png'" mode="aspectFit"
							 @click.stop="checkone(item,index,item.rec_id)">
							</image>
							
							<!-- <view class="yticon icon-xuanzhong2 checkbox fl" :class="{checked: item.checked}" @click="checkone('item', index)"></view> -->
							
							<view class="cart-itemcon fr">
								<image :src="item.goods_thumb" class="fl" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)"
									 @error="onImageError('cartList', index)"></image>
								<view class="zz" v-if="item.goods_real_number==0">已借完</view>
								<view class="title">
									{{item.goods_name}}
								</view>
								<view class="infofr">
									<view class="del" @click.stop="deleteCartItem(item,index)">
										<view class="deltop">
											<image src="http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/det.png" mode=""></image>
										</view>
										<text class="del-btn fr" 
										:class="item.is_collect?'iscollect':''" 
										>删除</text>
									</view>
									<view class="del">
										<view class="deltop" @click.stop="shoucangCartItem(item,index)">
											<image  :src="item.is_collect==1?'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/collect-j.png':'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/collect-h.png'" mode=""></image>
										</view>
										<text class="del-btn fr" >收藏</text>
									</view>
								</view>
							</view>

						</view>
					</block>
				</view>

			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section" v-if="restatd">
				<view class="checkbox">
					<image :src="allChecked==1?'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/selected.png':'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/select.png'" mode="aspectFit" @click="check('all')"></image>
					<!-- <view class="clear-btn" @click="clearCart"></view> -->
				</view>
				<view class="total-box">
					<view class="num22">已选：<text>{{num}}本</text></view>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">立即借阅</button>
			</view>
			<view class="action-section" v-else>
				<view class="checkbox">
					<image :src="allChecked==1?'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/selected.png':'http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/select.png'" mode="aspectFit" @click="check('all')"></image>
					<!-- <view class="clear-btn" @click="clearCart"></view> -->
				</view>
				<view class="btndiv ">
					<text class="collectAll" @click="collectAll()">移至收藏夹</text>
					<text class="dtlAll" @click="dtlAll()">删除</text>
				</view>
			</view>
		</view>
		<view v-else class="empty">
			<image src="https://www.abcbook2019.com/mobile/public/img/icon/addBook.png" mode="aspectFit"></image>
			<view class="empty-tips">
				<view>书架什么也没有</view>
				<view>快去寻找自己喜欢的绘本吧~</view>
				<view class="navigator" @click="navToLogin">去逛逛</view>
			</view>
		</view>
		<!-- 弹框 -->
		<view class="pop-up" v-if="popup">
			<view class="upcon">
				<image src="http://ktoss.oss-cn-beijing.aliyuncs.com/app_image/upcon.png" mode="widthFix"></image>
				<view class="upopinion">
					<text @click="opinion('n')">先不用</text>
					<text class="main" @click="opinion('y')">免押金租书</text>
				</view>
			</view>
		</view>
		<!-- <view class="main-content">
			<view class="footer">
				<view class="li" v-for="(item,index) in footList" :key='index' :class="{active : index===curId}" @click="footgoto(item,item.url,index,item.change_page)">
					<image v-if=" index===curId" :src="item.select_icon" mode=""></image>
					<image v-else :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
					<view class="dinum" v-if="index == 2 && getgoodsnum!=0 ">
						{{getgoodsnum}}
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="main-content">
			<footer>
				<!-- //插入组件，ref 把子主键元素注册到夫组件$refs,然后可以在父组件操作子组件元素 -->
				<bottom-nav class="" ref="bottomNav"></bottom-nav>
			</footer>
		</view>
	</view>
	<mixLoading v-else></mixLoading>
</template>

<script>
	import Vue from 'vue'
	import bottomNav from "@/pages/navbar/navbar.vue";
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			mixLoading,
			bottomNav
		},
		data() {
			return {
				popup:false,
				getgoodsnum:0,
				restatd:true,
				curId:2,
				num: 0, //选中总数量
				allChecked: 0, //全选状态  true|false
				empty: false, //空白页显示  true|false
				cartList: [],
				address: false, //判断有没有地址
				load: false,
				
				loading: false,
				is_real: false,
				total_number:0,
				
				footList:[
					{
						img:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/shouh.png',
						select_icon:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/shouy.png',
						url: '/pages/index/index',
						'change_page':0,
						text:'首页'
					},
					{
						img:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/zhaoh.png',
						url: '/pages/choiceBook/choiceBook',
						select_icon:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/zhaoyy.png',
						change_page:2,
						text:'找书'
					},
					{
						img:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/jiarushujian.png',
						url: '/pages/bookrack/bookrack',
						select_icon:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/jiay.png',
						change_page:3, 
						text:'书架'
					},
					{
						img:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/woh.png',
						url: '/pages/user/user',
						select_icon:'https://ktoss.oss-cn-beijing.aliyuncs.com/app_image/woy.png',
						change_page:4,
						text:'我的'
					}
				]
			};
		},
		onPullDownRefresh: function() {
			this.loadData()
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		onShow() {
			this.loadData()
			this.popup=false
		},
		onLoad() {
			// this.loadData()
			this.timer=setInterval(()=>{
				this.$store.commit("getgoodsnum", uni.getStorageSync("total_number"))
				this.getgoodsnum=uni.getStorageSync("total_number")
			}, 500)
		},
		onUnload() {
			if(this.timer) {  
				clearInterval(this.timer);  
				this.timer = null;  
			}  
		},
		methods: {
			gotodet(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id='+id
				})
			},
			//请求数据
		 loadData() {
				let that = this
				this.$api.quest('cart', {}, (res) => {
					if (res.data.data.error == 1) {
						this.$store.commit("change_page", 4)
						// #ifdef H5
						// 判断微信内外
						var ua = window.navigator.userAgent.toLowerCase();
						console.log(ua)
						// console.log(ua.indexOf('micromessenger') != -1)
						// console.log(ua.match(/MicroMessenger/i) == 'micromessenger')
						if (ua.match(/MicroMessenger/i) == 'micromessenger') {
							// 微信内浏览器（公众号）
							console.log("公众号")
							uni.navigateTo({
								url: '/pages/public/login'
							})
						
						} else {
							uni.navigateTo({
								url: '/pages/public/registerSJ'
							})
						}
						// #endif
						
						//  #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/public/login'
						})
						// #endif
						//  #ifdef APP-PLUS
						uni.navigateTo({
							url: '/pages/public/registerSJ'
						})
						// #endif
					} else {
						this.loading = true
						// console.log(res.data.data)
						that.cartList = res.data.data.cart_list[0]?res.data.data.cart_list[0]:res.data.data.cart_list
						
						
						if(that.cartList){
							that.cartList.forEach(item => { 
								// 判断购物车有会员卡并且是选中状态,那么就改变状态 num-1
								if (item.is_real == 0 && item.is_checked==1) {
									this.is_real = true
								}
							})
							// console.log(this.is_real)
						}
						if (this.is_real) {
							// console.log(res.data.data.total.goods_check_number,'num')
							
							this.num=res.data.data.total.goods_check_number-1
							
							if (this.num == that.cartList.length - 1) {
								this.allChecked = 1
							}
						} else {
							this.num = res.data.data.total.goods_check_number
							if (this.num == that.cartList.length) {
								this.allChecked = 1
							}
							uni.setStorageSync('total_number', res.data.data.total.goods_number);
						}
					}
				})

			},
			//监听image加载完成
			onImageLoad(key, index) {
				// console.log(key,index)
				this.$set(this[key][index], 'loaded', 'loaded');
				// console.log(this[key][index], 'key')
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			footgoto(item,url,index,change_page){
				this.$set(item, 'img', item.select_icon);
				this.curId=index,
				this.$store.commit("change_page", change_page)
				
				uni.redirectTo({
					url:url
				});
			},
			navToLogin() {
				// uni.navigateBack()
				// this.$store.commit("change_page", 0)
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			//选中状态处理
			check(type, index) {
				const list = this.cartList;
				let idArr = []

				if (this.allChecked == 0) {
					
					// console.log(this.allChecked == 0, "this.allChecked==0")

					this.$api.quest('cart/updateall', {
						check: 1
					}, (res) => {
						this.allChecked = 1
						let i=0
						list.forEach((item,index) => {
							if(item.goods_real_number!=0){
								i++
								Vue.set(item, 'is_checked', 1);
							}
						})
						this.num=i
					})
					if (this.is_real) {
						// console.log(this.is_real, "this.is_real")
						this.num = list.length - 1
						if (this.num == list.length - 1) {
							// console.log(this.num == list.length - 1, "this.num==list.length-1")
							this.allChecked = 1
						}

					} else {
						this.num = list.length
						this.allChecked = 1
					}
				} else {
					this.allChecked = 0
					this.num = 0

					this.$api.quest('cart/updateall', {
						check: 0
					}, (res) => {
						list.forEach(item => {
							Vue.set(item, 'is_checked', 0);
						})

					})
				}
			},
			redact(){
				this.restatd=!this.restatd
			},
			// 选中收藏全部
			collectAll(){
				let id=[]
				this.cartList.forEach(item => {
					if(item.is_checked==1){
						// console.log(item.goods_id)
						id.push(item.goods_id)
					}
				})
				
				this.$api.quest('user/collect/batchadd', {
					id:id.join()
				}, (res) => {
					console.log(res)
					if(res.data.data==true){
						this.cartList.forEach(item => {
							if(item.is_checked==1){
								Vue.set(item,'is_collect',1);
							}
						})
					}
				})
			},
			dtlAll(){
				let id=[]
				this.cartList.forEach((item,index) => {
					if(item.is_checked==1){
						// console.log(item.rec_id)
						id.push(item.rec_id)
					}
				})
				
				this.$api.quest('cart/batchdelete', {
					id:id.join()
				}, (res) => {
					// console.log(res)
					
					if(res.data.code==0){
						this.cartList.forEach((item,index) => {
							if(item.is_checked==1){
								uni.setStorageSync('total_number', res.data.total_number);
								// this.cartList.splice(index, 1);
								this.cartList=this.cartList.filter(item=>item.is_checked!=1)
								this.num=0
							}
						})
					}
				})
			},
			// 单选
			checkone(e, index, id) {
				const list = this.cartList;
				// console.log(e,index,it,"218")
				if (e.is_checked == 1) {
					//     Vue.set(e,'oneChecked',false);     //为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。 
					this.$api.quest('cart/update', {
						id: id,
						check: 0
					}, (res) => {})
					Vue.set(e, 'is_checked', 0);
					// console.log(e)
					if (e.is_real == 1) {
						this.num--
					}
				} else {
					if (this.num >= 10) {
						this.$api.msg('每次最多只能借阅10本哦');
						Vue.set(e, 'is_checked', 0);
					} else {
						Vue.set(e, 'is_checked', 1);
						if (e.is_real  == 1) {
							this.num++
						}
						this.$api.quest('cart/update', {
							id: id,
							check: 1
						}, (res) => {})
					}
				}
				// console.log(list.length, "list.length")

				if (this.is_real) {
					if (this.num == list.length - 1) {
						this.allChecked = 1
					}else{
						this.allChecked = 0
					}
				} else {
					if (this.num == list.length) {
						this.allChecked = 1
					}else{
						this.allChecked=0
					}
					
				}
			},
			//删除
			deleteCartItem(e, index) {
				let list = this.cartList;
				let row = list[index];
				let id = row.rec_id;
				console.log(e,"eee")
				this.$api.quest('cart/delete', {
					id: id,
					uid: uni.getStorageSync("user_id")
				}, (res) => {
					console.log(res)
					uni.setStorageSync('total_number', res.data.total_number);
					this.cartList.splice(index, 1);
					if(e.is_checked==1){
						this.num--
					}
					
				})
			},
			//收 藏
			shoucangCartItem(item,index) {
				let id = item.goods_id;
				this.$api.quest('user/collect/add', {
					id: id,
					uid: uni.getStorageSync("user_id")
				}, (res) => {
					// that.cartList = res.data.data.cart_list[0]
					console.log(res)
					if(item.is_collect){
						Vue.set(item,'is_collect',0);
					}else{
						Vue.set(item,'is_collect',1);
						
					}
				})
			},
			// 是否支付分
			createpoints(){
				// 弹框
				this.popup=true;
			},
			// 支付分是否
			opinion(type){
				if(type=='y'){
					// console.log('调用支付分')
					this.payscore()
					this.deposittype=1
				}else{
					uni.navigateTo({
						url: `/pages/flow/checkout?data=${JSON.stringify({
							goodsData: this.goodsData
						})}`
					})
					this.deposittype=0
				}
			},
			// 支付分
			payscore(){
							this.$api.quest('payscore/add', {
								order_sn:uni.getStorageSync("ordersn"),
								user_id:uni.getStorageSync("user_id"),
							}, (res) => {
								let that=this;
									console.log(res)
									if(res.data.data.code==1){
										// this.$api.msg(res.data.data.msg)
										that.$api.quest('payscore/changesn', {},(res)=>{
											uni.setStorageSync('ordersn',res.data.data)
											this.payscore()
										})
									}else{
										this.anewtype=true;
										// #ifdef MP
										if (wx.openBusinessView) {
										  wx.openBusinessView({
											businessType: 'wxpayScoreUse',
											extraData: {
											  mch_id: res.data.data.mch_id,
											  package: res.data.data.package,
											  timestamp:res.data.data.timestamp,
											  nonce_str: res.data.data.nonce_str,
											  sign_type: res.data.data.sign_type,
											  sign:res.data.data.sign_sh256
											},
											success(res){
												setTimeout(function() {
													that.$api.quest('payscore/searchdb', {
														out_order_no:uni.getStorageSync("ordersn")
													},(res)=>{
														if(res.data.data!=0){
															uni.setStorageSync('deposittype',1)
															uni.navigateTo({
																url: `/pages/flow/checkout?data=${JSON.stringify({
																	order_sn:uni.getStorageSync("ordersn"),
																	deposit_type:uni.getStorageSync("deposittype"),
																})}`
															})
														}else{
															that.$api.quest('payscore/searchdb', {
																out_order_no:uni.getStorageSync("ordersn")
															},(res)=>{
																if(res.data.data!=0){
																	uni.setStorageSync('deposittype',1)
																	uni.navigateTo({
																		url: `/pages/flow/checkout?data=${JSON.stringify({
																			order_sn:uni.getStorageSync("ordersn"),
																			deposit_type:uni.getStorageSync("deposittype"),
																		})}`
																	})
																}else{
																	// that.$api.msg('不满足啊~')
																	// console.log('？？？不满足')
																}
															
															})
														}
													})
												}, 2000);
											},
											fail(faill) {
												console.log('？？？')
											},
											complete(com) {
											  //dosomething
											  console.log(com)
											}
										  });
										} else {
										  //引导用户升级微信版本
										}
										// #endif
									}
									
								})
							
						},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				let address = {};
				list.forEach(item => {
					if (item.oneChecked) {
						goodsData.push({
							attr_val: item.goods_id
						})
					}
				})
				this.goodsData = goodsData
				if (uni.getStorage('user_ranks') > 1) {
					list.forEach(item => {
						if (item.is_real == 0) {
							this.$api.msg('您已经是会员了，不用重复购买卡哦~');
							return false;
						}
					})
				}
				if (this.num == 0) {
					this.$api.msg('请选择您需要的图书');
				} else if (this.num > 10) {
					this.$api.msg('每次最多只能借阅10本哦');
				} else {
					// 如果没有添加地址,跳转到添加地址页面,否则进入订单页面
					this.$api.quest('user/address/list', {}, (res) => {
						console.log(res, "res")
						if (res.data.data.length == 0) {
							uni.navigateTo({
								url: '/pages/address/addressManage?type=noaddress'
							})
						} else {
							this.$api.quest('flow/checkuserorder', {
								flow_type: 0
							}, (res) => {
								console.log(res)
								if (res.data.code == 1) {
									this.$api.msg(res.data.data.data)
								} else {
									this.cartList.forEach((item, index) => {
										if (item.is_checked == 1) {
											this.cartList = this.cartList.filter(item => item.is_checked != 1)
											this.num = 0
										}
									})
									
									// #ifdef H5
									// 判断微信内外
									var ua = window.navigator.userAgent.toLowerCase();
									if (ua.match(/MicroMessenger/i) == 'micromessenger') {
										// 微信内浏览器（公众号）
										console.log("公众号")
										uni.navigateTo({
											url: '/pages/deposit/H5code'
										})
									} else {
										// 浏览器
										console.log("浏览器")
										uni.navigateTo({
											url: `/pages/flow/checkout?data=${JSON.stringify({
													goodsData: this.goodsData
												})}`
										})
									}
									// #endif
									// #ifdef MP
									console.log(res.data.data.data.user_ranks)
									uni.navigateTo({
										url: `/pages/deposit/deposit?ranks=${res.data.data.data.user_ranks} & num=${res.data.data.data.free_number}`
									})
									// #endif
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../static/css/public.scss';
	@import '../../static/css/shujia.scss';
	.pop-up{
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,.6);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.upcon{
			/* height: 500rpx; */
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			background: #fff;
			border-radius: 24rpx;
			text-align: center;
			image{
				width: 660rpx;
				height: 752rpx;
			}
			.upopinion{
				display: flex;
				width: 660rpx;
				margin: 0 auto;
				height: 148rpx;
				justify-content: space-around;
				align-items: center;
				text{
					width:300rpx;
					line-height: 84rpx;
					border: 2rpx solid #666;
					border-radius: 44rpx;
					font-size: 32rpx;
					color: #666;
				}
				.main{
					color: #fff;
					line-height: 88rpx;
					border: none;
					background: linear-gradient(135deg, #fea364 0%, #fa6c3a 100%);
				}
			}
			
		}
	}
	.dinum{
		position: absolute;
		top: -5rpx;
		left:30rpx;
		width: 30rpx;
		height: 30rpx;
		border-radius:50%;
		background:#FF6D43;
		color: #fff;
		z-index: 99;
	}
	.main-content{
		.footer{
			position: fixed;
			bottom:-48upx;
			left: 0;
			width: 100%;
			height: 154upx;
			background: #fff;
			z-index:9;
			display: flex;
			justify-content: space-around;
			>image{
				position: fixed;
				bottom: 15rpx;
				left: 0;
				width: 100%;
				z-index: -1;
			}
		}
		.li {
			position: relative;
			float: left;
			text-align: center;
			font-size: 20upx;
			color: #999;
			display: flex;
			flex-direction: column;
			
		
		}
		.li image {
			width: 50upx;
			height: 50upx;
		}
		
		
		.active {
			color: #FF6D43;
		} 
	}
	
	.onechecked {
		width: 40rpx;
		height: 40rpx;
		position: relative;
	}
	
	.total-box {
		.num22 {
			font-size: 30rpx;
		}
	}
	.iscollect{
	}
	.empty {
		image {
			width: 287rpx;
			height: 181rpx;
		}

		.empty-tips {
			text {
				display: block;
			}
		}
	}
</style>
