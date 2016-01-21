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
          var videos = body.data
            var staffList = [];
            videos.forEach(function(video) {
                var newVideo = {
                    name: video.name,
                    link: video.uri,
                    embed: video.embed.html,
                    duration: video.duration,
                    privacyEmbed: video.privacy.embed,
                    privacyView: video.privacy.view,
                    plays: video.stats.plays,
                    modified: video.modified_time,
                    created: video.created_time
                }
                staffList.push(newVideo)
            })
        }
    })
};

videos.documentary = function() {
    lib.request({
        path: '/categories/documentary/videos',
        query: {
            page: 1,
            per_page: 20,
            sort: 'plays',
        }
    }, function(error, body, status_code, headers) {
            if (error) {
                console.log(error);
            } else {
                var videos = body.data
                var documentaryList = [];
                videos.forEach(function(video) {
                    var newVideo = {
                        name: video.name,
                        link: video.uri,
                        embed: video.embed.html,
                        duration: video.duration,
                        privacyEmbed: video.privacy.embed,
                        privacyView: video.privacy.view,
                        plays: video.stats.plays,
                        modified: video.modified_time,
                        created: video.created_time

                    }
                    documentaryList.push(newVideo)
                })

                documentaryList.forEach(function(video) {
                    if (video.plays > 10000) {
                        console.log(video);
                    } else {          
                        console.log('no videos over 10000 plays');
                        console.log(video.date);
                        console.log('plays' + video.plays);                     }
                })
                // console.log(documentaryList[Math.floor(Math.random() * documentaryList.length)]);
            }
    })
}
videos.staffpick();




module.exports = videos;