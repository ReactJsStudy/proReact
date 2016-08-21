export const throttle = (func, wait = 100) => {
	let previous = Date.now()
	return (...arg) => {
		const now = Date.now()
		if(now - previous > wait) {
			previous = now
			return func(...arg)
		}
	}
}