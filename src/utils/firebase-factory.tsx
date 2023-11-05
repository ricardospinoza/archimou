import firestore from '@react-native-firebase/firestore';
import { TABLE_NAMES } from '../constants';

firestore().useEmulator("localhost", 8080);
const db = firestore();

const getInstance = (tableName: string) => {
    return db.collection(tableName);   
}


export const getIntancePeople = () => {
    return getInstance(TABLE_NAMES.PEOPLE);
}

export const getIntanceInvite = () => {
    return getInstance(TABLE_NAMES.INVITES);
}