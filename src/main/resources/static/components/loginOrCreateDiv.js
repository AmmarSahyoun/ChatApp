export default {
    template: `
        <div>
            <a class="button" @click="onButtonClick">{{buttonTest}}</a>
            <router-link v-if="!isCurrentUser" class="button" to="/signup">Create new user</router-link>
        </div>
    `,
    computed: {
        buttonTest() {
            if(this.$store.state.currentUser === null) {
                this.isCurrentUser = false;
                return "Login";
            } else {
                this.isCurrentUser = true;
                return "Logout";
            }
        }
    },
    data() {
        return {
            isCurrentUser: false
        }
    },
    methods: {
        onButtonClick() {
            if(this.isCurrentUser) {
                this.$store.commit('setCurrentUser', null)
                fetch('/logout')
            } else {
                this.$router.push('/login')
            }
        }
    }
}