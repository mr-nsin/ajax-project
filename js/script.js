
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
    return false;
};

$('#form-container').submit(loadData);
