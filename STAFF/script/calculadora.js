document.addEventListener('DOMContentLoaded', function() {
    const toggleFineButton = document.getElementById('toggleFineButton');
    const calculator = document.getElementById('calculator');
    const fineAmountInput = document.getElementById('fineAmount'); 

    // Função de cálculo
    function calculateTotal() {
        let total = 0;
        document.querySelectorAll('.item-qty').forEach(function(input) {
            let price = parseFloat(input.dataset.price);
            let qty = parseFloat(input.value) || 0;
            total += price * qty;
        });
        
        const formattedTotal = 'R$' + total.toFixed(2);
        document.querySelector('.total-display').textContent = 'Total: ' + formattedTotal;
        fineAmountInput.value = formattedTotal; 
    }

    
    document.querySelectorAll('.item-qty').forEach(function(input) {
        input.addEventListener('input', calculateTotal);
    });

    
    toggleFineButton.addEventListener('click', function() {
        
        const isCalculatorHidden = calculator.classList.contains('hidden');

        if (isCalculatorHidden) {
            calculator.classList.remove('hidden'); 
            calculator.classList.add('calculator-visible'); 
           
            setTimeout(() => {
                calculator.scrollIntoView({ behavior: 'smooth' });
            }, 10); 
        } else {
            calculator.classList.add('hidden'); 
            calculator.classList.remove('calculator-visible'); 
        }
    });

    // Inicializa a calculadora oculta
    calculator.classList.add('hidden');
});
