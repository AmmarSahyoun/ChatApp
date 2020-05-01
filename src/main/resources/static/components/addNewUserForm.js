export default {
    template: `
        <form @submit.prevent="submitNewUser" class="home">
            <div class="sign-up-text">
                <h2 class = "sign">Sign up</h2>
                <h3>{{h3Text}}</h3>
            </div>
            <div class="sign-up-form">
                <input type="text" v-model="firstName" required placeholder="Enter your first name...">
                <input type="text" v-model="lastName" required placeholder="Enter your last name...">
                <input type="text" v-model="email" required placeholder="Enter your email...">
                <input type="text" v-model="username" required placeholder="Enter your username...">
                <input type="password" v-model="password" required placeholder="Enter your password...">
                <button class="button">Sign up</button>
            </div>
        </form>
    `,
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            h3Text: 'Please fill in this form to create an account'
        }
    },
    methods: {
        async submitNewUser() {
            let user = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                username: this.username,
                password: this.password,
                isActive: true
            }

            let result = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            try {
                result = await result.json()
                const credentials = 'username=' + encodeURIComponent(this.username)
                + '&password=' + encodeURIComponent(this.password)

                let response = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: credentials
                });

                let user = await fetch('/auth/whoami')
                
                user = await user.json()
                this.$store.commit('setCurrentUser', user)
                this.$router.push('/')
            } catch {
                this.h3Text = "Error. Please try another username!"
            }

            //this.$store.commit('setCurrentUser', result)

            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.username = ''
            this.password = ''
        }
    }
}