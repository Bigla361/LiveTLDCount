window.addEventListener('load', function() {
    const updated = document.getElementById("updated")
    const count = document.getElementById("count")
    var xhttp = new XMLHttpRequest();

    function formatDate(Date1) {
        var updateDate = Date1.split("  ")[0].split(" ")[1];
        var updateTime = Date1.split("  ")[1].split(" ");
        var updateMonth = new Date(Date.parse(updateDate + " 1, 2012")).getMonth()
        return new Date(Date.UTC(updateTime[2], updateMonth, updateTime[0], updateTime[1].split(":")[0], updateTime[1].split(":")[1], updateTime[1].split(":")[2]));
    }

    function update() {
        fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt')
            .then(function(response) {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then(function(data) {
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        if (md5(data) == xhttp.responseText.split("  ")[0]) {
                            updated.innerHTML = "Last updated: " + formatDate(data.split('\n')[0].split('d ')[1].slice(3));
                            count.innerHTML = data.split(/\r\n|\r|\n/).length - 2
                        } else {
                            console.log("MD5 does not match.")
                        }
                    }
                };
                xhttp.open("GET", "https://data.iana.org/TLD/tlds-alpha-by-domain.txt.md5", true);
                xhttp.send();
            });


    }
    update()
    setInterval(update, 5000);
})