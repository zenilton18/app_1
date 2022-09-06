class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validardados() {
        for (let i in this) {
            if (this[i] == '' || this[i] == null || this[i] == undefined) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoid() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }
    gravar(despesa) {
        let id = this.getProximoid()

        localStorage.setItem(id, JSON.stringify(despesa))
        localStorage.setItem('id', id)

    }

    recuperarDespesa( ){
       let id = localStorage.getItem('id')
       let despesas= Array()

       for(let i =1; i<=id; i++){

         let despesa =JSON.parse(localStorage.getItem(i))
         despesas.push(despesa)
         
       if(despesa === null){
        continue
       }

       despesa.id =i

       }

    return despesas 
    }
    pesquisar(despesa){
        let despesas_bd = Array()
        despesas_bd = this.recuperarDespesa(); 

        if(despesa.ano != ''){
           despesas_bd =despesas_bd.filter(f => f.ano == despesa.ano)}

        if(despesa.mes != ''){
            despesas_bd=despesas_bd.filter(f=> f.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            despesas_bd= despesas_bd.filter(f=> f.dia == despesa.dia)
        }
        if(despesa.valor != ''){
            despesas_bd=despesas_bd.filter(f=> f.valor == despesa.valor)
        }
        if(despesa.tipo != ''){
            despesas_bd=despesas_bd.filter(f=> f.tipo == despesa.tipo)
        }

        
    return despesas_bd

    }
    remover(id){
        localStorage.removeItem(id)
    }

  
}
let bd = new Bd()


function cadastarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)



    if (despesa.validardados()) {
        bd.gravar(despesa)

       

        document.getElementById("titulo_modal").innerHTML = "Despesa inserida"
        document.getElementById("class_modal").className = 'modal-header text-success'
        document.getElementById("class_body").innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById("botao_modal").innerHTML = 'Voltar'
        document.getElementById("botao_modal").className = 'btn btn-success'

        mes.value='' 
        ano.value='' 
        tipo.value='' 
        dia.value='' 
        valor.value='' 
        descricao.value='' 

        $('#modal_dinamico').modal('show')
    } else {
        document.getElementById("titulo_modal").innerHTML = "Erro na Gravação "
        document.getElementById("class_modal").className = 'modal-header text-danger'
        document.getElementById("class_body").innerHTML= 'Existe campos que não foram preenchidos '
        document.getElementById("botao_modal").innerHTML= 'Voltar e Corrigir '
        document.getElementById("botao_modal").className= 'btn btn-danger '
        $('#modal_dinamico').modal('show')
    }

}

function carregaLista(despesas= Array()){
   if(despesas.length ==0){
        despesas =bd.recuperarDespesa()
   }
  
   let listarDespesa = document.getElementById('listar')
    listarDespesa.innerHTML=''


   despesas.forEach(function(d){
    //console.log(d)
    // add a linha (tr)
    let linha =listarDespesa.insertRow()

    //add coluna (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

    switch(d.tipo){

        case '1': d.tipo = 'Alimentação'
        break
        case '2': d.tipo = 'Educação'
        break
        case '3': d.tipo = 'Lazer'
        break
        case '4': d.tipo = 'Saúde'
        break
        case '4': d.tipo = 'Transporte'
        break
    }
    linha.insertCell(1).innerHTML = d.tipo
    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor

    let btn = document.createElement("button")
    btn.className ='btn btn-danger'
    btn.innerHTML='<i class="fas fa-times"> </i>'
    btn.id = `id_despesa${d.id}`
    btn.onclick= function(){
        let ids = this.id.replace('id_despesa','')
        console.log(ids)

        bd.remover(ids)

        window.location.reload()
    }
    linha.insertCell(4).append(btn)

   })

  }

  function pesquisardespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value


    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)

  let despesas=bd.pesquisar(despesa)

  carregaLista(despesas)
  }
  