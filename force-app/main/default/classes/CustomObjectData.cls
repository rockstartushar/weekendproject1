public with sharing class CustomObjectData {
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getStudentsData() {
        return [SELECT Fields(Standard), Email__c, Marks__c, CourseName__c, Contact__c FROM Student__c];
    }
}