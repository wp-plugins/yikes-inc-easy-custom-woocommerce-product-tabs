/**	jQuery for repeatable woo commerce tabs*	somewhat cool*	YIKES Inc. / Evan Herman*/jQuery(document).ready(function() {		// move the labels before the wysiwyg (for styling)	jQuery( '.yikes-custom-wysiwyg-label' ).each( function() {		jQuery( this ).insertBefore( jQuery(this).prev() );	});		/*		Add a new tab	*/	jQuery( '#add_another_tab' ).on( 'click' , function( e ) {				// setup variables for use in generating a new tab		var clone_container = jQuery( '#duplicate_this_row' );		var before_add_count = jQuery( '#number_of_tabs' ).val();		var new_count = parseInt(jQuery( '#number_of_tabs' ).val())+parseInt(1); /* get new number of cloned element */		var remove_tab_button = jQuery( '#duplicate_this_row .remove_this_tab' );		var move_tab_content_buttons = jQuery( '#duplicate_this_row .button-holder' );					clone_container.children( 'p' ).each(function() {						jQuery(this).clone().insertBefore( '#duplicate_this_row' ).removeClass('hidden_duplicator_row_title_field').removeClass('hidden_duplicator_row_content_field').addClass('new_duplicate_row');				}).promise().done(function() {									jQuery( '.new_duplicate_row' ).find('input').each(function() {				if ( jQuery(this).is('input[name="hidden_duplicator_row_title"]') ) {					jQuery(this).attr( 'name' , '_yikes_wc_custom_repeatable_product_tabs_tab_title_'+new_count ).attr( 'id' , '_yikes_wc_custom_repeatable_product_tabs_tab_title_'+new_count ).parents('p').addClass('_yikes_wc_custom_repeatable_product_tabs_tab_title_'+new_count+'_field').removeClass('hidden_duplicator_row_title_field').find('label').removeAttr('for').attr('for','_yikes_wc_custom_repeatable_product_tabs_tab_title_'+new_count+'_field');				}			});						jQuery( '.new_duplicate_row' ).find('textarea').each(function() {				if ( jQuery(this).is('textarea[name="hidden_duplicator_row_content"]') ) {					jQuery(this).attr( 'name' , '_yikes_wc_custom_repeatable_product_tabs_tab_content_'+new_count ).attr( 'id' , '_yikes_wc_custom_repeatable_product_tabs_tab_content_'+new_count ).parents('p').addClass('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+new_count+'_field').removeClass('hidden_duplicator_row_content_field').find('label').removeAttr('for').attr('for','_yikes_wc_custom_repeatable_product_tabs_tab_content_'+new_count+'_field');					}			});						// set the new value			jQuery( '#number_of_tabs' ).val(new_count);				// append the divider, between tab data			jQuery( '.new_duplicate_row' ).first().before( '<div class="yikes-woo-custom-tab-divider"></div>' );					});				move_tab_content_buttons.clone().insertAfter( jQuery( '.yikes-woo-custom-tab-divider').last() ).addClass( 'last-button-holder' );				remove_tab_button.clone().prependTo( '.last-button-holder' ).removeAttr( 'style' );		jQuery( '.last-button-holder' ).removeAttr( 'alt' ).attr( 'alt' , new_count );				setTimeout(function() {			jQuery( '.last-button-holder' ).removeClass( 'last-button-holder' );			jQuery( '.new_duplicate_row' ).removeClass( 'new_duplicate_row' );		},100);						e.preventDefault();			});	// end duplicate tab		/*		Remove a new tab	*/	jQuery( 'body' ).on( 'click' , '.remove_this_tab' , function( e ) {				// setup our variables for use in tab removal		var clicked_button = jQuery( this );						var tab_title_to_remove = jQuery( this ).parents( '.button-holder' ).next();		jQuery( '.yikes-custom-wysiwyg-label' ).remove(); // necessary for our clone contianer		var tab_content_to_remove = jQuery( this ).parents( '.button-holder' ).next().next();		var divider_to_remove = jQuery( this ).parents( '.button-holder' ).prev();		var before_remove_count = jQuery('#number_of_tabs').val();		var count_post_remove = parseInt( jQuery('#number_of_tabs').val() )-parseInt(1); /* get new number of cloned element */				tab_title_to_remove.remove();		tab_content_to_remove.remove();		divider_to_remove.remove();		clicked_button.parents( '.button-holder' ).remove();						setTimeout(function() {			jQuery( '.last-button-holder' ).removeClass( 'last-button-holder' );			jQuery( '.new_duplicate_row' ).removeClass( 'new_duplicate_row' );		},100);				// reset the title field for proper saving upon removal		var x = 1;		jQuery( '.yikes_woo_tabs_title_field' ).each( function () {			jQuery( this ).removeAttr( 'name' ).attr( 'name' , '_yikes_wc_custom_repeatable_product_tabs_tab_title_'+x ).removeAttr( 'id' ).attr( 'id' , '_yikes_wc_custom_repeatable_product_tabs_tab_title_'+x );			jQuery( this ).prev().removeAttr( 'for' ).attr( 'for' , '_yikes_wc_custom_repeatable_product_tabs_tab_title_'+x );			jQuery( this ).parent( 'p' ).removeAttr( 'for' ).attr( 'for' , 'form-field _yikes_wc_custom_repeatable_product_tabs_tab_title_'+x+'_field' );			jQuery( this ).parent( 'p' ).removeAttr( 'class' ).attr( 'class' , 'form-field _yikes_wc_custom_repeatable_product_tabs_tab_title_'+x+'_field' );			x++;		});				// reset the WYSIWYG textarea fields for proper saving upon removal		var y = 1;		jQuery( '#yikes_woocommerce_custom_product_tabs' ).find( 'textarea.wp-editor-area' ).each( function() {			jQuery( this ).attr( 'name', '_yikes_wc_custom_repeatable_product_tabs_tab_content_'+y );			jQuery( this ).attr( 'id', '_yikes_wc_custom_repeatable_product_tabs_tab_content_'+y );			y++;		});				var i = 1;		jQuery( '.button-holder' ).each( function() {			jQuery( this ).removeAttr( 'alt' ).attr( 'alt' , i );			i++;		});				// store number of tabs...		jQuery( '#number_of_tabs' ).val( count_post_remove );				e.preventDefault();			});	// end remove		/* 		How To Click 		- slide out display	*/	jQuery( '.yikes-tabs-how-to-toggle' ).on( 'click' , function( e ) {		jQuery( '.yikes-woo-tabs-hidden-how-to-info' ).slideToggle( 'fast' );	});			/* 		Move tab content Up		to a new location (except on first tab content)	*/	jQuery( 'body' ).on( 'click' , '.move-tab-data-up' , function( e ) {		// store our clicked element variables		var clicked_button = jQuery( this );		var clicked_position = clicked_button.parents( '.button-holder' ).attr( 'alt' );		var clicked_title = jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+clicked_position+'"]' ).val();		// store the content for moving		var clicked_content = tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+clicked_position).getContent();					if ( clicked_position == 1 ) {			return false;		} else {			// store the previous element variables			var previous_position = parseInt( clicked_position ) - parseInt( 1 );			var previous_title = jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+previous_position+'"]' ).val();			var previous_content = tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+previous_position).getContent();			// Go ahead and swap the variables here					// clicked title, gets the previous title				jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+clicked_position+'"]' ).val( previous_title );				// previous title, gets the clicked title				jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+previous_position+'"]' ).val( clicked_title );				// swap the contents				tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+clicked_position).setContent( previous_content );				tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+previous_position).setContent( clicked_content );		}		});		/* 		Move tab content Down		to a new location (except on last tab content)	*/	jQuery( 'body' ).on( 'click' , '.move-tab-data-down' , function( e ) {		// store our clicked element variables		var number_of_tabs = jQuery( '#number_of_tabs' ).val();		var clicked_button = jQuery( this );		var clicked_position = clicked_button.parents( '.button-holder' ).attr( 'alt' );		var clicked_title = jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+clicked_position+'"]' ).val();		var clicked_content = tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+clicked_position).getContent();							if ( clicked_position == number_of_tabs ) {			return false;		} else {			// store the previous element variables			var next_position = parseInt( clicked_position ) + parseInt( 1 );			var next_title = jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+next_position+'"]' ).val();			var next_content = jQuery( 'textarea[name="_yikes_wc_custom_repeatable_product_tabs_tab_content_'+next_position+'"]' ).val();			// Go ahead and swap the variables here					// clicked title, gets the previous title				jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+clicked_position+'"]' ).val( next_title );				// previous title, gets the clicked title				jQuery( 'input[name="_yikes_wc_custom_repeatable_product_tabs_tab_title_'+next_position+'"]' ).val( clicked_title );				// swap the contents				tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+clicked_position).setContent( next_content );				tinymce.get('_yikes_wc_custom_repeatable_product_tabs_tab_content_'+next_position).setContent( clicked_content );		}			});			});