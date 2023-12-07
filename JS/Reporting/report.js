function clearrctable(id)
{
    var table=document.getElementById(id);
    var rows=table.getElementsByTagName('tr');
    for(let i=rows.length-1;i>=0;i--)
    {
        table.removeChild(rows[i]);
    }
}

function displayrcname()
{
    document.getElementById('disname').innerText=`${roomrawdata.RoomName} - (${roomrawdata.RoomTag})`;
}
function addtablerow()
{
    clearrctable('row1');
    displayrcname();
    var tablerow=document.getElementById('row1');
    var tr=document.createElement('tr');
    tr.innerHTML=`<tr id="addceil">
    <td rowspan="${roomrawdata.Finishes[0]+roomrawdata.Finishes[1]+roomrawdata.Finishes[2]+roomrawdata.Finishes[3]+roomrawdata.Finishes[4]+4}" style="text-align:center">Total Room Surface Area</td>
    <td rowspan="${roomrawdata.Finishes[0]+roomrawdata.Finishes[1]+roomrawdata.Finishes[2]+roomrawdata.Finishes[3]+roomrawdata.Finishes[4]+4}" colspan="2">${roomrawdata.Calculate.totalsurfacearea.toFixed(2)}</td>
    <td rowspan="${roomrawdata.Finishes[0]+roomrawdata.Finishes[1]+roomrawdata.Finishes[2]+roomrawdata.Finishes[3]+roomrawdata.Finishes[4]+1}" colspan="2">Surface Area of room Element</td>
    </tr>`;
    tr.id='addceil';
    tablerow.appendChild(tr);


    for(let i=0;i<roomrawdata.Finishes.length;i++)
    {
        for(let j=0;j<roomrawdata.Finishes[i];j++)
        {
            if(i==0)
            {
                var tr2=document.createElement('tr');
                tr2.innerHTML=`<tr>
                <td>Ceiling-0${j+1}</td>
                <td>${roomrawdata.Ceiling[j].CeilingArea}</td>
                <td>m<sup>2</sup></td>
              </tr>`
              tablerow.appendChild(tr2);

            }
            else if(i==1)
            {
                var tr2=document.createElement('tr');
                tr2.innerHTML=`<tr>
                <td>Floor-0${j+1}</td>
                <td>${roomrawdata.Floor[j].FloorArea}</td>
                <td>m<sup>2</sup></td>
                </tr>`
                tablerow.appendChild(tr2);
            }
            else if(i==2)
            {
                var tr2=document.createElement('tr');
                tr2.innerHTML=`<tr>
                <td>Wall-0${j+1}</td>
                <td>${roomrawdata.Calculate.onlywall.toFixed(2)}</td>
                <td>m<sup>2</sup></td>
                </tr>`
                tablerow.appendChild(tr2);
            }
            else if(i==3)
            {
                var tr2=document.createElement('tr');
                tr2.innerHTML=`<tr>
                <td>Door-0${j+1}</td>
                <td>${(((roomrawdata.Door[j].DoorWidth / 1000) * (roomrawdata.Door[j].DoorHeigth / 1000)) * (roomrawdata.Door[j].DoorQty)).toFixed(2)}</td>
                <td>m<sup>2</sup></td>
                </tr>`
                tablerow.appendChild(tr2);
            }
            else if(i==4)
            {
                var tr2=document.createElement('tr');
                tr2.innerHTML=`<tr>
                <td>Glazing-0${j+1}</td>
                <td>${(((roomrawdata.Glass[j].GlassWidth / 1000) * (roomrawdata.Glass[j].GlassHeigth / 1000)) * (roomrawdata.Glass[j].GlassQty)).toFixed(2)}</td>
                <td>m<sup>2</sup></td>
                </tr>`
                tablerow.appendChild(tr2);
            }
        }
    }
    var tablerow=document.getElementById('row1');
    var tr=document.createElement('tr');
    tr.innerHTML=`<tr>
        <td colspan="2" rowspan="3" style="text-align:center">Parameters</td>
        <td colspan="2" id="rcv">Room Volume</td>
        <td style="background-color:white">${roomrawdata.Calculate.volume.toFixed(0)}</td>
    </tr>`
    tablerow.appendChild(tr);

    var tablerow=document.getElementById('row1');
    var tr=document.createElement('tr');
    tr.innerHTML=`<tr>
        <td colspan="2">Source to receiver distance in (m)</td>
        <td>${roomrawdata.Calculate.receiverdis.toFixed(1)}</td>
    </tr>`
    tablerow.appendChild(tr);

    var tablerow=document.getElementById('row1');
    var tr=document.createElement('tr');
    tr.innerHTML=`<tr>
        <td colspan="2">Directivity, Q</td>
        <td>${roomrawdata.RoomDirectivity}</td>
    </tr>`
    tablerow.appendChild(tr);
    addcoeff();
}



function addcoeff()
{
    clearrctable('coeffient');
    for(let i=0;i<roomrawdata.Finishes.length;i++)
    {
        for(let j=0;j<roomrawdata.Finishes[i];j++)
        {
            if(i==0)
            {
                var table=document.getElementById('coeffient');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Ceiling-0${j+1}(${roomrawdata.Ceiling[j].CeilingMark})</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][0]}</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][1]}</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][2]}</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][3]}</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][4]}</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][5]}</td>
                <td>${Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][6]}</td>`;
                table.appendChild(tr);

            }
            else if(i==1)
            {
                var table=document.getElementById('coeffient');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Floor-0${j+1}(${roomrawdata.Floor[j].FloorMark})</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][0]}</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][1]}</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][2]}</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][3]}</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][4]}</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][5]}</td>
                <td>${Database_Floor[roomrawdata.Floor[j].FloorMaterial][6]}</td>`;
                table.appendChild(tr);
            }
            else if(i==2)
            {
                var table=document.getElementById('coeffient');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Wall-0${j+1}(${roomrawdata.Wall[j].WallMark})</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][0]}</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][1]}</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][2]}</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][3]}</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][4]}</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][5]}</td>
                <td>${Database_Wall[roomrawdata.Wall[j].WallMaterial][6]}</td>`;
                table.appendChild(tr);
            }
            else if(i==3)
            {
                var table=document.getElementById('coeffient');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Door-0${j+1}(${roomrawdata.Door[j].DoorMark})</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][0]}</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][1]}</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][2]}</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][3]}</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][4]}</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][5]}</td>
                <td>${Database_Door[roomrawdata.Door[j].DoorMaterial][6]}</td>`;
                table.appendChild(tr);
            }
            else if(i==4)
            {
                var table=document.getElementById('coeffient');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Glazing-0${j+1}(${roomrawdata.Glass[j].GlassMark})</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][0]}</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][1]}</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][2]}</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][3]}</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][4]}</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][5]}</td>
                <td>${Database_Glass[roomrawdata.Glass[j].GlassMaterial][6]}</td>`;
                table.appendChild(tr);
            }
        }
    }
roomconstant();
}

function roomconstant()
{
    clearrctable('roomconstant');
    for(let i=0;i<roomrawdata.Finishes.length;i++)
    {
        for(let j=0;j<roomrawdata.Finishes[i];j++)
        {
            if(i==0)
            {
                var table=document.getElementById('roomconstant');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Ceiling-0${j+1}(A1)</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][0])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][1])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][2])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][3])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][4])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][5])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>
                <td>${((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][6])*roomrawdata.Ceiling[j].CeilingArea).toFixed(2)}</td>`
                table.appendChild(tr);

            }
            else if(i==1)
            {
                var table=document.getElementById('roomconstant');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Floor-0${j+1}(A2)</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][0])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][1])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][2])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][3])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][4])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][5])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>
                <td>${((Database_Floor[roomrawdata.Floor[j].FloorMaterial][6])*roomrawdata.Floor[j].FloorArea).toFixed(2)}</td>`;
                table.appendChild(tr);
            }
            else if(i==2)
            {
                var table=document.getElementById('roomconstant');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Wall(A3)</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][0])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][1])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][2])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][3])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][4])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][5])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>
                <td>${((Database_Wall[roomrawdata.Wall[j].WallMaterial][6])*(roomrawdata.Calculate.onlywall)).toFixed(2)}</td>`;
                table.appendChild(tr);
            }
            else if(i==3)
            {
                var table=document.getElementById('roomconstant');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Door-0${j+1}(A4)</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][0]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][1]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][2]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][3]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][4]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][5]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Door[roomrawdata.Door[j].DoorMaterial][6]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000))).toFixed(2)}</td>`;
                table.appendChild(tr);
            }
            else if(i==4)
            {
                var table=document.getElementById('roomconstant');
                var tr=document.createElement('tr');
                tr.innerHTML=`<td>Glazing-0${j+1}(A5)</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][0]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][1]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][2]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][3]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][4]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][5]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>
                <td>${(Database_Glass[roomrawdata.Glass[j].GlassMaterial][6]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000))).toFixed(2)}</td>`;
                table.appendChild(tr);
            }
        }
    }
    totalabsorptioncal();
}

function totalabsorptioncal()
{
    var totalab=[0,0,0,0,0,0,0];
    for(let i=0;i<roomrawdata.Finishes.length;i++)
    {
        for(let j=0;j<roomrawdata.Finishes[i];j++)
        {
            if(i==0)
            {
                totalab[0]=totalab[0]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][0])*(roomrawdata.Ceiling[j].CeilingArea));
                totalab[1]=totalab[1]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][1])*(roomrawdata.Ceiling[j].CeilingArea));
                totalab[2]=totalab[2]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][2])*(roomrawdata.Ceiling[j].CeilingArea));
                totalab[3]=totalab[3]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][3])*(roomrawdata.Ceiling[j].CeilingArea));
                totalab[4]=totalab[4]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][4])*(roomrawdata.Ceiling[j].CeilingArea));
                totalab[5]=totalab[5]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][5])*(roomrawdata.Ceiling[j].CeilingArea));
                totalab[6]=totalab[6]+((Database_Ceiling[roomrawdata.Ceiling[j].CeilingMaterial][6])*(roomrawdata.Ceiling[j].CeilingArea));
            }
            else if(i==1)
            {
                totalab[0]=totalab[0]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][0])*(roomrawdata.Floor[j].FloorArea));
                totalab[1]=totalab[1]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][1])*(roomrawdata.Floor[j].FloorArea));
                totalab[2]=totalab[2]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][2])*(roomrawdata.Floor[j].FloorArea));
                totalab[3]=totalab[3]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][3])*(roomrawdata.Floor[j].FloorArea));
                totalab[4]=totalab[4]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][4])*(roomrawdata.Floor[j].FloorArea));
                totalab[5]=totalab[5]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][5])*(roomrawdata.Floor[j].FloorArea));
                totalab[6]=totalab[6]+((Database_Floor[roomrawdata.Floor[j].FloorMaterial][6])*(roomrawdata.Floor[j].FloorArea));
            }
            else if(i==2)
            {
                totalab[0]=totalab[0]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][0])*(roomrawdata.Calculate.onlywall));
                totalab[1]=totalab[1]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][1])*(roomrawdata.Calculate.onlywall));
                totalab[2]=totalab[2]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][2])*(roomrawdata.Calculate.onlywall));
                totalab[3]=totalab[3]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][3])*(roomrawdata.Calculate.onlywall));
                totalab[4]=totalab[4]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][4])*(roomrawdata.Calculate.onlywall));
                totalab[5]=totalab[5]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][5])*(roomrawdata.Calculate.onlywall));
                totalab[6]=totalab[6]+((Database_Wall[roomrawdata.Wall[j].WallMaterial][6])*(roomrawdata.Calculate.onlywall));
            }
            else if(i==3)
            {
                totalab[0]=totalab[0]+(Database_Door[roomrawdata.Door[j].DoorMaterial][0]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));
                totalab[1]=totalab[1]+(Database_Door[roomrawdata.Door[j].DoorMaterial][1]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));
                totalab[2]=totalab[2]+(Database_Door[roomrawdata.Door[j].DoorMaterial][2]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));
                totalab[3]=totalab[3]+(Database_Door[roomrawdata.Door[j].DoorMaterial][3]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));
                totalab[4]=totalab[4]+(Database_Door[roomrawdata.Door[j].DoorMaterial][4]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));
                totalab[5]=totalab[5]+(Database_Door[roomrawdata.Door[j].DoorMaterial][5]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));
                totalab[6]=totalab[6]+(Database_Door[roomrawdata.Door[j].DoorMaterial][6]*((roomrawdata.Door[j].DoorWidth)/1000*(roomrawdata.Door[j].DoorHeigth/1000)));

            }
            else if(i==4)
            {
                totalab[0]=totalab[0]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][0]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
                totalab[1]=totalab[1]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][1]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
                totalab[2]=totalab[2]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][2]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
                totalab[3]=totalab[3]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][3]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
                totalab[4]=totalab[4]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][4]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
                totalab[5]=totalab[5]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][5]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
                totalab[6]=totalab[6]+(Database_Glass[roomrawdata.Glass[j].GlassMaterial][6]*((roomrawdata.Glass[j].GlassWidth)/1000*(roomrawdata.Glass[j].GlassHeigth/1000)));
            }
        }
    }
    totalabdis(totalab);
}


function totalabdis(totalabv)
{
    var table=document.getElementById('roomconstant');
    var tr=document.createElement('tr');
    tr.innerHTML=`<td>Total Absorption, A(m<sup>2</sup>)</td>
    <td>${totalabv[0].toFixed(2)}</td>
    <td>${totalabv[1].toFixed(2)}</td>
    <td>${totalabv[2].toFixed(2)}</td>
    <td>${totalabv[3].toFixed(2)}</td>
    <td>${totalabv[4].toFixed(2)}</td>
    <td>${totalabv[5].toFixed(2)}</td>
    <td>${totalabv[6].toFixed(2)}</td>`;
    table.appendChild(tr);

    avgabcoe(totalabv);
}

function avgabcoe(ab){
    var table=document.getElementById('roomconstant');
    var tr=document.createElement('tr');
    tr.innerHTML=`<td>Avg. Absorption co-efficient, α<sub>avg</sub></td>
    <td>${(ab[0]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>
    <td>${(ab[1]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>
    <td>${(ab[2]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>
    <td>${(ab[3]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>
    <td>${(ab[4]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>
    <td>${(ab[5]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>
    <td>${(ab[6]/roomrawdata.Calculate.totalsurfacearea).toFixed(2)}</td>`;
    table.appendChild(tr);

    var avgabcoev=[0,0,0,0,0,0,0];
    avgabcoev[0]=ab[0]/roomrawdata.Calculate.totalsurfacearea;
    avgabcoev[1]=ab[1]/roomrawdata.Calculate.totalsurfacearea;
    avgabcoev[2]=ab[2]/roomrawdata.Calculate.totalsurfacearea;
    avgabcoev[3]=ab[3]/roomrawdata.Calculate.totalsurfacearea;
    avgabcoev[4]=ab[4]/roomrawdata.Calculate.totalsurfacearea;
    avgabcoev[5]=ab[5]/roomrawdata.Calculate.totalsurfacearea;
    avgabcoev[6]=ab[6]/roomrawdata.Calculate.totalsurfacearea;

    roomcon(avgabcoev);
}

function roomcon(rcv)
{
    var table=document.getElementById('roomconstant');
    var tr=document.createElement('tr');
    tr.innerHTML=`<td>Room Constant, R<sub>c</sub> (m<sup>2</sup>)</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[0])/(1-rcv[0])).toFixed(2)}</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[1])/(1-rcv[1])).toFixed(2)}</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[2])/(1-rcv[2])).toFixed(2)}</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[3])/(1-rcv[3])).toFixed(2)}</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[4])/(1-rcv[4])).toFixed(2)}</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[5])/(1-rcv[5])).toFixed(2)}</td>
    <td>${((roomrawdata.Calculate.totalsurfacearea*rcv[6])/(1-rcv[6])).toFixed(2)}</td>`;
    table.appendChild(tr);

    var roomcon=[0,0,0,0,0,0,0];
    roomcon[0]=((roomrawdata.Calculate.totalsurfacearea*rcv[0])/(1-rcv[0]));
    roomcon[1]=((roomrawdata.Calculate.totalsurfacearea*rcv[1])/(1-rcv[1]));
    roomcon[2]=((roomrawdata.Calculate.totalsurfacearea*rcv[2])/(1-rcv[2]));
    roomcon[3]=((roomrawdata.Calculate.totalsurfacearea*rcv[3])/(1-rcv[3]));
    roomcon[4]=((roomrawdata.Calculate.totalsurfacearea*rcv[4])/(1-rcv[4]));
    roomcon[5]=((roomrawdata.Calculate.totalsurfacearea*rcv[5])/(1-rcv[5]));
    roomcon[6]=((roomrawdata.Calculate.totalsurfacearea*rcv[6])/(1-rcv[6]));

    displaytspl(roomcon);
}

function displaytspl(input)
{
    clearrctable('rcresult');
    var table=document.getElementById('rcresult');
    var tr=document.createElement('tr');
    tr.innerHTML=`<td>① Total Sound Power Level L<sub>w</sub>, dB </td>
    <td>${roomrawdata.rcpowerval[0]}</td>
    <td>${roomrawdata.rcpowerval[1]}</td>
    <td>${roomrawdata.rcpowerval[2]}</td>
    <td>${roomrawdata.rcpowerval[3]}</td>
    <td>${roomrawdata.rcpowerval[4]}</td>
    <td>${roomrawdata.rcpowerval[5]}</td>
    <td>${roomrawdata.rcpowerval[6]}</td>`;
    table.appendChild(tr);

    roomcorrection(input);
}


function rocovalue(a,b,c)
{
    var temp=10*Math.log10((a/(4*Math.PI*Math.pow(b,2)))+(4/c))
    if(temp<0)
    {
        return temp;
    }
    else{
        return 0;
    }
    
}

function roomcorrection(inputs)
{
    var table=document.getElementById('rcresult');
    var tr=document.createElement('tr');
    tr.innerHTML=`<td>② Room Correction</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[0]).toFixed(2)}</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[1]).toFixed(2)}</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[2]).toFixed(2)}</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[3]).toFixed(2)}</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[4]).toFixed(2)}</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[5]).toFixed(2)}</td>
    <td>${rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[6]).toFixed(2)}</td>`;
    table.appendChild(tr);

    rcvalue=[0,0,0,0,0,0,0];
    rcvalue[0]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[0]);
    rcvalue[1]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[1]);
    rcvalue[2]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[2]);
    rcvalue[3]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[3]);
    rcvalue[4]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[4]);
    rcvalue[5]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[5]);
    rcvalue[6]=rocovalue(roomrawdata.RoomDirectivity,roomrawdata.Calculate.receiverdis,inputs[6]);

    rcspl(rcvalue);
}

function rcspl(inputs)
{
    var table=document.getElementById('rcresult');
    var tr=document.createElement('tr');
    tr.innerHTML=`<td>③=①+② Total Sound Pressure Level L<sub>P</sub>, dB </td>
    <td>${(roomrawdata.rcpowerval[0]+inputs[0]).toFixed(2)}</td>
    <td>${(roomrawdata.rcpowerval[1]+inputs[1]).toFixed(2)}</td>
    <td>${(roomrawdata.rcpowerval[2]+inputs[2]).toFixed(2)}</td>
    <td>${(roomrawdata.rcpowerval[3]+inputs[3]).toFixed(2)}</td>
    <td>${(roomrawdata.rcpowerval[4]+inputs[4]).toFixed(2)}</td>
    <td>${(roomrawdata.rcpowerval[5]+inputs[5]).toFixed(2)}</td>
    <td>${(roomrawdata.rcpowerval[6]+inputs[6]).toFixed(2)}</td>`;
    table.appendChild(tr);
}
