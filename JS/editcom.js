function editcomponent()
{
  const tables = document.getElementById('workresult');
  const tablerow=tables.getElementsByTagName('tr');

  for(let i=0;i<tablerow.length;i++)
  {
    tablerow[i].addEventListener('dblclick',()=>{
      
      //Check component name first
      var temps=rawdata.paths[pathposition].pathComp[Elementposition-1];
      if(temps.Component=="Rectangle Duct")
      {
        showrectduct("edit");
        putrectduct(temps.Width,temps.Height,temps.Length,temps.Thickness,temps.AirVolume);
      }
      else if(temps.Component=="Circular Duct")
      {
        showcirduct("edit");
        putcirduct(temps.Diameter,temps.Length,temps.Thickness,temps.AirVolume);
      }
    });
  }
}



//Below the Line code are used to put the old value into the input field


//for Rectangle
function putrectduct(rectwidth,rectheight,rectlen,rectthick,rectair){
    document.getElementById("rectductwidth").value=rectwidth;
    document.getElementById("rectductheight").value=rectheight;
    document.getElementById("rectductlength").value=rectlen;
    document.getElementById("rectductthick").value=rectthick;
    document.getElementById("rectductair").value=rectair;
}

function replacerectduct()
{
    var width=document.getElementById("rectductwidth").value;
    var height=document.getElementById("rectductheight").value;
    var length=document.getElementById("rectductlength").value;
    var linear=document.getElementById("rectductthick").value;
    var air=document.getElementById("rectductair").value;

    var temp={"Component":"Rectangle Duct","Width":width,"Height":height,"Length":length,"Thickness":linear,"AirVolume":air,"powValue":{"F63":45,"F125":46,"F250":47,"F500":48,"F1000":49,"F2000":50,"F4000":51}}
    rawdata.paths[pathposition].pathComp[Elementposition-1]=temp;
    displaytable();
    hideall();
}


//For Circular duct
function putcirduct(cirdia,cirlen,cirthick,cirtair){
  document.getElementById("cirductdia").value=cirdia;
  document.getElementById("cirductlength").value=cirlen;
  document.getElementById("cirductthick").value=cirthick;
  document.getElementById("cirductair").value=cirtair;
}

function replacecirduct()
{
    var diameter=document.getElementById("cirductdia").value;
    var length=document.getElementById("cirductlength").value;
    var thick=document.getElementById("cirductthick").value;
    var air=document.getElementById("cirductair").value;

    var temp={"Component":"Circular Duct","Diameter":diameter,"Length":length,"Thickness":thick,"AirVolume":air,"powValue":{"F63":45,"F125":46,"F250":47,"F500":48,"F1000":49,"F2000":50,"F4000":51}}
    rawdata.paths[pathposition].pathComp[Elementposition-1]=temp;
    displaytable();
    hideall();
}