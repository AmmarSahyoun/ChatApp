export default {
    template: `
        <div class="channel-box-div">
            <h2>Channels</h2>
            <div v-for="(userChannel, i) in userChannels" :key="userChannel.id">
                <h3 @click="onClick(i)">{{userChannel.title}}</h3>
                <button @click="onClickLeaveChannel(i)" class="delete-button">🗑️</button>
            </div>
        </div>
    `,
    computed: {
        userChannels() {
            if(this.$store.state.currentUser === null) {
                return {}
            } else {
                return this.$store.state.currentUser.listOfChannels
            }
        }
    },
    methods: {
        async onClick(i) {
            this.$store.commit('setCurrentChannel', this.$store.state.currentUser.listOfChannels[i])
            let channelId = this.$store.state.currentChannel.id
            let response = await fetch('/rest/messages/' + channelId)
            response = await response.json()
            this.$store.commit('setCurrentChannelMessages', response)
        },
        async onClickLeaveChannel(i) {
            let userChannelRelation = {
                userId: this.$store.state.currentUser.id,
                channelId: this.$store.state.currentUser.listOfChannels[i].id
            }
            console.log(userChannelRelation.userId)
            console.log(userChannelRelation.channelId)
            let response = await fetch('/rest/relation', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userChannelRelation)
            })

            this.$store.commit('removeChannelfromUser', i)
        }
    }
}