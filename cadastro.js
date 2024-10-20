function enviarDados() {
    // Obtém os valores dos campos
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const CPF = document.getElementById("CPF").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;


    // Verifica se todos os campos estão preenchidos
    if (nome && data && CPF && email && number) {
        // Cria uma nova linha na tabela
        const table = document.getElementById("dadosTable").getElementsByTagName('thead')[0];
        const newRow = table.insertRow();

        // Insere os dados nas células
        newRow.insertCell(0).innerText = nome;
        newRow.insertCell(1).innerText = data;
        newRow.insertCell(2).innerText = CPF;
        newRow.insertCell(3).innerText = email;
        newRow.insertCell(4).innerText = number;

        // Limpa o formulário
        document.getElementById("cadastroForm").reset();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}