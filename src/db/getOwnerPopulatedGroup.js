import { getMemberPopulatedGroup } from './getMemberPopulatedGroup';
import { getRequestsForGroup } from './getRequestsForGroup';

export const getOwnerPopulatedGroup = async (groupId) => {
  const group = await getMemberPopulatedGroup(groupId);
  const requests = await getRequestsForGroup(groupId);
  const populatedGroups = {
    ...group,
    requests,
  };
  return populatedGroups;
};
