// Recibiendo el valor almacenado en el LocalStorage
const readToogleMenu = () => {
	const localToogleMenu = localStorage.getItem('toogle-menu')
	if (window.innerWidth > 768) {
		if (localToogleMenu === 'hidden') {
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
			$('#toggleMenu').children().removeClass('fa-toggle-on').addClass('fa-toggle-off')
			$('.main').css('grid-column', 'span 2')
		} else {
			$('#menu').removeClass('menu-hidden').addClass('menu-show')
			$(this).children().removeClass('fa-toggle-off').addClass('fa-toggle-on')
			$('.main').css('grid-column', '2 / -2')
		}
	} else {
		if (localToogleMenu === 'hidden') {
			$('#toggleMenu').children().removeClass('fa-toggle-on').addClass('fa-toggle-off')
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
		} else {
			$('#toggleMenu').children().removeClass('fa-toggle-off').addClass('fa-toggle-on')
			$('#menu').removeClass('menu-hidden').addClass('menu-show')
		}
	}
}

$(document).ready(function () {
	readToogleMenu()
	menuAcordeon()

	showSelectMenu()
})

$('#menu').on('click', 'a', function (e) {
	e.preventDefault()

	if ($(this).attr('data-menu') != undefined) {
		if ($(this).attr('data-menu') == 'true') {
			let menu = $(this).parent().index()

			saveSelectMenu([menu])
		} else {
			let menu = $(this).parent().parent().parent().index()
			let submenu = $(this).parent().index()

			saveSelectMenu([menu, submenu])
		}
	}

	window.location.href = $(this).attr('href')
})

// Guardando el menu o submenu que se seleccionó
const saveSelectMenu = objMenu => localStorage.setItem('menu', JSON.stringify(objMenu))

// Mostrando el menu seleccionado
const showSelectMenu = () => {
	const select = JSON.parse(localStorage.getItem('menu'))
	let [menu, submenu] = select
	let enlaceMenu = $('#menu>ul').children()[menu]
	if (select.length === 1) {
		$(enlaceMenu).children('a').addClass('menu-active')
	} else {
		let liPadre = $(enlaceMenu).addClass('activado')
		liPadre.children('ul').slideDown()
		let enlaceSubMenu = liPadre.children('ul').children()[submenu]
		$(enlaceSubMenu).children('a').addClass('submenu-active')
	}
}

// Efecto acordeon para el menu
const menuAcordeon = () => {
	$('.menu ul li:has(ul)').click(function (e) {
		e.preventDefault

		if ($(this).hasClass('activado')) {
			$(this)
				.children('ul')
				.slideUp('', () => {
					$('.menu ul li ul li').css('margin-top', '0px')
					$(this).removeClass('activado')
				})
		} else {
			$('.menu ul li ul').slideUp()
			$('.menu ul li').removeClass('activado')
			$(this).addClass('activado')
			$(this).children('ul').slideDown()
		}
	})
}

$('#menu').click(function (e) {
	e.stopPropagation()
})

// Ocultando el LocalStorage="toogle-menu" cuando se redirecciona a otra pagina
$('.menu a').click(function (e) {
	if ($(this).parent().children().length == 1) {
		if (window.innerWidth <= 768) {
			saveToogleMenu('hidden')
		} else {
			saveToogleMenu('show')
		}
	}
})

$(window).resize(function (e) {
	e.preventDefault()

	if (window.innerWidth > 768) {
		if ($('#toggleMenu').children().hasClass('fa-toggle-on')) {
			$('#menu').removeClass('menu-hidden').addClass('menu-show')
			$('#toggleMenu').children().removeClass('fa-toggle-off').addClass('fa-toggle-on')
			$('.main').css('grid-column', '2 / -2')
		} else {
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
			$('.main').css('grid-column', 'span 2')
		}
	} else {
		if ($('#toggleMenu').children().hasClass('fa-toggle-off')) {
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
			$('.main').css('grid-column', 'span 2')
		} else {
			$('#menu').removeClass('menu-hidden').addClass('menu-show')
			$('.main').css('grid-column', 'span 2')
		}
	}
})

// Build LocalStorage para guardar el show/hidden del menu
const saveToogleMenu = valor => {
	localStorage.setItem('toogle-menu', valor)
}

// Mostar y ocultar el menu
$('#toggleMenu').click(function (e) {
	e.preventDefault()

	if (window.innerWidth > 768) {
		if ($(this).children().hasClass('fa-toggle-on')) {
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
			$(this).children().removeClass('fa-toggle-on').addClass('fa-toggle-off')
			$('.main').css('grid-column', 'span 2')

			saveToogleMenu('hidden')
		} else {
			$('#menu').removeClass('menu-hidden').addClass('menu-show')
			$(this).children().removeClass('fa-toggle-off').addClass('fa-toggle-on')
			$('.main').css('grid-column', '2 / -2')

			saveToogleMenu('show')
		}
	} else {
		if ($(this).children().hasClass('fa-toggle-on')) {
			$(this).children().removeClass('fa-toggle-on').addClass('fa-toggle-off')
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
			saveToogleMenu('hidden')
		} else {
			$(this).children().removeClass('fa-toggle-off').addClass('fa-toggle-on')
			$('#menu').removeClass('menu-hidden').addClass('menu-show')
			saveToogleMenu('show')
		}
	}
})

// Ocultando el menu en dispositivos mobiles cuando hace touch/click fuera de menu
$(document).click(function (e) {
	e.stopPropagation()

	let toogleMenu = $('#toggleMenu')
	let click = e.target

	if (window.innerWidth <= 768) {
		if (
			$('#menu').css('marginLeft') == '0px' &&
			$('#menu').hasClass('menu-show') &&
			click != toogleMenu
		) {
			$('#toggleMenu').children().removeClass('fa-toggle-on').addClass('fa-toggle-off')
			$('#menu').removeClass('menu-show').addClass('menu-hidden')
			saveToogleMenu('hidden')
		}
	}
})
