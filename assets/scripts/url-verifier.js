async function classifySpam() {
    const urlInput = document.getElementById("inputText").value;
    const response = await fetch('http://localhost:8080/api/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlInput }),
    });

    if (response.ok) {
        const result = await response.json();
        displayResults(result);
    } else {
        console.error('Erro na requisição:', response.status);
    }
}

function displayResults(result) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `
        <div class="result-item" style="border: 2px solid green;">
            <p>Seguro: ${result.harmless}</p>
            <img src="/assets/img/security.png" alt="Seguro">
        </div>
        <div class="result-item" style="border: 2px solid red;">
            <p>Malicioso: ${result.malicious}</p>
            <img src="/assets/img/error.png" alt="Malicioso">
        </div>
        <div class="result-item" style="border: 2px solid yellow;">
            <p>Suspeito: ${result.suspicious}</p>
            <img src="/assets/img/warning.png" alt="Suspeito">
        </div>
        <div class="result-item" style="border: 2px solid gray;">
            <p>Não detectado: ${result.undetected}</p>
            <img src="/assets/img/not.png" alt="Malicioso">
        </div>
        <div class="result-item" style="border: 2px solid gray;">
            <p>Timeout: ${result.timeout}</p>
            <img src="/assets/img/time.png" alt="Malicioso">
        </div>
    `;
}


function restart() {
    document.getElementById("inputText").value = "";
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "";
}

function checkEnter(event) {
    if (event.key === "Enter") {
        classifySpam();
    }
}