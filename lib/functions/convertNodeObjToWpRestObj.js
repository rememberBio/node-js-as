

const convertNodeObjToWpRestObj = (type,object) => {
    let newObj = object;
    switch (type) {
        case "parents":
            newObj = [];
            object.forEach(parent => {
                if(parent)
                    newObj.push({"name_of_parent": parent.name,"link": parent.rememberPageLink}); 
            });
            break;
        case "spouse":
            newObj = { "hasband_or_wife":object.kind,"link_to_the_spouses_remember_page":object.rememberPageLink };
            if(object.kind == "wife") {
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
                if(time.year || time.shortDescription) {
                    let convertedYear = '';
                    if(time.year)
                        convertedYear = new Date('1.1.' + time.year);
                    newObj.push({"year": convertedYear,"short_description": time.shortDescription}); 
                }
            });
            break;
        case "stories":
            newObj = [];
            object.forEach(story => {
                newObj.push({"telling_image_url": story.image,"telling_name": story.witnessName,"text":story.content,"date":story.date}); 
            });
            break;
        case "gallery":
            newObj = [];
            object.forEach(item => {
                let albums = [];
                item.albumes.forEach(album => {
                    let videos = [];
                    let images = [];
                    album.videos.forEach(video => {
                        if(video)
                            videos.push({
                                "video":video
                            });
                    });
                    album.images.forEach(image => {
                        if(image)
                            images.push({
                                "url":image
                            });
                    });
                    albums.push({
                        "name_of_album": album.name,
                        "start_year_of_album":album.startYear,
                        "end_year_of_album":album.endYear,
                        "photos_urls":images,
                        "videos_urls":videos
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
                    "img_url": place.image,
                    "text":place.textAbout,
                    "desc":place.shortDesc,
                    "address":place.address
                }); 
            });
            break;
        case "grave-address":
            newObj = {
                "lat": object.location.lat,
                'lng': object.location.lng,
                'address': object.name,
                'city':object.city,
                'street_number': object.streetNumber,
                'street_name':object.streetName,
                'country': object.country
            };
            break;
        case "grave-images":
            newObj = [];
            object.forEach(image => {
                if(image)
                    newObj.push({
                        "img":image
                    });
            });
            break;
        default:
            break;
    }
    return newObj;
}

module.exports = convertNodeObjToWpRestObj;