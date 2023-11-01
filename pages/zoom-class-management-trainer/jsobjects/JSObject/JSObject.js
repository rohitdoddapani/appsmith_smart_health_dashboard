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
		await is_trainer.run().then(data => {
			if(data==true){
				console.log("in true");
			}else{
				console.log("in false");
				navigateTo('Login',{});
			}
		}).catch(err=> {
			navigateTo('Login',{});
		})
	},
	timeData: () => {
		return [
			{
				"name": "12:00 AM",
				"value": "12:00 AM"
			},
			{
				"name": "12:30 AM",
				"value": "12:30 AM"
			},
			{
				"name": "1:00 AM",
				"value": "1:00 AM"
			},
			{
				"name": "1:30 AM",
				"value": "1:30 AM"
			},
			{
				"name": "2:00 AM",
				"value": "2:00 AM"
			},
			{
				"name": "2:30 AM",
				"value": "2:30 AM"
			},
			{
				"name": "3:00 AM",
				"value": "3:00 AM"
			},
			{
				"name": "3:30 AM",
				"value": "3:30 AM"
			},
			{
				"name": "4:00 AM",
				"value": "4:00 AM"
			},
			{
				"name": "4:30 AM",
				"value": "4:30 AM"
			},
			{
				"name": "5:00 AM",
				"value": "5:00 AM"
			},
			{
				"name": "5:30 AM",
				"value": "5:30 AM"
			},
			{
				"name": "6:00 AM",
				"value": "6:00 AM"
			},
			{
				"name": "6:30 AM",
				"value": "6:30 AM"
			},
			{
				"name": "7:00 AM",
				"value": "7:00 AM"
			},
			{
				"name": "7:30 AM",
				"value": "7:30 AM"
			},
			{
				"name": "8:00 AM",
				"value": "8:00 AM"
			},
			{
				"name": "8:30 AM",
				"value": "8:30 AM"
			},
			{
				"name": "9:00 AM",
				"value": "9:00 AM"
			},
			{
				"name": "9:30 AM",
				"value": "9:30 AM"
			},
			{
				"name": "10:00 AM",
				"value": "10:00 AM"
			},
			{
				"name": "10:30 AM",
				"value": "10:30 AM"
			},
			{
				"name": "11:00 AM",
				"value": "11:00 AM"
			},
			{
				"name": "11:30 AM",
				"value": "11:30 AM"
			},
			{
				"name": "12:00 PM",
				"value": "12:00 PM"
			},
			{
				"name": "12:30 PM",
				"value": "12:30 PM"
			},
			{
				"name": "1:00 PM",
				"value": "1:00 PM"
			},
			{
				"name": "1:30 PM",
				"value": "1:30 PM"
			},
			{
				"name": "2:00 PM",
				"value": "2:00 PM"
			},
			{
				"name": "2:30 PM",
				"value": "2:30 PM"
			},
			{
				"name": "3:00 PM",
				"value": "3:00 PM"
			},
			{
				"name": "3:30 PM",
				"value": "3:30 PM"
			},
			{
				"name": "4:00 PM",
				"value": "4:00 PM"
			},
			{
				"name": "4:30 PM",
				"value": "4:30 PM"
			},
			{
				"name": "5:00 PM",
				"value": "5:00 PM"
			},
			{
				"name": "5:30 PM",
				"value": "5:30 PM"
			},
			{
				"name": "6:00 PM",
				"value": "6:00 PM"
			},
			{
				"name": "6:30 PM",
				"value": "6:30 PM"
			},
			{
				"name": "7:00 PM",
				"value": "7:00 PM"
			},
			{
				"name": "7:30 PM",
				"value": "7:30 PM"
			},
			{
				"name": "8:00 PM",
				"value": "8:00 PM"
			},
			{
				"name": "8:30 PM",
				"value": "8:30 PM"
			},
			{
				"name": "9:00 PM",
				"value": "9:00 PM"
			},
			{
				"name": "9:30 PM",
				"value": "9:30 PM"
			},
			{
				"name": "10:00 PM",
				"value": "10:00 PM"
			},
			{
				"name": "10:30 PM",
				"value": "10:30 PM"
			},
			{
				"name": "11:00 PM",
				"value": "11:00 PM"
			},
			{
				"name": "11:30 PM",
				"value": "11:30 PM"
			}
		]
	}
}