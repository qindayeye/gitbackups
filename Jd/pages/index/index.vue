<template>
	<view class="container">
		<view class="mp-search-box">
			<!-- 头部 -->
			<view class="head">
				<view class="inp">
					<image class="eosfont search" src="http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/sousuo.png" mode=""></image>
					<!-- 放大镜 -->
					<input type="text" placeholder="根据关键词查询京东优惠" @click="gotoban()" />
				</view>
			</view>
			<!-- 导航 -->
			<view class="nav">
				<text :class="{ active: index == navIndex }" v-for="(item, index) in indexArr.top_nav" :key="index" @click="gotoactivity(index, item)">{{ item.cat_name }}</text>
			</view>
		</view>
		<Catelist v-if='navIndex>0' :catlist="catlist"></Catelist>
		<!-- 头部轮播 -->
		<view class="" v-else>
			<view class="carousel-section">
				<swiper
					class="swiper-box"
					indicator-active-color="rgb(30,144,255)"
					:indicator-dots="indicator"
					:current="cur"
					:circular="circular"
					:autoplay="autoplay"
					:interval="interval"
					:duration="duration"
				>
					<block v-for="(item, index) in indexArr.banner" :key="index">
						<swiper-item @click="gotoban(item.app_link, index)"><image class="banner-img" :src="item.pic" mode=""></image></swiper-item>
					</block>
				</swiper>
			</view>
			<!--  京东推荐 -->
			<view class="card">
				<view class="xian"></view>
				京东爆款推荐
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in 10" :key="index" class="floor-item">
						<image src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg" mode="aspectFill"></image>
						<text class="title">九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆</text>
						<text class="coupon">优惠卷￥10</text>
						<view class="price">
							<text class="price1">￥34.33</text>
							<text class="price2">￥9.98</text>
						</view>
					</view>
				</view>
			</scroll-view>

			<view class="corty">
				<view @click="gotocorty(0)" :class="[cortyIndex==0?'corty_active':'corty-item']" style="border-left: red solid 1rpx;">居家必备</view>
				<view @click="gotocorty(1)"  :class="[cortyIndex==1?'corty_active':'corty-item']">好评之王</view>
				<view @click="gotocorty(2)"  :class="[cortyIndex==2?'corty_active':'corty-item']">好物9块9</view>
				<view @click="gotocorty(3)" :class="[cortyIndex==3?'corty_active':'corty-item']">热销榜</view>
			</view>
			<view class="catlist">
				<view class="list_item" v-for="i in catlist" :key="i">
					<image src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1312059974,1893880587&fm=111&gp=0.jpg" mode="aspectFill"></image>
					<view class="itemcont">
						<view class="title">
							<text class="logo">京东</text>
							九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆九芝堂止咳糖浆
						</view>
						<view class="label">
							<text class="label-item">京东价</text>
							<text class="label-item" style="text-decoration: line-through;">￥99.99</text>
							<text class="label-item">330条好评</text>
							<text class="label-item">好评率99.98%</text>
						</view>
						<view class="coupon2">
							<view class="badian" style="border-top-right-radius:8rpx ;border-bottom-right-radius:8rpx ;"></view>
							<view class="coupon2cont">优惠券￥889</view>
							<view class="badian" style="border-top-left-radius:8rpx ;border-bottom-left-radius:8rpx ;"></view>
						</view>
						<view class="foolt">
							<view class="Yprice">优惠价￥9.9</view>
							<view class="btn">抢购</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue';
import Catelist from '@/components/catelist.vue'

export default {
	components:{
		Catelist
	},
	data() {
		return {
			catlist:10,
			cortyIndex:0,
			navIndex: 0,
			indexArr: {},
			hotmain: [],
			indicator: true, //是否显示指示点
			interval: 5000, //自动切换时间间隔
			duration: 400, //滑动动画时长
			autoplay: true, //是否自动切换
			circular: true, //是否采用衔接滑动
			cur: 0, //当前所在滑块的index
			page: 1,
			hasno: false //判断有没有消息
		};
	},

	// 实时获取滚动的值，到一定位置显示返回顶部
	onReachBottom(){ // 上拉加载
		this.catlist=this.catlist+10
		console.log(this.catlist)
	},
	onLoad: function(options) {
		this.load();
	},
	methods: {
		// 页面初始化
		load() {
			var that = this;
			this.$api.quest('index', {}, res => {
				console.log(res);
				that.hotmain = res.data.data.goods_list;
				that.indexArr = res.data.data;
				this.loading = true;
			});
			this.$api.quest('user/hasNoReadMessage', {}, res => {
				if (res.data.data == 1) {
					this.hasno = true;
				}
			});
		},
		gotoban() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		gotocorty(index) {
			this.cortyIndex = index;
		},
		gotoactivity(index, item) {
			this.navIndex = index;
		}
	}
};
</script>

<style lang="scss">
.container {
	position: relative;
}
// 小程序头部兼容
.mp-search-box {
	width: 100%;
	height: 200upx;
	background: #ffffff;
	.head {
		height: 88rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		align-items: center;
		padding: 0 22upx;
		.location {
			text {
				font-size: 26rpx;
				line-height: 88rpx;
				margin-left: 10rpx;
			}
		}
		.inp {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 60upx;
			width: 568upx;
			background: #f5f5f5;
			border-radius: 10upx;
			margin: 0 10rpx;
			flex: 1;
			text {
				margin: 0 20upx 0 15upx;
			}
			.search {
				margin: 0 20rpx;
				height: 35rpx;
				width: 35rpx;
			}
			input {
				display: block;
				height: 100%;
				line-height: 60rpx;
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(204, 204, 204, 1);
			}
		}
	}
	.nav {
		display: flex;
		align-items: center;
		white-space: nowrap;
		line-height: 60rpx;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		white-space: nowrap;
		text {
			position: relative;
			display: inline-block;
			margin: 0px 20rpx;
			color: #999999;
			font-size: 26rpx;
			height: 60rpx;
		}
		.active {
			position: relative;
			color: #000;
		}
		.active::before {
			display: block;
			content: '';
			position: absolute;
			width: 60rpx;
			height: 6rpx;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 0%);
			background: red;
		}
	}
	.nav::-webkit-scrollbar {
		display: none;
	}
}
// 头部轮播
.carousel-section {
	position: absolute;
	top: 160rpx;
	left: 50%;
	width: 736rpx;
	height: 330rpx;
	transform: translate(-50%, 0%);
	.swiper-box {
		height: 100%;
		.wx-swiper-dot {
			bottom: 6upx;
			width: 12upx;
			display: inline-flex;
			margin-left: 7upx;
			height: 12upx;
			justify-content: space-between;
		}
		image {
			width: 100%;
			height: 330rpx;
			overflow: hidden;
		}
	}
	.swiper-box .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
	}
	.swiper-box .wx-swiper-dot-active::before {
		background: #fff;
	}
}



.scroll-view_H {
	width: 100%;
	white-space: nowrap;
}
.scroll-view-item_H {
	// width: 200px;
	// height: 100px;
	vertical-align: top;
	display: inline-block;
}
.more {
	width: 72rpx !important;
	writing-mode: tb-rl;
	line-height: 72rpx;
	margin-right: 20rpx;
	font-size: 24rpx;
	color: #999;
	letter-spacing: 10rpx;
	border-radius: 10rpx;
	.yticon {
		margin-top: 30rpx;
		font-size: 14rpx;
	}
}
.card {
	height: 60rpx;
	margin-top: 290rpx;
	font-size: 28rpx;
	font-weight: 600;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.xian {
		height: 40rpx;
		width: 10rpx;
		background-color: red;
		margin: 0 20rpx;
	}
}

.floor-list {
	height: 350rpx;
	width: 700rpx;
	margin: 10rpx auto;
	background: #fff;
	// box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}
.scoll-wrapper {
	height: 350rpx;
	display: flex;
	align-items: flex-start;
}
.floor-item {
	height: 350rpx;
	width: 220upx;
	margin-right: 20upx;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: column;
	image {
		width: 220upx;
		height: 220upx;
		border-radius: 6upx;
	}
	.title {
		width: 220upx;
		font-size: 25rpx;
		font-weight: 600;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.coupon {
		margin-top: 10rpx;
		border: 1rpx solid red;
		border-radius: 18rpx;
		height: 32rpx;
		padding: 0 10rpx;
		font-size: 25rpx;
		font-weight: 400;
		color: red;
	}
	.price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50rpx;
		width: 210rpx;
		.price1 {
			font-size: 25rpx;
			font-weight: 400;
			color: red;
		}
		.price2 {
			font-size: 22rpx;
			font-weight: 400;
			color: #ccc;
			text-decoration: line-through;
		}
	}
}
.corty {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60rpx;
	width: 700rpx;
	margin: 10rpx auto;
	.corty-item {
		text-align: center;
		line-height: 60rpx;
		height: 60rpx;
		width: 175rpx;
		color: red;
		border-right: red solid 1rpx;
		border-top: red solid 1rpx;
		border-bottom: red solid 1rpx;
		font-size: 27rpx;
		font-weight: 400;
	}
	.corty_active {
		text-align: center;
		line-height: 60rpx;
		height: 60rpx;
		width: 175rpx;
		color: #ffffff;
		background-color: red;
		border-right: red solid 1rpx;
		border-top: red solid 1rpx;
		border-bottom: red solid 1rpx;
		font-size: 27rpx;
		font-weight: 400;
	}
}
.catlist {
	.list_item {
		margin: 20rpx auto;
		height: 250rpx;
		width: 700rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		image {
			border-radius: 10rpx;
			height: 250rpx;
			width: 230rpx;
		}
		.itemcont {
			height: 250rpx;
			width: 450rpx;
			.title {
				font-size: 27rpx;
				font-weight: 400;
				line-height: 40rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				.logo {
					margin-right: 10rpx;
					background-color: red;
					color: #ffffff;
					font-size: 27rpx;
					line-height: 40rpx;
					border-radius: 10rpx;
					padding: 0 10rpx 5rpx 10rpx;
					text-align: center;
				}
			}
			.label {
				height: 50rpx;
				width: 450rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 22rpx;
				font-weight: 400;
				color: #999999;
			}
			.coupon2 {
				width: 180rpx;
				background-color: red;
				color: #ffffff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 33rpx;
				// padding: 0 20rpx;
				.coupon2cont {
					// display: inline;
					font-size: 24rpx;
					font-weight: 400;
				}
				.badian {
					background-color: #ffffff;
					height: 16rpx;
					width: 8rpx;
				}
			}
			.foolt {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.Yprice {
					color: red;
					font-size: 27rpx;
					font-weight: 400;
				}
				.btn {
					text-align: center;
					line-height: 40rpx;
					font-size: 27rpx;
					font-weight: 400;
					width: 100rpx;
					height: 40rpx;
					background-color: red;
					color: #ffffff;
					border-radius: 10rpx;
				}
			}
		}
	}
}
</style>
