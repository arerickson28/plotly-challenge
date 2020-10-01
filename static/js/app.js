console.log("I have belly-button");

//* <select id="selDataset" onchange="optionChanged(this.value)"></select>

//<div id="sample-metadata" class="panel-body"></div>

//* <div id="bar"></div> */

//<div id="gauge"></div>

//<div id="bubble"></div> */


function InitDash() 
    {

        console.log(`Calling InitDash()`) ;

        //Filling Selector

        var selector = d3.select("#selDataset") ;
        var meta = d3.select("#sample-metadata") ;
        var bar = d3.select("#bar") ;
        var bubble = d3.select("#bubble") ;

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
                var metaData = data.metadata ;

                DrawBarGraph(sampleID) ;
            

                DrawBubbleChart(sampleID) ;

            }) ;

    }

InitDash() ;