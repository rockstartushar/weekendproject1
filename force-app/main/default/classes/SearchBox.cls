public with sharing class SearchBox {
    public SearchBox() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getDataByName(String fieldValue){
        if(fieldValue==null || fieldValue=='') return new List<Student__c>();
        fieldValue='%'+fieldValue+'%';
        try {
            return [SELECT FIELDS(standard), Email__c, Marks__c, CourseName__c, Contact__c FROM Student__c WHERE Name like :fieldValue];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string deleteRecord(Id recordId){
        try {
            Database.delete(recordId);
            return 'Successful record deletion';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}