
// console.log(module)

exports.getDate= function(){
    var today=new Date();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }

    var day=today.toLocaleDateString("en-US",options)
    return day;
}

exports.getWeekDay=function(){
    var today=new Date();
    var options={
        weekday:"long",
    }

    var wday=today.toLocaleDateString("en-US",options)
    return wday;
} 


console.log(module.exports)