// Recuperando os dados do Local Storage
let dados = JSON.parse(localStorage.getItem('dados')) || [];

let nomeCompleto = document.getElementById('nomeCompleto');
let idade = document.getElementById('idade');
let exercicioRegular = document.getElementById('exercicioRegular');
let dietaEquilibrada = document.getElementById('dietaEquilibrada');
let checkupsRegulares = document.getElementById('checkupsRegulares');
let checkup = document.getElementById('checkup');
let vacinas = document.getElementById('vacinas');
let saudeMental = document.getElementById('saudeMental');
let higiene = document.getElementById('higiene');

// Cadastro de dados
document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!nomeCompleto.value || !idade.value || !exercicioRegular.value || 
        !dietaEquilibrada.value || !checkupsRegulares.value || 
        !checkup.value || !vacinas.value || !saudeMental.value || 
        !higiene.value) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Criando objeto com os dados do formulário
    const informacao = {
        nomeCompleto: nomeCompleto.value,
        idade: idade.value,
        exercicioRegular: exercicioRegular.value,
        dietaEquilibrada: dietaEquilibrada.value,
        checkupsRegulares: checkupsRegulares.value,
        checkup: checkup.value,
        vacinas: vacinas.value,
        saudeMental: saudeMental.value,
        higiene: higiene.value,
    };

    // Adicionando dados ao LocalStorage
    dados.push(informacao);
    localStorage.setItem('dados', JSON.stringify(dados));
    
    // Limpar os campos do formulário
    nomeCompleto.value = '';
    idade.value = '';
    exercicioRegular.value = '';
    dietaEquilibrada.value = '';
    checkupsRegulares.value = '';
    checkup.value = '';
    vacinas.value = '';
    saudeMental.value = '';
    higiene.value = '';

    atualizarTabela();
});

// Exibir tabela
function atualizarTabela() {
    const tabela = document.querySelector('#dadosTable tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Exibindo dados na tabela
    dados.forEach((informacao) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${informacao.nomeCompleto}</td>
            <td>${informacao.idade}</td>
            <td>${informacao.exercicioRegular}</td>
            <td>${informacao.dietaEquilibrada}</td>
            <td>${informacao.checkupsRegulares}</td>
            <td>${informacao.checkup}</td>
            <td>${informacao.vacinas}</td>
            <td>${informacao.saudeMental}</td>
            <td>${informacao.higiene}</td>
        `;
        tabela.appendChild(linha);
    });
}

// Atualizar a tabela ao carregar a página
window.onload = atualizarTabela;
