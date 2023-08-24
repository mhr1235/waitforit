let counttx = 0, countup = true;

function timerr()
{
  if (countup)
  {
    ++counttx;
    if (counttx >= 100)
      countup = false;
  }
  else
  {
    --counttx;
    if (counttx <= 0)
      countup = true;
  }
  
  document.getElementById('counter').innerHTML = counttx + "%";
}

setInterval(timerr, 90);