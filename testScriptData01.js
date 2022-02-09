// ERIC CARVER 

function main (jsondata){
    let output = "";

    let input = JSON.parse(jsondata);
    let keys = Object.keys(input[0]);
    // console.log (keys);

    output += `<table>\n`;
    output +=`  <tr><th>${keys[0]}</th><th>${keys[1]}</th></tr>\n`;

    input.forEach(element => {
        output +=`  <tr><td>${element[keys[0]]}</td><td>${element[keys[1]]}</td></tr>\n`;
    });
    output += `</table>`;

    console.log (output.replace(/[&]/g, '&amp;'));

    let divHTML = document.getElementById("root");
    divHTML.innerHTML += output.replace(/[&]/g, '&amp;');
}
main (	['[{"name":"Peter & Kiro","score":479},{"name":"George, Maria & Viki","score":205}]'])