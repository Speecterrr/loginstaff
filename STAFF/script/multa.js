// Evento que garante que o código JavaScript só será executado após o carregamento do HTML.
document.addEventListener('DOMContentLoaded', function() {
    // Botão para alternar a visibilidade das seções de multas e calculadora
    var toggleFineButton = document.getElementById('toggleFineButton');
    var fineField = document.getElementById('fineField');
    var calculator = document.getElementById('calculator'); // Adicione o ID do seu elemento de calculadora aqui

    // Inicializa as seções como ocultas
    if (fineField && calculator) {
        fineField.style.display = 'none';
        calculator.style.display = 'none'; // Certifique-se de que a calculadora também esteja oculta
    } else {
        if (!fineField) console.error('Seção de multas não encontrada!');
        if (!calculator) console.error('Calculadora não encontrada!');
    }

    // Adiciona o evento de clique ao botão para alternar as visibilidades
    if (toggleFineButton) {
        toggleFineButton.addEventListener('click', function() {
            // Alterna entre display none e flex para manter o layout flexbox.
            fineField.style.display = fineField.style.display === 'none' ? 'flex' : 'none';
            calculator.style.display = calculator.style.display === 'none' ? 'flex' : 'none'; // Alterna a calculadora também
        });
    } else {
        console.error('Botão de alternância de multas não encontrado!');
    }

    // Botão para copiar as informações de multas
    var copyFineButton = document.getElementById('copyFineButton');
    if (copyFineButton) {
        copyFineButton.addEventListener('click', copyFineDetails);
    } else {
        console.error('Botão de cópia de multas não encontrado!');
    }
})

function copyFineDetails() {
    var selectedEmoji = document.getElementById('selectedEmoji') ? document.getElementById('selectedEmoji').textContent : '❌';
    var complainantDiscordID = document.getElementById('complainantDiscordID') ? document.getElementById('complainantDiscordID').value : '';
    var complainantGameID = document.getElementById('complainantGameID') ? document.getElementById('complainantGameID').value : '';
    var accusedDiscordID = document.getElementById('accusedDiscordID') ? document.getElementById('accusedDiscordID').value : '';
    var accusedGameID = document.getElementById('accusedGameID') ? document.getElementById('accusedGameID').value : '';
    var reason = document.getElementById('reason') ? document.getElementById('reason').value : '';
    var evidence = document.getElementById('evidence') ? document.getElementById('evidence').value : '';
    var fineAmount = document.getElementById('fineAmount') ? document.getElementById('fineAmount').value : '';
    
    // Certifique-se de usar .value para obter o valor do elemento select
    var tagIDElement = document.getElementById('tagID'); 
    var tagID = tagIDElement ? tagIDElement.value : ''; 
    var punishmentText = tagID === 'N/A' ? 'N/A' : (tagID ? `<@&${tagID}>` : '');

    var formattedFineInfo =
        `>>> ${selectedEmoji} **DENUNCIANTE**: <@${complainantDiscordID}> // ${complainantGameID}\n` +
        `${selectedEmoji} **DENUNCIADO**: <@${accusedDiscordID}> // ${accusedGameID}\n` +
        `${selectedEmoji} **MOTIVO**: ${reason}\n` +
        `${selectedEmoji} **PUNIÇÃO**: ${punishmentText}\n` +
        `${selectedEmoji} **PROVAS**: ${evidence}\n` +
        `${selectedEmoji} **VALOR**: ${fineAmount}\n`;

    var outputArea = document.getElementById('output');
    if (outputArea) {
        outputArea.value = formattedFineInfo;
        navigator.clipboard.writeText(formattedFineInfo)
            .then(() => console.log('Informações de multas copiadas para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar informações de multas: ', err));
    } else {
        console.error('Elemento de área de texto para multas não encontrado!');
    }
}


