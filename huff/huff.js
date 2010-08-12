field = document.createElement("textarea");
field.value = "teststring";
submit = document.createElement("input");
submit.type = "button";
submit.value = "hassle!";
submit.onclick = compress;
document.body.appendChild(field);
document.body.appendChild(submit);

function node(sym) {
    this.symbol = sym;
    this.freq = 1;
    this.inc = function () {
        this.freq++;
    }
}
function sortNode(s1, s2) {
    log("cmp " + s1);
    node1 = alphabet[s1];
    node2 = alphabet[s2];
    return node1.freq - node2.freq;
}

function compress() {
    alphabet = new Array();
    inputString = field.value;
    // find frequencies
    for (counter=0;counter<inputString.length;counter++) {
        currentChar = inputString.charAt(counter);
        if (alphabet[currentChar])
            alphabet[currentChar].inc();
        else
            alphabet[currentChar] = new node(currentChar);
    }
    alphabet.sort(sortNode);

    for (b in alphabet) {
        s = alphabet[b];
        log(b + " : " + s.freq);
    }
//s='asda 0 asas';
//document.write(s+" "+s.length);
}

function log(msg) {
console.log(msg);
}
//http://people.cis.ksu.edu/~rhowell/viewer/huffman-src.zip
