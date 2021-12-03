function GetKHIDashboard() {
            var url = "/audit/audit_plot";
            $.ajax({
                url: url,
                data: {

                },
                type: 'GET',
                complete: GetKHIDashboardDetailsHandler
            });
        }
        function GetKHIDashboardDetailsHandler(data, status) {
        console.log(data)
            var output = JSON.parse(data.responseText);
            GetKHIDashboardDetails(output);
        }
        function GetKHIDashboardDetails(values) {
    console.log(values);
            new Chart(document.getElementById("chartContainer"), {
                type: 'bar',
                data: {
                    labels: ["Script Execution data"],
                    datasets: [
                    {
                        label: "Pass",
                        backgroundColor: "green",
                        data: [values['pass']],
                        fill: false
                    },
                    {
                        label: "Fail",
                        backgroundColor: "red",
                        data: [values['fail']],
                        fill: false
                    },
                    ]
                },
                options: {
                scales: {
                    yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 20
                            }
                        }]
                },
                    title: {
                        display: true,
                        text: ''
                    }
                }
            });
        }
        //End GetKHIDashboard