

export function convert(input,iunit,runit) {

    var result = 0;

    if (input == "0" || input == ".") {

        return result;

    } 


    if (IMPERIAL.includes(iunit) && (METRIC.includes(runit))) {
        
     

    } else if (IMPERIAL.includes(iunit) && IMPERIAL.includes(runit)) {

        
    
    } else if (METRIC.includes(iunit) && IMPERIAL.includes(runit)) {

    
    } else if (METRIC.includes(iunit) && METRIC.includes(runit)) {

     

    } else {
        // TODO: handling error
        return 0;
    }


    return result;



}