"use strict";
let score = 0;            // score holds the score
let scoreElement;         // h2 element that displayes the score and guesses made
let chestOne, chestTwo, chestThree; // Divs that contains imgs of my chests
let imgTag;            // img-URL of the photo from Pexels
let imagesObject;         // "list" of images from Pexels
/**
* @desc Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
  getImageFromPexels();
}

function initGameUI(){  
  // Call functions that creates the Game UI
  initChests();
  initScoreBoard();
  initChestEventListeners();
  initRefreshButton();
}
/**
 * @desc creates 3 divs with images of chests and places them in the DOM
 */
function initChests(){  
  chestOne = document.createElement('div');
  chestTwo = document.createElement('div');
  chestThree = document.createElement('div');

  chestOne.setAttribute('id', 'chest-one');
  chestTwo.setAttribute('id', 'chest-two');
  chestThree.setAttribute('id', 'chest-three');
  chestTwo.style.marginLeft = '35px';
  chestThree.style.marginLeft = '35px';
  chestOne.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chestTwo.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chestThree.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'

  document.getElementById('chests').appendChild(chestOne);
  document.getElementById('chests').appendChild(chestTwo);
  document.getElementById('chests').appendChild(chestThree);
}
/**
 * @desc creates a scoreboard and places is over the "Try again!"-button in the DOM
 */
function initScoreBoard(){
  scoreElement = document.createElement('h2');
  scoreElement.setAttribute('id', 'myScore')
  scoreElement.setAttribute('style', 'color: white; text-align: center')
  scoreElement.innerText = 'Your score: ' + score;
  document.getElementById('refresh-button').before(scoreElement)
}
/**
 * @desc adds a eventlistener on the "Try again!"-button
 */
function initRefreshButton(){
  let refreshButton = document.getElementById('refresh-button');
  refreshButton.addEventListener('click', refresh);
}
/**
 * @desc adds eventlisteners on the divs / chests
 */
function initChestEventListeners(){
  chestOne.addEventListener('click', chestClicked);
  chestTwo.addEventListener('click', chestClicked);
  chestThree.addEventListener('click', chestClicked);
}
/**
 * @desc Gets a random number between 1-3, if random number is 1 it opens the treasure chest and add 5points to score, if 2-3 it opens a empty chest
 * @param {*} e takes the event ('click') that is used to pick the chest that was clicked
 */
function chestClicked(e){
  var targetChest = e.target.parentElement;
  var randomNumber = Math.floor(Math.random() * 3) + 1;

  if(randomNumber === 1){
    targetChest.innerHTML = imgTag;
    score += 5;
    scoreElement.innerText = 'Your score: ' + score;
  }else{
    targetChest.innerHTML = '<img src="images/chest-open.png" alt="empty-chest">'
    scoreElement.innerText = 'Your score: ' + score;
  }
  removeChestEvents();
}
/**
 * @desc gets 15 pictures from Pexels with the seach word "treasure"
 */
function getImageFromPexels(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=treasure+query&curated?per_page=15&page=1', true)
  xhr.setRequestHeader('Authorization', '563492ad6f917000010000013da00f26bbf145ab9c3342bc9f17f819');
  xhr.onload = function(){
    if(this.status == 200){
      imagesObject = JSON.parse(this.responseText)
      getRandomImage();
    }
  }
  xhr.send();
}
/**
 * @desc get a random img of those 15 images from Pexels
 */
function getRandomImage(){
  var i = Math.floor(Math.random() * 14) + 0;
  imgTag = '<img src="'+ imagesObject.photos[i].src.small +'" alt="treasure-chest" width="300px" height="200">'
}
/**
 * @desc adds eventlisteners to the chests "again" and "closes" the chests
 * gets a new random picture from Pexels
 */
function refresh(){
  initChestEventListeners();
  chestOne.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chestTwo.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  chestThree.innerHTML = '<img src="images/chest-closed.png" alt="closed-chest">'
  getRandomImage();
}
/**
 * @desc removes eventlisteners from the chests - after guess is made
 */
function removeChestEvents(){
  chestOne.removeEventListener('click', chestClicked);
  chestTwo.removeEventListener('click', chestClicked);
  chestThree.removeEventListener('click', chestClicked);
}

document.addEventListener("DOMContentLoaded", init);