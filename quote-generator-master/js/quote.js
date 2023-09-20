window.addEventListener('load', () => {
    $(document).ready(function () {
        const URL = 'https://quote-garden.onrender.com/api/v3/quotes';
        let randomQuote = Math.ceil(Math.random() * 9);
        let randomPage = Math.ceil(Math.random() * 7268);
        loadQuote(URL, randomPage, randomQuote);

        $('.random p').click(function (e) {
            let newrandomQuote = Math.ceil(Math.random() * 9);
            let newrandomPage = Math.ceil(Math.random() * 7268);
            loadQuote(URL, newrandomPage, newrandomQuote); 
            $('.container-author').empty();
            $('.author').empty();
        });

        $('.container-author').click(function (e) { 
            e.preventDefault();
            let author = $('.author-name').text();
            $('.container').empty();
            $('.container-author').empty();
            quotesbyAuthor(author, URL, randomQuote);
            $('author-notes h1').append(author);
        });

        function loadQuote(URL, randomPage, randomQuote) {
            $('.container').empty();
    
            fetch(`${URL}?page=${randomPage}`)
            .then(data => data.json())
            .then(quotes =>{
                console.log(quotes)
                let quote = `<div class="container-text"><p>${quotes.data[randomQuote].quoteText}</p></div>`;
                $('.container').append(quote);
                createNote();
                $('.author-name').append(quotes.data[randomQuote].quoteAuthor)
                $('.author-genre').append(quotes.data[randomQuote].quoteGenre)
            });
        }

        function createNote(){
            let authorNotes = 
            `
                <div class="container-author-text">
                    <p class="author-name"></p>
                    <br>
                    <p class="goTo"><i class="fa-solid fa-arrow-right-long"></i></p>
                    <p class="author-genre"></p>
                </div>
            `

            $('.container-author').append(authorNotes);
        }

        function quotesbyAuthor(author, URL, randomQuote){
            
            fetch(`${URL}?author=${author}`)
            .then(data => data.json())
            .then(quotes =>{
                let i = 0;
                let name = `<div class="author-notes">
                <h1>${author}</h1>
                    <div>`
                $('.author').append(name)
                while(i < quotes.totalQuotes){
                    if(quotes.data[randomQuote].quoteAuthor === author){
                        let quotesbyAuthorText = 
                        `
                    <div class="author-notes">
                        <h1></h1>
                        <div class="author-notes-quote">
                            <p>${quotes.data[i].quoteText}</p>
                        </div>
                    </div>
                    `;
                        i++
                        $('.author').append(quotesbyAuthorText);
                    }
                }
            });
        }
    });
}); 