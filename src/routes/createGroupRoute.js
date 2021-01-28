import * as admin from 'firebase-admin';
import { createGroup } from '../db';

export const createGroupRoute = {
  method: 'post',
  path: '/groups',
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { name } = req.body; // get the name of the new group
    if (!token) {
      res
        .status(401)
        .json({ message: 'Must be authenticated to create a new group' });
    }
    const user = await admin.auth().verifyIdToken(token);
    const newGroupId = await createGroup(name, user.user_id);
    res.status(200).json({ newGroupId });
  },
};
