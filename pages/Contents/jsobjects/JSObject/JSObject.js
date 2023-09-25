export default {
	logout: async () => {
		storeValue('jwt',undefined);
		navigateTo('Login',{});
	},
	checkLogin: async () => {
		await getContents.run().then(data => {
			storeValue('returedData', data);
		}).catch(err=> {
			navigateTo('Login',{});
		})
	},
	patchContent: async (imageId) => {
		var content;
		if(contentType.selectedOptionValue == "Article"){
			content = content.text;
		}else{
			content = videoLink.inputText
		}
		appsmith.store.contentJson = {
			"title": appsmith.store.title?appsmith.store.title : title.inputText,
			"description": description.inputText ,
			"short_description": shortDescription.inputText ,
			"content_type": contentType.selectedOptionValue ,
			"content": content ,
			"week_no": week.inputText ,
			"image_id": imageId ,
			"end_week": endWeek.inputText,
			"status": status.selectedOptionValue
		};
		await updateContent.run().then(data => {
				console.log("success");
				closeModal('mdl_orderDetails');
				utils.resetFilters();
				showAlert('Content Updated!', 'success');
			}).catch(err => {
				console.log("error");
				closeModal('mdl_orderDetails');
				showAlert('Content Update failed!', 'error');
			})
		// if(appsmith.store.contentFlag == "update"){
			// 
		// }else{
			// 
		// }
	},
	postContent: async (imageId) => {
		var content;
		if(contentTypeCopy.selectedOptionValue == "Article"){
			content = contentCopy.text;
		}else{
			content = videoLinkCopy.inputText
		}
		appsmith.store.contentJson = {
			"title": appsmith.store.title?appsmith.store.title : titleCopy.inputText ,
			"description": descriptionCopy.inputText ,
			"short_description": shortDescriptionCopy.inputText ,
			"content_type": contentTypeCopy.selectedOptionValue ,
			"content": content ,
			"week_no": weekCopy.inputText ,
			"image_id": imageId ,
			"end_week": endWeekCopy.inputText,
			"status": statusCopy.selectedOptionValue
		};
		console.log("In postContent");
		await insertContent.run().then(data => {
				console.log("success");
				closeModal('mdl_newContent');
				showAlert('Content Posted!', 'success');
			}).catch(err => {
				console.log("error");
				utils.resetFilters();
				showAlert('Content post failed!', 'error');
			})
	},
	// postImage: async () => {
		// await insertImage.run().then(data => {
			// console.log(data);
		// }).catch(err => {
			// console.log(err);
		// })
	// },
	getThumbnail: async () => {
		console.log("In getthumbnail");
		if(contentType.selectedOptionValue == "Article"){
			appsmith.store.thumbnail = thumbnailImageCopy.files[0].data;
			console.log(appsmith.store.thumbnail)
		}else{
			if(appsmith.store.contentFlag == "update"){
				appsmith.store.youtubelink = videoLink.inputText;
			}else{
				appsmith.store.youtubelink = videoLinkCopy.inputText;
			}
			// var link = videoLink.inputText;
			// appsmith.store.youtubelink = videoLinkCopy.inputText;
			// var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
			// r = link.match(rx);
			// console.log(r);
			// appsmith.store.youtubeId = r[1];
			// appsmith.store.thumbnail = `https://img.youtube.com/vi/${appsmith.store.youtubeId}/hqdefault.jpg`;
			await youtube.run().then(
				data => {
					const obj = JSON.parse(data)
					// console.log(obj.thumbnail_url);
					appsmith.store.thumbnail = obj.thumbnail_url;
					appsmith.store.title = obj.title;
			}).catch(err=> {
				console.log(err);
			})
		}
		console.log("done getThumbnail");
		this.postImage();
	},
	postImage: async () => {
		const supa = supabase.createClient('https://jqrzlhdeqiarbgueyqdq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcnpsaGRlcWlhcmJndWV5cWRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDg3NTMyNiwiZXhwIjoyMDAwNDUxMzI2fQ.8JOKNmSxbtS_PUChiiHMByfzeTx9-2H7LYkK3IZCwTY');
		
		if(appsmith.store.contentFlag == "update"){
			console.log("In content: "+appsmith.store.thumbnail)
			const { data, error } = await supa
			.from('images')
			.update({ image: appsmith.store.thumbnail })
			.eq('id', appsmith.store.currentSelectedImageId)
			.select();
			console.log(data);
			appsmith.store.imageId = data[0].id;
			this.patchContent(data[0].id);
		}else{
			const { data, error } = await supa
			.from('images')
			.insert([
				{ image: appsmith.store.thumbnail },
			]).select();
			console.log(data);
			console.log("done postImage");
			appsmith.store.imageId = data[0].id;
			this.postContent(data[0].id);
		}
	}

}