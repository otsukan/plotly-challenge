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
        otu_id.forEach(function(d) {
            otu_id_string.push("OTU" + " " + d.toString())

        });
        console.log(otu_id_string);
        // checking that the above process worked.
        console.log("Otu Ids:", otu_id);
        console.log("Otu Labels", otu_label);
        console.log("Sample Values", sample_value);

        var trace1 = {
            type: "bar",
            x: sample_value,
            y: otu_id_string,
            text: otu_label,
            orientation: 'h'
        };

        var data1 = [trace1];

        var layout = {
            title: "Top 10 Microbial Present in Naval",
            xaxis: {
                title: "Frequency of Microbe"
            },
            yaxis: {
                title: "Microbe ID",
            },
        };

        Plotly.newPlot('bar', data1, layout);

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
    });
};

init();

