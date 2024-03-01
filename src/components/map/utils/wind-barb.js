function windBarb(){
  let len = 32, levelLen = 8, levelSt = 4
  let windBarb = {}

  windBarb.init = length => {
    len = length
    levelLen = length / 4
    levelSt = length / 8
    return windBarb
  }

  windBarb.drawWindbarb = (context, level, ratio) => {
		const r = ratio ? 1 + ratio : 1
		// 直杆长度
		const length = len * r
		// 每级风的尾羽长度
		const levelLength = levelLen * r
		// 尾羽的位置步长
		const levelStep = levelSt * r
		// 风羽直杆
		context.lineTo(0, -length)
		// 风羽尾羽
		let barbCount = 0
		for (let i = 1; i <= level; i++) {
			const isNeedToMove = i % 2 === 0
			const barbLength = isNeedToMove ? 2 : 1
			context.lineTo(levelLength * barbLength, -length + barbCount * levelStep)
			if (isNeedToMove) {
				barbCount++
				context.moveTo(0, -length + barbCount * levelStep)
			} else {
				context.moveTo(levelLength * barbLength, -length + barbCount * levelStep)
			}
		}
	}

  return windBarb
}

export default windBarb
