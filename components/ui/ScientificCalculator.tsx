"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon } from "lucide-react"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [isDark, setIsDark] = useState(false)
  const [isRad, setIsRad] = useState(false)
  const [memory, setMemory] = useState(0)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [waitingForExponent, setWaitingForExponent] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const handleOperator = (operator: string) => {
    if (waitingForExponent && operator !== "^") {
      setWaitingForExponent(false)
      calculate()
    }
    setWaitingForOperand(true)
    setDisplay(display + operator)
  }

  const calculate = () => {
    try {
      let result = display.replace(/\^/g, "**") // Replace ^ with ** for JavaScript's exponentiation
      // eslint-disable-next-line no-eval
      result = eval(result)
      setDisplay(result.toString())
    } catch (error) {
      setDisplay("Error")
    }
    setWaitingForExponent(false)
  }

  const handleFunction = (func: string) => {
    const value = Number.parseFloat(display)
    let result = 0

    switch (func) {
      case "sin":
        result = isRad ? Math.sin(value) : Math.sin((value * Math.PI) / 180)
        break
      case "cos":
        result = isRad ? Math.cos(value) : Math.cos((value * Math.PI) / 180)
        break
      case "tan":
        result = isRad ? Math.tan(value) : Math.tan((value * Math.PI) / 180)
        break
      case "asin":
        result = isRad ? Math.asin(value) : (Math.asin(value) * 180) / Math.PI
        break
      case "acos":
        result = isRad ? Math.acos(value) : (Math.acos(value) * 180) / Math.PI
        break
      case "atan":
        result = isRad ? Math.atan(value) : (Math.atan(value) * 180) / Math.PI
        break
      case "log":
        result = Math.log10(value)
        break
      case "ln":
        result = Math.log(value)
        break
      case "sqrt":
        result = Math.sqrt(value)
        break
      case "cbrt":
        result = Math.cbrt(value)
        break
      case "square":
        result = Math.pow(value, 2)
        break
      case "cube":
        result = Math.pow(value, 3)
        break
      case "exp":
        result = Math.exp(value)
        break
      case "10x":
        result = Math.pow(10, value)
        break
      case "factorial":
        result = factorial(value)
        break
      case "inverse":
        result = 1 / value
        break
      case "percent":
        result = value / 100
        break
      case "power":
        setWaitingForExponent(true)
        setDisplay(display + "^")
        return
    }

    setDisplay(result.toString())
  }

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1
    return n * factorial(n - 1)
  }

  const handleMemory = (operation: string) => {
    const value = Number.parseFloat(display)
    switch (operation) {
      case "M+":
        setMemory(memory + value)
        break
      case "M-":
        setMemory(memory - value)
        break
      case "MR":
        setDisplay(memory.toString())
        break
      case "MC":
        setMemory(0)
        break
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setWaitingForOperand(false)
    setWaitingForExponent(false)
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <Card className="max-w-md mx-auto my-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scientific Calculator</CardTitle>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDark} onCheckedChange={setIsDark} />
            <Moon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="bg-primary p-4 rounded-lg">
              <p className="text-right text-3xl text-primary-foreground font-mono">{display}</p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("sin")}
              >
                sin
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("cos")}
              >
                cos
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("tan")}
              >
                tan
              </Button>
              <div className="col-span-2">
                <RadioGroup defaultValue="deg" className="flex space-x-2">
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="deg" id="deg" onClick={() => setIsRad(false)} />
                    <Label htmlFor="deg">Deg</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="rad" id="rad" onClick={() => setIsRad(true)} />
                    <Label htmlFor="rad">Rad</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("asin")}
              >
                sin⁻¹
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("acos")}
              >
                cos⁻¹
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("atan")}
              >
                tan⁻¹
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => setDisplay(Math.PI.toString())}
              >
                π
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => setDisplay(Math.E.toString())}
              >
                e
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("square")}
              >
                x²
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("cube")}
              >
                x³
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("exp")}
              >
                eˣ
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("10x")}
              >
                10ˣ
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("power")}
              >
                x^y
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("sqrt")}
              >
                √x
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("cbrt")}
              >
                ³√x
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("ln")}
              >
                ln
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("log")}
              >
                log
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("inverse")}
              >
                1/x
              </Button>

              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" variant="outline">
                (
              </Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" variant="outline">
                )
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("percent")}
              >
                %
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={() => handleFunction("factorial")}
              >
                n!
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="outline"
                onClick={clearDisplay}
              >
                AC
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("7")}
              >
                7
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("8")}
              >
                8
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("9")}
              >
                9
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleOperator("+")}
              >
                +
              </Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" variant="secondary">
                Back
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("4")}
              >
                4
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("5")}
              >
                5
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("6")}
              >
                6
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleOperator("-")}
              >
                -
              </Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" variant="secondary">
                Ans
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("1")}
              >
                1
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("2")}
              >
                2
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("3")}
              >
                3
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleOperator("*")}
              >
                ×
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleMemory("M+")}
              >
                M+
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => handleNumber("0")}
              >
                0
              </Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" onClick={handleDecimal}>
                .
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleMemory("MC")}
              >
                MC
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleOperator("/")}
              >
                /
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleMemory("M-")}
              >
                M-
              </Button>

              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleNumber("±")}
              >
                ±
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => Math.random()}
              >
                RND
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleFunction("exp")}
              >
                EXP
              </Button>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={calculate}
              >
                =
              </Button> 
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                variant="secondary"
                onClick={() => handleMemory("MR")}
              >
                MR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

