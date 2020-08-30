var thisOnline = false;
var timeAjax = 1;
var tokenBlynk;

var authToken = {
    one:    '40573266ff8240ddb7f168f6fb9217f5',
    two:    '1b58badb57a840c4933c4872ef6b56ca',
    three:  '55f33050a5f84f2592c3bb0d82ceec37',
    four:   'd835b16fde9c4dafaa98ee5bb36d304a',
    five:   'c0ee503e01a64c028c94cfb35ff0e6bf'
}

var lampStat = {
    2: 0,
    3: 0,
    4: 0
}

var t,
    h;

/* V1 КНОПКА
   V2 ЛАМПОЧКА 1
   V3 ЛАМПОЧКА 2
   V4 ЛАМПОЧКА 3
   V5 ТЕМПЕРАТУРА
   V6 ВЛАЖНОСТЬ
   V7 СЕРВОПРИВОД*/

function clickTab(id){
    var token = authToken[id];
    document.getElementById('token').value = token;
    $('.tab').css({'background' : '#aaa', 'color' : '3f3f3f'});
    document.getElementById(id).style.background = "#555";
    document.getElementById(id).style.color = "#ddd";
}



 var toggleAjax = setInterval(function(){                                                             
     tokenBlynk = document.getElementById('token').value;
     
     $.ajax({
                url: "http://blynk-cloud.com/" + tokenBlynk + "/isHardwareConnected",               //ONLINE
                cache: false,
                success: function(data){ 
                    if(data){
                        $('i').text('ONLINE');
                    }else{
                        $('i').text('OFFLINE');
                    }
                }
            });
     
     $.ajax({                                                                                      //BUTTON
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V1",
                cache: false,
                success: function(data){
                    if(data == 1){
                        $('#but').css({'background' : '#53a778'});
                    }else{
                        $('#but').css({'background' : '#fff'});
                    }
                }
                    
            });
     
     $.ajax({                                                                                      //LAMP1
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V2",
                cache: false,
                success: function(data){
                   lampStat[2] = data;
                    if(data == 1){
                        $('#lamp1').css({'background' : 'red'});
                    }else{
                        $('#lamp1').css({'background' : '#fff'});
                    }
                }
                    
            });
     
     $.ajax({                                                                                      //LAMP2
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V3",
                cache: false,
                success: function(data){
                   lampStat[3] = data;
                    if(data == 1){
                        $('#lamp2').css({'background' : 'red'});
                    }else{
                        $('#lamp2').css({'background' : '#fff'});
                    }
                }
                    
            });
     
     $.ajax({                                                                                      //LAMP3
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V4",
                cache: false,
                success: function(data){
                    lampStat[4] = data;
                    if(data == 1){
                        $('#lamp3').css({'background' : 'red'});
                    }else{
                        $('#lamp3').css({'background' : '#fff'});
                    }
                }
                    
            });
     
     $.ajax({                                                                                      //TEMP
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V5",
                cache: false,
                success: function(data){
                   t = data;
                }
                    
            });
     
     $.ajax({                                                                                      //HIM
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V6",
                cache: false,
                success: function(data){
                   h = data;
                }
                    
            });
     
     $.ajax({
                url: "http://blynk-cloud.com/" + tokenBlynk + "/get/V7",                               //SERVO
                cache: false,
                success: function(data){
                    $('#size1').val(data);
            }
            });
      
     if(t != undefined && h != undefined){
     $('p').text(h + '°C / ' + t + '%');
     }

 }, 1000 * timeAjax);

function sizePic1(){
            var onInput = $('#size1').val();
            $.ajax({
                url: "http://blynk-cloud.com/" + tokenBlynk + "/update/V7?value=" + onInput + "",
                cache: false,
                success: function(data){
            }
            });
        }

function clickLamp(el){
    var stat;
    if(lampStat[el] == 0){
        stat = 1;
    }else{
        stat = 0;
    }
    $.ajax({
                url: "http://blynk-cloud.com/" + tokenBlynk + "/update/V" + el +"?value=" + stat,
                cache: false,
                success: function(data){
            }
            });
}