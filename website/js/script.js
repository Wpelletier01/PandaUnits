
var data = {};
var pname = getCurrentPage();


// when page load
$(function() {


    $.getJSON("../json/section.json",function(section) {

        data = section[pname];
        init();
    });
        

});

// when the invert button is trigger
$("#invert").on("click", function() {


    if (getCurrentPage() != "currency") {

        
                
        var from = $("#from-select").val();
        var to = $("#to-select").val();

        
        $("#from-select").val(to); 
        $("#to-select").val(from);           



    }
    

    setTimeout(function(){updateDisplayUnit()},20)



});

$("#from-select").on("change",function() { updateDisplayUnit(); }); 

$("#to-select").on("change",function(){ updateDisplayUnit();});

$("#from-input").on("change",function() {

    


})

$("#bconvert").on("click",function() {


    var input = $("#from-input").val();


    if (validateFromInput(input)) {

      

        switch(pname) {

            case "length": {

                var result = convertLength();

                if (String(result).split(".")[1].length > 6) {


                    var i = String(result).split(".")[0];
                    var dec  = String(result).split(".")[1].substring(0,6);
                    result = Number(i + "." + dec);
                    

                }

                break;


            }



        }



    }


    $("#result").val(result);

    updateDisplayUnit();

});

$("#breset").on("click",function() {



    $("#from-input").val("0");
    $("#result").val("0");




});


function init() {


    if (pname != "currency") {


        setSelectionVal("#from-select","imperial");
        setSelectionVal("#from-select","metric");

        setSelectionVal("#to-select","metric");
        setSelectionVal("#to-select","imperial");


        $("#from-input").val("0");
        $("#result").val("0");

    }
    

    setTimeout(function(){updateDisplayUnit()}, 100);

}




function setSelectionVal(selectbox,utype) {


    data[utype].forEach(element => {
            
            

        $(selectbox).append(
    
            $('<option>', {
                                    
                text: element.name,
                value:   element.unit,
                   
        
            })
        );


    });
         
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
    $("#to-unit").text(getToUnit());



}

function getCurrentPage() {

    return document.location.href.match(/[^\/]+$/)[0].split(".")[0]

}

function validateFromInput(input) {


    if (/[a-zA-Z]/g.test(input)) {


        $("#from-input").val("INVALID INPUT");
        $("#result").val("INVALID INPUT");

        return false;
    }

    return true; 

}

function convertLength() {


    var from = getFromUnit();
    var to = getToUnit();
    var input = getFromVal();


    if (getFromUnitFamily() == "imperial") {

        var inches = convertToInches(input,from);0
        
        var meters = inches * 0.0254;

        var final = 0;

        switch (to) {


            case "mm": {

                final = meters * 1000;
                break;

            }

            case "cm": {

                final = meters * 100;
                break;

            }
            
            case "km": {

                final = meters * 0.001;

            }

            default:

                final = meters;

                break;


        }

        return final;





    }


}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function convertToInches(value,unit) {

    var fmt_input = 0;

    switch (unit) {
    
        case "ft": {
            fmt_input = value * 12;
            break;
            
        } 

        case "yd": {

            fmt_input = value * 36;
            break;
        }

        case "mi": {

            fmt_input = value * 63360;

            break;
        }
        
        default:

            fmt_input = Number(value);
            break;

        
    }


    return fmt_input;


}