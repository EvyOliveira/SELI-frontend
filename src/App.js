import axios from "axios";
import React from "react";

/*function botao() { 
  return (
    <button onClick={carregarMedicos}>Salvar</button>
  );
} */

function cabecalho() { 
  return (
    <p>Bem-vindo ao sistema de Pets!</p>
  );
}

class CorpoPets extends React.Component { 
  state = {
    petAtual: {
      nome : "",
      raca: "",
      especie: ""
    },
    lista: [
    ],
  }

  inputChange(campo, novoTexto){
    const novoState = {...this.state};
    novoState.petAtual[campo] = novoTexto;
    this.setState(novoState);
    //console.log(novoTexto);
  }
  /*adicionar(){
    const novoState = {...this.state};
    novoState.lista.push({...this.state.petAtual});
    this.setState(novoState);   }*/

  adicionar(){
    const apiUrl = `http://localhost:8080/tarde-aula1/pets`;
          fetch(apiUrl,{
            method: 'POST',
            headers:{
              Accept:'text/plain',
              'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state.petAtual)
          }).then(
            (response)=>{
              console.log(response.body);
              this.carregarPets();
            }
          );
  }

  render() { 
    const displayLista = [];

    for(let i = 0; i <this.state.lista.length;i++){
      displayLista.push(
        <tr key ={i}>
          <td>{this.state.lista[i].raca} </td>
          <td>{this.state.lista[i].nome} </td>
          <td>{this.state.lista[i].especie}</td>
        </tr>
      );
    }

    return (
      <div>
        <p>Dados do animal</p>
        <div className="form-group">
          <label>Nome:</label>
            <input type="TEXT" 
              value={this.state.petAtual.nome} 
              placeholder="Insira o nome do animal"
              className="form-control"
              onChange={(novoTexto)=>{ this.inputChange('nome',novoTexto.target.value)}}/>
          </div>
          <div className="form-group">
            <label>Raça:</label>
            <input type="TEXT" 
              value={this.state.petAtual.raca} 
              placeholder="Insira a raça do animal"
              className="form-control"
              onChange={(novoTexto)=>{ this.inputChange('raca',novoTexto.target.value)}}/>
          </div>
          <div className="form-group">
          <label>Espécie:</label>
            <input type="TEXT" 
              value={this.state.petAtual.especie} 
              placeholder="Insira a espécie do animal"
              className="form-control"
              onChange={(novoTexto)=>{ this.inputChange('especie',novoTexto.target.value)}}/>
          </div>
        <button className="btn btn-primary" onClick={()=>{this.adicionar()}}>Adicionar</button>
        <p>Aninais Cadastrados</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome:</th>
              <th>Raça:</th>
              <th>Espécie:</th>
            </tr>
          </thead>
          <tbody>
            {displayLista}
          </tbody>
        </table>
        {this.botaoAlterar()}
      </div>
    );
  }

  alterarNomesPets() { 
    // const novoState = {};
    // novoState.lista = this.state.lista;
    
    // const novoState = Object.assign({}, this.state);
    
    const novoState = {...this.state};
    novoState.lista[0].nome = "Exemplo";
    this.setState(novoState);
  }

  botaoAlterar() { 
    return (
      <button className="btn btn-primary" onClick={() => {this.carregarPets()}}>Recarregar Animais</button>
    );
  } 

  carregarPets() { 
    axios.get(
      `http://localhost:8080/tarde-aula1/pets`,
        {
          responseType: 'json',
        }
      ).then(
      (response) => {
        const novoState = {...this.state};
        novoState.lista = response.data;
        this.setState(novoState);
      }
    );
    console.log("Animais Carregados.");
  }

}

function retornarComponentes() { 
  return (
    <div className="container">
      {cabecalho()}
      <CorpoPets/>
    </div>
  );
}

export default retornarComponentes;