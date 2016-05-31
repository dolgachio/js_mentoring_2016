var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {
    var greenLed = new five.Led("GPIO27");
    var redLed = new five.Led("GPIO22");

    greenLed.on();

    var sensor = new five.Sensor.Digital("GPIO17");

    sensor.on("change", function(value) {
        console.log("Moisture value: ",value);

        if(value === 1) {
            redLed.blink();
            greenLed.off();
        } else {
            redLed.stop();
            redLed.off();
            greenLed.on();
        }
    });
});
