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

        var data = [trace1];

        var layout = {
            title: "Top 10 Microbial Present in Naval",
            xaxis: {
                title: "Frequency of Microbe"
            },
            yaxis: {
                title: "Microbe Names",
            },
        };

        Plotly.newPlot('bar', data, layout);
    });
};

init();

var list = [12,12,34,243];
console.log(list);