export default {

	idConverter: (num) => {
		let str = num.toString();
		let leadingZeros = "00000".substring(0, 5 - str.length);
		return 'C' + leadingZeros + str;
	},
	getDateToday : () =>{
		var today = new Date();
		var dd = new Date().getDate();
		var mm = new Date().getMonth() + 1; // January is 0 so we need to add 1
		var yyyy = new Date().getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		today = yyyy + "-" +mm + "-" + dd ;
		return today
	},

	next16thDate: () =>{
		var today = new Date();
		var next16th = new Date();
		next16th.setDate(today.getDate() + 16);
		var dd16 = next16th.getDate();
		var mm16 = next16th.getMonth() + 1; // January is 0 so we need to add 1
		var yyyy16 = next16th.getFullYear();
		if (dd16 < 10) {
			dd16 = "0" + dd16;
		}
		if (mm16 < 10) {
			mm16 = "0" + mm16;
		}
		let next16 = yyyy16 + "-" + mm16 + "-" + dd16;
		return next16
	},
	getUsers: async () => {
		var today = new Date();
		var dd = new Date().getDate();
		var mm = new Date().getMonth() + 1; // January is 0 so we need to add 1
		var yyyy = new Date().getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		var today_str = yyyy + "-" +mm + "-" + dd ;
		var nowDate = new Date();
		var next16th = new Date();
		next16th.setDate(nowDate.getDate() + 16);
		var dd16 = next16th.getDate();
		var mm16 = next16th.getMonth() + 1; // January is 0 so we need to add 1
		var yyyy16 = next16th.getFullYear();
		if (dd16 < 10) {
			dd16 = "0" + dd16;
		}
		if (mm16 < 10) {
			mm16 = "0" + mm16;
		}
		let next16 = yyyy16 + "-" + mm16 + "-" + dd16;

		const users = await getUserProfiles.run();
		let newUsers = users.map(u => {
			return {
				UserID: u.id,
				Firstname:u.first_name,
				Lastname:u.last_name,
				Name: u.first_name + ' ' + u.last_name,
				Phone: u.phone,
				Email: u.email,
				Address: u.address,
				Nickname: u.nickname,
				Profile: u.image_id,
				UserType: u.user_type,
				Gender: u.gender,
				StartTime: u.start_date,
				Dob: u.dob,
				Status: u.status,
				Intervention_no:u.intervention_no,
				Tags: u.tags
			}
		})
		let filteredUsers = newUsers.filter((o) =>  o.UserType === 'participant' &&  o.Status === 'verified' && today_str >= o.StartTime && today_str < next16);
		return filteredUsers

	},
	getCustomers: async () => {
		const customers = await getCustomers.run();

		return customers.map(c => {
			return {
				ID: this.idConverter(c.id),
				CustomerID: c.id,
				Name: c.first_name + ' ' + c.last_name,
				Phone: c.phone,
				Email: c.email,
				BillingAddress: `${c.address1}${ c.city || ''}${ c.country || ''}`,
				ShippingAddress: `${c.address1}${ c.city || ''}${ c.country || ''}`,
			}
		})
	},

	getCustomerOrders: async () => {
		const customerOrders = await getCustomerOrders.run();

		const data = customerOrders.map(o => {
			return {
				OrderId: o.id,
				OrderDate: new Date(o.created).toDateString(),
				Items: o.order_line_count,
				Amount: o.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
				Status: o.label
			}
		})

		return data;
	},

	statusColor: (status) => {
		if (status === 'CANCELLED') {
			return 'RGB(255, 0, 0)'
		};
		if (status === 'UNFULFILLED' || status === 'PACKED') {
			return 'RGB(255, 165, 0)';
		};
		if (status === 'SHIPPED' || status === 'DELIVERED') {
			return 'RGB(0, 128, 0)'
		}
		return 'RGB(255, 165, 0)'
	},

	addCustomer: async () => {
		const person = await createPerson.run()

		await createAccount.run({
			personId: person[0].id
		})

		await createLocation.run({
			personId: person[0].id
		})

		closeModal('mdl_addCustomer');

		await this.getCustomers();

		showAlert('Customer created!', 'success');
	}
}