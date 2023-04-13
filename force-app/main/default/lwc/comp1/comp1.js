import { publish, MessageContext } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import FirstCom from '@salesforce/messageChannel/FirstComChannel__c'

export default class Comp1 extends LightningElement {
    @wire(MessageContext)
    messageContext
    publishMessage() {
        console.log('called')
        let mess = this.template.querySelector("[data-id='messageinp']").value;
        console.log(mess);
        publish(this.messageContext, FirstCom, {message: mess});
    }
}