// Delay for async functions
function delay(time) {
	return new Promise((resolve) => setTimeout(resolve, time))
}

export { delay }
