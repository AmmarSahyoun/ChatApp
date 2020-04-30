export default {
	template: `
	<div>
        <form @submit.prevent="createNewChannel" class="create-new-channel">
			<div >
			  <input v-model="title" type="text" required placeholder = "channel title:" 
			  style="padding-right: 30px;color:rgb(223, 219, 219); background-color: transparent; width: 98% ">
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
