export default {
    template: `
        <div class="message-box-div">
            <div>
              <h2 class="currentCH">Channel:  {{ showChannelName}}</h2>
            </div>
            <div v-for="message in showMessages" class="message-div" :hover="true">
                <span class="inner-message-div">
                    <p class="message-name">{{message.senderName}}</p>
                    <p class="message-date">{{message.messageDate}}</p>
                    <button v-if="checkDeleteMessage(message.senderId)" @click="onClick(message.id)" class="delete-button">🗑️</button>
                    <button v-if="checkIfAdmin()" @click="removeUser(message.senderId)" class="remove-user-button">Remove</button>
                </span>
                <p class="message-p">{{message.message}}</p>
            </div>
        </div>
    `,
    data() {
        return {
            hover: false
        }
    },
    computed: {
        showMessages() {
            if(this.$store.state.currentChannelMessages === null) {
                return {}
            } else {
                return this.$store.state.currentChannelMessages
            }
        },
        showChannelName() {
            if (this.$store.state.currentChannel === null) {
                return 'Public Room'
            } else {
                return this.$store.state.currentChannel.title
            }
        }
    },
    methods: {
        async onClick(id) {
            let response = await fetch('/rest/messages/' + id, {
                method: 'Delete'
            })
        },
        checkDeleteMessage(senderId) {
            if(senderId === this.$store.state.currentUser.id || this.$store.state.currentChannel.admin_id === this.$store.state.currentUser.id) {
                return true
            } else {
                return false
            }
        },
        async removeUser(senderId) {
            let userChannelRelation = {
                userId: senderId,
                channelId: this.$store.state.currentChannel.id
            }
            let response = await fetch('/rest/relation', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userChannelRelation)
            })
        },
        checkIfAdmin() {
            if(this.$store.state.currentChannel.admin_id === this.$store.state.currentUser.id) {
                return true
            } else {
                return false
            }
        }
    }
}