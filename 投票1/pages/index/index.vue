<template>
	<view class="content">
		<image class="bgc" src="../../static/bgc.png" mode=""></image>
		<view class="tob">
			<view class="tob_title">
				<view :class="[tobindex == 1 ? 'tob_title_item_active' : 'tob_title_item']" @click="select(1)">奖项</view>
				<view :class="[tobindex == 2 ? 'tob_title_item_active' : 'tob_title_item']" @click="select(2)">规则</view>
			</view>
			<view class="tob_des" v-if="tobindex == 1" v-for="i in 5">
				<image class="tob_des_img" src="../../static/jiang.png" mode=""></image>
				<view class="tob_des_ietm">
					<view class="tob_des_ietm_name">最佳公益奖评选</view>
					<view class="tob_des_ietm_btn" @click="gotovote()">进入投票</view>
				</view>
			</view>
			<view class="tob_des2" v-if="tobindex == 2">
				<view class="tob_des-title">活动简介</view>
				<view class="tob_des_relus">
					第九届国寿小画家活动历经半年，中国人寿总部及36个省级分公司精心组织，共开展3341场活动，收集到32万幅来自全国各地小画家的作品，感谢大家的参与和支持！
					在社会各界和广大家长朋友、小画家的支持下，有20家中国人寿省级分公司获得“优秀组织单位”的参选资格，将通过网络投票结合内部评审的方式，产生最佳公益奖3家、最佳组织奖5家、最具权威奖1家、最佳传播奖1家、最佳创新奖1家。请为心仪的单位投出宝贵的1票吧！
				</view>
				<view class="tob_des_time">每天每个微信号可为5家单位投票</view>
				<view class="tob_des_time">投票时间：3月xx日中午12:00-3月xx日中午12:00</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tobindex: 2,
			itUrl: '',
			code: ''
		};
	},
	onLoad() {
		let that = this;
		that.itUrl = window.location.href;
		if (new RegExp('.*\\b' + 'code' + '\\b(\\s*=([^&]+)).*', 'gi').test(that.itUrl)) {
			// 先判断是否为回调
			that.code = RegExp.$2;
			uni.setStorageSync('code',that.code);
			that.login()
		}else{
			// 判断登录
			if (uni.getStorageSync('unionid')) {
				//登录过
				console.log('登录过');
			} else {
				// 未登录
				that.GzhLogin();
			}
		}
	},
	methods: {
		login(){
			this.islogin=false;
			uni.request({
				url: 'https://xhj.ninefishing.com/vote/index/getaccesstoken',
				method: 'POST',
				data: {
					code: this.code
				},
				header: {
					'Content-Type': 'application/json'
				},
				success: res => {
					// 返回的数据
					console.log(res, 'getaccesstoken');
					uni.setStorageSync('unionid',res.data.unionid)
					uni.setStorageSync('user_id',res.data.user_id)					
				}
			});
		},
		select(i) {
			this.tobindex = i;
		},
		gotovote() {
			uni.switchTab({
				url: '../vote/vote'
			});
		},
		GzhLogin() {
			// 微信内浏览器（公众号）获取code
			let that = this;
			uni.request({
				url: 'https://xhj.ninefishing.com/vote/index/getCode', 
				method: 'POST',
				data: {
					callback: that.itUrl
				},
				header: {
					'Content-Type': 'application/json'
					// 'X-ECTouch-Authorization': token
				},
				success: res => {
					// 返回的数据
					console.log(res.data);
					window.location.href = res.data;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	.bgc {
		width: 750rpx;
		height: 1390rpx;
	}
}

.tob {
	position: fixed;
	bottom: 120rpx;
	left: 20rpx;
	width: 710rpx;
	height: 798rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2rpx 17rpx 0px rgba(0, 0, 0, 0.1);
	border-radius: 20rpx;
	.tob_title {
		width: 710rpx;
		height: 88rpx;
		background: rgba(255, 255, 255, 1);
		// box-shadow:0rpx -1rpx 0px 0px rgba(230,230,230,1);
		border-radius: 20rpx 20rpx 0px 0px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.tob_title_item {
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(102, 102, 102, 1);
		}
		.tob_title_item_active {
			height: 50rpx;
			line-height: 50rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(0, 200, 105, 1);
			border-bottom: 4rpx solid rgba(0, 200, 105, 1);
		}
	}
	.tob_des {
		height: 142rpx;
		width: 710rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.tob_des_img {
			margin-left: 14rpx;
			height: 90rpx;
			width: 90rpx;
		}
		.tob_des_ietm {
			width: 584rpx;
			height: 142rpx;
			background: rgba(255, 255, 255, 1);
			border-bottom: 1rpx solid rgba(230, 230, 230, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tob_des_ietm_name {
				margin-left: 15rpx;
				width: 292rpx;
				height: 34rpx;
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 900;
				color: rgba(51, 51, 51, 1);
				line-height: 34rpx;
			}
			.tob_des_ietm_btn {
				margin-right: 30rpx;
				width: 170rpx;
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(0, 200, 105, 1);
				line-height: 60rpx;
				text-align: center;
				border: rgba(0, 200, 105, 1) 2rpx solid;
				border-radius: 30rpx;
			}
		}
	}
	.tob_des2 {
		margin-left: 40rpx;
		.tob_des-title {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			width: 120rpx;
			height: 30rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 30rpx;
		}
		.tob_des_relus {
			// margin-bottom: 30rpx;
			width: 630rpx;
			height: 463rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 46rpx;
		}
		.tob_des_time {
			width: 630rpx;
			height: 44rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(237, 107, 49, 1);
			line-height: 44rpx;
		}
	}
}
.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

// .tabbar{
// 	position: fixed;
// 	bottom: 0;
// 	left: 0;
// 	display: flex;
// 	justify-content: space-around;
// 	align-items: center;
// 	height: 100rpx;
// 	width: 750rpx;
// 	background-color: #FFFFFF;
// 	.tabbar_item_active{
// 		font-size: 40rpx;
// 		color: rgba(0,200,105,1);
// 		font-weight: 500;
// 	}
// 	.tabbar_item{
// 		font-size: 40rpx;
// 		color:rgba(51,51,51,1) ;
// 		font-weight: 500;
// 	}
// }
</style>
