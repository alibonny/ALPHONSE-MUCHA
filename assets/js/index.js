(function ($) {
  $.fn.timeline = function () {
      var selectors = {
          id: $(this),
          item: $(this).find(".timeline-item"),
          activeClass: "timeline-item--active",
          img: ".timeline__img"
      };

      // Imposta il primo elemento come attivo
      selectors.item.eq(0).addClass(selectors.activeClass);
      selectors.id.css("background-image", "url(" + selectors.item.first().find(selectors.img).attr("src") + ")");

      var itemLength = selectors.item.length;

      $(window).scroll(function () {
          var pos = $(this).scrollTop(); // Ottieni la posizione dello scroll

          selectors.item.each(function (i) {
              var min = $(this).offset().top - $(window).height() / 2;
              var max = min + $(this).height();
              
              console.log(`Elemento ${i}: min=${min}, max=${max}, pos=${pos}`);

              if (pos >= min && pos <= max) {
                  console.log(`Attivazione elemento ${i}`);
                  selectors.id.css("background-image", "url(" + $(this).find(selectors.img).attr('src') + ")");
                  selectors.item.removeClass(selectors.activeClass);
                  $(this).addClass(selectors.activeClass);
              }
          });
      });
  };
})(jQuery);

// Inizializza la funzione sulla timeline
$(document).ready(function () {
  $("#timeline-1").timeline();
});
