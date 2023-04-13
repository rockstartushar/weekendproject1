import { LightningElement } from 'lwc';

export default class ParentCOmp extends LightningElement {
    constructor() {
        console.log('Parent CONSTRUCTOR IS CALLED');
        super();
    }
    connectedCallback() {
        console.log('Parent CONNECTED CALLBACK IS CALLED');
    }
    renderedCallback() {
        console.log('Parent RENDERED CALLBACK IS CALLED');
    }
    disconnectedCallback() {
        console.log('Parent DISCONNECTED CALLBACK IS CALLED');
    }
    errorCallback(error, stack) {
        console.log('Parent',error, stack);
    }
    isShow = true;
    handleClick() {
        this.isShow =!this.isShow  ;
    }
    parentMess=''
    setMessageForParent(evt){
        console.log('Test', evt);
        console.log('Test', evt.detail);
        this.parentMess = evt.detail;
    }
    parentDOMMess='';
    setParentDOMMessage(evt) {
        console.log('evt',evt)
        this.parentDOMMess = evt.detail;

    }
}