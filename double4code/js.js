/**
 * Created by Quang Rô on 10/29/2017.
 */

$(function () {
    function getHtml() {
        var html = $('.html').val() ;
        return html;
    }
    function getCss() {
        var css = $('.css').val();
        return css;
    }
    function getJS() {
        var js = $('.js').val();
        return js;
    }

    $('textarea').on('keyup', function () {
        var targetp = $('#previewTarget')[0].contentWindow.document;
        targetp.open();
        targetp.close();

        var html = getHtml();
        var css = getCss();
        var js = getJS();
        var style ='\n<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
            '\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
            '\n<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'        ;
        $('head', targetp).append(style + '\n<style>\n' + css + '\n</style>');
        var t = 'script';
        $('head', targetp).append('\n<' + t + '>\n' + js + '\n</' + t + '>\n');
        $('body', targetp).append('\n' + html + '\n');
    });
    $('#getCode').click(function () {
        var alertcode = $('#previewTarget').contents().find('html').html();
        alert(alertcode);
        return false;
    });

    $('#exportcode').click(function ()
    {
        var d = new Date();
        var copyright = 'Create by Quang Rô on ' + d.toLocaleString() ;
        var textToSave = '<!-- ' + copyright + ' -->' + '<html>\n' + $('#previewTarget').contents().find('html').html() + '\n</html>';
        var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value + '.html';
        if(textToSave.trim() != "<head></head><body></body>"){
            if(fileNameToSaveAs.trim() != ".html"){
                var downloadLink = document.createElement("a");
                downloadLink.download = fileNameToSaveAs;
                downloadLink.innerHTML = "Download File";
                downloadLink.href = textToSaveAsURL;
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);

                downloadLink.click();
            }
            else alert("ban chua dat ten file")
        }else alert("chua co du lieu")
    })

    function destroyClickedElement(event)
    {
        document.body.removeChild(event.target);
    }
})

// COUNT DAY
datePast = new Date(2017,9,29,19,19,19);

function GetCount(){

    dateNow = new Date();
    //grab current date
    amount = - datePast.getTime() + dateNow.getTime();
    //calc milliseconds between dates
    delete dateNow;

    // time is already past
    if(amount < 0){
        document.getElementById('countbox').innerHTML="Now!";
    }
    // date is still good
    else{

        days=0;hours=0;mins=0;secs=0;out="";

        amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

        days=Math.floor(amount/86400);//days
        amount=amount%86400;

        hours=Math.floor(amount/3600);//hours
        amount=amount%3600;

        mins=Math.floor(amount/60);//minutes
        amount=amount%60;

        secs=Math.floor(amount);//seconds

        if(days != 0){out += days +" day"+((days!=1)?"s":"")+" ";}
        if(days != 0 || hours != 0){out += hours +" hour"+((hours!=1)?"s":"")+" ";}
        if(days != 0 || hours != 0 || mins != 0){out += mins +" minute"+((mins!=1)?"s":"")+" ";}
        out += secs +" seconds";
        //document.getElementById('countbox').innerHTML=out;
        document.getElementById('days').innerHTML=days ;
        document.getElementById('hours').innerHTML=hours ;
        document.getElementById('mins').innerHTML=mins ;
        document.getElementById('secs').innerHTML=secs ;

        setTimeout("GetCount()", 1000);
    }
}

window.onload=function(){GetCount();}