
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $streetstr = $("input[type=text][id=street]").val();
    var $citystr = $("input[type=text][id=city]").val();
    var $imageRequestURL = "http://maps.googleapis.com/maps/api/streetview?key=AIzaSyBAjLoz8yR30y1OWRSUX_yTUCEKmAAY0FQ&size=600x300&location="+$streetstr+","+$citystr;
    // YOUR CODE GOES HERE!
    $body.append('<img class="bgimg" src="'+$imageRequestURL+'" >');

    //The function will be called when submit buttion is clicked then get json method will make an HTTP request, and when response comes
    //this annonymous function will be called upon, the response data will be passed into the function. Data is in json form.
    //This request is for "New York Times API."
    $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q='" + $citystr + "'&api-key=24f484a347224d76aec8665ef6f2be92", function(data){
        console.log(data);
        $nytHeaderElem.text('New York Times Artcle About ' + $citystr);
        //Articles are array and get all articles from response
        articles =  data.response.docs;
        //Iterate through articles to get detail about each article.
        for(var i = 0; i < articles.length; i++){
            article = articles[i];
            //append the URL and hradline and snippet into the nytimes-articles section.
            $nytElem.append('<li class="article">'
                            +'<a href="'+article.web_url+'">'+article.headline.main+'</a>'
                            +'<p>'+article.snippet+'</p>'
                            +'</li>'
            );
        };
    }).error(function(e){
        $nytHeaderElem.text("New Time Articles Could Not Be Loaded.");
    });

    //This request is for "Wikipedia Articles, using media wikipedia API."
    var wikiURL = 'https://en.wikipediaASDFASDF.org/w/api.php?action=opensearch&search="'+ $citystr + '"&format=json&callback=wikiCallback';
    
    //There are many  different methods to handle jsonp request.
    //Jsonp does not provide a error function for fallback therefor we will get around
    //setTimeout function runs if it does not able to get resources it will append
    //the following string into the wikipedia element.
    var wikiTimeOutRequest = setTimeout(() => {
        $wikiElem.text('Failed to get wikipedia resources');
    }, 8000);

    //The function is for making cross origin request
    $.ajax({
        type: "method",
        url: wikiURL,
        dataType: "jsonp",
        //jsonp callback, in this function upon successful response, response data
        //is passed.
        success: function (response) {
            console.log(response);
            articlesList = response[1];
            articlesURL = response[3];
            for(var i = 0; i < articlesList.length; i++){
                articleURL = articlesURL[i];
                articleStr = articlesList[i];  
                $wikiElem.append('<li><a href="'+articleURL+'">'+articleStr+'</li>');
            };

            //This clear timeout or stop this timeout from happening.
            //Process occur this way
            //  1. Success function will run and will pinned all the articles to the list.
            //  2. If this run successfully then stop the timeout.
            clearTimeout(wikiTimeOutRequest);
        }
    });
    return false;
};

$('#form-container').submit(loadData);
