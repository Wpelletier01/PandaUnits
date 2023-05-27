




$(function() {


    switch(getCurrentPage()) {


        case "length": {

          
            setSelectionVal("imperial","metric","length"); 

         
          
        }



    }
    
    



});


$("#invert").click(function() {


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

            if ($("#from-select").attr("value") == "imperial") {


                setSelectionVal("metric","imperial","length");
                $("#from-select").attr("value","metric");
                $("#to-select").attr("value","imperial");

            } else {

                setSelectionVal("imperial","metric","length");
                $("#from-select").attr("value","imperial");
                $("#to-select").attr("value","metric");



            }


        }

    }
   

               




    
    


});

$("#from-select").change(function() {



    var sel = $("#from-select").val()

    $("#from-unit").text(sel.split("(")[0]);


}); 



function setSelectionVal(from,to,type) {


   

           

    $.getJSON("../json/section.json",function(section) {

        section[type][from].forEach(element => {
                    
            $("#from-select").append(
    
                $('<option>', {
                                
                    text: element.name,
                    id:   element.id
    
                })

    
            ).trigger('change');
    
    
        });
    


    });
         



    $.getJSON("../json/section.json",function(section) {

        section[type][to].forEach(element => {
                    
            $("#to-select").append(
    
                $('<option>', {
                                
                    text: element.name,
                    id:   element.id
    
                })

    
            );
    
    
        });
    


    });
         



            



    





}


function getCurrentPage() {

    return document.location.href.match(/[^\/]+$/)[0].split(".")[0]

}



