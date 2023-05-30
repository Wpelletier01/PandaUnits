


export function convert(input,iunit,runit) {

    var celsius = convertTempToCelsius(input,iunit); 

    if (celsius != -1) {
        console.log(celsius);
        var result = convertCelsiusToTemp(celsius,runit);

        console.log(result);
        return convertCelsiusToTemp(celsius,runit);

    }

    return celsius;

}



function convertTempToCelsius(value,unit) {

    var result = 0;

    switch (unit) {

        case "C": {
            result = value;
            break;
        }
        case "F": {
            result = (value - 32) * (5/9);
            break;
        }
        case "K": {
            result = value - 273.15;
            break;
        }
        default:
            return -1;
        
    }

    return result;

}


function convertCelsiusToTemp(celsius,unit) {

    var result = 0;
    console.log(unit);
    switch (unit) {

        case "C": {
            result = celsius;
            break;
        }
        case "F": {
            console.log("monke");
            result = (celsius * 9/5) + 32;
            break;
        }
        case "K": {
            result = celsius + 273.15;
            break;
        }
        default:
            return -1;
        
    }

    return result;
}