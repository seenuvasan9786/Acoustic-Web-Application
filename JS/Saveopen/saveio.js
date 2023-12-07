function Save(data) {
    
    var jsondata = JSON.stringify(data, null, 2);

    var blob = new Blob([jsondata], { type: 'application/json' });
    var downloadLink = document.createElement('a');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "Room Correction" + '.pks';

    downloadLink.click();
}

function Open() {

    document.getElementsByClassName('openfile')[0].style.cssText="display:none";
    var datafile = document.getElementById('open-file');

    var file = datafile.files[0];
    if (file) {
        var fileName=file.name;
        var fileExtension=fileName.slice(((fileName.lastIndexOf(".")-1)>>>0)+2);

        if(fileExtension=="pks")
        {
            var reader = new FileReader();
            reader.onload = function (event) {
                try {
                    var jsondata = JSON.parse(event.target.result);
                    setRCValue(jsondata, null, 2);
                }
                catch (error) {
                    console.log(error);
                    errorbox("Please Select the PKS Format File 1");
                }
            };
            reader.readAsText(file);
        }
        else{
            errorbox("Please select the PKS Format File 2");
        }
    }
    else {
        errorbox("No File is Selected");
    }
}


function diplyopen(){
    document.getElementsByClassName('openfile')[0].style.cssText="display:flex";
}
function closeopentab(){
  document.getElementsByClassName('openfile')[0].style.cssText="display:none";
}


function setRCValue(roomdata){
    roomrawdata=roomdata;

    document.getElementById('room-name').value=roomrawdata.RoomName;
    document.getElementById('room-tag').value=roomrawdata.RoomTag;
    document.getElementById('room-height').value=roomrawdata.Height;
    document.getElementById('room-area').value=roomrawdata.RoomArea;
    document.getElementById('room-wall-length').value=roomrawdata.WallLength;
    document.getElementById('room-directivity').value=roomrawdata.RoomDirectivity;
    document.getElementById('room-reverb-crit').value=roomrawdata.RTcriteria;
    document.getElementById('room-criteria').value=roomrawdata.RoomCriteria;

    document.getElementById('f63').value=roomrawdata.rcpowerval[0];
    document.getElementById('f125').value=roomrawdata.rcpowerval[1];
    document.getElementById('f250').value=roomrawdata.rcpowerval[2];
    document.getElementById('f500').value=roomrawdata.rcpowerval[3];
    document.getElementById('f1k').value=roomrawdata.rcpowerval[4];
    document.getElementById('f2k').value=roomrawdata.rcpowerval[5];
    document.getElementById('f4k').value=roomrawdata.rcpowerval[6];

    for(let j=0;j<roomrawdata.Finishes.length;j++)
    {
        for(let i=0;i<roomrawdata.Finishes[j];i++)
        {
            if(j==0)
            {
                var tablebody=document.getElementById("roomdataceiling");
                var newrow=tablebody.insertRow();
                newrow.innerHTML=`<tr>
                <td><label for="room-ceiling">Ceiling 0${i+1} :</label></td>
                <td><input type="text" id="Ceilingmark0${i+1}" class="ceilinginputs" placeholder="Mark Name"></td>
                <td>
                  <select id="Ceilingmaterial0${i+1}" class="ceilinginputs">
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
                <td><input type="number" id="Ceilingarea0${i+1}" class="ceilinginputs" placeholder="Area(m2)"></td>
                </tr>`;
                
                document.getElementById(`Ceilingmark0${i+1}`).value=roomrawdata.Ceiling[i].CeilingMark;
                document.getElementById(`Ceilingmaterial0${i+1}`).value=roomrawdata.Ceiling[i].CeilingMaterial;
                document.getElementById(`Ceilingarea0${i+1}`).value=roomrawdata.Ceiling[i].CeilingArea;
            }
            else if(j==1)
            {
                var tablebody=document.getElementById('roomdatafloor');
                var newrow=tablebody.insertRow();
                newrow.innerHTML=`
                <tr>
                <td><label for="room-floor">Floor 0${i+1} :</label></td>
                <td><input type="text" id="Floormark0${i+1}" class="floorinputs" placeholder="Mark Name"></td>
                <td>
                <select id="Floormaterial0${i+1}" class="floorinputs">
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
                <td><input type="number" id="Floorarea0${i+1}" class="floorinputs" placeholder="Area(m2)"></td>
                </tr>`;
                document.getElementById(`Floormark0${i+1}`).value=roomrawdata.Floor[i].FloorMark;
                document.getElementById(`Floormaterial0${i+1}`).value=roomrawdata.Floor[i].FloorMaterial;
                document.getElementById(`Floorarea0${i+1}`).value=roomrawdata.Floor[i].FloorArea;
            }
            else if(j==2)
            {
                var tablebody=document.getElementById('roomdatawall');
                var newrow=tablebody.insertRow();
                newrow.innerHTML=`
                <tr>
                <td><label for="room-wall">Wall 0${i+1} :</label></td>
                <td><input type="text" id="Wallmark0${i+1}" class="wallinputs" placeholder="Mark Name"></td>
                <td>
                  <select id="Wallmaterial0${i+1}" class="wallinputs">
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
                <td><input type="number" id="Wallarea0${i+1}" class="wallinputs" placeholder="Area(m2)" disabled></td>
                </tr>`;
                document.getElementById(`Wallmark0${i+1}`).value=roomrawdata.Wall[i].WallMark;
                document.getElementById(`Wallmaterial0${i+1}`).value=roomrawdata.Wall[i].WallMaterial;
            }
            else if(j==3)
            {
                var tablebody=document.getElementById('roomdatadoor');
                var newrow=tablebody.insertRow();
                newrow.innerHTML=`<tr>
                  <td><label for="room-door">Door 0${i+1} :</label></td>
                  <td><input type="text" id="Doormark0${i+1}" class="doorinputs" placeholder="Mark Name"></td>
                  <td>
                    <select id="Doormaterial0${i+1}" class="doorinputs">
                      <option value="">--Select Material--</option>
                      <option value="Paint">Paint</option>
                      <option value="Glass">Glass</option>
                      <option value="Glazing">Glazing</option>
                      <option value="Steel Door">Steel Door</option>
                      <option value="Wooden Door">Wooden Door</option>
                    </select>
                  </td>
                  <td><input type="number" id="Doorwidth0${i+1}" class="rin" placeholder="Width(mm)"></td>
                  <td><input type="number" id="Doorheight0${i+1}" class="rin" placeholder="Height(mm)"></td>
                  <td><input type="number" id="Doorquan0${i+1}" class="rin" placeholder="Quantity"></td>
                </tr>`;

                document.getElementById(`Doormark0${i+1}`).value=roomrawdata.Door[i].DoorMark;
                document.getElementById(`Doormaterial0${i+1}`).value=roomrawdata.Door[i].DoorMaterial;
                document.getElementById(`Doorwidth0${i+1}`).value=roomrawdata.Door[i].DoorWidth;
                document.getElementById(`Doorheight0${i+1}`).value=roomrawdata.Door[i].DoorHeigth;
                document.getElementById(`Doorquan0${i+1}`).value=roomrawdata.Door[i].DoorQty;
            }
            else if(j==4)
            {
                var tablebody=document.getElementById('roomdataglass');
                var newrow=tablebody.insertRow();
                newrow.innerHTML=`
                <tr>
                <td><label for="room-glass">Glazing 0${i+1} :</label></td>
                <td><input type="text" id="Glazingmark0${i+1}" class="glassinputs" placeholder="Mark Name"></td>
                <td>
                  <select id="Glazingmaterial0${i+1}" class="glassinputs">
                    <option value="">--Select Material--</option>
                    <option value="Glazing">Glazing</option>
                  </select>
                </td>
                <td><input type="number" id="Glazingwidth0${i+1}" class="rin" placeholder="Width(mm)"></td>
                <td><input type="number" id="Glazingheight0${i+1}" class="rin" placeholder="Height(mm)"></td>
                <td><input type="number" id="Glazingquan0${i+1}" class="rin" placeholder="Quantity"></td>
                </tr>`;
                document.getElementById(`Glazingmark0${i+1}`).value=roomrawdata.Glass[i].GlassMark;
                document.getElementById(`Glazingmaterial0${i+1}`).value=roomrawdata.Glass[i].GlassMaterial;
                document.getElementById(`Glazingwidth0${i+1}`).value=roomrawdata.Glass[i].GlassWidth;
                document.getElementById(`Glazingheight0${i+1}`).value=roomrawdata.Glass[i].GlassHeigth;
                document.getElementById(`Glazingquan0${i+1}`).value=roomrawdata.Glass[i].GlassQty;
            }
        }
    }
}