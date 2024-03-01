<script>
export default {
	props: {
		label: {
			type: String,
			default: () => {
				return ''
			}
		},
		value: {
			type: [Number, String, Object, Array],
			default: () => {
				return ''
			}
		}
	},
	model: {
		prop: 'value',
		event: 'update'
	},
	methods: {
		updateValue(value) {
			this.$emit('update', value)
			this.$emit('change', value)
		}
	},
	render(h) {
		const { value, $scopedSlots } = this

		return h(
			'div',
			{
				class: 'env-form-scopedSlots'
			},
			[
				$scopedSlots.default({
					value: value,
				})
			]
		)
	}
}
</script>
