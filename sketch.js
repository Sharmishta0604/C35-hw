//Create variables here
var dog1,dog2;
var food,foodStock;
var database;
var dog;
var x;
var feedbutton,getbutton;
var feedtime,lastfed;
var foodObj;
function preload()
{
  //load images here
  dog1=loadImage("dogImg.png");
  dog2=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 500);
  dog=createSprite(650,250);
  dog.addImage(dog1);
  dog.scale=0.25;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food(10,10,200,200);
  feedbutton=createButton("Feed the dog");
  feedbutton.position(800,70);
  feedbutton.mousePressed(feedDog);

  getbutton=createButton("Get more food");
  getbutton.position(900,70);
  getbutton.mousePressed(addFood);
}


function draw() {  
background(46,139,87)
drawSprites();
  feedtime=database.ref('Feedtime')
  feedtime.on("value",function(data){
    lastfed=data.val();
  })

foodObj.display();

fill("white");
textSize(19);
//text("food="+food,200,400);
if(lastfed>=12){
  text("Last fed: "+(lastfed-12)+" PM",380,480);
}else if(lastfed===0){
  text("Last fed: 12 AM",380,480);
}else{
  text("Last fed: "+lastfed+" AM",380,480);

}
  //add styles here

}
function feedDog(){
  dog.addImage(dog2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
Food:foodObj.getFoodStock(),
Feedtime:hour()
  })
}
  function addFood(){
    food++;
    foodObj.updateFoodStock(foodObj.getFoodStock()+1)
    database.ref('/').update({
      Food:food
    })
  }
   //text("Good job!",250,250);
  

  

function readStock(data){
  food=data.val();
}

function writeStock(data){
  database.ref('/').update({
     Food:x 
  })
}
  





