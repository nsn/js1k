field = document.createElement("textarea");
field.value = "teststring";
submit = document.createElement("input");
submit.type = "button";
submit.value = "hassle!";
submit.onclick = compress;
document.body.appendChild(field);
document.body.appendChild(submit);

function compress() {
    alphabet = new Array();
    inputString = field.value;
    // find frequencies
    for (counter=0;counter<inputString.length;counter++) {
        currentChar = inputString.charAt(counter);
        if (alphabet[currentChar])
            alphabet[currentChar]++;
        else
            alphabet[currentChar] = 1;
    }
//s='asda 0 asas';
//document.write(s+" "+s.length);
}

function log(msg) {
console.log(msg);
}
//http://people.cis.ksu.edu/~rhowell/viewer/huffman-src.zip
