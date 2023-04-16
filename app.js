const renderAsync = require("./render");
const test = {
	data: [
		{
			id: "A",
			priority: 1,
			render() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([
							{
								id: "A.1",
								priority: 2,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve([
												{
													id: "A.1.1",
													priority: 2,
													render() {
														return new Promise(
															(resolve, reject) => {
																setTimeout(() => {
																	resolve(null);
																}, 10);
															}
														);
													},
												},
											]);
										}, 10);
									});
								},
							},
						]);
					}, 10);
				});
			},
		},
		{
			id: "B",
			priority: 2,
			render() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([
							{
								id: "B.1",
								priority: 3,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve(null);
										}, 10);
									});
								},
							},
							{
								id: "B.2",
								priority: 3,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve(null);
										}, 10);
									});
								},
							},
							{
								id: "B.3",
								priority: 3,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve(null);
										}, 10);
									});
								},
							},
							{
								id: "B.4",
								priority: 1,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve(null);
										}, 10);
									});
								},
							},
							{
								id: "B.5",
								priority: 1,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve(null);
										}, 10);
									});
								},
							},
							{
								id: "B.6",
								priority: 1,
								render() {
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											resolve(null);
										}, 10);
									});
								},
							},
						]);
					}, 10);
				});
			},
		},
	],
	maxTaskCount: 5,
};

//["B","A","B.1","B.2","B.3","A.1","B.4","A.1.1","B.5","B.6"]

renderAsync(test.data, test.maxTaskCount)
	.then((res) => console.log(JSON.stringify(res)))
	.catch((err) => console.log(`ERR ${err}`));
