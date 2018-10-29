$('#timepicker1').timepicker({
    'step': 15 ,
    'scrollDefault': 'now',
    'minTime':new Date(),
    'maxTime':'12pm',
    'timeFormat':'G:i'
});

$('#timepicker1').timepicker('setTime', new Date());

console.log("Welcome");