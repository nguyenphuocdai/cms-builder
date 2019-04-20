"use strict";
var KTLoginV1 = (function() {
	$("#kt_login");
	var t = function() {
		$("#kt_login_signin_submit").click(function(t) {
			t.preventDefault();
			var e = $(this),
				a = $(".kt-login__form");
			a.validate({
				rules: {
					username: { required: !0 },
					password: { required: !0 }
				}
			}),
				a.valid() &&
					(e
						.addClass("kt-loader kt-loader--right kt-loader--light")
						.attr("disabled", !0),
					a.ajaxSubmit({
						url: "",
						success: function(t, i, r, n) {
							setTimeout(function() {
								e
									.removeClass(
										"kt-loader kt-loader--right kt-loader--light"
									)
									.attr("disabled", !1),
									(function(t, e, a) {
										var i = $(
											'<div class="kt-alert kt-alert--outline alert alert-' +
												e +
												' alert-dismissible" role="alert">\t\t\t<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\t\t\t<span></span>\t\t</div>'
										);
										t.find(".alert").remove(),
											i.prependTo(t),
											KTUtil.animateClass(
												i[0],
												"fadeIn animated"
											),
											i.find("span").html(a);
									})(
										a,
										"danger",
										"Incorrect username or password. Please try again."
									);
							}, 2e3);
						}
					}));
		});
	};
	return {
		init: function() {
			t();
		}
	};
})();
jQuery(document).ready(function() {
	KTLoginV1.init();
});
