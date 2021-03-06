jQuery(document).ready(function() {
	$('#channel_scroll_id').change(function() {
		target = $('#' + $('#channel_scroll_id').val());
		if (target.length) {
			var offset = target.offset().top;
			$('html,body').animate({scrollTop: offset}, 1000);
			return false;
		}
		return true;
	});

	$("a[href='#top']").click(function() {
	  $("html, body").animate({ scrollTop: 0 }, 1000);
	  return false;
	});

	$('.di_categories-link').click(showCategories);
	$('.di_status-link').click(showStatus);
	$('.di_query-link').click(showEntryQuery);
	$('.di_full-query-link').click(showFullEntryQuery);
	$('.di_template-query-link').click(showTemplateQuery);

	$('.di_channel-showhide').click(showHideChannels);
	$('.di_template-showhide').click(showHideTemplates);
	$('a.di_collapse-channel').click(hideAllChans);
	$('a.di_expand-channel').click(showAllChans);
	$('a.di_collapse-template').click(hideAllTempl);
	$('a.di_expand-template').click(showAllTempl);

	$('.di_link').addClass('di_hidden');

});

function showCategories() {
	$(this).text($(this).text() == 'Kategorien zeigen +' ? 'Kategorien verbergen -' : 'Kategorien zeigen +');
	$(this).next().slideToggle('fast');
	return false;
}

function showStatus() {
	$(this).text($(this).text() == 'Statuse zeigen +' ? 'Statuse verbergen -' : 'Statuse zeigen +');
	$(this).next().slideToggle('fast');
	return false;
}

function showEntryQuery() {
	$(this).text($(this).text() == 'Einfache Kanaleingabe Abfrage zeigen +' ? 'Einfache Kanaleingabe Abfrage verbergen -' : 'Einfache Kanaleingabe Abfrage zeigen +');
	$(this).next().slideToggle('fast');
	return false;
}

function showFullEntryQuery() {
	$(this).text($(this).text() == 'Vollständig Kanaleingabe Abfrage zeigen +' ? 'Vollständig Kanaleingabe Abfrage verbergen -' : 'Vollständig Kanaleingabe Abfrage zeigen +');
	$(this).next().slideToggle('fast');
	return false;
}

function showTemplateQuery() {
	$(this).text($(this).text() == 'Einfache Schablone zeigen +' ? 'Einfache Schablone verbergen -' : 'Einfache Schablone zeigen +');
	$(this).next().slideToggle('fast');
	return false;
}

function showHideChannels() {
	$(this).text($(this).text() == 'Channel-Details verbergen -' ? 'Channel-Details zeigen +' : 'Channel-Details verbergen -');

	var chan_id = $(this).attr('title');
	var theTbody = ('#' + chan_id);
	$(theTbody).slideToggle('fast',function(){
				//clear out the classes and start fresh
				$(theTbody).removeClass('closed');
				$(theTbody).removeClass('open');

				if ($(this).is(':hidden')) {
					var state = 'closed';
					var di_cookie = 'exp_di_chan_' + chan_id;

					//write the cookie
					$.cookie(di_cookie, state);

					//add the closed class so we know what to do next time
					$(theTbody).addClass('closed');

				} else {

					var state = 'open';
					var di_cookie = 'exp_di_chan_' + chan_id;

					//write the cookie
					$.cookie(di_cookie, state);

			//add the open class so we know what to do next time
					$(theTbody).addClass('open');
				}
			});
	return false;
}

function showHideTemplates() {
	$(this).text($(this).text() == 'Template-Details verbergen -' ? 'Template-Details zeigen +' : 'Template-Details verbergen -');

	var templ_id = $(this).attr('title');
	var theTbody = ('#' + templ_id);
	$(theTbody).slideToggle('fast',function(){
				//clear out the classes and start fresh
				$(theTbody).removeClass('closed');
				$(theTbody).removeClass('open');

				if ($(this).is(':hidden')) {
					var state = 'closed';
					var di_cookie = 'exp_di_templ_' + templ_id;

					//write the cookie
					$.cookie(di_cookie, state);

					//add the closed class so we know what to do next time
					$(theTbody).addClass('closed');

				} else {

					var state = 'open';
					var di_cookie = 'exp_di_templ_' + templ_id;

					//write the cookie
					$.cookie(di_cookie, state);

					//add the open class so we know what to do next time
					$(theTbody).addClass('open');
				}
			});
	return false;
}

function setChannelClass() {

	var cookies = get_cookies_array();
	for(var name in cookies) {
		var pat = 'exp_di_chan_';
		if (name.match(pat)) {
			var classVal = cookies[name];
			name = name.substring(12);
	  	classVal == 'open' ? 'closed' : 'open';
	  	$('#' + name).addClass(classVal);

	  	if (classVal == 'open') {
	  		$('.' + name).text('Channel-Details verbergen -');
	  	}
	  	if (classVal == 'closed') {
	  		$('.' + name).text('Channel-Details zeigen +');
	  	}
	  }
	}
}

function setTemplateClass() {

	var cookies = get_cookies_array();
	for(var name in cookies) {
		var pat = 'exp_di_templ_';
		if (name.match(pat)) {
			var classVal = $.cookie(name);
			name = name.substring(13);
	  	$('#' + name).addClass(classVal);

	  	if (classVal == 'open') {
	  		$('.tmpl_' + name).text('Template-Details verbergen -');
	  	}
	  	if (classVal == 'closed') {
	  		$('.tmpl_' + name).text('Template-Details zeigen +');
	  	}
	  }
	}
}

function get_cookies_array() {
			//read all the cookies to find ours
	    var cookies = { };
	    if (document.cookie && document.cookie != '') {
	        var split = document.cookie.split(';');
	        for (var i = 0; i < split.length; i++) {
	            var name_value = split[i].split("=");
	            name_value[0] = name_value[0].replace(/^ /, '');
	            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
	        }
	    }
	    return cookies;
}

function showAllChans() {
	$.each($('table.mainTable tbody'), function()
    {
    	$(this).removeClass('closed');
			$(this).slideDown('fast');
			$(this).addClass('open');
			var state = 'open';
			var chan_id = $(this).attr('id');
			var di_cookie = 'exp_di_chan_' + chan_id;

			//write the cookie
			$.cookie(di_cookie, state);
	});

	$.each($('a.di_channel-showhide'), function()
	{
		//change the link text
		$(this).text('Channel-Details verbergen -');
	});
}

function hideAllChans() {
	$.each($('table.mainTable tbody'), function()
	{
    	$(this).removeClass('open');
			$(this).slideUp('fast');
			$(this).addClass('closed');
			var state = 'closed';
			var chan_id = $(this).attr('id');
			var di_cookie = 'exp_di_chan_' + chan_id;

			//write the cookie
			$.cookie(di_cookie, state);
	});

	$.each($('a.di_channel-showhide'), function()
	{
		//change the link text
		$(this).text('Channel-Details zeigen +');
	});
}

function showAllTempl() {
	$.each($('table.mainTable'), function()
    {
    	$(this).removeClass('closed');
			$(this).slideDown('fast');
			$(this).addClass('open');
			var state = 'open';
			var templ_id = $(this).attr('id');
			var di_cookie = 'exp_di_templ_' + templ_id;

			//write the cookie
			$.cookie(di_cookie, state);
	});

	$.each($('a.di_template-showhide'), function()
	{
		//change the link text
		$(this).text('Template-Details verbergen -');
	});
}

function hideAllTempl() {
	$.each($('table.mainTable tbody'), function()
	{
    	$(this).removeClass('open');
			$(this).slideUp('fast');
			$(this).addClass('closed');
			var state = 'closed';
			var templ_id = $(this).attr('id');
			var di_cookie = 'exp_di_templ_' + templ_id;

			//write the cookie
			$.cookie(di_cookie, state);
	});

	$.each($('a.di_template-showhide'), function()
	{
		//change the link text
		$(this).text('Template-Details zeigen +');
	});
}