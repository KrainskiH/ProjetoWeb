function enviarDados() {
        // Obtém os valores dos campos
        const nome = document.getElementById("nome").value;
        const data = document.getElementById("data").value;
        const CPF = document.getElementById("CPF").value;
        const email = document.getElementById("email").value;
        const number = document.getElementById("number").value;
        const senha = document.getElementById("senha").value;

        // Verifica se todos os campos estão preenchidos
        if (nome && data && CPF && email && number && senha) {
            // Cria um objeto para armazenar os dados
            const usuario = {
                nome: nome,
                data: data,
                CPF: CPF,
                email: email,
                number: number,
                senha: senha
            };

            // Armazena os dados no LocalStorage
            localStorage.setItem(nome, JSON.stringify(usuario));

            // Limpa o formulário
            document.getElementById("cadastroForm").reset();
            alert("Cadastro realizado com sucesso!");

        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }
