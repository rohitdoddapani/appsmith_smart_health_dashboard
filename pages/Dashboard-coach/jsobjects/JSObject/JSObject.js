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
		await is_coach.run().then(data => {
			if(data==true){
				console.log("hi")
			}else{
				navigateTo('Login',{});
			}
		}).catch(err=> {
			navigateTo('Login',{});
		})
	}
}