// Defining the characters lists
const numbersList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowercaseList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercaseList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const symbolsList = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
const similarList = ['1', 'i', 'I', 'j', 'l', '!', '|', 'o', 'O', '0'];

function generatePassword() {
    const passwordLength = Number(document.getElementById("passwordLength").value);
    let minimumNumbers = Number(document.getElementById("minimumNumbers").value);
    let minimumSymbols = Number(document.getElementById("minimumSymbols").value);

    // Check password length
    if (isNaN(passwordLength) || passwordLength < 4 || passwordLength > 2048) {
        document.getElementById("lengthTip").innerHTML = "<span class=\"red\">Invalid length</span>";
        return;
    }
    else if (passwordLength <= 8) {
        document.getElementById("lengthTip").innerHTML = "<span class=\"orange\">Weak</span>";
    }
    else {
        document.getElementById("lengthTip").innerHTML = "<span class=\"green\">Strong</span>";
    }
    
    let seedArray = [];

    // Add each selected list to the password seed
    seedArray = generateSeedArray();

    // If no character sets are selected, exit 
    if (seedArray == "") {
        return;
    }

    let generatedPassword = "", index = 0;

    // Add the minimum numbers and symbols first
    if (document.getElementById("useNumbers").checked && minimumNumbers > 0 && minimumNumbers <= passwordLength) {
        for (let i = 1; i <= minimumNumbers; i++) {
            generatedPassword += numbersList[randomIndex(numbersList.length)];
        }
    } else 
        minimumNumbers = 0;
    if (document.getElementById("useSymbols").checked && minimumSymbols > 0 && minimumSymbols <= passwordLength) {
        for (let i = 1; i <= minimumSymbols; i++) {
            generatedPassword += symbolsList[randomIndex(symbolsList.length)];
        }
    } else
        minimumSymbols = 0;

    // Select random items from seed and create password with the specified length
    for (let i = minimumNumbers + minimumSymbols + 1; i <= passwordLength; i++) {
        index = randomIndex(seedArray.length);
        generatedPassword += seedArray[index];
    }

    generatedPassword = generatedPassword.shuffle();

    document.getElementById("generatedPassword").innerHTML = "";
    generatedPassword = generatedPassword.split("");
    generatedPassword.map(colorizeCharType);
    

}

function generateSeedArray() {
    let arr = [];
    if (document.getElementById("useNumbers").checked) {
        arr = arr.concat(numbersList);
    }
    if (document.getElementById("useLowercase").checked) {
        arr = arr.concat(lowercaseList);
    }
    if (document.getElementById("useUppercase").checked) {
        arr = arr.concat(uppercaseList);
    }
    if (document.getElementById("useSymbols").checked) {
        arr = arr.concat(symbolsList);
    }
    if (document.getElementById("disableSimilar").checked) {
        arr = arr.filter(function findSimilar (item){
            return !similarList.includes(item);
        });
    }
    return arr;
}

// Return a random integer from the interval [0 ; n)
function randomIndex(n) {
    return Math.floor(Math.random() * n);
}

// Fisher-Yates shuffle algorithm, modern version
String.prototype.shuffle = function () {
    let a = this.split("");
    const n = this.length;
    for (let i = n - 1; i > 0; i--) {
        let j = randomIndex(i+1);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.join("");
}

function colorizeCharType (item) {
    let a;
    if (numbersList.includes(item)){
        a = "<span class=\"red\">" + item + "</span>"
        document.getElementById("generatedPassword").innerHTML = document.getElementById("generatedPassword").innerHTML.concat(a);
    }
    else if (symbolsList.includes(item)){
        a = "<span class=\"blue\">" + item + "</span>"
        document.getElementById("generatedPassword").innerHTML = document.getElementById("generatedPassword").innerHTML.concat(a);
    }
    else {
        a = item;
        document.getElementById("generatedPassword").innerHTML = document.getElementById("generatedPassword").innerHTML.concat(a);
    }  
}

function clipboardCopy() {
    navigator.clipboard.writeText(document.getElementById("generatedPassword").innerText);
}
