/*!
 * FashionSheet v0.1 Akshay Wattal
 * Copyright 2015 Akshay Wattal
 */
        // Global id tracker for Pin's components
        var idTracker = 1;

        // Function to truncate blurb text
        function truncateBlurbText(){
            var blurb_text = $('p.truncate');

            // Iterate over each element
            blurb_text.each(function(){    
                var text = $(this).text();

                // Check text length and perform truncation accordingly
                if(text.length < 150) return;

                $(this).html(text.slice(0,150) + '<span>... </span><a id="details_url" href="#" class="read-more">Read more</a>' + '<span style="display:none;">'+ text.slice(150,text.length) + ' <a href="#" class="read-less">Read less</a></span>');
            }); 

            // Define on-click action for Read more
            $('a.read-more', blurb_text).click(function(event){
                event.preventDefault();
                $(this).hide().prev().hide();
                $(this).next().show();        
            });

            // Define on-click action for Read less
            $('a.read-less', blurb_text).click(function(event){
                event.preventDefault();
                $(this).parent().hide().prev().show().prev().show();   
            });
        }

        // Function to get all Pins from DB based on pagination
        function getPinListFunction(pageParameter){
            $.ajax({
                url: "http://localhost/server_processing_getpinlist.php?page_number=" + pageParameter,
                type: "GET",
                dataType: "jsonp"
                })
                .done(function( data ) {
                    // Storing the count of the records in reponse
                    var recordsCount = data["data"].length;

                    // Loop over count and dynamically render the pins on the html page
                    for ( var i=0; i<recordsCount; i++ ) {

                        // Dynamically add custom div
                        $( "#pinholder" ).append( '<div id="pin" class="col-md-3 col-sm-6 hero-feature"><div class="thumbnail"><img id="thumbnail_url'+ idTracker +'" src="http://placehold.it/800x500" style="border:1px solid grey" alt=""><div class="caption"><h5 id="title'+ idTracker +'" style="text-align:left" >Title:</h5><h5 id="author'+ idTracker +'" style="text-align:left">Author:</h5><p id="blurb'+ idTracker +'" class="truncate" style="text-align:left">Description:</p><h></h><hr style="border-color:#9d9d9d"></div></div></div>' );

                        // Set value on the above div's fields dynamically
                        $("#title" + idTracker).text('Title: ' +data["data"][i]["title"]);
                        $("#author" + idTracker).text('Author: ' +data["data"][i]["author"]);
                        $("#blurb" + idTracker).text('Description: ' +data["data"][i]["blurb"]);
                        $("#thumbnail_url" + idTracker).attr("src", data["data"][i]["thumbnail_url"]);
                        idTracker++;
                     };

                     // Calling function to truncate blurb text
                     truncateBlurbText();

                 })
                 .fail(function() {
                    alert( "Error Occured..." );
                });
        }

        $(document).ready(function () {
            // Variables defined for pagination and grouping
            var pageParameter = 0;
            var totalPages = 2; // This means 0,1,2 - total 3 pages. Harcoded for now, can be extended to get this details from DB.
            
            // Calling the get pins function on page load
            getPinListFunction(pageParameter);
            pageParameter++;

            // Function to detect page scroll and load pins
            $(window).scroll(function() { 
                if($(window).scrollTop() + $(window).height() == $(document).height())  
                {
                    if(pageParameter <= totalPages)
                    {   
                        getPinListFunction(pageParameter);
                        pageParameter ++;
                    
                    }
                }
            });

        });