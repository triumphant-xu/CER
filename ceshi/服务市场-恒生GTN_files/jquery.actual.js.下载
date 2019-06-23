/* Copyright 2012, Ben Lin (http://dreamerslab.com/)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.19
 *
 * Requires: jQuery >= 1.2.3
 */
(function(A){if(typeof define==="function"&&define.amd){define(["jquery"],A)}else{A(jQuery)}}(function(A){A.fn.addBack=A.fn.addBack||A.fn.andSelf;A.fn.extend({actual:function(K,I){if(!this[K]){throw'$.actual => The jQuery method "'+K+'" you called does not exist'}var D={absolute:false,clone:false,includeMargin:false,display:"block"};var H=A.extend(D,I);var B=this.eq(0);var G,E;if(H.clone===true){G=function(){var M="position: absolute !important; top: -1000 !important; ";B=B.clone().attr("style",M).appendTo("body")};E=function(){B.remove()}}else{var F=[];var C="";var J;G=function(){J=B.parents().addBack().filter(":hidden");C+="visibility: hidden !important; display: "+H.display+" !important; ";if(H.absolute===true){C+="position: absolute !important; "}J.each(function(){var N=A(this);var M=N.attr("style");F.push(M);N.attr("style",M?M+";"+C:C)})};E=function(){J.each(function(M){var N=A(this);var O=F[M];if(O===undefined){N.removeAttr("style")}else{N.attr("style",O)}})}}G();var L=/(outer)/.test(K)?B[K](H.includeMargin):B[K]();E();return L}})}));