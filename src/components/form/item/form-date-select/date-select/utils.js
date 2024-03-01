export const ONE_DAY = 3600 * 24 * 1000
export const ONE_WEEK = 7 * ONE_DAY

/**
 * 修剪日期（2000-01-01 01:01:01 -> 2000-01-01 00:00:00）
 * @param - 所有参数会被直接传递给 Date 构造函数
 * @return {Date}
 */
export function trim(...args) {
	const result = new Date(...args)
	result.setHours(0, 0, 0, 0)
	return result
}

/**
 * 按照时间顺序排序
 * @param {array} dates
 * @return {array}
 */
export function sort(arr) {
	return arr.slice().sort((a, b) => a.getTime() - b.getTime())
}

/**
 * 获取给定日期所在周的第一天
 * @param {Date} date
 * @param {number} startDay 0 -> 周日；1 -> 周一
 * @return {Date}
 */
export function getStartDateOfWeek(date, startDay = 1) {
	const day = date.getDay()
	const offset = (day + 7 - startDay) % 7
	return trim(date.getTime() - offset * ONE_DAY)
}

/**
 * 获取给定日期所在周的最后一天
 * @param {Date} date
 * @param {number} startDay 0 -> 周日；1 -> 周一
 * @return {Date}
 */
export function getEndDateOfWeek(date, startDay = 1) {
	const day = date.getDay()
	const offset = 6 - ((day + 7 - startDay) % 7)
	return trim(date.getTime() + offset * ONE_DAY)
}

//获得某月的天数
export function getMonthDays(theYear, theMonth) {
	const monthStartDate = new Date(theYear, theMonth, 1)
	const monthEndDate = new Date(theYear, theMonth + 1, 1)
	const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
	return days
}
//获得本季度的开始月份
export function getCurrentQuarter() {
	const now = new Date() //当前日期
	const nowMonth = now.getMonth() //当前月

	let quarterStartMonth = 0
	if (nowMonth < 3) {
		quarterStartMonth = 1
	}
	if (2 < nowMonth && nowMonth < 6) {
		quarterStartMonth = 2
	}
	if (5 < nowMonth && nowMonth < 9) {
		quarterStartMonth = 3
	}
	if (nowMonth > 8) {
		quarterStartMonth = 4
	}
	return quarterStartMonth
}
/**
 * 获取给定日期所在月的第一天
 * @param {Date} date
 * @return {Date}
 */
export function getStartDateOfMonth(date) {
	const copy = new Date(date)
	copy.setDate(1)
	return trim(copy)
}

/**
 * 获取周数（ISO 周日历）
 * @param {Date} date
 * @return {number} week number
 */
export function getWeekOfYear(date) {
	// 周四确定当前周所属年
	const weekYear = new Date(getStartDateOfWeek(date, 1).getTime() + 3 * ONE_DAY).getFullYear()
	// 1 月 4 日确定本年第一周
	const startOfWeekYear = getStartDateOfWeek(new Date(weekYear, 0, 4), 1)
	return Math.floor((date.getTime() - startOfWeekYear.getTime()) / ONE_WEEK) + 1
}
