
var data = {};

var pname = getCurrentPage();
let module;

if ( pname != null && pname != "index") {

    var moduleFile = './' + pname + '.js';

    module = await import(moduleFile);

}





// when page load
$(function() {

    var d = new Date();
    $("#year").text(d.getFullYear());

    if (pname != null && pname != "index") {

        $.getJSON("../json/section.json",function(section) {
            var d = new Date();
            data = section[pname];
            init();
        });
            

    }


});

// when the invert button is trigger
$("#invert").on("click", function() {
      
                
    var from = $("#from-select").val();
    var to = $("#to-select").val();

        
    $("#from-select").val(to); 
    $("#to-select").val(from);           

    setTimeout(function(){updateDisplayUnit()},20)

});

$("#from-select").on("change",function() { 


    var from = $("#from-select").val();
    
    if (pname != "time" && pname != "temparature") {

        if (module.IMPERIAL.includes(from)) {

            $("#from-select").attr("vtype","imperial");
    
        } else {
    
            $("#from-select").attr("vtype","metric");
    
        }
    


    } 

    if (getFromVal() != "0") {

        convertTrigged();

    } else {

        updateDisplayUnit(); 

    }



}); 

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


$(document).on("keypress", function(e) {


    if (e.key == "Enter") {

        convertTrigged();

    }


});


$("#bconvert").on("click",function() { convertTrigged()});

$("#breset").on("click",function() {



    $("#from-input").val("0");
    $("#result").val("0");




});



function convertTrigged() {

    var input = $("#from-input").val();

    if (validateFromInput(input)){

        var result = module.convert(input,getFromUnit(),getToUnit());

        if(!Number.isInteger(result)){

            // TODO: convert to scientific anotation when number is too small or too big

            result = round(result,5);


        }
        
        $("#result").val(result);

    }

    updateDisplayUnit();


}


function init() {

    

    if (pname == "temparature" || pname == "time") {
    
        setSelectionVal("#from-select","units");
        setSelectionVal("#to-select","units",true);

        $("#from-input").val("0");
        $("#result").val("0");

    } else {




        setSelectionVal("#from-select","imperial");
        setSelectionVal("#from-select","metric");

        setSelectionVal("#to-select","metric");
        setSelectionVal("#to-select","imperial");


        $("#from-input").val("0");
        $("#result").val("0");

    } 

    setTimeout(function(){updateDisplayUnit()}, 100);

}




function setSelectionVal(selectbox,utype,invert=false) {



    if (pname == "time" || pname == "temparature") {
       
        if (!invert) {

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

function getFromUnit() {

    return $("#from-select option:selected").val();

}

function getFromVal() {

    return $("#from-input").val();

}

function getToUnit() {

    return $("#to-select option:selected").val();

}

function getFromUnitFamily() {

    return $("#from-select").attr("vtype");

}

function getToUnitFamily() {

    return $("#to-select").attr("vtype");

}



function updateDisplayUnit() {


    var from = $("#from-select option:selected").text();
    

    $("#from-name").text(from.split("(")[0]);

    $("#from-unit").text(from.split("(")[1].split(")")[0])

    
    var to = $("#to-select option:selected").text();



    $("#to-name").text(to.split("(")[0]);
    $("#to-unit").text(to.split("(")[1].split(")")[0]);



}

function getCurrentPage() { 


    var tmp = document.location.href.match(/[^\/]+$/);

    if (tmp == null) {

        return null

    }
    
    return tmp[0].split(".")[0] 



}

function validateFromInput(input) {


    if (/[^0-9\.]/g.test(input)) {


        $("#from-input").val("INVALID INPUT");
        $("#result").val("INVALID INPUT");

        return false;
    }

    return true; 

}


function round(value, decimals) { return Number(Math.round(value+'e'+decimals)+'e-'+decimals); }

