




export function convert(input,iunit,runit) {

    var mins = convertTimeToMin(input,iunit);

    if (mins != -1){

        return convertMinToTime(mins,runit);

    }

    return mins 

}



function convertTimeToMin(value,unit) {


    var result = 0;

    switch (unit){

        case "ns": {
            result = value / 6e+10
            break;
        }
        case "μs": {
            result = value / 6e+7
            break;
        }
        case "ms": {
            result = value / 60000;
            break;
        }
        case "s": {
            result = value / 60;
            break;
        }
        case "min": {
            result = value;
            break;
        }
        case "hr": {
            result = value * 60
            break;
        }
        case "d": {
            result = value * 1440;
            break;
        }
        case "w": {
            result = value * 10080;
            break;
        }
        case "m": {
            result = value * 43800;
            break;
        }
        case "yr": {
            result = value * 525600;
            break;
        }

        default:
            return -1;


    }

    return result;

}


function convertMinToTime(mins,unit) {

    var result = 0;

    switch (unit){

        case "ns": {
            result = mins * 6e+10
            break;
        }
        case "μs": {
            result = mins * 6e+7
            break;
        }
        case "ms": {
            result = mins * 60000;
            break;
        }
        case "s": {
            result = mins * 60;
            break;
        }
        case "min": {
            result = mins;
            break;
        }
        case "hr": {
            result = mins / 60
            break;
        }
        case "d": {
            result = mins / 1440;
            break;
        }
        case "w": {
            result = mins / 10080;
            break;
        }
        case "m": {
            result = mins / 43800;
            break;
        }
        case "yr": {
            result = mins / 525600;
            break;
        }

        default:
            return -1;


    }

    return result;


}