export default {
	addClass: () => {
		var classData = appsmith.store.classData;
		var date = zc_startdate.selectedDate.slice(0,10)
		var start = zc_slot_from.selectedOptionValue;
		var end = zc_slot_to.selectedOptionValue;
		var coachName = zc_coachname.selectedOptionValue;
		var classType = zc_classtype.selectedOptionValue;
		var title = zc_title.text;
		var shortDesc = zc_shortdesc.text;

		// Specify the local time zone
		const localTimeZone = moment.tz.guess();
		console.log(localTimeZone);
		const originalStartTime= date + ' ' + start;
		const originalEndTime = date + ' ' + end;
		console.log("originalStartTime",originalStartTime);
		// Parse the original date and time using moment.js
		const parsedStartTime= moment(originalStartTime, 'YYYY-MM-DD hh:mm A');
		const parsedEndTime = moment(originalEndTime, 'YYYY-MM-DD hh:mm A');
		// Format the parsed date and time in the desired format
		const formattedStartTime = parsedStartTime.format('YYYY-MM-DDTHH:mm:ss');
		const formattedEndTime = parsedEndTime.format('YYYY-MM-DDTHH:mm:ss');
		console.log("formattedDateTime",formattedStartTime); // Output: '2023-10-12T12:00:00'

		// Create a Moment.js object for your local time
		const localStartTime = moment.tz(formattedStartTime, localTimeZone);
		const localEndTime = moment.tz(formattedEndTime, localTimeZone);
		
		// console.log("localTIme:",localStartTime,localEndTime.format());
		
		const isDST = localStartTime.isInDST;
		console.log("Heyyyyyy:",moment.tz(formattedStartTime, "America/Chicago").format(),isDST);
		
		// const { DateTime } = require('luxon');
		
		// Get the local time
		const localStartTimeN = moment().local();
		const localEndTimeN = moment().local().add(1, "hour");

		// Convert the local time to UTC with timezone offset, taking DST into account
		const utcStartTimeWithOffset = moment.tz(localStartTimeN,localTimeZone).utcOffset();
		const utcEndTimeWithOffset = moment.tz(localEndTimeN,localTimeZone).utcOffset();

		// Format the UTC time with timezone offset
		const formattedUTCStartTimeWithOffset = utcStartTimeWithOffset;
		const formattedUTCEndTimeWithOffset = utcEndTimeWithOffset;

		// Print the UTC start and end times
		console.log(formattedUTCStartTimeWithOffset, formattedUTCEndTimeWithOffset);
		

		// const localStartTimeN = luxon.DateTime.fromISO(formattedStartTime, { zone: localTimeZone });
		// const localEndTimeN = luxon.DateTime.fromISO('2023-11-07T11:00:00', { zone: localTimeZone });
// 
		// // Convert the local time to UTC with the correct time zone offset
		// const utcStartTimeWithOffset = localStartTimeN.toUTC();
		// const utcEndTimeWithOffset = localEndTimeN.toUTC();
// 
		// // Format the UTC time with timezone offset
		// const formattedUTCStartTimeWithOffset = utcStartTimeWithOffset.toString();
		// const formattedUTCEndTimeWithOffset = utcEndTimeWithOffset.toString();
		// console.log(formattedUTCStartTimeWithOffset, formattedUTCEndTimeWithOffset);
		

		// console.log("Hellooo:",moment.utcOffset(originalStartTime, "America/New_York"));

		// Convert the local time to UTC
		console.log('Local Time:', localStartTime.format());
		const utcStartTime = localStartTime.utc();
		const utcEndTime = localEndTime.utc();
		console.log('UTC Time:', utcStartTime.format());
		var formattedUTCStartTime = utcStartTime.format();
		var formattedUTCEndTime = utcEndTime.format();
		console.log(formattedUTCStartTime,formattedUTCEndTime);

		var cacheData = {
			date: zc_startdate.selectedDate,
			title: zc_title.text,
			shortDesc: zc_shortdesc.text,
			startTime: zc_slot_from.selectedOptionValue,
			endTime: zc_slot_to.selectedOptionValue,
			coachName: zc_coachname.selectedOptionValue,
			classType: zc_classtype.selectedOptionValue,
			endDate: zc_enddate.selectedDate
		}
		// storeValue('cacheData',cacheData);
		},
	addSlot: () => {
		var slotData = appsmith.store.slotData;
		var date = zc_startdate.selectedDate.slice(0,10)
		var duration = slot_duration.selectedOptionValue
		var start = zc_slot_from.selectedOptionValue;
		var end = zc_slot_to.selectedOptionValue;
		var coachName = zc_coachname.selectedOptionValue;
		var tagSelected = zc_classtype.selectedOptionValue;
		console.log(date,start);
		// Specify the local time zone
		const localTimeZone = moment.tz.guess();
		const originalStartTime= date + ' ' + start;
		const originalEndTime = date + ' ' + end;
		console.log("originalStartTime",originalStartTime);
		// Parse the original date and time using moment.js
		const parsedStartTime= moment(originalStartTime, 'YYYY-MM-DD hh:mm A');
		const parsedEndTime = moment(originalEndTime, 'YYYY-MM-DD hh:mm A');
		// Format the parsed date and time in the desired format
		const formattedStartTime = parsedStartTime.format('YYYY-MM-DDTHH:mm:ss');
		const formattedEndTime = parsedEndTime.format('YYYY-MM-DDTHH:mm:ss');
		console.log("formattedDateTime",formattedStartTime); // Output: '2023-10-12T12:00:00'

		// Create a Moment.js object for your local time
		const localStartTime = moment.tz(formattedStartTime, localTimeZone);
		const localEndTime = moment.tz(formattedEndTime, localTimeZone);

		// Convert the local time to UTC
		console.log('Local Time:', localStartTime.format());
		const utcStartTime = localStartTime.utc();
		const utcEndTime = localEndTime.utc();
		console.log('UTC Time:', utcStartTime.format());
		var formattedUTCStartTime = utcStartTime.format();
		var formattedUTCEndTime = utcEndTime.format();
		console.log(formattedUTCStartTime,formattedUTCEndTime);

		var cacheData = {
			date: zc_startdate.selectedDate,
			duration: slot_duration.selectedOptionValue,
			start: zc_slot_from.selectedOptionValue,
			end: zc_slot_to.selectedOptionValue,
			coachName: zc_coachname.selectedOptionValue,
			tagSelected: zc_classtype.selectedOptionValue
		}
		storeValue('cacheData',cacheData);
		console.log(date)
		var d;
		if(slotData){
			d = slotData
		}else{
			d=[]
		}
		d.push([zc_slot_from.selectedOptionValue,zc_slot_to.selectedOptionValue,date,duration])
		// appsmith.store.slotData = d;
		storeValue('slotData',d)
		console.log(appsmith.store.slotData);

		const outputData = [];

		const intervals = appsmith.store.stData ? appsmith.store.stData : [];
		let idCounter = appsmith.store.idCount ? appsmith.store.idCount + 1 : 1;

		// const start_v = new Date(`${date} ${start}`);
		// const end_v = new Date(`${date} ${end}`);
		// const intervalMilliseconds = parseDuration(duration);

		const start_v = new Date(formattedUTCStartTime);
		const end_v = new Date(formattedUTCEndTime);
		console.log(start_v,end_v);
		const intervalMilliseconds = parseDuration(duration);

		while (start_v.getTime() + intervalMilliseconds <= end_v.getTime()) {
			const intervalEnd = new Date(start_v.getTime() + intervalMilliseconds);
			intervals.push({
				key: idCounter++,
				date: start_v.toISOString(),
				duration: duration,
				start_time: formatTime12Hour(start_v),
				end_time: formatTime12Hour(intervalEnd),
				startTime: start_v.toISOString(),
				endTime: intervalEnd.toISOString(),
				coach_name: coachName,
				tag: tagSelected
			});
			start_v.setTime(intervalEnd.getTime());
		}

		function parseDuration(duration) {
			const parts = duration.match(/(\d+)(\w+)/);
			const amount = parseInt(parts[1]);
			const unit = parts[2].toLowerCase();
			const millisecondsPerUnit = {
				min: 60 * 1000,
				hour: 60 * 60 * 1000,
				// Add more units if needed
			};
			return amount * millisecondsPerUnit[unit];
		}
		function formatTime12Hour(date) {
			const hours = date.getHours() % 12 || 12;
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
			return `${hours}:${minutes} ${ampm}`;
		}

		console.log(intervals);

		// appsmith.store.stData = outputData;
		storeValue('stData',intervals)
		storeValue('idCount',idCounter)
		navigateTo(appsmith.URL.fullPath);
	},
	delete_seleted_slot:() => {
		var slots_array = appsmith.store.stData;
		console.log(slots_array);
		var keyToDelete = appsmith.store.seleted_delete_slot_key
		console.log('key',keyToDelete);
		for (let i = 0; i < slots_array.length; i++) {
			if (slots_array[i].key == keyToDelete) {
				slots_array.splice(i, 1);
				i--; // Adjust index after removal
			}
		}
		storeValue('stData',slots_array);
		storeValue('seleted_delete_slot_key',null);
		navigateTo(appsmith.URL.fullPath);
	},
	schedule_slots: async () => {
		console.log(appsmith.store.stData);
		var created_slots = appsmith.store.stData;
		var slot_structure = []
		created_slots.map( async (slot)=> {
			slot_structure = {
				"coach_name": slot.coach_name,
				"tag": slot.tag,
				"start_time": slot.start_time,
				"end_time": slot.end_time,
				"is_cancelled": false,
				"is_booked": false,
				"zoom_url": "",
				"date": slot.date,
				"duration": slot.duration,
				"slots_booked": 0,
				"startTime": slot.startTime,
				"endTime": slot.endTime
			}
			storeValue('final_slot',slot_structure)
			await post_schedule.run(slot_structure)
				.then(data => {
				console.log("success "+ data);
				showAlert('Schedule added successfully', 'success');
				storeValue('stData',[]);
				storeValue('cacheData',{});
				// coach_schedule.run();
				this.scheduleData();
			})
		});
	},
	clearStore:()=> {
		// appsmith.store.slotData=[];
		// appsmith.store.stData=[];
		storeValue('stData',[]);
		storeValue('slotData',[])
	},
	scheduleData: async () => {
		var filteredData = [];
		await coach_schedule.run().then(data=> {
			// console.log(data);
			filteredData = data.filter(item => item.tag !== 'SHC');
		})
		// const data = [ { date: "2023-09-30", start_time: "10:00 AM" },{ date: "2023-09-30", start_time: "9:00 AM" }, { date: "2023-09-29", start_time: "8:00 AM" }]
		return this.customSort(filteredData);
	},
	customSort: (data) => {
		return data.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			if (dateA < dateB) {
				return -1;
			} else if (dateA > dateB) {
				return 1;
			} else {
				// If dates are equal, compare by start_time
				const timeA = this.parseTime(a.start_time);
				const timeB = this.parseTime(b.start_time);

				if (timeA < timeB) {
					return -1;
				} else if (timeA > timeB) {
					return 1;
				} else {
					return 0;
				}
			}
		});
	},
	parseTime: (timeStr) => {
		const [time, period] = timeStr.split(' ');
		const [hours, minutes] = time.split(':');
		let hoursInt = parseInt(hours);
		if (period === 'PM' && hoursInt < 12) {
			hoursInt += 12;
		} else if (period === 'AM' && hoursInt === 12) {
			hoursInt = 0;
		}
		return hoursInt * 60 + parseInt(minutes);
	}

}