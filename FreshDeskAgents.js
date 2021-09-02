(function(){
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            alias: "agent id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "agent name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "email",
            alias: "agent email",
            dataType: tableau.dataTypeEnum.string
        }


        ];

        var tableSchema = {
            id: "listofagents",
            alias: "Agents from FreshDesk",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };


    // Download the data
       var pagescount=1,
        loopPages = "true" 
       ;

    myConnector.getData = 

    function getjsondata(table, doneCallback) {     
        var auth = btoa('PcEEdbShACwO1Dg76:X'); 

        if (loopPages == "false") {
                pagescount = 0;
            }
        $.ajax({
              type: "GET",
              url: "https://australianrailtechnology.freshdesk.com/api/v2/agents",
              dataType: 'json',
              headers: {
                "Authorization": "Basic " + auth
              },
              success: function (resp){
            var agents = resp,
                tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = agents.length; i < len; i++) {
                tableData.push({
                    "id": agents[i].id,
                    "name": agents[i].contact.name,
                    "email":agents[i].contact.email

                });
            }

            table.appendRows(tableData);
            doneCallback();

        },
    });  
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "FreshDesk Agents"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
