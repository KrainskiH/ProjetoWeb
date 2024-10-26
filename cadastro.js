// Recuperando os dados do Local Storage ou inicializando uma lista vazia se não houver dados
let dados = JSON.parse(localStorage.getItem('dadosCadastro')) || []; // Removido espaço extra

let nome = document.getElementById('nome');
let dataNascimento = document.getElementById('data');
let cpf = document.getElementById('CPF');
let email = document.getElementById('email');
let telefone = document.getElementById('number');

// Recuperando QueryParam
const key = new URLSearchParams(window.location.search).get('chave');
// Preenchendo o formulário em caso de edição
if (key) {
    const info = dados[key];
    if (info) {
        nome.value = info.nome || '';
        dataNascimento.value = info.dataNascimento || '';
        cpf.value = info.cpf || '';
        email.value = info.email || '';
        telefone.value = info.telefone || '';
    }
    document.querySelector('#formInformacao button[type="submit"]').innerText = "Alterar";
}

// Reset da página e QueryParam
document.getElementById('formInformacao').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./cadastro.html";
});

// Cadastro e atualização de dados
document.getElementById('formInformacao').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!nome.value || !dataNascimento.value || !cpf.value || !email.value || !telefone.value) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Criando objeto com os dados do formulário
    const informacao = {
        nome: nome.value,
        dataNascimento: dataNascimento.value,
        cpf: cpf.value,
        email: email.value,
        telefone: telefone.value
    };

    // Caso não exista a chave, adiciona o novo registro; senão, altera o existente
    if (!key) {
        dados.push(informacao);
    } else {
        dados[key] = informacao;
    }

    // Atualizando o LocalStorage
    localStorage.setItem('dadosCadastro', JSON.stringify(dados)); // Corrigido: removido espaço extra
    
    // Redireciona para a página de exibição da tabela
    window.location.href = "./cadastro.html";
});

// Atualizar a tabela ao carregar a página
window.onload = atualizarTabela;

function atualizarTabela() {
    const tabela = document.querySelector('#dadosTable tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Verifica se há dados para exibir
    if (dados.length === 0) {
        const linhaVazia = document.createElement('tr');
        linhaVazia.innerHTML = `<td colspan="6">Nenhum dado encontrado.</td>`;
        tabela.appendChild(linhaVazia);
        return;
    }

    dados.forEach((informacao, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${informacao.nome || 'N/A'}</td>
            <td>${informacao.dataNascimento || 'N/A'}</td>
            <td>${informacao.cpf || 'N/A'}</td>
            <td>${informacao.email || 'N/A'}</td>
            <td>${informacao.telefone || 'N/A'}</td>
            <td>
                <a href="cadastro.html?chave=${index}">Editar</a>
                <a href="#" onclick="removerInformacao(${index})">Excluir</a>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

// Função para remover informações
function removerInformacao(index) {
    dados.splice(index, 1);
    localStorage.setItem('dadosCadastro', JSON.stringify(dados));
    atualizarTabela();
}

