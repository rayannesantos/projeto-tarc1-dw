
    var tam       = 30;                   // tamanho do quadrado onde ficam as letras
    var x_inicial = 50;                   // onde as letras começam  no canvas
    var x_final   = x_inicial + 26 * tam; // onde as letras terminam no canvas 
    var y_inicial = 250;                  // onde as letras começam  no canvas
    var y_final   = y_inicial + tam;      // onde as letras terminam no canvas
    var x_letra   = x_inicial + 8;        // posição da letra
    var y_letra   = y_inicial + 20;       // posição da letra
    var letras  = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                   'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    var palavrasForcaCompanion = ['Rose' , 'Martha', 'Donna' , 'Amy' , 'Rory' , 'Clara' , 'Bill',
                                  'Nardole','Ryan','Graham']
    var aleatorio =  Math.floor(Math.random() * palavrasForcaCompanion.length);
    var palavra = palavrasForcaCompanion[aleatorio];
    var palavraMontada= '' //palavra a partir dos cliques do usuario
    
    console.log(palavra)
    var marcadas = [];
    for (i = 0; i < letras.length; i++){
        marcadas[i] = 0;
    }
    
    
    
    function verificaLetra(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        if ((x > x_inicial && x < x_final) &&
            (y > y_inicial && y < y_final)){
            nx = Math.floor((x  - x_inicial) / tam);
            console.log("nx = ", nx);
            x_inf = x_inicial + nx * tam;
            x_sup = x_inf + tam;
            y_inf = y_inicial;
            y_sup = y_inf + tam;
            
            if ((x >= x_inf  &&  x <= x_sup) && 
                (y >= y_inf  &&  y <= y_sup) &&
                (marcadas[nx] == 0)){
                // console.log(x, y);
                // console.log(x_inf, x_sup, y_inf, y_sup);
                // console.log(letras[nx]);
    
                let letraEscolhida = letras[nx];
                // console.log(letraEscolhida);
    
                marcadas[nx] = 1;
                ctx.fillStyle = '#003b6f';
                ctx.fillRect(x_inf, y_inf, tam, tam);
    
                //verifica se letra tem na palavra 
    
                verificaSeLetraTaNaPalavra(letraEscolhida)
    
                
            }
        }
    }
    
    var contadorErro = 0;
    
    function verificaSeLetraTaNaPalavra(letraEscolhida){
        console.log(letraEscolhida)
    
        console.log(palavra)
        let contador = 0;

   

    
        for (i = 0; i < palavra.length; i++){
    
            if(letraEscolhida == palavra [i].toUpperCase() ){
                contador++;
                palavraMontada = palavraMontada+letraEscolhida


                if (palavraMontada.length == palavra.length ){
                    alert("Você acertou")
                    window.location.reload();//recarrega página

                  


                }

                console.log(palavraMontada)
                desenhaPalavraCerta(canvas,i,letraEscolhida)

            }
        }
    
        if (contador== 0 ) {
            contadorErro++;
        }
    
       
        // CASO ERRE A LETRA. DESENHA NA FORCA
       switch (contadorErro) {
           case 1:
                desenhaCabeca()
               break;
            case 2:
               desenhaCorpo()
               break;
               case 3:
               desenhaBracoDireito();
               break;
               case 4:
               desenhaBracoEsquerdo();
               break;
               case 5:
               desenhaPernaDireita();
               break;
               case 6:
               desenhaPernaEsquerda();
               break;       
       }
    }
    
    
    function desenhaPalavraCerta(canvas, posicao ,letra) {
        // let rect = canvas.getBoundingClientRect();
        // let x = event.clientX - rect.left;
        // let y = event.clientY - rect.top;
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        // posicao = posicao+30;
    
        posicao= posicao *30
    
        x = 170   + posicao;
    
        y = 170;
       
    
    
        console.log(posicao)
    
    
        ctx.font = '35pt Arial bold';     // Define tamanho e fonte
        ctx.fillStyle = 'grey';            // Define a cor
        ctx.fillText(letra, x, y);
       
    }
    
    
    function desenhaLetras(canvas, event) {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
    
        x = x_letra;
        y = y_letra;
    
        for (i = 0; i < letras.length; i++){
            ctx.fillStyle = '#003b6f';
            ctx.strokeRect(x_inicial + i * tam, y_inicial, tam, tam);
            ctx.font = '14pt Arial bold';     // Define tamanho e fonte
            ctx.fillStyle = '#fff';            // Define a cor
            ctx.fillText(letras[i], x, y);    // Desenha a letra
            x += tam;
        }    
      }
    }
    
    function desenhaPalavra(canvas, event){
        var canvas = document.getElementById('canvas');
        //Desenha onde vai ficar as letras
    
        
        x = 170;
        y = 170;
       
        if (canvas.getContext) {
             var ctx = canvas.getContext('2d');
           
            for (i = 0; i < palavra.length; i++){
                ctx.font = '35pt Arial bold';     // Define tamanho e fonte
                ctx.fillStyle = '#fff';            // Define a cor
                ctx.fillText('_', x, y);
                // ctx.fillStyle = 'white';            // Define a cor
                // ctx.fillText(palavra[i] , x, y);    // Desenha a letra
       
                x += tam;   
            }
      }
    
        
    }
    
    function desenhaForca() {
        // desenha forca
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(2, 180);
        ctx.lineTo(40, 180);
        ctx.moveTo(20, 180);
        ctx.lineTo(20, 40);
        ctx.moveTo(2, 40);
        ctx.lineTo(80, 40);
        ctx.stroke();
        ctx.closePath();
        // desenha corda
        ctx.strokeStyle = "ffffff";
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(70, 40);
        ctx.lineTo(70, 70);
        ctx.stroke();
        ctx.closePath();
    }
    
    function desenhaCabeca(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = "grey";
        ctx.save();
        ctx.scale(0.6, 1);
        ctx.beginPath();
        ctx.arc(70 /.6, 80, 10, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    
    function desenhaCorpo(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(70, 90);
        ctx.lineTo(70, 125);
        ctx.stroke();
        ctx.closePath();
    }
    
    function desenhaBracoDireito(){
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(70, 100);
        ctx.lineTo(90, 110);
        ctx.stroke();
        ctx.closePath();
    }
    
    function desenhaBracoEsquerdo(){
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(70, 100);
        ctx.lineTo(50, 110);
        ctx.stroke();
        ctx.closePath();
    }
    
    function desenhaPernaDireita(){
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(70, 125);
        ctx.lineTo(80, 155);
        ctx.stroke();
        ctx.closePath();
    }
    
    function desenhaPernaEsquerda(){
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.moveTo(70, 125);
        ctx.lineTo(60, 155);
        ctx.stroke();
        ctx.closePath();

        alert('VOCÊ PERDEU.')  

        window.location.reload();//recarrega página

    }



    function init(){
        ctx = document.getElementById('canvas').getContext('2d');
        ElementoCanvas = document.getElementById('canvas');
        ElementoCanvas.addEventListener('mousedown', function(e){
            verificaLetra(ElementoCanvas, e);
        });      
        
         desenhaLetras();
         desenhaPalavra();
         desenhaForca();
    
    }    
    
