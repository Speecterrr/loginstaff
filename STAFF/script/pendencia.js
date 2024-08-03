document.addEventListener('DOMContentLoaded', function() {
    // Botão para alternar a visibilidade do campo Pendência
    var toggleButton = document.getElementById('togglePendencyButton');
    var pendencyField = document.getElementById('pendencyField');

    // Inicializa o campo de pendência como oculto
    if (pendencyField) {
        pendencyField.style.display = 'none';
    } else {
        console.error('Campo de pendência não encontrado!');
    }

    // Adiciona o evento de clique ao botão de alternância de pendência
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            // Alterna entre display none e flex para manter o layout flexbox.
            pendencyField.style.display = pendencyField.style.display === 'none' ? 'flex' : 'none';
        });
    } else {
        console.error('Botão de alternância de pendência não encontrado!');
    }

    // Botão para copiar as informações de pendência
    var copyButton = document.getElementById('copyDetailsButton');
    if (copyButton) {
        copyButton.addEventListener('click', copyPendencyDetails);
    } else {
        console.error('Botão de cópia de pendência não encontrado!');
    }

    // Adiciona event listener no campo de entrada de log para processar após colar
    var pendencyInput = document.getElementById('pendency');
    if (pendencyInput) {
        pendencyInput.addEventListener('input', function() {
            // Processa o texto colado e atualiza o campo com o formato desejado
            formatLogInput(pendencyInput.value);
        });
    } else {
        console.error('Campo de pendência não encontrado!');
    }

    // Adiciona ouvintes de evento a cada campo de quantidade da calculadora
    document.querySelectorAll('.item-qty').forEach(function(input) {
        input.addEventListener('input', updateItemList);
    });
});

function copyPendencyDetails() {
    var resolvedByID = document.getElementById('resolvedByID') ? document.getElementById('resolvedByID').value : 'Não especificado';
    var resolvedDate = document.getElementById('resolvedDate') ? document.getElementById('resolvedDate').value : 'Não especificado';
    var complainantDiscordID = document.getElementById('complainantDiscordID') ? document.getElementById('complainantDiscordID').value : 'Não especificado';
    var complainantGameID = document.getElementById('complainantGameID') ? document.getElementById('complainantGameID').value : 'Não especificado';
    var accusedDiscordID = document.getElementById('accusedDiscordID') ? document.getElementById('accusedDiscordID').value : 'Não especificado';
    var accusedGameID = document.getElementById('accusedGameID') ? document.getElementById('accusedGameID').value : 'Não especificado';
    var judgment = document.getElementById('judgment') ? document.getElementById('judgment').value : 'Não especificado';
    var reason = document.getElementById('reason') ? document.getElementById('reason').value : 'Não especificado';
    var itens = document.getElementById('pendency') ? document.getElementById('pendency').value : 'Não especificado';
    var provas = document.getElementById('evidence') ? document.getElementById('evidence').value : 'Não especificado';

    var formattedInfo =
        `>>> 📦 **DENUNCIANTE**: <@${complainantDiscordID}> // ${complainantGameID}\n` +
        `📦 **DENUNCIADO**: <@${accusedDiscordID}> // ${accusedGameID}\n` +
        `📦 **MOTIVO**: ${reason}\n` +
        `📦 **ITENS**: ${itens}\n` +
        `📦 **PROVAS**: ${provas}\n`;

    var outputArea = document.getElementById('output');
    if (outputArea) {
        outputArea.value = formattedInfo;
        navigator.clipboard.writeText(formattedInfo)
            .then(() => console.log('Informações copiadas para a área de transferência.'))
            .catch(err => console.error('Erro ao copiar as informações: ', err));
    } else {
        console.error('Elemento de área de texto para pendência não encontrado!');
    }
}

function formatLogInput(text) {
    // Expressão regular que encontra a log padrão e captura os grupos relevantes
    var regex = /(\w+)\s+x\s+(\d+)/g;
    var formattedText = text.replace(regex, 'item $1 $2;');
    // Atualiza o valor do campo de entrada de log
    document.getElementById('pendency').value = formattedText;
}

const itemSpawnMapping = {
    "bandagemQty": "item bandagem",
    "dorflexQty": "item dorflex",
    "item2Qty1": "item pistol_mk2",
    "item2Qty2": "item ammo_pistol_mk2",
    "item2Qty3": "item combatpistol",
    "item2Qty4": "item ammo_combatpistol",
    "item2Qty5": "item assaultrifle_mk2",
    "item2Qty6": "item ammo_assaultrifle_mk2",
    "item2Qty7": "item assaultsmg",
    "item2Qty8": "item ammo_assaultsmg",
    "item2Qty9": "item gusenberg",
    "item2Qty10": "item advancedrifle",
    "item2Qty11": "item ammo_advancedrifle",
    "item2Qty12": "item specialcarbine_mk2",
    "item2Qty13": "item ammo_specialcarbine_mk2",
    "item2Qty14": "item machinepistol",
    "item2Qty15": "item ammo_machinepistol",
    "item2Qty16": "item carbinerifle_mk2",
    "item2Qty17": "item ammo_carbinerifle_mk2",
    "item2Qty18": "item assaultrifle",
    "item2Qty19": "item ammo_assaultrifle",
    "item2Qty20": "item arma branca",
    "item2Qty21": "item switchblade",
    "item2Qty22": "item pé de cabra",
    "item2Qty23": "item alicate",
    "item2Qty24": "item ticket corrida",
    "item2Qty25": "item colete",
    "item2Qty26": "item algema",
    "item2Qty27": "item capuz",
    "item2Qty28": "item lockpick",
    "item2Qty29": "item farme",
    "item2Qty30": "item drogas",
    "item1Qty": "item garrafa vazia",
    "item2Qty": "item energetico",
    "item3Qty": "item roupas",
    "item4Qty": "item radio",
    "item5Qty": "item binoculos",
    "item6Qty": "item repairkit",
    "item7Qty": "item pneu",
    "item8Qty": "item celular",
    "item9Qty": "item militec",
    "item10Qty": "item oxigenio",
    "item11Qty": "item racao",
    "item12Qty": "item alianca",
    "item13Qty": "item cordas",
    "item14Qty": "item paraquedas",
    "item15Qty": "item mochila",
    "item16Qty": "item bronze",
    "item17Qty": "item diamante",
    "item18Qty": "item esmeralda",
    "item19Qty": "item topazio",
    "item20Qty": "item rubi",
    "item21Qty": "item safira",
    "item22Qty": "item ametista",
    "item23Qty": "item ferro",
    "item24Qty": "item ouro",
    "item25Qty": "item tucunare",
    "item26Qty": "item salmao",
    "item27Qty": "item dourado",
    "item28Qty": "item tilapia",
    "item29Qty": "item pirarucu",
    "item30Qty": "item corvina",
    "item31Qty": "item lambari",
    "item32Qty": "item pintado",
    "item33Qty": "item pacu",
};

// Função para atualizar a lista de itens no campo "Itens:"
function updateItemList() {
    const itemListElement = document.getElementById('pendency'); // O elemento de input onde você quer mostrar os itens
    const itemQuantities = document.querySelectorAll('.item-qty');
    let itemListText = itemListElement.value; // Preserve existing manual entries

    itemQuantities.forEach(input => {
        const itemName = itemSpawnMapping[input.id]; // Obtem o nome do item do mapeamento
        const quantity = input.value; // Obtem a quantidade

        if (quantity > 0) {
            // Atualiza ou adiciona o item na lista
            const regex = new RegExp(`(${itemName} \\d+;)`);
            if (regex.test(itemListText)) {
                itemListText = itemListText.replace(regex, `${itemName} ${quantity};`);
            } else {
                itemListText += ` ${itemName} ${quantity};`;
            }
        } else {
            // Remove o item se a quantidade for 0
            const regex = new RegExp(`\\s*${itemName} \\d+;`, 'g');
            itemListText = itemListText.replace(regex, '');
        }
    });

    itemListElement.value = itemListText.trim(); // Atualiza o campo de texto removendo espaços extras
}
