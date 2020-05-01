export default {
    template: `

        <form @submit.prevent="sendNewMessage" class="send-message-form">
            <textarea v-model="message" class="send-message-textarea" placeholder="Write a message..."></textarea>
            <button class="send-message-button">Send</button>
        </form>
    `,
    data() {
        return {
            message: ''
        }
    },
    methods: {
        async sendNewMessage() {
            let dateTime = this.getDateTime()

            let newMessage = {
                messageDate: dateTime, //Fixed?
                message: this.message,
                read: false, //Remove in database, backend and here later if no time left.
                senderId: this.$store.state.currentUser.id, // Fixed?
                channelId: this.$store.state.currentChannel.id, // Fixed?
                receiverId: null, //fix
                direct: false // Change later? remove?
            }

            let response = await fetch('/rest/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            })

            response = await response.json()
            this.message = ''
        },
        getDateTime() {
            let newMessageDate = new Date();
            //Collects all timestamps in an array
            let newDateTimeFormat = [
                newMessageDate.getFullYear()+'',
                newMessageDate.getMonth()+1+'',
                newMessageDate.getDate()+'',
                newMessageDate.getHours()+'',
                newMessageDate.getMinutes()+'',
                newMessageDate.getSeconds()+''
            ]
            let dateTime = '';
            //Builds the right time format and add 0 to single digit numbers
            for (let i = 0; i < newDateTimeFormat.length; i++) {
                dateTime += newDateTimeFormat[i].length === 1 ? "0" + newDateTimeFormat[i] : newDateTimeFormat[i]
                if(i >= 0 && i < 2) {
                    dateTime += "-"
                } else if(i === 2) {
                    dateTime += " "
                } else if(i > 2 && i < 5) {
                    dateTime += ":"
                }
            }
            return dateTime
        }
    }
}