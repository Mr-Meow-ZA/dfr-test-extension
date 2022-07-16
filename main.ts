function encoder1 () {
    if (stateSaved1 != pins.digitalReadPin(DigitalPin.P0)) {
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            counter1 += pins.digitalReadPin(DigitalPin.P0)
            serial.writeValue("x", counter1)
            serial.writeValue("cm", 1.038 * counter1)
        }
        stateSaved1 = pins.digitalReadPin(DigitalPin.P0)
    }
    return 1.038 * counter1
}
function forward_for (cm: number) {
    while (30 >= encoder1() || 30 >= encoder2()) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 128)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Forward, 128)
        rekabit.brakeMotor(MotorChannel.M1)
        rekabit.brakeMotor(MotorChannel.M2)
    }
}
function encoder2 () {
    if (stateSaved2 != pins.digitalReadPin(DigitalPin.P9)) {
        if (pins.digitalReadPin(DigitalPin.P9) == 1) {
            counter2 += pins.digitalReadPin(DigitalPin.P9)
            serial.writeValue("x", counter2)
            serial.writeValue("cm", 1.038 * counter2)
        }
        stateSaved2 = pins.digitalReadPin(DigitalPin.P9)
    }
    return 1.038 * counter2
}
function backward_for (cm: number) {
    while (30 >= encoder1() || 30 >= encoder2()) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Backward, 128)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Backward, 128)
        rekabit.brakeMotor(MotorChannel.M1)
        rekabit.brakeMotor(MotorChannel.M2)
    }
}
let stateSaved2 = 0
let stateSaved1 = 0
let counter2 = 0
let counter1 = 0
counter1 = 0
counter2 = 0
stateSaved1 = pins.digitalReadPin(DigitalPin.P0)
stateSaved2 = pins.digitalReadPin(DigitalPin.P9)
basic.forever(function () {
    forward_for(20)
    backward_for(20)
})
