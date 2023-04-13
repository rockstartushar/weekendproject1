import { LightningElement, track, wire } from 'lwc';
import getStudentsData  from '@salesforce/apex/CustomObjectData.getStudentsData'
export default class FirstComp extends LightningElement {
    @wire(getStudentsData)
    getRes(res) {
        console.log('res from wire',res) 
    }
    @track studentList = [{
        name: 'Rohan',
        email: 'rohan@gmail.com',
        phone: '+91 8005843407',
        studentMarks: 95
    },{
        name: 'Sohan',
        email: 'Sohan@gmail.com',
        phone: '+91 8004843407',
        studentMarks: 90
    }];
    @track stdNameList = ['Rohan', 'Sohan', 'Harsh']
    @track studentData = {
        name: 'Rohan',
        email: 'rohan@gmail.com',
        phone: '+91 8005843407',
        studentMarks: 95
    }
    name = 'Rahul Sharma';
    email = 'rahul@gmail.com';
    handleSubmitBtnClick() {
        console.log('Button clicked');
        // console.log('this : ',this)
        // console.log('tags',this.template.querySelectorAll('input'))
        let elemList = this.template.querySelectorAll('input');
        console.log('Values',elemList[0].value, elemList[1].value)
        // this.name = elemList[0].value;
        // this.email = elemList[1].value
      //  this.isShowDetail = true;
        //this.stdNameList.push(elemList[0].value)
        //console.log(JSON.stringify(this.stdNameList))
        let stdDetail = {}
        stdDetail.name = elemList[0].value;
        stdDetail.email = elemList[1].value;
        this.studentList.push(stdDetail)
        
    }
    updateMarks(event) {
        console.log('mark value',event.target.value);
        this.studentData.studentMarks=event.target.value;
    }
    hideDetail() {
        this.isShowDetail = false
    }
    isShowDetail=true
    getExistingStudentsData() {
        getStudentsData().then(res=> {
            console.log('res by imperative approach', res)
        }).catch(err=>console.log(err))
    }
}