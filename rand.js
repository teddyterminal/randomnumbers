function getRand()
{
	document.getElementById("rand").innerHTML = Math.random();
	Plotly.purge("hist_plot"); 
}

function getRandRange(returnable)
{
	var min = returnable ? parseInt(document.getElementById("minm").value) : parseInt(document.getElementById("min").value); 
	var max = returnable ? parseInt(document.getElementById("maxm").value) : parseInt(document.getElementById("max").value); 
	var ints = returnable ? (document.getElementById("intsm").value == "true") : (document.getElementById("ints").value == "true"); 

	if (ints)
	{
		scale = max + 1 - min; 
		rand = Math.random() * scale; 
		if (returnable) 
			return Math.floor(rand + min); 
		document.getElementById("rand").innerHTML = "<center>" + Math.floor(rand + min) + "</center>";
	}
	else
	{
		scale = max - min; 
		rand = Math.random() * scale; 
		if (returnable) 
			return rand + min; 
		document.getElementById("rand").innerHTML = "<center>" + rand + min + "</center>";
	}
	Plotly.purge("hist_plot");
}

function getMultiple(csvCond)
{
	var k = parseInt(document.getElementById("k").value); 
	var min = parseInt(document.getElementById("minm").value); 
	var max = parseInt(document.getElementById("maxm").value); 
	var ints = (document.getElementById("intsm").value == "true");

	rands = []
	t = ""
	csv = ""
	for (i = 0; i < k; i++)
	{
		x = getRandRange(true); 
		rands.push(x);
		t = t + x + " "; 
		csv = csv + x + "\n"; 
	}

	if (csvCond)
	{
		var filename = "export.csv"; 
	    if (!csv.match(/^data:text\/csv/i)) 
	    {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
        document.getElementById("rand").innerHTML = "<center> Below is a histogram of the " + k + " numbers you requested: </center>"

	}
	else
		document.getElementById("rand").innerHTML = "<center>" + t + "<br> <br> Below is a histogram of the " + k + " numbers you requested: </center>"

	var trace = 
	{
  	  x: rands,
   	  type: 'histogram',
   	  xbins: {start: 0, end: max, size: 1}, 
  	};

	var data = [trace];
	var layout = 
	{
 		autosize: true,
  		margin: "auto",
  		paper_bgcolor: '#EEFFEE',
  		plot_bgcolor: '#EEFFEE'
  	}
	Plotly.newPlot("hist_plot", data, layout);
	window.onresize = function() { Plotly.Plots.resize(hist_plot) };

}

function coinToss()
{
	var c = Math.random(); 
	if (c >= 0.5)
		document.getElementById("rand").innerHTML = "<img src = coins/heads.png> </img>"; 
	else
		document.getElementById("rand").innerHTML = "<img src = coins/tails.png> </img>"; 
	Plotly.purge("hist_plot"); 
}

function dieRoll()
{
	var c = Math.floor(Math.random() * 6) + 1; 
	var filestring = ""
	switch(c)
	{
		case 1: filestring = "<img src = dice/one.png> </img>"; break; 
		case 2: filestring = "<img src = dice/two.png> </img>"; break; 
		case 3: filestring = "<img src = dice/three.png> </img>"; break; 
		case 4: filestring = "<img src = dice/four.png> </img>"; break; 
		case 5: filestring = "<img src = dice/five.png> </img>"; break; 
		case 6: filestring = "<img src = dice/six.png> </img>"; break; 
	}
	document.getElementById("rand").innerHTML = filestring; 
	Plotly.purge("hist_plot"); 
}
