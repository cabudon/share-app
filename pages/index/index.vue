<template>
	<view class="container container25518">
		<view class="flex diygw-col-24 flex-direction-column">
			<view class="diygw-tabs text-center solid-bottom justify-center tabs-title">
				<view class="diygw-tab-item tabs-item-title flex-sub" :class="index == tabsIndex ? ' cur text-green ' : ''" v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
			</view>
			<view class="">
				<view v-if="tabsIndex == 0" class="flex-sub">
					<view class="flex diygw-col-24">
						<diy-noticebar class="flex1 diy-notice-bar" color="#db5f54" bgColor="#fff" leftIcon="diy-icon-notification">
							<block v-slot:content>
								<text class="diy-notice-item"> 程序员启蒙课 </text>
							</block>
						</diy-noticebar>
					</view>
					<view class="diygw-col-24 search-clz">
						<view class="diygw-search">
							<view class="flex1 align-center flex padding-xs solid radius">
								<text style="color: #555 !important" class="diy-icon-search"></text>
								<input class="flex1" name="search" type="" v-model="search" placeholder="请输入搜索内容" />
							</view>
							<view style="color: #333 !important" class="diygw-tag margin-left-xs radius-xs"> </view>
						</view>
					</view>
					<view class="flex diygw-col-24 items-center flex-nowrap flex-clz">
						<image src="/static/icon1_ht.png" class="response diygw-col-3 image-clz" mode="widthFix"></image>
						<view class="flex flex-wrap diygw-col-17 flex-direction-column flex1-clz">
							<view class="diygw-text-line1 diygw-col-24 text-clz diygw-ellipsis"> ChatGPT 辅助开发 React 项目 </view>
							<view class="diygw-text-line2 diygw-col-24 text1-clz"> 带你使用ChatGPT +Copilot 等AI 工具。带你使用ChatGPT +Copilot 等AI 工具带你使用ChatGPT +Copilot 等AI 工具 </view>
						</view>
						<view class="flex diygw-col-3 flex-direction-column justify-center items-center flex-wrap">
							<view class="diygw-text-line1 diygw-col-24 text2-clz diygw-ellipsis"> 10 积分 </view>
							<view class="diygw-text-line2 diygw-col-24 text3-clz"> 下载 </view>
						</view>
					</view>
					<view class="flex diygw-col-24 items-center flex-nowrap flex3-clz">
						<image src="/static/icon1_ht.png" class="response diygw-col-3 image1-clz" mode="widthFix"></image>
						<view class="flex flex-wrap diygw-col-17 flex-direction-column flex4-clz">
							<view class="diygw-text-line1 diygw-col-24 text4-clz diygw-ellipsis"> Docker 实战指南 </view>
							<view class="diygw-text-line2 diygw-col-24 text5-clz"> Docker 实战指南，从入门到精通。Docker 实战指南，从入门到精通。Docker 实战指南，从入门到精通。 </view>
						</view>
						<view class="flex diygw-col-3 flex-direction-column justify-center items-center flex-wrap">
							<view class="diygw-text-line1 diygw-col-24 text6-clz diygw-ellipsis"> 10 积分 </view>
							<view class="diygw-text-line2 diygw-col-24 text7-clz"> 下载 </view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 1" class="flex-sub">
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex diygw-col-24 flex-nowrap">
							<view class="diygw-text-line1 diygw-col-3 text8-clz diygw-ellipsis"> 01 </view>
							<view class="diygw-col-24 text9-clz"> 积分获得方式 </view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex8-clz">
							<view class="diygw-col-24 text11-clz"> 每日签到 </view>
							<view class="diygw-col-24 text10-clz"> 投稿 </view>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex diygw-col-24 flex-nowrap">
							<view class="diygw-text-line1 diygw-col-3 text12-clz diygw-ellipsis"> 02 </view>
							<view class="diygw-col-24 text13-clz"> 深入交流 </view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex11-clz">
							<view class="diygw-col-24 text14-clz"> 技术交流群:888 </view>
							<view class="diygw-col-24 text15-clz"> 投稿：id888 </view>
						</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 flex-direction-column">
						<view class="flex diygw-col-24 flex-nowrap">
							<view class="diygw-text-line1 diygw-col-3 text16-clz diygw-ellipsis"> 03 </view>
							<view class="diygw-col-24 text17-clz"> 公众号（技术干活分享） </view>
						</view>
						<view class="flex flex-wrap diygw-col-24 flex-direction-column flex14-clz">
							<view class="diygw-col-24 text18-clz"> 右上角 -> 松山院 -> 公众号 </view>
							<view class="diygw-col-24 text19-clz"> 公众号：ss </view>
						</view>
					</view>
				</view>
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
				globalData: {},
				tabsDatas: [
					{ text: `发现`, icon: `` },
					{ text: `使用说明`, icon: `` }
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0,
				search: ''
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
			async init() {},
			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search-clz {
		flex-shrink: 0;
		height: 6vh !important;
	}
	.flex-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image-clz {
		flex-shrink: 0;
		height: 100rpx !important;
	}
	.flex1-clz {
		margin-left: 10rpx;
		width: calc(70.8333333333% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text-clz {
		font-weight: bold;
	}
	.text1-clz {
		font-size: 20rpx !important;
	}
	.text2-clz {
		font-weight: bold;
	}
	.text3-clz {
		font-size: 20rpx !important;
	}
	.flex3-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image1-clz {
		flex-shrink: 0;
		height: 100rpx !important;
	}
	.flex4-clz {
		margin-left: 10rpx;
		width: calc(70.8333333333% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.text4-clz {
		font-weight: bold;
	}
	.text5-clz {
		font-size: 20rpx !important;
	}
	.text6-clz {
		font-weight: bold;
	}
	.text7-clz {
		font-size: 20rpx !important;
	}
	.text8-clz {
		background-color: #db5f54;
		margin-left: 10rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(12.5% - 10rpx - 10rpx) !important;
		font-size: 38rpx !important;
		padding-bottom: 8rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.text9-clz {
		margin-left: 10rpx;
		padding-top: 10rpx;
		color: #db5f54;
		text-decoration: underline;
		padding-left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 34rpx !important;
		padding-bottom: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.flex8-clz {
		padding-top: 10rpx;
		padding-left: 28rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text11-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text10-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text12-clz {
		background-color: #db5f54;
		margin-left: 10rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(12.5% - 10rpx - 10rpx) !important;
		font-size: 38rpx !important;
		padding-bottom: 8rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.text13-clz {
		margin-left: 10rpx;
		padding-top: 10rpx;
		color: #db5f54;
		text-decoration: underline;
		padding-left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 34rpx !important;
		padding-bottom: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.flex11-clz {
		padding-top: 10rpx;
		padding-left: 28rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text14-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text15-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text16-clz {
		background-color: #db5f54;
		margin-left: 10rpx;
		padding-top: 10rpx;
		padding-left: 10rpx;
		width: calc(12.5% - 10rpx - 10rpx) !important;
		font-size: 38rpx !important;
		padding-bottom: 8rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		text-align: center;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.text17-clz {
		margin-left: 10rpx;
		padding-top: 10rpx;
		color: #db5f54;
		text-decoration: underline;
		padding-left: 0rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 34rpx !important;
		padding-bottom: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		padding-right: 10rpx;
	}
	.flex14-clz {
		padding-top: 10rpx;
		padding-left: 28rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text18-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.text19-clz {
		margin-left: 0rpx;
		width: calc(100% - 0rpx - 0rpx) !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 0rpx;
	}
	.container25518 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container25518 {
	}
</style>
