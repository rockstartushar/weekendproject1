import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext} from 'lightning/messageService';
import FirstCom from '@salesforce/messageChannel/FirstComChannel__c'
export default class Comp2 extends LightningElement {
    @wire(MessageContext)
    messageContext
    message='No message'
    connectedCallback() {
        subscribe(this.messageContext, FirstCom, (res)=>{
            console.log(res, 'listened')
            this.message = res?.message;
        })
    }
}