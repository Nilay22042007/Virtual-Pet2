//Create variables here
var dog
var happyDog
var dogImage,dogImage1
var database
var S 
var foodS 


function preload()
{

dogImage=	loadImage("images/dogImg.png")
dogImage1=loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogImage)
  dog .scale=0.15
  feed = createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood = createButton("addFood")
  addFood.position(800,95)
  addFood.mousePressed("addFoods")
}


function draw() {  
background(46,139,87)
foodObj.display()
fedTime = database.ref('feedTime')
feedTime.on("value",function(data){
  lastFed = data.val()

})


  drawSprites();
  fill ("yellow")
  stroke ("black")
  textSize(20)
  if(lastFed>=12){
    text ("lastFeed: "+lastFed%12+"pm",350,50)
  }
  else if(lastFed == 0){
    text ("lastFeed:12am",350,30)
  }
  else{
    text("lastFed:"+lastFed+"am",350,30)
  }}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock("foodS")


}
function feedDog(){
  dog.addImage(dogImage1)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}













