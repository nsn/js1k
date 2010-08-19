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

function T(s,f){this.f=f;this.s=s;}function N(l,r){T.call(this,l.s+r.s,l.f+r.f);this.l=l;this.r=r;this.c=function(t,p){l.c(t,p+'1');r.c(t,p+'0');};this.d=function(){c=v.charAt(0);v=v.substr(1);c=='1'?l.d():r.d();}}function C(s){T.call(this,s,1);this.c=function(t,p){t[this.s]=p;};this.d=function(){C+=this.s;}}function A(z,y){return y.f-z.f;}function B(){if(x==92||x==39)w+='\\';t=String.fromCharCode(x);w+=t;x=0;}function D(v){while(v.length%8!=0)v+="0";w='';x=0;i = 0; while (i<v.length) {x=x<<1;x=x|(v.charAt(i)=='1');if(++i%8==0){B();}}return w;}function E(a){while(a.length>1){a.sort(A);a.push(new N(a.pop(),a.pop()));}return a[0];}
function encode(inputString) {
    alphabet = new Array();
    // find frequencies
    for (i=0;i<inputString.length;i++) {
        currentChar = inputString.charAt(i);
        if (alphabet[currentChar])
            alphabet[currentChar].f++;
        else
            alphabet[currentChar] = new C(currentChar);
    }
    // build queue
    queue = new Array();
    for (sym in alphabet) {
	    queue.push(alphabet[sym]);
    }
    savedQueue = queue.slice(0);
    table = new Array();
    E(queue).c(table, '');
    outputString = '';
    for (i=0;i<inputString.length;i++) {
        outputString = outputString + table[inputString.charAt(i)];
    }
    //window.alert(outputString.length/8/inputString.length);
    return D(outputString);
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
    huffmanTree = E(freqTable);
    C = '';
    //while (bitString.length>0)
    while (C.length < clearlength)
        huffmanTree.decode();
    log(C);
}
function makeExecutable(binaryString, freqTable, clearlength) {
    executable = '';
    executable = executable + "c='" + binaryString + "';t=[";
    for (currentNode in freqTable) {
        currentSymbol = freqTable[currentNode].s;
        if (currentSymbol == '"' || currentSymbol == '\\')
            currentSymbol = '\\' + currentSymbol;
        executable = executable + '{"s":"' + currentSymbol + '","f":' + freqTable[currentNode].f + '},';
    }
    executable = executable + "];l=" + clearlength +";";
    return executable;
}

function log(msg) {
console.log(msg);
}
//http://people.cis.ksu.edu/~rhowell/viewer/huffman-src.zip
