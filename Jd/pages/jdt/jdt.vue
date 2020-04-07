<template>
	<view>
		会员计划
		<view class="jdtbg"><view v-bind:title="item.name" class="jdt" v-for="(item, index) in listVip" :key="insex" :style="item.style"></view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Zlong: 0,
			vip: [
				{ name: 'Nvip', residueTime: 155, totalTime: 200 },
				{ name: 'Jvip', residueTime: 50, totalTime: 90 },
				{ name: 'Yvip', residueTime: 15, totalTime: 3 },
				{ name: 'Dvip', residueTime: 30, totalTime: 30 }
			],
			colors: ['#1E90FF', '	#00FF7F', '#FFD700', '#FF0000', '#FF00FF'], // 颜色表
			listVip: []
		};
	},
	onLoad() {
		this.countLong();
		this.countItemLong();
	},
	methods: {
		countLong() {
			this.vip.forEach(item => {
				this.Zlong += item.totalTime;
				console.log(this.Zlong);
			});
		},
		countItemLong() {
			this.listVip = this.vip.map((item, index) => {
				let vipitem = item;
				let width = item.residueTime / this.Zlong;
				width = this.toPercent(width);
				let bgc = this.colors[index];
				vipitem.style = 'width:' + width + ';background-color:' + bgc;
				return vipitem;
			});
			console.log(this.listVip);
		},
		toPercent(point) {
			// 把小数转换成 %
			let str = Number(point * 100).toFixed(1); // toFixed 保留小数点后x位
			str += '%';
			return str;
		}
	}
};
</script>

<style lang="scss">
.jdtbg {
	height: 20rpx;
	width: 500rpx;
	border: 1px solid #333333;
	background-color: #c0c0c0;
	border-radius: 10rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.jdt {
		height: 20rpx;
	}
	.jdt2 {
		height: 20rpx;
		width: 150rpx;
		background-color: #f0ad4e;
	}
}
</style>
