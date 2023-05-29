
export const METRIC = [ "mm", "cm", "m", "km" ];
export const IMPERIAL = [ "in", "ft", "yd", "mi"];


export function convert(input,iunit,runit) {

    var result = 0;

    if (input == "0" || input == ".") {

        return result;

    } 


   


    if (IMPERIAL.includes(iunit) && (METRIC.includes(runit))) {
        
        // normalized to inches
        var inches = convertImperialToInches(input,iunit);     
        result = convertInchesToMetric(inches,runit);

    } else if (IMPERIAL.includes(iunit) && IMPERIAL.includes(runit)) {

        
        // normalized to inches
        var inches = convertImperialToInches(input,iunit);
        result = convertInchesToImperial(inches,runit)

    } else if (METRIC.includes(iunit) && IMPERIAL.includes(runit)) {

        var mm = convertMetricToMm(input,iunit);
        result = convertInchesToImperial( mm / 25.4,runit);

    } else if (METRIC.includes(iunit) && METRIC.includes(runit)) {

        var mm = convertMetricToMm(input,iunit);
        result = convertMmToMetric(mm,runit);

    } else {
        // TODO: handling error
        return 0;
    }


    return result;

}




function convertInchesToMetric(inches,unit) {

    var result = 0; 
    var mm = inches * 25.4;

    switch (unit) {

        case "mm": {

            result = mm;
            break;

        }
        case "cm": {

            
            result = mm / 10;
            break;

        }

        case "m": {

            result = mm / 1000;
            break;

        }

        case "km": {

            result = mm / 1000000;
            break;

        }


        default: 

            break;
        


    }


    return result;


}


function convertInchesToImperial(inches,unit) {

    var result = 0;
    
    switch (unit) {

        case "in": {

            result = inches;

        }

        case "ft": {

            result = inches / 12;


        }

        case "yd": {

            result = inches / 36;

        }

        case "mi": {

            result = inches / 63360;


        }

        default: 

            break;
        

    }


    return result;

}


function convertImperialToInches(value,unit) {

    var inches = 0;
    // normalized to inches
    switch (unit) {

        case "in": {

            inches = value;
            break;

        }

        case "ft": {

            inches = value * 12;
            break;

        }

        case "yd": {

            inches = value * 36;
            break;

        }

        case "mi": {

            inches = value * 63360;
            break;

        }

        default:

            //TODO: handling error
            break;


    }


    return inches;



}


function convertMetricToMm(value,unit) {

    var result = 0;

    switch (unit) {


        case "mm" : {

            result = value;

            break;

        }

        case "cm": {

            result = value * 10;
            break;

        }

        case "m": {

            result = value * 1000;
            break;

        }

        case "km": {


            result = value * 1000000;
            break;

        }

        default: 

            break;


    }

    return result;

}

function convertMmToMetric(mm,unit) {

    var result = 0;



    switch (unit) {

        case "mm": {

            result = mm;
            break;


        }

        case "cm": {

            result = mm / 10;
            break;

        }

        case "m": {

            result = mm / 1000;

            break;

        }

        case "km": {

            result = mm / 1000000;

            break;
        }

        default: 

            break;


    }


    return result;

}



