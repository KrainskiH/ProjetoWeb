// Função para verificar o login
function login(event) {
    event.preventDefault();

    // Captura os dados do formulário de login
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    // Obtém os dados do localStorage
    const registeredUser = localStorage.getItem("registeredUser");
    const registeredPassword = localStorage.getItem("registeredPassword");

    // Verifica se os dados correspondem aos armazenados
    if (nome === registeredUser && senha === registeredPassword) {
        alert("Login bem-sucedido!");
        sessionStorage.setItem("sessionActive", "true");
        localStorage.setItem("loggedUser", nome);
        window.location.href = "./site.html";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}
