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

    let curPos =  this.texto.selectionStart;
    let textAreaTxt = this.texto.value;

    this.texto.value = textAreaTxt.substring(0, curPos) + tecla + textAreaTxt.substring(curPos);
    this.texto.focus();
    this.texto.setSelectionRange(curPos+1, curPos+1);
  }

  salvar()
  {
    localStorage.setItem("decifre-o-livro-com", this.texto.value);
    alert('Texto salvo com sucesso.');
  }

  obter()
  {
    let texto_obtido = this.texto.value = localStorage.getItem("decifre-o-livro-com");
    if(texto_obtido !== null)
    {
      alert('Texto carregado com sucesso');
    }
  }
}
