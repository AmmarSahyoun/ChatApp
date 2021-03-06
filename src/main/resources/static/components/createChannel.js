export default {
	template: `
	<div  class="create-new-channel">
        <form @submit.prevent="createNewChannel">
			<div>
			  <input v-model="title" type="text" required placeholder = "channel title:" 
			  style="display: flex; color:rgb(223, 219, 219); background-color: transparent; width: 85% ">
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
