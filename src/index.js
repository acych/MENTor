
  const carousel = document.querySelector(".carousel-inner");
for (myActivity in ourActivities){
  var carouselItem = document.createElement("div");

  carouselItem.classList.add("carousel-item");
  if(myActivity=="activity1"){
    carouselItem.classList.add("active");
  }

  var activity = document.createElement("DIV");
  activity.classList.add("row");
  var header1 = document.createElement("H1");
  header1.classList.add("menu-title");
  header1.classList.add("d-md-none");
  header1.innerHTML = "<strong>OUR ACTIVITIES</strong>";
  activity.appendChild(header1);

  var activityInfo = document.createElement("DIV");
  activityInfo.classList.add("col-md-6");
  activityInfo.classList.add("activities");

  activityInfo.innerHTML ='<h1 class="menu-title col-md-6 d-none d-md-block"><strong>OUR ACTIVITIES</strong></h1><br><p>JOIN <span class="Truetypewriter"> our</span></p><p>' + ourActivities[myActivity]["title"] +'</p><p><span class="Truetypewriter">in </span>' + ourActivities[myActivity]["location"] + '</p><br><p>' + ourActivities[myActivity]["date"] + '</p><button class="btn my-btn" name="button" style="margin-bottom:15%">Details</button>'
  activity.appendChild(activityInfo);


  var picture = document.createElement("DIV");
  picture.classList.add("col-md-6");
  picture.classList.add("d-none");
  picture.classList.add("d-md-block");
  picture.innerHTML = '<img class="right-image hidden-sm" src="./images/' + ourActivities[myActivity]["img"] + '" alt="man-with-mist">'
  activity.appendChild(picture);

  carouselItem.appendChild(activity);
  carousel.appendChild(carouselItem);
}
