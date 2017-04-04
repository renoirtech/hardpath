class KeyboardController {
  constructor() {
    this.keyboardContainer = document.querySelector('#keyboard-container');
    this.texto = document.querySelector('#texto');
    this.obter();
  }

  digita(elemento)
  {
    let btn       = elemento;
    let tecla     = btn.name;
    this.texto.innerHTML += tecla;
  }

  salvar()
  {
    localStorage.setItem("decifre-o-livro-com", this.texto.innerHTML);
    alert('Texto salvo com sucesso.');
  }

  obter()
  {
    this.texto.innerHTML = localStorage.getItem("decifre-o-livro-com");
    alert('Texto carregado com sucesso');
  }
}
