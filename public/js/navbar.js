jQuery(document).ready(function($){
	//toggle 3d navigation
	$('.cd-3d-nav-trigger').on('click', function(){
		toggle3dBlock(!$('.cd-header').hasClass('nav-is-visible'));
	});

	//select a new item from the 3d navigation
	$('.cd-3d-nav a').on('click', function(){
		var selected = $(this);
		selected.parent('li').addClass('cd-selected').siblings('li').removeClass('cd-selected');
		updateSelectedNav('close');
	});

	$(window).on('resize', function(){
		window.requestAnimationFrame(updateSelectedNav);
	});

	function toggle3dBlock(addOrRemove) {
		if(typeof(addOrRemove)==='undefined') addOrRemove = true;	
		$('.cd-header').toggleClass('nav-is-visible', addOrRemove);
		$('main').toggleClass('nav-is-visible', addOrRemove);
		$('.cd-3d-nav-container').toggleClass('nav-is-visible', addOrRemove);
	}

	//this function update the .cd-marker position
	function updateSelectedNav(type) {
		var selectedItem = $('.cd-selected'),
			selectedItemPosition = selectedItem.index() + 1, 
			leftPosition = $(".cd-selected").last().offset().left,
			backgroundColor = selectedItem.data('color');
			// console.log('mema',leftPosition);

		$('.cd-marker').removeClassPrefix('color').addClass('color-'+ selectedItemPosition).css({
			'left': leftPosition,
			'visibility':'visible'
		});
		if( type == 'close') {
			$('.cd-marker').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				toggle3dBlock(false);
			});
		}
	}

	$.fn.removeClassPrefix = function(prefix) {
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
  
  $(window).on('scroll',function() {
    // console.log('hihi');
    toggle3dBlock(false);
  });
   $(".cd-header").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function() {
	 // Set selected tab based on page
	 let pathname = window.location.pathname
	 let tabIndex = {
		 '/': 'cd-home-link',
		 '/profile': 'cd-profile-link',
		 '/register': 'cd-register-link',
		 '/login': 'cd-login-link',
		 '/techevents':'cd-events-link',
		 "/litevents":'cd-events-link',
		 "/manevents":'cd-events-link',
		 "/funevents":'cd-events-link',
		 "/flagevents":'cd-events-link',
		 "/workshops":'cd-events-link'

	 }
	 $(`#${tabIndex[pathname]}`).addClass('cd-selected');
	 updateSelectedNav();
   });
});