export default {

	logOut: async () => {
		storeValue('jwt',undefined);
		navigateTo('Login',{});
	},
	// createUser: async () => {
	// 
	// const SUPABASE_URL = "https://jqrzlhdeqiarbgueyqdq.supabase.co"
	// const sp = supabase.createClient(SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcnpsaGRlcWlhcmJndWV5cWRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDg3NTMyNiwiZXhwIjoyMDAwNDUxMzI2fQ.8JOKNmSxbtS_PUChiiHMByfzeTx9-2H7LYkK3IZCwTY')
	// 
	// var _intervention_no = parseInt(nu_intervention.text);
	// var _tags = nu_tags.selectedOptionValues.toString();
	// 
	// const jsonUserData = {
	// "email": nu_addEmail.text,
	// "data": { 
	// "user_type": nu_userType.selectedOptionValue,
	// "first_name": nu_addFirstName.text ,
	// "last_name":nu_addLastName.text,
	// "gender":nu_gender.selectedOptionValue,
	// "intervention_no":_intervention_no,
	// "start_date": nu_startTime.formattedDate,
	// "phone":nu_addPhone.value,
	// "status":"User Invited",
	// "tags":_tags }
	// }
	// 
	// // appsmith.store.jsonUserData = jsonUserData;
	// storeValue("jsonUserData", jsonUserData);
	// console.log(appsmith.store.jsonUserData);
	// await invite_user.run().then(data=>{
	// console.log(data.error? 'hi':'bye');
	// if(data.error){
	// showAlert('user creation failed!', 'error');
	// }else{
	// showAlert('user created', 'success');
	// closeModal('mdl_addCustomer');
	// }
	// }).catch(err=>{
	// console.log(err);
	// showAlert('user creation failed!', 'error');
	// })
	// 
	// },

	isObjectEmpty:(obj) => {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false; // Object has at least one property, not empty
			}
		}
		return true; // Object is empty
	},
	getDataFromQuery: (data) => {
		return this.isObjectEmpty(data) ? {}: {
			"userId": data.UserID,
			"user_type": data.UserType.replace(/"/g, ''),
			"first_name": data.Firstname.replace(/%2/g, ' ').replace(/"/g, '') ,
			"last_name":data.Lastname.replace(/"/g, ''),
			"Email": data.Email.replace(/%40/g, '@'),
			"gender":data.Gender,
			"intervention_no":data.Intervention_no,
			"start_date":data.StartTime,
			"phone":data.Phone? appsmith.URL.queryParams.Phone.replace(/"/g, '') : '',
			"tags":data.Tags.replace(/"/g, '').replace(/%2/g, ','),
			"flag":"update-user"
		}
	},
	// onupdateUser: async (data) => {
	// const jsonUserUpdateData = this.getDataFromQuery(data)
	// storeValue("jsonUserUpdateData", jsonUserUpdateData);
	// await update_user.run().then(data=>{
	// if(data.error){
	// showAlert('user update failed!', 'error');
	// }else{
	// showAlert('user updated', 'success');
	// 
	// }
	// }).catch(err=>{
	// console.log(err);
	// showAlert('user update failed!', 'error');
	// })
	// },
	// updateUser: async () => {
	// var _intervention_no = parseInt(exs_intervention.text);
	// var _tags = exs_tags.selectedOptionValues.toString();
	// 
	// const jsonUserUpdateData = {
	// "userId": exs_userId.text,
	// "user_type": exs_usertype.selectedOptionValue,
	// "first_name": exs_firstname.text ,
	// "last_name":exs_lastname.text,
	// "gender":exs_gender.selectedOptionValue,
	// "intervention_no":_intervention_no,
	// "start_date":exs_startTime.text,
	// "phone":exs_phone.value,
	// "tags":_tags,
	// "flag":"update-user"
	// }
	// storeValue("jsonUserUpdateData", jsonUserUpdateData);
	// console.log(appsmith.store.jsonUserUpdateData);
	// await update_user.run().then(data=>{
	// console.log(data.error? 'hi':'bye');
	// if(data.error){
	// showAlert('user update failed!', 'error');
	// }else{
	// showAlert('user updated', 'success');
	// closeModal('mdl_customerDetails');
	// }
	// }).catch(err=>{
	// console.log(err);
	// showAlert('user update failed!', 'error');
	// })
	// }
}