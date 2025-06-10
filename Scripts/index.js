//Common code--------------------------------------------------------------
function create_btn(btn_class, btn_text) {
    const new_btn = document.createElement("btn")
    new_btn.className = "btn " + btn_class
    new_btn.innerHTML = btn_text
    return new_btn
}

//Task1-----------------------------------------------------------------------------
const task1_btns = document.querySelector(".task1_btns")
const task1_text = document.querySelector(".task1_text")
const task1_btns_tmpl = [
    {btn_class: "size_15", text: "Size 15px"},
    {btn_class: "size_25", text: "Size 25px"},
    {btn_class: "size_35", text: "Size 35px"},
    {btn_class: "reset", text: "Reset"},
    {btn_class: "color_red", text: "Red"},
    {btn_class: "color_green", text: "Green"},
    {btn_class: "color_blue", text: "Blue"},
]
const task1_btns_handlers =
    {"btn size_15": () => task1_text.style.fontSize = "15px",
    "btn size_25": () => task1_text.style.fontSize = "25px",
    "btn size_35": () => task1_text.style.fontSize = "35px",
    "btn color_red": () => task1_text.style.color = "red",
    "btn color_green": () => task1_text.style.color = "green",
    "btn color_blue": () => task1_text.style.color = "blue",
    "btn reset": () => {task1_text.style.fontSize = "20px"; task1_text.style.color = "black"},
    }

for (let i = 0; i < task1_btns_tmpl.length; i++) {
    task1_btns.append(create_btn(task1_btns_tmpl[i].btn_class, task1_btns_tmpl[i].text))
}

task1_btns.onclick = (event) => {
    task1_btns_handlers[event.target.className]()
}

//Task2--------------------------------------------------------------------------------
const task2 = document.querySelector(".calc_input")
const btn_calc = create_btn("btn_calc", "Calculate")
const operations = {
    "+": (a, b) => {return a+b},
    "-": (a, b) => {return a-b},
    "*": (a, b) => {return a*b},
    "/": (a, b) => {return a/b},
}

task2.append(btn_calc)

btn_calc.onclick = () => {
    const operand1 = document.querySelector(".operand1")
    const operand2 = document.querySelector(".operand2")
    const operation = document.querySelector(".operation")
    const result = document.querySelector(".result")

    if(!operand1.value || !operand2.value) return

    result.innerHTML = "Result: " + operand1.value + " " + operation.options[operation.selectedIndex].text +
        " " + operand2.value + " = " +
        operations[operation.options[operation.selectedIndex].text](Number(operand1.value), Number(operand2.value))

    operand1.value = ""
    operand2.value = ""
    operation[0].selected = true
}

//Task3--------------------------------------------------------------------------------
const plndr = document.querySelector(".plndr")
const btn_check = create_btn("check_plndr", "Check")

plndr.append(btn_check)

function check_plndr(str) {
    if(str.length===1) return true

    for (let i = 0; i < str.length/2; i++) {
        if(str[i] !== str[str.length - 1 - i]) return false
    }
    return true
}

btn_check.onclick = () => {
    const check_result = document.querySelector(".check_result")
    const input = document.querySelector("#input_plndr")
    const task3_text = document.querySelector(".task3_text")
    let plndr_str

    if(!input.value) return;

    plndr_str = input.value
    task3_text.innerHTML = "Inputed text: " + input.value
    input.value = ""
    plndr_str = plndr_str.trim()
    check_plndr(plndr_str) ?
        (check_result.innerHTML = "Is a palyndrom", check_result.style.color = "darkgreen") :
        (check_result.innerHTML = "Is not a palyndrom", check_result.style.color = "red")
}

//Task4----------------------------------------------------------------------------
const size = document.querySelector(".size")
const color = document.querySelector(".color")
const control = document.querySelector(".control")
const btn_size = create_btn("btn_size", "Set")
const btn_color = create_btn("btn_color", "Set")
const btn_reset = create_btn("btn_reset", "Reset")
const current_size = document.querySelector(".current_size")
const current_color = document.querySelector(".current_color")
const text = document.querySelector(".task4_text")
const color_p = document.querySelector(".color_p")

size.insertBefore(btn_size, current_size)
color.insertBefore(btn_color, color_p)
control.append(btn_reset)


btn_size.onclick = () => {
    const size = document.querySelector("#input_size")

    if(!size.value || Number(size.value) < 1) {
        size.value = ""
        return
    }
    text.style.fontSize = Math.trunc(Number(size.value)) + "px"
    current_size.innerHTML = "Current size: " + Math.trunc(Number(size.value)) + "px"
    size.value = ""
}

btn_color.onclick = () => {
    const color = document.querySelector("#input_color")

    if(!color.value) return

    text.style.color = color.value
    current_color.style.color = color.value
    // let computedColor = window.getComputedStyle(current_color).color;
    // console.log(computedColor)
    // console.log(current_color.style.color)
    if(current_color.style.color === color.value)
        current_color.innerHTML = color.value
    color.value = ""
}

btn_reset.onclick = () => {
    current_color.innerHTML = "black"
    text.style.color = "black"
    current_size.innerHTML = "Current size: 20px"
    text.style.fontSize = "20px"
    current_color.style.color = "black"
}