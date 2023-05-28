
var data = {};
var pname = getCurrentPage();

var LENGTH_METRIC = [ "mm", "cm", "m", "km" ];
var LENGTH_IMPERIAL = [ "in", "ft", "yd", "mi"];

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

$("#from-select").on("change",function() { 


    var from = $("#from-select").val();

    switch (pname) {
       
        case "length": {

            if (LENGTH_IMPERIAL.includes(from)) {

                $("#from-select").attr("vtype","imperial");

            } else {

                $("#from-select").attr("vtype","metric");

            }

        }


    
    }

    updateDisplayUnit(); 


}); 

$("#to-select").on("change",function(){
    

    var to = $("#to-select").val();

    switch (pname) {
       
        case "length": {

            if (LENGTH_IMPERIAL.includes(to)) {

                $("#to-select").attr("vtype","imperial");

            } else {

                $("#to-select").attr("vtype","metric");

            }

        }


    
    }



    updateDisplayUnit();


});


$("#bconvert").on("click",function() {


    var input = $("#from-input").val();


    if (validateFromInput(input)) {

      

        switch(pname) {

            case "length": {

                var result = convertLength();
                
                console.log(result);
                
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

    var final = 0;

    if (getFromUnitFamily() == "imperial") {
        
        var inches = convertToInches(input,from);
        
        if (getToUnitFamily() == "metric") {

            console.log("cfsdssds");
            final = convertToMeter(inches);


        } else {

            var meters = inches * 0.0254;
            final = convertToImperial(meters,to);


        }

        





    } else {

        var meters = convertToMeter(input,from);



        if (getToUnitFamily() == "imperial") {

       
            final = convertToImperial(meters,to);

        } else {


            console.log(meters);
       
            switch(to) {

                case "mm": {

                    final = meters * 1000;
                    break;

                }

                case "cm": {

                    final = meters * 100;
                    break;
                }

                case "m": {

                    console.log("test");
                    final = meters;

                    console.log(final);
                    break;
                }

                case "km": {

                    final = meters * 0.001;
                    break;
                }



            }




        }




    }

    console.log(final)

    return final;


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
        
        case "in":
           
            fmt_input = value;
            break;

        
    }


    return fmt_input;


}

function convertToMeter(value,unit) {

    var fmt_input = 0;
    

    switch (unit) {

        case "mm": {

            fmt_input = value * 0.001;
            break;
        }

        case "cm": {

            fmt_input = value * 0.01;
            break;

        }

        case "km": {


            fmt_input = value * 1000;            
            break;

        }

        default: {

            fmt_input = value;
            break;
        }


    }

    return fmt_input

}

function convertToImperial(meters,units) {

    var val = 0;

    switch(units) {

        case "in": {

            val = meters * 39.3701;

            break;

        }

        case "ft": {

            val = meters * 3.28084;
            break;


        }

        case "yd": {

            val = meters *  1.09361;
            break;

        }

        case "mi": {


            val = meters * 0.000621371;                    
            break;
        }



    }

    return val 

}


function convertToMetric(inches,unit) {
    
    var val = 0;
    var meters = inches * 0.0254;

    switch (unit) {


        case "mm": {

            val = meters * 1000;
            break;

        }

        case "cm": {

            val = meters * 100;
            break;

        }
        
        case "km": {

            val = meters * 0.001;

        }

        default:

            val = meters;

            break;


    }


    return val 

}

