

const convertNodeObjToWpRestObj = (type,object) => {
    let newObj = object;
    switch (type) {
        case "parents":
            newObj = [];
            object.forEach(parent => {
                newObj.push({"name_of_parent": parent.name,"link": parent.rememberPageLink}); 
            });
            break;
        case "spouse":
            newObj = { "hasband_or_wife":object.type,"link_to_the_spouses_remember_page":object.rememberPageLink };
            if(object.type == "wife") {
                newObj['wifes_name'] = object.name;
            } else {
                newObj['husband_name'] = object.name;
            }
            break;
        case "children":
            newObj = [];
            object.forEach(child => {
                newObj.push({"name_of_child": child.name,"link": child.rememberPageLink}); 
            });
            break;
        case "timeline":
            newObj = [];
            object.forEach(time => {
                newObj.push({"year": time.year,"short_description": time.shortDescription}); 
            });
            break;
        case "stories":
            newObj = [];
            object.forEach(story => {
                newObj.push({"telling_image": story.image,"telling_name": story.witnessName,"text":story.content,"date":story.date}); 
            });
            break;
        case "gallery":
            newObj = [];
            object.forEach(item => {
                let albums = [];
                item.albumes.forEach(album => {
                    let videos = [];
                    album.videos.forEach(video => {
                        videos.push({
                            "video":video
                        });
                    });
                    albums.push({
                        "name_of_album": album.name,
                        "start_year_of_album":album.startYear,
                        "end_year_of_album":album.endYear,
                        "photos":album.images,
                        "videos":videos
                    });
                    
                });
                newObj.push({"start_year": item.startYear,"end_year": item.endYear,"albums":albums}); 

            });
            break;
        case "places":
            newObj = [];
            object.forEach(place => {
                newObj.push({ 
                    "name": place.name,
                    "img": place.image,
                    "text":place.textAbout,
                    "desc":place.shortDesc,
                    "address":place.address
                }); 
            });
            break;
        default:
            break;
    }
    return newObj;
}

module.exports = convertNodeObjToWpRestObj;