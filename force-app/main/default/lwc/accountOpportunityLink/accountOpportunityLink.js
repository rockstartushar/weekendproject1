import { LightningElement, track, wire } from 'lwc';
import get5RecentAccount from '@salesforce/apex/RecentRecords.get5RecentAccount';
import getRecentAccountByName from '@salesforce/apex/RecentRecords.getRecentAccountByName';
import getRecentOpportunityByName from '@salesforce/apex/RecentRecords.getRecentOpportunityByName';
import get5RecentOpportunities from '@salesforce/apex/RecentRecords.get5RecentOpportunities';
import linkAccWithOpps from '@salesforce/apex/RecentRecords.linkAccWithOpps';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountOpportunityLink extends LightningElement {
    accName;
    accData=[]
    accTitle = 'Most recent records'
    oppName;
    oppTitle = 'Most recent records'
    oppData = []
    accResult = true;
    accountToBeLinked;
    selectedOpps = []
    @wire(get5RecentAccount)
    getRecentAccResponse(response) {
        console.log('before',JSON.stringify(this.accData))
        if(response.data) {
            let temp = JSON.parse(JSON.stringify(response.data))
            for(let i = 0; i< temp.length; i++){
                temp[i].isChecked = false;
            }
            this.accData = temp;
        }
        if(response.error)  {
            this.showToast('Error', response.error, 'error')
        }
    }
    @wire(get5RecentOpportunities)
    getRecentOppResponse(response) {
        console.log(response, 2)
        if(response.data) {
            let temp = JSON.parse(JSON.stringify(response.data))
            for(let i = 0; i< temp.length; i++){
                temp[i].isChecked = false;
            }
            this.oppData = temp;
        }
        if(response?.error) {
            this.showToast('Error', response?.error, 'error') 
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
    getSearchedDataFromServer(event) {
        console.log(event);
        console.log('Parent evt',event.detail.name, event.detail.objName);
        if(event.detail.objName == 'Account') {
            this.getSearchedAccount(event.detail.name)
        } else {
            this.getSearchedOpportunities(event.detail.name)
        }
    }
    getSearchedAccount(name) {
        this.accName = name;
        getRecentAccountByName({name}).then(res=> {
            this.accTitle = 'Search Result'
            console.log('Acc Data', res);
            for(let i = 0; i< res.length; i++){
                res[i].isChecked = false;
            }
            this.accData = res;
        }).catch(err=> {
            console.log('Error', err);
            this.showToast('Error while fetch Accounts', err, 'error');
        })
    }
    getSearchedOpportunities(name) {
        this.oppName = name;
        getRecentOpportunityByName({name}).then(res=> {
            this.oppTitle = 'Search Result'
            console.log('Opp Data1', res);
            for(let i = 0; i< res.length; i++){
                res.isChecked = false;
            }
            this.oppData = res
            console.log('test');
            // this.oppData = JSON.parse(JSON.stringify(res))  
        }).catch(err=> {
            console.log('Error', err);
            // this.showToast('Error while fetch Opportunities', err, 'error');
        })
    }
    setAccountToBeLinked(event) {
        console.log(event)
        console.log(event.target)
        console.log(event.target.dataset)
        console.log(event.target.dataset.id)
        let temp = JSON.parse(JSON.stringify(this.accData));
        console.log(temp);
        for(let i = 0; i< temp.length; i++) {
            if(event.target.dataset.id==temp[i].Id){
                if(!temp[i].isChecked) {
                    this.accountToBeLinked = event.target.dataset.id;
                }
                temp[i].isChecked = !temp[i].isChecked;
            } else {
                temp[i].isChecked = false;
            }
        }
        this.accData = [...temp]
    }
    setOpportunityToBeLinked(event) {
        console.log(event.target.dataset.id)
        let temp = JSON.parse(JSON.stringify(this.oppData));
        console.log(temp);
        let oppIdsTemp = JSON.parse(JSON.stringify(this.selectedOpps));
        for(let i = 0; i< temp.length; i++) {
            if(event.target.dataset.id==temp[i].Id){
                if(!temp[i].isChecked) {
                    oppIdsTemp.push(event.target.dataset.id);
                } else {
                    let index = oppIdsTemp.indexOf(event.target.dataset.id);
                    if(index!=-1) {
                        oppIdsTemp.splice(index, 1);
                    }
                }
                temp[i].isChecked = !temp[i].isChecked;
            }
        }
        this.selectedOpps = [...oppIdsTemp];
        this.oppData = [...temp]
    }
    onSave() {
        console.log(this.selectedOpps);
        // calling apex method to acc with opps
        linkAccWithOpps({accId: this.accountToBeLinked, oppIdList: this.selectedOpps}).then(res => {
            if(res = 'Success') {
                this.showToast('Success', 'Account & Opportunities successfully linked', 'success');
                this.getSearchedAccount(this.accName);
                this.getSearchedOpportunities(this.oppName);
                this.onCancel();
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    onCancel() {
        console.log('Cancel clicked')
        // All opportunities unchecked
        let oppTemp = JSON.parse(JSON.stringify(this.oppData));
        for(let i = 0; i< oppTemp.length; i++) {
            oppTemp[i].isChecked = false;
        }
        this.selectedOpps = [];
        this.oppData = [...oppTemp]
        // All account to be false
        let temp2 = JSON.parse(JSON.stringify(this.accData));
        console.log(temp2);
        for(let i = 0; i< temp2.length; i++) {
            temp2[i].isChecked = false;
        }
        this.accData = [...temp2]
        this.accountToBeLinked = undefined;
    }
    get isShowFinalBtns() {
        return this.selectedOpps.length != 0 && this.accountToBeLinked != undefined;
    }
}