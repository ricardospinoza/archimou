
import messaging from '@react-native-firebase/messaging';
import { FcmToken } from '../../models/TreeViewModel';
import { getIntanceFcmToken } from '../../utils/firebase-factory';


export const existsTokenFCM = async (userId: string) => {
  const fcmToken = await getIntanceFcmToken().doc(userId).get();
  return fcmToken.exists;
}

export const updateTokenFCM = async (fcmToken: FcmToken) => {


    if (!fcmToken) {
        console.error("Invalid Token FCM")
        return;
    }

    console.log(`Token to update or create: ${fcmToken}`)

    await getIntanceFcmToken().doc(fcmToken.userId).set(fcmToken);
}

export const sendMessage = async (userId: string, title: string, body: string) => {
    try {

      const fcmToken = await getIntanceFcmToken().doc(userId).get();

      if (fcmToken.exists) {
        await messaging().sendMessage({
          fcmOptions: {},
          to: fcmToken.data().token,
          data: {
            title,
            body
          }
        });
      }
  
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
}


