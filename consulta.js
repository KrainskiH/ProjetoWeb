// Recuperando os dados do Local Storage
let dados = JSON.parse(localStorage.getItem('dados')) || [];

let especialidade = document.getElementById('especialidade');
let exame = document.getElementById('exame');
let data = document.getElementById('data');
let horario = document.getElementById('horario');
let local = document.getElementById('local');

// Recuperando QueryParam
const key = new URLSearchParams(window.location.search).get('chave');

// Preenchendo o formulário em caso de alteração
if (key) {
    especialidade.value = dados[key]?.especialidade || '';
    exame.value = dados[key]?.exame || '';
    data.value = dados[key]?.data || '';
    horario.value = dados[key]?.horario || '';
    local.value = dados[key]?.local || '';
    document.querySelector('#formInformacao button[type="submit"]').innerText = "Alterar";
}

// Reset da página e QueryParam
document.getElementById('formInformacao').addEventListener('reset', function (e) {
    e.preventDefault();
    window.location.href = "./consulta.html"; // Redireciona para a página de consulta
});

// Cadastro de produtos
document.getElementById('formInformacao').addEventListener('submit', function (e) {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!especialidade.value || !exame.value || !data.value || !horario.value || !local.value) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Criando produto
    const informacao = {
        especialidade: especialidade.value,
        exame: exame.value,
        data: data.value,
        horario: horario.value,
        local: local.value
    };

    // Caso não exista a chave o produto é adicionado, se não ele é alterado
    if (!key) {
        dados.push(informacao);
    } else {
        dados[key] = informacao;
    }

    // Atualizando o LocalStorage
    localStorage.setItem('dados', JSON.stringify(dados));

    // Limpar os campos do formulário
    especialidade.value = '';
    exame.value = '';
    data.value = '';
    horario.value = '';
    local.value = '';

    window.location.href = "./consulta.html"; // Redireciona após a submissão
});

// Exibir tabela
function atualizarTabela() {
    const tabela = document.querySelector('#tabela tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Exibindo dados na tabela
    dados.forEach((informacao, index) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${informacao.especialidade || 'N/A'}</td>
            <td>${informacao.exame || 'N/A'}</td>
            <td>${informacao.data || 'N/A'}</td>
            <td>${informacao.horario || 'N/A'}</td>
            <td>${informacao.local || 'N/A'}</td>
            <td>
                <a href="?chave=${index}">Editar</a>
                <a href="#" onclick="removerInformacao(${index})">Excluir</a>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

// Remover produto
function removerInformacao(index) {
    if (confirm("Você tem certeza que deseja excluir este item?")) {
        dados.splice(index, 1);
        localStorage.setItem('dados', JSON.stringify(dados));
        atualizarTabela(); // Atualiza a tabela após remoção
    }
}

// Atualizar a tabela ao carregar a página
window.onload = atualizarTabela;