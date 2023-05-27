
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

    

    switch(getCurrentPage()) {

        case "length": {

            $("#from-select")
                .find("option")
                .remove()
                .end();

            $("#to-select")
                .find("option")
                .remove()
                .end();

            if ($("#from-select").attr("vtype") == "imperial") {


                setSelectionVal("#from-select","metric","length");
                setSelectionVal("#to-select","imperial","length");
                

                $("#from-select").attr("vtype","metric");
                $("#to-select").attr("vtype","imperial");

            } else {

                setSelectionVal("#from-select","imperial","length");
                setSelectionVal("#to-select","metric","length");

                $("#from-select").attr("vtype","imperial");
                $("#to-select").attr("vtype","metric");

            }


            break; 


        }


        default:

            break;

    }

    setTimeout(function(){updateDisplayUnit()},20)



});

$("#from-select").on("change",function() { updateDisplayUnit(); }); 

$("#to-select").on("change",function(){ updateDisplayUnit();});

$("#from-input").on("change",function() {

    


})

$("#bconvert").on("click",function() {


    var input = $("#from-input").val();


    validateFromInput(input);

    console.log($("#from-input").val());

    $("#result").val(input);



});



function init() {


    if (pname != "currency") {


        setSelectionVal("#from-select","imperial");
        setSelectionVal("#to-select","metric");



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

function updateDisplayUnit() {


    var from = $("#from-select option:selected").text();
    

    $("#from-name").text(from.split("(")[0]);

    $("#from-unit").text(from.split("(")[1].split(")")[0])

    
    var to = $("#to-select option:selected").text();



    $("#to-name").text(to.split("(")[0]);
    $("#to-unit").text(getFromUnit());



}

function getCurrentPage() {

    return document.location.href.match(/[^\/]+$/)[0].split(".")[0]

}

function validateFromInput(input) {

    switch(pname) {

        case "length" : {


            if (/[a-z]/i.test(input)) {

                var split = input.match(/[^f]*/);

                if (split[0].length == split["input"].length) {

                    return false;

                }

                var feet = split[0];

                if (/[a-z]/i.test(feet)) {

                    console.log("feet value contain letter!");
                    return false;

                }


                var inch = split["input"].replace(feet + "f","");

                if (/[a-z]/i.test(inch)) {

                    console.log("inch value contain letter!");
                    return false;
                    
                }


                





                

            }
            



        }



    }


}

