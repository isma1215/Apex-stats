(()=>{
    const $cards = document.getElementById("cards"),
    $fragmen = document.createDocumentFragment(),
    $button  = document.getElementById('buscar'),
    $error = document.getElementById('error'),
    $loader = document.getElementById('loader');
    
    $button.addEventListener('click',(e)=>{
        e.preventDefault();
        $loader.classList.remove('none')
        let player = document.getElementById('name-player'),
        $plataform = document.getElementsByName('plataform'),
        plataforma;
        $plataform.forEach(el => {
            if(el.checked){
                plataforma = el.value
            }
        });

        if($cards.hasChildNodes()){   
            while($cards.firstChild){
                $cards.removeChild($cards.firstChild);
            }
            getData(player.value,plataforma);
        }
        else{
          console.log("no tine hijos");  
          getData(player.value,plataforma);
        }
        
    })

    async function getData(player,plataforma){
        try {
            $error.style.display="none";
            let key = "645df22eee75afc3df61f7bbfe9dfd20",
            res = await fetch(`https://api.mozambiquehe.re/bridge?auth=${key}&player=${player}&platform=${plataforma}`),
            $template ="";
            json = await res.json();
            leyendas = json.legends.all;
           

            total(json.total);

            for (const nombre in leyendas) {
                let icono = leyendas[nombre].ImgAssets.icon,
                kills,wins;
                kills=BuscarKills(leyendas[nombre].data)
                wins=BuscarWins(leyendas[nombre].data)
                //console.log(leyendas[nombre].data)
                $template = CreateCard(icono,nombre,kills,wins)
                $fragmen.appendChild($template)
            }
            //console.log($fragmen)
            $loader.classList.add('none');
            $cards.appendChild($fragmen);

           //if(!res.ok)throw{status:res.status, statusText:res.statusText}
           

        } catch (err) {
            $loader.classList.add('none')
            $error.style.display="block";
            console.log(`Ocurrio un erro al solicitar los dados ${err.status}`,json)
        }
    }
    function CreateCard(lg_img,lg_name,lg_kils,lg_wins){
        const $card = document.createElement("div");
        $card.classList.add('card');
        
        const $img_card = document.createElement('div'),
        $img = document.createElement('img');
        $img_card.classList.add('img_card');
        $img.src=lg_img;
        $img_card.appendChild($img);
        $card.appendChild($img_card);

        const $content = document.createElement('div'),
        $lg_name =document.createElement('div'),
        $stadistic = document.createElement('div');

        $content.classList.add('content');
        $lg_name.classList.add('legend-name');
        $stadistic.classList.add('stadistic');
        
        const $h3 = document.createElement('h3');
        $h3.innerHTML = lg_name;
        $lg_name.appendChild($h3);
        $content.appendChild($lg_name);

        const $ul=document.createElement('ul'),
        $li_kill=document.createElement('li'),
        $li_wins=document.createElement('li');

        $li_kill.innerHTML=`${lg_kils[0]} : ${lg_kils[1]}`;
        $li_wins.innerHTML=`${lg_wins[0]} : ${lg_wins[1]}`;
        $ul.appendChild($li_kill);
        $ul.appendChild($li_wins);
        $stadistic.appendChild($ul);
        $content.appendChild($stadistic);
        $card.appendChild($content);

        return $card;

    }
    function BuscarKills(datos){
        if(datos){
            let Esta1=[datos[0].name,datos[0].value]
            //console.log(datos[0].name)
            return Esta1
        }else return ["Kills",0];
    }
    function BuscarWins(datos){
        if(datos){
            let dt
            datos.forEach((el)=>{
                if(el.name == "BR Wins"){
                   dt = [el.name,el.value] 
                }else dt = ["wins",0]    
            })
           // console.log(dt)
            return dt
        }
        else return ["Wins",0]
    }
    function total(total){
     const  {kd,kills,games_played} = total
     
    }
})();