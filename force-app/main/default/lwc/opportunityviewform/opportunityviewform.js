import { api, LightningElement } from 'lwc';
import getFieldsInfoByObjectName from '@salesforce/apex/DynamicData.getFieldsInfoByObjectName';

export default class Opportunityviewform extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields=[];
    options=[];
    connectedCallback() {
        getFieldsInfoByObjectName({objName: this.objectApiName}).then(res=> {
            console.log('got res',res);
            let temp=[];
            for(let field of res) {
                console.log(field);
                let obj = {};
                obj.label=field.Label;
                obj.value=field.Name
                temp.push(obj);
            }
            this.options = temp;
        }).catch(err=>{
            console.log(err);
        })
    }
    
    handleChange(e) {
        this.fields=e.detail.value;
    }
}