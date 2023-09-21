export default {
	
	checkLogin: async () => {
		await getTags.run().then(data => {
			storeValue('returedtags', data);
		}).catch(err=> {
			navigateTo('Login',{});
		})
	},
	insertTag: async () => {
		await addTag.run().then(getTags.run())
	},
	updateTag: async () => {
		await updateTag.run().then(getTags.run())
	},
	idConverter: (num) => {
		let str = num.toString();
		let leadingZeros = "00000".substring(0, 5 - str.length);
		return 'P' + leadingZeros + str;
	},

	getProducts: async () => {
		const products = await getProducts.run();

		const categoryFilter = sel_category.selectedOptionValue;

		let filteredProducts = products;

		if (categoryFilter) {
			filteredProducts = products.filter(p => p.category === categoryFilter);
		}

		return filteredProducts.map(p => {
			return {
				ID: this.idConverter(p.id),
				Name: p.name,
				SKU: p.sku,
				Category: p.category,
				UnitPrice: p.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
				Stock: p.total_stock,
				ProductID: p.id,
			}
		})
	},
	getTags: async () => {
		const tags = await getTags.run();

		// const categoryFilter = sel_category.selectedOptionValue;

		// let filteredTags = tags;

		// if (categoryFilter) {
			// filteredTags = tags.filter(p => p.category === categoryFilter);
		// }

		return tags.map(p => {
			return {
				id: p.id,
				name: p.name,
				'start week': p.start_week ? p.start_week : 'not_specified',
				'end week': p.end_week ? p.end_week : 'not_specified'
			}
		})
	},

	getCategories: async () => {
		const products = await getProducts.run();
		const categories = products.map(p => p.category);
		const sanitisedCategories = categories.filter(category => category !== null && category.trim() !== "");

		if (!products || products.length < 1) {
			return [{
				id: 1,
				name: 'Food',
			},
							{
								id: 2,
								name: 'Gadget',
							}
						 ]
		}

		const uniqueCategoriesRaw = {}

		for (let i = 0; i < sanitisedCategories.length; i++) {
			// Add each string to the object as a key with a value of true
			uniqueCategoriesRaw[sanitisedCategories[i]] = true;
		}

		// Get an array of unique strings from the object keys
		const uniqueCategories = Object.keys(uniqueCategoriesRaw);

		return uniqueCategories.map((category, index) => {
			return {
				id: index,
				name: category,
			}
		})
	},
}