import { Base64 } from 'js-base64';
import wfc from '../../wfc';
import MessageContentType from '../messageContentType';
import GroupNotificationContent from './groupNotification';

export default class DismissGroupNotification extends GroupNotificationContent {
    operator = '';

    constructor(operator) {
        super(MessageContentType.DismissGroup_Notification);
        this.operator = operator;
    }

    formatNotification() {
        if (this.fromSelf) {
            return '您解散了群组';
        } else {
            let u = wfc.getUserInfo(this.operator);
            return u.displayName + '解散了群组';
        }
    }

    encode() {
        let payload = super.encode();
        let obj = {
            g: this.groupId,
            o: this.operator,
        };
        payload.binaryContent = Base64.encode(JSON.stringify(obj));
        return payload;
    }

    decode(payload) {
        super.decode(payload);
        let json = Base64.decode(payload.binaryContent)
        let obj = JSON.parse(json);
        this.groupId = obj.g;
        this.operator = obj.o;
    }
}