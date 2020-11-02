function relogio()
{
    location.href="relogio.html"
}
function bone()
{
    location.href="bone.html"
}
function colar()
{
    location.href="colar.html"
}
function inicial()
{
    location.href="indice.html"
}
function carrinho()
{
    location.href="carrinho.html"
}
function cadastrar()
{
    location.href="cadastrar.html"
}
function pegarDoArquivo(produto, quantidade, preco)
{
	fetch('http://127.0.0.1:5500/carrinho.txt')
  .then(response => response.text())
  .then((data) => {
	addCarrinho(data, produto, quantidade, preco);
  })
}

function addCarrinho(data, produto, quantidade, preco)
{
    var textToSave = data + '\n[item]|'+produto+'|'+quantidade+'|'+preco;
    console.log(textToSave);
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = 'carrinho.txt';
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function verficar(){
    var formulario = document.forms["formulario"];
    
    erro = false;
    /*VERFICA NOME*/
    var nome = formulario.nome.value;
    console.log(nome);
    nome += '\0'
    if (nome.indexOf(" ")== 0 || nome.indexOf(" ")== -1) {
        alert("Nome invalido ou incompleto");
        erro = true;
    }
    /*************/

    /*Verifica email*/
    
    var email = formulario.email.value;
    console.log(email);
    email += '\0'
    if (email.indexOf("@")== 0 || email.indexOf("@")== -1 ||email.indexOf(" ")!= -1 || email.indexOf(".")== -1) {
        alert("Email invalido ou incompleto");
        erro = true;
    }


    /*****************/




    /*VERFICA CPF*/
    var cpf = formulario.cpf.value;
    console.log(cpf);
    if (cpf.length != 11)
    {
        alert ("CPF Invalido");
        erro = true;
        
    }else
    {
        var i;
        for(i = 0;i<11;i++)
        {
            if(cpf[i] <'0'||cpf[i]>'9')
            {
                alert ("CPF Invalido (Insira apenas numeros)");
                erro=true;
                break;
            }
        }
    }
    /*************/

    /*VERFICA CEP*/
    var cep = formulario.cep.value;
    console.log(cep);
    var cepEstaCorreto = cep.match(/^\d{5}-\d{3}$/g)
    if (!cepEstaCorreto) {
        alert("CEP inválido");
        erro = true;
    }
    /*************/

    /*VERFICA Numero Cartão*/
    var nc = formulario.numero_cartao.value;
    if (nc.length!=16)
    {
        alert("Numero do Cartão precisa ter 16 Digitos")
        erro=true;
    }
    
    /*************/
    /*VERFICA Numero Cartão*/
    var ccv = formulario.ccv.value;
    if (ccv.length!=3)
    {
        alert("CCV precisa ter 3 Digitos")
        erro=true;
    }
    /*************/
    var endereco = formulario.endereco.value;
    var vm = formulario.validade_mes.value;
    var va = formulario.validade_ano.value;
    nome = formulario.nome.value;
    if (erro == true)
    {
        alert("Preencha todos os campos corretamente e tente novamente!");
        return false;
    }else
    {
        alert("Formulario enviado\n Enviaremos atualizações do status no seu e-mail!");

        fetch('http://127.0.0.1:5500/carrinho.txt').then(response => response.text()).then((data) => {
        baixar(data, email, endereco, cep, cpf, nc, ccv, vm, va, nome);
        });
        return true;
    }
}

function baixar(dadosCarrinho, email, endereco, cep, cpf, nc, ccv, vm, va, nome)
{
    var textToSave = '---------------------------------------\nVenda:'+ dadosCarrinho + '\nDados do cliente:\n'+email+'\n'+endereco+'\n'+cep+ '\n'+cpf+ '\n'+nc+ '\n'+ccv+ '\n'+vm+ '\n'+va+ '\n'+nome +'\n---------------------------------------\n';
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = 'venda.txt';
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    alert("ola");
}