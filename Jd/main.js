import Vue from 'vue'
// import store from './store'
import App from './App'

// import Json from './Json' //测试用数据

//公共js
// import PubFuc from './publicjs/common'
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration = 3000, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}

	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
/**
 * POST请求，
 * URL：接口 
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */

const quest = (url, postData, doSuccess, doFail) => {
	let token = uni.getStorageSync("token");
	uni.request({
		// 项目真正的接口通过字符串拼接方式实现
		url: 'https://www.abcbook2019.com/mobile/public/api/wx/' + url,
		data: postData,
		method: "POST",
		header: {
			'Content-Type': 'application/json',
			'X-ECTouch-Authorization': token
		},
		success: function(res) {
			doSuccess(res)
			if (res.data.status_code == 500) {
				uni.showToast({
					title: "系统异常，请联系客服",
					icon: 'none',
					duration: 2000
				})
			}
		},
		fail: function() {
			doFail()
		}
	})
}
const addBook = (e, id, num) => {
	let token = uni.getStorageSync("token");
	uni.request({
		// 项目真正的接口通过字符串拼接方式实现
		url: 'https://www.abcbook2019.com/mobile/public/api/wx/cart/add',
		data: {
			id: id,
			amount: num,
			num: 1,
			rec_type: 0,
			act_id: 0,
			uid: uni.getStorageSync("user_id"),
			attr_id: 1,
			is_checked: 1
		},
		method: "POST",
		header: {
			'Content-Type': 'application/json',
			'X-ECTouch-Authorization': token
		},
		success: function(res) {
			// console.log(res.data, 'res')
			if (res.data.data.error == 1) {
				// #ifdef H5
				// 判断微信内外
				var ua = window.navigator.userAgent.toLowerCase();
				// console.log(ua)
				// console.log(ua.indexOf('micromessenger') != -1)
				// console.log(ua.match(/MicroMessenger/i) == 'micromessenger')
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					// 微信内浏览器（公众号）
					// console.log("公众号")
					uni.navigateTo({
						url: '/pages/public/login'
					})

				} else {
					uni.navigateTo({
						url: '/pages/public/registerSJ'
					})
				}
				// #endif

				// #ifdef MP
				uni.navigateTo({
					url: '/pages/public/login'
				})
				// #endif
				// this.$store.commit("change_page", 4)
			} else {
				// console.log(res.data, 'res')
				if (res.data.code == 0) {
					if (e.cat_status == 1) {
						Vue.set(e, 'cat_status', 2); //为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。 
						uni.showToast({
							title: "取消成功",
							icon: 'none',
							duration: 2000
						});
					} else {
						Vue.set(e, 'cat_status', 1);
						uni.showToast({
							title: "加入成功",
							icon: 'none',
							duration: 2000
						});
					}
					uni.setStorageSync('total_number', res.data.data.total_number);
				} else {
					uni.showToast({
						title: res.data.data,
						icon: 'none',
						duration: 2000
					});
				}
			}
		},
		fail: function() {}
	})

}
/**
 * 微信小程序支付,仅支持微信支付(后续可能集成网页支付宝支付web-view)
 *
 * @param : provider(String) ->付款商家
 * @param : timeStamp(String) ->时间戳(当前支付时间)
 * @param : nonceStr(String) ->支付密匙
 * @param : packages(String) ->支付id
 * @param : signType(String) ->加密方式(默认MD5)
 * @param : paySign(String)
 *
 *
 *
 * 小程序支付调用
 *
 * wePay(provider, timeStamp, nonceStr, packages, signType, paySign,res=>{},fail=>{})
 */

const wePay = (provider, timeStamp, nonceStr, packages, signType, paySign, success, fail) => (
	uni.requestPayment({
		provider,
		timeStamp,
		nonceStr,
		package: packages,
		signType,
		paySign,
		success(res) {
			success(JSON.stringify(res));
		},
		fail(err) {
			fail(JSON.stringify(err))
		}
	})
)

const host = 'https://www.abcbook2019.com/'  // h5回调域名统一配置,方便更改
Vue.config.productionTip = false
Vue.prototype.$host = host
Vue.prototype.$fire = new Vue();
// Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage,
	quest,
	wePay,
	addBook
};
// Vue.prototype.$pubFuc = PubFuc
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
