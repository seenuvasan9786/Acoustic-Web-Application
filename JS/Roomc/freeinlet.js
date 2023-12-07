let freeinletdata = { "PowPathcount": 0, "TotalSPL": [], "Freeinfinis": [0, 0, 0], "FloorSlab": [], "Free_Wall": [], "Free_ceiling": [] 
  ,"Basicinput":{ "Bottom_of_Duct":0,"Ceiling_To_Floor":0,"Dis_btw_DAU":0,"Difuser_Area":0,"Directivity":0,"Tranmission_Loss":0}
};

function freeinletyrn() {
  if (document.getElementsByName('freeinlet')[0].checked) {
    document.getElementById('freeinletinput').style.cssText = "display:table";
    return true;
  }
  else {
    document.getElementById('freeinletinput').style.cssText = "display:none";
    return false;
  }
}

function addpowrow(locid) {
  var tablebody = document.getElementById(locid);
  var newrow = tablebody.insertRow();
  newrow.innerHTML = `</tr>
    <tr>
    <td>Path 0${freeinletdata.PowPathcount + 1} :</td>
    <td>
      <select class="freeinlettext" id="powpathname${freeinletdata.PowPathcount + 1}">
        <option value=''>Select Path</option>
        <option value="Return">Return</option>
        <option value="Radiated">Radiation</option>
      </select>
    </td>
    <td>
      <input type="text" placeholder="Unit Name" class="freeinlettext" id="freeunitname${freeinletdata.PowPathcount + 1}">
    </td>
    <td><input type="number" class="freeinletfz" id="f63${freeinletdata.PowPathcount + 1}" placeholder="63Hz"></td>
    <td><input type="number" class="freeinletfz" id="f125${freeinletdata.PowPathcount + 1}" placeholder="125Hz"></td>
    <td><input type="number" class="freeinletfz" id="f250${freeinletdata.PowPathcount + 1}" placeholder="250Hz"></td>
    <td><input type="number" class="freeinletfz" id="f500${freeinletdata.PowPathcount + 1}" placeholder="500Hz"></td>
    <td><input type="number" class="freeinletfz" id="f1k${freeinletdata.PowPathcount + 1}" placeholder="1kHz"></td>
    <td><input type="number" class="freeinletfz" id="f2k${freeinletdata.PowPathcount + 1}" placeholder="2kHz"></td>
    <td><input type="number" class="freeinletfz" id="f4k${freeinletdata.PowPathcount + 1}" placeholder="4kHz"></td>
    </tr>`;
  freeinletdata.PowPathcount++;
}

function removerpathpow(locid) {
  if (freeinletdata.PowPathcount > 0) {
    var table = document.getElementById(locid);
    var rowcount = table.rows.length;
    table.deleteRow(rowcount - 1);
    freeinletdata.PowPathcount--;
  }
}


function getfreeindata() {
  freeinletdata.TotalSPL = [];
  var powvalue = [];
  for (let i = 0; i < freeinletdata.PowPathcount; i++) {
    var temp = [0, 0, 0, 0, 0, 0, 0, '', ''];
    temp[0] = parseFloat(document.getElementById(`f63${i + 1}`).value);
    temp[1] = parseFloat(document.getElementById(`f125${i + 1}`).value);
    temp[2] = parseFloat(document.getElementById(`f250${i + 1}`).value);
    temp[3] = parseFloat(document.getElementById(`f500${i + 1}`).value);
    temp[4] = parseFloat(document.getElementById(`f1k${i + 1}`).value);
    temp[5] = parseFloat(document.getElementById(`f2k${i + 1}`).value);
    temp[6] = parseFloat(document.getElementById(`f4k${i + 1}`).value);
    temp[7] = document.getElementById(`powpathname${i + 1}`).value;
    temp[8] = document.getElementById(`freeunitname${i + 1}`).value;
    powvalue.push(temp);
  }
  freeinletdata.TotalSPL.push(powvalue);
  //Basic Inputs

  freeinletdata.Basicinput.Bottom_of_Duct=parseFloat(document.getElementById('BOD').value);
  freeinletdata.Basicinput.Ceiling_To_Floor=parseFloat(document.getElementById('CTF').value);
  freeinletdata.Basicinput.Difuser_Area=parseFloat(document.getElementById('darea').value);
  freeinletdata.Basicinput.Directivity=parseFloat(document.getElementById('freedirect').value);
  freeinletdata.Basicinput.Dis_btw_DAU=parseFloat(document.getElementById('DBWDAU').value);
  freeinletdata.Basicinput.Tranmission_Loss=parseFloat(document.getElementById('fitl').value);
  getdynainput();
}

function dbaddition(a) {
  var tempre = [0, 0, 0, 0, 0, 0, 0];

  var temp = [0, 0, 0, 0, 0, 0, 0];
  var powvalue = a[0];
  for (let i = 0; i < powvalue.length; i++) {
    for (let j = 0; j < powvalue[i].length - 2; j++) {
      temp[j] = temp[j] + (Math.pow(10, (powvalue[i][j] / 10)));
    }
  }
  for (let f = 0; f < 7; f++) {
    tempre[f] = 10 * Math.log10(temp[f]);
  }
  return tempre;
}

function verfiyfreepow() {
  var temp = 0;
  for (let i = 0; i < freeinletdata.PowPathcount; i++) {
    if (
      document.getElementById(`powpathname${i + 1}`).value &&
      document.getElementById(`freeunitname${i + 1}`).value &&
      document.getElementById(`f63${i + 1}`).value &&
      document.getElementById(`f125${i + 1}`).value &&
      document.getElementById(`f250${i + 1}`).value &&
      document.getElementById(`f500${i + 1}`).value &&
      document.getElementById(`f1k${i + 1}`).value &&
      document.getElementById(`f2k${i + 1}`).value &&
      document.getElementById(`f4k${i + 1}`).value) {
      temp++;
    }
    else {
      temp--;
    }
  }
  if (temp == freeinletdata.PowPathcount) {
    return true;
  }
  else if (freeinletdata.PowPathcount == 0) {
    return false;
  }
  else {
    return false;
  }
}
function allinputverify() {
  var truecount = 0;

  if (document.getElementById('BOD').value) {
    truecount++;
  }
  else {
    document.getElementById('displayerfree').innerText = "Please Fill Bottom of Duct Property";
  }
  if (document.getElementById('CTF').value) {
    truecount++;
  }
  else {
    document.getElementById('displayerfree').innerText = "Please Fill Ceiling to Floor Property";
  }
  if (document.getElementById('DBWDAU').value) {
    truecount++;
  }
  else {
    document.getElementById('displayerfree').innerText = "Please Fill Distance B/W Diffuser to Unit Property";
  }
  if (document.getElementById('darea').value) {
    truecount++;
  }
  else {
    document.getElementById('displayerfree').innerText = "Please Fill Diffuser Area Property";
  }
  if (document.getElementById('freedirect').value) {
    truecount++;
  }
  else {
    document.getElementById('displayerfree').innerText = "Please Fill Directivity Property";
  }
  if (document.getElementById('fitl').value) {
    truecount++;
  }
  else {
    document.getElementById('displayerfree').innerText = "Please Fill Free inlet Trasmission Loss Property";
  }

  //Done
  if (truecount == 6) {
    return true;
  }
  else {
    return false;
  }
}

function addfreefloor(tbody) {
  if (tbody == 'freedatafloor') {
    var tablebody = document.getElementById(tbody);
    var newrow = tablebody.insertRow();
    newrow.innerHTML = `<tr>
        <td><label for="room-ceiling">Floor_Slab 0${freeinletdata.Freeinfinis[0] + 1} :</label></td>
        <td colspan="2"><input type="text" id="FloorSlabmark0${freeinletdata.Freeinfinis[0] + 1}" class="ceilinginputs" placeholder="Mark Name"></td>
        <td colspan="2">
          <select id="FloorSlabmaterial0${freeinletdata.Freeinfinis[0] + 1}" class="ceilinginputs">
            <option value="">--Select Material--</option>
            <option value="Plaster Board">Plaster Board</option>
            <option value="Gypsum Board">Gypsum Board</option>
            <option value="Wood">Wood</option>
            <option value="Cementious Board">Cementious Board</option>
            <option value="Metal">Metal</option>
            <option value="Aluminum Ceiling">Aluminum Ceiling</option>
            <option value="Metal Blade">Metal Blade</option>
            <option value="Paint">Paint</option>
          </select>
        </td>
        <td colspan="2"><input type="number" id="FloorSlabarea0${freeinletdata.Freeinfinis[0] + 1}" class="ceilinginputs" placeholder="Area(m2)"></td>
        </tr>`;
    freeinletdata.Freeinfinis[0]++;
  }
  else if (tbody == 'freedatawall') {
    var tablebody = document.getElementById(tbody);
    var newrow = tablebody.insertRow();
    newrow.innerHTML = `<tr>
    <td><label for="room-ceiling">Wall 0${freeinletdata.Freeinfinis[1] + 1} :</label></td>
    <td colspan="2"><input type="text" id="Freewallmark0${freeinletdata.Freeinfinis[1] + 1}" class="ceilinginputs" placeholder="Mark Name"></td>
    <td colspan="2">
      <select id="Freewallmaterial0${freeinletdata.Freeinfinis[1] + 1}" class="ceilinginputs">
        <option value="">--Select Material--</option>
        <option value="Paint">Paint</option>
        <option value="Glass">Glass</option>
        <option value="Glazing">Glazing</option>
        <option value="Steel Door">Steel Door</option>
        <option value="Wooden Door">Wooden Door</option>
      </select>
    </td>
    <td colspan="2"><input type="number" id="Freewallarea0${freeinletdata.Freeinfinis[1] + 1}" class="ceilinginputs" placeholder="Area(m2)"></td>
    </tr>`;
    freeinletdata.Freeinfinis[1]++;
  }
  else if (tbody == 'freedataceiling') {
    var tablebody = document.getElementById(tbody);
    var newrow = tablebody.insertRow();
    newrow.innerHTML = `<tr>
    <td><label for="room-ceiling">False_Ceiling 0${freeinletdata.Freeinfinis[2] + 1} :</label></td>
    <td colspan="2"><input type="text" id="Freeceilingmark0${freeinletdata.Freeinfinis[2] + 1}" class="ceilinginputs" placeholder="Mark Name"></td>
    <td colspan="2">
      <select id="Freeceilingmaterial0${freeinletdata.Freeinfinis[2] + 1}" class="ceilinginputs">
        <option value="">--Select Material--</option>
        <option value="Paint">Paint</option>
        <option value="Glass">Glass</option>
        <option value="Glazing">Glazing</option>
        <option value="Steel Door">Steel Door</option>
        <option value="Wooden Door">Wooden Door</option>
      </select>
    </td>
    <td colspan="2"><input type="number" id="Freeceilingarea0${freeinletdata.Freeinfinis[2] + 1}" class="ceilinginputs" placeholder="Area(m2)"></td>
    </tr>`;
    freeinletdata.Freeinfinis[2]++;
  }
}

function cutmaterial(tbody) {
  var table = document.getElementById(tbody);
  var rowcount = table.rows.length;
  if (tbody == 'freedatafloor') {
    if (rowcount > 1) {
      table.deleteRow(rowcount - 1);
      freeinletdata.Freeinfinis[0]--;
    }
  }
  else if (tbody == 'freedatawall') {
    if (rowcount > 2) {
      table.deleteRow(rowcount - 1);
      freeinletdata.Freeinfinis[1]--;
    }
  }
  else if (tbody == 'freedataceiling') {
    if (rowcount > 2) {
      table.deleteRow(rowcount - 1);
      freeinletdata.Freeinfinis[2]--;
    }
  }
}

function dynamicdata() {
  document.getElementById('displayerfree').style.cssText = "display:none";
  var truecount0 = 0;
  var truecount1 = 0;
  var truecount2 = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < freeinletdata.Freeinfinis[i]; j++) {
      if (i == 0) {
        if (document.getElementById(`FloorSlabmark0${j + 1}`).value &&
          document.getElementById(`FloorSlabmaterial0${j + 1}`).value &&
          document.getElementById(`FloorSlabarea0${j + 1}`).value) {
          truecount0++;
        }
        else {
          document.getElementById('displayerfree').style.cssText = "display:Block";
          document.getElementById('displayerfree').innerText = "Please Fill all Selected Floor Slab Value Property";
        }
      }
      else if (i == 1) {
        if (document.getElementById(`Freewallmark0${j + 1}`).value &&
          document.getElementById(`Freewallmaterial0${j + 1}`).value &&
          document.getElementById(`Freewallarea0${j + 1}`).value) {
          truecount1++;
        }
        else {
          document.getElementById('displayerfree').style.cssText = "display:Block";
          document.getElementById('displayerfree').innerText = "Please Fill all Selected Wall Value Property";
        }
      }
      else if (i == 2) {
        if (document.getElementById(`Freeceilingmark0${j + 1}`).value &&
          document.getElementById(`Freeceilingmaterial0${j + 1}`).value &&
          document.getElementById(`Freeceilingarea0${j + 1}`).value) {
          truecount2++;
        }
        else {
          document.getElementById('displayerfree').style.cssText = "display:Block";
          document.getElementById('displayerfree').innerText = "Please Fill all Selected Ceiling Value Property";
        }
      }
    }
  }
  if(truecount0==freeinletdata.Freeinfinis[0] && truecount1==freeinletdata.Freeinfinis[1] && truecount2==freeinletdata.Freeinfinis[2])
  {
    return true;
  }
  else if(freeinletdata.Freeinfinis[0]==0 && freeinletdata.Freeinfinis[1]==0 && freeinletdata.Freeinfinis[2]==0)
  {
    return true;
  }
  else {
    return false;
  }
}

function getdynainput()
{
  freeinletdata.FloorSlab=[];
  freeinletdata.Free_Wall=[];
  freeinletdata.Free_ceiling=[];
  
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < freeinletdata.Freeinfinis[i]; j++) {
      if (i == 0) {
        var temp=["","",0];
        temp[0]=document.getElementById(`FloorSlabmark0${j + 1}`).value;
        temp[1]=document.getElementById(`FloorSlabmaterial0${j + 1}`).value;
        temp[2]=parseFloat(document.getElementById(`FloorSlabarea0${j + 1}`).value);
        freeinletdata.FloorSlab.push(temp);
        
      }
      else if (i == 1) {
        var tempwall=["","",0];
        tempwall[0]=document.getElementById(`Freewallmark0${j + 1}`).value;
        tempwall[1]=document.getElementById(`Freewallmaterial0${j + 1}`).value;
        tempwall[2]=parseFloat(document.getElementById(`Freewallarea0${j + 1}`).value);
        freeinletdata.Free_Wall.push(tempwall);
      }
      else if (i == 2) {
        var tempcei=["","",0];
        tempcei[0]=document.getElementById(`Freeceilingmark0${j + 1}`).value;
        tempcei[1]=document.getElementById(`Freeceilingmaterial0${j + 1}`).value;
        tempcei[2]=parseFloat(document.getElementById(`Freeceilingarea0${j + 1}`).value);
        freeinletdata.Free_ceiling.push(tempcei);
      }
    }
  }
}
function FreeCal() {
  document.getElementById('displayerfree').style.cssText = "display:none";
  if (verfiyfreepow()) {
    if (allinputverify() && dynamicdata()) {//Mention blow to run with verification
      getfreeindata();
    }
    else {
      document.getElementById('displayerfree').style.cssText = "display:Block";
    }
  }
  else {
    document.getElementById('displayerfree').style.cssText = "display:Block";
    document.getElementById('displayerfree').innerText = "Please Fill all Selected Power Value Property";
  }
}


function Excelout()
{
  //Calculation
  let surfacearea={"floorSlab":0,"Wall":0,"Ceiling":0};
  for(let i=0;i<3;i++)
  {
      for(var j=0;j<freeinletdata.Freeinfinis[i];j++)
      {
        if(i==0)
        {
          surfacearea.floorSlab=surfacearea.floorSlab+freeinletdata.FloorSlab[j][2];
        }
        else if(i==1)
        {
          surfacearea.Wall=surfacearea.Wall+freeinletdata.Free_Wall[j][2];
        }
        else if(i==2)
        {
          surfacearea.Ceiling=surfacearea.Ceiling+freeinletdata.Free_ceiling[j][2];
        }
      }
  }
  let totalsurfacearea=surfacearea.floorSlab+surfacearea.Wall+surfacearea.Ceiling;

  function Unittofree(){
    var a=(freeinletdata.Basicinput.Bottom_of_Duct/1000)-(freeinletdata.Basicinput.Ceiling_To_Floor/1000);
    var b=freeinletdata.Basicinput.Dis_btw_DAU/1000;
    return Math.sqrt((Math.pow(a,2)+Math.pow(b,2))).toFixed(1);
  }

  //templete
  var tablebody=document.getElementById('freeresult');
  var row1=tablebody.insertRow();
  row1.innerHTML=`<td colspan=8>FREE INLET NOISE INGRESS SPL <br>${roomrawdata.RoomName} - ${roomrawdata.RoomTag}</td>`;
  tablebody.insertRow().innerHTML=`<td colspan="8">INPUT PARAMETERS:</td>`;
  tablebody.insertRow().innerHTML=`<td>Frequency(Hz)</td><td>63</td><td>125</td><td>250</td><td>500</td><td>1000</td><td>2000</td><td>4000</td>`;
  
  for(var i=0;i<freeinletdata.PowPathcount;i++)
  {
    tablebody.insertRow().innerHTML=`<td>${freeinletdata.TotalSPL[0][i][7]} SWL of ${freeinletdata.TotalSPL[0][i][8]} dB</td>
    <td>${freeinletdata.TotalSPL[0][i][0]}</td>
    <td>${freeinletdata.TotalSPL[0][i][1]}</td>
    <td>${freeinletdata.TotalSPL[0][i][2]}</td>
    <td>${freeinletdata.TotalSPL[0][i][3]}</td>
    <td>${freeinletdata.TotalSPL[0][i][4]}</td>
    <td>${freeinletdata.TotalSPL[0][i][5]}</td>
    <td>${freeinletdata.TotalSPL[0][i][6]}</td>`;
  }
  tablebody.insertRow().innerHTML=`<td>Total SPL of ${freeinletdata.TotalSPL[0][0][8]} dB</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[0].toFixed(0)}</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[1].toFixed(0)}</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[2].toFixed(0)}</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[3].toFixed(0)}</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[4].toFixed(0)}</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[5].toFixed(0)}</td>
    <td>${dbaddition(freeinletdata.TotalSPL)[6].toFixed(0)}</td>`;

tablebody.insertRow().innerHTML=`<td colspan="8">CEILING VOID SURFACE AREA DETAILS</td>`;


tablebody.insertRow().innerHTML=`<td rowspan=${1+freeinletdata.Freeinfinis[0]+freeinletdata.Freeinfinis[1]+freeinletdata.Freeinfinis[2]}>Total Room Surface area S(m<sup>2</sup>)</td>
<td rowspan=${1+freeinletdata.Freeinfinis[0]+freeinletdata.Freeinfinis[1]+freeinletdata.Freeinfinis[2]} colspan="2">${totalsurfacearea}</td>
<td rowspan=${1+freeinletdata.Freeinfinis[0]+freeinletdata.Freeinfinis[1]+freeinletdata.Freeinfinis[2]} colspan="2">Surface area of room elements (m<sup>2</sup>)</td>`;

for(let h=0;h<3;h++)
{
  for(let g=0;g<freeinletdata.Freeinfinis[h];g++)
  {
    if(h==0)
    {
      tablebody.insertRow().innerHTML=`<td colspan="2">Floor Slab 0${g+1}, m<sup>2</sup></td>
      <td>${freeinletdata.FloorSlab[0][2]}`;
    }
    else if(h==1)
    {
      tablebody.insertRow().innerHTML=`<td colspan="2">Wall 0${g+1}, m<sup>2</sup></td>
      <td>${freeinletdata.Free_Wall[0][2]}`;
    }
    else if(h==2)
    {
      tablebody.insertRow().innerHTML=`<td colspan="2">False Ceiling 0${g+1}, m<sup>2</sup></td>
      <td>${freeinletdata.Free_ceiling[0][2]}`;
    }
  }
}

tablebody.insertRow().innerHTML=`<td>Directivity , Q</td><td colspan="2">${freeinletdata.Basicinput.Directivity}</td><td colspan="4">Unit to Free Inlet Distance, m</td><td>${Unittofree()}</td>`;


tablebody.insertRow().innerHTML=`<td colspan="8">ABSORPTION CO-EFFICIENT  (α) DATA</td>`;
tablebody.insertRow().innerHTML=`<td>Frequency(Hz)</td><td>63</td><td>125</td><td>250</td><td>500</td><td>1000</td><td>2000</td><td>4000</td>`;


for(let i=0;i<3;i++)
{
  for(j=0;j<freeinletdata.Freeinfinis[i];j++)
  {
    if(i==0)
    {
      tablebody.insertRow().innerHTML=`<td>Floor Slap(${freeinletdata.FloorSlab[j][0]})</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][0]}</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][1]}</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][2]}</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][3]}</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][4]}</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][5]}</td>
      <td>${Database_FreeFloor[`${freeinletdata.FloorSlab[j][1]}`][6]}</td>`;
    }
    else if(i==1)
    {
      tablebody.insertRow().innerHTML=`<td>Wall(${freeinletdata.Free_Wall[j][0]})</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][0]}</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][1]}</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][2]}</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][3]}</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][4]}</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][5]}</td>
      <td>${Database_FreeWall[`${freeinletdata.Free_Wall[j][1]}`][6]}</td>`;
    }
    else if(i==2)
    {
      tablebody.insertRow().innerHTML=`<td>False Ceiling(${freeinletdata.Free_ceiling[j][0]})</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][0]}</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][1]}</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][2]}</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][3]}</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][4]}</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][5]}</td>
      <td>${Database_FreeCeiling[`${freeinletdata.Free_ceiling[j][1]}`][6]}</td>`;
    }
  }
}

tablebody.insertRow().innerHTML=`<td colspan="8">EVALUATION:</td>`;
tablebody.insertRow().innerHTML=`<td colspan="8">ROOM CONSTANT EVALUATION</td>`;

function freercc()
{
  for(let j=0;j<3;j++)
  {
    for(var i=0;i<freeinletdata.Freeinfinis[j];i++)
    {
      if(j==0)
      {
        tablebody.insertRow().innerHTML=`<td>Floor(A1)</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.FloorSlab[i][2]*Database_FreeFloor[`${freeinletdata.FloorSlab[i][1]}`][0]).toFixed(2)}</td>`;
      }
      else if(j==1)
      {
        tablebody.insertRow().innerHTML=`<td>Wall(A2)</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_Wall[i][2]*Database_FreeWall[`${freeinletdata.Free_Wall[i][1]}`][0]).toFixed(2)}</td>`;
      }
      else if(j==2)
      {
        tablebody.insertRow().innerHTML=`<td>Ceiling(A3)</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>
        <td>${(freeinletdata.Free_ceiling[i][2]*Database_FreeCeiling[`${freeinletdata.Free_ceiling[i][1]}`][0]).toFixed(2)}</td>`;
      }
    }
  }
}
freercc();


}


























//Database for the Freeinlet
const Database_FreeFloor = {
  "Plaster Board":[0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Gypsum Board":[0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Wood": [0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Cementious Board": [0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Metal": [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Aluminum Ceiling": [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Metal Blade": [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]
};

const Database_FreeWall = {
  "Wall Tiles":[ 0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Porcelain" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Vinyl" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Terazzo"  :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
  "Glass" :[0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Glazing" : [ 0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Curtains": [ 0.1, 0.1, 0.38, 0.63, 0.52, 0.55, 0.65]
};

const Database_FreeCeiling = {
  "Wall Tiles":[ 0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Porcelain" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Vinyl" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Terazzo"  :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
  "Glass" :[0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Glazing" : [ 0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Curtains": [ 0.1, 0.1, 0.38, 0.63, 0.52, 0.55, 0.65]
};