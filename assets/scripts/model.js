const data = {
  data: [
    {
      text: "Este é um email de teste com um link de phishing: http://phishingexample.com",
      label: "não spam",
    },
    {
      text: "Ganhe dinheiro rápido e fácil!",
      label: "spam",
    },
    {
      text: "Oferta especial: Desconto de 50% hoje. Visite http://specialoffers.com",
      label: "não spam",
    },
    {
      text: "Você ganhou um prêmio de um milhão de dólares! Acesse http://millionprize.com",
      label: "spam",
    },
    {
      text: "Confirme sua senha agora em http://confirm-password.net",
      label: "spam",
    },
    {
      text: "Por favor, encontre o relatório anexado em http://reportdownload.com",
      label: "não spam",
    },
    {
      text: "Perca peso rapidamente com este produto milagroso em http://weightlossmiracle.com",
      label: "spam",
    },
    {
      text: "Reunião de equipe às 14h. Lembrete: http://teammeetingreminder.com",
      label: "não spam",
    },
  ],
};

function classifySpam() {
  const inputText = document.getElementById("inputText").value.trim();

  if (inputText !== "") {
    const isSuspicious = checkForSuspiciousURL(inputText, data);

    const resultElement = document.getElementById("result");
    if (isSuspicious) {
      resultElement.innerText = "Esta URL é suspeita.";
    } else {
      resultElement.innerText = "Esta URL não é suspeita.";
    }
  }
}

function checkForSuspiciousURL(text, data) {
  const urlRegex = /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi;
  const urls = text.match(urlRegex);

  if (urls && urls.length > 0) {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i].toLowerCase();

      for (let j = 0; j < data.data.length; j++) {
        const textWithUrl = data.data[j].text.toLowerCase();
        if (textWithUrl.includes(url)) {
          if (data.data[j].label === "spam") {
            return true;
          }
        }
      }
    }
  }
  return false;
}

function restart() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("inputText").value = "";
}

function checkEnter(event) {
  if (event.key === "Enter") {
    classifySpam();
  }
}
