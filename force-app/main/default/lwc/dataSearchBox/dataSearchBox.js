import { LightningElement, track, wire } from 'lwc';
import getDataByName from '@salesforce/apex/SearchBox.getDataByName';
import deleteRecord from '@salesforce/apex/SearchBox.deleteRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
    { label: 'Edit details', name: 'edit_details' },
];

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Email', fieldName: 'Email__c', type: 'email', editable: true },
    { label: 'Marks', fieldName: 'Marks__c', type: 'number', editable: true },
    { label: 'Course Name', fieldName: 'CourseName__c', type: 'text', editable: true },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date', editable: true },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class DataSearchBox extends NavigationMixin(LightningElement) {
    columns = columns;
    name='';
    @track studentData =[]
    rowOffset = 0;
    noResult = false

    loaded = false
    responseRef
    @wire(getDataByName, {fieldValue:'$name'})
    getStudentData (response) {
        console.log('result came')
        this.responseRef = response;
        this.loaded = false 
        if (response.error) {
            console.log('er',error)
            // TODO: Error handling
        } else if (response.data) {
            // TODO: Data handling
            if(response.data.length == 0) {
                this.noResult =true;
            } else {
                this.noResult =false;
            }
            this.studentData=response.data;
            console.log(this.studentData)
        }
    }
    setSearchValue() {
        console.log('test');
        console.log(this.template.querySelector('[data-id="inputbox"]').value, 'value')
        this.name = this.template.querySelector('[data-id="inputbox"]').value;
        this.loaded=true
    }
    handleRowAction(event) {
        console.log(event)
        console.log(JSON.stringify(event.detail.action))
        let recordId = event.detail.row.Id
        if(event.detail.action.name == 'delete') {
            deleteRecord({recordId}).then(res=> {
                console.log(res)
                this.showToast('Success!',res,'success')
                return refreshApex(this.responseRef)
            }).catch(err=> {
                console.log(err )
                this.showToast('Error!',err,'error')
            })
        } else if(event.detail.action.name == 'show_details'){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId,
                    objectApiName: 'Student__c',
                    // relationshipApiName: 'CaseComments',
                    actionName: 'view'
                }
            });
        } else if(event.detail.action.name == 'edit_details'){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId,
                    objectApiName: 'Student__c',
                    // relationshipApiName: 'CaseComments',
                    actionName: 'edit'
                }
            });
        }
        console.log(event.detail.row.Id)
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
    openCreateNewRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Student__c',
                actionName: 'new'
            }
        });
    }
}