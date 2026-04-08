let matrix = new Array(80);
let a=true
let g=true
function setup() {
  frameRate(20)
  
  for (let i = 0; i < matrix.length; i++)
  {
    matrix[i] = new Array (60);
  }
  //matrix[30][40]
  for(i=0; i<60; i++)
    for(j=0; j<80;j++)
      matrix[i][j]=0
  
  createCanvas(800, 600);
  
}

function draw(){
  for(i=0; i<60; i++)
    for(j=0; j<80;j++)
    {
      if(matrix[i][j]==2)
      {
        matrix[i][j]=1
      }
    }
  stroke(1)
  background(50);
  for(i=0;i<600;i+=10)
  {
    line(0,i,800,i)
  }
  for(i=0;i<800;i+=10)
  {
    line(i,0,i,600)
  }
  for(i=0; i<60; i++)
    for(j=0; j<80;j++)
      //text(int(matrix[i][j]), j*10+3, (i+1)*10-2);
  

  for(i=0; i<60; i++)
    for(j=0; j<80;j++)
    {
      if(matrix[i][j]==1)
      {  
        fill(255)
        noStroke()
        square(10*j,10*i,10)
        fill(0)
        stroke(1)
        if(g)
        {
          if(i!=59&&matrix[i+1][j]==0)
          {  
            matrix[i][j]=0
            matrix[i+1][j]=2
          }
          if(i==59||matrix[i+1][j]==1)
          {
            if(matrix[i][j+1]==0&&matrix[i+1][j+1]==0)
            {
              matrix[i][j]=0
              matrix[i+1][j+1]=2
            }
            if(matrix[i][j-1]==0&&matrix[i+1][j-1]==0)
            {
              matrix[i][j]=0
              matrix[i+1][j-1]=2
            }
          }
        }
        else
        {
          if(i!=0&&matrix[i-1][j]==0)
          {  
            matrix[i][j]=0
            matrix[i-1][j]=2
          }
        }
      }
    }

  
}
function mouseDragged(){
  matrix[Math.floor(mouseY/10)][Math.floor(mouseX/10)]=1;
  
}
function keyPressed() {
  if (keyCode === UP_ARROW)
  {
    g=false
  }
  if (keyCode === DOWN_ARROW)
  {
    g=true
  }
}