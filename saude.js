function enviarDados(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos com os novos IDs
    const nome = document.getElementById("nomeCompleto").value;
    const idade = document.getElementById("idade").value;
    const exercicio = document.getElementById("exercicioRegular").value;
    const dieta = document.getElementById("dietaEquilibrada").value;
    const checkup = document.getElementById("checkupsRegulares").value;
    const vacinas = document.getElementById("vacinas").value;
    const saudeMental = document.getElementById("saudeMental").value;
    const higiene = document.getElementById("higiene").value;

    // Verifica se todos os campos estão preenchidos
    if (nome && idade && exercicio && dieta && checkup && vacinas && saudeMental && higiene) {
        // Cria uma nova linha na tabela
        const tableBody = document.getElementById("dadosTable").getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();

        // Insere os dados nas células
        newRow.insertCell(0).innerText = nome;
        newRow.insertCell(1).innerText = idade;
        newRow.insertCell(2).innerText = exercicio;
        newRow.insertCell(3).innerText = dieta;
        newRow.insertCell(4).innerText = checkup;
        newRow.insertCell(5).innerText = vacinas;
        newRow.insertCell(6).innerText = saudeMental;
        newRow.insertCell(7).innerText = higiene;

        // Limpa o formulário
        document.getElementById("cadastroForm").reset();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

