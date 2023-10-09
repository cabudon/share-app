<template>
	<view class="container container25518">
		<view class="flex diygw-col-24 justify-center avatar-clz">
			<view class="diygw-avatar radius bg-none">
				<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/grid1.png"></image>
			</view>
		</view>
		<view class="flex diygw-col-24 flex-direction-column justify-center items-center flex-wrap flex-clz">
			<view class="diygw-col-4 text-clz"> cabudon </view>
			<view class="diygw-col-4 text1-clz"> 积分：630 </view>
		</view>
		<view class="flex diygw-col-24 justify-center flex-nowrap">
			<view class="flex diygw-col-4">
				<button class="diygw-btn blue radius-xs flex-sub margin-xs button1-button-clz">签到</button>
			</view>
			<view class="flex diygw-col-4">
				<button class="diygw-btn blue radius-xs flex-sub margin-xs button-button-clz">退出</button>
			</view>
		</view>
		<view class="flex diygw-col-24 flex-direction-column justify-center flex-wrap">
			<view class="flex diygw-col-24 items-center flex-nowrap flex3-clz">
				<view class="diygw-col-24"> 我的兑换 </view>
				<view class="diygw-col-4 text3-clz"> > </view>
			</view>
			<view class="flex diygw-col-24 items-center flex-nowrap flex6-clz">
				<view class="diygw-col-24"> 积分明细 </view>
				<view class="diygw-col-4 text9-clz"> > </view>
			</view>
			<view class="flex diygw-col-24 items-center flex-nowrap flex5-clz">
				<view class="diygw-col-24"> 我的投稿 </view>
				<view class="diygw-col-4 text7-clz"> > </view>
			</view>
			<view class="flex diygw-col-24 items-center flex-nowrap flex4-clz">
				<view class="diygw-col-24"> 审核投稿 </view>
				<view class="diygw-col-4 text5-clz"> > </view>
			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {}
			};
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.init();
		},
		methods: {
			async init() {}
		}
	};
</script>

<style lang="scss" scoped>
	.avatar-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 40rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text-clz {
		margin-left: 0rpx;
		font-weight: bold;
		width: calc(16.6666666667% - 0rpx - 0rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text1-clz {
		margin-left: 0rpx;
		width: calc(16.6666666667% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.button1-button-clz {
		margin: 3px !important;
	}
	.button-button-clz {
		margin: 3px !important;
	}
	.flex3-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 40rpx;
		padding-bottom: 10rpx;
		height: 60rpx !important;
		padding-right: 10rpx;
	}
	.text3-clz {
		font-weight: bold;
		font-style: italic;
	}
	.flex6-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 40rpx;
		padding-bottom: 10rpx;
		height: 60rpx !important;
		padding-right: 10rpx;
	}
	.text9-clz {
		font-weight: bold;
		font-style: italic;
	}
	.flex5-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 40rpx;
		padding-bottom: 10rpx;
		height: 60rpx !important;
		padding-right: 10rpx;
	}
	.text7-clz {
		font-weight: bold;
		font-style: italic;
	}
	.flex4-clz {
		flex-shrink: 0;
		padding-top: 10rpx;
		padding-left: 40rpx;
		padding-bottom: 10rpx;
		height: 60rpx !important;
		padding-right: 10rpx;
	}
	.text5-clz {
		font-weight: bold;
		font-style: italic;
	}
	.container25518 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container25518 {
	}
</style>
