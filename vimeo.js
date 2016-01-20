//vimeo API 
require('dotenv').load();

var Vimeo = require('vimeo').Vimeo; 
var lib = new Vimeo(process.env.VIMEO_IDENTIFIER, process.env.VIMEO_SECRET, process.env.VIMEO_TOKEN);

var videos = {};

videos.staffpick = function() {

  lib.request(/*options*/{
        // This is the path for the videos contained within the staff picks channels
        path : '/channels/staffpicks/videos',
        // This adds the parameters to request page two, and 10 items per page
        query : {
            sort: 'date',
            direction: 'desc',
            per_page: 20
        }
    }, /*callback*/function (error, body, status_code, headers) {
        if (error) {
            console.log(error);
        } else {
            console.log(body.data[0].tags);
        }
    })
};

videos.category = function() {
    lib.request({
        path: '/categories/documentary/videos',
        query: {
            page: 1,
            per_page: 5
        }
    }, function(error, body, status_code, headers) {
            if (error) {
                console.log(error);
            } else {
                console.log(body.data[0]);
            }
    })
}
videos.category();
module.exports = videos;