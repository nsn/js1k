//global
w = 640;
h = 480;
mx = 0;
my = 0;
// canvas element
C = document.getElementById("c");
C.width = w;
C.height = h;
C.addEventListener("mousemove", function(e) {
    mx = e.clientX;
    my = e.clientY;
}, false);
M = Math;
R = M.random;
// context
c = C.getContext("2d");
// functions
function length(t) {
    return (M.sqrt(t.x*t.x+t.y*t.y));
}
function norm(n) {
    mul(n,1/length(n));
}
function mul(v,d) {
    v.x = v.x*d;
    v.y = v.y*d;
}
function sub(s1,s2) {
    return new vec(s1.x-s2.x,s1.y-s2.y);
}
function vec(x,y) {
    this.x = x;
    this.y = y;
}
function obj(p) {
    this.pos = p;
    this.dir = new vec(0,-1);
    this.bound = 8;
    this.con = false;
    this.scalef = new vec(1,1);
    this.color = "#fff";
    this.speed = 200;
    this.shift = function() {
        norm(this.dir);
        x = this.pos.x + this.dir.x*this.speed/fps;
        y = this.pos.y + this.dir.y*this.speed/fps;
        b = this.bound;
        this.pos.x = (this.con&&(x-b<0||x+b>w))?this.pos.x:x;
        this.pos.y = (this.con&&(y-b<0||y+b>h))?this.pos.y:y;
    }
}
function user(p) {
    obj.call(this, p);
    this.con = true;
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
function shuttle(p) {
    obj.call(this, p);
    this.color="red";
    this.speed = 140;
    this.unc = R()*.5;
    this.verts = va(new Array(
        0,-8,
        2,0,
        4,-4,
        8,-4,
        4,4,
        0,8
    ));
    this.upd = function() {
        this.dir = sub(player.pos,this.pos);
        norm(this.dir);
        this.dir.x += this.unc;
        this.dir.y += this.unc;
        this.shift();
    }
}
function shot() {
    obj.call(this, new vec(player.pos.x, player.pos.y));
    this.speed=300;
    this.color="#ff0";
    this.dir = sub(new vec(mx,my), player.pos);
    this.id = ++id;
    shots[id] = this;
    this.verts = va(new Array(
        0,-8,
        4,0,
        0,4
    ));
}
// helpers
function va(d) {
    l=d.length/2;
    rv = new Array(l);
    for (i=0;i<l;i++)
        rv[i]=new vec(d[i*2],d[i*2+1]);
    return rv;
}
function col(a,b) {
    return length(sub(a.pos,b.pos))<(a.bound+b.bound);
}
// drawing
function prep(c,o) {
    r = o.dir;
    c.transform(r.y,-r.x,r.x,r.y,o.pos.x,o.pos.y);
    c.scale(o.scalef.x, o.scalef.y);
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.shadowColor = o.color;
    c.shadowBlur = 1;
    c.lineWidth=1;
    c.strokeStyle=o.color;
}
function draw(c,g) {
    c.save();
    prep(c,g);
    c.beginPath();
    pv = g.verts;
    c.moveTo(pv[0].x, pv[0].y);

    l = pv.length;
    for (j=1;j<l;j++) {
        v = pv[j];
        c.lineTo(v.x, v.y);
    }
    for (j=l-1;j>0;j--) {
        v = pv[j-1];
        c.lineTo(-v.x, v.y);
    }

    c.closePath();
    c.stroke();

    c.restore();

}
// game loop
function loop() {
    startt = new Date().getTime();
    // clear
    c.fillRect(0,0,w,h);
    // update player
    d=player.dir;
    x = y = 0;
    y += keys[87]?-1:0;
    y += keys[83]?1:0;
    x += keys[65]?-1:0;
    x += keys[68]?1:0;
    if (x!=0||y!=0) {
        d.x=x;
        d.y=y;
    }
    player.shift();   
    // draw enemies
    for (i in enemies) {
        e = enemies[i];
        e.upd();
        if (col(e, player)) 
            return hit();
        else
            draw(c,e);
    }
    // draw player
    draw(c,player);
    // shots
    for (i in shots) {
        s = shots[i];
        s.shift();
        for (k in enemies) {
            e = enemies[k];
            if (col(s,e)) {
                delete enemies[k];
                delete shots[i];
                score++;
                break;
            }
        }
        draw(c,s);
    }
    // shots
    // draw hud
    hp = new user(new vec(12,12));
    hp.scalef = (new vec(.5,.5));
    hp.color = "#0f0";
    draw(c,hp);
    c.strokeStyle="#0f0";
    c.strokeText("x"+lives, 25, 13);
    c.strokeText(score, 50, 13);

    fps = 1000/(new Date().getTime()-startt+33);
    setTimeout(loop, 33);
}
function wp(k) {
    return k*w + (-1+k*2)*R()*wavev;
}
function wave() {
    if (waven++<=waves) {
        enemies.push(new shuttle(new vec(wp(waveo.x), wp(waveo.y))));
        setTimeout(wave,200);    
    } else {
        waven = 0;
        waveo.x = R()>.5?1:0;
        waveo.y = R()>.5?1:0;
        waves+=2;
        setTimeout(wave,3000);    
    }
}
function shoot() {
    new shot(); 
    setTimeout(shoot, 500);
}
function hit() {
    lives--;
    if (lives < 0) 
        return alert("Game Over! Score: " + score);
    
    init();
    loop();
}
function init() {
    // objects
    player = new user(new vec(300, 200));
    enemies = new Array();
    shots = new Array();
    keys = new Array();
}
function start() {
    lives = fps = 3;
    waves = waven = id = score = 0;
    waveo = new vec(0,0);
    wavev = 50;
    init();
    loop();
    wave();
}

// main

window.onkeydown = function(e) {
    keys[e.keyCode] = true;
}
window.onkeyup = function(e) {
    keys[e.keyCode] = false;
}

start();
shoot();

//http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
