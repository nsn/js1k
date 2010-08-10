function vec(x,y) {
    this.x = x;
    this.y = y;
}
function va(d) {
    len=d.length/2;
    rv = new Array(len);
    for (i=0;i<len;i++) {
        rv[i]=new vec(d[i*2],d[i*2+1]);
    }
    return rv;
}
function obj(p,d) {
    this.pos = p;
    this.dir = d;
    this.scale = new vec(1,1);
    this.color = '#fff';

    this.prep = function(c) {
        c.translate(this.pos.x, this.pos.y);
        c.scale(this.scale, this.scale);
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowColor = 'yellow';
        c.shadowBlur = 2;
        c.lineWidth=1;
        c.strokeStyle=this.color;
    }
}
function poly(p,d) {
    obj.call(this, p,d);
    this.verts = new Array();

    this.draw = function(c) {
        this.prep(c);

        c.beginPath();
        c.moveTo(this.verts[0].x, this.verts[0].y);

        len = this.verts.length;
        for (i=1;i<len;i++) {
            v = this.verts[i];
            c.lineTo(v.x, v.y);
        }
        for (i=len-1;i>=0;i--) {
            v = this.verts[i];
            c.lineTo(-v.x, v.y);
        }

        c.closePath();
        c.stroke();
    }
}
//idea: make all polygons symmetrical -> saves half the vertices
function player(p,d) {
    poly.call(this, p,d);
    this.verts = va(new Array(
        4,-4,
        12,0,
        12,4,
        8,12,
        8,4,
        6,2,
        0,6
    ));
}

function shmup() {
    w = 640;
    h = 480;
    C = document.getElementById('c');
    C.width = w;
    C.height = h;
    c = C.getContext("2d");


    p = new player(new vec(100, 100), new vec(0,0));

    c.fillRect(0,0,w,h);

    p.draw(c);


}
//TODO: remove this and all references
function log(msg) {
    console.log(msg);
}
shmup();
//http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
