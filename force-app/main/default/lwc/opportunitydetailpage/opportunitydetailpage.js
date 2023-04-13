import { LightningElement, api } from 'lwc';

export default class Opportunitydetailpage extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields = ['Name', 'CloseDate', 'Amount', 'StageName']; 
}