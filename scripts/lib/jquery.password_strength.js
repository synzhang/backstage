/*
 * Password Strength (0.1.4)
 * by Sagie Maoz (n0nick.net)
 * n0nick@php.net
 *
 * This plugin will check the value of a password field and evaluate the
 * strength of the typed password. This is done by checking for
 * the diversity of character types: numbers, lowercase and uppercase
 * letters and special characters.
 *
 * Copyright (c) 2010 Sagie Maoz <n0nick@php.net>
 * Licensed under the GPL license, see http://www.gnu.org/licenses/gpl-3.0.html
 *
 *
 * NOTE: This script requires jQuery to work.  Download jQuery at www.jquery.com
 *
 */

(function(e){var t=new function(){this.countRegexp=function(e,t){var n=e.match(t);return n?n.length:0},this.getStrength=function(e,t){var n=e.length;if(n<t)return 0;var r=this.countRegexp(e,/\d/g),i=this.countRegexp(e,/[a-z]/g),s=this.countRegexp(e,/[A-Z]/g),o=n-r-i-s;if(r==n||i==n||s==n||o==n)return 1;var u=0;return r&&(u+=2),i&&(u+=s?4:3),s&&(u+=i?4:3),o&&(u+=5),n>10&&(u+=1),u},this.getStrengthLevel=function(e,t){var n=this.getStrength(e,t);return e=1,n<=0?e=1:n>0&&n<=4?e=2:n>4&&n<=8?e=3:n>8&&n<=12?e=4:n>12&&(e=5),e}};e.fn.password_strength=function(n){var r=e.extend({container:null,bar:null,minLength:6,texts:{1:"Too weak",2:"Weak password",3:"Normal strength",4:"Strong password",5:"Very strong password"},onCheck:null},n);return this.each(function(){var n=null,i=null;r.container?n=e(r.container):(n=e("<span/>").attr("class","password_strength"),e(this).after(n)),r.bar&&(i=e(r.bar)),e(this).bind("keyup.password_strength",function(){var s=e(this).val(),o=t.getStrengthLevel(s,r.minLength);if(s.length>0){var u="password_strength_"+o,a="password_bar_"+o;!n.hasClass(u)&&o in r.texts&&n.text(r.texts[o]).attr("class","password_strength "+u),i&&!i.hasClass(a)&&i.attr("class","password_bar "+a)}else n.text("").attr("class","password_strength"),i&&i.attr("class","password_bar");r.onCheck&&r.onCheck.call(this,o)}),e(this).val()!=""&&e(this).trigger("keyup.password_strength")})}})(jQuery);