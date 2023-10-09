<template>
	<view class="container container25518">
		<view class="flex diygw-col-24 justify-center avatar-clz">
			<view class="diygw-avatar xl radius bg-none">
				<image mode="aspectFit" class="diygw-avatar-img radius" src="/static/grid1.png"></image>
			</view>
		</view>
		<u-form-item class="diygw-col-24 input-clz" label="手机号" prop="input">
			<u-input :focus="inputFocus" class="" placeholder="请输入手机号" v-model="input" type="text"></u-input>
		</u-form-item>
		<u-form-item class="diygw-col-24 input1-clz" label="密码" prop="input1">
			<u-input :focus="input1Focus" class="" placeholder="请输入密码" v-model="input1" type="text"></u-input>
		</u-form-item>
		<view class="flex diygw-col-24">
			<button class="diygw-btn red radius-xs flex-sub margin-xs button-button-clz">按钮</button>
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
				globalData: {},
				inputFocus: false,
				input: '',
				input1Focus: false,
				input1: ''
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
		margin-top: 80rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.input-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.input1-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.button-button-clz {
		margin: 3px !important;
	}
	.container25518 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container25518 {
	}
</style>
