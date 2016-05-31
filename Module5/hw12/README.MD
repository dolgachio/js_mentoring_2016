Application was tested on Raspberry PI B+, node v4.2.1

To device were connected 2 LED (green and red)
and moisture digital sensor with sensibility controller.

Sensor's outputs:
"1" - means low moisture level,
"0" - means high moisture level;

By default green LED is on.
When moisture level decrease to critical, "change" event triggers
on sensor object, green LED - off, red LED starts to blink.
Such behaviour was tested on different sensor sensibility.