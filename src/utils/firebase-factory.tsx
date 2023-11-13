import firestore from '@react-native-firebase/firestore';
import { TABLE_NAMES } from '../constants';


let db: any = null;
const getInstance = (tableName: string) => {

    if (db == null) {
        // firestore().useEmulator("localhost", 8080);
        db = firestore();
    }
    return db.collection(tableName);   
}


export const getIntancePeople = () => {
    return getInstance(TABLE_NAMES.PEOPLE);
}

export const getIntanceInvite = () => {
    return getInstance(TABLE_NAMES.INVITES);
}