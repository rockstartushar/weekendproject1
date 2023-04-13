public with sharing class RecentRecords {
    @AuraEnabled(cacheable=true)
    public static List<Account> get5RecentAccount() {
        try {
            return [SELECT Id, Name, NumberOfEmployees, AccountNumber, CreatedDate,No_of_Opportunties__c FROM Account ORDER BY CreatedDate DESC LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> get5RecentOpportunities() {
        try {
            return [SELECT Id, Name, CloseDate, CreatedDate, StageName FROM Opportunity ORDER BY CreatedDate DESC LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> getRecentAccountByName(String name){
        try {
            name = '%'+name+'%';
            return [SELECT Id, Name, NumberOfEmployees, AccountNumber, CreatedDate,No_of_Opportunties__c FROM Account WHERE Name like :name  ORDER BY CreatedDate DESC LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Opportunity> getRecentOpportunityByName(String name){
        try {
            name = '%'+name+'%';
            return [SELECT Id, Name, CloseDate, CreatedDate, StageName FROM Opportunity WHERE Name like :name ORDER BY CreatedDate DESC LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string linkAccWithOpps(Id accId, List<Id> oppIdList){
        System.debug('AccId: '+accId);
        System.debug('OppIds: '+oppIdList);
        try {
            List<Opportunity> oppList = new List<Opportunity>();

            for(Integer i = 0; i< oppIdList.size();i++) {
                Opportunity opp = new Opportunity(Id = oppIdList[i], AccountId = accId);
                oppList.add(opp);
            }
            if(oppList.size()>0) {
                update oppList;
            }
            return 'Success';

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}