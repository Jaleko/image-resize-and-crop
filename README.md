<h1>Image resize and crop - JQuery Plugin</h1>
<p>
    Questo plugin permette di caricare un'immagine tramite il browser e ottenere come output un'immagine piena delle dimensioni desiderate.<br/>
    L'immagine non viene caricata sul server, viene ridimensionata e ritagliata lato client.<br/>
    In questo modo, se si vuole caricare l'immagine sul server, il tempo di upload viene ridotto perch&eacute; si carica l'immagine con le dimensioni effettivamente necessarie.
</p>
<h2>Caso d'uso</h2>
<ol>
    <li>Clicco sul bottone per caricare un'immagine</li>
    <li>Scelgo l'immagine:
        <ul>
            <li>Se l'immagine &egrave; più piccola delle dimensioni necessarie, viene mostrato un messaggio di errore e l'immagine non viene caricata.</li>
            <li>Se l'immagine &egrave; pi&ugrave; grande delle dimensioni necessarie, viene ridimensionata e mostrata nell'area dell'anteprima della pagina. Viene evidenziata una porzione dell'immagine che corrisponde alla porzione utilizzata per l'immagine di output. &Egrave; possibile ridimensionare (mantenendo la proporzione) e spostare l'area selezionata. Ad ogni cambiamento, l'anteprima dell'immagine di output viene aggiornata.</li>
        </ul>
    </li>
</ol>
<p>L'immagine di output pu&ograve; essere recuperata utilizzado il metodo messo a disposizione.</p>
<h2>Parametri</h2>
<ul>
    <li>preview (object):
        <ul>
            <li>selector (string): selettore JQuery dell'elemento che mostrer&agrave; l'anteprima dell'immagine ridimensionata. Default: #preview</li>
            <li>width (int): larghezza in pixel dell'elemento che mostrer&agrave; l'anteprima dell'immagine ridimensionata. Default: 500</li>
            <li>height (int): altezza in pixel dell'elemento che mostrer&agrave; l'anteprima dell'immagine ridimensionata. Default: 500</li>
        </ul>
    </li>
    <li>selection (object):
        <ul>
            <li>selector (string): selettore JQuery dell'elemento che mostrer&agrave; l'area selezionata all'interno dell'anteprima. Default: #selection</li>
            <li>width (int): larghezza in pixel dell'immagine di output desiderata. Default: 100</li>
            <li>height (int): altezza in pixel dell'immagine di output desiderata. Default: 200</li>
            <li>showMessage (function): permette di modificare il messaggio di errore quando l'immagine caricata ha dimensioni inferiori rispetto a quelle necessarie.<br/>
                Default: function (obj, width, height) { alert("Image not valid. Min width: "+width+"px - Min height: "+height+"px"); }
                <ul>
                    <li>function showMessage (obj, width, height)</li>
                    <li>obj: oggetto JQuery dell'elemento &lt;input type=&quot;file&quot;/&gt; sul quale viene chiamato il plugin</li>
                    <li>width (int): larghezza in pixel dell'immagine di output desiderata</li>
                    <li>height (int): altezza in pixel dell'immagine di output desiderata</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>outputImage (object):
        <ul>
            <li>selector (string): selettore JQuery dell'elemento &lt;img/&gt; che mostrer&agrave; l'anteprima dell'immagine di output. Default: #output</li>
        </ul>
    </li>
</ul>
<h2>Utilizzo</h2>
<h3>Aggiungere all'interno del tag &lt;head&gt;</h3>
<pre>
&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css&#x22;/&#x3E;
&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;css/image-resize-and-crop-1.0.0.jquery.plugin.css&#x22;/&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22; src=&#x22;//code.jquery.com/jquery-1.11.2.min.js&#x22;&#x3E;&#x3C;/script&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22; src=&#x22;//code.jquery.com/ui/1.11.4/jquery-ui.min.js&#x22;&#x3E;&#x3C;/script&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22; src=&#x22;js/image-resize-and-crop-1.0.0.jquery.plugin.js&#x22;&#x3E;&#x3C;/script&#x3E;
&#x3C;script type=&#x22;text/javascript&#x22;&#x3E;
    var f;
    $(document).ready(function () {
        f = $(&#x27;#file&#x27;).imageResizeAndCrop();
    });
&#x3C;/script&#x3E;
</pre>
<h3>Esempio di &lt;body&gt;</h3>
<pre>
&#x3C;input type=&#x22;file&#x22; id=&#x22;file&#x22;&#x3E;
&#x3C;div id=&#x22;preview&#x22; style=&#x22;display: none;&#x22;&#x3E;
    &#x3C;div id=&#x22;overlay&#x22;&#x3E;
        &#x3C;div id=&#x22;selection&#x22;&#x3E;&#x3C;/div&#x3E;
    &#x3C;/div&#x3E;
&#x3C;/div&#x3E;
&#x3C;img src=&#x22;&#x22; id=&#x22;output&#x22; style=&#x22;display: none;&#x22;&#x3E;
</pre>
<h2>Metodo per ottenere l'immagine di output</h2>
<pre>
var outputImage = f.getImageObject();
//outputImage.data
//outputImage.width
//outputImage.height
</pre>
<p>Questo metodo restituisce un oggetto:</p>
<ul>
    <li>data (string): immagine. Corrisponde al valore da inserire nell'attributo src di un tag &lt;img/&gt;</li>
    <li>width (int): largezza dell'immagine</li>
    <li>height (int): altezza dell'immagine</li>
</ul>
<h2>Demo</h2>
<p>
    <a href="http://jaleko.altervista.org/github/demo/image-resize-and-crop/" target="_blank">Vai alla demo</a>
</p>