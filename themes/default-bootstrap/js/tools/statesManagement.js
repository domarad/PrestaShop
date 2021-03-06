/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/
$(document).ready(function()
{	
	bindStateInputAndUpdate();
});

function bindStateInputAndUpdate()
{
	$('.id_state, .dni, .postcode').css({'display':'none'});
	updateState();
	updateNeedIDNumber();
	updateZipCode();

	$('select#id_country').change(function(){
		updateState();
		updateNeedIDNumber();
		updateZipCode();
	});

	if ($('select#id_country_invoice').length !== 0)
	{
		$('select#id_country_invoice').change(function(){   
			updateState('invoice');
			updateNeedIDNumber('invoice');
			updateZipCode('invoice');
		});
		updateState('invoice');
		updateNeedIDNumber('invoice');
		updateZipCode('invoice');
	}
}

function updateState(suffix)
{
	$('select#id_state' + (typeof suffix !== 'undefined' ? '_' + suffix : '')+' option:not(:first-child)').remove();
	if (typeof countries !== 'undefined')
		var states = countries[$('select#id_country'+(typeof suffix !== 'undefined' ? '_' + suffix : '')).val()];
	if (typeof states !== 'undefined')
	{
		$(states).each(function (key, item){
			$('select#id_state' + (typeof suffix !== 'undefined' ? '_' + suffix : '')).append('<option value="' + item.id + '"' + (idSelectedCountry === item.id ? ' selected="selected"' : '') + '>' + item.name + '</option>');
		});
		$('.id_state' + (typeof suffix !== 'undefined' ? '_' + suffix : '') + ':hidden').fadeIn('slow');;
	}
	else
		$('.id_state' + (typeof suffix !== 'undefined' ? '_' + suffix : '')).fadeOut('fast');
}

function updateNeedIDNumber(suffix)
{
	var idCountry = parseInt($('select#id_country' + (typeof suffix !== 'undefined' ? '_' + suffix : '')).val());
	if ($.inArray(idCountry, countriesNeedIDNumber) >= 0)
		$('.dni' + (typeof suffix !== 'undefined' ? '_' + suffix : '') + ':hidden').fadeIn('slow');
	else
		$('.dni' + (typeof suffix !== 'undefined' ? '_' + suffix : '')).fadeOut('fast');
}

function updateZipCode(suffix)
{
	var idCountry = parseInt($('select#id_country' + (typeof suffix !== 'undefined' ? '_' + suffix : '')).val());

	if (typeof countriesNeedZipCode[idCountry] !== 'undefined')
		$('.postcode' + (typeof suffix !== 'undefined' ? '_' + suffix : '') + ':hidden').fadeIn('slow');
	else
		$('.postcode'+(typeof suffix !== 'undefined' ? '_' + suffix : '')).fadeOut('fast');
}
