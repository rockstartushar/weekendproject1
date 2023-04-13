import { LightningElement } from 'lwc';

export default class ChildComp extends LightningElement {
    constructor() {
        console.log('Child CONSTRUCTOR IS CALLED');
        super();
    }
    connectedCallback() {

        
        console.log('Child CONNECTED CALLBACK IS CALLED');
    }
    renderedCallback() {
        console.log('Child RENDERED CALLBACK IS CALLED');
    }
    disconnectedCallback() {
        console.log('Child DISCONNECTED CALLBACK IS CALLED');
    }
    errorCallback(error, stack) {
        console.log('child',error, stack);
    }
    callParent(){ 
        console.log('Child test from child', 1)
        let evt = new CustomEvent('messagetoparent', {detail:'Hi to Parent'})
        this.dispatchEvent(evt)
        console.log('test from child', 2, evt)
    }
    callParentDOM(){
        console.log('test from child', 3)
        let evt = new CustomEvent('messagetoparentdom', {detail:'Hi to ParentDOM', bubbles: true})
        this.dispatchEvent(evt)
        console.log('test from child', 4)
    }
    callGrandParent(){
        let evt = new CustomEvent('messagetograndparent', {detail:'Hi to GrandParent', composed: true, bubbles: true})
        this.dispatchEvent(evt)
    }
}