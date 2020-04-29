export default {
	template: `
	<div >
        <form @submit.prevent="createNewChannel" class="create-new-channel">
			<div >
            <input v-model="title" type="text"
            required
            placeholder = "Channel title:">
            <button class="button2" >Create</button>
			</div>
        </form>
</div>
    `,

	props: [],
	data() {
		return {
			title: ""
		};
	},

	methods: {
		async createNewChannel() {
			if (this.title != "") {
				let newChannel = {
					title: this.title,
					admin_id: this.$store.state.currentUser.id
				};

				try {
					let channel = await fetch("/rest/channels", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newChannel)
					});

					this.name = "";

					
				} catch (e) {
					console.log("can't post it ");
					console.log(e);
				}
			}
		}
	}
};
