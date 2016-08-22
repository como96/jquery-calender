/*
  calender.js
  今月のカレンダーを表示する

 ・今日の日付の背景を変える
 ・あらゆる月のカレンダーを表示できるようにする
 ・先月、次月、今月へのリンクを作成する
 ・任意の月を指定できるようにする
*/

$(document).ready( function() {

    // ----- formを生成
    $('form').append('<select id="select-year"></select>');
    $('form').append('<select id="select-month"></select>');
    var formDate = new Date();
    var formYear = formDate.getFullYear();
    var optYear;
    var formMonth = formDate.getMonth()+1;
    var formToday = formDate.getDate();

    // 年
    for ( var i=2; i>0; i-- ) {
        optYear = new Date(formYear-i, formMonth).getFullYear();
        $('#select-year').append('<option value="'+ optYear +'" name="year">'+ optYear +'年</option>');
    }
    $('#select-year').append('<option value="'+ formYear +'" name="year" selected>'+ formYear +'年</option>');
    for ( var i=1; i<=3; i++ ) {
        optYear = new Date(formYear+i, formMonth).getFullYear();
        $('#select-year').append('<option value="'+ optYear +'" name="year">'+ optYear +'年</option>');
    }

    // 月
    for ( var i=1; i<=12; i++) {
        $('#select-month').append('<option value="'+ i +'" name="month">'+ i +'月</option>');
        if( i===formMonth ) {
            $('option[value="'+ i +'"]').prop('selected',true);
        }
    }
    // ----- end form

    // ▼ start function calender
    /* -----------------------------------------
        カレンダーを生成する。引数は年と月。
    ----------------------------------------- */
    function calender(setY, setM) {
        // すでに値があれば消す
        if ( $('#calender').length ) {
            $('#calender').empty()
        }

        var dayTable  = new Array("日","月","火","水","木","金","土");
        var monthTable  = new Array("January","February","March ","April","May","June","July","August","September","October","November","December");

        var firstDate = new Date(setY, setM-1, 1);
        var firstDay = firstDate.getDay(); //曜日

        var lastDate = new Date(setY, setM, 0);
        var last = lastDate.getDate();

        var prevDate =  new Date(setY, setM-1, 0); //前月の最終日
        var nextDate = new Date(setY, setM, 1); //次月の初日

        /* -------------
         html生成
         ------------ */
        $('#title').text(setY +'年'+ setM + '月');
        $('#cap').text(monthTable[setM-1] + ', '+ setY);

        $('#calender').append('<thead><tr></tr></thead>');

        // 曜日
        for ( var i=0; i<dayTable.length; i++ ) {
            $('#calender thead tr').append('<th>'+ dayTable[i] +'</th>');
            if( i===0 ) { //日曜日
                $('th:last-child').attr('class','sun');
            } else if ( i===6 ) {
                $('th:last-child').attr('class','sat');
            }
        }

        var rowVol = Math.ceil(( firstDate.getDay() + lastDate.getDate() ) / 7) + 1; //行数
        var counter = 1;
        var today;

        // 日付
        for ( var i=0; i<rowVol; i++ ) { //行数分繰り返す

            if( i===0 ) $('#calender').append('<tbody></tbody>');

            $('#calender').append('<tr></tr>');

            for( var j=0; j<dayTable.length; j++ ) { //曜日の分繰り返す

                if( i===0 && firstDay>0 && firstDay>j ) { //前月
                    today = new Date(setY, setM-1, -((firstDay-1)-j));
                    $('#calender tbody tr:last-child').append('<td class="prev">'+ today.getDate() +'</td>');
                } else if ( counter>lastDate.getDate() ) { //次月
                    today = new Date(setY, setM-1, counter);
                    $('#calender tbody tr:last-child').append('<td class="next">'+ today.getDate() +'</td>');
                    counter ++;
                } else {
                    today = new Date(setY, setM-1, counter);
                    $('#calender tbody tr:last-child').append('<td>'+ today.getDate() +'</td>');
                    counter ++;
                    if( counter===formToday && setY===formYear && setM===formMonth ) {
                        $('#calender tbody tr:last-child td:last-child').attr('class','today');
                    }
                }
            }

        }
        $('#select-year').val(setY);
        $('#select-month').val(setM);

    }
    // ▲ end function calender

    var setY = formYear;
    var setM = formMonth;
    calender(setY, setM);

    // 年月変更
    $('#select-year').change( function(){
        setY = parseInt($("#select-year").val());
        calender(setY, setM);
    });
    $('#select-month').change( function(){
        setM = parseInt($("#select-month").val());
        calender(setY, setM);
    });

    // 前月、次月　リンク
    $('#a_prev').click( function() {
        setM -= 1;
        if( setM<=0 ) { //前年
            setY -=1;
            setM = 12;
        }
        calender( setY, setM );
    });

    $('#a_today').click( function() {
        setY = formYear;
        setM = formMonth;
        calender( setY, setM );
    });

    $('#a_next').click( function() {
        setM += 1;
        if( setM>12 ) { //次年
            setY += 1;
            setM = 1;
        }
        calender( setY, setM );
    });
});