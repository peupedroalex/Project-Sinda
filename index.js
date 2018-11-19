// INICIALIZAÇÕES
var fsa = {lat: -12.2733, lng: -38.9556};
var ceara = {lat: -3.71839, lng: -38.5434};
var brasil = {lat: -11.39518221, lng: -51.75320951};

// ANIMATE SIDENAV
$(document).ready(function(){
    $('.sidenav').sidenav();
});

//INIT PARALLAX
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, 100);
  });

//INIT COLLAPSIBLE
$(document).ready(function(){
    $('.collapsible').collapsible();
});

//INIT MODAL
$(document).ready(function(){
    $('.modal').modal();
  });


//INIT GRAFICO

var myChart = echarts.init(document.getElementById('maingraph'));
                  
    // specify chart configuration item and data
    var option = {
        title: {
            text: 'Variação de temperatura'
        },
        tooltip: {},
        legend: {
            data:['Temperatura']
        },
        xAxis: {
            data: ["01","02","03","04","05","06"]
        },
        yAxis: {},
        series: [{
            name: 'temperatura',
            type: 'line',
            data: [5, 20, 22, 10, 10, 20]
        }]
    };                
myChart.setOption(option);



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: brasil,
        zoom: 4
    });
}
    
//FAZ REQUISIÇÃO NO BANCO DE DADOS
$.ajax({
    url: "http://localhost/SindaWebService/getAll.php",
    type: 'GET',
    success: function(res) {
        var array = JSON.parse(res);
        console.log(array);
        transformToCoords(array);
    }
});
    
//TRANSFORMA O JSON EM COORDENADAS    
function transformToCoords(array){
    for(var i =0; i<array.length;i++){
        var coords = {lat: parseFloat(array[i].lat), lng: parseFloat(array[i].lng)}
        addMarker(coords,array[i]);
    }
}
    
//FAZ MARCAÇÕES NO MAPA    
function addMarker(coords,pcd){
    
    var marker = new google.maps.Marker({
        position : coords,
        map : map
    });

    var infPCD = pcd;
    var conteudoMark = 
        '<h3> <b>ID Estação: </b>'+infPCD.id+'</h3>' +  
        '<h4><b>Localização: </b></h4>'+
        '<p><b>Município: </b>'+infPCD.municipio+'</p>' +
        '<p><b>Latitude: </b>'+infPCD.lat+'</p>' +
        '<p><b>Longitude: </b>'+infPCD.lng+'</p>' +
        '<p><b>altitude: </b>'+infPCD.altitude+'</p>' +
        '<h5> <b>Coleta de dados:</b></h5>'+
        '<p><b>Periodo Inicial: </b>'+Date(infPCD.periodoInicial)+'</p>'+
        '<p><b>Periodo Final: </b>'+Date(infPCD.periodoFinal)+'</p>'+
        '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Mais informações</a>'

    var infowindow = new google.maps.InfoWindow({
        content: conteudoMark
    });

    marker.addListener('click',function(){
        infowindow.open(map,marker);
    });

}


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    