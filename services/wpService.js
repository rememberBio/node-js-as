
const WPAPI = require('wpapi');
const convertNodeObjToWpRestObj = require('../lib/functions/convertNodeObjToWpRestObj');

var wp = new WPAPI({
    endpoint: 'https://remember.bio/wp-json',
    username: 'i@shal3v.com',
    password: 'QNk7 FpNr sjBB Z6ft V5gt A7oR'
});

wp.rpResource = wp.registerRoute( 'wp/v2', '/remember_page', {
    params: [ 'posts','post' ]
});
wp.rpUpdateResource = wp.registerRoute( 'wp/v2', '/remember_page/(?P<id>)', {
    params: [ 'posts','post' ]
});
const createRememberPage = async (rememberPageItem) => {
    console.log(' ------ Create Wp Remember Page ---------');
    let attrs = rememberPageItem.attributes;
    let response = await wp.rpResource().posts().create({
        //title: rememberPageItem.attributes.name
        title: attrs.name,
        content: '',
        status: 'publish',
        fields: { 
            //main
            'full_name_of_the_deceased': attrs.name,
            'a_few_words_about_the_deceased': attrs.brief,
            'main_image_of_the_deceased': attrs.mainImg,
            //about
            'about_description': attrs.about,
            'about_country': attrs.country,
            'about_parents': convertNodeObjToWpRestObj("parents",attrs.parents),
            'about__-_husband__wife': convertNodeObjToWpRestObj("spouse",attrs.spouse),
            'about_children': convertNodeObjToWpRestObj("children",attrs.children),
            'about_birth_day': attrs.dateOfBirth,
            'about_death_day': attrs.dateOfDeath,
            'about_timeline': convertNodeObjToWpRestObj("timeline",attrs.timeline),
            //stories
            'stories_repeater': convertNodeObjToWpRestObj("stories",attrs.stories),
            //gallery
            'gallery_items': convertNodeObjToWpRestObj("gallery",attrs.gallery.items),
            //places
            'places_list': convertNodeObjToWpRestObj("places",attrs.placesOfCommemoration),
            //the grave
            'the_grave_images_gallery': attrs.grave.images,
            'the_name_of_a_cemetery': attrs.grave.nameOfCemetery,
            'the_grave_in_google_maps': convertNodeObjToWpRestObj("grave",attrs.grave.address),
        },
    });
    //console.log(response);
    console.log(' ------ END Create Wp Remember Page ---------');
    return response;
    
}
const updateRememberPage = async (rememberPageItem) => {
    console.log(' ------ Update Wp Remember Page ---------');
    let attrs = rememberPageItem.attributes;
    let response = await wp.rpUpdateResource().post().id(rememberPageItem.wpPostId).update({
        title: attrs.name,
        content: '',
        status: 'publish',
        fields: { 
            //main
            'full_name_of_the_deceased': attrs.name,
            'a_few_words_about_the_deceased': attrs.brief,
            'main_image_of_the_deceased_url': attrs.mainImg,
            //about
            'about_description': attrs.about,
            'about_country': attrs.country,
            'about_parents': convertNodeObjToWpRestObj("parents",attrs.parents),
            'about__-_husband__wife': convertNodeObjToWpRestObj("spouse",attrs.spouse),
            'about_children': convertNodeObjToWpRestObj("children",attrs.children),
            'about_birth_day': attrs.dateOfBirth,
            'about_death_day': attrs.dateOfDeath,
            'about_timeline': convertNodeObjToWpRestObj("timeline",attrs.timeline),
            //stories
            'stories_repeater': convertNodeObjToWpRestObj("stories",attrs.stories),
            //gallery
            'gallery_items': convertNodeObjToWpRestObj("gallery",attrs.gallery.items),
            //places
            'places_list': convertNodeObjToWpRestObj("places",attrs.placesOfCommemoration),
            //the grave
            'the_grave_images_gallery_urls': convertNodeObjToWpRestObj('grave-images',attrs.grave.images),
            'the_name_of_a_cemetery': attrs.grave.nameOfCemetery,
            'the_grave_in_google_maps': convertNodeObjToWpRestObj("grave-address",attrs.grave.address),
        },
    });
    //console.log(response);
    console.log(' ------ Update Wp Remember Page ---------');
    return response;
}

/**
 * {
  {
  id: 1459,
  date: '2022-04-24T08:00:52',
  date_gmt: '2022-04-24T08:00:52',
  guid: {
    rendered: 'https://remember.bio/remember_pages/try-from-node-js/',
    raw: 'https://remember.bio/remember_pages/try-from-node-js/'
  },
  modified: '2022-04-24T08:00:52',
  modified_gmt: '2022-04-24T08:00:52',
  password: '',
  slug: 'try-from-node-js',
  status: 'publish',
  type: 'remmember_page',
  link: 'https://remember.bio/remember_pages/try-from-node-js/',
  title: { raw: 'try from node js', rendered: 'try from node js' },
  comment_status: 'open',
  ping_status: 'closed',
  template: '',
  permalink_template: 'https://remember.bio/remember_pages/%pagename%/',
  generated_slug: 'try-from-node-js',
  yoast_head: '<!-- This site is optimized with the Yoast SEO plugin v18.5 - https://yoast.com/wordpress/plugins/seo/ -->\n' +
    '<title>try from node js - remember.bio</title>\n' +
    '<!-- Admin only notice: this page does not show a meta description because it does not have one, either write it for this page specifically or go into the [SEO - Search Appearance] menu and set up a template. -->\n' +
    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n' +
    '<link rel="canonical" href="https://remember.bio/remember_pages/try-from-node-js/" />\n' +
    '<meta property="og:locale" content="en_US" />\n' +
    '<meta property="og:type" content="article" />\n' +
    '<meta property="og:title" content="try from node js - remember.bio" />\n' +
    '<meta property="og:url" content="https://remember.bio/remember_pages/try-from-node-js/" />\n' +
    '<meta property="og:site_name" content="remember.bio" />\n' +
    '<meta name="twitter:card" content="summary_large_image" />\n' +
    '<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://remember.bio/#website","url":"https://remember.bio/","name":"remember.bio","description":"Just another WordPress site","potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://remember.bio/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"WebPage","@id":"https://remember.bio/remember_pages/try-from-node-js/#webpage","url":"https://remember.bio/remember_pages/try-from-node-js/","name":"try from node js - remember.bio","isPartOf":{"@id":"https://remember.bio/#website"},"datePublished":"2022-04-24T08:00:52+00:00","dateModified":"2022-04-24T08:00:52+00:00","breadcrumb":{"@id":"https://remember.bio/remember_pages/try-from-node-js/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://remember.bio/remember_pages/try-from-node-js/"]}]},{"@type":"BreadcrumbList","@id":"https://remember.bio/remember_pages/try-from-node-js/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://remember.bio/"},{"@type":"ListItem","position":2,"name":"remember pages","item":"https://remember.bio/remember_pages/"},{"@type":"ListItem","position":3,"name":"try from node js"}]}]}</script>\n' +
    '<!-- / Yoast SEO plugin. -->',
  yoast_head_json: {
    title: 'try from node js - remember.bio',
    robots: {
      index: 'index',
      follow: 'follow',
      'max-snippet': 'max-snippet:-1',
      'max-image-preview': 'max-image-preview:large',
      'max-video-preview': 'max-video-preview:-1'
    },
    canonical: 'https://remember.bio/remember_pages/try-from-node-js/',
    og_locale: 'en_US',
    og_type: 'article',
    og_title: 'try from node js - remember.bio',
    og_url: 'https://remember.bio/remember_pages/try-from-node-js/',
    og_site_name: 'remember.bio',
    twitter_card: 'summary_large_image',
    schema: { '@context': 'https://schema.org', '@graph': [Array] }
  },
  _links: {
    self: [ [Object] ],
    collection: [ [Object] ],
    about: [ [Object] ],
    replies: [ [Object] ],
    'wp:attachment': [ [Object] ],
    'wp:action-publish': [ [Object] ],
    'wp:action-unfiltered-html': [ [Object] ],
    curies: [ [Object] ]
  }
}
 */

/**
 * var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU2OWE5YjFlMDQxZGYzNDI5MzA3ZiIsImlhdCI6MTY0OTc2ODUwMH0.CvGtQMzzI9o_PjcW3H6qLpyLiD2aIcylvNdc1P0gJEk";
 var data = {
         attributes: {
             name: "try from node js"
         }
    }
jQuery.ajax({
    url: 'http://localhost:4000/api/rp/createOrUpdate',
    type: 'POST',
    headers: {
      "Authorization": "Bearer " + token
    },
    data: data,
    success: function(result) {
        console.log(result);
    },
    err: function(err) {
        debugger;
    }
});
 */



module.exports = {
    updateRememberPage,
    createRememberPage
}