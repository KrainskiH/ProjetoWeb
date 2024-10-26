// Recuperando os dados do Local Storage ou inicializando uma lista vazia se não houver dados
let dados = JSON.parse(localStorage.getItem('dadosSaude')) || [];

let nomeCompleto = document.getElementById('nomeCompleto');
let idade = document.getElementById('idade');
let exercicioRegular = document.getElementById('exercicioRegular');
let dietaEquilibrada = document.getElementById('dietaEquilibrada');
let checkupsRegulares = document.getElementById('checkupsRegulares');
let vacinas = document.getElementById('vacinas');
let saudeMental = document.getElementById('saudeMental');
let higiene = document.getElementById('higiene');

// Recuperando QueryParam para edição
const key = new URLSearchParams(window.location.search).get('chave');

// Preenchendo o formulário em caso de edição
if (key !== null) {
    const info = dados[key];
    if (info) {
        nomeCompleto.value = info.nomeCompleto || '';
        idade.value = info.idade || '';
        exercicioRegular.value = info.exercicioRegular || '';
        dietaEquilibrada.value = info.dietaEquilibrada || '';
        checkupsRegulares.value = info.checkupsRegulares || '';
        vacinas.value = info.vacinas || '';
        saudeMental.value = info.saudeMental || '';
        higiene.value = info.higiene || '';
    }
    document.querySelector('#cadastroForm button[type="submit"]').innerText = "Alterar";
}

// Cadastro e atualização de dados
document.getElementById('cadastroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!nomeCompleto.value || !idade.value || !exercicioRegular.value || 
        !dietaEquilibrada.value || !checkupsRegulares.value || 
        !vacinas.value || !saudeMental.value || !higiene.value) {
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
        vacinas: vacinas.value,
        saudeMental: saudeMental.value,
        higiene: higiene.value,
    };

    // Caso não exista a chave, adiciona o novo registro; senão, altera o existente
    if (key === null) {
        dados.push(informacao);
    } else {
        dados[key] = informacao;
    }

    // Atualizando o LocalStorage
    localStorage.setItem('dadosSaude', JSON.stringify(dados));

    // Redireciona para a página de exibição da tabela
    window.location.href = "./saude.html";
});

// Atualizar a tabela ao carregar a página
window.onload = atualizarTabela;

function atualizarTabela() {
    const tabela = document.querySelector('#dadosTable tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Verifica se há dados para exibir
    if (dados.length === 0) {
        const linhaVazia = document.createElement('tr');
        linhaVazia.innerHTML = `<td colspan="8">Nenhum dado encontrado.</td>`;
        tabela.appendChild(linhaVazia);
        return;
    }

    dados.forEach((informacao, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${informacao.nomeCompleto || 'N/A'}</td>
            <td>${informacao.idade || 'N/A'}</td>
            <td>${informacao.exercicioRegular || 'N/A'}</td>
            <td>${informacao.dietaEquilibrada || 'N/A'}</td>
            <td>${informacao.checkupsRegulares || 'N/A'}</td>
            <td>${informacao.vacinas || 'N/A'}</td>
            <td>${informacao.saudeMental || 'N/A'}</td>
            <td>${informacao.higiene || 'N/A'}</td>
            <td>
                <a href="saude.html?chave=${index}">Editar</a>
                <a href="#" onclick="removerInformacao(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

// Função para remover informações
function removerInformacao(index) {
    dados.splice(index, 1);
    localStorage.setItem('dadosSaude', JSON.stringify(dados));
    atualizarTabela();
}
