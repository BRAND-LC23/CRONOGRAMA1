document.addEventListener('DOMContentLoaded',LOCALLOAD);
document.addEventListener('DOMContentLoaded',VERSE);
const TABLE1_TH = document.getElementById("TABLE1-TH");
const TBODY1 = document.getElementById("TBODY1");
const CLOCK = document.getElementById("CLOCK");
const BODY = document.getElementById("BODY");

//VERSO ALEATORIO
function VERSE() {
    let VERSES = [
        "No se te ocurra pensar, «Esta riqueza es fruto de mi poder y de la fuerza de mis manos». Recuerda al Señor tu Dios, porque es él quien te da el poder para producir esa riqueza. (Deuteronomio 8:17)",
        "La bendición de Jehova es la que enriquece, y no añade tristeza con ella. (Proverbios 10:22)",
        "El que confía en sus riquezas caerá, mas los justos reverdecerán como ramas. (Proverbios 11:20)",
        "Aunque tu comienzo haya sido insignificante, tu porvenir se engrandecerá en gran manera. (Job 8:7)",
        "En toda labor hay fruto, pero las vanas palabras de los labios empobrecen. (Proverbios 14:23)",
        "Hay quienes reparten, y les es añadido más, y hay quienes retienen más de lo que es justo, pero vienen a pobreza. (Proverbios 11:24)",
        "Sé vivir humildemente, y sé tener abundancia. En todo y por todo estoy enseñado, así para estar saciado como para tener hambre, así para tener abundancia como para padecer necesidad. (Filipenses 4:12)",
        "Cada uno dé como propuso en su corazón, no con tristeza, ni por necesidad, porque Dios ama al dador alegre. (2 Corintios 9:7)",
        "Pero gran ganancia es la piedad acompañada de contentamiento, porque nada hemos traído a este mundo, y sin duda nada podemos sacar. Así que, teniendo sustento y abrigo, estemos contentos con esto. (1 Timoteo 6:6)"
    ];
    let VERSEIND = VERSES[Math.floor(Math.random() * VERSES.length)];
    document.getElementById("TITLE1").textContent = VERSEIND;
}


//NOTIFICACIONES

if(!"Notification" in window) {alert("Notificaciones no disponibles, utilize un nuevo navegador o actualize a la versión más reciente.");}
else if(Notification.permission != "granted") {Notification.requestPermission();}

function NOTIF(NOTIF_TITLE,NOTIF_BODY,NOTIF_ICON) {
    const NOTIF_AUDIO = new Audio('notif.mp3');
    NOTIF_AUDIO.volume = 0.5;
    NOTIF_AUDIO.play().catch(error => {alert("Interactúa con la página para reproducir el sonido.");});
    var NOTIF_ALERT = new Notification(NOTIF_TITLE,{body: NOTIF_BODY,icon: NOTIF_ICON,silent: true});
}



//CONSTANTES QUE SE ACTUALIZAN (Por cada 1000 milisegundos, 1 segundo)

setInterval(() => {
    const NEWDATE = new Date();
    const TIMECURRENT = NEWDATE.toLocaleTimeString();
    const DATECURRENT = NEWDATE.toLocaleDateString();
    CLOCK.innerHTML = `${TIMECURRENT} ${DATECURRENT}`;

    LOCALLOAD();
},1000);



//AÑADIR EN LA TABLA (La acción que realiza el botón AÑADIR)

function TD_ADD() {
    const INPUT1_VAL = document.getElementById("INPUT1").value;
    const INPUT2_VAL = document.getElementById("INPUT2").value;
    const INPUT3_ARR = document.getElementById('INPUT3').value.split("-");
    const INPUT3REAL = new Date(INPUT3_ARR[0],INPUT3_ARR[1]-1,INPUT3_ARR[2]);
    const INPUT3_VAL = INPUT3REAL.toLocaleDateString();
    const INPUT5_VAL = document.getElementById("INPUT5").value;
    const INPUT7_VAL = document.getElementById("INPUT7").value;
    const INPUT8_VAL = document.getElementById("INPUT8").value;
    const INPUT9_VAL = document.getElementById("INPUT9").value;

    const NEWDATE = new Date();
    const DATECURRENT = NEWDATE.toLocaleDateString();
    let REF = JSON.parse(localStorage.getItem('REF')) || [];

    let TD_INPUT = [DATECURRENT,INPUT1_VAL,INPUT7_VAL,INPUT2_VAL,INPUT8_VAL,REF+1,INPUT3_VAL,INPUT5_VAL,INPUT9_VAL," "];

    const TR_NEW = document.createElement('tr');
    TBODY1.appendChild(TR_NEW);

    TD_INPUT.forEach(element => {
        const TD_NEW = document.createElement('td');
        TD_NEW.textContent = element;
        TR_NEW.appendChild(TD_NEW);
    })
    LOCALSAVE(TD_INPUT);
}



//GUARDAR EN localStorage

function LOCALSAVE(ELEMENT) {
    //Carga todo el contenido de TRINFO, guardado en localStorage, y lo guarda en una variable (let TRINFO).
    let TRINFO = JSON.parse(localStorage.getItem('TRINFO')) || [];
    let REF = JSON.parse(localStorage.getItem('REF')) || [];
    let REFA = JSON.parse(localStorage.getItem('REFA')) || [];
    let REFB = JSON.parse(localStorage.getItem('REFB')) || [];
    //                                                     ¯¯¯¯¯¯¯ Si lo anterior no devuelve nada, devuelve el valor [] (Un array vacío).
    //Toma lo que se haya ingresado en ELEMENT (TD_INPUT) y lo agrega al principio de TRINFO.
    TRINFO.unshift(ELEMENT);
    REF++;
    //Guarda TRINFO con la nueva información, en localStorage.
    localStorage.setItem('TRINFO',JSON.stringify(TRINFO));
    localStorage.setItem('REF',JSON.stringify(REF));
    if(ELEMENT[4] == "ARREGLO") {REFA++; localStorage.setItem('REFA',JSON.stringify(REFA));}
    if(ELEMENT[4] == "CORTE") {REFB++; localStorage.setItem('REFB',JSON.stringify(REFB));}
}



//CARGAR EN localStorage

function LOCALLOAD() {
    //TITULOS DE LA TABLA
    TABLE1_TH.innerHTML = ``;
    let TH_ARRAYS = ["FECHAe","CLIENTE","TELEFONO","DESCRIPCION","TIPO","REF","FECHAs","USUARIO","CUENTA","MARCA"];
    TH_ARRAYS.forEach(element => {
        const TH1_NEW = document.createElement('th');
        TH1_NEW.id = element;
        TH1_NEW.textContent = element;
        TABLE1_TH.appendChild(TH1_NEW);
    });

    console.clear();
    const NEWDATE = new Date();
    const TIMECURRENT = NEWDATE.toLocaleTimeString();
    const DATECURRENT = NEWDATE.toLocaleDateString();
    const TIMEALARM = "5:44:00 p.m.";

    const DATET = new Date(NEWDATE);
    DATET.setDate(NEWDATE.getDate() + 1);
    const DATETOMORROW = DATET.toLocaleDateString();

    const DATEY = new Date(NEWDATE);
    DATEY.setDate(NEWDATE.getDate() - 1);
    const DATEYESTERDAY = DATEY.toLocaleDateString();

    //Limpia la tabla entera antes de agregar la información actualizada
    TBODY1.innerHTML = ``;

    //Carga todo el contenido de TRINFO, guardado en localStorage, y lo guarda en una variable (let TRINFO).
    let TRINFO = JSON.parse(localStorage.getItem('TRINFO')) || [];
    //                                                     ¯¯¯¯¯¯¯ Si lo anterior no devuelve nada, devuelve el valor [] (Un array vacío).
    let TRLOAD = TRINFO;
    
    //Filtrado de información:
    document.getElementById("FILTER2").style.display = 'none';
    document.getElementById("INPUT6").style.display = 'none';
    document.getElementById("INPUT7").style.display = 'inline';
    document.getElementById("INPUT8").style.display = 'inline';
    document.getElementById("INPUT9").style.display = 'inline';
    document.getElementById("INPUT2").style.display = 'inline';
    document.getElementById("INPUT3").style.display = 'inline';
    document.getElementById("INPUT5").style.display = 'inline';
    document.getElementById("SUBMIT").style.display = 'inline';
    let FILTER_VAL = document.getElementById("FILTER").checked;

    if(FILTER_VAL == true) {
        const INPUT1_VAL = document.getElementById("INPUT1").value;
        const INPUT6_VAL = document.getElementById("INPUT6").value;
        document.getElementById("INPUT6").style.display = 'inline';
        document.getElementById("INPUT7").style.display = 'none';
        document.getElementById("INPUT8").style.display = 'none';
        document.getElementById("INPUT9").style.display = 'none';
        document.getElementById("INPUT2").style.display = 'none';
        document.getElementById("INPUT3").style.display = 'none';
        document.getElementById("INPUT5").style.display = 'none';
        document.getElementById("FILTER2").style.display = 'flex';
        document.getElementById("SUBMIT").style.display = 'none';

        let TRINPUT1 = TRINFO.filter(ELEMENT1 => ELEMENT1[5] == INPUT6_VAL);
        let TRINPUT2 = TRINFO.filter(ELEMENT2 => ELEMENT2[1] == INPUT1_VAL);

        TRLOAD = TRINFO.filter(ELEMENT3 =>
            ELEMENT3[1] == INPUT1_VAL &&
            ELEMENT3[5] == INPUT6_VAL
        );
        if(TRINPUT1 == "") {TRLOAD = TRINPUT2;} else {TRLOAD = TRINPUT1;}
        if(document.getElementById("FILTERA").checked == true) {TRLOAD = TRINFO.filter(ELEMENT4 => ELEMENT4[4] == "ARREGLO");}
        if(document.getElementById("FILTERB").checked == true) {TRLOAD = TRINFO.filter(ELEMENT5 => ELEMENT5[4] == "CORTE");}
    }

    i = 0; //i: Número del conjunto

    //Por cada conjunto que se encuentre en TRLOAD:
    TRLOAD.forEach(element => {
        i2 = 0; //i2: Número de la unidad
        //Crea un TR y lo asigna a la tabla
        const TR_NEW = document.createElement('tr');
        TR_NEW.id = i;
        i++;
        //TRELEM: Los items que se encuentren en el conjunto.
        let TRELEM = TRINFO[TR_NEW.id];
        TBODY1.appendChild(TR_NEW);

        //Por cada item que se encuentre en dicho conjunto:
        TRELEM.forEach(item => {
            //Crea un TD, le agrega el valor del item y lo asigna al TR creado.
            const TD_NEW = document.createElement('td');
            TD_NEW.id = 'TR'+(i-1)+'-TD'+i2;
            i2++;
            TD_NEW.textContent = item;
            TR_NEW.appendChild(TD_NEW);
        })
        //Color y notificación según fecha
        let NOTIF_TITLE = "ALARMA TEMPRANA";
        let NOTIF_BODY = ["Pedido N°"," pendiente para retiro."];
        let NOTIF_ICON = "notif.png";
        //Si la fecha en item N°6 del conjunto es igual a AYER:
        if(TRELEM[6] == DATEYESTERDAY) {
            TR_NEW.style.background = 'red';
            TR_NEW.style.color = 'black';
        }
        //Si la fecha en item N°6 del conjunto es igual a HOY:
        if(TRELEM[6] == DATECURRENT) {
            TR_NEW.style.background = 'yellow';
            TR_NEW.style.color = 'black';
            //Si la hora actual es igual a HORA DE ALARMA:
            if(TIMECURRENT == TIMEALARM) {
                NOTIF(NOTIF_TITLE,NOTIF_BODY[0]+TRELEM[5]+NOTIF_BODY[1],NOTIF_ICON);
            }
        }
        //Si la fecha en item N°6 del conjunto es igual a MAÑANA:
        if(TRELEM[6] == DATETOMORROW) {
            TR_NEW.style.background = 'green';
            TR_NEW.style.color = 'black';
        }
        //Si la fecha en item N°6 del conjunto es igual a TERMINADO:
        if(TRELEM[6] == "TERMINADO") {
            TR_NEW.style.background = 'purple';
            TR_NEW.style.color = 'white';
        }
        //Mostrar días restantes del pedido, al mover el mouse encima de la fila.

        //CALCULO
        //Extrae el contenido en item N°6 y separa sus números en un array (ARRAYTDS):
        const ARRAYTD5 = TRELEM[6].split("/");
        //Crea una fecha real (TD5REAL) y le pone los números de ARRAYTD5.
        const TD5REAL = new Date(ARRAYTD5[2],ARRAYTD5[1]-1,ARRAYTD5[0]);
        //DATESUB: Fecha real del item N°6 menos fecha de hoy.
        const DATESUB = TD5REAL - NEWDATE;
        //DAYSREM: Divide y multiplica el resultado de DATESUB hasta que
        //se ajuste a los milisegundos, segundos, minutos, horas, días, etc de una fecha normal.
        const DAYSREM = Math.round((DATESUB/(((1000*60)*60)*24))+1);

        //EVENTO (Al detectar el mouse encima de la celda TD6:)
        document.getElementById('TR'+TR_NEW.id+'-TD6').addEventListener('mouseover', () => {
            document.getElementById('TR'+TR_NEW.id+'-TD6').style.background = 'white';
            document.getElementById('TR'+TR_NEW.id+'-TD6').style.color = 'black';
            document.getElementById('TR'+TR_NEW.id+'-TD6').textContent = DAYSREM;
            document.getElementById("FECHAs").textContent = "DIAS";
        });

        //Añade DOS botones por cada TR que se ejecute.
        //BOTÓN 1 (Remover):
        const BUTTON_NEW = document.createElement('button');
        //Al presionar el botón:
        BUTTON_NEW.addEventListener('click', () => {
            //Carga todo el contenido de TRINFO, guardado en localStorage, y lo guarda en una variable (let TRINFO).
            let TRINFO = JSON.parse(localStorage.getItem('TRINFO')) || [];
            //                                                     ¯¯¯¯¯¯¯ Si lo anterior no devuelve nada, devuelve el valor [] (Un array vacío).
            TRINFO.splice(TR_NEW.id,1);
            localStorage.setItem('TRINFO',JSON.stringify(TRINFO));
            location.reload();
        });
        //Atributos del botón
        BUTTON_NEW.id = 'REMOVE'+TR_NEW.id;
        BUTTON_NEW.textContent = "X";
        BUTTON_NEW.style.position = 'absolute';
        BUTTON_NEW.style.display = 'flex';
        BUTTON_NEW.style.fontWeight = '800';
        BUTTON_NEW.style.alignItems = 'center';
        BUTTON_NEW.style.left = '97%';
        BUTTON_NEW.style.borderRadius = '50%';
        BUTTON_NEW.style.width = '2%';
        BUTTON_NEW.style.height = '25px';
        BUTTON_NEW.style.background = 'red';
        BUTTON_NEW.style.border = '2px solid lightcoral';
        BUTTON_NEW.style.borderBottomColor= 'darkred';
        BUTTON_NEW.style.borderRightColor= 'darkred';
        BUTTON_NEW.style.color = 'white';
        TR_NEW.appendChild(BUTTON_NEW);

        //BOTÓN 2 (Verificar). Solo aparece si el contenido en item N°6 no dice TERMINADO:
        if(TRELEM[6] != "TERMINADO") {
            const BUTTON2_NEW = document.createElement('button');
            //Al presionar el botón:
            BUTTON2_NEW.addEventListener('click', () => {
                //Carga todo el contenido de TRINFO, guardado en localStorage, y lo guarda en una variable (let TRINFO).
                let TRINFO = JSON.parse(localStorage.getItem('TRINFO')) || [];
                //                                                     ¯¯¯¯¯¯¯ Si lo anterior no devuelve nada, devuelve el valor [] (Un array vacío).
                //De todo ese contenido solo elije uno en específico, el del conjunto que está cargando justo ahora.
                //Ese conjunto se va a otra variable (TRELEM).
                let TRELEM = TRINFO[TR_NEW.id];
                //Cambia el contenido de item N°6 a TERMINADO.
                TRELEM[6] = "TERMINADO";
                //Borra el conjunto de su posición, y lo agrega de nuevo desde el principio.
                TRINFO.splice(TR_NEW.id,1);
                TRINFO.unshift(TRELEM);
                localStorage.setItem('TRINFO',JSON.stringify(TRINFO));
            });
            BUTTON2_NEW.id = 'FINISH'+TR_NEW.id;
            BUTTON2_NEW.textContent = "✓";
            BUTTON2_NEW.style.position = 'absolute';
            BUTTON2_NEW.style.display = 'flex';
            BUTTON2_NEW.style.fontWeight = '800';
            BUTTON2_NEW.style.alignItems = 'center';
            BUTTON2_NEW.style.left = '94.5%';
            BUTTON2_NEW.style.borderRadius = '50%';
            BUTTON2_NEW.style.width = '2%';
            BUTTON2_NEW.style.height = '25px';
            BUTTON2_NEW.style.background = 'green';
            BUTTON2_NEW.style.border = '2px solid lightgreen';
            BUTTON2_NEW.style.borderBottomColor= 'rgb(5, 43, 5)';
            BUTTON2_NEW.style.borderRightColor= 'rgb(5, 43, 5)';
            BUTTON2_NEW.style.color = 'white';
            TR_NEW.appendChild(BUTTON2_NEW);
        }
    });
}