/*
    Personal light landing page

    Copyright 2020 Alexandr 'JFAexe' Konichenko

    Uses
        Minimized Normalize.css
            https://github.com/necolas/normalize.css
        Anonymous Pro font
            https://fonts.google.com/specimen/Anonymous+Pro
*/

{
    let doc = document,
        lsg = localStorage,
        btn = doc.getElementById('_theme_btn'),
        bcl = doc.body.classList,
        cls = 'darkmode',
        tag = 'theme',
        upd = () => btn.textContent = bcl.contains(cls) ? 'Dark' : 'Light'

    if (JSON.parse(lsg.getItem(tag))) {
        upd()

        bcl.add(cls)
    }

    btn.addEventListener('click', () => {
        upd()

        lsg.setItem(tag, bcl.toggle(cls))
    })
}