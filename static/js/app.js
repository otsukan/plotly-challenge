// creating initial state function.

function init() {
    
    // creaitng empty lists that will hold the top 10 microbes selected information.
    var otu_id = [];
    var otu_label = [];
    var sample_value = [];
    var otu_id_string = [];
    
    // connecting to the local microbial data in the samples.json file.
    d3.json("static/js/samples.json").then(function(data) {
        
        // printing the data to the console for reference.
        console.log(data)
        
        // saving an input/select html element to variable to do work on.
        var dropdown = d3.select('#selDataset');
        
        // looping through data.names list that holds subject ids and adding them to the dropdown input list on webpage/html.
        for(var i = 0; i < data.names.length; i++) {
            var cell = dropdown.append('option');
            cell.text(data.names[i])
        };
        
        // creating a variable that holds the dictionary that contains the sample data in need.
        var microbial_samples = data.samples[0];
        
        // verifying the in the console the dictionary is question was accessed.
        console.log(microbial_samples);
        
        // looping through the sample data to get the first 10 entries.
        for(var i = 0; i < 10; i++) {
            // appending/pushing the data in question, which is the first 10, to there respective empty lists created above.
            otu_id.push(microbial_samples.otu_ids[i]);
            otu_label.push(microbial_samples.otu_labels[i]);
            sample_value.push(microbial_samples.sample_values[i]);
        };

        // converting otu ids to strings.
        otu_id.forEach(function(d) {
            otu_id_string.push("OTU" + " " + d.toString())

        });
        
        // checking that the above process worked.
        console.log("Otu Ids:", otu_id);
        console.log("Otu Labels", otu_label);
        console.log("Sample Values", sample_value);
// ------------------------------------------------------------------------------------------------------------------
        // creating a barchart based on top 10 samples captured above.
        
        // drawing out the bar chart.
        var trace1 = {
            type: "bar",
            x: sample_value,
            y: otu_id_string,
            text: otu_label,
            orientation: 'h'
        };

        // saving the sketch above to a list variable.
        var data1 = [trace1];

         // creating the descriptions of barchart.
        var layout = {
            title: "Top 10 Microbial Present in Naval",
            xaxis: {
                title: "Frequency of Microbe"
            },
            yaxis: {
                title: "Microbe ID",
            },
        };
        
        // creating the bar chart based on properties created above.
        Plotly.newPlot('bar', data1, layout);
// -----------------------------------------------------------------------------------------------------------------
        // creating the bubble chart.

        // saving data names and sample values for all entries to variables.
        
        // creating empty list to push all otu ids to.
        var all_otu_ids = [];
        
        // looping through the otu dictionary in the samples dictionary and push the ids to the empty list created above.
        for(var i = 0; i < microbial_samples.otu_ids.length; i++) {
            all_otu_ids.push(microbial_samples.otu_ids[i]);
        };
        
        // verifying the list was created. 
        console.log("All Otu Ids:", all_otu_ids);
        
        // creating empty list to push all of the samples values to.
        var all_sample_values = [];
        
        // looping through the samples values and appending the values to the empty list created above.
        for(var i = 0; i < microbial_samples.sample_values.length; i++) {
            all_sample_values.push(microbial_samples.sample_values[i]);
        };

        // verifying the list was correctly created.
        console.log("All Sample Values:", all_sample_values);
        
        // saving the graph parameters to a variable.
        var trace2 = {
            x: all_otu_ids,
            y: all_sample_values,
            mode: 'markers',
            marker: {
                size: all_sample_values,
            }
        };
        
        // saving the the above variable as a list variable.
        var data2 = [trace2]
        
        // saving graph characteristics to a variable.
        var layout1 = {
            title: "Microbial Presence in the Naval",
            xaxis: {
                title: "Otu ID"
            },
            height: 600,
            width: 1200
        };
        
        // creating the bubble chart based on the above created variables.
        Plotly.newPlot('bubble', data2, layout1);
        
// --------------------------------------------------------------------------------------------------------------------
        // creating the general information panel.
       
        // creating a variable that holds the first entry of the metadata list where the general information data is held. 
        var general_data = data.metadata[0];
       
        // creating a variable that holds the names of the keys in the metadata dictionary.
        var dict_keys = ['id', 'gender', 'ethnicity', 'age', 'location', 'bbtype', 'wfreq'];
        
        // selecting the the html element where I want to put the general information.
        var panel = d3.select('#sample-metadata');
        
        // looping through the metadata dictionary and appending the information and key ids to the panel id in the html file.
        for(var i=0; i < Object.keys(general_data).length; i++) {
            var cell = panel.append('p');
            cell.text(`${dict_keys[i]}: ${general_data[dict_keys[i]]}`);
        };
// ------------------------------------------------------------------------------------------------------------------
        // creating the gauge graph.

        // setting the frequency of belly button washing to a variable
        var wfreq = general_data['wfreq']

        // verifying the above process worked.
        console.log(wfreq)

        // creating the guage graph with its parameters.
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                  axis: { range: [0, 9] },
                  steps: [
                    { range: [0, 1], color: "lavender"},
                    { range: [1, 2], color: "lightsteelblue" },
                    { range: [2, 3], color: "cornflowerblue" },
                    { range: [3, 4], color: "royalblue" },
                    { range: [4, 5], color: "blue" },
                    { range: [5, 6], color: "mediumblue" },
                    { range: [6, 7], color: "darkblue" },
                    { range: [7, 8], color: "midnightblue" },
                    { range: [8, 9], color: "black" },
                  ],
                },
            },
        ];

        // creating the general layout of guage graph.
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 }};
        
        // ploting the guage graph based on above parameters.
        Plotly.newPlot('gauge', data, layout);
    });
};
// -------------------------------------------------------------------------------------------------------------------
// activating the function created above.
init();

// ------------------------------------------------------------------------------------------------------------------
// creating handleChange function.


// saving the body html element to a variable to do work on.
var clear_panel = d3.select('#sample-metadata')

function handleChange() {
    
    // resetting the html body for new data.
    clear_panel.html('')
    
    // creaitng empty lists that will hold the top 10 microbes selected information.
    var otu_id = [];
    var otu_label = [];
    var sample_value = [];
    var otu_id_string = [];
    
    // connecting to the local microbial data in the samples.json file.
    d3.json("static/js/samples.json").then(function(data) {
        
        // printing the data to the console for reference.
        console.log(data)
        
        // saving an input/select html element to variable to do work on.
        var dropdown = d3.select('#selDataset');
        
        // looping through data.names list that holds subject ids and adding them to the dropdown input list on webpage/html.
        for(var i = 0; i < data.names.length; i++) {
            var cell = dropdown.append('option');
            cell.text(data.names[i])
            cell.value = data.names[i];
        };
        
        // saving the dropdown menu element to a variable.
        var inputElement = d3.select('#selDataset');
        
        // saving the value clicked in the dropdown menu to a variable.
        var inputValue = inputElement.property('value');
        
        // creating empty dictionary to append subject id and dictionary number in other lists.
        var otu_dict = {}
        
        // looping through data.names list to append subject id as the key and value that matches other dictionary keys.
        for(var i = 0; i < data.names.length; i++) {
            otu_dict[data.names[i]] = i;
        }
        
        // verifying dictionary results.
        console.log("Otu Dictionary", otu_dict);
        
        // creating a variable that holds the dictionary that contains the sample data in need.
        var microbial_samples = data.samples[otu_dict[inputValue]];
        
        // verifying the in the console the dictionary is question was accessed.
        console.log(microbial_samples);
        
        // using if then statement below to capture samples that are under 10.
        if(microbial_samples.otu_ids.length < 10) {
            
            // looping through the under 10 samples.
            for(var i = 0; i < microbial_samples.otu_ids.length; i++) {
                
                // appending/pushing the data in question, which is the first 10, to there respective empty lists created above.
                otu_id.push(microbial_samples.otu_ids[i]);
                otu_label.push(microbial_samples.otu_labels[i]);
                sample_value.push(microbial_samples.sample_values[i]);
            };
            
            otu_id.forEach(function(d) {
                otu_id_string.push("OTU" + " " + d.toString())
            });
        }
        else {
            // looping through the sample data to get the first 10 entries.
            for(var i = 0; i < 10; i++) {
                // appending/pushing the data in question, which is the first 10, to there respective empty lists created above.
                otu_id.push(microbial_samples.otu_ids[i]);
                otu_label.push(microbial_samples.otu_labels[i]);
                sample_value.push(microbial_samples.sample_values[i]);
            };
            
            //converting otu ids to strings. 
            otu_id.forEach(function(d) {
                otu_id_string.push("OTU" + " " + d.toString())

            });
        };
        
        // checking that the above process worked.
        console.log("Otu Ids:", otu_id);
        console.log("Otu Labels", otu_label);
        console.log("Sample Values", sample_value);
        
        
        // creating a barchart based on top 10 samples captured above.
        
        // drawing out the bar chart.
        var trace1 = {
            type: "bar",
            x: sample_value,
            y: otu_id_string,
            text: otu_label,
            orientation: 'h'
        };

        // saving the sketch above to a list variable.
        var data1 = [trace1];

        // creating the descriptions of barchart.
        var layout = {
            title: "Top 10 Microbial Present in Naval",
            xaxis: {
                title: "Frequency of Microbe"
            },
            yaxis: {
                title: "Microbe ID",
            },
        };

        // creating the bar chart based on properties created above.
        Plotly.newPlot('bar', data1, layout);
// ----------------------------------------------------------------------------------------------------------------------
        
        // creating the bubble chart.

        // saving data names and sample values for all entries to variables.
        
        // creating empty list to push all otu ids to.
        var all_otu_ids = [];
        
        // looping through the otu dictionary in the samples dictionary and push the ids to the empty list created above.
        for(var i = 0; i < microbial_samples.otu_ids.length; i++) {
            all_otu_ids.push(microbial_samples.otu_ids[i]);
        };
        
        // verifying the list was created. 
        console.log("All Otu Ids:", all_otu_ids);
        
        // creating empty list to push all of the samples values to.
        var all_sample_values = [];
        
        // looping through the samples values and appending the values to the empty list created above.
        for(var i = 0; i < microbial_samples.sample_values.length; i++) {
            all_sample_values.push(microbial_samples.sample_values[i]);
        };
        
        // verifying the list was correctly created.
        console.log("All Sample Values:", all_sample_values);
        
        // saving the graph parameters to a variable.
        var trace2 = {
            x: all_otu_ids,
            y: all_sample_values,
            mode: 'markers',
            marker: {
                size: all_sample_values,
            }
        };
        
        // saving the the above variable as a list variable.
        var data2 = [trace2]
        
        // saving graph characteristics to a variable.
        var layout1 = {
            title: "Microbial Presence in the Naval",
            xaxis: {
                title: "Otu ID"
            },
            height: 600,
            width: 1200
        };
        
        // creating the bubble chart based on the above created variables.
        Plotly.newPlot('bubble', data2, layout1);
        
// -----------------------------------------------------------------------------------------------------------------
        // creating the general information panel.
        
        // creating a variable that holds the first entry of the metadata list where the general information data is held. 
        var general_data = data.metadata[otu_dict[inputValue]];
        
        // creating a variable that holds the names of the keys in the metadata dictionary.
        var dict_keys = ['id', 'gender', 'ethnicity', 'age', 'location', 'bbtype', 'wfreq'];
        
        // selecting the the html element where I want to put the general information.
        var panel = d3.select('#sample-metadata');
        
        // looping through the metadata dictionary and appending the information and key ids to the panel id in the html file.
        for(var i=0; i < Object.keys(general_data).length; i++) {
            var cell = panel.append('p');
            cell.text(`${dict_keys[i]}: ${general_data[dict_keys[i]]}`);
        };
// -------------------------------------------------------------------------------------------------------------------------
        // creating the gauge graph.

        // setting the frequency of belly button washing to a variable
        var wfreq = general_data['wfreq']

        // verifying the above process worked.
        console.log(wfreq)

        // creating the guage graph with its parameters.
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                  axis: { range: [0, 9] },
                  steps: [
                    { range: [0, 1], color: "lavender"},
                    { range: [1, 2], color: "lightsteelblue" },
                    { range: [2, 3], color: "cornflowerblue" },
                    { range: [3, 4], color: "royalblue" },
                    { range: [4, 5], color: "blue" },
                    { range: [5, 6], color: "mediumblue" },
                    { range: [6, 7], color: "darkblue" },
                    { range: [7, 8], color: "midnightblue" },
                    { range: [8, 9], color: "black" },
                  ],
                },
            },
        ];

        // creating the general layout of guage graph.
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 }};
        
        // ploting the guage graph based on above parameters.
        Plotly.newPlot('gauge', data, layout);
    });
};

// ----------------------------------------------------------------------------------------------------------------------

// saving element to variable to create a handlechange.
var button = d3.select('#selDataset');

// creating the change on button click function with handleChange function created above.
button.on('change', handleChange)
 

