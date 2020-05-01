export default {
	template: `
		<div style="width: 25%; padding: 5px;">
		<h3>Other Channels:</h3>
			<div v-for="(otherChannel, i) in otherChannels" :key="otherChannel.id" class="channel-name-div">
				<h4>{{otherChannel.title}}</h4>
				<button @click="onClickJoinChannel(i)" class="join-button">Join</button>
			</div>
		</div>
    `,
	computed: {
		otherChannels() {
			if (this.$store.state.currentUser === null) {
				return {};
			} else {
				return this.$store.state.currentUser.otherChannels;
			}
		}
	},
	methods: {
		async onClickJoinChannel(i) {
            let userChannelRelation = {
                userId: this.$store.state.currentUser.id,
                channelId: this.$store.state.currentUser.otherChannels[i].id
            }
            let response = await fetch('/rest/relation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userChannelRelation)
            })
        }
	}
};
