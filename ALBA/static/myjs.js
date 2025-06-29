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
       
        sendDataToServer(json_final);
        updateContador("zero");
        json_final = [];
    });
    document.getElementById('saveProfile').addEventListener('click', function(event) {
        saveUserProfile();
    });
});

window.addEventListener('DOMContentLoaded', function() {
    var myModal = new bootstrap.Modal(document.getElementById('customModal'));
    myModal.show();
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

let userProfile = null;

function saveUserProfile() {
    const genderElement = document.getElementById('gender');
    const ageElement = document.getElementById('age');
    const ticLevelElement = document.getElementById('ticLevel');
    
    const gender = genderElement.value;
    const age = ageElement.value;
    const ticLevel = ticLevelElement.value;
    
    if (!gender || !age || !ticLevel) {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    const ageNumber = parseInt(age);
    if (ageNumber < 1 || ageNumber > 120) {
        alert('Por favor, introduce una edad válida (1-120)');
        return;
    }
    
    userProfile = {
        gender: gender,
        age: ageNumber,
        ticLevel: parseInt(ticLevel),
        timestamp: new Date().toISOString()
    };
    
    closeProfileModal();
}

function closeProfileModal() {
    const modalElement = document.getElementById('customModal');
    
    if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        
        if (modalInstance) {
            modalInstance.hide();
        } else {
            const newModal = new bootstrap.Modal(modalElement);
            newModal.hide();
        }
    }
}

function sendDataToServer(json_final) {

    const completeData = {
        userProfile: userProfile,
        cases: json_final,
        totalCases: json_final.length,
        exportTimestamp: new Date().toISOString()
    };

    const now = new Date();
    const filename = `alba_data_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}.json`;

    fetch('/save-data/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            filename: filename,
            data: completeData
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Datos guardados en servidor:', data.filename);
            alert('Datos guardados correctamente en el servidor');
        } else {
            console.error('Error al guardar en servidor:', data.error);
            alert('Error al guardar en el servidor: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
        alert('Error de conexión con el servidor');
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
