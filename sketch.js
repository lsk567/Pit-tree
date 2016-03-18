var list = [];
var limit = 25;
var x = -145;

function Square(x1, y1, len, angle) {
   this.x = x1; //top left
   this.y = y1;
   this.x2 = x1 + len * cos(angle); //top right
   this.y2 = y1 + len * sin(angle);
   this.leng = len;
   this.angle = angle;
   this.x4 = this.x + this.leng * cos(PI / 2 + this.angle), //sin cos inversion ... really weird but works  bottom left
      this.y4 = this.y + this.leng * sin(PI / 2 + this.angle);
   this.x3 = this.x2 + this.leng * cos(PI / 2 + this.angle), // bottom right 
      this.y3 = this.y2 + this.leng * sin(PI / 2 + this.angle);


   this.drawSquare = function() {
      stroke(100, 0, 0, 100);
      fill(229, 0, 75, 70);
      quad(this.x, this.y, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);

      // fill(255, 255, 0);
      // ellipse(this.x3, this.y3, 20, 20);
   }

   this.VertexX = function() {
      var px = (this.leng / 2) * cos(this.angle - PI / 3) + this.x; //this.leng/2 => 30,60,90 triangle
      return px;
   }

   this.VertexY = function() {
      var py = (this.leng / 2) * sin(this.angle - PI / 3) - this.y; //this part is right
      return py;
   }

   this.NewX1 = function(x4) {
      var Newx1 = x4 + this.NewLen1() * sin(this.angle - PI / 3);
      return Newx1;
   }

   this.NewY1 = function(y4) {
      var Newy1 = y4 - this.NewLen1() * cos(this.angle - PI / 3);
      return Newy1;
   }

   this.NewLen1 = function() {
      // var newlen = dist(this.x, this.y, this.VertexX(), this.VertexY()); //very wrong approach!!!
      var newlen = this.leng / 2;
      return newlen;
   }

   this.NewLen2 = function() {
      var newlen2 = this.leng / (sqrt(1.35)); //why 1.35? I DONT KNOW. I thought it is root 2.
      return newlen2;
   }


   this.rX1 = function(x3) {
      var RightX1 = this.x + (this.NewLen1() + this.NewLen2()) * cos(this.angle - PI / 3);
      return RightX1;
   }

   this.rY1 = function(y3) {
      var RightY1 = this.y + (this.NewLen1() + this.NewLen2()) * sin(this.angle - PI / 3);
      return RightY1;
   }

   this.drawThings = function() {

      this.drawSquare();

      if (this.NewLen1() > limit && this.NewLen2() > limit) {
         list.push(new Square(this.NewX1(this.x), this.NewY1(this.y), this.NewLen1(), this.angle - PI / 3).drawThings());
         list.push(new Square(this.rX1(this.x), this.rY1(this.y), this.NewLen2(), this.angle + PI / 6).drawThings());
      }
   }
}

function control() {
   stroke(100, 0, 0);
   rectMode(CENTER);
   rect(0, -300, 300, 15);
   fill(229, 0, 75, 100);
   // rectMode(CORNER);
   rect(x, -300, 15, 15);
   if (mouseIsPressed && mouseX >= 155 && mouseX <= 445 && mouseY >= 0 && mouseY <= 300) {
      x = mouseX - 300;
      // println(x);
      limit = map(x, -145, 144, 25, 1);
   }
}

function setup() {
   createCanvas(600, 700);
}

function draw() {
   background(255);
   translate(300, 400);
   control();
   // println(frameCount%20 + " " + limit);

   if (keyIsPressed && key == 's') {
      list.push(new Square(-25, -25, 50, 0 * PI / 2).drawThings());
   } else {
      list.push(new Square(-25, -25, 50, 0 * PI / 2).drawThings());
      list.push(new Square(25, -25, 50, 1 * PI / 2).drawThings());
      list.push(new Square(25, 25, 50, 2 * PI / 2).drawThings());
      list.push(new Square(-25, 25, 50, 3 * PI / 2).drawThings());
   }
}