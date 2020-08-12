/*
    Personal light landing page
    Copyright 2020 Alexandr 'JFAexe' Konichenko
    Uses
        Minimized Normalize.css
            https://github.com/necolas/normalize.css
        Anonymous Pro
            https://fonts.google.com/specimen/Anonymous+Pro
*/

const
    doc = document, lsg = localStorage,
    btn = doc.getElementById('_theme_btn'),
    bcl = doc.body.classList,
    cls = 'darkmode', thm = 'theme'

let updateThemeButton = () => btn.textContent = bcl.contains(cls) ? 'Dark' : 'Light'

if (JSON.parse(lsg.getItem(thm))) {
    updateThemeButton()

    bcl.add(cls)
}

btn.addEventListener('click', () => {
    updateThemeButton()

    lsg.setItem(thm, bcl.toggle(cls))
})