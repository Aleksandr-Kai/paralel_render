const queue = {
	limit: 0,
	renderCnt: 0,
	items: [],
	rendered: [],
	addItems(items) {
		if (!items) return;
		this.items.push(...items);
		this.items.sort((a, b) => {
			if (b.lvl != a.lvl) return 0;
			return b.priority - a.priority;
		});
	},
	renderStarter() {
		if (this.limit > this.renderCnt) {
			let nextItem = this.items.shift();
			if (nextItem) {
				console.log(`Render ${nextItem.id} prior: ${nextItem.priority}`);
				this.renderCnt++;
				this.rendered.push(nextItem.id);
				nextItem.render().then((newItems) => {
					if (newItems) this.addItems(newItems);
					this.renderCnt--;
				});
			} else if (queue.items.length == 0 && queue.renderCnt === 0)
				return this.rendered;
		}
	},
};

const waitRender = (queue, resolve) => {
	let res = queue.renderStarter();
	if (!res)
		setTimeout(() => {
			waitRender(queue, resolve);
		}, 1);
	else resolve(res);
};

module.exports = async function (renderItems, n) {
	queue.limit = n;
	queue.addItems(renderItems);
	return new Promise((resolve) => {
		waitRender(queue, resolve);
	});
};
