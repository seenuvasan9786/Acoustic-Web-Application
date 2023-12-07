function rcinitial(){
    document.getElementsByClassName('noisecal')[0].style.cssText="display:none";
    document.getElementsByClassName('room')[0].style.cssText="display:block";
    document.getElementsByClassName('reporting')[0].style.cssText="display:none";
}
function ncinitial(){
  document.getElementsByClassName('noisecal')[0].style.cssText="display:block";
  document.getElementsByClassName('room')[0].style.cssText="display:none";
  document.getElementsByClassName('reporting')[0].style.cssText="display:none";
}
function rpinitial(){
  if(calculatebtn==true)
  {
    if(verifyrcinput()==true)
    {
      CalculateValue();
      document.getElementsByClassName('noisecal')[0].style.cssText="display:none";
      document.getElementsByClassName('room')[0].style.cssText="display:none";
      document.getElementsByClassName('reporting')[0].style.cssText="display:block";
      addtablerow();
    }
    else{
      errorbox("Please fill all selected input Field");
    }
  }
  else{
    errorbox("Please Click Calculate Button..!");
  }
}








function addrow(tbody)
{
    if(tbody=='roomdataceiling')
    {
        var tablebody=document.getElementById("roomdataceiling");
        var newrow=tablebody.insertRow();
        newrow.innerHTML=`<tr>
        <td><label for="room-ceiling">Ceiling 0${roomrawdata.Finishes[0]+1} :</label></td>
        <td><input type="text" id="Ceilingmark0${roomrawdata.Finishes[0]+1}" class="ceilinginputs" placeholder="Mark Name"></td>
        <td>
          <select id="Ceilingmaterial0${roomrawdata.Finishes[0]+1}" class="ceilinginputs">
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
        <td><input type="number" id="Ceilingarea0${roomrawdata.Finishes[0]+1}" class="ceilinginputs" placeholder="Area(m2)"></td>
        </tr>`;
        roomrawdata.Finishes[0]++;
    }
    else if(tbody=='roomdatafloor')
    {
        var tablebody=document.getElementById(tbody);
        var newrow=tablebody.insertRow();
        newrow.innerHTML=`
      <tr>
        <td><label for="room-floor">Floor 0${roomrawdata.Finishes[1]+1} :</label></td>
        <td><input type="text" id="Floormark0${roomrawdata.Finishes[1]+1}" class="floorinputs" placeholder="Mark Name"></td>
        <td>
          <select id="Floormaterial0${roomrawdata.Finishes[1]+1}" class="floorinputs">
            <option value="">--Select Material--</option>
            <option value="Floor Tiles">Floor Tiles</option>
            <option value="Porcelain">Porcelain</option>
            <option value="Vinyl">Vinyl</option>
            <option value="Terazzo">Terazzo</option>
            <option value="Epoxy">Epoxy</option>
            <option value="Polyurethane Flooring">Polyurethane Flooring</option>
            <option value="Carpet Finish">Carpet Finish</option>
            <option value="Furniture-Upholstered">Furniture-Upholstered</option>
            <option value="Paint">Paint</option>
          </select>
        </td>
        <td><input type="number" id="Floorarea0${roomrawdata.Finishes[1]+1}" class="floorinputs" placeholder="Area(m2)"></td>
      </tr>`;
      roomrawdata.Finishes[1]++;
    }
    else if(tbody=='roomdatawall')
    {
        var tablebody=document.getElementById(tbody);
        var newrow=tablebody.insertRow();
        newrow.innerHTML=`
        <tr>
        <td><label for="room-wall">Wall 0${roomrawdata.Finishes[2]+1} :</label></td>
        <td><input type="text" id="Wallmark0${roomrawdata.Finishes[2]+1}" class="wallinputs" placeholder="Mark Name"></td>
        <td>
          <select id="Wallmaterial0${roomrawdata.Finishes[2]+1}" class="wallinputs">
            <option value="">--Select Material--</option>
            <option value="Wall Tiles">Wall Tiles</option>
            <option value="Porcelain">Porcelain</option>
            <option value="Vinyl">Vinyl</option>
            <option value="Terazzo">Terazzo</option>
            <option value="Paint">Paint</option>
            <option value="Glass">Glass</option>
            <option value="Glazing">Glazing</option>
            <option value="Curtains">Curtains</option>
          </select>
        </td>
        <td><input type="number" id="Wallarea0${roomrawdata.Finishes[2]+1}" class="wallinputs" placeholder="Area(m2)" disabled></td>
      </tr>`;
      roomrawdata.Finishes[2]++;
    }
    else if(tbody=='roomdatadoor')
    {
        var tablebody=document.getElementById(tbody);
        var newrow=tablebody.insertRow();
        newrow.innerHTML=`
        <tr>
              <td><label for="room-door">Door 0${roomrawdata.Finishes[3]+1} :</label></td>
              <td><input type="text" id="Doormark0${roomrawdata.Finishes[3]+1}" class="doorinputs" placeholder="Mark Name"></td>
              <td>
                <select id="Doormaterial0${roomrawdata.Finishes[3]+1}" class="doorinputs">
                  <option value="">--Select Material--</option>
                  <option value="Paint">Paint</option>
                  <option value="Glass">Glass</option>
                  <option value="Glazing">Glazing</option>
                  <option value="Steel Door">Steel Door</option>
                  <option value="Wooden Door">Wooden Door</option>
                </select>
              </td>
              <td><input type="number" id="Doorwidth0${roomrawdata.Finishes[3]+1}" class="rin" placeholder="Width(mm)"></td>
              <td><input type="number" id="Doorheight0${roomrawdata.Finishes[3]+1}" class="rin" placeholder="Heigth(mm)"></td>
              <td><input type="number" id="Doorquan0${roomrawdata.Finishes[3]+1}" class="rin" placeholder="Quantity"></td>
            </tr>`;
            roomrawdata.Finishes[3]++;
    }
    else if(tbody=='roomdataglass')
    {
        var tablebody=document.getElementById(tbody);
        var newrow=tablebody.insertRow();
        newrow.innerHTML=`
        <tr>
        <td><label for="room-glass">Glazing 0${roomrawdata.Finishes[4]+1} :</label></td>
        <td><input type="text" id="Glazingmark0${roomrawdata.Finishes[4]+1}" class="glassinputs" placeholder="Mark Name"></td>
        <td>
          <select id="Glazingmaterial0${roomrawdata.Finishes[4]+1}" class="glassinputs">
            <option value="">--Select Material--</option>
            <option value="Glazing">Glazing</option>
          </select>
        </td>
        <td><input type="number" id="Glazingwidth0${roomrawdata.Finishes[4]+1}" class="rin" placeholder="Width(mm)"></td>
        <td><input type="number" id="Glazingheight0${roomrawdata.Finishes[4]+1}" class="rin" placeholder="Height(mm)"></td>
        <td><input type="number" id="Glazingquan0${roomrawdata.Finishes[4]+1}" class="rin" placeholder="Quantity"></td>
      </tr>`;
      roomrawdata.Finishes[4]++;
    }

}

function removeceiling(tbody)
{
    var table=document.getElementById(tbody);
    var rowcount=table.rows.length;
    if(tbody=='roomdataceiling')
    {
        if(rowcount>1)
        {
            table.deleteRow(rowcount-1);
            roomrawdata.Finishes[0]--;
        }
    }
    else if(tbody=='roomdatafloor'){
        if(rowcount>2)
        {
            table.deleteRow(rowcount-1);
            roomrawdata.Finishes[1]--;
        }
    }
    else if(tbody=='roomdatawall'){
        if(rowcount>2)
        {
            table.deleteRow(rowcount-1);
            roomrawdata.Finishes[2]--;
        }
    }
    else if(tbody=='roomdatadoor'){
        if(rowcount>2)
        {
            table.deleteRow(rowcount-1);
            roomrawdata.Finishes[3]--;
        }
    }
    else if(tbody=='roomdataglass'){
        if(rowcount>2)
        {
            table.deleteRow(rowcount-1);
            roomrawdata.Finishes[4]--;
        }
    }
}





const Database_Ceiling = {
  "Plaster Board":[0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Gypsum Board":[0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Wood": [0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Cementious Board": [0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04],
  "Metal": [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Aluminum Ceiling": [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Metal Blade": [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]
};

const Database_Floor = {
  "Floor Tiles":[ 0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Porcelain" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Vinyl" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Terazzo"  :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Epoxy":[0.02, 0.02, 0.03, 0.03, 0.03, 0.03, 0.02],
  "Polyurethane Flooring":[0.02, 0.02, 0.03, 0.03, 0.03, 0.03, 0.02],
  "Carpet Finish":[ 0.09, 0.09, 0.08, 0.21, 0.26, 0.27, 0.37],
  "Furniture-Upholstered":[ 0.44, 0.44, 0.6, 0.77, 0.89, 0.82, 0.7],
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02]
};

const Database_Wall = {
  "Wall Tiles":[ 0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Porcelain" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Vinyl" :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Terazzo"  :[0.03, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05],
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
  "Glass" :[0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Glazing" : [ 0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Curtains": [ 0.1, 0.1, 0.38, 0.63, 0.52, 0.55, 0.65]
};

const Database_Door={
  "Paint": [ 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02],
  "Glass" :[0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Glazing" : [ 0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03],
  "Steel Door" : [0.1, 0.1, 0.06, 0.04, 0.03, 0.03, 0.03],
  "Wooden Door": [ 0.14, 0.14, 0.1, 0.06, 0.05, 0.04, 0.04]
};

const Database_Glass = {
  "Glazing" : [ 0.1, 0.06, 0.04, 0.03, 0.03, 0.03, 0.03]
};