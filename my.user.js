// ==UserScript==
// @name myUserJS
// @description Мой самый первый юзерскрипт 
// @author Vasya Pupkin
// @license MIT
// @version 1.0
// @include https://www.fonbet.ru/live/*
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    // В юзерскрипты можно вставлять практически любые javascript-библиотеки.
    // Код библиотеки копируется прямо в юзерскрипт.
    // При подключении библиотеки нужно передать w в качестве параметра окна window
    // Пример: подключение jquery.min.js
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    // [4] дополнительная проверка наряду с @include
    if (/http:\/\/www.fonbet.ru\/live/.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта
        table_add = function(a)
{
    temp=table;
    last=a.length-1;
    for(i=0;i<last;i++)
        {
            if(!temp.has(a[i])) temp.set(a[i], new Map());
            temp=temp.get(a[i]);
        }
    if(!temp.has(a[last])) temp.set(a[last], 0);
    newcount=temp.get(a[last])+1;
	temp.set(a[last], newcount);
	//console.log(a);
	return newcount;
}


let observer = new MutationObserver(mutationRecords => {
for(let mut of mutationRecords) {
let sl=/table__col _type_btn/;
let sbl=/_state_blocked/;
    if (sl.test(mut.target.className)) //если кнопка
	   {
		   if(sbl.test(mut.target.className)&&!sbl.test(mut.oldValue)&&!sbl.test(mut.target.parentNode.className))
           {
			   cell_elem=mut.target;
			   parent_elem=cell_elem.parentElement;
			   i=0;
			   a=Array();
			   a[i++]=cell_elem.cellIndex; //номер ячейки
			   a[i++]=parent_elem.cells[1].firstElementChild.innerText; //название indent
			   indent=parseInt(parent_elem.firstElementChild.classList[2].match(/\d/)[0]); //номер indent
			   temp_elem=parent_elem;
			   indent_next=indent-1;
			   while(indent>1)
			   {
				    while(indent_next!=indent)
					{
						temp_elem=temp_elem.previousSibling;
						indent=parseInt(temp_elem.firstElementChild.classList[2].match(/\d/)[0]);
					}
					a[i++]=temp_elem.cells[1].firstElementChild.innerText;
					indent_next=indent-1;
			   }
			   a[i]=temp_elem.parentElement.firstElementChild.cells[0].innerText;
			   ret_count=table_add(a.reverse());
			   if(ret_count>=3)
			   {
	                if(mut.target.parentElement.cells.length>12)
					{
						switch(mut.target.cellIndex)
						{
							case 2:
							case 3:
							case 4:
							case 5:
							case 6:
							case 7: str=mut.target.parentElement.parentElement.rows[0].cells[mut.target.cellIndex-1].innerText+" ("+mut.target.innerText+")";
									break;
							case 9:
							case 11:str='Победа команды '+mut.target.parentElement.parentElement.rows[0].cells[mut.target.cellIndex-1].innerText+' с форой '+mut.target.previousElementSibling.innerText+' ('+mut.target.innerText+')';
									break;
							case 13:str='Тотал больше '+mut.target.previousElementSibling.innerText+' ('+mut.target.innerText+')';
									break;
							case 14:str='Тотал меньше '+mut.target.previousElementSibling.previousElementSibling.innerText+' ('+mut.target.innerText+')';
									break;
						}

					}
					else
					{
						switch(mut.target.cellIndex)
						{
							case 2:
							case 3: str=mut.target.parentElement.parentElement.rows[0].cells[mut.target.cellIndex-1].innerText+" ("+mut.target.innerText+")";
									break;
							case 5:
							case 7:str='Победа команды '+mut.target.parentElement.parentElement.rows[0].cells[mut.target.cellIndex-1].innerText+' с форой '+mut.target.previousElementSibling.innerText+' ('+mut.target.innerText+')';
									break;
							case 9:str='Тотал больше '+mut.target.previousElementSibling.innerText+' ('+mut.target.innerText+')';
									break;
							case 10:str='Тотал меньше '+mut.target.previousElementSibling.previousElementSibling.innerText+' ('+mut.target.innerText+')';
									break;
						}
					}

                    let date=new Date();
                    let time=date.toLocaleTimeString();
	                str1='';
					for(i=0;i<a.length-1;i++)
						{
							str1+=a[i]+'                                                                                                                                   ';
						}
					
					switch(ret_count)
					{
						case 1:
							str1+='\u{1F601}*Прикольнулось на '+ret_count+' раз*\u{1F601}';
							break;
						case 2:
							str1+='\u{1F603}*Вдарило '+ret_count+' раза*\u{1F603}';
							break;
						case 3:
							str1+='\u{1F60A}*Надавило '+ret_count+' раза*\u{1F60A}';
							break;
						case 4:
							str1+='\u{1F605}*Стало странно '+ret_count+' раз*\u{1F605}';
							break;
						case 5:
							str1+='\u{1F625}*Стало НЕОБЫЧНО '+ret_count+' раз*\u{1F625}';
							break;
						case 6:
							str1+='\u{1F628}*УДИВИЛО '+ret_count+' раз*\u{1F628}';
							break;
						case 7:
							str1+='\u{1F630}*ВОЗНИК ИНТЕРЕС '+ret_count+' РАЗ*\u{1F630}';
							break;
						case 8:
							str1+='\u{1F633}*А ТЕПЕРЬ '+ret_count+' БФРФРФ*\u{1F633}';
							break;
						case 9:
							str1+='\u{1F623}*УЕБАЛО '+ret_count+' РАЗ*\u{1F623}';
							break;
						case 10:
							str1+='\u{1F624}*УЕБАШИЛО НАХУЙ '+ret_count+' РАЗ*\u{1F624}';
							break;
						case 11:
							str1+='\u{2705}*ДОК 100% '+ret_count+' РАЗ*\u{2705}';
							break;
						default:
							str1+='\u{1F170}\u{1F171}\u{1F17E}\u{1F171}\u{1F170}';

					}
	                res_str = Array();
	                res_str[0]=time;
	                res_str[1]=str1;
	                res_str[2]=str;
	                res=document.getElementById('res_tab');
	                res.firstElementChild.prepend(res.firstElementChild.rows[0].cloneNode(true));
                    res.firstElementChild.rows[0].setAttribute('class','table__row _type_segment');
                    //res.firstElementChild.rows[0].className=mut.target.parentElement.parentElement.rows[0].className;
                    res.firstElementChild.rows[0].setAttribute('style',mut.target.parentElement.parentElement.rows[0].getAttribute('style'));
                    //res.firstElementChild.rows[0].style=mut.target.parentElement.parentElement.rows[0].style;
                    if(res.firstElementChild.rows[0].classList.length>3)
                      (res.firstElementChild.rows[0].classList).remove(res.firstElementChild.rows[0].classList[3]);
                    for(i=0;i<3;i++)
						{
					//		res.firstElementChild.rows[0].classList[i]=mut.target.parentElement.parentElement.rows[0].classList[i];
							res.firstElementChild.rows[0].cells[i].innerText=res_str[i];
						}
                    console.log(time+' '+str1+' '+str);	
                    let tg_text = str1 + '                                                                                                                                   ' + str; 

                    fetch('https://api.telegram.org/bot1840221877:AAHIMk9K8cofwsZ7qAYHXAdSk3T_5dhsZIM/sendMessage?chat_id=@wdadwad1&text=' + tg_text + '&parse_mode=Markdown', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({foo: 'bar'})
                    }).then(res => res.json())
                        .then(res => console.log(res));
			   } 
			   
		    }
		}

    } 
});

  //d=document.getElementById('coupons__inner');
  d=document.getElementsByClassName("zone__inner")
  //d.parentElement.prepend(d.cloneNode(false));
  d[0].parentElement.prepend(d[0].cloneNode(false));
  //d=document.getElementById('coupons__inner');
  d=document.getElementsByClassName("zone__inner")

  d[0].id='mytable';
  tab=document.createElement('table');
  d[0].prepend(tab);
  d[0].firstElementChild.setAttribute('id', 'res_tab');
  res=document.getElementById('res_tab');
  r=res.insertRow(0);
  r.setAttribute('id','res_tab_row');
  //r.setAttribute('class','table__row _tytable__row _type_segment _sport_3088');
  r.setAttribute('class','table__row _type_segment');
  r.setAttribute('style','background-color: rgb(97, 154, 56)');
  r.insertCell(0);
  r.insertCell(1);
  r.insertCell(2);
  r.cells[0].setAttribute('class','table__col _type_head _type_value');
  r.cells[1].setAttribute('class','table__col _type_head _type_value');
  r.cells[2].setAttribute('class','table__col _type_head _type_value');

  let st = "test"
  fetch('https://api.telegram.org/bot1840221877:AAHIMk9K8cofwsZ7qAYHXAdSk3T_5dhsZIM/sendMessage?chat_id=@wdadwad1&text=' + test + '&parse_mode=Markdown', {
	method: 'POST',
	headers: {'Content-Type': 'application/json'},
	body: JSON.stringify({foo: 'bar'})
}).then(res => res.json())
	.then(res => console.log(res));

	
  let d1 =new Date();

  r.cells[0].innerText=d1.toLocaleTimeString();
  r.cells[1].innerText='тут будут указаны вид спорта, соревнование и т.д.';
  r.cells[2].innerText='ну а тут результат';
  table = new Map();
  observer.observe(document.getElementsByClassName("table")[0], {
  subtree: true,
  attributes: true,
  attributeOldValue: true, attributeFilter: ['class']
});
    }
})(window);