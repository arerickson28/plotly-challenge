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

        var sampleMeta = metadata.filter(selectSampleMeta) ;
        

        console.log(sampleMeta) ;

        var meta = d3.select(".panel-body") ;
        meta.text(sampleMeta[0]).property("value", sampleMeta[0]) ;


    
        });
    } ;

function DrawBarGraph(sampleID)
    {
        console.log(`DrawBarGraph(${sampleID})`) ;
    } ;

function DrawBubbleChart(sampleID)
    {
        console.log(`DrawBubbleChart(${sampleID})`) ;
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
        // var meta = d3.select("#sample-metadata") ;
        // var bar = d3.select("#bar") ;
        // var bubble = d3.select("#bubble") ;

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