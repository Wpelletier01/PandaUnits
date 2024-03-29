
// will store the section.json file
var data = {};
// html page name
var pname = getCurrentPage();
// store the extern script depending the name of the file that load this script
let module;

// make sure that is not the index file
if ( pname != null && pname != "index") {

    var moduleFile = './' + pname + '.js';

    module = await import(moduleFile);

}

/*


Jquery section


*/

// when the page is load and ready
$(function() {

    // set the year on the fake legal notice message 
    var d = new Date().getFullYear();
    $("#legal").text("© " + d + " Pandas Units. No right reserved");

    // make sure that the json file is only load in page that need it
    if (pname != null && pname != "index") {

        $.getJSON("../json/section.json",function(section) {
         
            data = section[pname];
            init();
        });
            

    }


});


//  take the value selected from the "from" dropdown and make it selected on the "to" dropdown,
//  vice versa
$("#invert").on("click", function() {
      
                
    var from = $("#from-select").val();
    var to = $("#to-select").val();

        
    $("#from-select").val(to); 
    $("#to-select").val(from);           

    setTimeout(function(){updateDisplayUnit()},20)

});

//  Trigger state change when the "From" dropdown change of selection
$("#from-select").on("change",function() { 

    // capture the new value
    var from = $("#from-select").val();
    
    // for all the other type of conversion,
    // we need to make sure that if the user change the type of unit (eg. Imperial to Metric)
    // because if so, we change the vtype attribute 
    if (pname != "time" && pname != "temparature") {

        if (module.IMPERIAL.includes(from)) {

            $("#from-select").attr("vtype","imperial");
    
        } else {
    
            $("#from-select").attr("vtype","metric");
    
        }
    
    } 

    // This is for when a conversion have already been made, we want that another conversion
    // trigger immediately 
    if (getFromVal() != "0") {

        convertTrigged();

    } else {
        // since convertTrigged() call updateDisplayUnit(), we dont want to call a second time
        updateDisplayUnit(); 

    }


}); 

//  Trigger state change when the "To" dropdown change of selection
$("#to-select").on("change",function(){
    
    
    var to = $("#to-select").val();


    if (pname != "time" && pname != "temparature") {

        if (module.IMPERIAL.includes(to)) {
               
            $("#to-select").attr("vtype","imperial");

        } else {

            $("#to-select").attr("vtype","metric");

        }
    }

    if (getFromVal() != "0") {

        convertTrigged();
    } else {

        updateDisplayUnit();
    }

});

//  Trigger the conversion by pressing the Enter key
$(document).on("keypress", function(e) {

    if (e.key == "Enter") {

        convertTrigged();

    }

});

//  Trigger the conversion by clicking the button "convert"
$("#bconvert").on("click",function() { convertTrigged()});


//  Reset the value to zero when the button reset is trigger
$("#breset").on("click",function() {

    $("#from-input").val("0");
    $("#result").val("0");

});

/*

    Other function

*/

/** 
 * convert the from value to the "to" unit 
*/
function convertTrigged() {

    // store the value from entered
    var input = $("#from-input").val();

    // make sure is a legal input
    if (validateFromInput(input)){

        // call the "abstract" function 
        var result = module.convert(input,getFromUnit(),getToUnit());

        // for floating number, we dont want more than 5 decimals points 
        if(!Number.isInteger(result)){

            // TODO: convert to scientific anotation when number is too small or too big

            result = round(result,5);

        }
        
        $("#result").val(result);

    }

    updateDisplayUnit();

}

/** 
 *  initialise the value after loading the json file 
*/
function init() {

    // temparature and time unit are not seperate by imperial or metric
    if (pname == "temparature" || pname == "time") {
    
        setSelectionVal("#from-select","units");
        setSelectionVal("#to-select","units",true);
        // initialise the value
        $("#from-input").val("0");
        $("#result").val("0");

    } else {

        // set one type of values after the other
        setSelectionVal("#from-select","imperial");
        setSelectionVal("#from-select","metric");
        setSelectionVal("#to-select","metric");
        setSelectionVal("#to-select","imperial");
        // initialise the value
        $("#from-input").val("0");
        $("#result").val("0");

    } 

    setTimeout(function(){updateDisplayUnit()}, 100);

}

/** 
*
* Retreive option from the selection.json.
*
*   @param {String} selectbox   The select tag, either "from-select" or "to-select"
*   @param {String} utype       Unit type, either "imperial", "metric" or "units" (for temparature and time)  
*   @param {bool}   reverse     If or if not the option units array should be reverse
*
*/
function setSelectionVal(selectbox,utype,reverse=false) {

    // only time and temparature need to be reversed 
    // because the haven't two type of unit like imperial and metric.
    // if we dont, the initial units will be the same 

    if (pname == "time" || pname == "temparature") {
       
        if (!reverse) {

            data[utype].forEach(element => {

                $(selectbox).append(
        
                    $('<option>', {
                                        
                        text: element.name,
                        value:   element.unit,
                       
                    })
                );
            });

        } else {

            data[utype].reverse().forEach(element => {

                $(selectbox).append(
        
                    $('<option>', {
                                        
                        text: element.name,
                        value:   element.unit,
                       
                    })
                );   
            });
        }
 
    } else {

        data[utype].forEach(element => {
            
            $(selectbox).append(
    
                $('<option>', {
                                    
                    text: element.name,
                    value:   element.unit,
                   
        
                })
            );
        });
    }
         
}

/**
 * 
 *  Retreive the units of the "From" field
 * 
 *  @return {string}    the units of the "From" dropdown currently selected
 * 
 */
function getFromUnit() {

    return $("#from-select option:selected").val();

}

/**
 * 
 *  Retreive the value of the "from" input
 * 
 *  @return {string}    the value of the "from" input
 * 
 */
function getFromVal() {

    return $("#from-input").val();

}

/**
 * 
 *  Retreive the units of the "to" field
 * 
 *  @return {string}    the units of the "to" dropdown currently selected
 * 
 */
function getToUnit() { return $("#to-select option:selected").val(); }

/**
 * 
 *  Set the text for the name before the box and for the unit after the box with the
 *  value of the selected option of the two dropdown
 * 
 */
function updateDisplayUnit() {

    var from = $("#from-select option:selected").text();
    
    $("#from-name").text(from.split("(")[0]);
    $("#from-unit").text(from.split("(")[1].split(")")[0])
  
    var to = $("#to-select option:selected").text();

    $("#to-name").text(to.split("(")[0]);
    $("#to-unit").text(to.split("(")[1].split(")")[0]);

}

/**
 * 
 *  Retreive the name of the html page that this script is loaded
 *  
 *  @return {string}    the name of the html page with his extension, otherwise return null 
 *  
 */
function getCurrentPage() { 

    // store because if eg the current page is www.example.com/index.html but is loaded without /index.html
    // than this function doesn't work correctly
    var tmp = document.location.href.match(/[^\/]+$/);

    if (tmp == null) {

        return null

    }
    
    return tmp[0].split(".")[0] 

}

/**
 * 
 *  Check if the value is valid to be converted
 *  
 *  @param  {string}    input   the value to be validate   
 *  @return {boolean}   either or not the input is valid 
 *  
 */
function validateFromInput(input) {

    // . for floating
    if (/[^0-9\.]/g.test(input)) {


        $("#from-input").val("INVALID INPUT");
        $("#result").val("INVALID INPUT");

        return false;
    }

    return true; 

}

/**
 * 
 *  round a floating number
 *  
 *  @param  {Number}    value       the number to be round   
 *  @param  {Number}    decimals    the position at wich the round should be perform
 *  @return {boolean}   either or not the input is valid 
 *  
 */
function round(value, decimals) { return Number(Math.round(value+'e'+decimals)+'e-'+decimals); }

