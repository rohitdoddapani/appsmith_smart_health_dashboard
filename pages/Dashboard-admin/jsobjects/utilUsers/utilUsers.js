export default {
	dashboardMetrics: async () => {
		const users = await getUserProfiles.run();
		const currentDate = new Date();
		const allUsers = users.filter(o => o.user_type==='participant').length;
		console.log(allUsers)
		const userInvited = users.filter(o => o.status === 'User Invited').length;
		const usersVerified = users.filter(o => o.status === 'verified').length;
		const activeUsers=users.filter(o=> currentDate>=o.start_date).length;


		return {
			users,
			allUsers,
			userInvited,
			usersVerified,
			activeUsers,
			currentDate
		}
	}

	}
