export default {
	
	checkLogin: async () => {
		await get_contents.run().then(data => {
			storeValue('returedData', data);
		}).catch(err=> {
			navigateTo('Login',{});
		})
	},
	postContent: async (imageId) => {
		var content;
		if(contentType.selectedOptionValue == "Article"){
			content = content.text;
		}else{
			content = videoLink.inputText
		}
		appsmith.store.json = {
			"title": title.inputText ,
			"description": description.inputText ,
			"short_description": shortDescription.inputText ,
			"content_type": contentType.selectedOptionValue ,
			"content": content ,
			"week": week.inputText ,
			"image_id": imageId ,
			"end_week": endWeek.inputText,
			"status": status.selectedOptionValue
		};
		await insertContent.run().then(data => {
			console.log("success")
		}).catch(err => {
			console.log("error");
		})
	},
	// postImage: async () => {
		// await insertImage.run().then(data => {
			// console.log(data);
		// }).catch(err => {
			// console.log(err);
		// })
	// },
	getThumbnail: () => {
		if(contentType.selectedOptionValue == "Article"){
			appsmith.store.thumbnail = thumbnailImage.files[0].data;
		}else{
			var link = videoLink.inputText;
			var r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
			r = link.match(rx);
			console.log(r);
			appsmith.store.youtubeId = r[1];
			appsmith.store.thumbnail = `https://img.youtube.com/vi/${appsmith.store.youtubeId}/hqdefault.jpg`;
			console.log(appsmith.store.thumbnail);
		}
		this.postImage();
	},
	postImage: async () => {
		const supa = supabase.createClient('https://jqrzlhdeqiarbgueyqdq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcnpsaGRlcWlhcmJndWV5cWRxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDg3NTMyNiwiZXhwIjoyMDAwNDUxMzI2fQ.8JOKNmSxbtS_PUChiiHMByfzeTx9-2H7LYkK3IZCwTY');
		
		// const { data: { user } } = await supa.auth.getUser();
		// const { data: { user } } = await supa.auth.getUser(appsmith.store.access_token)

		const { data, error } = await supa
			.from('images')
			.insert([
				{ image: appsmith.store.thumbnail },
			]).select();
		console.log(data);
		appsmith.store.imageId = data[0].id;
		this.postContent(data[0].id);
	}

}