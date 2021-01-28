import { rejectRequest, getRequestsForGroup, getGroup } from '../db';
import * as admin from 'firebase-admin';

export const rejectRequestRoute = {
  method: 'post',
  path: '/groups/:groupId/requests/:requestId/reject',
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { groupId, requestId } = req.params;

    const group = await getGroup(groupId);
    const user = await admin.auth().verifyIdToken(token);

    // user is owner of group
    if (!user || group.ownerId !== user.user_id) {
      return res
        .status(401)
        .json({ message: 'User is not owner of the group' });
    }
    await rejectRequest(requestId);
    const updatedRequests = await getRequestsForGroup(groupId);
    res.status(200).json(updatedRequests);
  },
};
