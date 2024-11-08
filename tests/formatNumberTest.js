import { formatNumber } from "../util/utility.js";

if(formatNumber(2000.5)==='20.01'){
    console.log("rounding -Test Passed");
}
else 
{console.log(formatNumber(2067.8));}