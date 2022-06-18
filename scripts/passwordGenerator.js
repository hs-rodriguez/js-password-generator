"use strict";

// Defining the characters lists
const numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const lowercaseList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercaseList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const symbolsList = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
const similarList = [1, 'i', 'I', 'j', 'l', '!', '|', 'o', 'O', 0];

function generatePassword() {
    const passwordLength = document.getElementById("passwordLength").value;

    // Check password length
    if (isNaN(passwordLength) || passwordLength < 4 || passwordLength > 2048) {
        document.getElementById("lengthTip").textContent = "Invalid length";
        return;
    }
    else if (passwordLength <= 8) {
        document.getElementById("lengthTip").textContent = "Weak";
    }
    else {
        document.getElementById("lengthTip").textContent = "Strong";
    }
    
    let seedArray = [];

    // Add each selected list to the password seed
    seedArray = generateSeedArray(seedArray);
    console.log(seedArray);

    // If no character sets are selected, exit 
    if (seedArray == "") {
        return;
    }

    let generatedPassword = "", index = 0;

    // Select random items from seed and create password with the specified length
    for (let i = 1; i <= passwordLength; i++) {
        index = Math.floor(Math.random() * seedArray.length);
        generatedPassword += seedArray[index];
    }

    document.getElementById("generatedPassword").value = generatedPassword;
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

function clipboardCopy() {
    navigator.clipboard.writeText(document.getElementById("generatedPassword").value);
}
