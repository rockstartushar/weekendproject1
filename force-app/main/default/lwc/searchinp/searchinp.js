import { LightningElement,api } from 'lwc';

export default class Searchinp extends LightningElement {
    title = 'Most recent records';
    @api objName = '';
    getSearchedData() {
        let name = this.template.querySelector('[data-id="searchinp"]').value;
        this.title = 'Search Result';
        let evt = new CustomEvent('searched', {
            detail: {
                name, objName: this.objName
            }
        })
        this.dispatchEvent(evt);
    }
}