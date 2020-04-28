export default {
	template: `
        <form @submit.prevent="login" class="home">
            <div class="sign-up-text">
                <h2 class="login-text">Login</h2>
            </div>
            <div>
                <input class="normal-input" type="text" v-model="username" placeholder="Enter your username...">
                <input class="normal-input input-with-margin" type="password" v-model="password" placeholder="Enter your password...">
            </div>
            <div>
                <button class="button">Login</button>
                <button type="button" @click="createUser" class="button">Create new user</button>
            </div>
        </form>
    `,
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		async login() {
			const credentials =
				"username=" +
				encodeURIComponent(this.username) +
				"&password=" +
				encodeURIComponent(this.password);

			let response = await fetch("/login", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: credentials,
			});

			if (response.url.includes("error")) {
				console.log("Wrong username/password");
			} else {
				let user = await fetch("/auth/whoami");
				user = await user.json();
				this.$store.commit("setCurrentUser", user);
				this.$router.push("/");
			}
			console.log(this.$store.state.currentUser);
		},
		createUser() {
			this.$router.push("/signup");
		},
	},
};
