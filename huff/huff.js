field = document.createElement("textarea");
submit = document.createElement("input");
submit.type = "button";
submit.value = "hassle!";
submit.onclick = function() {
encode(field.value);
};
document.body.appendChild(field);
document.body.appendChild(submit);


field.value = "name='world'; alert(\"hello \" + name);";
//field.value = "j'aime aller sur le bord de l'eau les jeudis ou les jours impairs";
document.write(encode(field.value));

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
}
function leaf(sym) {
    tree.call(this, sym, 1);
    this.collect = function(tab, path) {
        tab[this.symbol] = path;
    }
    this.inc = function () {
        this.freq++;
    }
}
function sortNode(node1, node2) {
    freqdiff = node2.freq - node1.freq;
    if (freqdiff != 0)
        return freqdiff;
    return node2.symbol.length-node1.symbol.length;
}
function encode(inputString) {
    window.alert(inputString.length);
    alphabet = new Array();
    // find frequencies
    for (counter=0;counter<inputString.length;counter++) {
        currentChar = inputString.charAt(counter);
        if (alphabet[currentChar])
            alphabet[currentChar].inc();
        else
            alphabet[currentChar] = new leaf(currentChar);
    }
    // build queue
    queue = new Array();
    for (sym in alphabet) {
	    queue.push(alphabet[sym]);
    }
    while (queue.length > 1) {
        queue.sort(sortNode);
        queue.push(new node(queue.pop(), queue.pop()));
    }
    table = new Array();
    queue[0].collect(table, ''); 
    outputString = '';
    for (counter=0;counter<inputString.length;counter++) {
        outputString = outputString + table[inputString.charAt(counter)];
    }
    window.alert(outputString.length/8/inputString.length);
    return outputString;
}

function log(msg) {
console.log(msg);
}
//http://people.cis.ksu.edu/~rhowell/viewer/huffman-src.zip
