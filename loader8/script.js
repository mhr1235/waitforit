let ImagesF = [
  './background_1.jpg',
  './background_2.jpg',
  './background_3.jpg'
]





function randomB(){

  let div = document.querySelector('div');
  let a = Math.floor(Math.random() * 3)
  div.style.backgroundImage = 'url("' + ImagesF[a] + '")';


}

setInterval(randomB,3500);


/*function autoImgB(arr, i) {
  if (i < arr.length) {
    div.style.backgroundImage = 'url("' + arr[i] + '")';
    setTimeout(autoImgB, 6000, arr, ++i);
    if(i == 2){

      i =0;

    }
  }
}

autoImgB(ImagesF, 0);*/