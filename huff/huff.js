field = document.createElement("textarea");
submit = document.createElement("input");
submit.type = "button";
submit.value = "hassle!";
submit.onclick = function() {
    encode(field.value);
};
document.body.appendChild(field);
document.body.appendChild(submit);


field.value = "name='world'; alert(\"hello, \" + name);";
//field.value = "j'aime aller sur le bord de l'eau les jeudis ou les jours impairs";
str = encode(field.value);
log("|" + str + "|");
//src = decode(str, savedQueue, field.value.length);
script = makeExecutable(str, savedQueue, field.value.length);
log(script);
eval(script);


function tree(sym, freq) {
    this.freq = freq;
    this.symbol = sym;
}
function node(left, right) {
    tree.call(this, left.symbol+right.symbol, left.freq+right.freq);
    this.left = left;
    this.right = right;
    this.collect = function(tab, path) {
        left.collect(tab,path+'1');
        right.collect(tab,path+'0');
    }
    this.decode = function() {
        charAt = bitString.charAt(0);
        bitString = bitString.substr(1);
        charAt=='1'?left.decode():right.decode();
    }
}
function leaf(sym) {
    tree.call(this, sym, 1);
    this.collect = function(tab, path) {
        tab[this.symbol] = path;
    }
    this.decode = function() {
        cleartext = cleartext + this.symbol;
    }
}
function sortNode(node1, node2) {
    return node2.freq - node1.freq;
}
function appendByte() {
    //log("byte done " + currentByte);
    if (currentByte==92 || currentByte==39)
        binaryString = binaryString + '\\';

    binaryChar = String.fromCharCode(currentByte);
    binaryString = binaryString+binaryChar;
    currentByte = 0;
}
function convertToBinary(bitString) {
    while (bitString.length%8!=0)
        bitString = bitString + "0";
    log(bitString);
    binaryString = '';
    currentByte = 0;
    counter = 0;
    while (counter<bitString.length) {
        currentByte = currentByte << 1;
        currentByte = currentByte | (bitString.charAt(counter) == '1');
        if (++counter%8 == 0) {
            appendByte();
        }
    }
    //log(binaryString);
    return binaryString;
}
function buildTree(frequencyNodes) {
    while (frequencyNodes.length > 1) {
        frequencyNodes.sort(sortNode);
        frequencyNodes.push(new node(frequencyNodes.pop(), frequencyNodes.pop()));
    }
    return frequencyNodes[0];
}
function encode(inputString) {
    alphabet = new Array();
    // find frequencies
    for (counter=0;counter<inputString.length;counter++) {
        currentChar = inputString.charAt(counter);
        if (alphabet[currentChar])
            alphabet[currentChar].freq++;
        else
            alphabet[currentChar] = new leaf(currentChar);
    }
    // build queue
    queue = new Array();
    for (sym in alphabet) {
	    queue.push(alphabet[sym]);
    }
    savedQueue = queue.slice(0);
    table = new Array();
    buildTree(queue).collect(table, '');
    outputString = '';
    for (counter=0;counter<inputString.length;counter++) {
        outputString = outputString + table[inputString.charAt(counter)];
    }
    //window.alert(outputString.length/8/inputString.length);
    return convertToBinary(outputString);
}

function convertToString(binaryString) {
    bitString = '';
    for (counter=0;counter<binaryString.length;counter++) {
        binaryChar = binaryString.charCodeAt(counter);
        log("converting binary char: " + binaryChar);
        currentMask = 128;
        for (numBit=0;numBit<8;numBit++) {
            //log("mask " + currentMask + " char " + binaryChar);
            bitString = bitString + (binaryChar&currentMask?'1':'0'); 
            currentMask = currentMask >> 1;
        }
    }
    return bitString;
}
function decode(binaryString, freqTable, clearlength) {
    bitString = convertToString(binaryString);
    log(bitString);
    huffmanTree = buildTree(freqTable);
    cleartext = '';
    //while (bitString.length>0)
    while (cleartext.length < clearlength)
        huffmanTree.decode();
    log(cleartext);
}
function makeExecutable(binaryString, freqTable, clearlength) {
    executable = '';
    executable = executable + "c='" + binaryString + "';t=[";
    for (currentNode in freqTable) {
        currentSymbol = freqTable[currentNode].symbol;
        if (currentSymbol == '"' || currentSymbol == '\\')
            currentSymbol = '\\' + currentSymbol;
        executable = executable + '{"symbol":"' + currentSymbol + '","freq":' + freqTable[currentNode].freq + '},';
    }
    executable = executable + "];l=" + clearlength +";";
    return executable;
}

function log(msg) {
console.log(msg);
}
//http://people.cis.ksu.edu/~rhowell/viewer/huffman-src.zip
