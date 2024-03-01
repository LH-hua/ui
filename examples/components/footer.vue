<template>
	<div class="page-footer">
		<div class="footer-container">
			<kv-row type="flex" justify="space-between">
				<kv-col :span="24" class="text-left">
					<div>
						<!-- <p>author: lw</p> -->
					</div>
				</kv-col>
			</kv-row>
		</div>
	</div>
</template>
<style lang="less" scoped>
.page-footer {
	padding: 0;
	color: #6190e8;
	text-align: center;
	background-color: #fff;

	box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.8);
	.footer-container {
		width: 90%;
		margin: 0 auto;
	}
	.text-left {
		font-size: 12px;
		display: flex;
		align-items: center;
		color: #5e6d82;
		img {
			border-radius: 100%;
			margin-right: 10px;
		}
		a {
			color: #6190e8;
		}
	}
}
</style>
