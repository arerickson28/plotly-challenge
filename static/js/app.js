console.log("I have belly-button");

//* <select id="selDataset" onchange="optionChanged(this.value)"></select>

//<div id="sample-metadata" class="panel-body"></div>

//* <div id="bar"></div> */

//<div id="gauge"></div>

//<div id="bubble"></div> */



function FillMetaData(sampleID)
    {
        console.log(`FillMetaData(${sampleID})`) ;

        d3.json("data/samples.json").then((data) =>

        {

        var metadata = data.metadata ;
    

        function selectSampleMeta(ID)
            {
                return ID.id == sampleID ;
            }

        var sampleMetaArray = metadata.filter(selectSampleMeta) ;

        var metaResult = sampleMetaArray[0] ;

        var panel = d3.select("#sample-metadata") ;

        panel.html("") ;
        
        Object.entries(metaResult).forEach(([key, value]) => 

            {
                var textToShow = `${key}: ${value}`
                panel.append("h6").text(textToShow) ;
               
            }) ;




        // console.log(sampleMetaArray) ;

        // console.log(sampleMetaArray[0]) ;
        
        // sampleMetaArray.forEach((metadatum) =>
        //     {

        //         console.log(metadatum) ;

        //         Object.entries(metadatum).forEach(([key, value]) =>
        //             {

                        
        //                 // meta.text(sampleMeta[0]).property("value", sampleMeta[0]) ;
                        
        //                 console.log(`key: ${key} and value: ${value}`) ;

        //                 // var meta = d3.select(".panel-body") ;
        //                 var meta = d3.select("#sample-metadata") ;

        //                 meta.text(key, value).property(key, value) ;
                
        //             }) ;

        //     });

    
    
        });
    } ;

function DrawBarGraph(sampleID)
    {
        console.log(`DrawBarGraph(${sampleID})`) ;
        // var bar = d3.select("#bar") ;

        d3.json("data/samples.json").then((data) =>
            {

                var samples = data.samples ;

                var resultArray = samples.filter(s => s.id == sampleID) ;

                var result = resultArray[0] ;

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

                Plotly.newPlot("bar", [barData], barLayout) ;

            });


    } ;




function DrawBubbleChart(sampleID)
    {
        console.log(`DrawBubbleChart(${sampleID})`) ;

         // var bubble = d3.select("#bubble") ;

    } ;

function optionChanged(newSampleID)
    {
        console.log(`User selected ${newSampleID}`) ;

        FillMetaData(newSampleID) ;

        DrawBarGraph(newSampleID) ;

        DrawBubbleChart(newSampleID) ;

    } ;



function InitDash() 
    {

        console.log(`Calling InitDash()`) ;

        //Filling Selector

        var selector = d3.select("#selDataset") ;

        d3.json("data/samples.json").then((data) => 

            {
                console.log(data) ;



                //FILLING SELECTOR
                var sampleNames = data.names ;

                //Populate the selector with all of the sample IDs
                sampleNames.forEach((sampleID) => 
                
                {

                    selector.append("option")
                        .text(sampleID)
                        .property("value", sampleID) ;

                }) ;

                var sampleID = sampleNames[0] ;

                console.log("Starting Sample: ", sampleID) ;

                FillMetaData(sampleID) ;
               

                DrawBarGraph(sampleID) ;
            

                DrawBubbleChart(sampleID) ;

            }) ;

    }

InitDash() ;