//Create variables here
var dog,sadDog,happyDog;
var foodObj;
var foods,foodStock;
var fedTime,lastFed,feed,addFood;

function preload()
{
	//load images here
  sadDog=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  
	createCanvas(1000, 400);

  foodObj=new Food();

  dog=createSprite(250,250);
  dog.addImage(sadDog);
  dog.scale=0.15;

  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
   background(46,139,87);

   foodObj.display();
    
   fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){
  lastFed=data.val();
   })
   fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
   text("Last Feed:"+ lastFed%12+"PM",350,30);  
   }
   else if(lastFed==0){
     text("Last Feed: 12AM",350,30);
   }
   else {
     text("Last Feed:"+ lastFed+"AM",350,30);
   }
   
  drawSprites();
  
}

//function to updated food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock 
function addFoods(){
foodS++;
  database.ref('/').update({
   Food:foodS 
  })
}


