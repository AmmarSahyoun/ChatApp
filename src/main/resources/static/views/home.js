import loginOrCreateDiv from '../components/loginOrCreateDiv.js'
import footerComponent from '../components/footerComponent.js'

export default {
    components: {
        loginOrCreateDiv,
        footerComponent
    },
    template: `
        <div class="home-container">
            <div class="home">
                <div>
                   <h1>Welcome to chatapp!</h1>
                </div>
                <div class="submit-div">
                    <loginOrCreateDiv/>
                </div>
                <div class="take-space-div"></div>
            </div>
            <footerComponent/>
        </div>
    `,
    data() {
        return {
            login: true,
            buttonText: "Login",
            isCurrentUser: false
        }
    },
    methods: {
        checkIfUserIsLoggedIn() {
            if(this.$store.state.currentUser === null) {
                this.isCurrentUser = false;
            } else {
                this.isCurrentUser = true;
            }
        }
    },
}