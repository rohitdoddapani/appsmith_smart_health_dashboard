export default {

	logout: async () => {
		storeValue('jwt',undefined);
		navigateTo('Login',{});
	},
	createUser: async () => {


		if(!nu_addEmail.text){
			showAlert('Email is required!', 'error');
			return;
		}
		if(!nu_addFirstName.text){
			showAlert('First Name is required!', 'error');
			return;
		}
		if(!nu_addLastName.text){
			showAlert('Last Name is required!', 'error');
			return;
		}
		if(!nu_addPhone.value){
			showAlert('Phone is required!', 'error');
			return;
		}
		if(!nu_userType.selectedOptionValue){
			showAlert('Usertype is required!', 'error');
			return;
		}
		if(!nu_intervention.text){
			showAlert('Intervention_number is required!', 'error');
			return;
		}
		if(!nu_startTime.formattedDate){
			showAlert('Start Time is required!', 'error');
			return;
		}
		if(!nu_tags.selectedOptionValues.length){
			showAlert('Atleast One Tag is required!', 'error');
			return;
		}


		var _intervention_no = parseInt(nu_intervention.text);
		var _tags = nu_tags.selectedOptionValues.toString();
		console.log(nu_funtlevel.selectedOptionValue, 'nu_funtlevelselectedOptionValue')
		const jsonUserData = {
			"email": nu_addEmail.text,
			"data": { 
				"user_type": nu_userType.selectedOptionValue,
				"first_name": nu_addFirstName.text ,
				"last_name":nu_addLastName.text,
				// "gender":nu_gender.selectedOptionValue,
				"intervention_no":_intervention_no,
				"wave":nu_wave.text,
				"functional_level":nu_funtlevel.selectedOptionValue,
				"start_date": nu_startTime.formattedDate,
				"phone":nu_addPhone.value,
				"status":"User Invited",
				"tags":_tags }

		}

		// appsmith.store.jsonUserData = jsonUserData;
		storeValue("jsonUserData", jsonUserData);
		// console.log(appsmith.store.jsonUserData);
		await invite_user.run().then(data=>{
			console.log(data.error? 'hi':'bye');
			if(data.error){
				console.log("In error");
				showAlert('user creation failed!', 'error');
				showAlert(data.msg,'error');
			}else{
				showAlert('user created', 'success');
				resetWidget('nu_addEmail')
				resetWidget('nu_addFirstName')
				resetWidget('nu_addLastName')
				resetWidget('nu_addPhone')
				resetWidget('nu_gender')
				resetWidget('nu_userType')
				resetWidget('nu_startTime')
				resetWidget('nu_wave')
				resetWidget('nu_funtlevel')
				resetWidget('nu_tags')
				resetWidget('nu_intervention')
				utils.getUsers();
				console.log(jsonUserData)
				closeModal('mdl_addCustomer');
			}
		}).catch(err=>{
			// console.log(err);
			// console.log(invite_user.data.msg);
			showAlert('user creation failed!', 'error');
			showAlert(invite_user.data.msg,'error');
		})

	},
	updateUser: async () => {
		var _intervention_no = parseInt(exs_intervention.text);
		var _tags = exs_tags.selectedOptionValues.toString();
		var _funclevels=exs_functlevel.selectedOptionValue.toString();

		const jsonUserUpdateData = {
			"userId": exs_userId.text,
			"user_type": exs_usertype.selectedOptionValue,
			"first_name": exs_firstname.text ,
			"last_name":exs_lastname.text,
			"email":exs_email.text,
			// "gender":exs_gender.selectedOptionValue,
			"intervention_no":_intervention_no,
			"start_date":exs_startTime.text,
			"phone":exs_phone.value,
			"tags":_tags,
			"wave":exs_wave.text,
			"functional_level":_funclevels,
			"flag":"update-user"
		}
		console.log(jsonUserUpdateData, 'jsonUserUpdateData')
		storeValue("jsonUserUpdateData", jsonUserUpdateData);
		// console.log(appsmith.store.jsonUserUpdateData);
		await update_user.run().then(data=>{
			console.log(data.error? 'hi':'bye');
			if(data.error){
				console.log(data.error)
				showAlert('user update failed!', 'error');
			}else{
				console.log(data,'data')
				showAlert('user updated', 'success');
				closeModal('mdl_customerDetails');
			}
		}).catch(err=>{
			console.log(err);
			showAlert('user update failed!', 'error');
		})
	}
}

