<template>
	<div>
		<view class="container">
			<view class="title">
				<text>{{school}}健康信息平台</text>
			</view>

			<wuc-tab textFlex :tab-list="tabList" :tabCur.sync="userType" tab-class="text-center text-black bg-white swiper-title"
			 select-class="text-blue" />
			<swiper :current="userType" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
			 indicator-active-color="rgba(255,255,255,0)">
			    <!-- 滑动模块文字内容 -->
				<!-- 辅导员 -->
				<swiper-item key="teacher">
					<view class="desc">
						<view>辅导员模式</view>
					</view>
				</swiper-item>
				<!-- 学生 -->
				<swiper-item key="students">
					<view class="desc">
						<view>学生登录，自助上报每日健康状况</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="login-form">
				<input type="text" value="" placeholder="请输入用户名" v-model="username"  style="border-radius:4px;border:1px solid #DBDBDB;" />
				<input type="text" value="" placeholder="请输入密码" password="true" v-model="password" style="border-radius:4px;border:1px solid #DBDBDB;" />
				<div class="buttonGroup">
					<button type="primary" @click="signIn">登录</button>
				</div>
				<view class="text-right">
					<navigator class="linkBtn" @click="toRegister">
						<text>没有账号？前往注册 </text>
					</navigator>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="weixinBtn">
					<text>其他方式直接登录</text>
					<navigator class="linkBtn" @click="weixinlogin">
						<uni-icons color="#89dd4d" type="weixin" size="40"></uni-icons>
					</navigator>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</div>
</template>
<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				username: '',
				password: '',
				tabList: [
							{
				 				name: '老师',
				 				icon: 'cuIcon-comment'
				 			},
				 	 		{
								name: '学生',
				 	 			icon: 'cuIcon-dianhua'
				 	 		},
				 		// 	{
				 		// 		name: '家长',
				 		// 		icon: 'cuIcon-wifi'
				 		// 	},
				 	 // 		{
				 	 // 			name: '管理员',
				 	 // 			icon: 'cuIcon-wifi'
							// }
				],
				userType: 0,
				school:''
			};
		},
		components: {
			WucTab,
			uniIcons,
		},
		computed: {},
		onLoad() {
			this.school = uni.getStorageSync('school')
		},
		methods: {
			toRegister() {
				uni.redirectTo({
					url: '/pages/register/register'
				});
			},
			tabChange(index) {
				this.userType = index;
			},
			signIn() {
				const {
					username,
					password,
					userType,
				} = this
				uni.showLoading({
					title: '登录中...'
				})
				// 调用云函数signin
				uniCloud.callFunction({
					name: 'signIn',
					data: {
						username,
						password,
						userType,
					},
				}).then((res) => {
					if (res.result.status !== 0) {
						uni.showToast({
						    icon:"none",
						    title:"登录失败",
						})
						uni.hideLoading()
						console.log('返回的', res);
						return Promise.reject(new Error(res.result.msg))
					}
					uni.showToast({
					    icon:"none",
					    title:"登录成功",
					})
					uni.hideLoading()
					uni.setStorageSync('token', res.result.token)
					uni.setStorageSync('uid', res.result.uid)
					uni.setStorageSync("userType", this.userType)
					uni.setStorageSync("username",this.username)
					// 返回值无专业id，则需要绑定（新注册用户）
					if (!res.result.major_id) {
						switch (this.userType){
							case 0:
							// 老师则不需绑定，直接到主页面
							uni.setStorageSync("academy_id",res.result.academy_id)
							uni.navigateTo({
								url: '/pages/index/index'
							});
							break;
							case 1:
							// 学生无专业id则跳转绑定
							uni.navigateTo({
								url: '/pages/student_bind/student_bind'
							})
							break;
						}
					} 
					// 有专业id，则不需要绑定
					else {
						uni.setStorageSync("major_id", res.result.major_id)
						uni.setStorageSync("grade_id", res.result.grade_id)
						uni.setStorageSync("academy_id",res.result.academy_id)
						if (this.userType == 1) {
							uni.setStorageSync("stu_num", res.result.stu_num)
							uni.setStorageSync("stu_name", res.result.stu_name)
						}
						// 跳回index页面
						uni.navigateTo({
							url: '/pages/index/index'
						});
					}
				}).catch((err) => {
					console.log(err);
					uni.hideLoading()
					uni.showModal({
						content: '登录失败，' + err.message,
						showCancel: false
					})
				})
			},
			loginMp() {
				uni.showLoading({
					title: '登录中...'
				})
				this.getCode().then((code) => {
					console.log('code', code);
					const {
						userType
					} = this;
					return uniCloud.callFunction({
						name: 'login',
						data: {
							code,
							userType,
						}
					})
				}).then((res) => {
					uni.hideLoading()
					console.log(res);
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token)
					uni.showModal({
						content: '登录成功',
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: '出现错误，请稍后再试.' + err.message,
						showCancel: false
					})
				})
			},
			getCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success(e) {
							if (e.code) {
								resolve(e.code)
							} else {
								reject(new Error('微信登录失败'))
							}
						},
						fail(e) {
							reject(new Error('微信登录失败'))
						}
					})
				})
			},
			weixinlogin(){
				uni.login({
				    provider: 'weixin',
				    success: function(loginRes) {
				        let code = loginRes.code
				            //获取相关信息
				        uni.getUserInfo({
				            provider: 'weixin',
				            success: function(infoRes) { //获取用户信息后向调用信息更新方法
				                this.username = infoRes.userInfo.nickName; //昵称
								this.password = this.username
				                let avatarUrl = infoRes.userInfo.avatarUrl; //头像
				            }
				        });
						// 调用云函数signin
						uniCloud.callFunction({
							name: 'signIn',
							data: {
								username:this.username,
								password:this.password,
								userType:1,//学生
							},
						}).then((res) => {
							if (res.result.status !== 0) {
								uniCloud.callFunction({
									name: 'signUp',
									data: {
										username:this.username,
										password:this.password,
										userType:1,//学生
									},
								}).then((res) => {
									uni.hideLoading()
									if (res.result.status !== 0) {
										return Promise.reject(new Error(res.result.msg))
									}
									uni.setStorageSync('token', res.result.token)
								}).catch((err) => {
									console.log(err);
									uni.showModal({
										content: '注册失败，' + err.message,
										showCancel: false
									})
									uni.hideLoading()
								})
								console.log('返回的', res);
							}
							
							uni.showToast({
								icon:"none",
								title:"登录成功",
							})
							uni.hideLoading()
							uni.setStorageSync('token', res.result.token)
							uni.setStorageSync('uid', res.result.uid)
							uni.setStorageSync("userType", this.userType)
							uni.setStorageSync("username",this.username)
							// 返回值无专业id，则需要绑定（新注册用户）
							if (!res.result.major_id) {
								switch (this.userType){
									case 0:
									// 老师则不需绑定，直接到主页面
									uni.setStorageSync("academy_id",res.result.academy_id)
									uni.navigateTo({
										url: '/pages/index/index'
									});
									break;
									case 1:
									// 学生无专业id则跳转绑定
									uni.navigateTo({
										url: '/pages/student_bind/student_bind'
									})
									break;
								}
							}
							// 有专业id，则不需要绑定
							else {
								uni.setStorageSync("major_id", res.result.major_id)
								uni.setStorageSync("grade_id", res.result.grade_id)
								uni.setStorageSync("academy_id",res.result.academy_id)
								if (this.userType == 1) {
									uni.setStorageSync("stu_num", res.result.stu_num)
									uni.setStorageSync("stu_name", res.result.stu_name)
								}
								// 跳回index页面
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}
						}).catch((err) => {
							console.log(err);
							uni.hideLoading()
							uni.showModal({
								content: '登录失败，' + err.message,
								showCancel: false
							})
						})
				    },
				})
			},
			validateToken() {
				uni.showLoading({
					title: '加载中...'
				});
				uniCloud.callFunction({
					name: 'validateToken',
					data: {
						token: uni.getStorageSync('token')
					}
				}).then((res) => {
					console.log(res);
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: '请求云函数发生错误，' + err.message,
						showCancel: false
					})
				})
			},
		},
		onReady() {}
	};
</script>

<style>
	.weixinBtn {
		color: #007AFF;
		text-align: center;
		font-size: 22upx;
		border-top: 1upx #333333 solid;
		margin-top: 50upx;
		padding-top: 50upx;
	}

	.weixinBtn div {
		color: #333333;
		margin-bottom: 20upx;
	}

	.linkBtn {
		color: #007AFF;
		font-size: 22upx;
	}

	.swiper {
		height: 100upx;
	}

	.swiper-title {
		font-size: 30upx;
	}

	.buttonGroup {
		display: flex;
	}

	.buttonGroup navigator {
		margin-right: 20upx;
		flex: 1;
	}

	.container {
		padding: 30px;
	}

	.title {
		text-align: center;
		font-size: 20px;
		font-weight: bold;
		padding: 20px 0px;
	}

	.desc {
		padding: 10px 0px;
		font-size: 14px;
		line-height: 22px;
		color: #999999;
	}

	.login-form input {
		height: 40px;
		border: solid 1px #DDDDDD;
		text-indent: 10px;
	}

	.login-form input,
	.login-form button {
		width: 100%;
		margin-bottom: 10px;
	}

	
</style>
