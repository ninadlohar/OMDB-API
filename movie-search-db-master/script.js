// jquery code works when button clicked and display info
$(document).ready(() => {
    $('form').submit(e => {
        e.preventDefault();
        info();
    });
});

// pure js code

let pageNo = 1;

// draws info from OMDB API

let info = () => {
    // by default the error is hidden
    $('.searchError').css('display', 'none');
    const title = $('#title').val();
    const year = $('#year').val();
    const id = $('#id').val();
    let url = `http://www.omdbapi.com/?apikey=6f8b9f9b&page=${pageNo}`;
    if (title) {
        url = `${url}&s=${title}`;
    }
    if (id) {
        url = `${url}&i=${id}`;
    }
    if (year) {
        url = `${url}&y=${year}`;
    }
    // if ID and title doesn't match, error will be thrown
    if (!title && !id) {
        $('.searchError').css('display', 'block');
    } else {
        // error gets hidden when actual reply is fetched from API
        $('.searchError').css('display', 'none');
        $.ajax({
            url: url,
            dataType: 'json',
            success: data => {
                $('.output').html('');
                if (!data.Search) {
                    $('.searchError').css('display', 'block');
                } else {
                    data.Search.forEach(movie => {
                        if (movie.Poster === 'N/A') {
                            movie.Poster = 'images/no-image.svg';
                        }
                        $('.output').append(`
        <div class='card col-md-3 col-xs-6 col-sm-4 col-lg-3' onclick="getInfo('${
          movie.imdbID
        }')">
         <div class='${movie.imdbID} movie-img'>
        <img class='poster img-responsive' src=${movie.Poster} alt=${
              movie.Title
            }>
        </div>
        <div class='title'>${movie.Title} </div>
        </div>
          `);
                    });

                }
            },
            error: err => {

                $('.searchError').css('display', 'block');
                setTimeout(() => {
                    $('.searchError').css('display', 'none');
                }, 1000);
            },

        });
    }
};
let getInfo = (id) => {
    let url = `http://www.omdbapi.com/?apikey=6f8b9f9b&i=${id}`;
    $.ajax({
        url: url,
        dataType: 'json',
        success: data => {
            if (data.Poster == 'N/A') {
                data.Poster = 'images/no-image.svg';
            }
            $('.output').html('');
            $('.output').append(`
       <div class="col-md-4 col-sm-4 col-lg-4 col-xs-12">
        <div class="${data.imdbID} card-center-image">
         <img class="poster img-responsive" src=${data.Poster} alt=${
        data.Title
      }>
        </div>
       </div>
        <div class="col-md-8 col-sm-8 col-lg-8 col-xs-12 main-container">
        <div class="short-info">Rating:${
          data.imdbRating
        }
        <div class="short-info">${data.Title} </div>
        <div class="short-info">${data.Year}</div>
        <div class="short-info"> ${data.Genre}</div>
       

       </div>
       <div class="summary-div">
         <div class="summary-detail">Summary: ${data.Plot}</div>
        <div class="summary-detail">Language: ${data.Language}</div>
        <div class="summary-detail">Directed By: ${data.Director}</div>
        <div class="summary-detail">Actors: ${data.Actors}</div>
        <div class="summary-detail">Released On: ${data.Released}</div>
        <div class="summary-detail">Runtime: ${data.Runtime}</div>
        <div class="summary-detail">Rated: ${data.Rated}</div>
       </div>
       `);
        },
        error: err => {
            $('.searchError').css('display', 'block');
            setTimeout(() => {
                $('.searchError').css('display', 'none');
            }, 1000);
        },
    });
};
