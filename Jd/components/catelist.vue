<template>
	<view class="">
		<view class="cate_slete">
			<view :class="[cateIndex == 0 ? 'cate_title_active' : 'cate_title']" @click="setCtae(0)">最新上架</view>
			<view :class="[cateIndex == 1 ? 'cate_title_active' : 'cate_title']" @click="setCtae(1)">都在买</view>
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
</template>

<script>
export default {
	props: {
		catlist: {
			type: Number,
			default: 10
		}
	},
	data() {
		return {
			cateIndex: 0
		};
	},
	methods: {
		setCtae(index) {
			this.cateIndex = index;
		}
	}
};
</script>

<style lang="scss">
.cate_slete {
	margin: -30rpx auto 0rpx;
	height: 50rpx;
	width: 700rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border: 1rpx solid red;

	.cate_title_active {
		height: 50rpx;
		width: 50%;
		background-color: red;
		color: #ffffff;
		text-align: center;
		font-size: 28rpx;
		line-height: 50rpx;
	}
	.cate_title {
		height: 50rpx;
		background-color: #ffffff;
		color: red;
		width: 50%;
		font-size: 28rpx;
		text-align: center;
		line-height: 50rpx;
	}
}
.catlist {
	margin-top: 20rpx;
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
				line-height: 40rpx;
				font-weight: 400;
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
