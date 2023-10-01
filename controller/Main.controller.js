sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    ],
    /**
    * @param {typeof sap.ui.core.mvc.Controller} Controller
    */
    function (Controller, JSONModel) {
    "use strict";
    
    return Controller.extend("brasileirao.controller.Main", {
        
          onInit: function () {
    
    //      var dadosGerais = {
    //          nomeCampeonato : "Brasileirão 2023 no Canal FioriNet",
    //           rodada : 99
    
    //      };
    
    //    var dadosModel = new JSONModel();
    //          dadosModel.setData(dadosGerais);
    //      var tela = this.getView();
    //          tela.setModel(dadosModel, "ModeloDadosGerais")


        // DEFINIR OBJETOS NOVOS 
         var dadosGerais = {};
         var classificacao = {};
         var partidas = {};

         // 3 modelos novos

         var dadosModel = new JSONModel();
         var classificacaoModel = new JSONModel();
         var partidasModel = new JSONModel();

         // colocar os dados dentro dos modelos é a gaveta e a variavel é a roupa que vai dentro do modelo
         dadosModel.setData(dadosGerais);
         classificacaoModel.setData(classificacao);
         partidasModel.setData(partidas);

         // atribuir modelos na tela (view) 
         var tela = this.getView(); //chama o xml para a variavel

         tela.setModel(dadosModel, "ModeloDadosGerais");
         tela.setModel(classificacaoModel, "ModeloTabela");
         tela.setModel(partidasModel, "ModeloPartidas");

         // chamada da função
          this.onBuscarClassificacao();
          this.onBuscarDadosGerais();
     },
 
     // criar uma função os ( e para paramentros { indica corpo})
     
     onBuscarClassificacao: function(){
          var oModeloTabela = this.getView().getModel("ModeloTabela");

         // chamar a api feita no postman

         var configuracoes = {
            url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
            // queremos fazer a operação get para buscar os dados
             method : "GET", 
             // colocamos true no async para fazermos procedimento assincrono
             async : true,
             // cross Domain para dizer que vem de um dominio externo
             crossDomain : true,
             // como tem a aba no postman header eu cria aqui
             headers : {
                  "Authorization": "Bearer live_a9b77bbea5b4de79879931095d855c"
             }
            };
         // vamos fazer a chamada da api usando AJAX - qdo faço este comando ele consulta a api
             $.ajax(configuracoes).done(
             function(response){
                 // mudar os dados do model
                 oModeloTabela.setData(
                      {
                         "Classificacao" : response
                      }
                 );
             }.bind(this)
             //o bind(this) estou anexando a função ao programa principal assim a funcao reconhece as variaveis que estao fora

         )

     },
     onBuscarDadosGerais: function(){
        var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");

       // chamar a api feita no postman

       var configuracoes = {
          url : "https://api.api-futebol.com.br/v1/campeonatos/10",
          // queremos fazer a operação get para buscar os dados
           method : "GET", 
           // colocamos true no async para fazermos procedimento assincrono
           async : true,
           // cross Domain para dizer que vem de um dominio externo
           crossDomain : true,
           // como tem a aba no postman header eu cria aqui
           headers : {
                "Authorization": "Bearer live_a9b77bbea5b4de79879931095d855c"
           }
          };
         debugger
       // vamos fazer a chamada da api usando AJAX - qdo faço este comando ele consulta a api
           $.ajax(configuracoes).done(
           function(response){
               debugger
               // mudar os dados do model
                oModeloDadosGerais.setData(response);
                var rodadaAtual = response.rodada_atual.rodada;
                this.onBuscarPartidas(rodadaAtual);
           }.bind(this)
           //o bind(this) estou anexando a função ao programa principal assim a funcao reconhece as variaveis que estao fora

       )

   },
                                 // passar o parametro da variavel anterior
   onBuscarPartidas: function(rodadaAtual){
    var oModeloPartidas = this.getView().getModel("ModeloPartidas");

   // chamar a api feita no postman

   var configuracoes = {
      url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
      // queremos fazer a operação get para buscar os dados
       method : "GET", 
       // colocamos true no async para fazermos procedimento assincrono
       async : true,
       // cross Domain para dizer que vem de um dominio externo
       crossDomain : true,
       // como tem a aba no postman header eu cria aqui
       headers : {
            "Authorization": "Bearer live_a9b77bbea5b4de79879931095d855c"
       }
      };
     debugger
   // vamos fazer a chamada da api usando AJAX - qdo faço este comando ele consulta a api
       $.ajax(configuracoes).done(
       function(response){
           debugger
            oModeloPartidas.setData(response);
       }.bind(this)
       

   )

}

    });
    });

