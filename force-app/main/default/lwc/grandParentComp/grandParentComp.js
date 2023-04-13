import { LightningElement } from 'lwc';

export default class GrandParentComp extends LightningElement {
    constructor() {
        console.log('GrandParent CONSTRUCTOR IS CALLED');
        super();
    }
    connectedCallback() {

        
        console.log('GrandParent CONNECTED CALLBACK IS CALLED');
    }
    renderedCallback() {
        console.log('GrandParent RENDERED CALLBACK IS CALLED');
    }
    disconnectedCallback() {
        console.log('GrandParent DISCONNECTED CALLBACK IS CALLED');
    }
    errorCallback(error, stack) {
        console.log('GrandParent',error, stack);
    }
    grandparentMess=''
    setGrandParentMessage(evt) {
        this.grandparentMess = evt.detail;

    }
}