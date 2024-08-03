document.addEventListener('DOMContentLoaded', (event) => {
    setCurrentDate();
    addEmojiButtonListener();
    addEmojiSelectorListener();

    const actionButton = document.getElementById('actionButton');
    const actionModal = document.getElementById('actionModal');
    const closeActionModal = document.getElementById('closeActionModal');

    actionButton.addEventListener('click', () => {
        actionModal.style.display = 'block';
    });

    closeActionModal.addEventListener('click', () => {
        actionModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === actionModal) {
            actionModal.style.display = 'none';
        }
    });

    const togglePendencyButton = document.getElementById('togglePendencyButton');
    const deliveredItemsField = document.getElementById('deliveredItemsField');

    togglePendencyButton.addEventListener('click', function() {
        if (deliveredItemsField.style.display === 'none' || deliveredItemsField.style.display === '') {
            deliveredItemsField.style.display = 'block';
        } else {
            deliveredItemsField.style.display = 'none';
        }
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = button.getAttribute('data-tab');

            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === tabId) {
                    tab.classList.add('active');
                }
            });

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        });
    });


    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }

    const copyPendencyReportButton = document.getElementById('copyPendencyReportButton');
    copyPendencyReportButton.addEventListener('click', copyPendencyReport);
});

function setCurrentDate() {
    const resolvedDateElement = document.getElementById('resolvedDate');
    if (resolvedDateElement) {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const monthIndex = date.getMonth();
        const monthNumber = (monthIndex + 1).toString().padStart(2, '0');
        const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
        const formattedDate = `${day}/${monthNumber} ${monthNames[monthIndex]}`;
        resolvedDateElement.value = formattedDate;
    } else {
        console.error('Elemento resolvedDate não encontrado!');
    }
}

function addEmojiButtonListener() {
    const emojiButton = document.getElementById('emojiButton');
    if (emojiButton) {
        emojiButton.addEventListener('click', toggleEmojiMenu);
    } else {
        console.error('Elemento emojiButton não encontrado!');
    }
}

function addEmojiSelectorListener() {
    const emojiSelector = document.getElementById('emojiSelector');
    if (emojiSelector) {
        emojiSelector.addEventListener('change', handleEmojiSelection);
    } else {
        console.error('Elemento emojiSelector não encontrado!');
    }
}

function toggleEmojiMenu() {
    const emojiList = document.getElementById('emojiList');
    if (emojiList) {
        emojiList.style.display = emojiList.style.display === 'block' ? 'none' : 'block';
    } else {
        console.error('Elemento emojiList não encontrado!');
    }
}

function handleEmojiSelection() {
    const emojiSelector = document.getElementById('emojiSelector');
    const selectedEmoji = document.getElementById('selectedEmoji');
    if (emojiSelector && selectedEmoji) {
        const [name, id] = emojiSelector.value.split(':');
        selectedEmoji.textContent = `:${name}:${id}`;
    } else {
        console.error('Elemento emojiSelector ou selectedEmoji não encontrado!');
    }
}

function copySelectedTopics() {
    const form = document.getElementById('caseForm');
    const output = document.getElementById('output');
    if (form && output) {
        const accusedDiscordID = form.accusedDiscordID.value;
        const accusedGameID = form.accusedGameID.value;
        const ticket = form.ticket.value;
        const reason = form.reason.value;
        let tagID = form.tagID.value;

        if (tagID === 'PRISAO 300 MESES ') {
            tagID = 'PRISAO 300 MESES';
        } else if (tagID !== 'N/A') {
            tagID = `<@&${tagID}>`;
        }

        const selectedEmoji = document.getElementById('selectedEmoji').textContent;

        const text = `>>> ${selectedEmoji} **DENUNCIADO**: <@${accusedDiscordID}> // ${accusedGameID}\n` +
            `${selectedEmoji} **TICKET**: ${ticket}\n` +
            `${selectedEmoji} **MOTIVO**: ${reason}\n` +
            `${selectedEmoji} **PUNIÇÃO**: ${tagID}`;

        output.value = text;
        navigator.clipboard.writeText(text)
            .then(() => console.log('Informações selecionadas copiadas para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar texto: ', err));
    } else {
        console.error('Elementos do formulário ou de saída não encontrados!');
    }
}

function copyPrisonAndFine() {
    const form = document.getElementById('caseForm');
    const output = document.getElementById('output');
    if (form && output) {
        const accusedDiscordID = form.accusedDiscordID.value;
        const accusedGameID = form.accusedGameID.value; // Pega o ID do jogo do denunciado
        const ticket = form.ticket.value;
        const reason = form.reason.value;
        const evidence = form.evidence.value;

        const prisonAndFineText = `>>> **DISCORD:** <@${accusedDiscordID}>\n` +
            `**ID:** ${accusedGameID}\n` +  // Usa o ID do jogo do denunciado
            `**TICKET:** ${ticket}\n` +
            `**PRISÃO:** 300 meses \n` +
            `**MULTA:** 600k\n` +
            `**MOTIVO:** ${reason}\n` +
            `**PROVA:** ${evidence}`;

        output.value = prisonAndFineText;
        navigator.clipboard.writeText(prisonAndFineText)
            .then(() => console.log('Informações de prisão e multa copiadas para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar texto: ', err));
    } else {
        console.error('Elementos do formulário ou de saída não encontrados!');
    }
}
function updateJudgmentEmoji() {
    var outputArea = document.getElementById('output');
    
    if (!outputArea) {
        console.error('Área de saída não encontrada!');
        return;
    }

    var form = document.getElementById('caseForm');
    if (form) {
        var resolvedByID = /^\d+$/.test(form.resolvedByID.value) ? `<@${form.resolvedByID.value}>` : form.resolvedByID.value;
        var tagIDElement = document.getElementById('tagID');
        var tagID = tagIDElement ? tagIDElement.value : '';
        var fineAmountElement = document.getElementById('fineAmount');
        var fineAmount = fineAmountElement ? fineAmountElement.value : '';

        var punishmentText = tagID === 'N/A' ? 'N/A' : (tagID === 'PRISAO 300 MESES' ? 'PRISAO 300 MESES ' : `<@&${tagID}>`);
        if (fineAmount) {
            punishmentText += ` + multa = ${fineAmount}`;
        }

        var selectedEmoji = document.getElementById('selectedEmoji').textContent;

        var judgmentText = form.judgment.value;
        var ticket = form.ticket.value;

        var newText = `>>> ${selectedEmoji} **RESOLVIDO POR**: ${resolvedByID} | ${form.resolvedDate.value}\n\n` +
            `${selectedEmoji} **DENUNCIANTE**: <@${form.complainantDiscordID.value}> // ${form.complainantGameID.value}\n` +
            `${selectedEmoji} **DENUNCIADO**: <@${form.accusedDiscordID.value}> // ${form.accusedGameID.value}\n` +
            `${selectedEmoji} **TICKET**: ${ticket}\n` +
            `${selectedEmoji} **JULGAMENTO**: ${judgmentText}\n` +
            `${selectedEmoji} **MOTIVO**: ${form.reason.value}\n` +
            `${selectedEmoji} **PUNIÇÃO**: ${punishmentText}\n` +
            `${selectedEmoji} **PROVAS**: ${form.evidence.value}`;

        outputArea.value = newText;
    } else {
        console.error('Formulário não encontrado!');
    }
}

function copyText() {
    updateJudgmentEmoji();
    
    var outputArea = document.getElementById('output');
    if (outputArea) {
        navigator.clipboard.writeText(outputArea.value)
            .then(() => console.log('Informações copiadas para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar texto: ', err));
    } else {
        console.error('Área de saída não encontrada!');
    }
}

function copyPendencyReport() {
    const output = document.getElementById('output');
    if (output) {
        const deliveredPlayerID = document.getElementById('deliveredPlayerID').value;
        const deliveredDiscordID = document.getElementById('deliveredDiscordID').value;
        const deliveredItems = document.getElementById('deliveredItems').value;
        const request = document.getElementById('request').value;
        const pendencyDetailsText = `\`\`\`✅ PENDÊNCIA ENTREGUE ✅\`\`\`\n\n>>> **ID DO PLAYER:** ${deliveredPlayerID}\n**DISCORD:** <@${deliveredDiscordID}>\n**ITENS ENTREGUES:** ${deliveredItems}\n**SOLICITAÇÃO:** ${request}`;
        output.value = pendencyDetailsText;
        navigator.clipboard.writeText(pendencyDetailsText)
            .then(() => console.log('Pendências copiadas para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar texto: ', err));
    } else {
        console.error('Elemento de saída não encontrado!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const copyPendencyReportButton = document.getElementById('copyPendencyReportButton');
    copyPendencyReportButton.addEventListener('click', copyPendencyReport);
});

document.addEventListener('DOMContentLoaded', function() {
    const copyPendencyReportButton = document.getElementById('copyPendencyReportButton');
    copyPendencyReportButton.addEventListener('click', copyPendencyReport);
});

document.addEventListener('DOMContentLoaded', function() {
    const copyPendencyReportButton = document.getElementById('copyPendencyReportButton');
    copyPendencyReportButton.addEventListener('click', copyPendencyReport);
});



document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.onkeydown = function (e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || 
        (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67 || e.keyCode == 83 || e.keyCode == 80))) {
        return false;
    }
};

document.addEventListener('dragstart', function (e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

window.onbeforeprint = function () {
    return false;
};


cityModal.style.display = 'flex';

selectCityButton.addEventListener('click', function() {
    const selectedCity = citySelect.value;
    if (selectedCity) {
        updateTags(selectedCity);
        cityModal.style.display = 'none';
    } else {
        alert('Por favor, selecione uma cidade.');
    }
});
