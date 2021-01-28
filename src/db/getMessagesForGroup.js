import { db } from './db';
import { getUser } from './getUser';

export const getMessagesForGroup = async (groupId) => {
  const connection = db.getConnection();
  const messages = await connection.collection('messages').find({groupId}).toArray();

  const usersForMessages = await Promise.all(
    messages.map((message) => getUser(message.userId))
  );

  const populatedMessages = await messages.map((message) =>(message, i) => ({
   ...message,
    userName: usersForMessages[i].fullName,
  }));
  return populatedMessages;
};
