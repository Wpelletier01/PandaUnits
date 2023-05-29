

export const  IMPERIAL = [ "oz", "lb", "st", "US t", "UK t" ];
export const  METRIC =  [ "μg", "mg", "g", "kg", "t" ];


export function convert(input,iunit,runit) {

    var result = 0;


    if (input == "0" || input == ".") {

        return result;

    } 


    if (IMPERIAL.includes(iunit) && (METRIC.includes(runit))) {

        var ounces = convertImperialToOunces(input,iunit);
        result = convertOuncesToMetric(ounces,runit);
     

    } else if (IMPERIAL.includes(iunit) && IMPERIAL.includes(runit)) {

        var ounces = convertImperialToOunces(input,iunit);
        result = convertOuncesToImperial(ounces,runit);
    
    } else if (METRIC.includes(iunit) && IMPERIAL.includes(runit)) {

        var grams = convertMetricToGram(input,iunit);
        result = convertGramToImperial(grams,runit); 
        
    
    } else if (METRIC.includes(iunit) && METRIC.includes(runit)) {

        var grams = convertMetricToGram(input,iunit);
        result = convertGramToMetric(grams);
     

    } else {
        // TODO: handling error
        return -1;
    }


    return result;



}



function convertImperialToOunces(value,unit) {


    var result = 0;

    switch (unit) {

        case "oz": {

            result = value;
            break;

        }

        case "lb": {

            result = value * 16;
            break;

        }

        case "st": {

            result = value * 226;
            break;

        }

        case "US t": {

            result = value * 32000;
            break;

        }

        case "UK t": {

            result = value * 35840;
            break;

        }

        default:

            break;


    }


    return result;


}


function convertOuncesToMetric(ounces,unit) {

    var result = 0;


    switch (unit) {


        case "μg": {

       
            result = ounces * 2.835e+7;
            break;
        }

        case "mg": {

            result = ounces * 28349.5;
            break;

        }

        case "g": {

            result = ounces * 28.3495;
            break;

        }

        case "kg": {

            result = ounces * 0.0283495;
        
            break;
        }
        
        case "t": {

            result = ounces * 2.835E-5;
            break;

        }

    
        default: 
            break;
    
    
    }

    return result;

}

function convertOuncesToImperial(ounces,unit) {

    var result = 0;


    switch (unit) {

        case "oz": {

            result = ounces;
            break;

        }

        case "lb": {

            result =  ounces / 16 ;
            break;

        }

        case "st": {

            result = ounces / 226;
            break;

        }

        case "US t": {

            result = ounces / 32000;
            break;

        }

        case "UK t": {

            result = ounces / 35840;
            break;

        }

        default:
            break;
            
    }

    return result;

}


function convertMetricToGram(value,unit) {

    var result = 0;

    switch (unit) {

        case "μg": {

            result = value / 1e-6;
            break;

        }

        case "mg": {

            result = value / 1000;
            break;

        }

        case "g": {

            result = value;
            break;
        }

        case "kg": {

            result = value * 1000; 
            break;
        }

        case "t": {

            result = value * 1e+6;
            break;

        }

        default:
            break;

    }

    return result;

}


function convertGramToImperial(grams,unit) {

    var result = 0;

    switch (unit) {

        case "oz": {

            result = grams / 28.3495;
            break;

        }

        case "lb": {

            result =  ounces / 453.592;
            break;

        }

        case "st": {

            result = ounces / 6350.29;
            break;

        }

        case "US t": {

            result = ounces / 907185;
            break;

        }

        case "UK t": {

            result = ounces / 1.016e+6;
            break;

        }

        default:
            break;
            
    }

    return result;


}

function convertGramToMetric(gram,unit) {

    var result = 0;

    switch (unit) {

        case "μg": {

            result = gram * 1e-6;
            break;

        }

        case "mg": {

            result = gram * 1000;
            break;

        }

        case "g": {

            result = gram;
            break;
        }

        case "kg": {

            result = gram / 1000; 
            break;
        }

        case "t": {

            result = gram / 1e+6;
            break;

        }

        default:
            break;

    }


    return result;

}