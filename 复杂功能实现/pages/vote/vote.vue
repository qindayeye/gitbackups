<template>
	<view class="bgccc">
		<view class="logo">
			<view class="logo_name">
				<image class="logo_name_title" src="../../static/zjgyj.png"></image>
				<!-- <view class="logo_name_num">3个名额</view> -->
			</view>
			<image class="logo_img" src="../../static/jiang.png" mode=""></image>
		</view>
		<view class="voteZong">
			<view class="vote" @click="goto()">
				<view class="vote_item" v-for="(item,index) in leftList" :key="index">
					<image class="vote_item_img" :src="item.img" mode="widthFix"></image>
					<view class="vote_item_title">{{item.title}}</view>
					<view class="vote_item_name">{{item.dsc}}</view>
					<view class="vote_item_dsc">
						<view class="vote_num">￥{{item.num}}</view>
						<view :class="[vote == false ? 'vote_btn_active' : 'vote_btn']" @click="voteit()">购买</view>
					</view>
				</view>			
			</view>
			<view class="vote" @click="goto()">
				<view class="vote_item" v-for="(item,index) in rightList" :key="index">
					<image class="vote_item_img" :src="item.img" mode="widthFix"></image>
					<view class="vote_item_title">{{item.title}}</view>
					<view class="vote_item_name">{{item.dsc}}</view>
					<view class="vote_item_dsc">
						<view class="vote_num">￥{{item.num}}</view>
						<view :class="[vote == false ? 'vote_btn_active' : 'vote_btn']" @click="voteit()">购买</view>
					</view>
				</view>			
			</view>
		</view>
		
		<view class="dibu">已经是底部了哦</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			heightt: '',
			hnum: 600,
			vote: false,
			list: [
				{
					img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
					title: '1猛虎动物园',
					dsc: '三碗不过岗',
					num: 998
				},
				{
					img: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1112094523,504803602&fm=26&gp=0.jpg',
					title: '2五彩乐园',
					dsc: '香山瀑布等你到来',
					num: 998
				},
				{
					img: '../../static/logo.png',
					title: '3DCloud',
					dsc: 'uni-app多端开发，解放你的双手',
					num: 998
				},
				{
					img: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4174834218,4182628250&fm=26&gp=0.jpg',
					title: '4五彩红旗',
					dsc: '入眼之处皆中国大地',
					num: 998
				},
				{
					img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3133482541,2004852832&fm=26&gp=0.jpg',
					title: '5龙图腾',
					dsc: '九霄龙吟惊天变，风云际会浅水游',
					num: 998
				},
				{
					img: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3675415932,4054970339&fm=26&gp=0.jpg',
					title: '6穿越火线',
					dsc: '火麒麟，雷神，毁灭···不过尔尔',
					num: 998
				},
				{
					img: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3880341262,3308316348&fm=26&gp=0.jpg',
					title: '7古风',
					dsc: '蛋蛋的忧伤',
					num: 998
				},
				{
					img: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg',
					title: '8野鸡',
					dsc: '体落梧桐树，乌鸡变凤凰',
					num: 998
				},
				{
					img: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3386247472,87720242&fm=26&gp=0.jpg',
					title: '9泥彩儿童画',
					dsc: 'ABCbook国际亲子阅读',
					num: 998
				},
				{
					img: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3386247472,87720242&fm=26&gp=0.jpg',
					title: '10泥彩儿童画',
					dsc: 'ABCbook国际亲子阅读',
					num: 998
				}
			],
			leftList:[],
			rightList:[]
		};
	},
	onReachBottom() { // 监听页面
		this.fenlie(this.list)
	},
	onLoad(option) {
		this.fenlie(this.list)
		
	},
	methods: {
		goto() {
			uni.navigateTo({
				url:
					'../video/video?video_url=' +
					'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
			});
		},
		getH() {
			this.hnum = 550 * 3;
			// this.$refs.xxx.style.height= '1150rpx';
			this.heightt = 'height:' + this.hnum + 'rpx;';
		},
		fenlie(list) {
			list.forEach((item, index) => {
				if (index % 2 == 1) {
					this.rightList.push(item);				
				} else {
					this.leftList.push(item);
				}
			});
		},
		voteit() {
			if (this.vote) {
				uni.showToast({
					title: '你已经投过了',
					duration: 2000,
					icon: 'none'
				});
			} else {
				this.vote = true;
				uni.showToast({
					title: '投票成功',
					duration: 2000
				});
				uni.request({
					url: 'https://www.baidu.com/', //仅为示例，并非真实接口地址。
					data: {
						// 请求参数
						text: 'uni.request'
					},
					method: 'POST',
					header: {
						'Content-Type': 'application/json'
						// 'X-ECTouch-Authorization': token
					},
					success: res => {
						// 返回的数据
						console.log(res.data);
						// this.text = 'request success';
					}
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.bgccc {
	width: 750rpx;
	// height: 1624rpx;
	background: rgba(250, 250, 250, 1);
}
.logo {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 750rpx;
	height: 214rpx;
	background: linear-gradient(315deg, rgba(255, 233, 169, 1) 0%, rgba(255, 217, 112, 1) 100%);
	.logo_name {
		width: 240rpx;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		.logo_name_title {
			z-index: 99;
			height: 60rpx;
			width: 240rpx;
		}
		.logo_name_num {
			// width:101rpx;
			height: 28rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			line-height: 28rpx;
		}
	}
	.logo_img {
		height: 179rpx;
		width: 179rpx;
	}
}
.dibu {
	margin: 0rpx auto;
	padding: 30rpx;
	width: 168rpx;
	height: 33rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
	line-height: 33rpx;
}
.voteZong{
	display: flex;
	justify-content: center;
	align-items: flex-start;
	.vote {
		width: 50%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
	
		.vote_item {
			margin: 10rpx;
			padding-bottom: 20rpx;
			width: 350rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20px;
			.vote_item_img {
				margin: 20rpx;
				width: 310rpx;
				// height: 266rpx;
			}
			.vote_item_title {
				margin: 0rpx auto;
				width: 305rpx;
				height: 30rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 900;
				color: rgba(51, 51, 51, 1);
				line-height: 30rpx;
			}
			.vote_item_name {
				margin: 20rpx auto;
				width: 305rpx;
				height: 26rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 26rpx;
			}
			.vote_item_dsc {
				height: 70rpx;
				width: 350rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.vote_num {
					margin-left: 20rpx;
					// width:100rpx;
					height: 26rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(250, 120, 65, 1);
					line-height: 26rpx;
				}
				.vote_btn {
					margin-right: 20rpx;
					width: 150rpx;
					height: 50rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 50rpx;
					text-align: center;
					border: #333333 2rpx solid;
					border-radius: 34rpx;
				}
				.vote_btn_active {
					margin-right: 20rpx;
					width: 150rpx;
					height: 50rpx;
					font-size: 26rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: rgba(0, 200, 105, 1);
					line-height: 50rpx;
					text-align: center;
					border: rgba(0, 200, 105, 1) 2rpx solid;
					border-radius: 34rpx;
				}
			}
		}
	}
}

</style>
