export default {
	logOut: async () => {
		//use async-await or promises
		Object.keys(appsmith.store)
			.map(jwt => {
			storeValue(jwt, undefined)
		});
		navigateTo('Login')
	},
	checkLogin: async () => {
		await getContents.run().then(data => {
			storeValue('returedTodos', data);
		}).catch(err=> {
			navigateTo('Login',{});
		})
	}
}