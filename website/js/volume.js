


export const IMPERIAL = [ 
    "US gal", "US qt", "US pt", "US c", 
    "US tbsp", "US tsp", "fl oz", "UK qt",
    "UK pt", "UK c", "UK tbsp", "UK tsp",
    "ft3", "in3" ];

export const METRIC = [ "m3", "L", "ml" ]


export function convert(input,iunit,runit) {

    var result = 0;

    if (IMPERIAL.includes(iunit) && (METRIC.includes(runit))) {
        
        // normalized to in3 
        var cinches = convertImperialToCubeInches(input,iunit);
        result = convertCubicIncheToMetric(cinches,runit);

    } else if (IMPERIAL.includes(iunit) && IMPERIAL.includes(runit)) {

        // normalized to in3 
        var cinches = convertImperialToCubeInches(input,iunit);
        result = convertCubicIncheToImperial(cinches,runit);

    } else if (METRIC.includes(iunit) && IMPERIAL.includes(runit)) {

        var liters = convertMetricToL(input,iunit);
        result = convertLiterToImperial(liters,runit);
   
    } else if (METRIC.includes(iunit) && METRIC.includes(runit)) {

        var liters = convertMetricToL(input,iunit);
        result = convertLiterToMetric(liters,runit);

    } else {
        // TODO: handling error
        return -1;
    }


}


function convertImperialToCubeInches(value,unit) {

    var result = 0;

    switch (unit) {

        case "US gal": {
            result = value * 231;
            break;
        }
        case "US qt": {
            result = value * 57.75;
            break;
        }
        case "US pt": {
            result = value * 28.875;
            break;
        }
        case "US c": {
            result = value * 14.6457
            break;
        }
        case "US tbsp": {
            result = value * 0.902344;
            break;
        }
        case "US tsp": {
            result = value * 0.300781;
            break;
        }
        case "UK gal": {
            result = value * 277.419;
            break;
        }
        case "UK qt": {
            result = value * 69.3549;
            break;
        }
        case "UK pt": {
            result = value * 34.6774;
            break;
        }
        case "UK c": {
            result = value * 17.3387;
            break;
        }
        case "UK tbsp": {
            result = value * 1.08367;
            break;
        }
        case "UK tsp": {
            result = value * 0.361223;
            break;
        }
        case "ft3": {
            result = value * 1728;
            break;
        }
        case "in3": {
            result = value;
            break;
        }
        case "fl oz": {
            result = value * 1.80469;
            break;
        }

        default:
            break;


    }


    return result;
}


function convertCubicIncheToMetric(cinches,unit) {

    var result = 0;

    switch (unit) {

        case "m3": {
            result = cinches * 1.6387e-5; 
            break;
        }
        case "L": {
            result = cinches * 0.0163871;
            break;
        }        
        case "ml": {
            result = cinches * 16.3871;
            break;
        }

        default:
            break;

    }


    return result;

}

function convertMetricToL(value,unit) {

    var result = 0;

    switch(unit) {

        case "m3": {
            result = value * 1000;
            break;
        }
        case "L": {
            result = value;
            break;
        }
        case "ml": {
            result = value / 1000;
            break;
        }

        default:
            break;

    }

    return result;


}

function convertCubicIncheToImperial(cinches,unit) {

    var result = 0;

    switch (unit) {

        case "US gal": {
            result = cinches / 231;
            break;
        }
        case "US qt": {
            result = cinches / 57.75;
            break;
        }
        case "US pt": {
            result = cinches / 28.875;
            break;
        }
        case "US c": {
            result = cinches / 14.6457
            break;
        }
        case "US tbsp": {
            result = cinches * 1.10823;
            break;
        }
        case "US tsp": {
            result = cinches * 3.32468;
            break;
        }
        case "UK gal": {
            result = cinches / 277.419;
            break;
        }
        case "UK qt": {
            result = cinches / 69.3549;
            break;
        }
        case "UK pt": {
            result = cinches / 34.6774;
            break;
        }
        case "UK c": {
            result = cinches / 17.3387;
            break;
        }
        case "UK tbsp": {
            result = cinches / 1.08367;
            break;
        }
        case "UK tsp": {
            result = cinches / 2.76837;
            break;
        }
        case "ft3": {
            result = cinches / 1728;
            break;
        }
        case "in3": {
            result = cinches;
            break;
        }
        case "fl oz": {
            result = cinches / 1.80469;
            break;
        }

        default:
            break;


    }

    return result;
}


function convertLiterToImperial(liters,unit) {

    var result = 0;

    switch (unit) {

        case "US gal": {
            result = liters / 3.785;
            break;
        }
        case "US qt": {
            result = liters * 1.05669;
            break;
        }
        case "US pt": {
            result = liters * 2.11338;
            break;
        }
        case "US c": {
            result = liters * 4.16667;
            break;
        }
        case "US tbsp": {
            result = liters * 67.628;
            break;
        }
        case "US tsp": {
            result = liters * 202.884;
            break;
        }
        case "UK gal": {
            result = liters * 4.546;
            break;
        }
        case "UK qt": {
            result = liters / 1.136;
            break;
        }
        case "UK pt": {
            result = liters * 1.75975;
            break;
        }
        case "UK c": {
            result = liters * 3.51951;
            break;
        }
        case "UK tbsp": {
            result = liters * 56.3121;
            break;
        }
        case "UK tsp": {
            result = liters * 168.936;
            break;
        }
        case "ft3": {
            result = liters / 28.3168;
            break;
        }
        case "in3": {
            result = liters * 61.0237;
            break;
        }
        case "fl oz": {
            result = liters * 33.814;
            break;
        }
        default:
            break;

    }

    return result;

}

function convertLiterToMetric(liters,unit) {

    var result = 0;

    switch(unit) {

        case "m3": {
            result = value * 0.001;
            break;
        }
        case "L": {
            result = liters;
            break;
        }
        case "ml": {
            result = value * 1000;
            break;
        }

        default:
            break;

    }

    return result;



}