<template>
	<view>
		<view class="topp">
			<view class="back" @click="back()">
				<image src="http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/back.png" mode=""></image>
				关闭
			</view>
			<view class="title">搜索</view>
			<view class=""></view>
		</view>
		<view class="head">
			<view class="inp">
				<image class="eosfont search" src="http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/sousuo.png" mode=""></image>
				<!-- 放大镜 -->
				<input type="text" placeholder="根据关键词查询京东优惠" />
			</view>
			<view class="btn">搜索</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		back(){
			uni.navigateBack()
		}
	}
};
</script>

<style lang="scss">
.topp {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100rpx;
	width: 700rpx;
	// margin: 0 auto;
	.back {
		text-align: center;
		margin-left: 20rpx;
		color: #1e90ff;
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image {
			height: 28rpx;
			width: 28rpx;
		}
	}
	.title {
		margin-left: -30rpx;
		font-size: 35rpx;
	}
}

.head {
	height: 88rpx;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	align-items: center;
	padding: 0 22upx;
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
	.btn {
		font-size: 32rpx;
	}
}
</style>
