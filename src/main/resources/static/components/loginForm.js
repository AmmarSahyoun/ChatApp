export default {
    template: `
        <form @submit.prevent="login">
            <input class="normal-input" type="text" v-model="username" placeholder="Enter your username...">
            <input class="normal-input" type="password" v-model="password" placeholder="Enter your password...">
            <button class="button">Submit</button>
        </form>
    `,
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async login() {
            //Test.. Continue here
            let user = {
                username: this.username,
                password: this.password
            }

            let result = await fetch('/rest/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            result = await result.json()

            this.$store.commit('setCurrentUser', result)

            this.username = ''
            this.password = ''
        }

    }
}