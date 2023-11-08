export default {
	dashboardMetrics: async () => {
		const users = await getUserProfiles.run();
		const currentDate = new Date();
		const end_date = new Date();
    end_date.setDate(currentDate.getDate() + (16 * 7));
		const allUsers = users.filter(o => o.user_type==='participant').length;
		console.log(allUsers)
		const userInvited = users.filter(o => o.status === 'User Invited').length;
		const usersVerified = users.filter(o => o.status === 'verified').length;
		const activeUsers=users.filter(o=> currentDate>=o.start_date && currentDate<end_date).length;


		return {
			users,
			allUsers,
			userInvited,
			usersVerified,
			activeUsers,
			currentDate,
			end_date
		}
	}

	}
