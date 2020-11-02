window.onload = pegarDoArquivo;

function pegarDoArquivo()
{
	fetch('http://127.0.0.1:5500/carrinho.txt')
  .then(response => response.text())
  .then((data) => {
   listar(data);
   console.log(data);
  })
}

function listar (data)
{
	//console.log(data);
	var quantidade = document.getElementById("listTable").rows.length;
   if (quantidade>1){
      for(var cont=1;cont<=quantidade;cont++){
         document.getElementById("listTable").deleteRow(cont);
      }
   }
   var itens = data.split("[item]");
   //console.log(itens);
   var total=0;
   var table = '<thead><tr><td>Produto</td><td>Quantidade</td><td>Valor</td></tr></thead><tbody>';
   for(var i=1;i<itens.length;i++){
      var valores = itens[i].split("|");
	  //console.log(valores[3]);
	  table += '<tr><td>'+ valores[1] +'</td><td>'+ valores[2] +'</td><td>'+ valores[3] +'</td></tr>';
	  total+= parseFloat(valores[3])*parseInt(valores[2]);
	}
	table+='</tbody>';
	document.getElementById("listTable").innerHTML += table;
	document.getElementById("totalValue").innerHTML = total.toFixed(2);
}
