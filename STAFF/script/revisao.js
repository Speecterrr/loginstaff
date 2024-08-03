document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    checkReviewStatus();
    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
        updateTags(selectedCity);
    } else {
        document.getElementById('cityModal').style.display = 'flex';
    }
});

function initializeEventListeners() {
    const copyReviewButton = document.getElementById('copyReviewButton');
    copyReviewButton.addEventListener('click', copyReviewReport);

    const revisaoStatus = document.getElementById('revisaoStatus');
    revisaoStatus.addEventListener('change', checkReviewStatus);

    const modalCitySelect = document.getElementById('modalCitySelect');
    const selectCityButton = document.getElementById('selectCityButton');
    selectCityButton.addEventListener('click', function() {
        const selectedCity = modalCitySelect.value;
        if (selectedCity) {
            localStorage.setItem('selectedCity', selectedCity);
            document.getElementById('cityModal').style.display = 'none';
            updateTags(selectedCity);
        }
    });
}

function checkReviewStatus() {
    const revisaoStatus = document.getElementById('revisaoStatus').value;
    const convertidoContainer = document.getElementById('convertidoContainer');

    if (revisaoStatus === 'convertida') {
        convertidoContainer.style.display = 'flex';
    } else {
        convertidoContainer.style.display = 'none';
    }
}

function updateTags(selectedCity) {
    const tags = {
        bahamas: {
            
            "1218693120183631974": "VERBAL",
            "1218692969973022730": "ADV1",
            "1218693038629453975": "ADV2",
            "1218693194796241009": "BANIDO",
            "Prisao 300 meses + multa 600k": "Prisao + 600k"
        },
        paraisopolis: {
            "1228777122214973510": "VERBAL",
            "1228777170877419691": "ADV1",
            "1228777223071334440": "ADV2",
            "1228777285281124563": "BANIDO",
            "Prisao 300 meses + multa 600k": "Prisao + 600k"

        }
    };

    const allTagSelects = document.querySelectorAll('#tagID, #tagIDRevisao, #convertido');
    allTagSelects.forEach(select => {
        select.innerHTML = '<option value="">Escolha uma Tag</option>';
        if (selectedCity && tags[selectedCity]) {
            for (const [value, text] of Object.entries(tags[selectedCity])) {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = text;
                select.appendChild(option);
            }
        }
    });
}

function copyReviewReport() {
    const id = document.getElementById('id').value;
    const ticketDenuncia = document.getElementById('ticketDenuncia').value;
    const ticketRevisao = document.getElementById('ticketRevisao').value;
    const motivo = document.getElementById('motivo').value;
    const tagIDRevisao = document.getElementById('tagIDRevisao').value;
    const revisaoStatus = document.getElementById('revisaoStatus').value;
    const convertidoSelect = document.getElementById('convertido');
    const convertido = Array.from(convertidoSelect.selectedOptions).map(option => `<@&${option.value}>`).join(' ');

    let reportText = '';

    switch(revisaoStatus) {
        case 'aceita':
            reportText = `\`\`\`✅ REVISÃO ACEITA ✅\`\`\`\n` +
                         `> | **ID: ${id}**\n` +
                         `> | **TICKET DENUNCIA: ${ticketDenuncia}**\n` +
                         `> | **TICKET REVISÃO: ${ticketRevisao}**\n` +
                         `> | **MOTIVO: ${motivo}**\n` +
                         `> | **PUNIÇÃO: <@&${tagIDRevisao}>**\n`;
            break;
        case 'negada':
            reportText = `\`\`\`❌ REVISÃO NEGADA ❌\`\`\`\n` +
                         `> | **ID: ${id}**\n` +
                         `> | **TICKET DENUNCIA: ${ticketDenuncia}**\n` +
                         `> | **TICKET REVISÃO: ${ticketRevisao}**\n` +
                         `> | **MOTIVO: ${motivo}**\n` +
                         `> | **PUNIÇÃO: <@&${tagIDRevisao}>**\n`;
            break;
        case 'convertida':
            reportText = `\`\`\`✅ REVISÃO CONVERTIDA ✅\`\`\`\n` +
                         `> | **ID: ${id}**\n` +
                         `> | **TICKET DENUNCIA: ${ticketDenuncia}**\n` +
                         `> | **TICKET REVISÃO: ${ticketRevisao}**\n` +
                         `> | **MOTIVO: ${motivo}**\n` +
                         `> | **PUNIÇÃO: <@&${tagIDRevisao}>**\n` +
                         `> | **CONVERTIDO EM: ${convertido}**\n`;
            break;
        default:
            alert('Selecione um status de revisão válido.');
            return;
    }

    const output = document.getElementById('output');
    output.value = reportText;

    navigator.clipboard.writeText(reportText)
        .then(() => console.log('Revisão de banimento copiada para a área de transferência!'))
        .catch(err => console.error('Erro ao copiar texto: ', err));
}













