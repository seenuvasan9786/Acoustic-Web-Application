let roomrawdata = {
    "RoomName":"","RoomTag":"","Height": 0, "RoomArea": 0, "WallLength": 0, "RoomDirectivity": 0, "RoomCriteria": 0, "RTcriteria": 0,
    "Ceiling": [], "Floor": [], "Wall": [], "Door": [], "Glass": [], "Finishes": [0, 0, 0, 0, 0], "Calculate": { "partitionarea": 0, "onlywall": 0, "totalarea": [0, 0, 0, 0, 0], "totalsurfacearea": 0, "volume": 0, "receiverdis": 0 },
    "rcpowerval": [0, 0, 0, 0, 0, 0, 0],"InputFlags": [true, true, true, true, true, true, true, true, true, true],
    "Filedetails":{"Created Data":""}
}

var calculatebtn = false;


//InputFlags:[height,area,wall-length,directivity,ceiling,floor,wall,door,glas] if its all true then done
function roomcalculate() {
    calculatebtn = true;
    setTimeout(() => { calculatebtn = false }, 5000);


    document.getElementById('displayerr').innerText = "";

    if (document.getElementById('room-height').value) {
        roomrawdata.Height = parseFloat(document.getElementById('room-height').value);
        roomrawdata.InputFlags[0] = true;
    }
    else {
        document.getElementById('displayerr').innerText = "Please Enter the Room Height";
        roomrawdata.InputFlags[0] = false;
    }
    if (document.getElementById('room-area').value) {
        roomrawdata.RoomArea = parseFloat(document.getElementById('room-area').value);
        roomrawdata.InputFlags[1] = true;
    }
    else {
        document.getElementById('displayerr').innerText = "Please Enter the Room Area";
        roomrawdata.InputFlags[1] = false;
    }
    if (document.getElementById('room-wall-length').value) {
        roomrawdata.WallLength = parseFloat(document.getElementById('room-wall-length').value);
        roomrawdata.InputFlags[2] = true;
    }
    else {
        document.getElementById('displayerr').innerText = "Please Enter the Wall Length";
        roomrawdata.InputFlags[2] = false;
    }
    if (document.getElementById('room-directivity').value) {
        roomrawdata.RoomDirectivity = parseFloat(document.getElementById('room-directivity').value);
        roomrawdata.InputFlags[3] = true;
    }
    else {
        document.getElementById('displayerr').innerText = "Please Enter the Directivity";
        roomrawdata.InputFlags[3] = false;
    }
    if (document.getElementById('room-reverb-crit').value) {
        roomrawdata.RoomCriteria = parseFloat(document.getElementById('room-reverb-crit').value);
    }
    if (document.getElementById('room-criteria').value) {
        roomrawdata.RTcriteria = parseFloat(document.getElementById('room-criteria').value);
    }


    //function call
    ceilinginputs();
    floorinputs();
    wallinputs();
    doorinputs();
    glassinputs();
    getrcpowval();
    GetRoomName();
}

function ceilinginputs() {
    roomrawdata.Ceiling = [];
    for (let i = 0; i < roomrawdata.Finishes[0]; i++) {
        if (document.getElementById(`Ceilingmark0${i + 1}`).value && document.getElementById(`Ceilingmaterial0${i + 1}`).value && document.getElementById(`Ceilingarea0${i + 1}`).value) {
            var temp = { "CeilingMark": document.getElementById(`Ceilingmark0${i + 1}`).value, "CeilingMaterial": document.getElementById(`Ceilingmaterial0${i + 1}`).value, "CeilingArea": parseFloat(document.getElementById(`Ceilingarea0${i + 1}`).value) };
            roomrawdata.Ceiling.push(temp);
            roomrawdata.InputFlags[4] = true;
        }
        else {
            document.getElementById('displayerr').innerText = "Please Fill all Selected Ceiling Property";
            roomrawdata.InputFlags[4] = false;
        }

    }
}
function floorinputs() {
    roomrawdata.Floor = [];
    for (let i = 0; i < roomrawdata.Finishes[1]; i++) {
        if (document.getElementById(`Floormark0${i + 1}`).value && document.getElementById(`Floormaterial0${i + 1}`).value && document.getElementById(`Floorarea0${i + 1}`).value) {
            var temp = { "FloorMark": document.getElementById(`Floormark0${i + 1}`).value, "FloorMaterial": document.getElementById(`Floormaterial0${i + 1}`).value, "FloorArea": parseFloat(document.getElementById(`Floorarea0${i + 1}`).value) };
            roomrawdata.Floor.push(temp);
            roomrawdata.InputFlags[5] = true;
        }
        else {
            document.getElementById('displayerr').innerText = "Please Fill all Selected Floor Property";
            roomrawdata.InputFlags[5] = false;
        }
    }
}

function wallinputs() {
    roomrawdata.Wall = [];
    for (let i = 0; i < roomrawdata.Finishes[2]; i++) {
        if (document.getElementById(`Wallmark0${i + 1}`).value && document.getElementById(`Wallmaterial0${i + 1}`).value) {
            var temp = { "WallMark": document.getElementById(`Wallmark0${i + 1}`).value, "WallMaterial": document.getElementById(`Wallmaterial0${i + 1}`).value };
            roomrawdata.Wall.push(temp);
            roomrawdata.InputFlags[6] = true;
        }
        else {
            document.getElementById('displayerr').innerText = "Please Fill all Selected Wall Property";
            roomrawdata.InputFlags[6] = false;
        }
    }
}
function doorinputs() {
    roomrawdata.Door = [];
    for (let i = 0; i < roomrawdata.Finishes[3]; i++) {
        if (document.getElementById(`Doormark0${i + 1}`).value && document.getElementById(`Doormaterial0${i + 1}`).value && document.getElementById(`Doorwidth0${i + 1}`).value && document.getElementById(`Doorheight0${i + 1}`).value && document.getElementById(`Doorquan0${i + 1}`).value) {
            var temp = { "DoorMark": document.getElementById(`Doormark0${i + 1}`).value, "DoorMaterial": document.getElementById(`Doormaterial0${i + 1}`).value, "DoorWidth": parseFloat(document.getElementById(`Doorwidth0${i + 1}`).value), "DoorHeigth": parseFloat(document.getElementById(`Doorheight0${i + 1}`).value), "DoorQty": parseFloat(document.getElementById(`Doorquan0${i + 1}`).value) };
            roomrawdata.Door.push(temp);
            roomrawdata.InputFlags[7] = true;
        }
        else {
            document.getElementById('displayerr').innerText = "Please Fill all Selected Door Property";
            roomrawdata.InputFlags[7] = false;
        }
    }
}

function glassinputs() {
    roomrawdata.Glass = [];
    for (let i = 0; i < roomrawdata.Finishes[4]; i++) {
        if (document.getElementById(`Glazingmark0${i + 1}`).value && document.getElementById(`Glazingmaterial0${i + 1}`).value && document.getElementById(`Glazingwidth0${i + 1}`).value && document.getElementById(`Glazingheight0${i + 1}`).value && document.getElementById(`Glazingquan0${i + 1}`).value) {
            var temp = { "GlassMark": document.getElementById(`Glazingmark0${i + 1}`).value, "GlassMaterial": document.getElementById(`Glazingmaterial0${i + 1}`).value, "GlassWidth": parseFloat(document.getElementById(`Glazingwidth0${i + 1}`).value), "GlassHeigth": parseFloat(document.getElementById(`Glazingheight0${i + 1}`).value), "GlassQty": parseFloat(document.getElementById(`Glazingquan0${i + 1}`).value) };
            roomrawdata.Glass.push(temp);
            roomrawdata.InputFlags[8] = true;
        }
        else {
            document.getElementById('displayerr').innerText = "Please Fill all Selected Glass Property";
            roomrawdata.InputFlags[8] = false;
        }
    }
}

function getrcpowval() {
    if(document.getElementById('f63').value && document.getElementById('f125').value && document.getElementById('f250').value && document.getElementById('f500').value && document.getElementById('f1k').value && document.getElementById('f2k').value && document.getElementById('f4k').value) {
        roomrawdata.rcpowerval[0] = parseFloat(document.getElementById('f63').value);
        roomrawdata.rcpowerval[1] = parseFloat(document.getElementById('f125').value);
        roomrawdata.rcpowerval[2] = parseFloat(document.getElementById('f250').value);
        roomrawdata.rcpowerval[3] = parseFloat(document.getElementById('f500').value);
        roomrawdata.rcpowerval[4] = parseFloat(document.getElementById('f1k').value);
        roomrawdata.rcpowerval[5] = parseFloat(document.getElementById('f2k').value);
        roomrawdata.rcpowerval[6] = parseFloat(document.getElementById('f4k').value);
        roomrawdata.InputFlags[9] = true;
    }
    else {
        document.getElementById('displayerr').innerText = "Please Fill all Power Value Property";
        roomrawdata.InputFlags[9] = false;
    }
}

function GetRoomName()
{
    if(document.getElementById('room-name').value && document.getElementById('room-tag').value)
    {
        roomrawdata.RoomName=document.getElementById('room-name').value;
        roomrawdata.RoomTag=document.getElementById('room-tag').value;
    }
    else{
        document.getElementById('displayerr').innerText = "Please Fill Room Name and Tag  Property";
    }
}

function verifyrcinput() {
    var truecount = 0;
    for (let i = 0; i < roomrawdata.InputFlags.length; i++) {
        if (roomrawdata.InputFlags[i] == true) {
            truecount++;
        }
        else if (i == 4 && roomrawdata.Finishes[0] == 0) {
            truecount++;
        }
        else if (i == 5 && roomrawdata.Finishes[1] == 0) {
            truecount++;
        }
        else if (i == 6 && roomrawdata.Finishes[2] == 0) {
            truecount++;
        }
        else if (i == 7 && roomrawdata.Finishes[3] == 0) {
            truecount++;
        }
        else if (i == 8 && roomrawdata.Finishes[4] == 0) {
            truecount++;
        }
    }
    if (truecount == 10) {
        return true;
    }
    else {
        return false;
    }
}


//Calculation Part
function CalculateValue() {
    roomrawdata.Calculate.partitionarea = roomrawdata.Height * roomrawdata.WallLength;
    roomrawdata.Calculate.totalarea = [0, 0, 0, 0, 0];
    let onlywatemp = roomrawdata.Calculate.partitionarea;//temp variable to store
    roomrawdata.Calculate.volume = 0;
    for (let i = 0; i < roomrawdata.Finishes.length; i++) {
        for (let j = 0; j < roomrawdata.Finishes[i]; j++) {
            if (i == 0) {
                roomrawdata.Calculate.totalarea[0] = roomrawdata.Calculate.totalarea[0] + roomrawdata.Ceiling[j].CeilingArea;
            }
            else if (i == 1) {
                roomrawdata.Calculate.totalarea[1] = roomrawdata.Calculate.totalarea[1] + roomrawdata.Floor[j].FloorArea;
            }
            else if (i == 3)//Door
            {
                roomrawdata.Calculate.totalarea[3] = roomrawdata.Calculate.totalarea[3] + ((roomrawdata.Door[j].DoorWidth / 1000) * (roomrawdata.Door[j].DoorHeigth / 1000)) * (roomrawdata.Door[j].DoorQty);
                onlywatemp = onlywatemp - ((roomrawdata.Door[j].DoorWidth / 1000) * (roomrawdata.Door[j].DoorHeigth / 1000)) * (roomrawdata.Door[j].DoorQty);
            }
            else if (i == 4)//Glass
            {
                roomrawdata.Calculate.totalarea[4] = roomrawdata.Calculate.totalarea[4] + ((roomrawdata.Glass[j].GlassWidth / 1000) * (roomrawdata.Glass[j].GlassHeigth / 1000)) * (roomrawdata.Glass[j].GlassQty);
                onlywatemp = onlywatemp - ((roomrawdata.Glass[j].GlassWidth / 1000) * (roomrawdata.Glass[j].GlassHeigth / 1000)) * (roomrawdata.Glass[j].GlassQty);
            }
        }
    }
    roomrawdata.Calculate.onlywall = onlywatemp;
    roomrawdata.Calculate.totalarea[2] = roomrawdata.Calculate.onlywall;

    //Assign a Wall
    if(roomrawdata.Finishes[2]>0)
    {
        document.getElementById('Wallarea01').value=roomrawdata.Calculate.onlywall.toFixed(1);
    }
    //End
    
    roomrawdata.Calculate.totalsurfacearea=0;
    for (let i = 0; i < roomrawdata.Calculate.totalarea.length; i++) {
        roomrawdata.Calculate.totalsurfacearea = roomrawdata.Calculate.totalsurfacearea + roomrawdata.Calculate.totalarea[i];
    }
    roomrawdata.Calculate.volume = roomrawdata.Calculate.totalarea[0] * roomrawdata.Height;
    roomrawdata.Calculate.receiverdis = roomrawdata.Height - 1.5;
}