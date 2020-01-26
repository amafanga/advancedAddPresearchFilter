//------------------------------------------------------------------------------------//
// In this solution we are applying basic pre-search-filter to the aaccount entity
// Feel free to reuse this code and credit the author : A. Mafanga (D365 Ramp)
//------------------------------------------------------------------------------------//

if (typeof (D365) == "undefined") {
    D365 = { __namespace: true };}

D365.AccountFunctions = {

    //-----------------------------------------------------------------------------------//
    // Attach all events that are triggered when the form loads to this function (onLoad)
    // This is the only event we call when the form loads. 
    //-----------------------------------------------------------------------------------//
    onLoad: function(executionContext)
    {        
        var formContext = executionContext.getFormContext();  
         //Here we call the 'filterContacts' methos/function and we pass the parameter values
         D365.AccountFunctions.filterContacts(formContext);      
    },

    filterContacts: function(formContext){
        debugger;
        var telephoneControl = formContext.getAttribute("telephone1"); //I have issues with formContext.getAttribute. We will discuss this on another video
        if (typeof telephoneControl !== 'undefined'){     
            var companytelephone = telephoneControl.getValue();                
            D365.AccountFunctions.addPreSearchToPrimaryContactField(formContext,companytelephone );
        }
        else{
            alert("Please make sure the company telephone number is cuptured");            
            // We disable the company CEO field to preventthe user from selecting company CEO
            formContext.getControl("crbc4_companyceo").setDisabled(true);
        }        
    },

     //-------------------------------------------------------------------//
    // associate addPreSearch to the controntrol (Company CEO)
    //------------------------------------------------------------------//
    addPreSearchToPrimaryContactField: function (formContext,companytelephone ) {    
        debugger   
        // Here we assign the anonymous function to a variable (fn)
        var fn = function () { D365.AccountFunctions.filterContactsByBusinessPhone(formContext, companytelephone); }
        // Here we pass our variable fn to addPreSearch function
        // I prefer this way because my code is clean and readable 
        formContext.getControl("crbc4_companyceo").addPreSearch(fn);
    },

    //-------------------------------------------------------------------------//
    // Query to retrive all contacts where company name equals companytelephone
    //-------------------------------------------------------------------------//
    filterContactsByBusinessPhone: function (formContext, companytelephone) {       
        // The query is generated using advanced find
        var contactFilter = "<filter type='and'>" +
            "<condition attribute='telephone1' operator='eq' value='"+companytelephone+"' />" +
            "</filter>";
        // Here we attached the filter to the Company CEO field on the accournt entity.       
        formContext.getControl("crbc4_companyceo").addCustomFilter(contactFilter, "contact");       
    },
    namespace: true
};
