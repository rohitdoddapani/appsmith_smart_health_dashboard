export default {
	signin: async () => {
		return signIn.run(() => {
			const jwt = 	signIn?.data?.access_token;
			if(jwt){
				storeValue('jwt',jwt);
				// navigateTo('Dashboard',{});
				is_admin.run().then(data=> {
					if(data==true){
						navigateTo('Dashboard-admin',{});
					}
				})
				is_coach.run().then(data=> {
					if(data==true){
						navigateTo('Dashboard-coach',{});
					}
				})
				is_trainer.run().then(data=> {
					if(data==true){
						console.log("in trainer")
						navigateTo('Dashboard-trainer',{});
					}else{
						console.log("not in trainer")
					}
				})
			}else{
				showAlert('Invalid Username/password','error')
			}
		})
	},
}