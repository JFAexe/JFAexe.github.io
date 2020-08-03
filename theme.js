/*
	Personal light landing page v2.1
	Copyright 2020 Alexandr 'JFAexe' Konichenko
	Uses
		Normalize.css
			https://github.com/necolas/normalize.css
		Anonymous Pro
			https://fonts.google.com/specimen/Anonymous+Pro
*/

const lsg = localStorage
const doc = document
const btn = doc.getElementById('_theme_btn')
const lst = doc.body.classList
const cls = 'darkmode'

if (JSON.parse(lsg.getItem('theme'))) {
	btn.textContent = lst.contains(cls) ? 'Dark' : 'Light'

	lst.add(cls)
}

btn.addEventListener('click', function() {
	this.textContent = lst.contains(cls) ? 'Dark' : 'Light'

	lsg.setItem('theme', lst.toggle(cls))
})

// Maybe js isn't that terrible? but === still a bruh moment