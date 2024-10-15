/*Un calendario para agendar turnos en una estetica*/ 

let mes = parseInt(prompt("¿Que mes quieres reservar?"));
let dia = parseInt(prompt("¿Que día quieres reservar?"));
let hora = parseInt(prompt("¿A qué hora quieres reservar?"));


if(mes => 1 && mes <= 12){
    function fecha(mes,dia,_hora ){
        switch(mes)
        {
        
                case 1:
                if(dia >= 1 && dia <= 31){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Enero";
                }
                else{
                    return "elija un dia valido"
                    
                }
            case 2:
                if(dia >= 1 && dia <=29){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Febrero";
                }else{
                    return "elija un dia valido"
                }
            case 3:
                if(dia >= 1 && dia <=31){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Marzo";
                }else{
                    return "elija un dia valido"
                }
            case 4:
                if(dia >= 1 && dia <=30){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Abril";
                }else{
                    return "elija un dia valido"
                }
            case 5:
                if(dia >= 1 && dia <=31){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Mayo";
                }else{
                    return "elija un dia valido"
                }
            case 6:
                if(dia >= 1 && dia <=30){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Junio";
                }else{
                    return "elija un dia valido"
                }
            case 7:
                if(dia >= 1 && dia <=31){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Julio";
                }else{
                    return "elija un dia valido"
                }
            case 8:
                if(dia >= 1 && dia <=30){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Agosto";
                }else{
                    return "elija un dia valido"
                }
            case 9:
                if(dia >= 1 && dia <=31){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Septiembre";
                }else{
                    return "elija un dia valido"
                }
            case 10:
                if(dia >= 1 && dia <=30){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las "+ hora + " de Octubre";
                }else{
                    return "elija un dia valido"
                }
            case 11:
                if(dia >= 1 && dia <=31){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las  "+ hora + " de Noviembre";
                }else{
                    return "elija un dia valido"
                    
                }
            case 12:
                if(dia >= 1 && dia <=30){
                    if(hora >= 0 && hora <= 23){}
                    return "reservaste el dia " + dia + " a las "+ hora +" de Diciembre";
                }else{
                    return "elija un dia valido"
                }
        }
    }

}else{
    alert("Elija un mes valido")

}
while (mes != null && dia != null){
    let mensaje = fecha(mes, dia);
    

    alert (mensaje);
    break;
}
