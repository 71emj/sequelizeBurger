(function($) {
   console.log("loaded");
   const newBurgerBtn = document.getElementById("burger_new"),
      eatBurgerBtns = document.querySelectorAll("ul.burger_btn")[0];

   console.log(newBurgerBtn);

   function validate(data) {
      data = data.trim();

      if (!data || !!data.match(/[^a-z\s]/gi)) {
         return false;
      }

      const temp = data.split(" ").map((elem) => {
         return elem.replace(/[a-z]/i, elem[0].toUpperCase());
      }),
      burgerName = temp.join(" ");
      return burgerName;
   }


   newBurgerBtn.onclick = function(event) {
      event.preventDefault();
      const burgerName = validate($("#burger_name").val());

      if (!burgerName) {
         return;
      }

      $.ajax({
         url: "/eat-da-burger",
         method: "POST",
         data: { name: burgerName },
         traditional: true
      }).done(function(response) {
         console.log(response);
         location.reload();
      });
   }

   eatBurgerBtns.addEventListener("click", function(event) {

      const evntTarget = $(event.target);
      if (evntTarget.is("button")) {
         event.preventDefault();
         const burgerName = evntTarget.val();

         $.ajax({
            url: "/eat-da-burger/" + evntTarget.data("id"),
            method: "PUT",
            traditional: true
         }).done(function(response) {
            console.log(response);
            location.reload();
         });
      }
   });
}(jQuery));