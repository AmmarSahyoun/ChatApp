import createChannel from './createChannel.js'

export default {
    components: {
        createChannel
    },
    template: `
        <div class="channel-box-div" style="padding: 15px;">
            <h3 class="userCh">{{this.$store.state.currentUser.username}} Channels</h3>
            <div v-for="(userChannel, i) in userChannels" :key="userChannel.id" class="channel-name-div">
                <h3 @click="onClick(i)">{{userChannel.title}}</h3>
                <button @click="onClickLeaveChannel(i)" class="delete-button">🗑️</button>
            </div>
            <createChannel/>
        </div>
    `,
    computed: {
        userChannels() {
            if(this.$store.state.currentUser === null) {
                return {}
            } else {
                return this.$store.state.currentUser.listOfChannels
            }
        },
        showUserName(){
            if(this.$store.state.currentUser === null) {
               return ''
            } else {
                return this.$store.state.currentUser.username
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