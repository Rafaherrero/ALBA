var contador = 0;

document.addEventListener("DOMContentLoaded", function() {
    var json_final = [];
    document.getElementById("btn-previous").addEventListener("click", function() {
        var json = generateJson("previous");
        json_final.push(json);
        updateDiv();
        updateContador("add");
    });
    document.getElementById("btn-same").addEventListener("click", function() {
        var json = generateJson("same");
        json_final.push(json);
        updateDiv();
        updateContador("add");
    });
    document.getElementById("btn-next").addEventListener("click", function() {
        var json = generateJson("next");
        json_final.push(json);
        updateDiv();
        updateContador("add");
    });
    document.getElementById("btn-download").addEventListener("click", function() {
        var data = JSON.stringify(json_final);
        var blob = new Blob([data], {type: 'application/json'});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'json_final.json';
        a.click();
        updateContador("zero");
        json_final = [];
    });
    document.getElementById('btn-send').addEventListener('click', function() {
        enviarCorreo(json_final);
    });
});

function updateDiv() {
    fetch(window.location.href)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const newContent = doc.querySelector('#case-content').innerHTML;
            document.querySelector('#case-content').innerHTML = newContent;
        });
}

function updateContador(opcion) {
    var contadorElement2 = document.getElementById("contador-text");
    if (opcion == "add") contador++;
    if (opcion == "zero"){
        contador = 0;
        document.getElementById("btn-download").classList.add("disabled");
        document.getElementById("btn-download").classList.add("btn-danger");
        document.getElementById("btn-download").classList.remove("btn-success");
    }
    if (contador == 1) {
        document.getElementById("btn-download").classList.remove("disabled");
        document.getElementById("btn-download").classList.remove("btn-danger");
        document.getElementById("btn-download").classList.add("btn-success");
        contadorElement2.textContent = "caso";
    }
    else {
        contadorElement2.textContent = "casos";
    }
    var contadorElement = document.getElementById("contador");
    contadorElement.textContent = contador.toString();
}

function generateJson(decision) {
    var json = {
        tag: decision,
        gender: document.getElementById("gender-tag").textContent,
        age: document.getElementById("age-tag").textContent,
        concepts: document.getElementById("concepts-tag").textContent,
        tries: document.getElementById("tries-tag").textContent,
        calification: document.getElementById("calification-tag").textContent,
        help: document.getElementById("help-tag").textContent,
        emotions: document.getElementById("emotions-tag").textContent,
        q1: document.getElementById("q1-tag").textContent,
        q2: document.getElementById("q2-tag").textContent,
        q3: document.getElementById("q3-tag").textContent
    };
    return json;
}

function enviarCorreo(json_final) {
    const datosJson = JSON.stringify(json_final, null, 2);
    const mailtoLink = `mailto:rherrero@ull.edu.es?subject=Datos pctag&body=${encodeURIComponent(datosJson)}`;
    window.location.href = mailtoLink;
}