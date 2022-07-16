function turnLeft90 () {
    clearEncoders()
    while (5 >= encoder1() || 5 >= encoder2()) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 128)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Backward, 128)
        rekabit.brakeMotor(MotorChannel.M1)
        rekabit.brakeMotor(MotorChannel.M2)
    }
}
// checks that state has changed before incrementing, function returns cm travelled.
function encoder1 () {
    if (stateSaved1 != pins.digitalReadPin(DigitalPin.P0)) {
        if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            counter1 += pins.digitalReadPin(DigitalPin.P0)
        }
        stateSaved1 = pins.digitalReadPin(DigitalPin.P0)
    }
    return counter1
}
function backward_for (mm: number) {
    clearEncoders()
    while (mm >= stepsToMilimeters(encoder1()) || mm >= stepsToMilimeters(encoder2())) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Backward, 128)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Backward, 128)
        rekabit.brakeMotor(MotorChannel.M1)
        rekabit.brakeMotor(MotorChannel.M2)
    }
}
function forward_for (mm: number) {
    clearEncoders()
    while (mm >= stepsToMilimeters(encoder1()) || mm >= stepsToMilimeters(encoder2())) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 128)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Forward, 128)
        rekabit.brakeMotor(MotorChannel.M1)
        rekabit.brakeMotor(MotorChannel.M2)
    }
}
function clearEncoders () {
    counter1 = 0
    counter2 = 0
    stateSaved1 = pins.digitalReadPin(DigitalPin.P0)
    stateSaved2 = pins.digitalReadPin(DigitalPin.P9)
}
function turnRight90 () {
    clearEncoders()
    while (5 >= encoder1() || 5 >= encoder2()) {
        rekabit.runMotor(MotorChannel.M1, MotorDirection.Backward, 128)
        rekabit.runMotor(MotorChannel.M2, MotorDirection.Forward, 128)
        rekabit.brakeMotor(MotorChannel.M1)
        rekabit.brakeMotor(MotorChannel.M2)
    }
}
function encoder2 () {
    if (stateSaved2 != pins.digitalReadPin(DigitalPin.P9)) {
        if (pins.digitalReadPin(DigitalPin.P9) == 1) {
            counter2 += pins.digitalReadPin(DigitalPin.P9)
        }
        stateSaved2 = pins.digitalReadPin(DigitalPin.P9)
    }
    return counter2
}
function stepsToMilimeters (count: number) {
    return 10.38 * count
}
let stateSaved2 = 0
let counter2 = 0
let counter1 = 0
let stateSaved1 = 0
clearEncoders()
basic.forever(function () {
    forward_for(200)
    basic.pause(1000)
    turnRight90()
    basic.pause(1000)
})
