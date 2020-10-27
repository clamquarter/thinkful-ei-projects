$('.thumbnail img').on('click', e => {
    console.log("bruh what");
     $(".hero img").attr("src", $(event.currentTarget).attr("src") );
      
  });
  