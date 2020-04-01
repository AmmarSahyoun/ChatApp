package com.example.demo.services;

import com.example.demo.entities.Channel;
import com.example.demo.entities.Message;
import com.example.demo.entities.User;
import com.example.demo.repositories.ChannelRepo;
import com.example.demo.repositories.MessageRepo;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChannelRepo channelRepo;

    @Autowired
    private SocketService socketService;

    public List<Message> findAllMessages() {
        List<Message> messages = (List<Message>) messageRepo.findAll();


        messages.forEach(message -> {
            User sender = userRepo.findById(message.getSender_id());
            message.setSender(sender);

            User receiver = userRepo.findById(message.getReceiver_id());
            message.setReceiver(receiver);

            Integer channel_id = message.getChannel_id();
            if (channel_id != null) {
                Channel channel = channelRepo.findById((int) channel_id);
                message.setChannel(channel);
            }
        });

        return messages;
    }

    public Message findOneMessage(int id) {
        Message message = messageRepo.findById(id);
        if (message == null) return null;

        /*
        List<Channel> pets = channelRepo.findAllByUser(id); // use the same ID as the owner when we ask for the pets
        owner.setPets(pets);
        */
        User sender = userRepo.findById(message.getSender_id());
        message.setSender(sender);

        User receiver = userRepo.findById(message.getReceiver_id());
        message.setReceiver(receiver);

        Integer channel_id = message.getChannel_id();
        Channel channel;
        if (channel_id != null) {
            channel = channelRepo.findById((int) channel_id);
        } else {
            channel = new Channel();
            channel.setId(0);
            channel.setTitle("Public Channel");
        }
        message.setChannel(channel);

        return message;
    }

    public Message createNewMessage(Message newMessage) {
        Message dbMessage = null;
        try {
            dbMessage = messageRepo.save(newMessage);
            dbMessage.action = "new-pet";
            socketService.sendToAll(dbMessage, Channel.class);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return dbMessage;
    }
}
