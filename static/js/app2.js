console.log("new homework")


//* <select id="selDataset" onchange="optionChanged(this.value)"></select>)

var selector = d3.select("#selDataset") ;

d3.json("/samples.json").then((data) => 
{
    var sampleNames = data.names ;

    sampleNames.forEach((sampleID) => 

    {
        selector.append("option").text(sampleID).property("value", sampleID)

    });

}) ;







//<div id="sample-metadata" class="panel-body"> </div>

function fillPanel(sample) 

    {

      d3.json("/samples.json").then((data) => 

        {

            var metadata = data.metadata ;

            var filterResult = metadata.filter(sampleObj => sampleObj.id == sample) ;

            var result = filterResult[0] ;

            var panel = d3.select("#sample-metadata") ;

            panel.html("") ;

            Object.entries(result).forEach(([key, value]) => 

            {
                panel.append("h5").text(`${key} : ${value}`)
                console.log(`key : ${key} and value : ${value}`) ;


            });

                
            

        });
        
    };

    



//<div id="bar"></div>

//<div id="gauge"></div>

//<div id="bubble"></div> */