<template>
	<view class="Receive">
		<image class="topLogo" src="https://img10.360buyimg.com/imagetools/jfs/t1/88273/10/10937/148243/5e244444Ee054308e/b4857a1774a326f9.png" mode="widthFix"></image>
		<view class="cotent">
			<view class="coupon">
				<view class="coupon-Z">
					<text>30元</text>
				</view>
				<view class="coupon-Y">
					
				</view>
			</view>
			<view class="btn">
				
			</view>
			<view class="codetial">
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.Receive {
	position: relative;
}
.topLogo {
	width: 100%;
}
.coupon {
	height: 157rpx;
	width: 666rpx;
	background-image: url('https://img10.360buyimg.com/imagetools/jfs/t1/107569/34/7034/13721/5e562507E052c2262/b6b1440e86e1dce2.png');
}
.cotent {
	position: absolute;
	top: 220rpx;
	left: 0;
	height: 600rpx;
	width: 750rpx;
	background-image: url('https://img11.360buyimg.com/imagetools/jfs/t1/93074/16/10969/2705/5e251a4aE852f67e1/6b5265a0b2f2e168.png');
	background-repeat: repeat-y;
	background-size: contain;
}
.btn{
	height: 100rpx;
	width: 420rpx;
	background-image: url('https://img11.360buyimg.com/imagetools/jfs/t1/98445/1/13289/7732/5e56212eEa740cf12/4fa161ccb8c00190.png');
}
.codetial{
	height: 300rpx;
	width: 700rpx;
	background-color: #FFFFFF;
}
</style>
