let rawdata={};
/****************Path count************/
var spacecount=0;
var pathcount=0;
/****************************/
let pathposition=0;
let Elementposition=0;
/****************** */

function getspace(){
    hideall();
    space(document.getElementById("spacename").value,document.getElementById("spacenc").value);
}
function getpath()
{
    hideall();
    path(document.getElementById("pathname").value,document.getElementById("pathtype").value);
}
function getrectvalue(){
    hideall();
    var width=document.getElementById("rectductwidth").value;
    var height=document.getElementById("rectductheight").value;
    var length=document.getElementById("rectductlength").value;
    var thick=document.getElementById("rectductthick").value;
    var air=document.getElementById("rectductair").value;
    rectduct(width,height,length,thick,air);
}
function getcirduct()
{
    hideall();
    var dia=document.getElementById("cirductdia").value;
    var length=document.getElementById("cirductlength").value;
    var thick=document.getElementById("cirductthick").value;
    var air=document.getElementById("cirductair").value;
    cirduct(dia,length,thick,air);
}


function space(sname,nc)
{
    spacecount=spacecount+1;
    if(spacecount==1){
        rawdata={"Space":sname,"NC":nc,"paths":[]};
        displaytable();
    }
    else{
        errorbox("You don't add Another Space. You add one Space at a time..!");
    }
    
}
function verifypath(pathnames)
{
    if(rawdata.paths.length>0)
    {
        var  temp=false;
        for(let i=0;i<rawdata.paths.length;i++)
        {
            if(rawdata.paths[i].pathname==pathnames)
            {
                temp=false;
            }
            else{
                temp=true;
            }
        }
        return temp;
    }
    else{
        return true;
    }
}
function path(pname,pathType)
{
    if(spacecount>0)
    {
        if(verifypath(pname)==true)
        {
            pathcount=pathcount+1;
            var temp={"pathname":pname,"pathtype":pathType,"pathComp":[]};
            rawdata.paths.push(temp);
            Elementposition=0;
            displaytable();
        }
        else{
            errorbox(`You Already have Path:${pname}`);
        }
    }
    else{
        errorbox("You don't add Path without Space..!");
    }
    
}

function rectduct(width,height,length,linear,air)
{
    if(pathcount>0)
    {
        var temp={"Component":"Rectangle Duct","Width":width,"Height":height,"Length":length,"Thickness":linear,"AirVolume":air,"powValue":{"F63":45,"F125":46,"F250":47,"F500":48,"F1000":49,"F2000":50,"F4000":51}}
        rawdata.paths[pathposition].pathComp.splice(Elementposition,0,temp);
        Elementposition=Elementposition+1;
        displaytable();
    }
    else{
        errorbox("You don't add Element without Path...!");
    }
}

function cirduct(diameter,length,linear,air)
{
    if(pathcount>0)
    {
        var temp={"Component":"Circular Duct","Diameter":diameter,"Length":length,"Thickness":linear,"AirVolume":air,"powValue":{"F63":45,"F125":46,"F250":47,"F500":48,"F1000":49,"F2000":50,"F4000":51}}
        rawdata.paths[pathposition].pathComp.splice(Elementposition,0,temp);
        Elementposition=Elementposition+1;
        displaytable();
    }
    else{
        errorbox("You don't add Element without Path...!");
    }
}




