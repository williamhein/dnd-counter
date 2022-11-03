//background: radial-gradient(ellipse at bottom, #0b4386 0%, #1a266b 100%);

var counterContainer = document.getElementById("counterContainer");

var alertBGElm = document.createElement("div");
alertBGElm.style.position = "fixed";
alertBGElm.style.top = "-10vh";
alertBGElm.style.right = "0";
alertBGElm.style.margin = "0";
alertBGElm.style.background = "rgba(0, 0, 0, 0.45)";
alertBGElm.style.width = "100%";
alertBGElm.style.height = "110vh";
alertBGElm.style.display = "block";
alertBGElm.style.zIndex = "1000000000";
alertBGElm.onclick = function() 
{
    Alert("d");
};

document.body.appendChild(alertBGElm);

var alertFGElm = document.createElement("div");
alertFGElm.style.position = "fixed";
alertFGElm.style.top = "10%";
alertFGElm.style.right = "10%";
alertFGElm.style.margin = "0";
alertFGElm.style.backgroundImage = "linear-gradient(180deg, #f7ebcb, #dbd0af)";
alertFGElm.style.border = "6px burlywood outset";
alertFGElm.style.width = "80%";
alertFGElm.style.height = "80%";
alertFGElm.style.boxSizing = "border-box";
alertFGElm.onclick = function()
{
    event.stopPropagation();
};

alertBGElm.appendChild(alertFGElm);

var alertXElm = document.createElement("div");
alertXElm.innerHTML = "X";
alertXElm.style.color = "white";
alertXElm.style.position = "fixed";
alertXElm.style.bottom = "90%";
alertXElm.style.right = "10%";
alertXElm.style.margin = "0";
alertXElm.style.border = "0";
alertXElm.style.width = "5%";
alertXElm.style.height = "5%";
alertXElm.style.boxSizing = "border-box";
alertXElm.className = "br";
alertXElm.onclick = function()
{
    Alert("d");
};

alertBGElm.appendChild(alertXElm);

var counters =[];
var profiles = [];
var currentProfile = "";
var mode = "inc"; //inc, reorder, addsub

function Counter(name, value, maxValue, type, rest, profile="Default")
{
    this.name = name;
    this.value = value;
    this.maxValue = maxValue;
    this.type = type;
    this.rest = rest; //vaules = "short", "long", "none", "resetLong", "resetShort", "halfLong"
    this.profile = profile;
}

function IsNextInstanceProfile(index)
{
    for (var i = index + 1; i < counters.length; i++)
        if (counters[i].profile == currentProfile)
            return true;
    return false;
}


function DrawCounters(save = true)
{
    counterContainer.innerHTML = '<h1 style="position: sticky; top: 0; background-color: #f7ebcb; cursor: pointer; z-index: 1000000000;" onclick="counterContainer.scroll({top: 0, behavior: \'smooth\'});" ondblclick="HideOtherElements();" title="Go to top.">Counters</h1>';//onclick="if (document.getElementById(\'s0\')) document.getElementById(\'s0\').scrollIntoView({behavior: \'smooth\'});" title="Go to top.">Counters</h1>';

    var restContainerElm = document.createElement("div");
    restContainerElm.style.margin = "0";
    restContainerElm.style.position = "relative";
    restContainerElm.style.left = "2.5%";
    restContainerElm.style.height = "7.5%";
    restContainerElm.style.width = "95%";
    restContainerElm.style.borderBottom = "4px tan dotted";

    var shortElem = document.createElement("div");
        shortElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        shortElem.style.width = "35%";
        shortElem.style.height = "90%";
        shortElem.style.position = "absolute";
        shortElem.style.top = "0";
        shortElem.style.left = "15%";
        shortElem.style.color = "white";
        shortElem.style.fontWeight = "bold";
        shortElem.style.textAlign = "center";
        shortElem.style.boxSizing = "border-box";
        shortElem.style.backgroundColor = "#327ba8";
        shortElem.style.border = "4px burlywood outset";
        shortElem.style.borderRadius = "6px";
        shortElem.innerHTML = "Short <br> Rest";
        shortElem.className = "br";
        shortElem.setAttribute("onclick","Rest(\"short\");");

    var longElem = document.createElement("div");
        longElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        longElem.style.width = "35%";
        longElem.style.height = "90%";
        longElem.style.position = "absolute";
        longElem.style.top = "0";
        longElem.style.right = "15%";
        longElem.style.color = "white";
        longElem.style.fontWeight = "bold";
        longElem.style.textAlign = "center";
        longElem.style.boxSizing = "border-box";
        longElem.style.backgroundColor = "#327ba8";
        longElem.style.border = "4px burlywood outset";
        longElem.style.borderRadius = "6px";
        longElem.innerHTML = "Long <br> Rest";
        longElem.className = "br";
        longElem.setAttribute("onclick","Rest(\"long\");");

    restContainerElm.appendChild(shortElem);
    restContainerElm.appendChild(longElem);
    counterContainer.appendChild(restContainerElm);

    profiles = [];

    for(var i = 0; i < counters.length; i++)
    {
        //console.log(counters[i].profile);
        if (counters[i].profile == undefined)
            counters[i].profile = "Default";

        profiles.push(counters[i].profile);
        profiles = [...new Set(profiles)];
        if (counters[i].profile != currentProfile)
            continue;

        var lengthPercent = 55;

        var intPersonalElm = document.createElement("div");
        intPersonalElm.style.margin = "0";
        intPersonalElm.style.position = "relative";
        intPersonalElm.style.left = "2.5%";
        intPersonalElm.style.height = "20%";
        intPersonalElm.style.width = "95%";
        if (IsNextInstanceProfile(i)) intPersonalElm.style.borderBottom = "4px tan dotted";
        //console.log(IsNextInstanceProfile(i) + " " + i);
        
        var nameElm = document.createElement("h2");
        nameElm.id = "s" + i;
        nameElm.innerHTML = counters[i].name;
        nameElm.style.position = "absolute";
        nameElm.style.margin = "0";
        nameElm.style.left = "0%";
        nameElm.style.top = "10%";
        nameElm.style.height = "30%";
        nameElm.style.width = "50%";
        nameElm.style.whiteSpace = "normal";
        nameElm.style.wordWrap = "break-word";
        nameElm.setAttribute("onclick","Alert(" + i + ");");

        var incElem = document.createElement("div");
        incElem.innerHTML = "+";
        incElem.style.position = "absolute";
        incElem.style.margin = "0";
        incElem.style.left = "0%";
        incElem.style.bottom = "50%";

        var blockContainerElem = document.createElement("div");
        blockContainerElem.style.position = "absolute";
        blockContainerElem.style.bottom = "5%";
        blockContainerElem.style.height = "45%";
        blockContainerElem.style.width = "100%"
        blockContainerElem.style.margin = "0";

        //blocks
        if (counters[i].type == "b")
        {
            for (var j = 0; j < counters[i].maxValue; j++)
            {
                var spacing = 2 - Math.min(Math.floor(counters[i].maxValue/20),2);
                var width = ((100 / counters[i].maxValue) - spacing);

                var blockElem = document.createElement("div");
                blockElem.id = "c" + i + "b" + j;
                blockElem.setAttribute("onclick","ChangeCountBlockClick("+ i + "," + j +");");
                blockElem.innerHTML = "";
                blockElem.style.position = "absolute";
                blockElem.style.height = "100%";
                blockElem.style.width = width + "%";
                blockElem.style.margin = "0";
                blockElem.style.left = (j * spacing + width * j) + "%";
                blockElem.style.backgroundColor = (j < counters[i].value) ? "darkgreen" : "#7a2b17";
                blockElem.style.border = "4px burlywood " +  ((j < counters[i].value) ? "outset" : "inset");
                blockElem.style.borderRadius = "6px";
                blockElem.style.boxSizing = "border-box";
                blockContainerElem.appendChild(blockElem);
            }
        }
        //animated blocks
        else if (counters[i].type == "s")
        {
            for (var j = 0; j < counters[i].maxValue; j++)
            {
                var spacing = 2 - Math.min(Math.floor(counters[i].maxValue/20),2);
                var width = ((100 / counters[i].maxValue) - spacing);

                var blockElem = document.createElement("div");
                blockElem.id = "c" + i + "b" + j;
                blockElem.setAttribute("onclick","ChangeCountBlockClick("+ i + "," + j +");");
                blockElem.innerHTML = "";
                blockElem.style.position = "absolute";
                blockElem.style.height = "100%";
                blockElem.style.width = width + "%";
                blockElem.style.margin = "0";
                blockElem.style.left = (j * spacing + width * j) + "%";
                blockElem.style.border = "4px burlywood " +  ((j < counters[i].value) ? "outset" : "inset");
                blockElem.style.borderRadius = "6px";
                blockElem.style.boxSizing = "border-box";
                if (j < counters[i].value)
                {
                    blockElem.style.background = 'radial-gradient(ellipse at bottom, #0b4386 0%, #1a266b 100%)';
                    blockElem.style.overflow = "hidden";

                    var conBlockElem = document.createElement("div");
                    conBlockElem.style.height = "100%";
                    conBlockElem.style.width = "100%";
                    //conBlockElem.style.backgroundImage = 'url(https://media0.giphy.com/media/3ohhwoER829Q2hWwx2/giphy.gif?cid=6c09b9526071c471feb5a9c483d65e32e636236e7907b9fc&rid=giphy.gif&ct=s)';
                    conBlockElem.style.backgroundImage = 'url(https://i.gifer.com/4s2J.gif)';
                    conBlockElem.style.backgroundSize = "contain";
                    conBlockElem.style.backgroundPosition = "center";
                    conBlockElem.style.backgroundRepeat = "no-repeat";
                    blockElem.appendChild(conBlockElem);
                    /*
                    blockElem.style.overflow = "hidden";
                    var starsElem = document.createElement("div");
                    starsElem.className = "stars";

                    for (var k = 0; k < 45; k++)
                    {
                        var starElem = document.createElement("div");
                        starElem.className = "star";
                        starsElem.appendChild(starElem);
                    }

                    blockElem.appendChild(starsElem);
                    */
                }
                else
                blockElem.style.backgroundColor =  "#7a2b17";
                blockContainerElem.appendChild(blockElem);
            }
        }
        //animated blocks
        else if (counters[i].type == "m")
        {
            for (var j = 0; j < counters[i].maxValue; j++)
            {
                var spacing = 2 - Math.min(Math.floor(counters[i].maxValue/20),2);
                var width = ((100 / counters[i].maxValue) - spacing);

                var blockElem = document.createElement("div");
                blockElem.id = "c" + i + "b" + j;
                blockElem.setAttribute("onclick","ChangeCountBlockClick("+ i + "," + j +");");
                blockElem.innerHTML = "";
                blockElem.style.position = "absolute";
                blockElem.style.height = "100%";
                blockElem.style.width = width + "%";
                blockElem.style.margin = "0";
                blockElem.style.left = (j * spacing + width * j) + "%";
                blockElem.style.border = "4px burlywood " +  ((j < counters[i].value) ? "outset" : "inset");
                blockElem.style.borderRadius = "6px";
                blockElem.style.boxSizing = "border-box";
                if (j < counters[i].value)
                {
                    blockElem.style.background = 'radial-gradient(ellipse at bottom, #0b4386 0%, #1a266b 100%)';
                    blockElem.style.overflow = "hidden";

                    var conBlockElem = document.createElement("div");
                    conBlockElem.style.height = "100%";
                    conBlockElem.style.width = "100%";
                    //conBlockElem.style.backgroundImage = 'url(https://media0.giphy.com/media/3ohhwoER829Q2hWwx2/giphy.gif?cid=6c09b9526071c471feb5a9c483d65e32e636236e7907b9fc&rid=giphy.gif&ct=s)';
                    conBlockElem.style.backgroundImage = 'url(https://media1.giphy.com/media/h7uTwqEHysbd2lhyDP/giphy.gif?cid=6c09b9521a5ed097fd15b95152c2435599395907455f3cd2&rid=giphy.gif&ct=s)';
                    conBlockElem.style.backgroundSize = "contain";
                    conBlockElem.style.backgroundPosition = "center";
                    conBlockElem.style.backgroundRepeat = "no-repeat";
                    blockElem.appendChild(conBlockElem);
                    /*
                    blockElem.style.overflow = "hidden";
                    var starsElem = document.createElement("div");
                    starsElem.className = "bubbles";

                    for (var k = 0; k < 45; k++)
                    {
                        var starElem = document.createElement("div");
                        starElem.className = "bubble";
                        starsElem.appendChild(starElem);
                    }

                    blockElem.appendChild(starsElem);
                    */
                }
                else
                blockElem.style.backgroundColor =  "#7a2b17";
                blockContainerElem.appendChild(blockElem);
            }
        }
        //continuous (for health specifically)
        else if (counters[i].type == "c")
        {
            var healthBGElm = document.createElement("div");
            healthBGElm.style.position = "absolute";
            healthBGElm.style.left = "0%";
            healthBGElm.style.top = "0%";
            healthBGElm.style.boxSizing = "border-box";
            healthBGElm.style.height = "100%";
            healthBGElm.style.width = "100%";
            healthBGElm.style.backgroundColor = "#7a2b17";
            healthBGElm.style.border = "6px burlywood ridge";
            healthBGElm.style.borderRadius = "6px";
            
            var healthFGElm = document.createElement("div");
            healthFGElm.style.position = "absolute";
            healthFGElm.style.left = "0%";
            healthFGElm.style.top = "0%";
            healthFGElm.style.boxSizing = "border-box";
            healthFGElm.style.height = "100%";
            healthFGElm.style.width = (counters[i].value/counters[i].maxValue*100) + "%";
            healthFGElm.style.backgroundColor = "darkgreen";
            healthFGElm.style.borderTop = "6px burlywood ridge";
            healthFGElm.style.borderBottom = "6px burlywood ridge";
            healthFGElm.style.borderLeft = "6px burlywood ridge";
            healthFGElm.style.borderRadius = "6px " + ((counters[i].value == counters[i].maxValue)?"6px 6px ":"0px 0px ") + "6px";
            if (counters[i].value == counters[i].maxValue) healthFGElm.style.borderRight= "6px burlywood ridge";

            blockContainerElem.appendChild(healthBGElm);
            if (counters[i].value != 0) blockContainerElem.appendChild(healthFGElm);
        }

        var incControlsElem = document.createElement("div");
        //number only, no graphic
        if (counters[i].type == "n")
        {
            incControlsElem.style.width = "100%";
            incControlsElem.style.height = "100%";
            incControlsElem.style.position = "absolute";
            incControlsElem.style.top = "0";
            incControlsElem.style.left = "0";

            blockContainerElem.appendChild(incControlsElem);
        }
        else
        {
            incControlsElem.style.width = "40%";
            incControlsElem.style.height = "25%";
            incControlsElem.style.position = "absolute";
            incControlsElem.style.top = "10%";
            incControlsElem.style.right = "0";
            
            intPersonalElm.appendChild(incControlsElem);
        }

        var minusElem = document.createElement("div");
        if (mode == "reorder") minusElem.setAttribute("onclick","Reorder("+ i + ",false);");
        else if (mode == "addsub") minusElem.setAttribute("onclick","ChangeCountAddSub("+ i + ",false);");
        else minusElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        minusElem.style.width = "25%";
        minusElem.style.height = "100%";
        minusElem.style.position = "absolute";
        minusElem.style.top = "0";
        minusElem.style.left = "0";
        minusElem.style.color = "white";
        minusElem.style.fontWeight = "bold";
        minusElem.style.fontFamily = "'Courier New', serif";
        minusElem.style.textAlign = "center";
        minusElem.style.boxSizing = "border-box";
        minusElem.style.backgroundColor = "#327ba8";
        minusElem.style.border = "4px burlywood outset";
        minusElem.style.borderRadius = "6px";
        if (mode == "reorder") minusElem.innerHTML = "&darr;";
        else minusElem.innerHTML = "-";
        minusElem.className = "br";

        var addElem = document.createElement("div");
        if (mode == "reorder") addElem.setAttribute("onclick","Reorder("+ i + ",true);");
        else if (mode == "addsub") addElem.setAttribute("onclick","ChangeCountAddSub("+ i + ",true);");
        else addElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",true);");
        addElem.style.width = "25%";
        addElem.style.height = "100%";
        addElem.style.position = "absolute";
        addElem.style.top = "0";
        addElem.style.left = "75%";
        addElem.style.color = "white";
        addElem.style.fontWeight = "bold";
        addElem.style.fontFamily = "'Courier New', serif";
        addElem.style.textAlign = "center";
        addElem.style.boxSizing = "border-box";
        addElem.style.backgroundColor = "#327ba8";
        addElem.style.border = "4px burlywood outset";
        addElem.style.borderRadius = "6px";
        if (mode == "reorder") addElem.innerHTML = "&uarr;";
        else addElem.innerHTML = "+";
        addElem.className = "br";

        var numElem = document.createElement("div");
        numElem.innerHTML = counters[i].value;
        numElem.style.textAlign = "center";
        numElem.style.width = "45%";
        numElem.style.height = "100%";
        numElem.style.position = "absolute";
        numElem.style.top = "0";
        numElem.style.left = "27.5%";
        numElem.style.color = "black";
        numElem.style.fontWeight = "bold";
        numElem.style.textAlign = "center";
        numElem.style.boxSizing = "border-box";
        numElem.style.backgroundColor = "white";
        numElem.style.border = "4px burlywood inset";
        numElem.style.borderRadius = "6px";
        numElem.className = "br";
        numElem.readOnly = "true";

        incControlsElem.appendChild(numElem);
        incControlsElem.appendChild(addElem);
        incControlsElem.appendChild(minusElem);


        intPersonalElm.appendChild(nameElm);
        intPersonalElm.appendChild(blockContainerElem);
        counterContainer.appendChild(intPersonalElm);
    }
    var addCContainerElm = document.createElement("div");
        addCContainerElm.style.margin = "0";
        addCContainerElm.style.marginTop = "10px";
        addCContainerElm.style.position = "sticky";
        addCContainerElm.style.bottom = "0"
        addCContainerElm.style.left = "0%";
        addCContainerElm.style.height = "7%";
        addCContainerElm.style.width = "95%";
        //addCContainerElm.style.borderTop = "10px tan double";
        //addCContainerElm.style.borderBottom = "10px tan double";
        //addCContainerElm.style.borderRight = "4px tan solid";
        //addCContainerElm.style.borderLeft = "4px tan solid";
        addCContainerElm.style.border = "6px burlywood ridge";
        addCContainerElm.style.background = "#dbd0af";

    var addCElem = document.createElement("div");
        addCElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        var centeringElm = document.createElement("div");
            centeringElm.style.position = "absolute"; 
            centeringElm.style.right = "10%";
            centeringElm.style.bottom = "10%";
            centeringElm.style.height = "80%";
            centeringElm.style.width = "80%";
            centeringElm.className = "br";
            centeringElm.style.color = "white";
            centeringElm.style.fontWeight = "bold";
            centeringElm.style.textAlign = "center";
            centeringElm.innerHTML = "Add";
            addCElem.appendChild(centeringElm);
        addCElem.style.width = "28%";
        addCElem.style.height = "85%";
        addCElem.style.position = "absolute";
        addCElem.style.top = "5%";
        addCElem.style.left = "36%";
        addCElem.style.boxSizing = "border-box";
        addCElem.style.backgroundColor = "darkgoldenrod";
        addCElem.style.border = "4px burlywood outset";
        addCElem.style.borderRadius = "6px";
        addCElem.setAttribute("onclick","Alert('Add');");

    var reorderCElem = document.createElement("div");
        reorderCElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        reorderCElem.className = "br";
        reorderCElem.style.color = "white";
        reorderCElem.style.fontWeight = "bold";
        reorderCElem.style.textAlign = "center";
        reorderCElem.style.wordWrap = "break-word";
        reorderCElem.innerHTML = "Mode:<br>" + ((mode == "reorder")?"Sorting":((mode == "addsub")?"Add/Sub":"Increment"));
        reorderCElem.style.width = "28%";
        reorderCElem.style.height = "85%";
        reorderCElem.style.position = "absolute";
        reorderCElem.style.top = "5%";
        reorderCElem.style.left = "4%";
        reorderCElem.style.boxSizing = "border-box";
        reorderCElem.style.backgroundColor = "darkgoldenrod";//((mode == "reorder")?"":((mode == "addsub")?"":""));
        reorderCElem.style.border = "4px burlywood outset";
        reorderCElem.style.borderRadius = "6px";
        reorderCElem.setAttribute("onclick","NextMode(); DrawCounters();");

    var profileElem = document.createElement("div");
        profileElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        profileElem.className = "br";
        profileElem.style.color = "white";
        profileElem.style.fontWeight = "bold";
        profileElem.style.textAlign = "center";
        profileElem.style.wordWrap = "break-word";
        profileElem.innerHTML = "Profile:<br>" + currentProfile;
        profileElem.style.width = "28%";
        profileElem.style.height = "85%";
        profileElem.style.position = "absolute";
        profileElem.style.top = "5%";
        profileElem.style.right = "4%";
        profileElem.style.boxSizing = "border-box";
        profileElem.style.backgroundColor = "darkgoldenrod";//((mode == "reorder")?"":((mode == "addsub")?"":""));
        profileElem.style.border = "4px burlywood outset";
        profileElem.style.borderRadius = "6px";
        profileElem.setAttribute("onclick","NextProfile(); DrawCounters(); setTimeout(function() {counterContainer.scroll({ top: 0, behavior: \"smooth\"});}, 50 );");
        profileElem.setAttribute("ondblclick","Alert('Profiles');");

    addCContainerElm.appendChild(reorderCElem);
    addCContainerElm.appendChild(addCElem);
    addCContainerElm.appendChild(profileElem);
    counterContainer.appendChild(addCContainerElm);

    var impExContainerElm = document.createElement("div");
        impExContainerElm.style.margin = "0";
        impExContainerElm.style.marginTop = "6px";
        impExContainerElm.style.position = "relative";
        impExContainerElm.style.left = "0%";
        impExContainerElm.style.height = "6%";
        impExContainerElm.style.width = "95%";
        //impExContainerElm.style.borderBottom = "4px tan solid";
        //impExContainerElm.style.borderRight = "4px tan solid";
        //impExContainerElm.style.borderLeft = "4px tan solid";
        impExContainerElm.style.border = "6px burlywood ridge";
        impExContainerElm.style.background = "#dbd0af";

    var importCElem = document.createElement("div");
        importCElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        var iCenteringElm = document.createElement("div");
            iCenteringElm.style.position = "absolute"; 
            iCenteringElm.style.right = "10%";
            iCenteringElm.style.bottom = "10%";
            iCenteringElm.style.height = "80%";
            iCenteringElm.style.width = "80%";
            iCenteringElm.className = "br";
            iCenteringElm.style.color = "white";
            iCenteringElm.style.fontWeight = "bold";
            iCenteringElm.style.textAlign = "center";
            iCenteringElm.innerHTML = "Import";
            importCElem.appendChild(iCenteringElm);
        importCElem.style.width = "24%";
        importCElem.style.height = "85%";
        importCElem.style.position = "absolute";
        importCElem.style.top = "5%";
        importCElem.style.left = "2%";
        importCElem.style.boxSizing = "border-box";
        importCElem.style.backgroundColor = "darkcyan";
        importCElem.style.border = "4px burlywood outset";
        importCElem.style.borderRadius = "6px";
        importCElem.setAttribute("onclick","ImportCookies();");
        impExContainerElm.appendChild(importCElem);

    var exportCElem = document.createElement("div");
        exportCElem.setAttribute("onclick","ChangeCountIncClick("+ i + ",false);");
        var eCenteringElm = document.createElement("div");
            eCenteringElm.style.position = "absolute"; 
            eCenteringElm.style.right = "10%";
            eCenteringElm.style.bottom = "10%";
            eCenteringElm.style.height = "80%";
            eCenteringElm.style.width = "80%";
            eCenteringElm.className = "br";
            eCenteringElm.style.color = "white";
            eCenteringElm.style.fontWeight = "bold";
            eCenteringElm.style.textAlign = "center";
            eCenteringElm.innerHTML = "Export";
            exportCElem.appendChild(eCenteringElm);
        exportCElem.style.width = "24%";
        exportCElem.style.height = "85%";
        exportCElem.style.position = "absolute";
        exportCElem.style.top = "5%";
        exportCElem.style.left = "28%";
        exportCElem.style.boxSizing = "border-box";
        exportCElem.style.backgroundColor = "darkcyan";
        exportCElem.style.border = "4px burlywood outset";
        exportCElem.style.borderRadius = "6px";
        exportCElem.setAttribute("onclick","ExportCookies();");
        impExContainerElm.appendChild(exportCElem);


        var hideShowElem = document.createElement("div");
            hideShowElem.style.width = "18%";
            hideShowElem.style.height = "85%";
            hideShowElem.style.position = "absolute";
            hideShowElem.style.top = "5%";
            hideShowElem.style.right = "2%";
            hideShowElem.style.boxSizing = "border-box";
            hideShowElem.style.backgroundColor = "darkolivegreen";
            hideShowElem.style.border = "4px burlywood outset";
            hideShowElem.style.borderRadius = "6px";
            hideShowElem.setAttribute("onclick","HideOtherElements(); DrawCounters(false);");
            var hCenteringElm = document.createElement("div");
                hCenteringElm.style.position = "absolute"; 
                hCenteringElm.style.right = "10%";
                hCenteringElm.style.bottom = "10%";
                hCenteringElm.style.height = "80%";
                hCenteringElm.style.width = "80%";
                hCenteringElm.className = "br";
                hCenteringElm.style.color = "white";
                hCenteringElm.style.fontWeight = "bold";
                hCenteringElm.style.textAlign = "center";
                hCenteringElm.innerHTML = (elmHidden)?"Show":"Hide";
                hideShowElem.appendChild(hCenteringElm);
            impExContainerElm.appendChild(hideShowElem);

    var profilesShowElem = document.createElement("div");
        profilesShowElem.style.width = "24%";
        profilesShowElem.style.height = "85%";
        profilesShowElem.style.position = "absolute";
        profilesShowElem.style.top = "5%";
        profilesShowElem.style.right = "22%";
        profilesShowElem.style.boxSizing = "border-box";
        profilesShowElem.style.backgroundColor = "darkolivegreen";
        profilesShowElem.style.border = "4px burlywood outset";
        profilesShowElem.style.borderRadius = "6px";
        profilesShowElem.setAttribute("onclick","Alert('Profiles');");
        var pCenteringElm = document.createElement("div");
            pCenteringElm.style.position = "absolute"; 
            pCenteringElm.style.right = "10%";
            pCenteringElm.style.bottom = "10%";
            pCenteringElm.style.height = "80%";
            pCenteringElm.style.width = "80%";
            pCenteringElm.className = "br";
            pCenteringElm.style.color = "white";
            pCenteringElm.style.fontWeight = "bold";
            pCenteringElm.style.textAlign = "center";
            pCenteringElm.innerHTML = "Profiles";
            profilesShowElem.appendChild(pCenteringElm);
        impExContainerElm.appendChild(profilesShowElem);

    counterContainer.appendChild(impExContainerElm);

    if (save) SaveCookies();
    FitHeaders();
}

function ChangeCountBlockClick(counter, value)
{
    //console.log(counter + " " + value);
    counters[counter].value = (counters[counter].value <= value) ? value + 1 : value;
    DrawCounters();
}

function ChangeCountIncClick(counter, inc)
{
    if (inc && counters[counter].value != counters[counter].maxValue) counters[counter].value++;
    else if (!inc && counters[counter].value != 0) counters[counter].value--;
    DrawCounters();
}

function ChangeCountAddSub(counter, add = true)
{
    var number = prompt("Amount to "+ ((add)?"add":"subtract") +":");
    if (number != null)
    {
        var addition;
        if (isNaN(addition = parseInt(number)) || addition < 0)
        {
            alert("Invalid, please enter an amount as a postive number.");
        }
        else
        {
            counters[counter].value += addition * ((add)?1:-1);
            if (counters[counter].value > counters[counter].maxValue) counters[counter].value = counters[counter].maxValue;
            if (counters[counter].value < 0) counters[counter].value = 0;
        }
    }
    DrawCounters();
}

function NextMode()
{
    if (mode == "reorder")
    mode = "addsub";
    else if (mode == "addsub")
    mode = "inc";
    else
    mode = "reorder";
    
    //inc, reorder, addsub
}

function NextProfile()
{
    var counter = profiles.indexOf(currentProfile) + 1;
    if (counter < 0 || counter >= profiles.length)
        counter = 0;
    
    currentProfile = profiles[counter];
}

function Reorder(counter, inc)
{
    if (inc && counter != 0)
    {
        var temp = counters[counter];
        var tempCount = -1;
        for (var i = counter - 1; i >= 0; i--)
        {
            //console.log(counters[i].profile + " " + currentProfile);
            if (counters[i].profile == currentProfile)
            {
                //console.log(i);
                tempCount = i;
                break;
            }
        }
        //console.log(tempCount);
        if (tempCount != -1)
        {
            counters[counter] = counters[tempCount];
            counters[tempCount] = temp;
        }
    }
    else if (!inc && counter < counters.length - 1)
    {
        var temp = counters[counter];
        var tempCount = -1;
        for (var i = counter + 1; i < counters.length; i++)
        {
            if (counters[i].profile == currentProfile)
            {
                tempCount = i;
                break;
            }
        }
        if (tempCount != -1)
        {
            counters[counter] = counters[tempCount];
            counters[tempCount] = temp;
        }
    }
    
    DrawCounters();
}

function ClickContinuous(counter, value)
{

}

function ChangeCount(counter, value)
{
    //console.log(counter + " " + value);
    counters[counter].value = value;
    DrawCounters();
}

function SortProfile()
{
    var newCounters = [];
    for (var i = 0; i < profiles.length; i++)
        for (var j = 0; j < counters.length; j++)
            if (counters[j].profile == profiles[i])
                newCounters.push(counters[j]);
    console.log("OLD -> " + counters.length);
    console.log("NEW -> " + newCounters.length);
    counters = newCounters;
    DrawCounters();
}

function ReorderProfile(counter, inc)
{
    if (inc && counter != 0)
    {
        var temp = profiles[counter];
        profiles[counter] = profiles[counter - 1];
        profiles[counter - 1] = temp;
    }
    else if (!inc && counter < profiles.length - 1)
    {
        var temp = profiles[counter];
        profiles[counter] = profiles[counter + 1];
        profiles[counter + 1] = temp;
    }
    Alert("Profiles");
}

function RenameProfile(i)
{
    var newName = prompt("Rename profile:", profiles[i]);
    if (newName != null)
    {
        newName = newName.replaceAll('!','').replaceAll(';','').replaceAll(',','').replaceAll('=','');
        for (var j = 0; j < counters.length; j++)
            if (counters[j].profile == profiles[i])
                counters[j].profile = newName;
        
        currentProfile = newName;
        DrawCounters();
        Alert("Profiles");
    }
}

function Rest(type)
{
    if (type == "short")
    {
        for (var i = 0; i < counters.length; i++)
        {
            if (counters[i].profile != currentProfile)
            {
                continue;
            }
            if (counters[i].rest == "short")
            {
                counters[i].value = counters[i].maxValue;
            }
            if (counters[i].rest == "resetshort")
            {
                counters[i].value = 0;
            }
        }
    }
    if (type == "long")
    {
        for (var i = 0; i < counters.length; i++)
        {
            if (counters[i].profile != currentProfile)
            {
                continue;
            }
            if (counters[i].rest == "short" || counters[i].rest == "long")
            {
                counters[i].value = counters[i].maxValue;
            }
            if (counters[i].rest == "resetlong" || counters[i].rest == "resetshort")
            {
                counters[i].value = 0;
            }
            if (counters[i].rest == "halflong")
            {
                counters[i].value +=  Math.floor(counters[i].maxValue/2);
                if (counters[i].value > counters[i].maxValue) counters[i].value = counters[i].maxValue; 
            }
        }
    }
    DrawCounters();
}

function SaveCookies()
{
    SetCookie("count", counters.length, 100);
    for (var i = 0; i < counters.length; i++)
    {
        SetCookie("cname" + i, counters[i].name, 100);
        SetCookie("cvalue" + i, counters[i].value, 100);
        SetCookie("cmaxvalue" + i, counters[i].maxValue, 100);
        SetCookie("ctype" + i, counters[i].type, 100);
        SetCookie("crest" + i, counters[i].rest, 100);
        SetCookie("cprofile" + i, counters[i].profile, 100);
    }
    //console.log("saved");
}

function LoadCookies()
{
    counters = [];

    var c = parseInt(GetCookie("count"));
    if (c != 0)
    {
        for (var i = 0; i < c; i++)
        {
            counters.push(new Counter(GetCookie("cname" + i),parseInt(GetCookie("cvalue" + i)), parseInt(GetCookie("cmaxvalue" + i)), GetCookie("ctype" + i), GetCookie("crest" + i), GetCookie("cprofile" + i)));
        } 
    }

    if (counters.length <= 0)
    {
        counters.push(new Counter("Health",41,41,"c","long",undefined));
        counters.push(new Counter("Temporary Health",0,99,"n","resetLong","Will"));
        counters.push(new Counter("Hit Die",5,5,"b","halfLong"));
        counters.push(new Counter("1st Level Spell Slots",3,3,"s","long"));
        counters.push(new Counter("Action Surge",1,1,"b","short"));
        counters.push(new Counter("Second Wind",1,1,"b","short"));
        counters.push(new Counter("Fey Step",3,3,"b","long"));
        counters.push(new Counter("Gold",0,999999,"n","none"));
        counters.push(new Counter("Silver",0,999999,"n","none"));
        counters.push(new Counter("Copper",0,999999,"n","none"));
    }

    DrawCounters();
}

function FitHeaders()
{
    var headers = document.getElementsByTagName('h2');
    for (var i = 0; i < headers.length; i++)
    {
        for (var j = 50; j > 9; j--)
        {
            headers[i].style.fontSize = j + "px";
            if (!IsOverflown(headers[i]))
            {
                break;
            }
        }
    }

    var brs = document.getElementsByClassName('br');
    for (var i = 0; i < brs.length; i++)
    {
        for (var j = 70; j > 9; j--)
        {
            brs[i].style.fontSize = j + "px";
            if (!IsOverflown(brs[i]))
            {
                break;
            }
        }
    }
    
    var crs = document.getElementsByClassName('cr');
    for (var i = 0; i < crs.length; i++)
    {
        for (var j = 100; j > 39; j--)
        {
            crs[i].style.fontSize = j + "px";
            if (!IsOverflown(crs[i]))
            {
                break;
            }
        }
    }

    var drs = document.getElementsByClassName('dr');
    for (var i = 0; i < drs.length; i++)
    {
        for (var j = 500; j > 40; j/=1.5)
        {
            drs[i].style.fontSize = j + "px";
            if (!IsOverflown(drs[i]))
            {
                break;
            }
        }
    }
/*
    var nrs = document.getElementsByClassName('nr');
    for (var i = 0; i < nrs.length; i++)
    {
        for (var j = 60; j > 19; j--)
        {
            nrs[i].style.fontSize = (j + 70) + "px";
            if (!IsOverflown(nrs[i]) || j == 20)
            {
                nrs[i].style.fontSize = (j) + "px";
                break;
            }
        }
    }*/
}

function IsOverflown(element) 
{
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function SetCookie(cname, cvalue, exdays) 
{
    /*
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    */
   localStorage.setItem(cname,cvalue);
}

function GetCookie(cname) 
{
    /*
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
    */
   return localStorage.getItem(cname);
}

function GetCookieFromString(cname,cookieString) 
{
    let name = cname + "=";
    let decodedCookie = cookieString;
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ImportCookies()
{
    var contElm = document.createElement("div");
    contElm.style.position = "absolute";
    contElm.style.height = "95%";
    contElm.style.width = "95%";
    contElm.style.top = "2.5%";
    contElm.style.left = "2.5%";

    var intContElm = document.createElement("div");
    intContElm.style.fontSize = "40px";
    intContElm.style.height = "20%";
    intContElm.style.width = "100%";
    intContElm.style.position = "absolute";
    intContElm.style.top = "0%";
    intContElm.innerHTML = "Please paste in the exported string:";
    intContElm.className = "br";
    intContElm.style.color = "#7a2b17";
    intContElm.style.fontWeight = "bold";
    intContElm.style.textAlign = "center";

    var strContElm = document.createElement("textarea");
    strContElm.style.height = "67.5%";
    strContElm.style.width = "100%";
    strContElm.style.position = "absolute";
    strContElm.style.top = "20%";
    strContElm.style.overflowY = "scroll";
    strContElm.style.userSelect = "all";
    strContElm.style.border = "3px grey inset";
    strContElm.style.borderRadius = "4px";
    strContElm.style.boxSizing = "border-box";
    strContElm.style.backgroundColor = "#fbfbfb";
    strContElm.style.resize = "none";
    strContElm.innerHTML = "";

    var buttonElm = document.createElement("div");
    buttonElm.style.fontSize = "40px";
    buttonElm.style.height = "10%";
    buttonElm.style.width = "60%";
    buttonElm.style.position = "absolute";
    buttonElm.style.top = "90%";
    buttonElm.style.left = "20%"
    buttonElm.innerHTML = "Import";
    buttonElm.className = "br";
    buttonElm.style.color = "white";
    buttonElm.style.fontWeight = "bold";
    buttonElm.style.textAlign = "center";
    buttonElm.style.boxSizing = "border-box";
    buttonElm.style.backgroundColor = "darkcyan";
    buttonElm.style.border = "4px burlywood outset";
    buttonElm.style.borderRadius = "6px";

    contElm.appendChild(intContElm);
    contElm.appendChild(strContElm);
    contElm.appendChild(buttonElm);
    
    Alert(contElm);
    buttonElm.onclick = function()
    {
        var cookieString = strContElm.value;

        if (cookieString != "")
        {
            if (GetCookieFromString("count",cookieString) == "") 
            {
                alert("Invalid string, import cancelled."); 
                return;
            }
            counters = [];
            var c = parseInt(GetCookieFromString("count",cookieString));
            if (c != 0)
            {
                for (var i = 0; i < c; i++)
                {
                    counters.push(new Counter(
                        GetCookieFromString("cname" + i,cookieString),
                        parseInt(GetCookieFromString("cvalue" + i,cookieString)), 
                        parseInt(GetCookieFromString("cmaxvalue" + i,cookieString)), 
                        GetCookieFromString("ctype" + i,cookieString), 
                        GetCookieFromString("crest" + i,cookieString),
                        GetCookieFromString("cprofile" + i,cookieString)));
                } 
            }
        }
        Alert();
        DrawCounters();
    }
}

function ExportCookies()
{
    let cookieString = AllStorage();
    //let cookieString = decodeURIComponent(document.cookie);
    //navigator.clipboard.writeText(cookieString);
    //"The following exported string has been created. This can be used to import counters into another browser.", cookieString
    
    var contElm = document.createElement("div");
    contElm.style.position = "absolute";
    contElm.style.height = "95%";
    contElm.style.width = "95%";
    contElm.style.top = "2.5%";
    contElm.style.left = "2.5%";

    var intContElm = document.createElement("div");
    intContElm.style.fontSize = "40px";
    intContElm.style.height = "20%";
    intContElm.style.width = "100%";
    intContElm.style.position = "absolute";
    intContElm.style.top = "0%";
    intContElm.innerHTML = "The following string can be used to import counters into another browser:";
    intContElm.className = "br";
    intContElm.style.color = "#7a2b17";
    intContElm.style.fontWeight = "bold";
    intContElm.style.textAlign = "center";

    var strContElm = document.createElement("textarea");
    strContElm.style.height = "80%";
    strContElm.style.width = "100%";
    strContElm.style.position = "absolute";
    strContElm.style.top = "20%";
    strContElm.style.overflowY = "scroll";
    strContElm.style.border = "3px grey inset";
    strContElm.style.borderRadius = "4px";
    strContElm.style.boxSizing = "border-box";
    strContElm.style.backgroundColor = "#fbfbfb";
    strContElm.style.resize = "none";
    strContElm.innerHTML = cookieString;

    //var strElm = document.createElement("div");
    //strElm.innerHTML = cookieString;
    //strContElm.appendChild(strElm);

    contElm.appendChild(intContElm);
    contElm.appendChild(strContElm);
    
    Alert(contElm);
    navigator.clipboard.writeText(cookieString);
}

function AllStorage() {

    var archive = "",
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) 
    {
        archive += (key + '=' + localStorage.getItem(key) + "; ");
    }

    return archive;
}

function LightenDarkenColor(col, amt) 
{
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return newColor.toString(16);
}

function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

function Alert(mess = "")
{
    if (mess == "" &&  typeof mess === 'string')
    {
        alertBGElm.style.display = "none";
    }
    if (mess == "d" &&  typeof mess === 'string')
    {
        alertBGElm.style.display = "none";
        DrawCounters();
    }
    else if (typeof mess === 'number')
    {
        alertFGElm.innerHTML = "";
 
        var innerContainerElm = document.createElement("div");
        innerContainerElm.style.position = "relative";
        innerContainerElm.style.top = "0";
        innerContainerElm.style.left = "2.5%";
        innerContainerElm.style.margin = "0";
        innerContainerElm.style.width = "95%";
        innerContainerElm.style.height = "95%";

        var titleElm = document.createElement("h2");
        titleElm.innerHTML = "Edit " + counters[mess].name;
        titleElm.style.height = "10%";
        titleElm.style.wordWrap = "break-word";
        innerContainerElm.appendChild(titleElm);

        var fields = ["Name","Value","Max Value","Display Type","Rest Type","Profile"];
        var prevVal = [counters[mess].name, counters[mess].value, counters[mess].maxValue, counters[mess].type, counters[mess].rest, counters[mess].profile];
        var titles = ["Please enter a name.",
                        "Please enter a numeric value.",
                        "Please enter a numeric max value that is greater than or equal to the value.",
                        "Please enter a display type. This is used for how the value is displayed.\\nValid types:\\n-'c' for continuous\\n-'b' for block\\n-'n' for no graphic",
                        "Please enter a rest type. This determines the values behaviour on a rest.\\nValid types:\\n-'short'\\n-'long'\\n-'none'\\n-'resetShort' for setting to 0 at short rest\\n-'resetLong' for setting to 0 at long rest\\n-'halfLong' for adding up to half of max value rounded down to current value",
                        "Please enter a name for the profile."]
        var values = [];
        for(var i = 0; i < fields.length; i++)
        {
            var labelElm = document.createElement("h3");
            labelElm.innerHTML = fields[i] + ":";
            labelElm.title = titles[i];
            labelElm.setAttribute("onclick","alert(\""+ titles[i] +"\");");
            labelElm.style.position = "absolute";
            labelElm.style.top = 12 * (i + 1) + 2 + "%";
            labelElm.style.left = "0%";
            labelElm.style.margin = "0";
            labelElm.style.width = "40%";
            labelElm.style.height = "11%";
            labelElm.style.float = "left";
            labelElm.style.border = "0";
            labelElm.className = "br";
            innerContainerElm.appendChild(labelElm);

            
            var valueElm = document.createElement("input");
            valueElm.type = "text";
            valueElm.title = titles[i];
            valueElm.value = prevVal[i];
            valueElm.style.position = "absolute";
            valueElm.style.top = 12 * (i + 1) + 2 + "%";
            valueElm.style.right = "0%";
            valueElm.style.margin = "0";
            valueElm.style.width = "50%";
            valueElm.style.height = "10%";
            valueElm.style.float = "right";
            valueElm.style.borderRadius = "12px";
            valueElm.style.borderStyle = "outset";
            valueElm.style.boxSizing = "border-box";
            valueElm.style.fontFamily = "'Libre Baskerville', serif";
            valueElm.style.fontSize = "2em";
            values.push(valueElm);
            innerContainerElm.appendChild(valueElm);

        }
        
        values[0].onfocus = function() { values[0].style.backgroundColor = "white"; };
        values[1].onfocus = function() { values[1].style.backgroundColor = "white"; };
        values[2].onfocus = function() { values[2].style.backgroundColor = "white"; };
        values[3].onfocus = function() { values[3].style.backgroundColor = "white"; };
        values[4].onfocus = function() { values[4].style.backgroundColor = "white"; };

        var buttonElm = document.createElement("div");
        buttonElm.innerHTML= "<div class='br' style='position: relative; height: 50%; top: 25%; display: block; color: white; font-size: " + ((window.innerHeight > window.innerWidth)?40:20) + "px'>Edit</div>";
        buttonElm.style.boxSizing = "border-box";
        buttonElm.style.position = "absolute"; 
        buttonElm.style.left = "5%";
        buttonElm.style.bottom = "2%";
        buttonElm.style.color = "white";
        buttonElm.style.textAlign = "center";
        buttonElm.style.margin = "0";
        buttonElm.style.height = "12.5%";
        buttonElm.style.width = "60%";
        buttonElm.style.backgroundColor = "darkgreen";
        buttonElm.style.border = "5px burlywood outset";
        buttonElm.style.borderRadius = "12px";
        buttonElm.style.cursor = "pointer";
        buttonElm.onmousedown = function()
        {
            buttonElm.style.backgroundColor = "#004f00";
        };
        buttonElm.onmouseup = function()
        {
            buttonElm.style.backgroundColor = "darkgreen";
        };
        buttonElm.onclick = function()
        {
            var err = 0;
            var vname = values[0].value.replaceAll('!','').replaceAll(';','').replaceAll(',','').replaceAll('=','');//.replaceAll(' ','%20');
            var profileS = values[5].value.replaceAll('!','').replaceAll(';','').replaceAll(',','').replaceAll('=','');
            var value, maxValue, typeS, restS;

            if (vname.trim() == "")
            {
                err++;
                values[0].style.backgroundColor = "#bf654e";
            }

            if (isNaN(value = parseInt(values[1].value))) 
            {
                err++;
                values[1].style.backgroundColor = "#bf654e";
            }

            if (isNaN(maxValue = parseInt(values[2].value))) 
            {
                err++;
                values[2].style.backgroundColor = "#bf654e";
            }

            if (value > maxValue)
            {
                err++;
                values[1].style.backgroundColor = "#bf654e";
                values[2].style.backgroundColor = "#bf654e";
            }

            if (values[3].value.toLowerCase().trim() != "c" && 
                values[3].value.toLowerCase().trim() != "b" && 
                values[3].value.toLowerCase().trim() != "n" && 
                values[3].value.toLowerCase().trim() != "s" && 
                values[3].value.toLowerCase().trim() != "m") 
            {
                //console.log(typeof values[3].value);
                err++;
                values[3].style.backgroundColor = "#bf654e";
            }
            else typeS = values[3].value.toLowerCase().trim();
            //vaules = "short", "long", "none", "resetLong", "resetShort", "halfLong"
            if (values[4].value.toLowerCase().trim() != "short" && 
                values[4].value.toLowerCase().trim() != "long" && 
                values[4].value.toLowerCase().trim() != "none" && 
                values[4].value.toLowerCase().trim() != "resetlong" && 
                values[4].value.toLowerCase().trim() != "restshort" && 
                values[4].value.toLowerCase().trim() != "halflong") 
            {
                err++;
                values[4].style.backgroundColor = "#bf654e";
            }
            else restS = values[4].value.toLowerCase().trim();

            if (err == 0)
            {
                counters[mess].name = vname;
                counters[mess].value = value;
                counters[mess].maxValue = maxValue;
                counters[mess].type = typeS;
                counters[mess].rest = restS;
                counters[mess].profile = profileS;
                DrawCounters();
                Alert();
            }
        };
        innerContainerElm.appendChild(buttonElm);


        var delButtonElm = document.createElement("div");
        delButtonElm.innerHTML= "";
            var iDelButtonElm = document.createElement("div");
            iDelButtonElm.style.position = "absolute"; 
            iDelButtonElm.style.right = "10%";
            iDelButtonElm.style.bottom = "10%";
            iDelButtonElm.style.height = "80%";
            iDelButtonElm.style.width = "80%";
            iDelButtonElm.style.backgroundImage = "url(trash.png)";
            iDelButtonElm.style.backgroundSize = "contain";
            iDelButtonElm.style.backgroundPosition = "center";
            iDelButtonElm.style.backgroundRepeat = "no-repeat";
            delButtonElm.appendChild(iDelButtonElm);
        delButtonElm.style.boxSizing = "border-box";
        delButtonElm.style.position = "absolute"; 
        delButtonElm.style.right = "5%";
        delButtonElm.style.bottom = "2%";
        delButtonElm.style.color = "white";
        delButtonElm.style.textAlign = "center";
        delButtonElm.style.margin = "0";
        delButtonElm.style.height = "12.5%";
        delButtonElm.style.width = "25%";
        delButtonElm.style.backgroundColor = "#7a2b17";
        delButtonElm.style.border = "5px burlywood outset";
        delButtonElm.style.borderRadius = "12px";
        delButtonElm.style.cursor = "pointer";
        delButtonElm.onmousedown = function()
        {
            buttonElm.style.backgroundColor = "#004f00";
        };
        delButtonElm.onmouseup = function()
        {
            buttonElm.style.backgroundColor = "#7a2b17";
        };
        delButtonElm.onclick = function()
        {
            counters.splice(mess, 1);
            DrawCounters();
            Alert();
        };
        innerContainerElm.appendChild(delButtonElm);

        alertFGElm.appendChild(innerContainerElm);

        alertBGElm.style.display = "block";

        FitHeaders();
    }
    else if (typeof mess === 'string')
    {
        if (mess == "Add")
        {
            alertFGElm.innerHTML = "";
 
            var innerContainerElm = document.createElement("div");
            innerContainerElm.style.position = "relative";
            innerContainerElm.style.top = "0";
            innerContainerElm.style.left = "2.5%";
            innerContainerElm.style.margin = "0";
            innerContainerElm.style.width = "95%";
            innerContainerElm.style.height = "95%";

            var titleElm = document.createElement("h2");
            titleElm.innerHTML = "Add Counter";
            titleElm.style.height = "10%";
            titleElm.style.wordWrap = "break-word";
            innerContainerElm.appendChild(titleElm);

            var prevVal = ["","","","","",currentProfile];
            var fields = ["Name","Value","Max Value","Display Type","Rest Type","Profile"];
            var titles = ["Please enter a name.",
                        "Please enter a numeric value.",
                        "Please enter a numeric max value that is greater than or equal to the value.",
                        "Please enter a display type. This is used for how the value is displayed.\\nValid types:\\n-'c' for continuous\\n-'b' for block\\n-'n' for no graphic",
                        "Please enter a rest type. This determines the values behaviour on a rest.\\nValid types:\\n-'short'\\n-'long'\\n-'none'\\n-'resetShort' for setting to 0 at short rest\\n-'resetLong' for setting to 0 at long rest\\n-'halfLong' for adding up to half of max value rounded down to current value",
                        "Please enter a name for the profile."]
            var values = [];
            for(var i = 0; i < fields.length; i++)
            {
                var labelElm = document.createElement("h3");
                labelElm.innerHTML = fields[i] + ":";
                labelElm.title = titles[i];
                labelElm.setAttribute("onclick","alert(\""+ titles[i] +"\");");
                labelElm.style.position = "absolute";
                labelElm.style.top = 12 * (i + 1) + 2 + "%";
                labelElm.style.left = "0%";
                labelElm.style.margin = "0";
                labelElm.style.width = "40%";
                labelElm.style.height = "11%";
                labelElm.style.float = "left";
                labelElm.style.border = "0";
                labelElm.className = "br";
                innerContainerElm.appendChild(labelElm);

                
                var valueElm = document.createElement("input");
                valueElm.type = "text";
                valueElm.value = prevVal[i];
                valueElm.title = titles[i];
                valueElm.style.position = "absolute";
                valueElm.style.top = 12 * (i + 1) + 2 + "%";
                valueElm.style.right = "0%";
                valueElm.style.margin = "0";
                valueElm.style.width = "50%";
                valueElm.style.height = "10%";
                valueElm.style.float = "right";
                valueElm.style.borderRadius = "8px";
                valueElm.style.borderStyle = "outset";
                valueElm.style.boxSizing = "border-box";
                valueElm.style.fontFamily = "'Libre Baskerville', serif";
                valueElm.style.fontSize = "2em";
                values.push(valueElm);
                innerContainerElm.appendChild(valueElm);

            }
            
            values[0].onfocus = function() { values[0].style.backgroundColor = "white"; };
            values[1].onfocus = function() { values[1].style.backgroundColor = "white"; };
            values[2].onfocus = function() { values[2].style.backgroundColor = "white"; };
            values[3].onfocus = function() { values[3].style.backgroundColor = "white"; };
            values[4].onfocus = function() { values[4].style.backgroundColor = "white"; };

            var buttonElm = document.createElement("div");
            buttonElm.innerHTML= "<div class='br' style='position: relative; height: 50%; top: 25%; display: block; color: white; font-size: " + ((window.innerHeight > window.innerWidth)?40:20) + "px'>Add</div>";
            buttonElm.style.boxSizing = "border-box";
            buttonElm.style.position = "absolute"; 
            buttonElm.style.left = "20%";
            buttonElm.style.bottom = "1.5%";
            buttonElm.style.color = "white";
            buttonElm.style.textAlign = "center";
            buttonElm.style.margin = "0";
            buttonElm.style.height = "12.5%";
            buttonElm.style.width = "60%";
            buttonElm.style.backgroundColor = "darkgreen";
            buttonElm.style.border = "5px burlywood outset";
            buttonElm.style.borderRadius = "12px";
            buttonElm.style.cursor = "pointer";
            buttonElm.onmousedown = function()
            {
                buttonElm.style.backgroundColor = "#004f00";
            };
            buttonElm.onmouseup = function()
            {
                buttonElm.style.backgroundColor = "darkgreen";
            };
            buttonElm.onclick = function()
            {
                var err = 0;
                var vname = values[0].value.replaceAll('!','').replaceAll(';','').replaceAll(',','').replaceAll('=','');//.replaceAll(' ','%20');
                var profileS = values[5].value.replaceAll('!','').replaceAll(';','').replaceAll(',','').replaceAll('=','');
                var value, maxValue, typeS, restS;

                if (vname.trim() == "")
                {
                    err++;
                    values[0].style.backgroundColor = "#bf654e";
                }

                if (isNaN(value = parseInt(values[1].value))) 
                {
                    err++;
                    values[1].style.backgroundColor = "#bf654e";
                }

                if (isNaN(maxValue = parseInt(values[2].value))) 
                {
                    err++;
                    values[2].style.backgroundColor = "#bf654e";
                }

                if (value > maxValue)
                {
                    err++;
                    values[1].style.backgroundColor = "#bf654e";
                    values[2].style.backgroundColor = "#bf654e";
                }

                if (values[3].value.toLowerCase().trim() != "c" && 
                    values[3].value.toLowerCase().trim() != "b" && 
                    values[3].value.toLowerCase().trim() != "n" && 
                    values[3].value.toLowerCase().trim() != "s" && 
                    values[3].value.toLowerCase().trim() != "m") 
                {
                    //console.log(typeof values[3].value);
                    err++;
                    values[3].style.backgroundColor = "#bf654e";
                }
                else typeS = values[3].value.toLowerCase().trim();
                //vaules = "short", "long", "none", "resetLong", "resetShort", "halfLong"
                if (values[4].value.toLowerCase().trim() != "short" && 
                    values[4].value.toLowerCase().trim() != "long" && 
                    values[4].value.toLowerCase().trim() != "none" && 
                    values[4].value.toLowerCase().trim() != "resetlong" && 
                    values[4].value.toLowerCase().trim() != "restshort" && 
                    values[4].value.toLowerCase().trim() != "halflong") 
                {
                    err++;
                    values[4].style.backgroundColor = "#bf654e";
                }
                else restS = values[4].value.toLowerCase().trim();

                if (err == 0)
                {
                    counters.push(new Counter(vname, value, maxValue, typeS, restS, profileS));
                    DrawCounters();
                    Alert();
                }
            };
            innerContainerElm.appendChild(buttonElm);

            alertFGElm.appendChild(innerContainerElm);

            alertBGElm.style.display = "block";

            FitHeaders();
        }
        if (mess == "Profiles")
        {
            SortProfile();

            alertFGElm.innerHTML = "";
 
            var innerContainerElm = document.createElement("div");
            innerContainerElm.style.position = "relative";
            innerContainerElm.style.top = "0";
            innerContainerElm.style.left = "2.5%";
            innerContainerElm.style.margin = "0";
            innerContainerElm.style.width = "95%";
            innerContainerElm.style.height = "95%";

            var titleElm = document.createElement("h2");
            titleElm.innerHTML = "Profiles";
            titleElm.style.height = "10%";
            titleElm.style.wordWrap = "break-word";
            innerContainerElm.appendChild(titleElm);

            for (var i = 0; i < profiles.length; i++)
            {
                
                var intPersonalElm = document.createElement("div");
                intPersonalElm.style.margin = "0";
                intPersonalElm.style.position = "relative";
                intPersonalElm.style.left = "2.5%";
                intPersonalElm.style.height = "10%";
                intPersonalElm.style.width = "95%";
                intPersonalElm.style.borderBottom = "4px tan dotted";
                
                var incControlsElem = document.createElement("div");
                incControlsElem.style.width = "100%";
                incControlsElem.style.height = "80%";
                incControlsElem.style.position = "absolute";
                incControlsElem.style.top = "10%";
                incControlsElem.style.left = "0";

                intPersonalElm.appendChild(incControlsElem);

                var minusElem = document.createElement("div");
                minusElem.setAttribute("onclick","ReorderProfile("+ i + ",false);");
                minusElem.style.width = "25%";
                minusElem.style.height = "100%";
                minusElem.style.position = "absolute";
                minusElem.style.top = "0";
                minusElem.style.left = "0";
                minusElem.style.color = "white";
                minusElem.style.fontWeight = "bold";
                minusElem.style.fontFamily = "'Courier New', serif";
                minusElem.style.textAlign = "center";
                minusElem.style.boxSizing = "border-box";
                minusElem.style.backgroundColor = "#327ba8";
                minusElem.style.border = "4px burlywood outset";
                minusElem.style.borderRadius = "6px";
                minusElem.innerHTML = "&darr;";
                minusElem.className = "br";

                var addElem = document.createElement("div");
                addElem.setAttribute("onclick","ReorderProfile("+ i + ",true);");
                addElem.style.width = "25%";
                addElem.style.height = "100%";
                addElem.style.position = "absolute";
                addElem.style.top = "0";
                addElem.style.left = "75%";
                addElem.style.color = "white";
                addElem.style.fontWeight = "bold";
                addElem.style.fontFamily = "'Courier New', serif";
                addElem.style.textAlign = "center";
                addElem.style.boxSizing = "border-box";
                addElem.style.backgroundColor = "#327ba8";
                addElem.style.border = "4px burlywood outset";
                addElem.style.borderRadius = "6px";
                addElem.innerHTML = "&uarr;";
                addElem.className = "br";

                var numElem = document.createElement("div");
                numElem.innerHTML = profiles[i];
                numElem.setAttribute("onclick","RenameProfile("+ i + ");");
                numElem.style.textAlign = "center";
                numElem.style.width = "45%";
                numElem.style.height = "100%";
                numElem.style.position = "absolute";
                numElem.style.top = "0";
                numElem.style.left = "27.5%";
                numElem.style.color = "black";
                numElem.style.fontWeight = "bold";
                numElem.style.textAlign = "center";
                numElem.style.boxSizing = "border-box";
                numElem.style.backgroundColor = "white";
                numElem.style.border = "4px burlywood inset";
                numElem.style.borderRadius = "6px";
                numElem.className = "br";
                numElem.readOnly = "true";

                incControlsElem.appendChild(numElem);
                incControlsElem.appendChild(addElem);
                incControlsElem.appendChild(minusElem);

                innerContainerElm.appendChild(intPersonalElm);
                innerContainerElm.style.overflowY = "scroll";
            }

            alertFGElm.appendChild(innerContainerElm);

            alertBGElm.style.display = "block";

            FitHeaders();
        }
    }
    else if (typeof mess === 'object')
    {
        alertFGElm.innerHTML = "";
        alertBGElm.style.display = "block";
        alertFGElm.appendChild(mess);
        FitHeaders();
    }
}

document.body.onresize = function() {
    DrawCounters(false);
};

function GetProfiles() 
{
    profiles = [];

    for(var i = 0; i < counters.length; i++)
    {
        //console.log(counters[i].profile);
        if (counters[i].profile == undefined)
            counters[i].profile = "Default";

        profiles.push(counters[i].profile);
        profiles = [...new Set(profiles)];
    }
}

Alert();
LoadCookies();
GetProfiles();
NextProfile();
DrawCounters(false);

//math
var mathContainer = document.getElementById("mathContainer");
var currentQuestion;
var starttime = 0;
var wrongStreak = 0;
var rightStreak = 0;
var settoclear=false;

function Question(operand1, operand2, operator)
{
    this.operand1 = operand1;
    this.operand2 = operand2;
    this.operator = operator;
    this.answers = [];
    this.correctAnswer;

    this.GenerateCorrectAnswer = function () 
    {
        return this.operand1 + ( ((this.operator=="+")?1:-1) * this.operand2);
    };

    this.GenerateAnswers = function () 
    {
        for(var i = 0; i < 4; i++) 
        {
            var rand = Math.random() * 4;
            if (rand < 1) this.answers[i] = this.operand1 + ( ((this.operator=="+")?-1:1) * this.operand2); //flip operand
            else this.answers[i] = this.operand1 + ( ((this.operator=="+")?1:-1) * this.operand2) + Math.ceil(Math.random()*10-5); //add or subtract  up to 5
            if (this.answers[i]==this.GenerateCorrectAnswer() ||
                (i > 0 && this.answers[i]==this.answers[i-1]) ||
                (i > 1 && this.answers[i]==this.answers[i-2]) ||
                (i > 2 && this.answers[i]==this.answers[i-3])) i--;
        }
        //then randonly chose one to be correct
        var rand = Math.random() * 4;
        this.answers[Math.floor(rand)] = this.GenerateCorrectAnswer();
        this.correctAnswer = Math.floor(rand);
        //console.log(this.correctAnswer);
    };
}

function GetSymbol(keyword)
{
    var a = ["&#9773"];
    if (keyword == "good")
    {
        a = ["&#9773","&#9734","&#9731","&#9752","&#9786","&#9825","&#9836","&#9890","&#9891"];
    }
    else if (keyword == "bad")
    {
        a = ["&#9785","&#9729","&#9730","&#9981",":(","X(","D:","<br>UwU","&#9904","&#9888"];
    }
    return a[Math.floor(Math.random() * a.length)];
}

var animationTimer;

function StartAnimation(correct)
{
    var animationBGElm = document.createElement("div");
    animationBGElm.style.position = "absolute";
    animationBGElm.style.top = "0";
    animationBGElm.style.right = "0";
    animationBGElm.style.margin = "0";
    animationBGElm.style.background = "radial-gradient(circle, transparent 50%, "+((correct)?"darkgreen":"darkred")+" 150%)";
    animationBGElm.style.textShadow = "0 0 10px "+ ((correct)?"darkgreen":"darkred");
    animationBGElm.style.width = "100%";
    animationBGElm.style.height = "100%";
    animationBGElm.style.display = "block";
    animationBGElm.style.zIndex = "1000000000";
    
    mathContainer.appendChild(animationBGElm);

    var FGElem = document.createElement("div");
    FGElem.innerHTML = GetSymbol((correct)?"good":"bad");
    FGElem.className = "dr";
    FGElem.style.textAlign = "center";
    FGElem.style.color = ((correct)?"darkgreen":"darkred");
    FGElem.style.width = "100%";
    FGElem.style.height = "60%";
    FGElem.style.position = "absolute";
    FGElem.style.top = "20%";
    FGElem.style.left = "0";

    animationBGElm.appendChild(FGElem);

    FitHeaders();

    animationTimer = setTimeout(ClearAnimation,200);
}

function ClearAnimation()
{
    clearInterval(animationTimer);
    DrawQuestion();
}

function GenerateQuestion()
{  
    //1/3 chance for d20 question (d20 +/- 12)
    //1/3 chance for health question ( X - 2X )
    //1/3 chance for random question ( {x|-20<=x<=20} +/-  {y|-20<=y<=20} )
    var rand = Math.random() * 3;
    if (rand < 1) currentQuestion = new Question(Math.ceil(Math.random()*20), Math.ceil(Math.random()*12), ((Math.random()*2<1)?"+":"-"));
    else if (rand < 2) 
    {
        var x = Math.ceil(Math.random()*80)
        currentQuestion = new Question(x, Math.ceil(x*(Math.random()*2)), "-");
    }
    else currentQuestion = new Question(Math.ceil(Math.random()*40 - 20), Math.ceil(Math.random()*40 - 20), ((Math.random()*2<1)?"+":"-"));

    currentQuestion.GenerateAnswers();
}

function ClearStreak()
{
    wrongStreak = 0;
    rightStreak = 0;
    starttime = 0;
    UpdateStreak();
}

function ClickChoice(i)
{
    var correct = (i == currentQuestion.correctAnswer);
    //console.log(i," ",currentQuestion.correctAnswer);
    //console.log(correct);
    if (correct) rightStreak++; else wrongStreak++;
    if (starttime == 0) starttime = Date.now();
    StartAnimation(correct);
}

function DrawQuestion()
{
    mathContainer.innerHTML = "";

    GenerateQuestion();

    var nameElm = document.createElement("div");
    nameElm.innerHTML = currentQuestion.operand1 + " " + currentQuestion.operator + " " + currentQuestion.operand2;
    nameElm.style.position = "absolute";
    nameElm.style.margin = "0";
    nameElm.style.left = "10%";
    nameElm.style.top = "5%";
    nameElm.style.height = "20%";
    nameElm.style.width = "80%";
    nameElm.style.border = "0";
    nameElm.style.color = "#7a2b17";
    nameElm.style.fontWeight = "bold";
    nameElm.style.fontFamily = "'Libre Baskerville', serif";
    nameElm.style.textAlign = "center";
    nameElm.style.whiteSpace = "normal";
    nameElm.className = "cr";

    mathContainer.appendChild(nameElm);

    for(var i = 0; i < 4; i++)
    {
        var addElem = document.createElement("div");
        addElem.setAttribute("onclick","ClickChoice("+ i + ");");
        addElem.style.width = "80%";
        addElem.style.height = "10%";
        addElem.style.position = "absolute";
        addElem.style.top = 26 + i*12 + "%";
        addElem.style.left = "10%";
        addElem.style.color = "white";
        addElem.style.fontWeight = "bold";
        addElem.style.fontFamily = "'Courier New', serif";
        addElem.style.textAlign = "center";
        addElem.style.boxSizing = "border-box";
        addElem.style.backgroundColor = "#327ba8";
        addElem.style.border = "4px burlywood outset";
        addElem.style.borderRadius = "6px";
        addElem.innerHTML = currentQuestion.answers[i];
        addElem.className = "br";

        mathContainer.appendChild(addElem);
    }

    if (settoclear) ClearStreak();
    settoclear = false;

    UpdateStreak();
    FitHeaders();
}

function UpdateStreak()
{
    //change inner html of elms
    var wrong = document.createElement("div");
    wrong.innerHTML = wrongStreak;
    wrong.style.position = "absolute";
    wrong.style.margin = "0";
    wrong.style.left = "2.5%";
    wrong.style.bottom = "2.5%";
    wrong.style.height = "15%";
    wrong.style.width = "45%";
    wrong.style.border = "0";
    wrong.style.color = "darkred";
    wrong.style.fontWeight = "bold";
    wrong.style.fontFamily = "'Libre Baskerville', serif";
    wrong.style.textAlign = "center";
    wrong.style.whiteSpace = "normal";
    wrong.className = "cr";

    mathContainer.appendChild(wrong);

    var right = document.createElement("div");
    right.innerHTML = rightStreak;
    right.style.position = "absolute";
    right.style.margin = "0";
    right.style.right = "2.5%";
    right.style.bottom = "2.5%";
    right.style.height = "15%";
    right.style.width = "45%";
    right.style.border = "0";
    right.style.color = "darkgreen";
    right.style.fontWeight = "bold";
    right.style.fontFamily = "'Libre Baskerville', serif";
    right.style.textAlign = "center";
    right.style.whiteSpace = "normal";
    right.className = "cr";

    mathContainer.appendChild(right);

    var cpsElm = document.createElement("div");
    cpsElm.innerHTML = ((rightStreak) / (Date.now() - starttime) * 1000 * 60).toFixed(0);
    cpsElm.style.position = "absolute";
    cpsElm.style.margin = "0";
    cpsElm.style.left = "35%";
    cpsElm.style.bottom = "15%";
    cpsElm.style.height = "10%";
    cpsElm.style.width = "30%";
    cpsElm.style.border = "0";
    cpsElm.style.color = "darkgrey";
    cpsElm.style.fontWeight = "bold";
    cpsElm.style.fontFamily = "'Libre Baskerville', serif";
    cpsElm.style.textAlign = "center";
    cpsElm.style.whiteSpace = "normal";
    cpsElm.setAttribute("onclick","settoclear=true;");

    cpsElm.className = "cr";

    mathContainer.appendChild(cpsElm);
}

DrawQuestion();

var elmHidden = false;

function HideOtherElements()
{
    if (elmHidden)
    {
        mathContainer.style.display = "block";
        document.getElementById("toolsContainer").style.display = "block";
        document.getElementById("pageContainer").style.height = "300vh";
    }
    else
    {
        mathContainer.style.display = "none";
        document.getElementById("toolsContainer").style.display = "none";
        document.getElementById("pageContainer").style.height = "100vh";
    }
    elmHidden = !elmHidden;
}