document.addEventListener('DOMContentLoaded', function() {
    let dados = JSON.parse(localStorage.getItem('dados')) || [];

    let nomeCompleto = document.getElementById('nomeCompleto');
    let idade = document.getElementById('idade');
    let exercicioRegular = document.getElementById('exercicioRegular');
    let dietaEquilibrada = document.getElementById('dietaEquilibrada');
    let checkupsRegulares = document.getElementById('checkupsRegulares');
    let vacinas = document.getElementById('vacinas');
    let saudeMental = document.getElementById('saudeMental');
    let higiene = document.getElementById('higiene');
    
    let editIndex = -1; // Índice para edição de um item 

    document.getElementById('cadastroForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!nomeCompleto.value || !idade.value || !exercicioRegular.value || 
            !dietaEquilibrada.value || !checkupsRegulares.value || 
            !vacinas.value || !saudeMental.value || !higiene.value) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const informacao = {
            nomeCompleto: nomeCompleto.value,
            idade: idade.value,
            exercicioRegular: exercicioRegular.value,
            dietaEquilibrada: dietaEquilibrada.value,
            checkupsRegulares: checkupsRegulares.value,
            vacinas: vacinas.value,
            saudeMental: saudeMental.value,
            higiene: higiene.value,
        };

        if (editIndex === -1) {
            // Novo item
            dados.push(informacao);
        } else {
            // Atualizar item existente
            dados[editIndex] = informacao;
            editIndex = -1; // Reset do índice de edição
        }

        localStorage.setItem('dados', JSON.stringify(dados));
        atualizarTabela();
        
        // Limpar os campos do formulário
        nomeCompleto.value = '';
        idade.value = '';
        exercicioRegular.value = '';
        dietaEquilibrada.value = '';
        checkupsRegulares.value = '';
        vacinas.value = '';
        saudeMental.value = '';
        higiene.value = '';
    });

    function atualizarTabela() {
        const tabela = document.querySelector('#dadosTable tbody');
        tabela.innerHTML = '';

        dados.forEach((informacao, index) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${informacao.nomeCompleto}</td>
                <td>${informacao.idade}</td>
                <td>${informacao.exercicioRegular}</td>
                <td>${informacao.dietaEquilibrada}</td>
                <td>${informacao.checkupsRegulares}</td>
                <td>${informacao.vacinas}</td>
                <td>${informacao.saudeMental}</td>
                <td>${informacao.higiene}</td>
                <td>
                    <button onclick="editarItem(${index})">Editar</button>
                    <button onclick="excluirItem(${index})">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    }

    // Função para editar um item
    window.editarItem = function(index) {
        const informacao = dados[index];
        nomeCompleto.value = informacao.nomeCompleto;
        idade.value = informacao.idade;
        exercicioRegular.value = informacao.exercicioRegular;
        dietaEquilibrada.value = informacao.dietaEquilibrada;
        checkupsRegulares.value = informacao.checkupsRegulares;
        vacinas.value = informacao.vacinas;
        saudeMental.value = informacao.saudeMental;
        higiene.value = informacao.higiene;
        editIndex = index;
    };

    // Função para excluir um item
    window.excluirItem = function(index) {
        dados.splice(index, 1); // Remove o item do array
        localStorage.setItem('dados', JSON.stringify(dados));
        atualizarTabela(); // Atualiza a tabela
    };

    atualizarTabela();
});
