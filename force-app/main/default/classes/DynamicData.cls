public with sharing class DynamicData {
    public DynamicData() {

    }
    @AuraEnabled
    public static List<Map<String,String>> getFieldsInfoByObjectName(String objName){
        try {
            String type=objName;  // Say,this is my object
           List<FieldDefinition> fieldsRecords=  [SELECT DeveloperName, Label
            FROM FieldDefinition where EntityDefinition.QualifiedApiName = :type];
            List<Map<String,String>> fieldsMapList = new List<Map<String,String>>();
            for(FieldDefinition fd:fieldsRecords) {
                Map<String, String> fieldsMap = new Map<String, String>();
                fieldsMap.put('Name', fd.DeveloperName);
                fieldsMap.put('Label', fd.Label);
                fieldsMapList.add(fieldsMap);
            }
            return fieldsMapList;

            // Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            // Schema.SObjectType objSchema = schemaMap.get(type);
            // Map<String, Schema.SObjectField> fieldMap = objSchema.getDescribe().fields.getMap();

            // List<Map<String,String>> fieldsMapList = new List<Map<String,String>>();
            // for (String fieldName: fieldMap.keySet()) { 
            //     Map<String, String> fieldsMap = new Map<String, String>();
            //     String fieldlabel;
            //     //It provides to get the object fields label.
            //     fieldlabel = fieldMap.get(fieldName).getDescribe().getLabel();

            //     // put name & label
            //     fieldsMap.put('Name', fieldName);
            //     fieldsMap.put('Label', fieldlabel);

            //     // add to the list
            //     fieldsMapList.add(fieldsMap);
            // }
            // return fieldsMapList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}