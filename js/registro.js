$(document).ready(function () {
	// Iniciando el menu inicio | dashboard
	localStorage.setItem('menu', JSON.stringify([0]))
})

$('.view-pass').click(function (e) {
	e.preventDefault()

	if ($(this).parent().children('input').attr('type') === 'password') {
		$(this).parent().children('input').attr('type', 'text')
		$(this).children('i').removeClass('fa-lock').addClass('fa-lock-open')
	} else {
		$(this).parent().children('input').attr('type', 'password')
		$(this).children('i').removeClass('fa-lock-open').addClass('fa-lock')
	}
})
