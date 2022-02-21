import moment from "moment";
import _ from "lodash";

const albums = [
    {
        id: 1,
        title: "Fear of a Blank Planet",
        artist_id: 11,
        release_type: "LP",
        image: "https://porcupinetree.com/wp-content/uploads/2021/01/fearofablankplanet.jpg",
        release_date: "2007-01-01",
        overall_score: 90,
        spotify_url: "https://play.spotify.com/album/59J51uy6r6QcYe7cX0Fzz6",
        album_of_the_year: 1,
    },
    {
        id: 2,
        title: "OK Computer",
        artist_id: 4,
        release_type: "LP",
        image: "https://i.pinimg.com/originals/dc/ac/3b/dcac3bdbc9e460263bade6064a7dfcfe.jpg",
        overall_score: 99,
        release_date: "1997-05-28",
        links: [
            { service: "spotify", url: "https://play.spotify.com/album/6dVIqQ8qmQ5GBnJ9shOYGE" },
            { service: "tidal", url: "https://tidal.com/browse/album/58990510" },
            { service: "amazonMusic", url: "https://music.amazon.com/albums/B01DPRPZV8?do=play&ref=dm_ws_dp_ald_bb_phfa_xx_xx_xx" },
            { service: "appleMusic", url: "https://music.apple.com/us/album/ok-computer/1097861387" },
        ],
        details: [{ label: "Genres", detail: "Alternative Rock, Art Rock" }],
        tracks: [
            { position: 1, title: "Airbag", duration: "4:47" },
            { position: 2, title: "Paranoid Android", duration: "6:27" },
            { position: 3, title: "Subterranean Homesick Alien", duration: "4:27" },
            { position: 4, title: "Exit Music (For A Film)", duration: "4:27" },
            { position: 5, title: "Let Down", duration: "4:59" },
            { position: 6, title: "Karma Police", duration: "4:24" },
            { position: 7, title: "Fitter Happier", duration: "1:57" },
            { position: 8, title: "Electionnering", duration: "3:50" },
            { position: 9, title: "Climbing Up The Wall", duration: "4:45" },
            { position: 10, title: "No Surprises", duration: "3:49" },
            { position: 11, title: "Lucky", duration: "4:18" },
            { position: 12, title: "The Tourist", duration: "5:26" },
        ],
        album_of_the_year: 2,
    },
    {
        id: 3,
        title: "Billy Talent II",
        artist_id: 2,
        release_type: "LP",
        image: "https://m.media-amazon.com/images/I/81mUsoAkJOL._SL1443_.jpg",
        release_date: "2006-06-23",
        overall_score: 56,
        spotify_url: "https://play.spotify.com/album/0cTOvcvrbNiaiv4WXEUHzT",
        album_of_the_year: 4,
    },
    {
        id: 4,
        title: "Blackstar",
        artist_id: 6,
        release_type: "LP",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/David_Bowie_%E2%80%93_Blackstar.jpg",
        release_date: "2016-01-08",
        overall_score: 87,
        spotify_url: "https://play.spotify.com/album/2w1YJXWMIco6EBf0CovvVN",
        album_of_the_year: 3,
    },
    {
        id: 5,
        title: "Kill 'Em All",
        artist_id: 10,
        release_type: "LP",
        image: "https://www.metallica.com/on/demandware.static/-/Sites-Metallica-Library/default/dw6503eaa3/images/releases/20150807_213844_7549_752889.jpeg",
        release_date: "1983-07-24",
        overall_score: 32,
        spotify_url: "https://play.spotify.com/album/1aGapZGHBovnmhwqVNI6JZ",
        album_of_the_year: 5,
    },
    {
        id: 6,
        title: "Wish You Were Here",
        artist_id: 9,
        release_type: "LP",
        image: "https://hips.hearstapps.com/esq.h-cdn.co/assets/15/24/1433876556-lp-cover-pink-floyd-wish-you-were-here.jpg",
        release_date: "1975-09-12",
        overall_score: 69,
        spotify_url: "https://play.spotify.com/album/6uvBKDGlJAYLH5Vy6RQVsc",
    },
    {
        id: 7,
        title: "McCartney",
        artist_id: 8,
        release_type: "LP",
        image: "/images/coverArt/mccartney_paul-mccartney.jpg",
        release_date: "1970-04-17",
        overall_score: 12,
        spotify_url: "https://play.spotify.com/album/24lX0YfUlQfqb2T2GioLji",
    },
    {
        id: 8,
        title: "HEY WHAT",
        artist_id: 7,
        release_type: "LP",
        image: "https://voiceshop.pl/userdata/public/gfx/30894/Low.jpg",
        release_date: "2021-09-10",
        overall_score: 70,
        spotify_url: "https://play.spotify.com/album/6S6jg2LuEwGdo9iYMSwCBS",
    },
    {
        id: 9,
        title: "Ants From Up There",
        artist_id: 3,
        release_type: "LP",
        image: "/images/coverArt/ants-from-up-there_black-country,-new-road.jpg",
        release_date: "2022-02-04",
        overall_score: 90,
        links: [
            { service: "spotify", url: "https://play.spotify.com/album/21xp7NdU1ajmO1CX0w2Egd" },
            { service: "tidal", url: "https://listen.tidal.com/album/201105433" },
            {
                service: "amazonMusic",
                url: "https://music.amazon.com/albums/B09JCK9L12?marketplaceId=A3K6Y4MI8GDYMT&musicTerritory=PL&ref=dm_sh_mUgF0vPMiV0n9WLOmzc8ROXfs",
            },
            { service: "appleMusic", url: "https://music.apple.com/us/album/ants-from-up-there/1586070259" },
        ],
        details: [{ label: "Genres", detail: "Art Rock, Post-Rock, Chamber Pop" }],
        tracks: [
            { position: 1, title: "Intro", duration: "0:57" },
            { position: 2, title: "Chaos Space Marine", duration: "3:36" },
            { position: 3, title: "Concorde", duration: "6:03" },
            { position: 4, title: "Bread Song", duration: "6:21" },
            { position: 5, title: "Good Will Hunting", duration: "4:57" },
            { position: 6, title: "Halden", duration: "5:05" },
            { position: 7, title: "Mark's Theme", duration: "2:47" },
            { position: 8, title: "The Place Where He Inserted The Blade", duration: "7:13" },
            { position: 9, title: "Snow Gloves", duration: "9:13" },
            { position: 10, title: "Basketball Shoes", duration: "12:37" },
        ],
    },
    {
        id: 10,
        title: "For the first time",
        artist_id: 3,
        release_type: "LP",
        image: "https://soundrive.pl/assets/front/images/content/W20eChmhohWUF6IeCRNlH1IB18f5SxAAOzaWxJX1WBKv6bx2NsLaIovN2ocf_a1090225129-10jpg.jpg",
        release_date: "2021-02-05",
        overall_score: 100,
        links: [
            { service: "spotify", url: "https://play.spotify.com/album/2PfgptDcfJTFtoZIS3AukX" },
            { service: "tidal", url: "https://tidal.com/browse/artist/17665879" },
            { service: "amazonMusic", url: "https://music.amazon.com/albums/B08M9PM39M?ref=dm_sh_7731-3bd5-f623-09f6-d5136" },
            { service: "appleMusic", url: "https://music.apple.com/gb/artist/black-country-new-road/1449884900" },
        ],
        details: [{ label: "Genres", detail: "Art Rock, Post-Rock, Chamber Pop" }],
        tracks: [
            { position: 1, title: "Instrumental", duration: "5:27" },
            { position: 2, title: "Athens, France", duration: "6:22" },
            { position: 3, title: "Science Fair", duration: "6:20" },
            { position: 4, title: "Sunglasses", duration: "9:50" },
            { position: 5, title: "Track X", duration: "4:44" },
            { position: 6, title: "Opus", duration: "8:01" },
        ],
    },
    {
        id: 11,
        title: "Blunderbuss",
        artist_id: 1,
        release_type: "LP",
        image: "https://m.media-amazon.com/images/I/71lpRSBjPGL._SL1500_.jpg",
        release_date: "2012-04-20",
        overall_score: 70,
    },
    {
        id: 12,
        title: "Lazaretto",
        artist_id: 1,
        release_type: "LP",
        image: "https://m.media-amazon.com/images/I/91iWlQHPjHL._AC_SL1500_.jpg",
        release_date: "2014-06-10",
        overall_score: 80,
    },
    {
        id: 13,
        title: "Boarding House Reach",
        artist_id: 1,
        release_type: "LP",
        image: "https://m.media-amazon.com/images/I/714t5kc2v+L.jpg",
        release_date: "2018-03-23",
        overall_score: 65,
    },
    {
        id: 14,
        title: "Fear of the Dawn",
        artist_id: "1",
        release_type: "LP",
        image: "https://static.asfaltshop.pl/uploads2/photos/original/2021/11/15/20211115035434_TMR752C_front.jpg",
        release_date: "2022-04-08",
        overall_score: null,
    },
    {
        id: 15,
        title: "Entering Heaven Alive",
        artist_id: 1,
        release_type: "LP",
        image: "http://cdn.shopify.com/s/files/1/0441/1349/4174/products/Image_20211110_144600.jpg?v=1636577517",
        release_date: "2022-07-22",
        overall_score: null,
    },
    {
        id: 16,
        title: "Taking Me Back",
        artist_id: 1,
        release_type: "Single",
        image: "https://i.scdn.co/image/ab67616d0000b2735f3793cb6bdd0b6ba418165c",
        release_date: "2021-10-18",
        overall_score: 70,
    },
    {
        id: 17,
        title: "Love Is Selfish",
        artist_id: 1,
        release_type: "Single",
        image: "https://images.genius.com/380639c9fa2089af09db72693802d6b3.1000x1000x1.jpg",
        release_date: "2022-01-14",
        overall_score: 60,
    },
    {
        id: 18,
        title: "Over and Over and Over",
        artist_id: 1,
        release_type: "Single",
        image: "https://images.genius.com/10247d94b8a21d0eb90874b674ef78bb.1000x1000x1.jpg",
        release_date: "2018-03-01",
        overall_score: 90,
    },
    {
        id: 19,
        title: "Live at the Masonic Temple",
        artist_id: 1,
        release_type: "Live",
        image: "https://creative-commission.com/sites/default/files/styles/square_original_/public/media/img/2021/09/img_17_360933_f576fb6e.png?itok=Fl9X7ysA",
        release_date: "2021-03-10",
        overall_score: 75,
    },
];

export const artists = [
    {
        id: 1,
        name: "Jack White",
        genres: ["Blues Rock", "Garage Rock"],
        average_score: 76,
        links: [
            { service: "web", url: "https://jackwhiteiii.com/" },
            { service: "twitter", url: "https://twitter.com/thirdmanrecords" },
            { service: "instagram", url: "https://www.instagram.com/thirdmanrecords/" },
            { service: "youtube", url: "https://www.youtube.com/user/JackWhiteVEVO" },
            { service: "spotify", url: "https://open.spotify.com/artist/4FZ3j1oH43e7cukCALsCwf?si=YhDm9q0aQqSkGSn1noU1yQ" },
        ],
        image: "https://i.scdn.co/image/ab6761610000e5eb1a8b7c92db7199450ed040e6",
        bg_image: "/images/artistsBackground/jack-white.jpg",
    },
    {
        id: 2,
        name: "Billy Talent",
        genres: ["Alternative Rock", "Punk Rock"],
        average_score: 64,
        image: "https://i.scdn.co/image/ab6761610000e5eb8258da65d03c3638cb6fe484",
        bg_image: "/images/artistsBackground/billy-talent.jpg",
    },
    {
        id: 3,
        name: "Black Country, New Road",
        genres: ["Art Rock", "Post-Rock"],
        average_score: 90,
        links: [
            { service: "web", url: "https://blackcountrynewroad.com/" },
            { service: "twitter", url: "https://twitter.com/BCNRband?s=20&t=fBQnBiMEyXRrwyvODWQRRg" },
            { service: "instagram", url: "https://www.instagram.com/blackcountrynewroad" },
            { service: "youtube", url: "https://www.youtube.com/channel/UCLTa27Tr5QqHx9G53H8jdFQ" },
            { service: "spotify", url: "https://open.spotify.com/artist/3PP6ghmOlDl2jaKaH0avUN?si=0zuQWlQBQX2g9kBdQS-RIw" },
        ],
        image: "https://i.scdn.co/image/ab6761610000e5ebaebcf58177b9739feadb00b9",
        bg_image: "/images/artistsBackground/black-country-new-road.jpg",
    },
    {
        id: 4,
        name: "Radiohead",
        average_score: 84,
        image: "https://i.pinimg.com/originals/2c/59/83/2c598311e29b2abd70a31ee94efe186e.jpg",
        bg_image: "/images/artistsBackground/radiohead.jpg",
    },
    { id: 5, name: "Leprous", average_score: 74, image: "https://i.scdn.co/image/ab6761610000e5eb1039c96a8100bdeb579126af" },
    {
        id: 6,
        name: "David Bowie",
        average_score: 79,
        image: "https://i.scdn.co/image/ab6761610000e5ebb78f77c5583ae99472dd4a49",
        bg_image: "/images/artistsBackground/david-bowie.jpg",
    },
    { id: 7, name: "Low", average_score: 70, image: "https://i.scdn.co/image/ab6761610000e5eb4aaac870e3a8f1a8e5529dff" },
    { id: 8, name: "Paul McCartney", average_score: 68, image: "https://i.scdn.co/image/ab6761610000e5eb03bf2fe26e397122faa3d323" },
    { id: 9, name: "Pink Floyd", average_score: 70, image: "https://i.scdn.co/image/d011c95081cd9a329e506abd7ded47535d524a07" },
    { id: 10, name: "Metallica", average_score: 71, image: "https://i.scdn.co/image/ab6761610000e5eb8101d13bdd630b0889acd2fd" },
    { id: 11, name: "Porcupine Tree", average_score: 73, image: "https://i.scdn.co/image/ab6761610000e5ebc4f72407be5d96db73982400" },
];

export const users = [
    { id: 1, username: "BigSchnosby", profile_pic: "/images/userAvatars/BigSchnosby.jpg", bg_image_artist_id: 4 },
    {
        id: 2,
        username: "Christopher Pantsless",
        profile_pic: "/images/userAvatars/Christopher Pantsless.jpg",
        bg_image_artist_id: 4,
        followers_count: 100,
        ratings_count: 520,
        reviews_count: 50,
        links: [
            { service: "twitter", url: "https://twitter.com/dziwnykamil" },
            { service: "spotify", url: "https://open.spotify.com/user/11142835209?si=ac5bcee35fff4f93" },
            { service: "lastFm", url: "https://www.last.fm/pl/user/Akasiek" },
        ],
        about_text: "Book-o-maniac with big love to weird, aggressive music and Beatles. Also a supporter of everything related to computers.",
    },
    { id: 3, username: "Titter", profile_pic: "/images/userAvatars/Titter.jpg", bg_image_artist_id: 4 },
    { id: 4, username: "Recydywista", profile_pic: "/images/userAvatars/Recydywista.jpg", bg_image_artist_id: 4 },
    { id: 5, username: "Akasior999", profile_pic: "/images/userAvatars/Akasior999.jpg", bg_image_artist_id: 4 },
    { id: 6, username: "Mark Cukiereczek", profile_pic: "/images/userAvatars/Mark Cukiereczek.jpg", bg_image_artist_id: 4 },
    { id: 7, username: "Bill Brama Wjazdowa", profile_pic: "/images/userAvatars/Bill Brama Wjazdowa.jpg", bg_image_artist_id: 4 },
    { id: 8, username: "Galfryd Bigos", profile_pic: "/images/userAvatars/Galfryd Bigos.jpg", bg_image_artist_id: 4 },
    { id: 9, username: "Pietr", profile_pic: "/images/userAvatars/Pietr.jpg", bg_image_artist_id: 4 },
    { id: 10, username: "MarsLover69PL", profile_pic: "/images/userAvatars/MarsLover69PL.jpg", bg_image_artist_id: 4 },
    { id: 11, username: "Tomek z Radioglowych", profile_pic: "/images/userAvatars/Tomek z Radioglowych.jpg", bg_image_artist_id: 4 },
    { id: 12, username: "janekLenno", profile_pic: "/images/userAvatars/janekLenno.jpg", bg_image_artist_id: 4 },
];

export const reviews = [
    {
        id: 1,
        created_at: "2020-01-12 16:14:59",
        album_id: 2,
        user_id: 1,
        rating: 100,
        review_text: "I love this album. It was recommened to me by my friend Peter December.",
        likes: 25,
    },
    {
        id: 2,
        created_at: "2020-01-12 23:21:22",
        album_id: 2,
        user_id: 2,
        rating: 60,
        review_text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus dui, pretium id laoreet laoreet, tempus vel arcu. Aliquam ultrices neque non dui elementum luctus. Aenean sed libero et velit pulvinar porttitor. Sed facilisis gravida condimentum. Duis id dui sed velit convallis ultrices. Aenean hendrerit ornare augue, eget euismod lorem imperdiet id. Vivamus at sem faucibus tortor cursus tincidunt at non velit. Phasellus magna nulla, mattis efficitur urna ut, mollis blandit metus. Pellentesque facilisis mauris eleifend urna dapibus gravida. Donec ultricies lacinia odio bibendum lacinia. Aliquam est odio, suscipit vel dui a, rutrum interdum erat. Aliquam euismod luctus mattis. Nunc mattis aliquam placerat. Maecenas malesuada vehicula consequat. Pellentesque mollis nibh ex, vel facilisis leo finibus ut.",
        likes: 0,
    },
    {
        id: 3,
        created_at: "2020-03-03 21:21:55",
        album_id: 2,
        user_id: 3,
        rating: 15,
        review_text: "Ino, fajne w ciul!",
        likes: 122,
    },
    {
        id: 4,
        created_at: "2020-03-29 10:33:02",
        album_id: 2,
        user_id: 4,
        rating: 77,
        review_text: "yes! my fajworit! no surpirises? more like weź się odpierdol",
        likes: 23,
    },
    {
        id: 5,
        created_at: "2020-04-18 12:34:13",
        album_id: 2,
        user_id: 5,
        rating: 95,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus dui, pretium id laoreet laoreet",
        likes: 87,
    },
    {
        id: 6,
        created_at: "2020-12-26 06:13:18",
        album_id: 2,
        user_id: 6,
        rating: 49,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus dui, pretium id laoreet laoreet",
        likes: 5,
    },
    {
        id: 7,
        created_at: "2022-01-05 09:20:05",
        album_id: 2,
        user_id: 7,
        rating: 66,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus dui, pretium id laoreet laoreet",
        likes: 0,
    },
    {
        id: 8,
        created_at: "2022-01-14 18:49:04",
        album_id: 2,
        user_id: 8,
        rating: 83,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus dui, pretium id laoreet laoreet",
        likes: 8,
    },
    {
        id: 9,
        created_at: "2022-01-23 11:19:16",
        album_id: 2,
        user_id: 9,
        rating: 65,
        review_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam risus dui, pretium id laoreet laoreet",
        likes: 3,
    },
    { id: 10, created_at: "2021-02-20 21:52:45", album_id: 2, user_id: 10, rating: 33, review_text: null, likes: 0 },
    { id: 11, created_at: "2021-05-06 08:38:49", album_id: 2, user_id: 11, rating: 21, review_text: null, likes: 12 },
    { id: 12, created_at: "2021-06-28 16:27:05", album_id: 2, user_id: 12, rating: 71, review_text: null, likes: 2 },
    {
        id: 13,
        created_at: "2021-08-08 06:43:52",
        album_id: 9,
        user_id: 7,
        rating: 36,
        review_text: "oh my gush! What A PIECE OF SHIT",
        likes: 1,
    },
    { id: 14, created_at: "2021-09-19 00:59:10", album_id: 5, user_id: 11, rating: 61, review_text: "holy moly!", likes: 12 },
    { id: 15, created_at: "2021-12-11 22:34:27", album_id: 10, user_id: 2, rating: 100, review_text: "That's so beautiful 😤😤😤", likes: 81 },
    {
        id: 16,
        created_at: "2021-12-12 22:34:27",
        album_id: 9,
        user_id: 2,
        rating: 100,
        review_text: "If 'For the first time' is Shrek then this one is Shrek 2. It's bigger, bolder and even better!",
        likes: 13,
    },
    { id: 17, created_at: "2022-02-13 22:34:27", album_id: 11, user_id: 2, rating: 70, review_text: "OK, OK", likes: 4 },
    { id: 18, created_at: "2022-02-14 22:34:27", album_id: 1, user_id: 2, rating: 33, review_text: null, likes: 8 },
    { id: 19, created_at: "2022-02-15 22:34:27", album_id: 3, user_id: 2, rating: 50, review_text: null, likes: 6 },
    { id: 20, created_at: "2022-02-16 22:34:27", album_id: 4, user_id: 2, rating: 90, review_text: "BOWIE <3", likes: 0 },
    { id: 21, created_at: "2022-02-17 22:34:27", album_id: 5, user_id: 2, rating: 40, review_text: "METALLICA </3", likes: 1 },
    { id: 22, created_at: "2022-02-18 22:34:27", album_id: 6, user_id: 2, rating: 20, review_text: "Lol", likes: 9 },
    { id: 23, created_at: "2022-02-19 22:34:27", album_id: 8, user_id: 2, rating: 66, review_text: null, likes: 2 },
    { id: 24, created_at: "2022-02-20 12:34:27", album_id: 7, user_id: 2, rating: 1, review_text: "Grandma music", likes: 3 },
];

export function searchDB(searchQuery) {
    const query = searchQuery.toLowerCase();
    let queryResults = { albums: [], artists: [], users: [] };

    if (query === "") return queryResults;

    queryResults.albums = albums.filter((a) => a.title.toLowerCase().includes(query) || getArtist(a.artist_id).name.toLowerCase().includes(query));

    queryResults.artists = artists.filter((a) => a.name.toLowerCase().includes(query));

    queryResults.users = users.filter((u) => u.username.toLowerCase().includes(query));

    return queryResults;
}

export function getArtists() {
    return artists;
}

export function getArtist(id) {
    return artists.find((a) => a.id == id);
}

export function getAllAlbums() {
    return albums;
}

export function getAlbums() {
    return albums.filter((a) => moment(a.release_date).diff(moment()) < 0 && a.release_type === "LP");
}

export function getArtistAlbums(artist_id) {
    return albums.filter((a) => a.artist_id == artist_id);
}

export function getAlbum(id) {
    return albums.find((a) => a.id == id);
}

export function getUser(id) {
    return users.find((u) => u.id == id);
}
export function getUserByUsername(username) {
    return users.find((u) => u.username === username);
}

export function getAlbumOfTheYear() {
    const newAlbums = [
        ...albums
            .filter((a) => a.album_of_the_year)
            .sort((a, b) => {
                return a.album_of_the_year - b.album_of_the_year;
            }),
    ];

    newAlbums.forEach((album) => {
        album.title = truncate(album.title, 30);
    });

    return newAlbums;
}

function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export function getNewReleases() {
    return _.orderBy(
        albums,
        (o) => {
            return moment(o.release_date);
        },
        ["desc"]
    ).filter((a) => moment(a.release_date).diff(moment()) < 0 && a.release_type === "LP");
}

export function getLatestSingles() {
    return _.orderBy(
        albums,
        (o) => {
            return moment(o.release_date);
        },
        ["desc"]
    ).filter((a) => moment(a.release_date).diff(moment()) < 0 && a.release_type === "Single");
}

export function getReviews(album_id) {
    return reviews.filter((r) => r.album_id == album_id && r.review_text !== null);
}

export function getRatings(album_id) {
    return reviews.filter((r) => r.album_id == album_id && r.review_text === null);
}

export function getLatestReviews() {
    return _.orderBy(
        reviews,
        (o) => {
            return moment(o.created_at);
        },
        ["desc"]
    ).filter((r) => r.review_text !== null);
}

export function getLatestArtistReviews(artist_id) {
    return _.orderBy(
        reviews,
        (o) => {
            return moment(o.created_at);
        },
        ["desc"]
    ).filter((r) => r.review_text !== null && getArtistAlbums(artist_id).includes(getAlbum(r.album_id)));
}

export function getUsersReviews(id, reviewsOnly = false) {
    if (reviewsOnly === true) {
        return reviews.filter((r) => r.review_text !== null && r.user_id === id);
    }
    return reviews.filter((r) => r.user_id === id);
}

export function getRatingAlbums(reviews) {
    let reviewsAlbums = [];

    reviews.forEach((r) => {
        let album = getAlbum(r.album_id);
        album.user_score = r.rating;
        album.review_date = r.created_at;
        reviewsAlbums.push(album);
    });

    return reviewsAlbums;
}

// export function saveMovie(movie) {
//     let movieInDb = movies.find((m) => m._id === movie._id) || {};
//     movieInDb.name = movie.name;
//     movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
//     movieInDb.numberInStock = movie.numberInStock;
//     movieInDb.dailyRentalRate = movie.dailyRentalRate;

//     if (!movieInDb._id) {
//         movieInDb._id = Date.now();
//         movies.push(movieInDb);
//     }

//     return movieInDb;
// }

// export function deleteMovie(id) {
//     let movieInDb = movies.find((m) => m._id === id);
//     movies.splice(movies.indexOf(movieInDb), 1);
//     return movieInDb;
// }
