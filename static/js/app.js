//Console log something
console.log("Using app.js") ;


//Function to fill panel with metadata
function FillMetaData(sampleID)

    {
        //Log something to confirm function has run
        console.log(`FillMetaData(${sampleID})`) ;

        //Get all data
        d3.json("data/samples.json").then((data) =>

        {
        //Get all metadata
        var metadata = data.metadata ;
    
        function selectSampleMeta(ID)

            {
                return ID.id == sampleID ;
            }
        
        //Get metadata for sampleID
        var sampleMetaArray = metadata.filter(selectSampleMeta) ;

        var metaResult = sampleMetaArray[0] ;
        
        //Link to panel in HTML
        var panel = d3.select("#sample-metadata") ;
        
        //Clear existing metadata
        panel.html("") ;
        
        //Fill panel with sample metadata
        Object.entries(metaResult).forEach(([key, value]) => 

            {
                var textToShow = `${key}: ${value}`
                panel.append("h6").text(textToShow) ;
               
            }) ;


        }) ;
        
    } ;


//Function to draw bar graph
function DrawBarGraph(sampleID)

    {
        //Log something to confirm function has run
        console.log(`DrawBarGraph(${sampleID})`) ;

        //Get all data
        d3.json("data/samples.json").then((data) =>

            {
                //Get all sample data
                var samples = data.samples ;

                //Get data for sampleID
                var resultArray = samples.filter(s => s.id == sampleID) ;

                var result = resultArray[0] ;

                //Build bar graph
                var otu_ids = result.otu_ids ;

                var otu_labels = result.otu_labels ;

                var sampleValues = result.sample_values ;

                var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse() ;

                var barData =

                    {
                        x: sampleValues.slice(0, 10).reverse(),
                        y: yticks,
                        type: "bar",
                        text: otu_labels.slice(0, 10).reverse(),
                        orientation: "h"

                    }

                var barLayout = 

                    {
                        title: "Top 10 Bacteria Cultures Found",
                        margin: {t: 30, l: 150}
                    }
                
                //Draw bar graph
                Plotly.newPlot("bar", [barData], barLayout) ;

            }) ;

    } ;


//Functio to draw bubble chart
function DrawBubbleChart(sampleID)

    {
        //Console log something to confirm the function has been run
        console.log(`DrawBubbleChart(${sampleID})`) ;

        //Get all sample data
         d3.json("data/samples.json").then((data) =>

            {
                //Get all sample data
                var samples = data.samples ;

                //Get sample data for sampleID
                var resultArray = samples.filter(s => s.id == sampleID) ;

                var result = resultArray[0] ;

                //Build bubble chart
                var otu_ids = result.otu_ids ;

                var otu_labels = result.otu_labels ;

                var sampleValues = result.sample_values ;

                var plotBubble =

                    {
                        x: otu_ids,
                        y: sampleValues ,
                        mode: 'markers',
                        marker: {size: sampleValues, color: otu_ids},
                        text: otu_labels
                    } ;

                var layout =
                    {
                        xaxis: {title: "OTU ID"},
                        height: 600,
                        width: 1000
                    };
                
                //Draw bubble chart
                Plotly.newPlot("bubble", [plotBubble], layout) ;

            }) ;

    } ;


//Function to run on new subject ID selection
function optionChanged(newSampleID)

    {   
        //Log new selection
        console.log(`User selected ${newSampleID}`) ;

        //Run functions to display data
        FillMetaData(newSampleID) ;

        DrawBarGraph(newSampleID) ;

        DrawBubbleChart(newSampleID) ;

    } ;


//Function to run to initialize the webpage dashboard
function InitDash() 

    {
        //Console log initialization
        console.log(`Calling InitDash()`) ;

        //Link to Subject ID selector
        var selector = d3.select("#selDataset") ;

        //Get all data
        d3.json("data/samples.json").then((data) => 

            {
                //Log all data
                console.log(data) ;

                //Get sample ID names
                var sampleNames = data.names ;

                //Populate the selector with all of the sample IDs
                sampleNames.forEach((sampleID) => 
                
                {

                    selector.append("option")
                        .text(sampleID)
                        .property("value", sampleID) ;

                }) ;

                //Choose starting sample ID
                var sampleID = sampleNames[0] ;

                console.log("Starting Sample: ", sampleID) ;

                //Initialize page by displaying data for starting sample ID
                FillMetaData(sampleID) ;
               
                DrawBarGraph(sampleID) ;
            
                DrawBubbleChart(sampleID) ;

            }) ;

    } ;

//Initialize Dashboard
InitDash() ;