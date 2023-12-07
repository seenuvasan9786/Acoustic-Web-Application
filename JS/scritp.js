
function showSpace()
{
  hideall();
  document.getElementById("Space").style.cssText="display:table";

}
function showPath()
{
  hideall();
  document.getElementById("Path").style.cssText="display:table";

}

function showrectduct(command)
{
  hideall();
  if(command=="edit")
  {
    document.getElementById("rectductadd").style.cssText="display:none";
    document.getElementById("rectductedit").style.cssText="display:block";
  }
  else{
    document.getElementById("rectductedit").style.cssText="display:none";
    document.getElementById("rectductadd").style.cssText="display:block";
  }
  document.getElementById("straightduct").style.cssText="display:block";
  document.getElementById("image").style.cssText="display:table;background-image:url('./Media/Fitting/1 rect.png')";

}
function showcirduct(command)
{
  hideall();
  if(command=="edit")
  {
    document.getElementById("cirductadd").style.cssText="display:none";
    document.getElementById("cirductedit").style.cssText="display:block";
  }
  else{
    document.getElementById("cirductedit").style.cssText="display:none";
    document.getElementById("cirductadd").style.cssText="display:block";
  }
  document.getElementById("cirduct").style.cssText="display:block";
  document.getElementById("image").style.cssText="display:table;background-image:url('./Media/Fitting/2 Circular duct.png')";
}





function hideall(){
  document.getElementById("straightduct").style.cssText="display:none";
  document.getElementById("image").style.cssText="display:none";

  document.getElementById("Space").style.cssText="display:none";
  document.getElementById("Path").style.cssText="display:none";
  document.getElementById("cirduct").style.cssText="display:none";
}



/******** */
function errorbox(errortext){
  if(errortext=="ok")
  {
    document.getElementsByClassName("errormsgbox")[0].style.cssText="display:none";
    return 1;
  }
  else if(errortext=="cancel")
  {
    document.getElementsByClassName("errormsgbox")[0].style.cssText="display:none";
    return 0;
  }
  else{
    document.getElementsByClassName("errormsgbox")[0].style.cssText="display:flex";
    document.getElementById("errortexts").innerText=errortext;
    return -1;
  }
  
}


function showactive()
{
  if(rawdata.paths.length>0)
  {
    document.getElementsByClassName(`tablebody ${rawdata.paths[pathposition].pathname}`)[0].getElementsByTagName('tr')[Elementposition].classList.add('selectrow');
  }
}

/***Function is used to find the selected index value */
function findindex(){
const tables = document.getElementById('workresult');
const tbodyElements = tables.querySelectorAll('tbody');
tbodyElements.forEach(tbody => {
  tbody.addEventListener('click', function(event) {
    const clickedRow = event.target.closest('tr');
    const tbodyId = tbody.className;
    const rowIndex = Array.from(tbody.children).indexOf(clickedRow);
    handleTbodyRowClick(tbodyId, rowIndex);
  });
});
function handleTbodyRowClick(tbodyId, rowIndex) {
  function clearselect(){
    for(let a=0;a<tables.getElementsByTagName('tbody').length;a++)
    {
      for(let b=0;b<tables.getElementsByTagName('tbody')[a].getElementsByTagName('tr').length;b++)
      {
        tables.getElementsByTagName('tbody')[a].getElementsByTagName('tr')[b].classList.remove('selectrow');
      }
    }
  }

  for(let k=0;k<rawdata.paths.length;k++)
  {
    if(rawdata.paths[k].pathname==(tbodyId.slice(10,tbodyId.length)))
    {
      pathposition=k;
      Elementposition=rowIndex;
      showactive();
      for(let i=0;i<document.getElementsByClassName(`${tbodyId}`)[0].getElementsByTagName('tr').length;i++)
      {
        document.getElementsByClassName(`${tbodyId}`)[0].getElementsByTagName('tr')[i].classList.remove('selectrow');
        if(i==rowIndex){
          clearselect();
          document.getElementsByClassName(`${tbodyId}`)[0].getElementsByTagName('tr')[i].classList.add('selectrow');
        }
      }
    }
  }
}
}
/****End of the function */



/*Below code is used to get the delete keybutton*/
function deletecomp(){
  if(pathposition>=0 && Elementposition>0)
  {
    warningbox(`Do you want Delete ${rawdata.paths[pathposition].pathComp[Elementposition-1].Component}`,false);
    if(warningflag()==true)//it is not waiting it open and close
    {
      rawdata.paths[pathposition].pathComp.splice(Elementposition-1,1);
      Elementposition--;
      displaytable();
    }
  }
  else if(pathposition>=0 && Elementposition==0)
  {
    warningbox(`Do you want Delete ${rawdata.paths[pathposition].pathname}`,false);//This section will be delete the Path
    if(warningbox()==true)
    {
      rawdata.paths.splice(pathposition,1);
      pathposition--;
      pathcount--;
      displaytable();
    }
  }
  else{
    console.log('else function');
  }
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 46 || event.key === 'Delete') {
      deletecomp();
  }
});