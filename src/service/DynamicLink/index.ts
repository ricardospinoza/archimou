import parse from 'url-parse';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const getDynamicLinkData = async () => {
  const link = await dynamicLinks().getInitialLink();

  if (!link) return;

  const {query} = parse(link?.url ?? '', true);
  const tempId = query?.tempId;
  const userInviteId = query?.userInviteId;

  return {
    tempId,
    userInviteId,
  };
};
