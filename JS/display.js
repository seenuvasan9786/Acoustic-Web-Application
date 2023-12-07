function displayclear(){
    const table=document.getElementById('workresult');
    const tbodyElements=table.querySelectorAll('tbody');
    tbodyElements.forEach(tbody =>{
        tbody.remove();
    });
}


function displaytable(){

    displayclear();//To clear all existing Table

    /* Show the Space child in the Table */
    var spacetable=document.getElementById('workresult');
    var spacebody=document.createElement('tbody');
    spacebody.className='tablebody Space';
    var spacerow=document.createElement('tr');
    spacerow.innerHTML = `
        <td>${rawdata.Space}</td>
        <td>Criteria:NC-${rawdata.NC}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>`;
    spacebody.appendChild(spacerow);
    spacetable.appendChild(spacebody);


    /**Show the Path Child into the Table */
    for(let i=0;i<rawdata.paths.length;i++)
    {
        var pathtable=document.getElementById('workresult');
        var pathbody=document.createElement('tbody');
        pathbody.className=`tablebody ${rawdata.paths[i].pathname}`;
        var pathrow=document.createElement('tr');
        pathrow.innerHTML = `
        <td>${rawdata.paths[i].pathtype} (${rawdata.paths[i].pathname})</td>
        <td>Criteria:NC-${rawdata.NC}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>`;
        pathbody.appendChild(pathrow);

        /**Show the Element child into the table */
        for(let j=0;j<rawdata.paths[i].pathComp.length;j++)
        {
            if(rawdata.paths[i].pathComp[j].Component=="Rectangle Duct")
            {
                var Elementrow=document.createElement("tr");
                Elementrow.innerHTML = `
                <td>${rawdata.paths[i].pathComp[j].Component}</td>
                <td>${rawdata.paths[i].pathComp[j].Width}x${rawdata.paths[i].pathComp[j].Height}x${rawdata.paths[i].pathComp[j].Length} (${rawdata.paths[i].pathComp[j].Thickness})</td>
                <td></td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F63}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F125}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F250}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F500}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F1000}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F2000}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F4000}</td>
                <td>${6}</td>`;
                pathbody.appendChild(Elementrow);
            }
            else if(rawdata.paths[i].pathComp[j].Component=="Circular Duct")
            {
                var Elementrow=document.createElement("tr");
                var Elementrow=document.createElement("tr");
                Elementrow.innerHTML = `
                <td>${rawdata.paths[i].pathComp[j].Component}</td>
                <td>${rawdata.paths[i].pathComp[j].Diameter}x${rawdata.paths[i].pathComp[j].Length} (${rawdata.paths[i].pathComp[j].Thickness})</td>
                <td></td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F63}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F125}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F250}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F500}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F1000}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F2000}</td>
                <td>${rawdata.paths[i].pathComp[j].powValue.F4000}</td>
                <td>${6}</td>`;
                pathbody.appendChild(Elementrow);
            }
        }
        pathtable.appendChild(pathbody);
    }
    /**This Part will be for call any function to activate */
    findindex();//it will be follow the index value of the table. and keep selected row.    
    showactive();
    editcomponent();
}