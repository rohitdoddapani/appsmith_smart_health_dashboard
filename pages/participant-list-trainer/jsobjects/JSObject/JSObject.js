export default {

	logOut: async () => {
		storeValue('jwt',undefined);
		navigateTo('Login',{});
	},
	createUser: async () => {
		
		const SUPABASE_URL = "https://jqrzlhdeqiarbgueyqdq.supabase.co"
		const sp = supabase.createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcnpsaGRlcWlhcmJndWV5cWRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDg3NTMyNiwiZXhwIjoyMDAwNDUxMzI2fQ.8JOKNmSxbtS_PUChiiHMByfzeTx9-2H7LYkK3IZCwTY')
		
		var _intervention_no = parseInt(nu_intervention.text);
		var _tags = nu_tags.selectedOptionValues.toString();
		
		const jsonUserData = {
			"email": nu_addEmail.text,
			"data": { 
				"user_type": nu_userType.selectedOptionValue,
				"first_name": nu_addFirstName.text ,
				"last_name":nu_addLastName.text,
				"gender":nu_gender.selectedOptionValue,
				"intervention_no":_intervention_no,
				"start_date": nu_startTime.formattedDate,
				"phone":nu_addPhone.value,
				"status":"User Invited",
				"tags":_tags }
		}
		
		// appsmith.store.jsonUserData = jsonUserData;
		storeValue("jsonUserData", jsonUserData);
		console.log(appsmith.store.jsonUserData);
		await invite_user.run().then(data=>{
			console.log(data.error? 'hi':'bye');
			if(data.error){
				showAlert('user creation failed!', 'error');
			}else{
				showAlert('user created', 'success');
				closeModal('mdl_addCustomer');
			}
		}).catch(err=>{
			console.log(err);
			showAlert('user creation failed!', 'error');
		})
		
	}
}