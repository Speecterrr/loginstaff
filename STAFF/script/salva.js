document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    addEmojiButtonListener();
    addEmojiSelectorListener();
    initializeEventListeners();
    checkReviewStatus();
    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
        updateTags(selectedCity);
    } else {
        document.getElementById('cityModal').style.display = 'flex';
    }

    const saveReportButton = document.getElementById('saveReportButton');
    const clearReportsButton = document.getElementById('clearReportsButton');
    const reportList = document.getElementById('reportList');
    const calculatorItems = document.querySelectorAll('.item-qty');
    const actionButton = document.getElementById('actionButton');
    const actionModal = document.getElementById('actionModal');
    const closeActionModal = document.getElementById('closeActionModal');

    saveReportButton.addEventListener('click', function() {
        const reportData = gatherFormData();
        saveReport(reportData);
        localStorage.setItem('lastResolvedByID', reportData.resolvedByID);
        setCurrentDate();
        updateReportList();
        closeSections();
    });

    clearReportsButton.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja limpar todos os relatórios salvos?')) {
            clearAllReports();
            updateReportList();
        }
    });

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

    function gatherFormData() {
        const itemQuantities = {};
        calculatorItems.forEach(item => {
            if (item.value) {
                itemQuantities[item.id] = item.value;
            }
        });

        return {
            resolvedByID: document.getElementById('resolvedByID').value,
            resolvedDate: document.getElementById('resolvedDate').value,
            complainantDiscordID: document.getElementById('complainantDiscordID').value,
            complainantGameID: document.getElementById('complainantGameID').value,
            accusedDiscordID: document.getElementById('accusedDiscordID').value,
            accusedGameID: document.getElementById('accusedGameID').value,
            judgment: document.getElementById('judgment').value,
            reason: document.getElementById('reason').value,
            tagID: document.getElementById('tagID').value,
            evidence: document.getElementById('evidence').value,
            pendency: document.getElementById('pendency').value,
            fineAmount: document.getElementById('fineAmount').value,
            ticket: document.getElementById('ticket').value,
            itemQuantities: itemQuantities,
            total: document.getElementById('total').textContent,
            deliveredPlayerID: document.getElementById('deliveredPlayerID').value,
            deliveredDiscordID: document.getElementById('deliveredDiscordID').value,
            deliveredItems: document.getElementById('deliveredItems').value,
            request: document.getElementById('request').value,
            revisaoStatus: document.getElementById('revisaoStatus').value,
            id: document.getElementById('id').value,
            ticketDenuncia: document.getElementById('ticketDenuncia').value,
            ticketRevisao: document.getElementById('ticketRevisao').value,
            motivo: document.getElementById('motivo').value,
            tagIDRevisao: document.getElementById('tagIDRevisao').value,
            convertido: document.getElementById('convertido').value
        };
    }

    function saveReport(reportData) {
        const reportKey = 'report_' + new Date().getTime();
        localStorage.setItem(reportKey, JSON.stringify(reportData));
        clearForm(false);
    }

    function clearForm(clearResolvedFields = true) {
        const resolvedByIDValue = document.getElementById('resolvedByID').value;
        const resolvedDateValue = document.getElementById('resolvedDate').value;

        document.getElementById('caseForm').reset();
        document.getElementById('pendencyForm').reset();
        document.getElementById('reviewForm').reset();
        calculatorItems.forEach(item => item.value = '');
        document.getElementById('total').textContent = 'Total: R$';

        if (!clearResolvedFields) {
            document.getElementById('resolvedByID').value = resolvedByIDValue;
            document.getElementById('resolvedDate').value = resolvedDateValue;
        }
    }

    function loadReport(key) {
        clearCalculatorFields();

        const reportData = JSON.parse(localStorage.getItem(key));
        if (reportData) {
            document.getElementById('resolvedByID').value = reportData.resolvedByID;
            document.getElementById('resolvedDate').value = reportData.resolvedDate;
            document.getElementById('complainantDiscordID').value = reportData.complainantDiscordID;
            document.getElementById('complainantGameID').value = reportData.complainantGameID;
            document.getElementById('accusedDiscordID').value = reportData.accusedDiscordID;
            document.getElementById('accusedGameID').value = reportData.accusedGameID;
            document.getElementById('judgment').value = reportData.judgment;
            document.getElementById('reason').value = reportData.reason;
            document.getElementById('tagID').value = reportData.tagID;
            document.getElementById('evidence').value = reportData.evidence;
            document.getElementById('pendency').value = reportData.pendency;
            document.getElementById('fineAmount').value = reportData.fineAmount;
            document.getElementById('ticket').value = reportData.ticket;

            document.getElementById('deliveredPlayerID').value = reportData.deliveredPlayerID;
            document.getElementById('deliveredDiscordID').value = reportData.deliveredDiscordID;
            document.getElementById('deliveredItems').value = reportData.deliveredItems;
            document.getElementById('request').value = reportData.request;

            document.getElementById('revisaoStatus').value = reportData.revisaoStatus;
            document.getElementById('id').value = reportData.id;
            document.getElementById('ticketDenuncia').value = reportData.ticketDenuncia;
            document.getElementById('ticketRevisao').value = reportData.ticketRevisao;
            document.getElementById('motivo').value = reportData.motivo;
            document.getElementById('tagIDRevisao').value = reportData.tagIDRevisao;
            document.getElementById('convertido').value = reportData.convertido;

            for (const [itemId, value] of Object.entries(reportData.itemQuantities)) {
                const item = document.getElementById(itemId);
                if (item) {
                    item.value = value;
                }
            }

            calculateTotal();

            const fineAmount = document.getElementById('fineAmount');
            const fineField = document.getElementById('fineField');
            if (reportData.fineAmount && reportData.fineAmount.trim() !== '') {
                fineAmount.value = reportData.fineAmount;
                fineField.style.display = 'flex';
            } else {
                fineField.style.display = 'none';
            }

            const pendency = document.getElementById('pendency');
            const pendencyField = document.getElementById('pendencyField');
            if (reportData.pendency && reportData.pendency.trim() !== '') {
                pendency.value = reportData.pendency;
                pendencyField.style.display = 'flex';
            } else {
                pendencyField.style.display = 'none';
            }

            const deliveredItemsField = document.getElementById('deliveredItemsField');
            if (reportData.deliveredPlayerID || reportData.deliveredDiscordID || reportData.deliveredItems || reportData.request) {
                document.getElementById('deliveredPlayerID').value = reportData.deliveredPlayerID;
                document.getElementById('deliveredDiscordID').value = reportData.deliveredDiscordID;
                document.getElementById('deliveredItems').value = reportData.deliveredItems;
                document.getElementById('request').value = reportData.request;
                deliveredItemsField.style.display = 'block';
            } else {
                deliveredItemsField.style.display = 'none';
            }

            const calculator = document.getElementById('calculator');
            if (reportData.itemQuantities && Object.keys(reportData.itemQuantities).length > 0) {
                calculator.style.display = 'flex';
            } else {
                calculator.style.display = 'none';
            }
        }
    }

    function updateReportList() {
        reportList.innerHTML = '';
        let ticketCount = 1;
        const brazilTimeOptions = {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        Object.keys(localStorage).sort().forEach(function(key) {
            if (key.startsWith('report_')) {
                const reportData = JSON.parse(localStorage.getItem(key));
                const dateTime = new Date(parseInt(key.split('_')[1])).toLocaleString('pt-BR', brazilTimeOptions);
                const listItem = document.createElement('li');

                const editableSpan = document.createElement('span');
                editableSpan.textContent = 'Ticket ' + reportData.ticket + ' - ' + 'Data: ' + dateTime;
                editableSpan.style.cursor = 'pointer';
                editableSpan.onclick = function(event) {
                    event.stopPropagation();
                    editTicketName(editableSpan);
                };

                const lastResolvedByID = localStorage.getItem('lastResolvedByID');
                if (lastResolvedByID) {
                    document.getElementById('resolvedByID').value = lastResolvedByID;
                }

                listItem.appendChild(editableSpan);

                listItem.setAttribute('data-key', key);
                listItem.onclick = function() {
                    loadReport(key);
                };

                reportList.appendChild(listItem);
                ticketCount++;
            }
        });
    }

    function editTicketName(editableElement) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = editableElement.textContent;
        editableElement.parentNode.replaceChild(input, editableElement);

        input.focus();

        input.addEventListener('blur', function() {
            editableElement.textContent = input.value;
            input.parentNode.replaceChild(editableElement, input);
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }

    function clearAllReports() {
        Object.keys(localStorage).forEach(function(key) {
            if (key.startsWith('report_')) {
                localStorage.removeItem(key);
            }
        });
        updateReportList();
    }

    updateReportList();
});

function closeSections() {
    document.getElementById('fineField').style.display = 'none';
    document.getElementById('pendencyField').style.display = 'none';
    document.getElementById('calculator').style.display = 'none';
    document.getElementById('deliveredItemsField').style.display = 'none';
}

function clearCalculatorFields() {
    document.querySelectorAll('.item-qty').forEach(item => item.value = '');
    document.getElementById('total').textContent = 'Total: R$';
}

function calculateTotal() {
    let total = 0;
    document.querySelectorAll('.item-qty').forEach(item => {
        if (item.value) {
            total += parseFloat(item.value) * parseFloat(item.dataset.price);
        }
    });
    document.getElementById('total').textContent = 'Total: R$ ' + total.toFixed(2);
}

function updateTags(selectedCity) {
    const tags = {
        bahamas: {
            "N/A": "N/A",
            "PRISAO 300 MESES + 600K Multa": "PRISÃO 300 MESES + 600k Multa",
            "1218693120183631974": "VERBAL",
            "1218692969973022730": "ADV1",
            "1218693038629453975": "ADV2",
            "1218693194796241009": "BANIDO"
        },
        paraisopolis: {
            "N/A": "N/A",
            "PRISAO 300 MESES ": "PRISÃO 300 MESES + 600k Multa",
            "1228777122214973510": "VERBAL",
            "1228777170877419691": "ADV1",
            "1228777223071334440": "ADV2",
            "1228777285281124563": "BANIDO"
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

// Segurança
document.addEventListener('contextmenu', (e) => e.preventDefault());

document.onkeydown = function(e) {
  if (e.keyCode == 123) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) return false;
  if (e.ctrlKey && e.keyCode == 85) return false;
  if (e.ctrlKey && e.keyCode == 67) return false;
};

document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());

window.onbeforeprint = function() {
  return false;
};

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 80)) {
      e.preventDefault();
      return false;
  }
});

document.write('<noscript><meta http-equiv="refresh" content="0;url=javascript:alert(\'JavaScript é necessário para acessar esta página.\');"></noscript>');
document.write('<meta name="robots" content="noindex, nofollow">');

// Função para copiar os detalhes da pendência
function copyPendencyReport() {
    const output = document.getElementById('output');
    if (output) {
        const deliveredPlayerID = document.getElementById('deliveredPlayerID').value;
        const deliveredDiscordID = document.getElementById('deliveredDiscordID').value;
        const deliveredItems = document.getElementById('deliveredItems').value;
        const request = document.getElementById('request').value;

        const pendencyDetailsText = `\`\`\`✅ PENDÊNCIA ENTREGUE ✅\`\`\`\n\n>>> **ID DO PLAYER:** ${deliveredPlayerID}\n**DISCORD:** <@${deliveredDiscordID}>\n**ITENS ENTREGUES:** ${deliveredItems}\n**SOLICITAÇÃO:** ${request}\n`;

        output.value = pendencyDetailsText;
        navigator.clipboard.writeText(pendencyDetailsText)
            .then(() => console.log('Pendências copiadas para a área de transferência!'))
            .catch(err => console.error('Erro ao copiar texto: ', err));
    } else {
        console.error('Elemento de saída não encontrado!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const togglePendencyButton = document.getElementById('togglePendencyButton');
    const deliveredItemsField = document.getElementById('deliveredItemsField');

    togglePendencyButton.addEventListener('click', function() {
        if (deliveredItemsField.style.display === 'none' || deliveredItemsField.style.display === '') {
            deliveredItemsField.style.display = 'block';
        } else {
            deliveredItemsField.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
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
});
