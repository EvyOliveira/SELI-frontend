import axios from "axios";

const lista = [
  {id: 0, crm: "0001", nome: "Dr. Takagima", especialidade:"Cardiologista"},
  {id: 0, crm: "0002", nome:"Dr. Pimentel", especialidade: "Ginecologista"},
  {id: 0, crm: "0003", nome: "Dr. Ronaldo", especialidade: "Clínico Geral"}
]

function botao() { 
  return (
    <button onClick={carregarMedicos}>Salvar</button>
  );
}

function botaoAlterar() { 
  return (
    <button onClick={alterarNomesMedicos}>Alterar</button>
  );
}

function alterarNomesMedicos() {
  lista[0].nome = "Dr. Dolitle"
  console.log(lista)
}

function cabecalho() { 
  return (
    <p>Bem vindo ao sistema</p>
  );
}

function corpo(){
  return (
    <div>
      <p>Nome dos médicos</p>
      <p>{lista[0].nome}</p>
      <p>{lista[1].nome}</p>
      <p>{lista[2].nome}</p>
    </div>
  );
}


function carregarMedicos() { 
  axios.get(
    `http://localhost:8080/SELI-backend/medico`,
      {
        responseType: 'json',
      }
    ).then(
    (response) => {
      console.log(response.data);
    }
  );
  console.log("Medico acionado");
}


function retornaPagina() { 
  return (
    <div>
      {cabecalho()}
      {corpo()}
      {botao()}
      {botaoAlterar()}
    </div>
  );
}


export default retornaPagina;
