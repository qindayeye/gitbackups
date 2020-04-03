<template>
	<view>
		<view class="addnum">
			<view class="younum">
				<view class="younum-Z"><text>领券</text><image class="yhq" src="http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/yhq.png" mode=""></image><text> 领取优惠券</text></view>
				<image
					@click="showquan()"
					class="younum-Y"
					:src="[quanShow == true ? 'http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/shang.png' : 'http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/xiala.png']"
					mode=""
				></image>
			</view>
			<view class="jiajian" v-if="quanShow">
				啥都没有
			</view>
		</view>
		<view class="addnum">
			<view class="younum">
				<view class="younum-Z">已选{{ num }}个</view>
				<image
					@click="showNum()"
					class="younum-Y"
					:src="[numShow == true ? 'http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/shang.png' : 'http://ktoss.oss-cn-beijing.aliyuncs.com/jdcs/xiala.png']"
					mode=""
				></image>
			</view>
			<view class="jiajian" v-if="numShow">
				数量
				<view @click="setNum(1)" class="cate_title" style="margin-left: 30rpx;">-</view>
				<input type="number" @input="setNumY" class="cate_title" :value="num"></input>
				<view @click="setNum(2)" class="cate_title">+</view>
			</view>
		</view>
		<view class="addnum">
			<view class="younum">
				<view class="younum-Z">评价</view>
				<view class="younum-Z">共0条评价</view>		
			</view>
			<view class="pl">		
				<view class="pl-Z">共0条评价</view>
				<view class="pl-Z">查看更多</view>		
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: 1,
			numShow: false,
			quanShow:false
		};
	},
	methods: {
		showNum() {
			this.numShow = !this.numShow;
		},
		showquan() {
			this.quanShow = !this.quanShow;
		},
		setNum(i){
			if(i==1&&this.num>1){
				this.num--
			}
			if(i==2){
				this.num++
			}
		},
		setNumY(event){
			 let value = event.target.value;
			if(value>1){
				this.num = value
			}else{
				this.num = 1
			}
		}
	}
};
</script>

<style lang="scss">
.addnum {
	.younum {
		.younum-Z{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 30rpx;
			line-height: 80rpx;
			.yhq{
				height: 50rpx;
				width: 80rpx;
				margin: 0 10rpx;
			}
		}
		height: 80rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.younum-Y {
			height: 30rpx;
			width: 30rpx;
		}
	}
	.jiajian {
		border-top: 1rpx solid #CCCCCC;
		padding: 0 30rpx;
		height: 100rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 34rpx;
		color: #CCCCCC;

		.cate_title {
			height: 70rpx;
			border: 1rpx solid #CCCCCC;
			background-color: #ffffff;
			color: #333333;
			width: 70rpx;
			font-weight: 600;
			font-size: 30rpx;
			text-align: center;
			line-height: 70rpx;
		}
	}
	.pl{
		height: 80rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.pl-Z{
			font-size: 30rpx;
			text-align: center;
			line-height: 70rpx;
			color: #CCCCCC;
		}
	}
}
</style>
