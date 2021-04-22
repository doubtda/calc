let add, sub, mul, div;

async function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {return new WebAssembly.Instance(module) });
};
  
loadWebAssembly('cpp.wasm')
    .then(instance => {
        add = instance.exports._Z3addii;
        sub = instance.exports._Z3subii;
        mul = instance.exports._Z3mulii;
        div = instance.exports._Z6divideii;
  }); 

var firstNumber = 0, secondNumber = 0, operator = 0, equal = 0;

const returnFinalValue = (operator, a, b) => {
    if(operator == 1) {
        return add(a, b);
    }
    if(operator == 2) {
        return sub(a, b);
    }
    if(operator == 3) {
        return mul(a, b);
    }
    if(operator == 4) {
        if(b!=0) {
            return div(a,b);
        }
        return "Infinity";
    }
}

const actionChoose = (objectId) => {
    if(objectId.charAt(0) === 'b') {
        placeFirst(parseInt(objectId.charAt(1)));
    }
    else {
        if(objectId.charAt(0) == 'C') {
            displayText.value = 0;
            firstNumber = 0;
            operator = 0;
        }
        else 
            if(objectId == "equal") {
                if(operator) {
                    displayText.value = returnFinalValue(operator, secondNumber, firstNumber);
                    operator = 0;
                    equal = 1;
                }
                else {
                    displayText.value = 0;
                }
            }
            else {
                operator = returnOperatorValue(objectId);
                secondNumber = firstNumber; 
            }
    }
}

const isTrueEqual = (value) => {
    return (value == "equal")?1:0;
}

const returnOperatorValue = (value) => {
    displayText.value = 0;
    if(value == "subtractButton") {
        return 2;
    }
    else {
        if(value == "addButton") {
            return 1;
        }
        else {
            if(value == "multiplyButton") {
                return 3;
            }
            else {
                if(value == "divide") {
                    return 4;
                }
            }
        }
    }
}

const placeFirst = (value) => {
    if(equal) {
        displayText.value = value;
        firstNumber = displayText.value;
        equal = 0;
    }
    else {
        if(displayText.value.charAt(0) == '0') {
            displayText.value = value;
            firstNumber = displayText.value;
        }
        else {
            displayText.value = displayText.value + value;
            firstNumber = displayText.value;
        }
    }
}